import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, BookOpen, Lock, Map, Sparkles, Star, Swords, Volume2, VolumeX } from "lucide-react";
import { unlockAudio } from "@/game/audio";
import {
  BY_ID,
  PULL_COST,
  RATE_ROWS,
  RARITY_LABEL,
  SCHOOL_LABEL,
  TECHNIQUES,
  ZONES,
  type School,
  type Technique,
} from "@/game/data";
import { pullOnce, type PullReveal } from "@/game/gacha";
import {
  applyReport,
  CAP,
  equippable,
  formTitle,
  freshSave,
  loadSave,
  maxHpFor,
  ownsZero,
  upgradeCost,
  writeSave,
  zoneUnlocked,
  type Report,
  type Save,
  type Summary,
} from "@/game/save";
import { FightView } from "./FightView";

type Screen = "title" | "sanctum" | "codex" | "zones" | "brief" | "fight" | "quest" | "upgrade" | "result";

export function TheoremApp() {
  const [save, setSave] = useState<Save>(freshSave);
  const [booted, setBooted] = useState(false);
  const [screen, setScreen] = useState<Screen>("title");
  const [zoneId, setZoneId] = useState<string | null>(null);
  const [ritual, setRitual] = useState(false);
  const [lecture, setLecture] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [reveal, setReveal] = useState<PullReveal | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [school, setSchool] = useState<School | "all">("all");
  const [confirmErase, setConfirmErase] = useState(false);
  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    setSave(loadSave());
    setBooted(true);
  }, []);

  useEffect(() => {
    if (booted) writeSave(save);
  }, [save, booted]);

  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  function finish(report: Report) {
    const next = applyReport(saveRef.current, report);
    setSave(next.save);
    setSummary(next);
    setRitual(false);
    setScreen("result");
  }

  function doPull() {
    const result = pullOnce(saveRef.current);
    if (!result) return;
    setSave(result.save);
    setSpinning(true);
    setReveal(null);
    window.setTimeout(() => {
      setSpinning(false);
      setReveal(result.reveal);
    }, 900);
  }

  if (screen === "title") {
    return (
      <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-between px-5 py-8">
        <p className="kicker">Cursed arithmetic</p>
        <div>
          <p className="text-sm text-dust">a ledger of techniques</p>
          <h1 className="mt-2 font-display text-6xl leading-none sm:text-8xl">THEOREM</h1>
          <p className="mt-5 max-w-md text-dust">
            Pull a technique. The signature weapon answers even when cursed energy falls below thirty percent. Open a domain, and the fight must obey a new law.
          </p>
          <button type="button" className="btn btn-primary mt-6" onClick={() => setScreen("sanctum")}>
            Enter the sanctum
          </button>
        </div>
        <p className="max-w-md text-sm text-dust">Counting Finger is already proved. One hundred theorems sit in the well. Hard pity waits at ninety.</p>
      </main>
    );
  }

  if (screen === "result" && summary) {
    return (
      <Shell>
        <p className="kicker">After the proof</p>
        <h1 className="mt-1 font-display text-4xl">{summary.title}</h1>
        <p className="mt-3 max-w-lg text-dust">{summary.detail}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Stat k="Theorems" v={`+${summary.theorems}`} />
          <Stat k="Cursed energy" v={`+${summary.ceGain}`} />
          <Stat k="Now held" v={`${summary.save.theorems}`} />
        </div>
        {summary.evolved ? (
          <p className="plate mt-4 p-4 text-cursed">Absolute Zero has become Absolute Fingers. Erased techniques can be kept.</p>
        ) : null}
        {summary.absorbedNew.length > 0 ? (
          <p className="mt-3 text-sm">
            Absorbed: {summary.absorbedNew.map((id) => BY_ID[id]?.name).filter(Boolean).join(", ")}
          </p>
        ) : null}
        <button type="button" className="btn btn-primary mt-6" onClick={() => setScreen("sanctum")}>
          Back to the sanctum
        </button>
      </Shell>
    );
  }

  if (screen === "fight") {
    return <FightView save={save} zoneId={zoneId} ritual={ritual} lecture={lecture} onFinish={finish} />;
  }

  const tech = BY_ID[save.equipped] ?? TECHNIQUES[0]!;
  const prog = save.techs[save.equipped] ?? { level: 1, weapon: 1 };
  const zone = zoneId ? ZONES.find((z) => z.id === zoneId) : undefined;

  return (
    <Shell>
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="kicker">Sanctum · {formTitle(save.kills)}</p>
          <h1 className="font-display text-4xl leading-none">
            {screen === "sanctum"
              ? "THEOREM"
              : screen === "codex"
                ? "Codex"
                : screen === "zones"
                  ? "Districts"
                  : screen === "brief"
                    ? zone?.name
                    : screen === "quest"
                      ? "The Ritual"
                      : "Upgrade"}
          </h1>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl leading-none">{save.theorems}</p>
          <p className="kicker">Theorems</p>
        </div>
      </header>

      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-dust">
          <span>Cursed energy {Math.round(save.ce)}%</span>
          <span>Vitality {maxHpFor(save.kills)}</span>
        </div>
        <div className="relative h-2 bg-board-2">
          <div className="h-full bg-cursed" style={{ width: `${save.ce}%` }} />
          <span className="absolute top-0 bottom-0 w-px bg-seal" style={{ left: "30%" }} />
        </div>
        <p className="mt-1 text-xs text-dust">Below the seal, only the weapon answers. At thirty and above, the technique wakes.</p>
      </div>

      {screen !== "sanctum" ? (
        <button type="button" className="btn mt-4" onClick={() => setScreen(screen === "brief" ? "zones" : "sanctum")}>
          <ArrowLeft className="mr-2 inline size-4" aria-hidden />
          Back
        </button>
      ) : null}

      {screen === "sanctum" ? (
        <Sanctum
          save={save}
          tech={tech}
          level={prog.level}
          weapon={prog.weapon}
          onZones={() => setScreen("zones")}
          onCodex={() => setScreen("codex")}
          onQuest={() => setScreen("quest")}
          onUpgrade={() => setScreen("upgrade")}
          onPull={doPull}
          onEquip={(id) => setSave({ ...save, equipped: id })}
          onSound={() => setSave({ ...save, sfx: !save.sfx })}
          onLesson={() => setSave({ ...save, lesson: true })}
          onLecture={() => {
            setLecture(true);
            setRitual(false);
            setZoneId(null);
            setScreen("fight");
          }}
          confirmErase={confirmErase}
          onErase={() => {
            if (!confirmErase) {
              setConfirmErase(true);
              return;
            }
            const next = freshSave();
            setSave(next);
            setConfirmErase(false);
          }}
        />
      ) : null}

      {screen === "codex" ? (
        <Codex
          save={save}
          school={school}
          onSchool={setSchool}
          onEquip={(id) => setSave({ ...save, equipped: id })}
          onGraft={(id) => setSave({ ...save, graft: save.graft === id ? null : id })}
          onSlot={(id) => setSave({ ...save, domainSlot: save.domainSlot === id ? null : id })}
        />
      ) : null}

      {screen === "zones" ? (
        <Zones
          save={save}
          onOpen={(id) => {
            setZoneId(id);
            setRitual(false);
            setLecture(false);
            setScreen("brief");
          }}
        />
      ) : null}

      {screen === "brief" && zone ? (
        <Brief
          zoneName={zone.name}
          epithet={zone.epithet}
          brief={zone.brief}
          law={zone.law}
          onStart={() => {
            setRitual(false);
            setLecture(false);
            setScreen("fight");
          }}
        />
      ) : null}

      {screen === "upgrade" ? (
        <Upgrade
          save={save}
          tech={tech}
          onLevel={() => {
            const cost = upgradeCost("level", prog.level);
            if (prog.level >= CAP || save.theorems < cost) return;
            setSave({
              ...save,
              theorems: save.theorems - cost,
              techs: { ...save.techs, [tech.id]: { ...prog, level: prog.level + 1 } },
            });
          }}
          onWeapon={() => {
            const cost = upgradeCost("weapon", prog.weapon);
            if (prog.weapon >= CAP || save.theorems < cost) return;
            setSave({
              ...save,
              theorems: save.theorems - cost,
              techs: { ...save.techs, [tech.id]: { ...prog, weapon: prog.weapon + 1 } },
            });
          }}
        />
      ) : null}

      {screen === "quest" ? (
        <Quest
          save={save}
          onVoid={() => {
            setZoneId("void");
            setRitual(false);
            setScreen("brief");
          }}
          onRitual={() => {
            setRitual(true);
            setLecture(false);
            setZoneId(null);
            setScreen("fight");
          }}
          onAnyBoss={() => setScreen("zones")}
        />
      ) : null}

      {spinning || reveal ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-ink/85 p-4">
          <div className="plate w-full max-w-md p-5">
            <p className="kicker">Theorem pull</p>
            {spinning || !reveal ? (
              <h2 className="mt-2 font-display text-4xl">The well is turning…</h2>
            ) : (
              <RevealCard reveal={reveal} />
            )}
            {!spinning && reveal ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary" onClick={() => setReveal(null)}>
                  Close
                </button>
                <button type="button" className="btn" disabled={save.theorems < PULL_COST} onClick={doPull}>
                  Pull again · {PULL_COST}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <main className="mx-auto min-h-dvh max-w-3xl px-4 py-5">{children}</main>;
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="plate p-3">
      <p className="kicker">{k}</p>
      <p className="font-display text-2xl">{v}</p>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5 text-cursed" aria-label={`${n} star`}>
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} className="size-3.5 fill-current" aria-hidden />
      ))}
    </span>
  );
}

function Sanctum({
  save,
  tech,
  level,
  weapon,
  onZones,
  onCodex,
  onQuest,
  onUpgrade,
  onPull,
  onEquip,
  onSound,
  onLesson,
  onLecture,
  confirmErase,
  onErase,
}: {
  save: Save;
  tech: Technique;
  level: number;
  weapon: number;
  onZones: () => void;
  onCodex: () => void;
  onQuest: () => void;
  onUpgrade: () => void;
  onPull: () => void;
  onEquip: (id: string) => void;
  onSound: () => void;
  onLesson: () => void;
  onLecture: () => void;
  confirmErase: boolean;
  onErase: () => void;
}) {
  const ids = equippable(save);
  return (
    <div className="mt-5 flex flex-col gap-4">
      {!save.lesson ? (
        <section className="plate p-4">
          <p className="kicker">First lecture</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-dust">
            <li>The signature weapon is always yours. Jab, and when energy is low, heavy and special.</li>
            <li>Techniques wake at 30% cursed energy: ability, ability, domain.</li>
            <li>A domain rewrites the rules. Read the law line. Dash through red chalk arcs.</li>
            <li>Reverse Math heals more when you are full of energy, and spends nearly half of it.</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn" onClick={onLesson}>
              I have the law
            </button>
            <button type="button" className="btn btn-primary" onClick={onLecture}>
              Prove it on the board
            </button>
          </div>
        </section>
      ) : null}

      <section className="plate p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="kicker">
              {SCHOOL_LABEL[tech.school]} · {RARITY_LABEL[tech.rarity]}
            </p>
            <h2 className="font-display text-3xl leading-tight">{tech.name}</h2>
            <p className="mt-1 text-sm text-dust">{tech.epithet}</p>
          </div>
          <Stars n={tech.stars} />
        </div>
        <p className="mt-3 text-sm">
          Weapon · {tech.weapon} · rank {weapon}
        </p>
        <p className="text-sm text-dust">Technique level {level}</p>
        {save.equipped === "absolute-fingers" && save.domainSlot ? (
          <p className="mt-2 text-sm text-cursed">Evolved law slotted · {BY_ID[save.domainSlot]?.domain.name}</p>
        ) : null}
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="text-chalk">{tech.a1.name}</dt>
            <dd className="text-dust">{tech.a1.blurb}</dd>
          </div>
          <div>
            <dt className="text-chalk">{tech.a2.name}</dt>
            <dd className="text-dust">{tech.a2.blurb}</dd>
          </div>
          <div>
            <dt className="text-cursed">{tech.domain.name}</dt>
            <dd className="text-dust">{tech.domain.law}</dd>
          </div>
        </dl>
      </section>

      <div className="grid gap-2 sm:grid-cols-2">
        <button type="button" className="btn btn-primary" onClick={onZones}>
          <Map className="mr-2 inline size-4" aria-hidden />
          Enter a district
        </button>
        <button type="button" className="btn btn-seal" disabled={save.theorems < PULL_COST} onClick={onPull}>
          <Sparkles className="mr-2 inline size-4" aria-hidden />
          Theorem pull · {PULL_COST}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button type="button" className="btn" onClick={onCodex}>
          <BookOpen className="mr-1 inline size-4" aria-hidden />
          Codex
        </button>
        <button type="button" className="btn" onClick={onUpgrade}>
          <Swords className="mr-1 inline size-4" aria-hidden />
          Upgrade
        </button>
        <button type="button" className="btn" onClick={onQuest}>
          Ritual
        </button>
      </div>
      <button type="button" className="btn" onClick={onLecture}>
        Chalk lecture{save.lectured ? "" : " · first proof pays"}
      </button>

      <section>
        <p className="kicker mb-2">Equipped from the ledger</p>
        <div className="flex flex-wrap gap-2">
          {ids.map((id) => {
            const t = BY_ID[id];
            if (!t) return null;
            const on = id === save.equipped;
            return (
              <button key={id} type="button" className={`btn ${on ? "btn-primary" : ""}`} onClick={() => onEquip(id)}>
                {t.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="plate p-4 text-sm text-dust">
        <p>
          Pity {save.pity}/90. Soft pity begins at 70. Legendary or better is guaranteed at 90. Pulls so far: {save.pulls}.
        </p>
        <div className="relative mt-2 h-2 bg-board-2">
          <div className="h-full bg-cursed" style={{ width: `${(save.pity / 90) * 100}%` }} />
          <span className="absolute top-0 bottom-0 w-px bg-dust" style={{ left: `${(70 / 90) * 100}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn" onClick={onSound}>
            {save.sfx ? <Volume2 className="mr-1 inline size-4" /> : <VolumeX className="mr-1 inline size-4" />}
            Sound {save.sfx ? "on" : "off"}
          </button>
          <button type="button" className="btn" onClick={onErase}>
            {confirmErase ? "Confirm erase" : "Erase ledger"}
          </button>
        </div>
      </section>
    </div>
  );
}

function Codex({
  save,
  school,
  onSchool,
  onEquip,
  onGraft,
  onSlot,
}: {
  save: Save;
  school: School | "all";
  onSchool: (s: School | "all") => void;
  onEquip: (id: string) => void;
  onGraft: (id: string) => void;
  onSlot: (id: string) => void;
}) {
  const schools: (School | "all")[] = ["all", "elementary", "middle", "high", "college", "apex"];
  const list = TECHNIQUES.filter((t) => school === "all" || t.school === school);
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {schools.map((s) => (
          <button key={s} type="button" className={`btn ${school === s ? "btn-primary" : ""}`} onClick={() => onSchool(s)}>
            {s === "all" ? "All" : SCHOOL_LABEL[s]}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {list.map((t) => {
          const owned = Boolean(save.techs[t.id]);
          const hiddenFinger = t.id === "absolute-fingers" && !save.evolved;
          const transmuted = t.id === "absolute-zero" && save.evolved;
          return (
            <article key={t.id} className="plate p-4" style={{ opacity: owned && !hiddenFinger ? 1 : 0.72 }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="kicker">
                    {SCHOOL_LABEL[t.school]} · {RARITY_LABEL[t.rarity]}
                  </p>
                  <h2 className="font-display text-2xl">{hiddenFinger ? "Absolute Fingers" : t.name}</h2>
                </div>
                <Stars n={t.stars} />
              </div>
              {hiddenFinger ? (
                <p className="mt-2 text-sm text-dust">Secret. Absolute Zero must finish the ritual before the finger exists.</p>
              ) : (
                <>
                  <p className="mt-1 text-sm text-dust">{t.epithet}</p>
                  <p className="mt-2 text-sm">Weapon · {t.weapon}</p>
                  <p className="text-sm text-dust">{t.domain.name}</p>
                  <p className="mt-1 text-sm text-dust">{owned ? t.domain.law : "Prove it in the well to read the law."}</p>
                  {transmuted ? <p className="mt-2 text-sm text-seal-chalk">Transmuted into Absolute Fingers.</p> : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {owned && !transmuted && t.id !== "absolute-fingers" || (t.id === "absolute-fingers" && save.evolved) ? (
                      <button type="button" className="btn" onClick={() => onEquip(t.id)}>
                        {save.equipped === t.id ? "Equipped" : "Equip"}
                      </button>
                    ) : null}
                    {!owned ? (
                      <span className="inline-flex items-center gap-1 text-xs text-dust">
                        <Lock className="size-3.5" aria-hidden /> Unproved
                      </span>
                    ) : null}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
      {save.absorbed.length > 0 ? (
        <section className="mt-4">
          <p className="kicker mb-2">Kept forever</p>
          <p className="mb-3 text-sm text-dust">
            Graft an ability into Copy & Evolve. Slot a domain and Perfect Axiom opens that law — evolved — whenever the enemy has nothing to devour.
          </p>
          <div className="flex flex-col gap-2">
            {save.absorbed.map((id) => {
              const t = BY_ID[id];
              if (!t) return null;
              return (
                <article key={id} className="plate p-3">
                  <p className="font-display text-2xl leading-tight">{t.name}</p>
                  <p className="text-sm text-dust">{t.domain.name}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" className={`btn ${save.graft === id ? "btn-primary" : ""}`} onClick={() => onGraft(id)}>
                      {save.graft === id ? "Grafted" : "Graft ability"}
                    </button>
                    <button type="button" className={`btn ${save.domainSlot === id ? "btn-seal" : ""}`} onClick={() => onSlot(id)}>
                      {save.domainSlot === id ? "Domain slotted" : "Slot evolved domain"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Zones({ save, onOpen }: { save: Save; onOpen: (id: string) => void }) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {ZONES.map((z, i) => {
        const open = zoneUnlocked(save, z.id);
        return (
          <article key={z.id} className="plate p-4">
            <p className="kicker">
              0{i + 1} {save.clears[z.id] ? "· cleared" : ""}
            </p>
            <h2 className="font-display text-2xl">{z.name}</h2>
            <p className="text-sm text-dust">{z.epithet}</p>
            <button type="button" className="btn btn-primary mt-3" disabled={!open} onClick={() => onOpen(z.id)}>
              {open ? "Read the brief" : "Sealed until the previous boss falls"}
            </button>
          </article>
        );
      })}
    </div>
  );
}

function Brief({
  zoneName,
  epithet,
  brief,
  law,
  onStart,
}: {
  zoneName: string;
  epithet: string;
  brief: string;
  law: string;
  onStart: () => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-dust">{epithet}</p>
      <p className="mt-2">{brief}</p>
      <section className="plate mt-4 p-4">
        <p className="kicker">The law you will meet</p>
        <p className="mt-2 text-sm">{law}</p>
      </section>
      <p className="mt-3 text-sm text-dust">Dash the red chalk arc. Hold forward and use the weapon until a technique is worth the energy.</p>
      <button type="button" className="btn btn-primary mt-4" onClick={onStart}>
        Begin in {zoneName}
      </button>
    </div>
  );
}

function Upgrade({
  save,
  tech,
  onLevel,
  onWeapon,
}: {
  save: Save;
  tech: Technique;
  onLevel: () => void;
  onWeapon: () => void;
}) {
  const prog = save.techs[tech.id] ?? { level: 1, weapon: 1 };
  const lc = upgradeCost("level", prog.level);
  const wc = upgradeCost("weapon", prog.weapon);
  return (
    <div className="mt-4 flex flex-col gap-3">
      <p className="text-dust">
        Upgrading {tech.name}. Weapons grow stronger with rank. Abilities grow with technique level. Both cap at {CAP}.
      </p>
      <button type="button" className="btn" disabled={prog.level >= CAP || save.theorems < lc} onClick={onLevel}>
        Technique {prog.level} → {Math.min(CAP, prog.level + 1)} · {prog.level >= CAP ? "mastered" : `${lc} theorems`}
      </button>
      <button type="button" className="btn" disabled={prog.weapon >= CAP || save.theorems < wc} onClick={onWeapon}>
        {tech.weapon} {prog.weapon} → {Math.min(CAP, prog.weapon + 1)} · {prog.weapon >= CAP ? "mastered" : `${wc} theorems`}
      </button>
    </div>
  );
}

function Quest({
  save,
  onVoid,
  onRitual,
  onAnyBoss,
}: {
  save: Save;
  onVoid: () => void;
  onRitual: () => void;
  onAnyBoss: () => void;
}) {
  const zero = ownsZero(save);
  const need = save.seed ? 1 : 3;
  if (save.evolved) {
    return (
      <div className="mt-4">
        <p className="font-display text-3xl">You are the Perfect Sorcerer.</p>
        <p className="mt-2 text-dust">
          Perfect Axiom devours a foe’s domain and, if they fall while it is open, keeps that technique. Graft the ability. Slot the domain. Both stay evolved.
        </p>
        <p className="mt-3 text-sm">Kept: {save.absorbed.length ? save.absorbed.map((id) => BY_ID[id]?.name).join(", ") : "none yet."}</p>
      </div>
    );
  }
  if (!save.techs["absolute-zero"]) {
    return (
      <div className="mt-4">
        <p className="text-dust">
          Birth of the Perfect Sorcerer stays shut until Absolute Zero is in the ledger. Mythic. Half a percent. The secret seed cannot appear before it.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-col gap-3">
      <p className="text-sm text-dust">
        {zero ? "Absolute Zero is proved." : ""} Equip it. Three seals. Then the finger.
        {save.seed ? " A seed already cracked the first two seals." : ""}
      </p>
      <Stage n="I" title="Erase the Null" done={save.quest.s1} body="Defeat Null Entity in the Absolute Void while Absolute Zero is equipped.">
        <button type="button" className="btn mt-2" disabled={!zoneUnlocked(save, "void") || save.quest.s1} onClick={onVoid}>
          {zoneUnlocked(save, "void") ? "Open the void brief" : "The void is still sealed"}
        </button>
      </Stage>
      <Stage n="II" title="Delete a framework" done={save.quest.s2} body="With the first seal broken, cast Total Framework Deletion and kill any boss before the law ends the wave.">
        <button type="button" className="btn mt-2" disabled={!save.quest.s1 || save.quest.s2} onClick={onAnyBoss}>
          Choose a district
        </button>
      </Stage>
      <Stage
        n="III"
        title="Birth of the Perfect Sorcerer"
        done={save.quest.s3}
        body={`Face The Unsolved with Absolute Zero. Land Partial Erasure ${need} time${need > 1 ? "s" : ""}, then win. You need the cursed energy to pay for each erase.`}
      >
        <button
          type="button"
          className="btn btn-seal mt-2"
          disabled={!save.quest.s1 || !save.quest.s2}
          onClick={onRitual}
        >
          Begin the ritual
        </button>
      </Stage>
    </div>
  );
}

function Stage({
  n,
  title,
  done,
  body,
  children,
}: {
  n: string;
  title: string;
  done: boolean;
  body: string;
  children?: ReactNode;
}) {
  return (
    <section className="plate p-4">
      <p className="kicker">
        Seal {n} {done ? "· broken" : ""}
      </p>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-dust">{body}</p>
      {children}
    </section>
  );
}

function rarityInk(rarity: Technique["rarity"]): string {
  if (rarity === "mythic" || rarity === "secret") return "var(--color-seal-chalk)";
  if (rarity === "legendary") return "#e2b15a";
  if (rarity === "epic") return "var(--color-cursed)";
  return "var(--color-dust)";
}

function RevealCard({ reveal }: { reveal: PullReveal }) {
  if (reveal.seed) {
    return (
      <>
        <p className="kicker mt-3 text-cursed">Secret</p>
        <h2 className="font-display text-4xl">Absolute Fingers seed</h2>
        <p className="mt-2 text-sm text-dust">{reveal.note}</p>
      </>
    );
  }
  const tech = reveal.techniqueId ? BY_ID[reveal.techniqueId] : undefined;
  if (!tech) return <h2 className="font-display text-3xl">The well returned nothing.</h2>;
  return (
    <>
      <p className="kicker mt-3" style={{ color: rarityInk(tech.rarity) }}>
        {RARITY_LABEL[tech.rarity]} · {reveal.duplicate ? "duplicate" : "new"}
      </p>
      <h2 className="font-display text-4xl leading-tight">{tech.name}</h2>
      <Stars n={tech.stars} />
      <p className="mt-2 text-sm">Weapon · {tech.weapon}</p>
      <p className="text-sm text-dust">{tech.domain.name}</p>
      <p className="mt-2 text-sm text-dust">{reveal.note}</p>
      <div className="mt-4">
        {RATE_ROWS.map((row) => (
          <p key={row.label} className="flex justify-between text-xs text-dust">
            <span>
              {row.label} · {row.stars}
            </span>
            <span>{row.chance}</span>
          </p>
        ))}
      </div>
    </>
  );
}
