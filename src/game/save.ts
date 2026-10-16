import { BY_ID, ZONE_ORDER, type Rarity } from "./data";

export type TechProg = { level: number; weapon: number };

export type Save = {
  v: 1;
  theorems: number;
  ce: number;
  pity: number;
  pulls: number;
  kills: number;
  techs: Record<string, TechProg>;
  equipped: string;
  clears: Record<string, boolean>;
  quest: { s1: boolean; s2: boolean; s3: boolean };
  seed: boolean;
  evolved: boolean;
  absorbed: string[];
  graft: string | null;
  domainSlot: string | null;
  lectured: boolean;
  lesson: boolean;
  shake: boolean;
  sfx: boolean;
};

export type Report = {
  zoneId: string | null;
  ritual: boolean;
  fled: boolean;
  spiritKills: number;
  bossKilled: boolean;
  ce: number;
  erases: number;
  usedErasureDomain: boolean;
  usedAxiom: boolean;
  absorbed: string[];
  equippedId: string;
  lecture: boolean;
};

export type Summary = {
  save: Save;
  theorems: number;
  ceGain: number;
  evolved: boolean;
  absorbedNew: string[];
  title: string;
  detail: string;
};

const KEY = "theorem-save-v1";

export const CAP = 8;

export function freshSave(): Save {
  return {
    v: 1,
    theorems: 100,
    ce: 100,
    pity: 0,
    pulls: 0,
    kills: 0,
    techs: { "counting-finger": { level: 1, weapon: 1 } },
    equipped: "counting-finger",
    clears: {},
    quest: { s1: false, s2: false, s3: false },
    seed: false,
    evolved: false,
    absorbed: [],
    graft: null,
    domainSlot: null,
    lectured: false,
    lesson: false,
    shake: true,
    sfx: true,
  };
}

export function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

function sane(raw: unknown): Save {
  const base = freshSave();
  if (!raw || typeof raw !== "object") return base;
  const s = raw as Partial<Save>;
  const techs: Save["techs"] = { ...base.techs };
  if (s.techs && typeof s.techs === "object") {
    for (const [id, prog] of Object.entries(s.techs)) {
      if (!BY_ID[id] || !prog) continue;
      techs[id] = {
        level: clamp(Math.round(prog.level || 1), 1, CAP),
        weapon: clamp(Math.round(prog.weapon || 1), 1, CAP),
      };
    }
  }
  let equipped = typeof s.equipped === "string" && techs[s.equipped] ? s.equipped : "counting-finger";
  const evolved = Boolean(s.evolved);
  if (evolved && techs["absolute-fingers"]) equipped = techs[equipped] ? equipped : "absolute-fingers";
  if (evolved && equipped === "absolute-zero" && techs["absolute-fingers"]) equipped = "absolute-fingers";
  const absorbed = Array.isArray(s.absorbed) ? s.absorbed.filter((id) => typeof id === "string" && BY_ID[id]) : [];
  const slot = typeof s.domainSlot === "string" && evolved && absorbed.includes(s.domainSlot) ? s.domainSlot : null;
  return {
    v: 1,
    theorems: clamp(Math.round(s.theorems ?? 100), 0, 999999),
    ce: clamp(Math.round(s.ce ?? 100), 0, 100),
    pity: clamp(Math.round(s.pity ?? 0), 0, 90),
    pulls: Math.max(0, Math.round(s.pulls ?? 0)),
    kills: Math.max(0, Math.round(s.kills ?? 0)),
    techs,
    equipped,
    clears: s.clears && typeof s.clears === "object" ? { ...s.clears } : {},
    quest: {
      s1: Boolean(s.quest?.s1),
      s2: Boolean(s.quest?.s2),
      s3: Boolean(s.quest?.s3),
    },
    seed: Boolean(s.seed),
    evolved,
    absorbed,
    graft: typeof s.graft === "string" && BY_ID[s.graft] ? s.graft : null,
    domainSlot: slot,
    lectured: Boolean(s.lectured),
    lesson: Boolean(s.lesson),
    shake: s.shake !== false,
    sfx: s.sfx !== false,
  };
}

export function loadSave(): Save {
  try {
    const text = localStorage.getItem(KEY);
    if (!text) return freshSave();
    return sane(JSON.parse(text));
  } catch {
    return freshSave();
  }
}

export function writeSave(save: Save): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* ignore quota */
  }
}

export function formTitle(kills: number): string {
  const forms = [
    "Auditor",
    "First Form",
    "Second Form",
    "Third Form",
    "Fourth Form",
    "Fifth Form",
    "Adept",
    "Theoremist",
    "Sorcerer",
    "Warden of Proofs",
    "Perfect Candidate",
  ];
  return forms[Math.min(forms.length - 1, Math.floor(kills / 2))] ?? "Auditor";
}

export function maxHpFor(kills: number): number {
  return 124 + Math.min(20, Math.floor(kills / 2)) * 7;
}

export function techPower(level: number): number {
  return 1 + (level - 1) * 0.1;
}

export function weaponPower(rank: number): number {
  return 1 + (rank - 1) * 0.12;
}

export function upgradeCost(kind: "level" | "weapon", rank: number): number {
  return kind === "level" ? 28 * rank : 22 * rank;
}

export function zoneUnlocked(save: Save, zoneId: string): boolean {
  const i = ZONE_ORDER.indexOf(zoneId);
  if (i <= 0) return true;
  const prev = ZONE_ORDER[i - 1];
  return prev ? Boolean(save.clears[prev]) : false;
}

export function ownsZero(save: Save): boolean {
  return Boolean(save.techs["absolute-zero"] || save.evolved);
}

export function equippable(save: Save): string[] {
  return Object.keys(save.techs).filter((id) => {
    if (id === "absolute-fingers") return save.evolved;
    if (id === "absolute-zero" && save.evolved) return false;
    return true;
  });
}

const REFUND: Record<Rarity, number> = {
  common: 18,
  rare: 30,
  epic: 46,
  legendary: 70,
  mythic: 100,
  secret: 80,
};

export function grantTechnique(save: Save, id: string): { save: Save; duplicate: boolean; note: string } {
  const tech = BY_ID[id];
  if (!tech) return { save, duplicate: false, note: "" };
  const next = structuredClone(save);
  const owned = next.techs[id];
  if (!owned) {
    next.techs[id] = { level: 1, weapon: 1 };
    return { save: next, duplicate: false, note: "New technique." };
  }
  let note = "Duplicate. ";
  if (owned.level < CAP) {
    owned.level += 1;
    note += `${tech.name} rose to level ${owned.level}.`;
  } else {
    const bonus = REFUND[tech.rarity];
    next.theorems += bonus;
    note += `Already mastered. +${bonus} theorems.`;
  }
  next.theorems += Math.round(REFUND[tech.rarity] * 0.5);
  note += ` +${Math.round(REFUND[tech.rarity] * 0.5)} theorems.`;
  return { save: next, duplicate: true, note };
}

export function applyReport(save: Save, r: Report): Summary {
  const next = structuredClone(save);
  const lectureWin = r.lecture && !r.fled && r.spiritKills > 0;
  const firstLecture = lectureWin && !next.lectured;

  let theorems = 0;
  let ceGain = 0;
  if (r.lecture) {
    if (firstLecture) {
      theorems = 24;
      ceGain = 8;
      next.lectured = true;
      next.lesson = true;
    }
    next.theorems += theorems;
    next.ce = clamp(next.ce + ceGain, 0, 100);
  } else {
    const zoneIndex = r.zoneId ? Math.max(0, ZONE_ORDER.indexOf(r.zoneId)) : 4;
    theorems = r.spiritKills * (14 + zoneIndex * 3);
    ceGain = r.spiritKills * (14 + zoneIndex * 2);
    if (r.bossKilled && r.zoneId) {
      const first = !next.clears[r.zoneId];
      theorems += (first ? 52 : 30) + zoneIndex * 5;
      ceGain += 26;
      next.clears[r.zoneId] = true;
    }
    if (r.ritual && r.bossKilled) {
      theorems += 80;
      ceGain += 30;
    }
    next.theorems += theorems;
    next.ce = clamp(Math.round(r.ce + ceGain), 0, 100);
    next.kills += r.spiritKills + (r.bossKilled ? 1 : 0);
  }

  let evolved = false;
  const hasZero = Boolean(next.techs["absolute-zero"]);
  if (!next.evolved && hasZero) {
    if (
      r.bossKilled &&
      r.zoneId === "void" &&
      (r.equippedId === "absolute-zero" || r.equippedId === "absolute-fingers")
    ) {
      next.quest.s1 = true;
    }
    if (next.quest.s1 && r.bossKilled && r.usedErasureDomain && !r.fled) next.quest.s2 = true;
    const need = next.seed ? 1 : 3;
    if (next.quest.s1 && next.quest.s2 && r.ritual && r.bossKilled && r.erases >= need) {
      next.quest.s3 = true;
      evolved = true;
      const az = next.techs["absolute-zero"];
      next.techs["absolute-fingers"] = {
        level: az?.level ?? 1,
        weapon: az?.weapon ?? 1,
      };
      next.evolved = true;
      next.equipped = "absolute-fingers";
    }
  }

  const absorbedNew: string[] = [];
  if (r.usedAxiom && (r.equippedId === "absolute-fingers" || evolved)) {
    for (const id of r.absorbed) {
      if (!BY_ID[id] || id === "absolute-fingers") continue;
      if (!next.absorbed.includes(id)) {
        next.absorbed.push(id);
        absorbedNew.push(id);
      }
    }
  }

  let title = "The proof collapsed.";
  let detail = "Cursed energy you spent stays spent. The weapon still works at any tide.";
  if (r.lecture) {
    title = firstLecture ? "The lecture holds." : r.fled ? "You left the board." : lectureWin ? "The apprentice is already solved." : "The chalk won.";
    detail = firstLecture
      ? "A small purse of theorems. The real districts do not forgive a miscount."
      : "Practice does not pay twice. Your cursed energy was not spent.";
  } else if (r.fled) {
    title = "You left the board.";
    detail = "Spirits already unbound still paid their theorems.";
  } else if (r.bossKilled) {
    title = evolved ? "Absolute Zero transmuted." : "The district yields.";
    detail = evolved
      ? "Absolute Fingers is awake. What you erase under Perfect Axiom stays yours."
      : "Theorems returned with you. Cursed energy crept back in.";
  } else if (r.spiritKills > 0) {
    title = "A partial proof.";
    detail = "You kept what the spirits dropped.";
  }

  return { save: next, theorems, ceGain, evolved, absorbedNew, title, detail };
}
