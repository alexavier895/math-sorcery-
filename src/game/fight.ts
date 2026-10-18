import { sfx } from "./audio";
import {
  ACCENT,
  specialEffect,
  type BossKind,
  type DomainId,
  type Effect,
  type Technique,
  type WaveSpec,
  type WeaponStyle,
} from "./data";
import type { Report } from "./save";
import { techPower, weaponPower } from "./save";

export const VW = 960;
export const VH = 540;
export const FLOOR = 458;
export const ARENA_L = 70;
export const ARENA_R = 890;

const PI = "3141592653589793238462643383279502884197";
const NODES = [150, 300, 450, 600, 750];

export type Side = "player" | "enemy";
export type Phase = "combat" | "resolving" | "break" | "victory" | "defeat" | "fled";

export type AttackDef = {
  id: string;
  name: string;
  windup: number;
  active: number;
  recover: number;
  effect: Effect;
  kind: "weapon" | "tech";
  source: string;
};

type Swing = {
  effect: Effect;
  source: string;
  kind: "weapon" | "tech";
  pulse: number;
  every: number;
  left: number;
  total: number;
};

type Shot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dmg: number;
  life: number;
  owner: Side;
  homing: boolean;
  speed: number;
  kind: "weapon" | "tech";
  source: string;
  silence: boolean;
};

type Part = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  r: number;
};

type Floater = { x: number; y: number; text: string; life: number; max: number; color: string };

type Hazard = { x: number; r: number; dps: number; t: number; tick: number; owner: Side };

type Summon = { x: number; y: number; dmg: number; life: number; owner: Side; cd: number };

type Delayed = { t: number; hit: RawHit };

type RawHit = {
  attacker: Side;
  target: Side;
  dmg: number;
  kind: "weapon" | "tech" | "domain";
  source: string;
  stun: number;
  knock: number;
  echo?: boolean;
  noLaw?: boolean;
  noRebank?: boolean;
  skipCollatz?: boolean;
  parity?: "even" | "odd";
};

export type Fighter = {
  side: Side;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 1 | -1;
  hp: number;
  maxHp: number;
  dmg: number;
  speed: number;
  grounded: boolean;
  state: "idle" | "walk" | "attack" | "hurt" | "dash" | "dead";
  stateT: number;
  attack: AttackDef | null;
  attackT: number;
  fired: boolean;
  swing: Swing | null;
  stun: number;
  iframes: number;
  flash: number;
  squash: number;
  silenceT: number;
  dmgMul: number;
  dmgMulT: number;
  armorMul: number;
  armorT: number;
  outMul: number;
  outMulT: number;
  imag: number;
  brainT: number;
  didDomain: boolean;
  stunResist: number;
  ranged: boolean;
  name: string;
  title: string;
  accent: string;
  style: WeaponStyle;
  anim: number;
  boss: boolean;
};

export type Law = {
  id: DomainId;
  name: string;
  owner: Side;
  victim: Side;
  t: number;
  duration: number;
  upgraded: boolean;
  table: number;
  tableT: number;
  beat: number;
  beatT: number;
  declared: number;
  angle: number;
  seal: number;
  sealT: number;
  growth: number;
  growthT: number;
  bank: number;
  bankT: number;
  stacks: number;
  hitIndex: number;
  vertexX: number;
  rootA: number;
  rootB: number;
  lastRoot: "a" | "b" | null;
  lastRootT: number;
  logBase: number;
  marks: number;
  piI: number;
  piT: number;
};

export type Fight = {
  time: number;
  phase: Phase;
  resolveT: number;
  waves: WaveSpec[];
  wave: number;
  ce: number;
  combo: number;
  comboT: number;
  trauma: number;
  hitstop: number;
  player: Fighter;
  enemy: Fighter;
  shots: Shot[];
  parts: Part[];
  floats: Floater[];
  hazards: Hazard[];
  summons: Summon[];
  delayed: Delayed[];
  law: Law | null;
  usedDomain: boolean;
  axiomThisWave: boolean;
  axiomEver: boolean;
  usedErasure: boolean;
  erases: number;
  hail: number;
  piI: number;
  piT: number;
  dealtP: number;
  dealtE: number;
  introT: number;
  banner: string;
  bannerT: number;
  mode: "weapon" | "tech";
  modeFlash: string;
  modeFlashT: number;
  lawLine: string;
  playerTech: Technique;
  graft: Technique | null;
  slotted: { id: DomainId; name: string } | null;
  weaponMul: number;
  techMul: number;
  atk: { m1: AttackDef[]; heavy: AttackDef; special: AttackDef; a1: AttackDef; a2: AttackDef; domain: AttackDef };
  m1: number;
  m1T: number;
  cd: Record<string, number>;
  jumpLatch: boolean;
  dashLatch: boolean;
  ritual: boolean;
  lecture: boolean;
  mood: string;
  bossKind: BossKind;
  enemyDomain?: DomainId;
  enemyDomainName?: string;
  enemyRank: number;
  holeT: number;
  spiritKills: number;
  bossKilled: boolean;
  absorbedIds: string[];
  currentId: string;
  buffer: string | null;
  bufferT: number;
  logNote: string;
  rageT: number;
  rageCd: number;
};

export type InputState = {
  forward: boolean;
  back: boolean;
  jump: boolean;
  dodge: boolean;
  queue: string[];
};

function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

function rankOf(r: Technique["rarity"]): number {
  return { common: 1, rare: 2, epic: 3, legendary: 4, mythic: 5, secret: 6 }[r];
}

function timings(effect: Effect): { windup: number; active: number; recover: number } {
  switch (effect.k) {
    case "shot":
      return { windup: 0.16, active: 0.08, recover: 0.28 };
    case "dash":
      return { windup: 0.06, active: 0.16, recover: 0.18 };
    case "bind":
    case "silence":
      return { windup: 0.18, active: 0.1, recover: 0.3 };
    case "flurry":
      return { windup: 0.08, active: 0.08 * effect.n, recover: 0.22 };
    case "buff":
    case "armor":
      return { windup: 0.12, active: 0.08, recover: 0.2 };
    default:
      return { windup: 0.14, active: 0.12, recover: 0.26 };
  }
}

function scaleEffect(effect: Effect, mul: number): Effect {
  if ("dmg" in effect && typeof effect.dmg === "number") {
    return { ...effect, dmg: Math.round(effect.dmg * mul * 10) / 10 };
  }
  return { ...effect };
}

function def(id: string, name: string, effect: Effect, kind: "weapon" | "tech", source: string): AttackDef {
  const t = timings(effect);
  return { id, name, ...t, effect, kind, source };
}

function makeFighter(partial: Partial<Fighter> & Pick<Fighter, "side" | "name" | "x" | "hp" | "maxHp">): Fighter {
  return {
    y: FLOOR,
    vx: 0,
    vy: 0,
    facing: partial.side === "player" ? 1 : -1,
    dmg: 10,
    speed: 240,
    grounded: true,
    state: "idle",
    stateT: 0,
    attack: null,
    attackT: 0,
    fired: false,
    swing: null,
    stun: 0,
    iframes: 0,
    flash: 0,
    squash: 0,
    silenceT: 0,
    dmgMul: 1,
    dmgMulT: 0,
    armorMul: 1,
    armorT: 0,
    outMul: 1,
    outMulT: 0,
    imag: 0,
    brainT: 0.6,
    didDomain: false,
    stunResist: 1,
    ranged: false,
    title: "",
    accent: ACCENT.chalk,
    style: "blade",
    anim: 0,
    boss: false,
    ...partial,
  };
}

function makeLaw(id: DomainId, name: string, owner: Side, duration: number, upgraded: boolean): Law {
  return {
    id,
    name,
    owner,
    victim: owner === "player" ? "enemy" : "player",
    t: 0,
    duration,
    upgraded,
    table: 2 + Math.floor(Math.random() * 11),
    tableT: 0,
    beat: 1,
    beatT: 0,
    declared: 4,
    angle: 40,
    seal: 90,
    sealT: 0,
    growth: 1,
    growthT: 0,
    bank: 0,
    bankT: 0,
    stacks: 0,
    hitIndex: 0,
    vertexX: 470,
    rootA: 270,
    rootB: 700,
    lastRoot: null,
    lastRootT: 0,
    logBase: 10,
    marks: 0,
    piI: 0,
    piT: 0,
  };
}

export function createFight(opts: {
  waves: WaveSpec[];
  ce: number;
  maxHp: number;
  tech: Technique;
  weaponRank: number;
  techLevel: number;
  graft: Technique | null;
  slotted: { id: DomainId; name: string } | null;
  ritual: boolean;
  lecture: boolean;
  mood: string;
}): Fight {
  const wMul = weaponPower(opts.weaponRank);
  const tMul = techPower(opts.techLevel);
  const tech = opts.tech;
  const m1base = [11, 13, 20];
  const m1 = m1base.map((d, i) =>
    def(
      `m1-${i}`,
      "Weapon",
      { k: "melee", dmg: d * wMul, range: 104 + i * 8, stun: 0.1, knock: 40 + i * 30 },
      "weapon",
      "m1",
    ),
  );
  const fight: Fight = {
    time: 0,
    phase: "combat",
    resolveT: 0,
    waves: opts.waves,
    wave: 0,
    ce: opts.lecture ? 100 : opts.ce,
    combo: 0,
    comboT: 0,
    trauma: 0,
    hitstop: 0,
    player: makeFighter({
      side: "player",
      name: tech.weapon,
      x: 230,
      hp: opts.maxHp,
      maxHp: opts.maxHp,
      speed: 360,
      accent: ACCENT[tech.accent],
      style: tech.style,
      title: tech.name,
    }),
    enemy: makeFighter({ side: "enemy", name: "", x: 760, hp: 1, maxHp: 1 }),
    shots: [],
    parts: [],
    floats: [],
    hazards: [],
    summons: [],
    delayed: [],
    law: null,
    usedDomain: false,
    axiomThisWave: false,
    axiomEver: false,
    usedErasure: false,
    erases: 0,
    hail: 27,
    piI: 0,
    piT: 0,
    dealtP: 40,
    dealtE: 40,
    introT: 3.4,
    banner: "",
    bannerT: 0,
    mode: (opts.lecture ? 100 : opts.ce) >= 30 ? "tech" : "weapon",
    modeFlash: (opts.lecture ? 100 : opts.ce) >= 30 ? "TECHNIQUE AWAKE" : "WEAPON FORM",
    modeFlashT: 1.6,
    lawLine: "",
    playerTech: tech,
    graft: opts.graft,
    slotted: opts.slotted,
    weaponMul: wMul,
    techMul: tMul,
    atk: {
      m1,
      heavy: def("heavy", "Heavy", { k: "melee", dmg: 30 * wMul, range: 108, stun: 0.32, knock: 210 }, "weapon", "heavy"),
      special: def("special", "Special", scaleEffect(specialEffect(tech.style), wMul), "weapon", "special"),
      a1: def("a1", tech.a1.name, scaleEffect(tech.a1.effect, tMul), "tech", "a1"),
      a2: def("a2", tech.a2.name, scaleEffect(tech.a2.effect, tMul * 1.05), "tech", "a2"),
      domain: def("domain", tech.domain.name, { k: "buff", mul: 1, dur: 0.05 }, "tech", "domain"),
    },
    m1: 0,
    m1T: 0,
    cd: { heavy: 0, special: 0, a1: 0, a2: 0, domain: 0, dash: 0, rmt: 0 },
    jumpLatch: false,
    dashLatch: false,
    ritual: opts.ritual,
    lecture: opts.lecture,
    mood: opts.mood,
    bossKind: "spirit",
    enemyRank: 1,
    holeT: 0,
    spiritKills: 0,
    bossKilled: false,
    absorbedIds: [],
    currentId: "",
    buffer: null,
    bufferT: 0,
    logNote: "",
    rageT: 0,
    rageCd: 0,
  };
  fight.atk.heavy.windup = 0.28;
  fight.atk.heavy.recover = 0.34;
  fight.atk.domain.windup = 0.46;
  fight.atk.domain.recover = 0.36;
  summonWave(fight, opts.waves[0]!, false);
  writeLawLine(fight);
  return fight;
}

function summonWave(fight: Fight, wave: WaveSpec, heal: boolean): void {
  if (heal) {
    fight.player.hp = Math.min(fight.player.maxHp, fight.player.hp + fight.player.maxHp * 0.12);
  }
  fight.player.stun = 0;
  fight.player.state = "idle";
  fight.player.attack = null;
  fight.player.swing = null;
  fight.player.imag = 0;
  fight.enemy = makeFighter({
    side: "enemy",
    name: wave.name,
    title: wave.title,
    x: 760,
    hp: wave.hp,
    maxHp: wave.hp,
    dmg: wave.dmg,
    speed: wave.boss ? 150 : 185,
    style: wave.style,
    accent: wave.boss ? ACCENT.seal : "#c8c0a8",
    stunResist: wave.boss ? 0.48 : 1,
    ranged: wave.ranged,
    boss: wave.boss,
    brainT: 0.45,
  });
  fight.currentId = wave.techniqueId;
  fight.bossKind = wave.kind;
  fight.enemyDomain = wave.domain;
  fight.enemyDomainName = wave.domainName;
  fight.enemyRank = wave.rank;
  fight.usedDomain = false;
  fight.axiomThisWave = false;
  fight.law = null;
  fight.shots = [];
  fight.hazards = [];
  fight.summons = [];
  fight.delayed = [];
  fight.holeT = 0;
  fight.dealtP = 40;
  fight.dealtE = 40;
  fight.introT = 3.6;
  if (fight.lecture) {
    fight.enemy.speed = 92;
    fight.enemy.brainT = 1.2;
    fight.banner = "COUNT, THEN STRIKE";
    fight.bannerT = 2.2;
  }
  if (wave.kind === "hailstone" || fight.playerTech.id === "collatz") fight.hail = 27;
  fight.phase = "combat";
}

function burst(fight: Fight, x: number, y: number, color: string, n: number, speed: number): void {
  for (let i = 0; i < n; i++) {
    if (fight.parts.length > 150) fight.parts.shift();
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.35 + Math.random());
    const life = 0.35 + Math.random() * 0.4;
    fight.parts.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 30,
      life,
      max: life,
      color,
      r: 1.2 + Math.random() * 2.2,
    });
  }
}

function floater(fight: Fight, x: number, y: number, text: string, color: string): void {
  if (!text) return;
  if (fight.floats.length > 18) fight.floats.shift();
  fight.floats.push({ x, y, text, life: 0.85, max: 0.85, color });
}

function other(side: Side): Side {
  return side === "player" ? "enemy" : "player";
}

function body(fight: Fight, side: Side): Fighter {
  return side === "player" ? fight.player : fight.enemy;
}

function inRange(fight: Fight, a: Fighter, b: Fighter, range: number): boolean {
  const dx = b.x - a.x;
  const fold = fight.law?.id === "fold";
  const facingOk = fold || Math.abs(dx) < 26 || Math.sign(dx) === a.facing;
  return facingOk && Math.abs(dx) <= range && Math.abs(b.y - a.y) < 150;
}

function applyHit(fight: Fight, hit: RawHit): void {
  const target = body(fight, hit.target);
  const attacker = body(fight, hit.attacker);
  if (target.hp <= 0 || attacker.hp <= 0 && hit.source !== "release") return;
  if (target.iframes > 0 && hit.source !== "imag") return;

  let dmg = hit.dmg * (hit.attacker === "player" ? attacker.dmgMul : 1);
  if (hit.attacker === "enemy") dmg *= attacker.outMul;
  let note = "";
  let cancel = false;
  let heal = 0;

  if (hit.parity) {
    const even = hit.parity === "even";
    if (even && fight.hail % 2 === 0) {
      fight.hail = Math.max(1, fight.hail / 2);
      dmg *= 2.15;
      note = `EVEN → ${fight.hail}`;
    } else if (even) {
      fight.hail = Math.max(1, fight.hail - 1);
      dmg *= 0.55;
      note = `SET UP → ${fight.hail}`;
    } else if (fight.hail % 2 === 1) {
      const next = 3 * fight.hail + 1;
      dmg += (next - fight.hail) * 0.85;
      fight.hail = next;
      note = `ODD BURST → ${fight.hail}`;
    } else {
      dmg *= 0.45;
      note = "NOT ODD";
    }
    hit.skipCollatz = true;
  }

  if (fight.law && !hit.noLaw) {
    const law = applyLaw(fight, hit, dmg);
    dmg = law.dmg;
    if (law.note) note = law.note;
    cancel = law.cancel;
    heal = law.heal;
  }

  if (!cancel && hit.target === "enemy" && hit.source !== "imag") {
    const boss = bossMod(fight, hit, dmg);
    dmg = boss.dmg;
    if (boss.note) note = boss.note;
    if (boss.heal) heal += boss.heal;
    if (boss.cancel) cancel = true;
  }

  if (cancel || dmg <= 0) {
    if (heal > 0) {
      target.hp = Math.min(target.maxHp, target.hp + heal);
      floater(fight, target.x, target.y - 120, `+${Math.round(heal)}`, "#2fcaa8");
      burst(fight, target.x, target.y - 70, "#2fcaa8", 8, 80);
    }
    floater(fight, target.x, target.y - 148, note || "FAIL", "#d64545");
    if (note) sfx("fail");
    return;
  }

  if (target.armorT > 0 && hit.source !== "imag") dmg *= target.armorMul;
  if (hit.attacker === "player" && hit.kind !== "domain") {
    dmg *= 1 + 0.04 * Math.min(10, fight.combo);
  }
  dmg = Math.max(1, Math.round(dmg));
  const before = target.hp;
  target.hp -= dmg;
  if (fight.law?.id === "fraction" && hit.target === fight.law.victim) {
    for (const q of [0.75, 0.5, 0.25]) {
      const line = target.maxHp * q;
      if (before > line && target.hp <= line) {
        target.hp -= 18 * (fight.law.upgraded ? 1.25 : 1);
        floater(fight, target.x + 20, target.y - 100, "SEVER", "#efe7d2");
      }
    }
  }
  if (hit.attacker === "player" && hit.kind !== "domain") {
    fight.combo += 1;
    fight.comboT = 1.3;
  }
  target.flash = 0.12;
  target.vx += Math.sign(target.x - attacker.x || attacker.facing) * hit.knock;
  const stun = hit.stun * target.stunResist;
  if (stun > 0.04) {
    target.stun = Math.max(target.stun, stun);
    if (target.state !== "dead") {
      target.state = "hurt";
      target.attack = null;
      target.swing = null;
    }
  }
  floater(fight, target.x, target.y - 130, `${note ? note + " " : ""}${dmg}`, hit.attacker === "player" ? "#efe7d2" : "#d64545");
  burst(fight, (attacker.x + target.x) / 2, target.y - 80, attacker.accent, hit.kind === "weapon" ? 7 : 12, 140);
  fight.trauma = Math.min(1, fight.trauma + Math.min(0.55, dmg / 90));
  if (hit.source !== "imag") fight.hitstop = dmg > 24 ? 0.055 : 0.03;
  sfx(hit.source === "heavy" ? "heavy" : "hit");
  holdTheLine(fight, target);
  if (target.hp <= 0) target.hp = 0;
  checkEnd(fight);
}

function applyLaw(fight: Fight, hit: RawHit, dmg: number): { dmg: number; note: string; cancel: boolean; heal: number } {
  const law = fight.law!;
  const attacker = body(fight, hit.attacker);
  const target = body(fight, hit.target);
  let note = "";
  let cancel = false;
  let heal = 0;
  const up = law.upgraded ? 1.22 : 1;

  switch (law.id) {
    case "counting": {
      if (law.beat !== law.declared) {
        cancel = true;
        note = `MISCOUNT ${law.beat}≠${law.declared}`;
      } else {
        dmg *= 2.15 * up;
        note = `COUNTED ${law.beat}`;
      }
      break;
    }
    case "multiply": {
      dmg *= (law.table / 6) * up;
      note = `×${law.table}`;
      break;
    }
    case "angles": {
      const window = law.upgraded ? 26 : 16;
      if (Math.abs(law.angle - law.seal) <= window) {
        dmg *= 2.35 * up;
        note = "TRUE ANGLE";
      } else {
        dmg *= 0.34;
        note = "OFF-ANGLE";
      }
      break;
    }
    case "collatz": {
      if (hit.target === law.victim && !hit.skipCollatz && hit.source !== "release" && hit.source !== "imag") {
        if (fight.hail % 2 === 0) {
          const prev = fight.hail;
          fight.hail = Math.max(1, fight.hail / 2);
          dmg *= 1.9 * up;
          note = `EVEN ${prev}→${fight.hail}`;
        } else {
          const prev = fight.hail;
          fight.hail = 3 * fight.hail + 1;
          dmg *= 0.4;
          const victim = body(fight, law.victim);
          victim.dmgMul = Math.max(victim.dmgMul, 1.28);
          victim.dmgMulT = Math.max(victim.dmgMulT, 2);
          note = `ODD ${prev}→${fight.hail}`;
        }
      }
      break;
    }
    case "erasure": {
      const p = clamp(law.t / law.duration, 0, 1);
      if (hit.kind === "tech" && Math.random() < p * 0.85) {
        cancel = true;
        note = "ERASED";
      }
      if (hit.attacker === "enemy") dmg *= 1 - 0.48 * p;
      dmg *= up;
      break;
    }
    case "axiom": {
      dmg *= 1.5 * up;
      note = "AXIOM";
      break;
    }
    case "right": {
      if (Math.abs(attacker.x - law.vertexX) < 38) {
        dmg *= 2.3 * up;
        note = "RIGHT ANGLE";
      } else {
        dmg *= 0.6;
        note = "OBLIQUE";
      }
      break;
    }
    case "pi": {
      const digit = PI[law.piI] ?? "1";
      const hot = digit === "1" || digit === "3" || digit === "4" || (law.upgraded && digit === "2");
      if (hot) {
        dmg *= 1.9 * up;
        note = `π ${digit} HOT`;
      } else {
        dmg *= 0.4;
        note = `π ${digit} COLD`;
      }
      break;
    }
    case "grid": {
      const on = NODES.some((n) => Math.abs(attacker.x - n) < 34);
      if (on) {
        dmg *= 1.85 * up;
        note = "ON AXIS";
      } else {
        dmg *= 0.66;
        note = "OFF GRID";
      }
      break;
    }
    case "percent": {
      dmg = Math.max(8, target.hp * 0.09) * up;
      note = "PERCENT";
      break;
    }
    case "prime": {
      law.hitIndex += 1;
      if (isPrime(law.hitIndex)) {
        dmg *= 2.25 * up;
        note = `PRIME ${law.hitIndex}`;
      } else {
        dmg *= 0.5;
        note = `COMPOSITE ${law.hitIndex}`;
      }
      break;
    }
    case "fraction": {
      dmg *= 1.12 * up;
      break;
    }
    case "sum": {
      if (!hit.noRebank && hit.source !== "release") {
        law.bank += dmg * 0.8;
        dmg *= 0.2;
        note = `BANK ${Math.round(law.bank)}`;
      } else dmg *= up;
      break;
    }
    case "shape": {
      if (hit.target === law.owner) dmg *= 0.62;
      else dmg *= up;
      note = "FORM";
      break;
    }
    case "ratio": {
      const total = fight.dealtP + fight.dealtE + dmg;
      const mine = (hit.attacker === "player" ? fight.dealtP : fight.dealtE) + dmg;
      if (mine / total > 0.62) {
        dmg *= 0.52;
        note = "PAST φ";
      } else {
        dmg *= 1.15 * up;
        note = "IN RATIO";
      }
      if (hit.attacker === "player") fight.dealtP += dmg;
      else fight.dealtE += dmg;
      break;
    }
    case "orbit": {
      dmg *= 1.1 * up;
      note = "ORBITAL";
      break;
    }
    case "log": {
      const base = law.logBase;
      dmg = ((24 * Math.log(1 + Math.max(0, dmg))) / Math.log(base)) * up;
      note = `LOG ${base}`;
      break;
    }
    case "dice": {
      const roll = 1 + Math.floor(Math.random() * 6);
      dmg *= (roll / 3.5) * (roll === 6 ? 1.4 : 1) * up;
      note = `DIE ${roll}`;
      break;
    }
    case "exp": {
      dmg *= law.growth * up;
      note = `GROWTH ${law.growth.toFixed(2)}`;
      break;
    }
    case "derivative": {
      const sp = Math.abs(attacker.vx);
      const m = clamp(sp / 230, 0.4, 2.4);
      dmg *= m * up;
      note = sp > 200 ? "STEEP" : "FLAT";
      break;
    }
    case "integral": {
      if (!hit.noRebank && hit.source !== "release") {
        law.bank += dmg * 0.75;
        dmg *= 0.25;
        note = `AREA ${Math.round(law.bank)}`;
      }
      break;
    }
    case "matrix": {
      dmg *= 1.05 * up;
      if (!hit.echo && hit.source !== "imag") {
        fight.delayed.push({
          t: 0.16,
          hit: { ...hit, dmg: hit.dmg * 0.55, echo: true, stun: 0, knock: 16, noLaw: false },
        });
        note = "ECHO";
      }
      break;
    }
    case "fold": {
      dmg *= 1.12 * up;
      note = "FOLD";
      break;
    }
    case "complex": {
      if (hit.source !== "imag") {
        target.imag += dmg * 0.55;
        dmg *= 0.6 * up;
        note = "REAL + i";
      }
      break;
    }
    case "fourier": {
      const period = 0.75;
      const phase = law.t % period;
      const on = phase < 0.12 || phase > period - 0.12;
      if (on) law.stacks = Math.min(8, law.stacks + 1);
      else law.stacks = Math.max(0, law.stacks - 1);
      dmg *= (1 + law.stacks * 0.24) * up;
      note = on ? `BEAT ${law.stacks}` : `OFF ${law.stacks}`;
      break;
    }
    case "algebra": {
      if (hit.target === law.victim) {
        law.marks += 1;
        if (law.marks % 4 === 0) {
          dmg *= 2.6 * up;
          note = "KERNEL";
        } else {
          dmg *= 1.1;
          note = `MARK ${law.marks % 4}`;
        }
      }
      if (hit.attacker === law.victim) dmg *= 0.72;
      break;
    }
    case "quadratic": {
      const nearA = Math.abs(attacker.x - law.rootA) < 46;
      const nearB = Math.abs(attacker.x - law.rootB) < 46;
      if (nearA || nearB) {
        dmg *= 1.85 * up;
        const which = nearA ? "a" : "b";
        if (law.lastRoot && law.lastRoot !== which && law.lastRootT < 2.6) {
          dmg += 42 * up;
          note = "DISCRIMINANT";
        } else note = "ROOT";
        law.lastRoot = which;
        law.lastRootT = 0;
      } else {
        dmg *= 0.62;
        note = "OFF ROOT";
      }
      break;
    }
    default:
      break;
  }
  return { dmg, note, cancel, heal };
}

function bossMod(fight: Fight, hit: RawHit, dmg: number): { dmg: number; note: string; heal: number; cancel: boolean } {
  let note = "";
  let heal = 0;
  const kind = fight.bossKind;
  if (kind === "hailstone" && fight.law?.id !== "collatz" && !hit.skipCollatz && hit.attacker === "player") {
    if (hit.source === "m1") {
      fight.hail = Math.max(1, fight.hail - 1);
      return { dmg, note: `n → ${fight.hail}`, heal: 0, cancel: false };
    }
    if (fight.hail % 2 === 0) {
      fight.hail = Math.max(1, fight.hail / 2);
      return { dmg: dmg * 1.75, note: `COLLAPSE → ${fight.hail}`, heal: 0, cancel: false };
    }
    fight.hail = 3 * fight.hail + 1;
    return { dmg: 0, note: `CLIMB → ${fight.hail}`, heal: fight.enemy.maxHp * 0.07, cancel: false };
  }
  if (kind === "irrational" && fight.law?.id !== "pi") {
    const digit = PI[fight.piI] ?? "3";
    const hot = digit === "1" || digit === "3" || digit === "4";
    if (!hot && fight.playerTech.id !== "pi-sorcerer") {
      dmg *= 0.58;
      note = `π ${digit} COLD`;
    } else note = hot ? `π ${digit} HOT` : `π ${digit}`;
  }
  if (kind === "null") {
    if (hit.kind === "weapon") dmg *= 1.22;
    else if (fight.playerTech.id === "absolute-zero" || fight.playerTech.id === "absolute-fingers") dmg *= 1.7;
    else {
      dmg *= 0.55;
      note = note || "NO STRUCTURE";
    }
  }
  if (kind === "infinite") {
    const r = fight.playerTech.rarity;
    if (r === "common" || r === "rare") {
      dmg *= 0.36;
      note = "TOO FINITE";
    } else if (r === "epic") {
      dmg *= 0.7;
      note = "PARTIAL";
    } else dmg *= 1.12;
  }
  if (kind === "shape") {
    if (fight.playerTech.chaos) {
      dmg *= 1.3;
      note = note || "IRREGULAR";
    }
    if (fight.playerTech.id === "shape-sorter") dmg *= 0.78;
  }
  return { dmg, note, heal, cancel: false };
}

function holdTheLine(fight: Fight, target: Fighter): void {
  if (target.side !== "player" || target.hp > 1) return;
  if (fight.rageT > 0) {
    target.hp = 1;
    return;
  }
  if (fight.rageCd <= 0 && fight.phase === "combat") {
    target.hp = 1;
    awakenRage(fight);
    return;
  }
  target.hp = 0;
}

function awakenRage(fight: Fight): void {
  fight.rageT = 15;
  fight.ce = 100;
  fight.banner = "RAGE";
  fight.bannerT = 1.8;
  fight.modeFlash = "INFINITE CURSED ENERGY";
  fight.modeFlashT = 1.8;
  floater(fight, fight.player.x, fight.player.y - 168, "RAGE", "#d64545");
  burst(fight, fight.player.x, fight.player.y - 80, "#d64545", 22, 160);
  sfx("awaken");
}

function payCe(fight: Fight, cost: number): boolean {
  if (fight.rageT > 0) return true;
  if (fight.ce < cost) return false;
  fight.ce -= cost;
  return true;
}

function tickRage(fight: Fight, dt: number): void {
  if (fight.rageT > 0) {
    fight.rageT = Math.max(0, fight.rageT - dt);
    fight.ce = 100;
    if (fight.rageT === 0) {
      fight.rageCd = 15;
      fight.banner = "RAGE FADES";
      fight.bannerT = 1.3;
      floater(fight, fight.player.x, fight.player.y - 168, "RAGE FADES", "#a39b82");
    }
  } else if (fight.rageCd > 0) fight.rageCd = Math.max(0, fight.rageCd - dt);
}

function checkEnd(fight: Fight): void {
  if (fight.phase !== "combat") return;
  if (fight.player.hp <= 0) {
    fight.player.hp = 0;
    fight.player.state = "dead";
    fight.phase = "resolving";
    fight.resolveT = 0.95;
    sfx("die");
    return;
  }
  if (fight.enemy.hp <= 0) {
    fight.enemy.hp = 0;
    fight.enemy.state = "dead";
    fight.phase = "resolving";
    fight.resolveT = 0.8;
    if (fight.enemy.boss) fight.bossKilled = true;
    else fight.spiritKills += 1;
    fight.ce = 100;
    floater(fight, fight.player.x, fight.player.y - 168, "CE 100%", "#d64545");
    if (fight.axiomThisWave) {
      fight.axiomEver = true;
      if (!fight.absorbedIds.includes(fight.currentId)) fight.absorbedIds.push(fight.currentId);
    }
    sfx("die");
  }
}

function spawnShot(
  fight: Fight,
  owner: Fighter,
  dmg: number,
  speed: number,
  n: number,
  spread: number,
  homing: boolean,
  kind: "weapon" | "tech",
  source: string,
  silence = false,
): void {
  const base = owner.facing === 1 ? 0 : Math.PI;
  for (let i = 0; i < n; i++) {
    const ang = base + (i - (n - 1) / 2) * spread;
    fight.shots.push({
      x: owner.x + owner.facing * 36,
      y: owner.y - 78,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      r: 7,
      dmg,
      life: 1.35,
      owner: owner.side,
      homing,
      speed,
      kind,
      source,
      silence,
    });
  }
}

function fireEffect(fight: Fight, fighter: Fighter, attack: AttackDef): void {
  if (attack.source === "edomain") {
    enemyDomain(fight);
    return;
  }
  const target = body(fight, other(fighter.side));
  if (attack.source === "espec" && fight.bossKind === "infinite") {
    fighter.x = clamp(target.x - target.facing * 120, ARENA_L, ARENA_R);
    fighter.facing = target.x >= fighter.x ? 1 : -1;
  }
  let effect = attack.effect;
  if (effect.k === "copy") {
    const g = fight.graft;
    effect = g ? scaleEffect(g.a2.effect, fight.techMul * 1.3) : { k: "melee", dmg: 36 * fight.techMul, range: 100, stun: 0.2, knock: 80 };
    if (fight.law?.id === "log" && g?.id === "logarithmic") fight.law.logBase = 2;
  }
  if (attack.source === "domain") {
    openPlayerDomain(fight);
    return;
  }
  if (fight.playerTech.id === "logarithmic" && attack.source === "a2" && fight.law?.id === "log" && fight.law.owner === "player") {
    fight.law.logBase = 2;
    fight.banner = "BASE 2";
    fight.bannerT = 1.1;
  }
  if (fight.playerTech.id === "topological" && attack.source === "a2") fight.holeT = Math.max(fight.holeT, 3.5);

  switch (effect.k) {
    case "shot":
      spawnShot(
        fight,
        fighter,
        effect.dmg,
        effect.speed,
        effect.n,
        effect.spread,
        Boolean(effect.homing),
        attack.kind,
        attack.source,
        attack.source === "esilence",
      );
      sfx("m1");
      break;
    case "buff":
      fighter.dmgMul = Math.max(fighter.dmgMul, effect.mul);
      fighter.dmgMulT = Math.max(fighter.dmgMulT, effect.dur);
      floater(fight, fighter.x, fighter.y - 140, "REORDERED", "#2fcaa8");
      burst(fight, fighter.x, fighter.y - 70, fighter.accent, 10, 90);
      break;
    case "armor":
      fighter.armorMul = effect.mul;
      fighter.armorT = effect.dur;
      floater(fight, fighter.x, fighter.y - 140, "AEGIS", "#2fcaa8");
      burst(fight, fighter.x, fighter.y - 70, "#2fcaa8", 12, 70);
      break;
    case "summon":
      for (let i = 0; i < effect.n; i++) {
        fight.summons.push({
          x: fighter.x + fighter.facing * (40 + i * 18),
          y: fighter.y - 110 - i * 8,
          dmg: effect.dmg,
          life: 4,
          owner: fighter.side,
          cd: 0.2 * i,
        });
      }
      sfx("awaken");
      break;
    case "zone":
      fight.hazards.push({
        x: target.x,
        r: effect.r,
        dps: effect.dmg,
        t: effect.dur,
        tick: 0.15,
        owner: fighter.side,
      });
      burst(fight, target.x, FLOOR, fighter.accent, 14, 100);
      break;
    case "spin": {
      const dest = clamp(fighter.x + fighter.facing * 160, ARENA_L, ARENA_R);
      target.x = dest;
      target.y = FLOOR;
      applyHit(fight, {
        attacker: fighter.side,
        target: target.side,
        dmg: effect.dmg,
        kind: attack.kind,
        source: attack.source,
        stun: 0.25,
        knock: 40,
      });
      break;
    }
    case "swap": {
      const x = fighter.x;
      fighter.x = target.x;
      target.x = x;
      fighter.facing = fighter.x < target.x ? 1 : -1;
      target.facing = -fighter.facing as 1 | -1;
      applyHit(fight, {
        attacker: fighter.side,
        target: target.side,
        dmg: effect.dmg,
        kind: attack.kind,
        source: attack.source,
        stun: 0.2,
        knock: 20,
      });
      break;
    }
    case "dash":
      fighter.vx = fighter.facing * (effect.dist / 0.16);
      fighter.iframes = Math.max(fighter.iframes, 0.1);
      fighter.swing = {
        effect: { k: "melee", dmg: effect.dmg, range: 78, stun: 0.16, knock: 120 },
        source: attack.source,
        kind: attack.kind,
        pulse: 0,
        every: 9,
        left: 1,
        total: 1,
      };
      sfx("dash");
      break;
    case "melee":
    case "flurry":
    case "bind":
    case "silence":
    case "parity":
    case "drain":
    case "rewrite":
      fighter.swing = {
        effect,
        source: attack.source,
        kind: attack.kind,
        pulse: 0,
        every: effect.k === "flurry" ? 0.08 : 9,
        left: effect.k === "flurry" ? effect.n : 1,
        total: effect.k === "flurry" ? effect.n : 1,
      };
      sfx(attack.source === "heavy" ? "heavy" : "m1");
      break;
    default:
      break;
  }
}

function swingHit(fight: Fight, fighter: Fighter, swing: Swing): void {
  const target = body(fight, other(fighter.side));
  const effect = swing.effect;
  const range =
    effect.k === "melee" || effect.k === "flurry" || effect.k === "bind" || effect.k === "silence"
      ? effect.range
      : 110;
  if (!inRange(fight, fighter, target, range)) {
    if (swing.left === swing.total) floater(fight, fighter.x + fighter.facing * 40, fighter.y - 120, "WHIFF", "#a39b82");
    swing.left = 0;
    return;
  }
  if (effect.k === "bind") {
    applyHit(fight, {
      attacker: fighter.side,
      target: target.side,
      dmg: effect.dmg,
      kind: swing.kind,
      source: swing.source,
      stun: effect.dur,
      knock: 10,
    });
    return;
  }
  if (effect.k === "silence") {
    target.silenceT = Math.max(target.silenceT, effect.dur);
    if (fighter.side === "player" && swing.source === "a1") fight.erases += 1;
    applyHit(fight, {
      attacker: fighter.side,
      target: target.side,
      dmg: effect.dmg,
      kind: swing.kind,
      source: swing.source,
      stun: 0.2,
      knock: 40,
    });
    floater(fight, target.x, target.y - 160, "ERASED", "#d64545");
    return;
  }
  if (effect.k === "drain") {
    target.outMul = Math.min(target.outMul, 0.68);
    target.outMulT = Math.max(target.outMulT, 6);
    applyHit(fight, {
      attacker: fighter.side,
      target: target.side,
      dmg: effect.dmg,
      kind: swing.kind,
      source: swing.source,
      stun: 0.25,
      knock: 80,
    });
    return;
  }
  if (effect.k === "parity") {
    applyHit(fight, {
      attacker: fighter.side,
      target: target.side,
      dmg: effect.dmg,
      kind: swing.kind,
      source: "parity",
      stun: 0.18,
      knock: 70,
      parity: effect.even ? "even" : "odd",
      skipCollatz: true,
    });
    return;
  }
  if (effect.k === "rewrite") {
    let dmg = effect.dmg;
    if (effect.mode === "percent") dmg += target.hp * 0.14;
    if (effect.mode === "half") dmg += target.hp * 0.22;
    if (effect.mode === "pi") {
      const digit = Number(PI[fight.piI] ?? "3");
      dmg += target.maxHp * (0.04 + digit * 0.012);
    }
    applyHit(fight, {
      attacker: fighter.side,
      target: target.side,
      dmg,
      kind: swing.kind,
      source: swing.source,
      stun: 0.16,
      knock: 50,
    });
    return;
  }
  if (effect.k === "melee" || effect.k === "flurry") {
    applyHit(fight, {
      attacker: fighter.side,
      target: target.side,
      dmg: effect.dmg,
      kind: swing.kind,
      source: swing.source,
      stun: effect.k === "melee" ? effect.stun ?? 0.1 : 0.08,
      knock: effect.k === "melee" ? effect.knock ?? 50 : 36,
    });
  }
}

function tickSwing(fight: Fight, fighter: Fighter, dt: number): void {
  const swing = fighter.swing;
  if (!swing) return;
  swing.pulse -= dt;
  if (swing.pulse > 0) return;
  swingHit(fight, fighter, swing);
  swing.left -= 1;
  swing.pulse = swing.every;
  if (swing.left <= 0) fighter.swing = null;
}

function openPlayerDomain(fight: Fight): void {
  const tech = fight.playerTech;
  let id: DomainId = tech.domain.id;
  let name = tech.domain.name;
  let upgraded = false;
  if (id === "axiom") {
    fight.axiomThisWave = true;
    if (fight.law && fight.law.owner === "enemy") {
      id = fight.law.id;
      name = `${fight.law.name} · Evolved`;
      upgraded = true;
      fight.banner = "AXIOM DEVOURS";
    } else if (fight.enemyDomain) {
      id = fight.enemyDomain;
      name = `${fight.enemyDomainName ?? "Stolen law"} · Evolved`;
      upgraded = true;
      fight.banner = "AXIOM COPIES";
    } else if (fight.slotted) {
      id = fight.slotted.id;
      name = `${fight.slotted.name} · Evolved`;
      upgraded = true;
      fight.banner = "EVOLVED LAW";
    } else {
      name = "Perfect Axiom";
      fight.banner = "PERFECT AXIOM";
    }
    fight.enemy.silenceT = Math.max(fight.enemy.silenceT, 2.4);
  } else if (fight.law && fight.law.owner === "enemy") {
    const pr = rankOf(tech.rarity);
    if (pr >= fight.enemyRank) {
      fight.banner = "DOMAIN CLASH — YOURS HOLDS";
    } else {
      fight.banner = "DOMAIN CLASH — THEIRS HOLDS";
      fight.bannerT = 1.4;
      sfx("domain");
      return;
    }
  }
  const dur = (11 + (fight.techMul - 1) * 4) * (upgraded ? 1.2 : 1);
  fight.law = makeLaw(id, name, "player", dur, upgraded || id !== tech.domain.id);
  if (id === "collatz") fight.hail = 27;
  if (id === "erasure" && fight.enemy.boss) fight.usedErasure = true;
  if (tech.domain.id === "erasure" && fight.enemy.boss) fight.usedErasure = true;
  if (!fight.banner) fight.banner = name.toUpperCase();
  fight.bannerT = 1.5;
  fight.trauma = Math.min(1, fight.trauma + 0.7);
  burst(fight, 480, 300, ACCENT[tech.accent], 28, 180);
  sfx("domain");
}

function enemyDomain(fight: Fight): void {
  fight.enemy.didDomain = true;
  if (!fight.enemyDomain || !fight.enemyDomainName) return;
  if (fight.axiomThisWave || fight.law?.owner === "player" && fight.playerTech.domain.id === "axiom") {
    fight.banner = "DEVOURED";
    fight.bannerT = 1.2;
    return;
  }
  if (fight.law?.owner === "player") {
    const pr = rankOf(fight.playerTech.rarity);
    if (pr >= fight.enemyRank) {
      fight.banner = "CLASH — YOUR LAW HOLDS";
      fight.bannerT = 1.2;
      sfx("domain");
      return;
    }
    fight.banner = "CLASH — THEIR LAW WINS";
  } else fight.banner = fight.enemyDomainName.toUpperCase();
  fight.bannerT = 1.4;
  fight.law = makeLaw(fight.enemyDomain, fight.enemyDomainName, "enemy", 9, false);
  if (fight.enemyDomain === "collatz") fight.hail = 27;
  sfx("domain");
  fight.trauma = Math.min(1, fight.trauma + 0.55);
}

function tickLaw(fight: Fight, dt: number): void {
  const law = fight.law;
  if (!law) return;
  law.t += dt;
  law.lastRootT += dt;
  if (law.id === "multiply") {
    law.tableT += dt;
    const every = law.upgraded ? 4.4 : 3;
    if (law.tableT > every) {
      law.tableT = 0;
      law.table = 2 + Math.floor(Math.random() * 11);
    }
  }
  if (law.id === "counting") {
    law.beatT += dt;
    if (law.beatT > 0.55) {
      law.beatT = 0;
      law.beat = (law.beat % 9) + 1;
    }
  }
  if (law.id === "angles") {
    law.angle = 90 + Math.sin(law.t * 2.2) * 78;
    law.sealT += dt;
    if (law.sealT > 4) {
      law.sealT = 0;
      law.seal = 24 + Math.random() * 132;
    }
  }
  if (law.id === "pi") {
    law.piT += dt;
    if (law.piT > 0.48) {
      law.piT = 0;
      law.piI = (law.piI + 1) % PI.length;
    }
  }
  if (law.id === "exp") {
    law.growthT += dt;
    if (law.growthT > 3) {
      law.growthT = 0;
      law.growth *= 1.38;
    }
  }
  if (law.id === "integral") {
    const p = fight.player;
    if (law.owner === "player" && p.x > 400 && p.x < 580) law.bank += dt * 26;
    if (law.owner === "enemy" && fight.enemy.x > 400 && fight.enemy.x < 580) law.bank += dt * 18;
  }
  if ((law.id === "sum" || law.id === "integral") && law.bank > 0) {
    law.bankT += dt;
    if (law.bankT > 3.3) release(fight);
  }
  if (law.t >= law.duration) {
    if (law.id === "exp") {
      const owner = law.owner;
      applyHit(fight, {
        attacker: owner,
        target: other(owner),
        dmg: 30 * law.growth,
        kind: "domain",
        source: "release",
        stun: 0.3,
        knock: 160,
        noRebank: true,
      });
    }
    if ((law.id === "sum" || law.id === "integral") && law.bank > 0) release(fight);
    fight.law = null;
  }
}

function release(fight: Fight): void {
  const law = fight.law;
  if (!law || law.bank <= 0) return;
  const amount = law.bank;
  law.bank = 0;
  law.bankT = 0;
  applyHit(fight, {
    attacker: law.owner,
    target: other(law.owner),
    dmg: amount,
    kind: "domain",
    source: "release",
    stun: 0.2,
    knock: 60,
    noRebank: true,
  });
  fight.banner = "SUM RELEASED";
  fight.bannerT = 0.8;
}

function writeLawLine(fight: Fight): void {
  const law = fight.law;
  const kind = fight.bossKind;
  if (law) {
    const left = Math.max(0, law.duration - law.t);
    const tag = `${law.name} · ${left.toFixed(1)}s`;
    switch (law.id) {
      case "counting":
        fight.lawLine = `${tag}. Cycle is ${law.beat}. You declared ${law.declared}. Only that number wounds.`;
        break;
      case "multiply":
        fight.lawLine = `${tag}. Table ×${law.table}. Damage scales by ${law.table}/6.${law.upgraded ? " Evolved: the table lingers." : " Wait for a high table if you can."}`;
        break;
      case "angles":
        fight.lawLine = `${tag}. Needle ${Math.round(law.angle)}°. Seal at ${Math.round(law.seal)}°. Strike within ${law.upgraded ? 26 : 16}°.`;
        break;
      case "collatz":
        fight.lawLine =
          law.owner === "player"
            ? `${tag}. n=${fight.hail} (${fight.hail % 2 === 0 ? "EVEN — hit to collapse" : "ODD — weak, or use Odd Explosion"}).`
            : `${tag}. n=${fight.hail} is ${fight.hail % 2 === 0 ? "EVEN — do not get hit" : "ODD — the climb is safer"}.`;
        break;
      case "erasure":
        fight.lawLine = `${tag}. Deletion ${Math.round((law.t / law.duration) * 100)}%. Techniques may fail. Weapons hold.`;
        break;
      case "axiom":
        fight.lawLine = `${tag}. The axiom is bare — their kit had no domain to steal. Your blows are heavier.`;
        break;
      case "right":
        fight.lawLine = `${tag}. Stand on the vertex at center. Oblique strikes are wasted.`;
        break;
      case "pi": {
        const d = PI[law.piI];
        const hot = d === "1" || d === "3" || d === "4" || (law.upgraded && d === "2");
        const hotList = law.upgraded ? "1, 2, 3, 4" : "1, 3, 4";
        fight.lawLine = `${tag}. Digit ${d} is ${hot ? "HOT" : "COLD"}. Hot digits are ${hotList}.`;
        break;
      }
      case "grid":
        fight.lawLine = `${tag}. Stand on a chalk node. Off-grid blows dull.`;
        break;
      case "percent":
        fight.lawLine = `${tag}. Strikes take a percent of remaining life. Front-load them.`;
        break;
      case "prime":
        fight.lawLine = `${tag}. Next hit is ${law.hitIndex + 1}${isPrime(law.hitIndex + 1) ? " — PRIME" : " — composite"}.`;
        break;
      case "sum":
        fight.lawLine = `${tag}. Partial sum ${Math.round(law.bank)}. It pays out every few seconds.`;
        break;
      case "integral":
        fight.lawLine = `${tag}. Area ${Math.round(law.bank)}. Stand in the painted interval to fill it.`;
        break;
      case "shape":
        fight.lawLine = `${tag}. A circle guards the caster. The center square slows the other.`;
        break;
      case "ratio": {
        const t = fight.dealtP + fight.dealtE;
        fight.lawLine = `${tag}. Your share ${Math.round((fight.dealtP / t) * 100)}%. Stay under 62% or your strikes thin.`;
        break;
      }
      case "orbit":
        fight.lawLine = `${tag}. The board wraps. Leaving one edge returns you on the other.`;
        break;
      case "log":
        fight.lawLine = `${tag}. Log base ${law.logBase}. Large blows are crushed until the base drops.`;
        break;
      case "dice":
        fight.lawLine = `${tag}. Every hit rolls a die. Sixes are cruel. Average is honest.`;
        break;
      case "exp":
        fight.lawLine = `${tag}. Growth ×${law.growth.toFixed(2)}. It compounds. The horizon shocks at the end.`;
        break;
      case "derivative":
        fight.lawLine = `${tag}. Damage follows your speed. Dash. A still blade is flat.`;
        break;
      case "matrix":
        fight.lawLine = `${tag}. Hits echo. Positions were swapped when the law opened.`;
        break;
      case "fold":
        fight.lawLine = `${tag}. Melee ignores facing. The center hole eats projectiles.`;
        break;
      case "complex":
        fight.lawLine = `${tag}. Real damage now. Imaginary damage keeps bleeding.`;
        break;
      case "fourier":
        fight.lawLine = `${tag}. Harmonic stack ${law.stacks}. Hit on the beat.`;
        break;
      case "algebra":
        fight.lawLine = `${tag}. Marks ${law.marks % 4}/4. The fourth collapses the kernel.`;
        break;
      case "quadratic":
        fight.lawLine = `${tag}. Two roots are marked. Strike from them. Touch both to detonate.`;
        break;
      case "fraction":
        fight.lawLine = `${tag}. Crossing a quarter of their life severs again.`;
        break;
      default:
        fight.lawLine = tag;
    }
    return;
  }
  if (kind === "hailstone") {
    const even = fight.hail % 2 === 0;
    fight.lawLine = even
      ? `Hailstone n=${fight.hail} EVEN. A heavy or technique collapses them. Weapon taps only sculpt.`
      : `Hailstone n=${fight.hail} ODD. Do not heavy — they will climb and heal. Weapon tap subtracts 1.`;
    return;
  }
  if (kind === "irrational") {
    const d = PI[fight.piI] ?? "3";
    const hot = d === "1" || d === "3" || d === "4";
    fight.lawLine = `π digit ${d} is ${hot ? "HOT — full damage" : "COLD — your strikes dull"}. Hot digits are 1, 3, and 4.`;
    return;
  }
  if (kind === "null") {
    fight.lawLine = "Almost no structure. Techniques skid off. Weapons, Absolute Zero, and the Finger bite.";
    return;
  }
  if (kind === "infinite") {
    fight.lawLine = "Infinite dimensions. Common and rare proofs fall through. Legendary techniques can hold.";
    return;
  }
  if (kind === "shape") {
    fight.lawLine = "The Shape King wants perfect forms. Irregular techniques cut deeper. Avoid lingering in the center cage.";
    return;
  }
  if (fight.mode === "weapon") {
    fight.lawLine = "Cursed energy is under 30%. The technique sleeps. Heavy and weapon special are open.";
  } else if (fight.lecture) {
    fight.lawLine = "Lecture board. Jab with J. Abilities need 30% cursed energy — the well here is full, and it will not bill you.";
  } else if (fight.playerTech.id === "absolute-fingers" && fight.slotted) {
    fight.lawLine = `Technique awake. Perfect Axiom devours an enemy law if one is open. Otherwise it deploys ${fight.slotted.name}, evolved.`;
  } else {
    fight.lawLine = "Technique awake. Spend it on an ability or a domain. Jab with the signature weapon whenever you like.";
  }
}

function canAct(fight: Fight): boolean {
  const p = fight.player;
  if (p.hp <= 0 || p.stun > 0 || p.state === "dash" || p.state === "hurt" || p.state === "dead") return false;
  if (p.state === "attack" && p.attack) {
    const total = p.attack.windup + p.attack.active + p.attack.recover;
    if (p.attackT < total - 0.12) return false;
  }
  return true;
}

function tryAction(fight: Fight, act: string): void {
  if (act >= "1" && act <= "9") {
    if (fight.law?.id === "counting") fight.law.declared = Number(act);
    return;
  }
  const p = fight.player;
  if (p.hp <= 0) return;
  if (act === "rmt") {
    castRmt(fight);
    return;
  }
  if (!canAct(fight)) {
    fight.buffer = act;
    fight.bufferT = 0.18;
    return;
  }
  const tech = fight.ce >= 30;
  if (act === "m1") {
    if (fight.m1T > 0.7) fight.m1 = 0;
    const base = fight.atk.m1[fight.m1] ?? fight.atk.m1[0]!;
    const atk = { ...base, windup: fight.m1 > 0 ? 0.05 : base.windup };
    begin(p, atk);
    fight.m1 = (fight.m1 + 1) % 3;
    fight.m1T = 0;
    return;
  }
  if (act === "heavy") {
    if (tech) return floater(fight, p.x, p.y - 150, "TECHNIQUE MODE", "#a39b82");
    if (fight.cd.heavy > 0) return;
    begin(p, fight.atk.heavy);
    fight.cd.heavy = 1.7;
    fight.m1 = 0;
    return;
  }
  if (act === "special") {
    if (tech) return floater(fight, p.x, p.y - 150, "TECHNIQUE MODE", "#a39b82");
    if (fight.cd.special > 0) return;
    begin(p, fight.atk.special);
    fight.cd.special = 4.8;
    fight.m1 = 0;
    return;
  }
  if (act === "a1" || act === "a2") {
    if (!tech) return floater(fight, p.x, p.y - 150, "NEED 30% CE", "#d64545");
    if (p.silenceT > 0) return floater(fight, p.x, p.y - 150, "SILENCED", "#d64545");
    const cost = act === "a1" ? 14 : 24;
    if (fight.cd[act]! > 0 || !payCe(fight, cost)) return;
    begin(p, act === "a1" ? fight.atk.a1 : fight.atk.a2);
    fight.cd[act] = act === "a1" ? 3.3 : 6.2;
    fight.m1 = 0;
    return;
  }
  if (act === "domain") {
    if (!tech) return floater(fight, p.x, p.y - 150, "NEED 30% CE", "#d64545");
    if (p.silenceT > 0) return floater(fight, p.x, p.y - 150, "SILENCED", "#d64545");
    if (fight.usedDomain) return floater(fight, p.x, p.y - 150, "DOMAIN SPENT", "#a39b82");
    if (!payCe(fight, 40)) return floater(fight, p.x, p.y - 150, "NEED 40% CE", "#d64545");
    fight.usedDomain = true;
    begin(p, fight.atk.domain);
    fight.m1 = 0;
  }
}

function begin(fighter: Fighter, attack: AttackDef): void {
  fighter.state = "attack";
  fighter.attack = attack;
  fighter.attackT = 0;
  fighter.fired = false;
  fighter.swing = null;
  fighter.vx = 0;
}

function castRmt(fight: Fight): void {
  const p = fight.player;
  if (fight.cd.rmt > 0 || p.hp <= 0) return;
  if (fight.rageT <= 0 && fight.ce < 20) {
    floater(fight, p.x, p.y - 150, "NEED 20% CE", "#d64545");
    return;
  }
  const ce = fight.rageT > 0 ? 100 : fight.ce;
  const cost = Math.round(ce * 0.45);
  const pct = 0.2 + 0.2 * (ce / 100);
  const heal = p.maxHp * pct;
  if (fight.rageT <= 0) fight.ce = Math.max(0, ce - cost);
  p.hp = Math.min(p.maxHp, p.hp + heal);
  fight.cd.rmt = 14;
  floater(fight, p.x, p.y - 140, `+${Math.round(heal)}`, "#2fcaa8");
  burst(fight, p.x, p.y - 80, "#2fcaa8", 16, 90);
  sfx("heal");
}

function tickFighter(fight: Fight, fighter: Fighter, dt: number): void {
  fighter.anim += dt;
  fighter.flash = Math.max(0, fighter.flash - dt);
  fighter.squash = Math.max(0, fighter.squash - dt * 1.6);
  fighter.iframes = Math.max(0, fighter.iframes - dt);
  if (fighter.silenceT > 0) fighter.silenceT -= dt;
  if (fighter.dmgMulT > 0) {
    fighter.dmgMulT -= dt;
    if (fighter.dmgMulT <= 0) fighter.dmgMul = 1;
  }
  if (fighter.armorT > 0) {
    fighter.armorT -= dt;
    if (fighter.armorT <= 0) fighter.armorMul = 1;
  }
  if (fighter.outMulT > 0) {
    fighter.outMulT -= dt;
    if (fighter.outMulT <= 0) fighter.outMul = 1;
  }
  if (fighter.stun > 0) {
    fighter.stun -= dt;
    fighter.state = fighter.hp <= 0 ? "dead" : "hurt";
  } else if (fighter.state === "hurt" && fighter.hp > 0) fighter.state = "idle";

  if (fighter.state === "dash") {
    fighter.stateT -= dt;
    if (fighter.stateT <= 0 && fighter.stun <= 0) fighter.state = "idle";
  }
  if (fighter.state === "attack" && fighter.attack && fighter.stun <= 0) {
    fighter.attackT += dt;
    const a = fighter.attack;
    if (!fighter.fired && fighter.attackT >= a.windup) {
      fighter.fired = true;
      fireEffect(fight, fighter, a);
    }
    if (fighter.attackT >= a.windup + a.active + a.recover) {
      fighter.state = "idle";
      fighter.attack = null;
    }
  }
  tickSwing(fight, fighter, dt);

  fighter.vy += 1680 * dt;
  fighter.y += fighter.vy * dt;
  if (fighter.y >= FLOOR) {
    if (!fighter.grounded && fighter.vy > 240) {
      fighter.squash = 0.45;
      burst(fight, fighter.x, FLOOR, "#a39b82", 4, 40);
    }
    fighter.y = FLOOR;
    fighter.vy = 0;
    fighter.grounded = true;
  } else fighter.grounded = false;

  const orbit = fight.law?.id === "orbit";
  fighter.x += fighter.vx * dt;
  if (orbit) {
    if (fighter.x < 80) fighter.x = ARENA_R - 20;
    if (fighter.x > ARENA_R) fighter.x = 90;
  } else {
    fighter.x = clamp(fighter.x, ARENA_L, ARENA_R);
  }
}

function shapeSlow(fight: Fight, fighter: Fighter): number {
  const law = fight.law;
  if (law?.id !== "shape") return 1;
  const inBox = fighter.x > 400 && fighter.x < 560;
  if (!inBox) return 1;
  const slowed = law.owner === "player" ? fighter.side === "enemy" : fighter.side === "player";
  return slowed ? 0.42 : 1;
}

function tickEnemy(fight: Fight, dt: number): void {
  const e = fight.enemy;
  const p = fight.player;
  if (e.hp <= 0 || e.stun > 0 || e.state === "attack" || e.state === "dash" || e.state === "hurt" || e.state === "dead") return;
  const dist = p.x - e.x;
  e.facing = dist >= 0 ? 1 : -1;
  e.brainT -= dt;
  if (e.brainT <= 0) {
    e.brainT = (fight.lecture ? 1.05 : 0.5) + Math.random() * 0.35;
    if (!e.didDomain && e.boss && e.hp < e.maxHp * 0.7 && e.silenceT <= 0 && fight.enemyDomain) {
      begin(e, def("edom", "Domain", { k: "buff", mul: 1, dur: 0.1 }, "tech", "edomain"));
      e.attack!.windup = 0.55;
      return;
    }
    const ad = Math.abs(dist);
    if (ad < 116) {
      begin(
        e,
        def("emelee", "Strike", { k: "melee", dmg: e.dmg, range: 100, stun: 0.22, knock: 140 }, "weapon", "emelee"),
      );
      e.attack!.windup = 0.36;
      return;
    }
    if (e.ranged && ad < 460 && e.silenceT <= 0 && Math.random() < 0.65) {
      const silence = fight.bossKind === "null";
      begin(e, def("eshot", "Cast", { k: "shot", dmg: e.dmg * 0.9, speed: 420, n: 1, spread: 0 }, "tech", silence ? "esilence" : "eshot"));
      e.attack!.windup = 0.32;
      return;
    }
    if (e.boss && ad < 200 && Math.random() < 0.35 && e.silenceT <= 0) {
      begin(e, def("espec", "Special", { k: "melee", dmg: e.dmg * 1.35, range: 130, stun: 0.35, knock: 200 }, "tech", "espec"));
      e.attack!.windup = 0.5;
      return;
    }
  }
  const want = 130;
  const ad = Math.abs(dist);
  if (ad > want + 24) e.vx = Math.sign(dist) * e.speed * shapeSlow(fight, e);
  else if (ad < 78) e.vx = -Math.sign(dist || 1) * e.speed * 0.55;
  else e.vx = 0;
  if (e.state === "idle" || e.state === "walk") e.state = e.vx !== 0 ? "walk" : "idle";
}

function tickShots(fight: Fight, dt: number): void {
  const hole = fight.law?.id === "fold" || fight.holeT > 0;
  for (const s of fight.shots) {
    if (s.homing) {
      const t = body(fight, other(s.owner));
      const dx = t.x - s.x;
      const dy = t.y - 70 - s.y;
      const m = Math.hypot(dx, dy) || 1;
      s.vx += (dx / m) * 520 * dt;
      s.vy += (dy / m) * 520 * dt;
      const sp = Math.hypot(s.vx, s.vy) || 1;
      s.vx = (s.vx / sp) * s.speed;
      s.vy = (s.vy / sp) * s.speed;
    }
    if (fight.law?.id === "orbit") s.vy += Math.sin(fight.time * 6) * 30;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.life -= dt;
    if (fight.law?.id === "fold" || fight.law?.id === "orbit") {
      if (s.x < 40) s.x = ARENA_R;
      if (s.x > ARENA_R + 20) s.x = 50;
    }
    if (hole && Math.hypot(s.x - 480, s.y - 400) < 64) s.life = 0;
    const t = body(fight, other(s.owner));
    if (s.life > 0 && Math.hypot(s.x - t.x, s.y - (t.y - 74)) < 30 + s.r) {
      if (s.silence) t.silenceT = Math.max(t.silenceT, 2.4);
      applyHit(fight, {
        attacker: s.owner,
        target: t.side,
        dmg: s.dmg,
        kind: s.kind,
        source: s.source,
        stun: 0.12,
        knock: 70,
      });
      s.life = 0;
    }
    if (s.y > FLOOR + 20 || s.x < -40 || s.x > 1020) s.life = 0;
  }
  fight.shots = fight.shots.filter((s) => s.life > 0);
}

function tickHazards(fight: Fight, dt: number): void {
  for (const h of fight.hazards) {
    h.t -= dt;
    h.tick -= dt;
    const t = body(fight, other(h.owner));
    if (h.tick <= 0 && Math.abs(t.x - h.x) < h.r && t.y > FLOOR - 20) {
      h.tick = 0.35;
      applyHit(fight, {
        attacker: h.owner,
        target: t.side,
        dmg: h.dps,
        kind: "tech",
        source: "zone",
        stun: 0,
        knock: 0,
      });
    }
  }
  fight.hazards = fight.hazards.filter((h) => h.t > 0);
}

function tickSummons(fight: Fight, dt: number): void {
  for (const s of fight.summons) {
    s.life -= dt;
    s.cd -= dt;
    const t = body(fight, other(s.owner));
    const dx = t.x - s.x;
    const dy = t.y - 80 - s.y;
    const m = Math.hypot(dx, dy) || 1;
    s.x += (dx / m) * 160 * dt;
    s.y += (dy / m) * 160 * dt;
    if (s.cd <= 0 && m < 36) {
      s.cd = 0.45;
      applyHit(fight, {
        attacker: s.owner,
        target: t.side,
        dmg: s.dmg,
        kind: "tech",
        source: "summon",
        stun: 0.05,
        knock: 20,
      });
    }
  }
  fight.summons = fight.summons.filter((s) => s.life > 0);
}

function tickPresent(fight: Fight, dt: number): void {
  fight.trauma = Math.max(0, fight.trauma - dt * 1.7);
  fight.bannerT = Math.max(0, fight.bannerT - dt);
  fight.modeFlashT = Math.max(0, fight.modeFlashT - dt);
  fight.introT = Math.max(0, fight.introT - dt);
  fight.holeT = Math.max(0, fight.holeT - dt);
  if (fight.comboT > 0) {
    fight.comboT -= dt;
    if (fight.comboT <= 0) fight.combo = 0;
  }
  for (const p of fight.parts) {
    p.life -= dt;
    p.vy += 280 * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
  fight.parts = fight.parts.filter((p) => p.life > 0);
  for (const f of fight.floats) {
    f.life -= dt;
    f.y -= 28 * dt;
  }
  fight.floats = fight.floats.filter((f) => f.life > 0);
  if (Math.random() < dt * 6) {
    burst(fight, Math.random() * VW, 20 + Math.random() * 200, "#a39b82", 1, 12);
  }
}

function tickImag(fight: Fight, dt: number): void {
  for (const f of [fight.player, fight.enemy]) {
    if (f.imag <= 0.4) {
      f.imag = 0;
      continue;
    }
    const drip = f.imag * Math.min(1, dt * 1.3);
    f.imag -= drip;
    applyHit(fight, {
      attacker: other(f.side),
      target: f.side,
      dmg: drip,
      kind: "domain",
      source: "imag",
      stun: 0,
      knock: 0,
      noLaw: true,
    });
  }
}

export function stepFight(fight: Fight, input: InputState, dt: number): void {
  fight.time += dt;
  if (fight.hitstop > 0) {
    fight.hitstop -= dt;
    tickPresent(fight, dt);
    return;
  }
  tickPresent(fight, dt);
  if (fight.phase === "combat" || fight.phase === "break" || fight.phase === "resolving") tickRage(fight, dt);
  if (fight.bossKind === "irrational" || fight.law?.id === "pi") {
    fight.piT += dt;
    if (fight.piT > 0.5) {
      fight.piT = 0;
      fight.piI = (fight.piI + 1) % PI.length;
    }
  }
  if (fight.phase === "resolving") {
    fight.resolveT -= dt;
    if (fight.resolveT <= 0) {
      if (fight.player.hp <= 0) fight.phase = "defeat";
      else if (fight.wave + 1 >= fight.waves.length) fight.phase = "victory";
      else fight.phase = "break";
    }
    return;
  }
  if (fight.phase !== "combat") return;

  for (const k of Object.keys(fight.cd)) fight.cd[k] = Math.max(0, (fight.cd[k] ?? 0) - dt);
  fight.m1T += dt;
  if (fight.buffer) {
    fight.bufferT -= dt;
    if (fight.bufferT <= 0) fight.buffer = null;
  }
  const queued = input.queue.shift() ?? (fight.buffer && canAct(fight) ? fight.buffer : null);
  if (queued && queued === fight.buffer) fight.buffer = null;
  if (queued) tryAction(fight, queued);

  const p = fight.player;
  const face: 1 | -1 = fight.enemy.x === p.x ? p.facing : fight.enemy.x > p.x ? 1 : -1;
  if (p.state !== "dash" && p.stun <= 0 && p.hp > 0) p.facing = face;

  if (input.dodge && !fight.dashLatch && fight.cd.dash <= 0 && p.stun <= 0 && p.hp > 0 && p.state !== "dead") {
    const dir: 1 | -1 = input.back && !input.forward ? (face === 1 ? -1 : 1) : face;
    p.state = "dash";
    p.stateT = 0.24;
    p.iframes = 0.18;
    p.attack = null;
    p.swing = null;
    p.vx = dir * 1100;
    fight.cd.dash = 0.55;
    fight.dashLatch = true;
    sfx("dash");
  }
  if (!input.dodge) fight.dashLatch = false;

  if (p.state !== "dash" && p.stun <= 0 && p.hp > 0) {
    let dir = 0;
    if (input.forward && !input.back) dir = face;
    if (input.back && !input.forward) dir = -face;
    if (dir) {
      const attacking = p.state === "attack";
      p.vx = dir * p.speed * (attacking ? 0.55 : 1) * shapeSlow(fight, p);
      if (p.state === "idle") p.state = "walk";
    } else {
      if (p.state === "walk") p.state = "idle";
      p.vx = 0;
    }
    if (input.jump && !fight.jumpLatch && p.grounded && p.state !== "hurt") {
      p.vy = -620;
      p.grounded = false;
      fight.jumpLatch = true;
    }
  }
  if (!input.jump) fight.jumpLatch = false;

  tickEnemy(fight, dt);
  tickFighter(fight, p, dt);
  tickFighter(fight, fight.enemy, dt);
  tickShots(fight, dt);
  tickHazards(fight, dt);
  tickSummons(fight, dt);
  tickLaw(fight, dt);
  for (const d of fight.delayed) d.t -= dt;
  const due = fight.delayed.filter((d) => d.t <= 0);
  fight.delayed = fight.delayed.filter((d) => d.t > 0);
  for (const d of due) applyHit(fight, d.hit);
  tickImag(fight, dt);

  const mode = fight.ce >= 30 ? "tech" : "weapon";
  if (mode !== fight.mode) {
    fight.mode = mode;
    fight.modeFlash = mode === "tech" ? "TECHNIQUE AWAKENED" : "WEAPON FORM";
    fight.modeFlashT = 1.35;
    sfx(mode === "tech" ? "awaken" : "steel");
  }
  writeLawLine(fight);
  checkEnd(fight);
}

export function advanceWave(fight: Fight): void {
  const next = fight.waves[fight.wave + 1];
  if (!next) {
    fight.phase = "victory";
    return;
  }
  fight.wave += 1;
  summonWave(fight, next, true);
  writeLawLine(fight);
}

export function fleeFight(fight: Fight): void {
  fight.phase = "fled";
}

export function declareCount(fight: Fight, n: number): void {
  if (fight.law?.id === "counting") fight.law.declared = n;
}

export function buildReport(fight: Fight, zoneId: string | null): Report {
  return {
    zoneId,
    ritual: fight.ritual,
    fled: fight.phase === "fled",
    spiritKills: fight.spiritKills,
    bossKilled: fight.bossKilled,
    ce: fight.ce,
    erases: fight.erases,
    usedErasureDomain: fight.usedErasure,
    usedAxiom: fight.axiomEver,
    absorbed: fight.absorbedIds,
    equippedId: fight.playerTech.id,
    lecture: fight.lecture,
  };
}

export function healPreview(ce: number): number {
  return Math.round((0.2 + 0.2 * (ce / 100)) * 100);
}

export { PI as PI_DIGITS };
