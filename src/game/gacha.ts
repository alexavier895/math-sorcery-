import { BY_ID, PULL_COST, TECHNIQUES, type Rarity } from "./data";
import { grantTechnique, ownsZero, type Save } from "./save";

export type PullReveal = {
  rarity: Rarity | "secret";
  techniqueId: string | null;
  seed: boolean;
  duplicate: boolean;
  note: string;
  pity: number;
};

function rollRarity(pity: number, zero: boolean, rng: () => number): { rarity: Rarity | "secret"; pity: number } {
  const next = pity + 1;
  const base = 0.03;
  const force = next >= 90;
  let p = base;
  if (!force && next >= 70) {
    const t = (next - 69) / 21;
    p = base + (1 - base) * t;
  }
  const leg = force || rng() < p;
  if (!leg) {
    const u = rng();
    const rarity: Rarity = u < 60 / 97 ? "common" : u < 85 / 97 ? "rare" : "epic";
    return { rarity, pity: next };
  }
  const u = rng();
  if (zero) {
    if (u < 0.1 / 3) return { rarity: "secret", pity: 0 };
    if (u < 0.6 / 3) return { rarity: "mythic", pity: 0 };
    return { rarity: "legendary", pity: 0 };
  }
  if (u < 0.6 / 3) return { rarity: "mythic", pity: 0 };
  return { rarity: "legendary", pity: 0 };
}

export function pullOnce(save: Save, rng: () => number = Math.random): { save: Save; reveal: PullReveal } | null {
  if (save.theorems < PULL_COST) return null;
  let next: Save = { ...save, techs: { ...save.techs }, theorems: save.theorems - PULL_COST, pulls: save.pulls + 1 };
  const zero = ownsZero(save);
  const rolled = rollRarity(save.pity, zero, rng);
  next.pity = rolled.pity;

  if (rolled.rarity === "secret") {
    const already = next.seed;
    next.seed = true;
    if (already) next.theorems += 80;
    if (!next.quest.s1 || !next.quest.s2) {
      next.quest = { ...next.quest, s1: true, s2: true };
    }
    return {
      save: next,
      reveal: {
        rarity: "secret",
        techniqueId: null,
        seed: true,
        duplicate: already,
        note: already
          ? "Another seed. It dissolves into 80 theorems."
          : "Absolute Fingers seed. The ritual's early seals crack open.",
        pity: next.pity,
      },
    };
  }

  const pool = TECHNIQUES.filter((t) => t.rarity === rolled.rarity && t.id !== "absolute-fingers");
  const pick = pool[Math.floor(rng() * pool.length)] ?? BY_ID["counting-finger"];
  if (!pick) return null;
  const granted = grantTechnique(next, pick.id);
  next = granted.save;
  return {
    save: next,
    reveal: {
      rarity: rolled.rarity,
      techniqueId: pick.id,
      seed: false,
      duplicate: granted.duplicate,
      note: granted.note,
      pity: next.pity,
    },
  };
}
