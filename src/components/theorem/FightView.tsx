import { useEffect, useRef, useState } from "react";
import { setMuted, unlockAudio } from "@/game/audio";
import { BY_ID, LECTURE_WAVE, RITUAL_WAVE, zoneById } from "@/game/data";
import { drawFight } from "@/game/draw";
import {
  advanceWave,
  buildReport,
  createFight,
  declareCount,
  fleeFight,
  healPreview,
  stepFight,
  type Fight,
  type InputState,
} from "@/game/fight";
import { maxHpFor, type Report, type Save } from "@/game/save";

type MoveKey = "forward" | "back" | "jump" | "dodge";

type Held = Record<MoveKey, boolean>;

const BLANK: Held = { forward: false, back: false, jump: false, dodge: false };

function blankHeld(): Held {
  return { ...BLANK };
}

declare global {
  interface Window {
    __controlsTest?: {
      getActions: () => Record<string, number | boolean>;
      getPlayerPosition: () => { x: number; y: number };
      getSpeed: () => number;
      setActions: (actions: Record<string, number | boolean>) => void;
      reset: () => void;
    };
  }
}

export function FightView({
  save,
  zoneId,
  ritual,
  lecture,
  onFinish,
}: {
  save: Save;
  zoneId: string | null;
  ritual: boolean;
  lecture: boolean;
  onFinish: (report: Report) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fightRef = useRef<Fight | null>(null);
  const inputRef = useRef<InputState>({ forward: false, back: false, jump: false, dodge: false, queue: [] });
  const keyRef = useRef<Held>(blankHeld());
  const injectRef = useRef<Held>(blankHeld());
  const pointersRef = useRef<Map<number, MoveKey>>(new Map());
  const syncRef = useRef<() => void>(() => {});
  const pausedRef = useRef(false);
  const finished = useRef(false);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  syncRef.current = () => {
    const fromPointers = blankHeld();
    for (const action of pointersRef.current.values()) fromPointers[action] = true;
    const sources = [fromPointers, keyRef.current, injectRef.current];
    const input = inputRef.current;
    input.forward = sources.some((s) => s.forward);
    input.back = sources.some((s) => s.back);
    input.jump = sources.some((s) => s.jump);
    input.dodge = sources.some((s) => s.dodge);
  };

  useEffect(() => {
    const zone = zoneId ? zoneById(zoneId) : undefined;
    const waves = lecture ? [LECTURE_WAVE] : ritual ? [RITUAL_WAVE] : zone?.waves ?? [];
    const techId = save.equipped;
    const prog = save.techs[techId];
    if (!waves.length || !prog) return;
    const technique = BY_ID[techId];
    if (!technique) return;
    const graftId = save.graft;
    const graft = graftId ? (BY_ID[graftId] ?? null) : null;
    const slotTech = save.evolved && technique.id === "absolute-fingers" && save.domainSlot ? BY_ID[save.domainSlot] : undefined;
    const fight = createFight({
      waves,
      ce: save.ce,
      maxHp: maxHpFor(save.kills),
      tech: technique,
      weaponRank: prog.weapon,
      techLevel: prog.level,
      graft,
      slotted: slotTech ? { id: slotTech.domain.id, name: slotTech.domain.name } : null,
      ritual,
      lecture,
      mood: lecture ? "lecture" : ritual ? "ritual" : zone?.id ?? "none",
    });
    fightRef.current = fight;
    setMuted(!save.sfx);
    unlockAudio();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const current = fightRef.current;
      if (current && !pausedRef.current) {
        acc += dt;
        let steps = 0;
        while (acc >= 1 / 60 && steps < 5) {
          stepFight(current, inputRef.current, 1 / 60);
          acc -= 1 / 60;
          steps += 1;
        }
      }
      const canvas = canvasRef.current;
      if (canvas && current) paint(canvas, current, save.shake && !reduce);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const hud = window.setInterval(() => setTick((n) => n + 1), 100);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(hud);
    };
    // Fight is created once per mount. Save is the snapshot from entry.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const codes = new Set<string>();
    const pullKeys = () => {
      keyRef.current = {
        back: codes.has("KeyA") || codes.has("ArrowLeft"),
        forward: codes.has("KeyD") || codes.has("ArrowRight"),
        jump: codes.has("KeyW") || codes.has("ArrowUp") || codes.has("Space"),
        dodge: codes.has("ShiftLeft") || codes.has("ShiftRight"),
      };
      syncRef.current();
    };
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const move =
        e.code === "KeyA" ||
        e.code === "ArrowLeft" ||
        e.code === "KeyD" ||
        e.code === "ArrowRight" ||
        e.code === "KeyW" ||
        e.code === "ArrowUp" ||
        e.code === "Space" ||
        e.code === "ShiftLeft" ||
        e.code === "ShiftRight";
      if (move) {
        e.preventDefault();
        codes.add(e.code);
        pullKeys();
        return;
      }
      const act: Record<string, string> = {
        KeyJ: "m1",
        KeyK: "heavy",
        KeyL: "special",
        KeyU: "a1",
        KeyI: "a2",
        KeyO: "domain",
        KeyR: "rmt",
        Digit1: "1",
        Digit2: "2",
        Digit3: "3",
        Digit4: "4",
        Digit5: "5",
        Digit6: "6",
        Digit7: "7",
        Digit8: "8",
        Digit9: "9",
      };
      if (act[e.code]) {
        e.preventDefault();
        push(act[e.code]!);
      }
      if (e.code === "Escape") {
        e.preventDefault();
        togglePause();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (!codes.has(e.code)) return;
      codes.delete(e.code);
      pullKeys();
    };
    const dropLive = () => {
      codes.clear();
      pointersRef.current.clear();
      keyRef.current = blankHeld();
      syncRef.current();
    };
    const onVis = () => {
      if (document.hidden) dropLive();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", dropLive);
    document.addEventListener("visibilitychange", onVis);
    const endPointer = (e: PointerEvent) => {
      if (!pointersRef.current.has(e.pointerId)) return;
      pointersRef.current.delete(e.pointerId);
      syncRef.current();
    };
    window.addEventListener("pointerup", endPointer);
    window.addEventListener("pointercancel", endPointer);
    if (import.meta.env.DEV) {
      window.__controlsTest = {
        getActions: () => {
          const i = inputRef.current;
          const f = fightRef.current;
          const face = f && f.enemy.x >= f.player.x ? 1 : -1;
          return {
            forward: i.forward,
            back: i.back,
            jump: i.jump,
            dodge: i.dodge,
            moveX: (i.forward ? face : 0) + (i.back ? -face : 0),
          };
        },
        getPlayerPosition: () => {
          const p = fightRef.current?.player;
          return { x: p?.x ?? 0, y: p?.y ?? 0 };
        },
        getSpeed: () => Math.abs(fightRef.current?.player.vx ?? 0),
        setActions: (actions) => {
          injectRef.current = {
            forward: !!actions.forward,
            back: !!actions.back,
            jump: !!actions.jump,
            dodge: !!actions.dodge,
          };
          syncRef.current();
        },
        reset: () => {
          codes.clear();
          pointersRef.current.clear();
          keyRef.current = blankHeld();
          injectRef.current = blankHeld();
          syncRef.current();
        },
      };
    }
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", dropLive);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointerup", endPointer);
      window.removeEventListener("pointercancel", endPointer);
      if (import.meta.env.DEV) delete window.__controlsTest;
    };
  }, []);

  function push(act: string) {
    const fight = fightRef.current;
    if (!fight || pausedRef.current || fight.phase !== "combat") return;
    if (inputRef.current.queue.length < 3) inputRef.current.queue.push(act);
  }

  function pressMove(action: MoveKey, pointerId: number, down: boolean) {
    if (down) pointersRef.current.set(pointerId, action);
    else pointersRef.current.delete(pointerId);
    syncRef.current();
  }

  function togglePause() {
    const fight = fightRef.current;
    if (!fight || fight.phase !== "combat") return;
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    pointersRef.current.clear();
    keyRef.current = blankHeld();
    injectRef.current = blankHeld();
    syncRef.current();
  }

  function leave() {
    const fight = fightRef.current;
    if (!fight || finished.current) return;
    finished.current = true;
    onFinish(buildReport(fight, zoneId));
  }

  const fight = fightRef.current;
  void tick;
  const techName = fight?.playerTech.name ?? "Technique";
  const ce = Math.round(fight?.ce ?? save.ce);
  const raging = (fight?.rageT ?? 0) > 0;
  const rageCd = fight?.rageCd ?? 0;
  const techMode = raging || ce >= 30;
  const php = fight ? Math.max(0, Math.ceil(fight.player.hp)) : 0;
  const pmax = fight?.player.maxHp ?? 1;
  const ehp = fight ? Math.max(0, Math.ceil(fight.enemy.hp)) : 0;
  const emax = fight?.enemy.maxHp ?? 1;
  const phase = fight?.phase ?? "combat";

  return (
    <div className="fight-root flex h-dvh flex-col gap-2 overflow-hidden px-3 py-3">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="kicker truncate">{fight?.enemy.title || "Encounter"}</p>
          <h1 className="truncate font-display text-2xl leading-none">{fight?.enemy.name || "—"}</h1>
          <Bar value={ehp / emax} tone="seal" label={`${ehp} / ${emax}`} />
        </div>
        <button type="button" className="btn" onClick={togglePause}>
          Pause
        </button>
      </header>

      <div className="relative min-h-40 flex-1 bg-board">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {phase === "break" && fight ? (
          <Overlay
            title="The spirit unravels."
            body={`${fight.waves[fight.wave + 1]?.name ?? "The next proof"} is still on the board. You recover a little vitality. Cursed energy does not.`}
            primary="Continue"
            onPrimary={() => advanceWave(fight)}
            secondary="Bank and leave"
            onSecondary={() => {
              fleeFight(fight);
              leave();
            }}
          />
        ) : null}
        {phase === "victory" || phase === "defeat" || phase === "fled" ? (
          <Overlay
            title={phase === "victory" ? "The board is yours." : phase === "fled" ? "You closed the ledger." : "The proof collapsed."}
            body={
              lecture
                ? "The apprentice unravels. The real districts do not forgive a miscount. Cursed energy spent here is not billed."
                : phase === "defeat"
                  ? "What you spent stays spent. Weapon form still answers at any tide of cursed energy."
                  : "The district pays in theorems and a little cursed energy."
            }
            primary="Return to the sanctum"
            onPrimary={leave}
          />
        ) : null}
        {paused ? (
          <Overlay
            title="Paused"
            body="The law waits. Dodge through red chalk arcs."
            primary="Resume"
            onPrimary={togglePause}
            secondary="Flee"
            onSecondary={() => {
              if (fight) fleeFight(fight);
              pausedRef.current = false;
              leave();
            }}
          />
        ) : null}
      </div>

      <section className="plate px-3 py-2">
        <p className="text-sm leading-snug text-chalk">{fight?.lawLine || "The chalk is settling."}</p>
        {fight?.law?.id === "counting" ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {Array.from({ length: 9 }, (_, i) => (
              <button
                key={i}
                type="button"
                className="btn"
                style={{
                  minWidth: 44,
                  borderColor: fight.law?.declared === i + 1 ? "var(--color-cursed)" : undefined,
                  color: fight.law?.declared === i + 1 ? "var(--color-cursed)" : undefined,
                }}
                onClick={() => {
                  if (fightRef.current) declareCount(fightRef.current, i + 1);
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="kicker">{techMode ? "Technique" : "Weapon form"}</p>
          <p className="truncate text-sm text-dust">{techName}</p>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-dust">
            <span>Vitality {php}</span>
            <span>
              {raging ? `CE ∞ · rage ${fight!.rageT.toFixed(1)}s` : rageCd > 0 ? `CE ${ce}% · rage ${rageCd.toFixed(1)}s` : `CE ${ce}% · threshold 30`}
            </span>
          </div>
          <Bar value={php / pmax} tone="chalk" />
          <div className="relative mt-1">
            <Bar value={raging ? 1 : ce / 100} tone="cursed" />
            <span className="pointer-events-none absolute top-0 bottom-0 w-px bg-seal" style={{ left: "30%" }} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 landscape:grid-cols-[auto_1fr]">
          <div className="grid grid-cols-2 gap-2">
            <Move label="Back" hint="A" action="back" onPress={pressMove} />
            <Move label="Forward" hint="D" action="forward" onPress={pressMove} />
            <Move label="Jump" hint="W" action="jump" onPress={pressMove} />
            <Move label="Dodge" hint="Shift" action="dodge" onPress={pressMove} />
          </div>
          <div className="flex flex-wrap gap-2">
          <Act label="Weapon" hint="J" onClick={() => push("m1")} />
          <Act label="Heavy" hint={techMode ? "locked" : cd(fight, "heavy")} disabled={techMode} onClick={() => push("heavy")} />
          <Act label="Special" hint={techMode ? "locked" : cd(fight, "special")} disabled={techMode} onClick={() => push("special")} />
          <Act label={fight?.playerTech.a1.name ?? "Ability"} hint={techMode ? `${cd(fight, "a1")} · 14` : "30%"} disabled={!techMode} onClick={() => push("a1")} />
          <Act label={fight?.playerTech.a2.name ?? "Ability II"} hint={techMode ? `${cd(fight, "a2")} · 24` : "30%"} disabled={!techMode} onClick={() => push("a2")} />
          <Act
            label={fight?.playerTech.id === "absolute-fingers" ? (fight.slotted ? "Evolved law" : "Axiom") : "Domain"}
            hint={
              fight?.usedDomain
                ? "spent"
                : techMode
                  ? fight?.slotted
                    ? `40 · ${fight.slotted.name}`
                    : "40"
                  : "30%"
            }
            disabled={!techMode || Boolean(fight?.usedDomain)}
            seal
            onClick={() => push("domain")}
          />
          <Act
            label="Reverse"
            hint={ce < 20 ? "20%" : `${cd(fight, "rmt")} · ${healPreview(ce)}%`}
            disabled={ce < 20}
            onClick={() => push("rmt")}
          />
          </div>
        </div>
        <p className="text-xs text-dust">
          Forward closes on the foe. Back steps away. Dodge bursts forward. A kill refills cursed energy. At 1 vitality, rage gives infinite cursed energy for 15s. If rage is cooling down, that fall kills you.
        </p>
      </section>
    </div>
  );
}

function cd(fight: Fight | null, key: string): string {
  const n = fight?.cd[key] ?? 0;
  if (n <= 0.05) return "ready";
  return `${n.toFixed(1)}s`;
}

function paint(canvas: HTMLCanvasElement, fight: Fight, shake: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
  const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const scale = Math.min(w / 960, h / 540);
  ctx.setTransform(scale, 0, 0, scale, (w - 960 * scale) / 2, (h - 540 * scale) / 2);
  ctx.fillStyle = "#0e0f0c";
  ctx.fillRect(-2000, -2000, 5000, 5000);
  drawFight(ctx, fight, shake);
}

function Bar({ value, tone }: { value: number; tone: "seal" | "chalk" | "cursed"; label?: string }) {
  const color = tone === "seal" ? "var(--color-seal)" : tone === "cursed" ? "var(--color-cursed)" : "var(--color-chalk)";
  return (
    <div className="h-2 w-full bg-board-2">
      <div className="h-full" style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%`, background: color }} />
    </div>
  );
}

function Act({
  label,
  hint,
  onClick,
  disabled,
  seal,
}: {
  label: string;
  hint: string;
  onClick: () => void;
  disabled?: boolean;
  seal?: boolean;
}) {
  return (
    <button type="button" className={`btn fight-btn ${seal ? "btn-seal" : ""}`} disabled={disabled} onClick={onClick}>
      <span className="block truncate text-sm">{label}</span>
      <span className="block text-xs text-dust">{hint}</span>
    </button>
  );
}

function Move({
  label,
  hint,
  action,
  onPress,
}: {
  label: string;
  hint: string;
  action: MoveKey;
  onPress: (action: MoveKey, pointerId: number, down: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="btn move-btn"
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* synthetic or unsupported capture still tracks pointerup on window */
        }
        onPress(action, e.pointerId, true);
      }}
      onPointerUp={(e) => onPress(action, e.pointerId, false)}
      onPointerCancel={(e) => onPress(action, e.pointerId, false)}
    >
      <span className="block text-sm">{label}</span>
      <span className="block text-xs text-dust">{hint}</span>
    </button>
  );
}

function Overlay({
  title,
  body,
  primary,
  onPrimary,
  secondary,
  onSecondary,
}: {
  title: string;
  body: string;
  primary: string;
  onPrimary: () => void;
  secondary?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ink/80 p-4">
      <div className="plate w-full max-w-md p-4">
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-dust">{body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={onPrimary}>
            {primary}
          </button>
          {secondary && onSecondary ? (
            <button type="button" className="btn" onClick={onSecondary}>
              {secondary}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
