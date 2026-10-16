export type Rarity = "common" | "rare" | "epic" | "legendary" | "mythic" | "secret";
export type School = "elementary" | "middle" | "high" | "college" | "apex";
export type Accent = "chalk" | "cursed" | "seal";
export type WeaponStyle =
  | "staff"
  | "blade"
  | "hammer"
  | "daggers"
  | "gauntlets"
  | "shears"
  | "scythe"
  | "spear"
  | "twin"
  | "trident"
  | "lance"
  | "bow"
  | "whip"
  | "dice"
  | "orb"
  | "chain"
  | "null"
  | "finger";

export type DomainId =
  | "counting"
  | "sum"
  | "shape"
  | "fraction"
  | "multiply"
  | "ratio"
  | "percent"
  | "grid"
  | "prime"
  | "angles"
  | "right"
  | "orbit"
  | "quadratic"
  | "log"
  | "dice"
  | "exp"
  | "pi"
  | "collatz"
  | "derivative"
  | "integral"
  | "matrix"
  | "fold"
  | "complex"
  | "fourier"
  | "algebra"
  | "erasure"
  | "axiom";

export type Effect =
  | { k: "melee"; dmg: number; range: number; stun?: number; knock?: number }
  | { k: "shot"; dmg: number; speed: number; n: number; spread: number; homing?: boolean }
  | { k: "dash"; dmg: number; dist: number }
  | { k: "bind"; dmg: number; dur: number; range: number }
  | { k: "buff"; mul: number; dur: number }
  | { k: "armor"; mul: number; dur: number }
  | { k: "summon"; n: number; dmg: number }
  | { k: "silence"; dur: number; dmg: number; range: number }
  | { k: "rewrite"; mode: "pi" | "percent" | "half"; dmg: number }
  | { k: "zone"; dmg: number; r: number; dur: number }
  | { k: "spin"; dmg: number }
  | { k: "swap"; dmg: number }
  | { k: "parity"; even: boolean; dmg: number }
  | { k: "drain"; dmg: number }
  | { k: "flurry"; dmg: number; n: number; range: number }
  | { k: "copy" };

export type Technique = {
  id: string;
  name: string;
  school: School;
  rarity: Rarity;
  stars: number;
  weapon: string;
  style: WeaponStyle;
  accent: Accent;
  chaos?: boolean;
  epithet: string;
  a1: { name: string; blurb: string; effect: Effect };
  a2: { name: string; blurb: string; effect: Effect };
  domain: { id: DomainId; name: string; blurb: string; law: string };
};

export const ACCENT: Record<Accent, string> = {
  chalk: "#efe7d2",
  cursed: "#2fcaa8",
  seal: "#e06a62",
};

export const SCHOOL_LABEL: Record<School, string> = {
  elementary: "Elementary",
  middle: "Middle School",
  high: "High School",
  college: "College",
  apex: "Apex",
};

export const RARITY_LABEL: Record<Rarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
  mythic: "Mythic",
  secret: "Secret",
};

const melee = (dmg: number, range = 96, stun = 0.16, knock = 80): Effect => ({
  k: "melee",
  dmg,
  range,
  stun,
  knock,
});

export const TECHNIQUES: Technique[] = [
  {
    id: "counting-finger",
    name: "Counting Finger",
    school: "elementary",
    rarity: "common",
    stars: 2,
    weapon: "Counting Staff",
    style: "staff",
    accent: "chalk",
    epithet: "Nothing lands until it is numbered.",
    a1: {
      name: "One-to-One Mapping",
      blurb: "Pins the foe’s next motion to a single count.",
      effect: { k: "bind", dmg: 14, dur: 0.95, range: 120 },
    },
    a2: {
      name: "Cardinality Surge",
      blurb: "Summons a counting spirit for each nearby mark.",
      effect: { k: "summon", n: 3, dmg: 11 },
    },
    domain: {
      id: "counting",
      name: "Infinite Counting Room",
      blurb: "Declare a number. Only that beat of the cycle may wound.",
      law: "A count cycles from 1 to 9. Strikes land only on your declared number. Everything else is a miscount.",
    },
  },
  {
    id: "addition-cascade",
    name: "Addition Cascade",
    school: "elementary",
    rarity: "common",
    stars: 1,
    weapon: "Sum Blade",
    style: "blade",
    accent: "chalk",
    epithet: "Totals that refuse to stay partial.",
    a1: {
      name: "Partial Sum Barrage",
      blurb: "A fan of small cuts that want to be added.",
      effect: { k: "shot", dmg: 9, speed: 540, n: 5, spread: 0.18 },
    },
    a2: {
      name: "Associative Reorder",
      blurb: "Rearranges your next strikes into a heavier order.",
      effect: { k: "buff", mul: 1.45, dur: 4.5 },
    },
    domain: {
      id: "sum",
      name: "Endless Summation",
      blurb: "Damage is withheld, then released as one total.",
      law: "Most of each hit is banked. Every few seconds the partial sum is paid at once.",
    },
  },
  {
    id: "shape-sorter",
    name: "Shape Sorter",
    school: "elementary",
    rarity: "common",
    stars: 2,
    weapon: "Shape Hammer",
    style: "hammer",
    accent: "chalk",
    epithet: "Perfect forms, cruel edges.",
    a1: {
      name: "Circle Aegis",
      blurb: "A round ward. Incoming blows lose their corners.",
      effect: { k: "armor", mul: 0.62, dur: 4.2 },
    },
    a2: {
      name: "Square Confinement",
      blurb: "Closes a square around the foe and holds them there.",
      effect: { k: "bind", dmg: 18, dur: 1.15, range: 130 },
    },
    domain: {
      id: "shape",
      name: "Perfect Form Garden",
      blurb: "A circle guards you. The center square jails them.",
      law: "You take less damage. Foes standing in the center square are slowed.",
    },
  },
  {
    id: "fraction-splitter",
    name: "Fraction Splitter",
    school: "elementary",
    rarity: "common",
    stars: 1,
    weapon: "Fraction Daggers",
    style: "daggers",
    accent: "chalk",
    epithet: "Wholes are a courtesy.",
    a1: {
      name: "Half-Life Sever",
      blurb: "Cuts away a fraction of whatever remains.",
      effect: { k: "rewrite", mode: "half", dmg: 12 },
    },
    a2: {
      name: "Improper Fraction Storm",
      blurb: "More cuts than the body has places for.",
      effect: { k: "flurry", dmg: 8, n: 5, range: 88 },
    },
    domain: {
      id: "fraction",
      name: "Realm of Equivalent Fractions",
      blurb: "Crossing a quarter of their life severs again.",
      law: "Hits are a little sharper. Crossing each quarter of the foe’s life triggers a sever.",
    },
  },
  {
    id: "times-table",
    name: "Times Table Barrage",
    school: "middle",
    rarity: "rare",
    stars: 3,
    weapon: "Multiplication Gauntlets",
    style: "gauntlets",
    accent: "cursed",
    epithet: "Every blow knows its factors.",
    a1: {
      name: "Factor Detonation",
      blurb: "Leaves a product burning on the floor.",
      effect: { k: "zone", dmg: 14, r: 90, dur: 3.2 },
    },
    a2: {
      name: "Multiple Barrage",
      blurb: "The same strike, several times, all at once.",
      effect: { k: "shot", dmg: 11, speed: 500, n: 6, spread: 0.22 },
    },
    domain: {
      id: "multiply",
      name: "Multiplication Table Hell",
      blurb: "The table changes. Damage changes with it.",
      law: "A table from 2 to 12 rotates every few seconds. All damage is scaled by that table.",
    },
  },
  {
    id: "ratio-weaver",
    name: "Ratio Weaver",
    school: "middle",
    rarity: "rare",
    stars: 3,
    weapon: "Ratio Shears",
    style: "shears",
    accent: "cursed",
    epithet: "Proportion is a leash.",
    a1: {
      name: "Proportion Bind",
      blurb: "Ties their reach to yours and pulls.",
      effect: { k: "bind", dmg: 16, dur: 1, range: 200 },
    },
    a2: {
      name: "Scale Distortion",
      blurb: "Throws the foe along a larger copy of the room.",
      effect: { k: "spin", dmg: 28 },
    },
    domain: {
      id: "ratio",
      name: "Golden Ratio Realm",
      blurb: "Burst past the ratio and your strikes diminish.",
      law: "Keep your share of the damage under the golden cut. Exceed it and further blows weaken.",
    },
  },
  {
    id: "percentage-plague",
    name: "Percentage Plague",
    school: "middle",
    rarity: "rare",
    stars: 3,
    weapon: "Percent Scythe",
    style: "scythe",
    accent: "cursed",
    epithet: "A discount on being alive.",
    a1: {
      name: "Discount Decay",
      blurb: "Shaves a percent off whatever they still have.",
      effect: { k: "rewrite", mode: "percent", dmg: 8 },
    },
    a2: {
      name: "Absolute Critical",
      blurb: "One clean percent, taken absolutely.",
      effect: melee(46, 150, 0.28, 160),
    },
    domain: {
      id: "percent",
      name: "Percent Absolute",
      blurb: "Flat force becomes a percent of remaining life.",
      law: "Strikes deal a percent of current life instead of a flat wound. Healthy foes melt. The dying do not.",
    },
  },
  {
    id: "coordinate-grid",
    name: "Coordinate Grid",
    school: "middle",
    rarity: "rare",
    stars: 3,
    weapon: "Axis Spear",
    style: "spear",
    accent: "cursed",
    epithet: "Ordered pairs, ordered deaths.",
    a1: {
      name: "Ordered Pair Lock",
      blurb: "Fixes the foe to a coordinate.",
      effect: { k: "bind", dmg: 16, dur: 0.9, range: 170 },
    },
    a2: {
      name: "Quadrant Shift",
      blurb: "Swaps your position with theirs.",
      effect: { k: "swap", dmg: 22 },
    },
    domain: {
      id: "grid",
      name: "Infinite Grid",
      blurb: "Only lattice points carry full force.",
      law: "Stand on a chalk node. Off-grid strikes are dulled. On-axis strikes flare.",
    },
  },
  {
    id: "prime-hunter",
    name: "Prime Hunter",
    school: "middle",
    rarity: "rare",
    stars: 3,
    weapon: "Prime Twinblades",
    style: "twin",
    accent: "cursed",
    chaos: true,
    epithet: "Composites shatter. Primes do not forgive.",
    a1: {
      name: "Composite Shatter",
      blurb: "A cross-cut that hates factors.",
      effect: melee(30, 100, 0.18, 90),
    },
    a2: {
      name: "Sieve of Eratosthenes",
      blurb: "Throws out every composite in reach.",
      effect: { k: "shot", dmg: 12, speed: 560, n: 5, spread: 0.28 },
    },
    domain: {
      id: "prime",
      name: "Prime Number Field",
      blurb: "The hit count is judged prime or composite.",
      law: "Each attempted hit is numbered. Prime indices erupt. Composite indices barely scratch.",
    },
  },
  {
    id: "infinite-angles",
    name: "Shrine of Infinite Angles",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Angle Trident",
    style: "trident",
    accent: "cursed",
    chaos: true,
    epithet: "The original shrine. Nothing is right for long.",
    a1: {
      name: "Equilateral Balance",
      blurb: "Three equal sides. A steadier guard and hand.",
      effect: { k: "buff", mul: 1.28, dur: 4.5 },
    },
    a2: {
      name: "Scalene Chaos",
      blurb: "Three unequal throws. None of them polite.",
      effect: { k: "shot", dmg: 14, speed: 520, n: 3, spread: 0.42 },
    },
    domain: {
      id: "angles",
      name: "Shrine of Infinite Angles",
      blurb: "Strike only when the needle sits in the seal.",
      law: "A needle sweeps. Inside the seal, blows are enormous. Off-angle blows wither. This binds everyone.",
    },
  },
  {
    id: "pythagorean",
    name: "Pythagorean Lance",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Hypotenuse Lance",
    style: "lance",
    accent: "cursed",
    epithet: "The long side arrives last, and hardest.",
    a1: {
      name: "a² + b² Blast",
      blurb: "Two legs fly out and meet as the hypotenuse.",
      effect: { k: "shot", dmg: 16, speed: 480, n: 2, spread: 0.35 },
    },
    a2: {
      name: "Legs of the Triangle",
      blurb: "Pins the foe between two spears.",
      effect: { k: "bind", dmg: 26, dur: 1.05, range: 180 },
    },
    domain: {
      id: "right",
      name: "Perfect Right Triangle",
      blurb: "Stand at the marked vertex.",
      law: "A right angle is drawn on the floor. Strike from the vertex for a massive bonus. Elsewhere you are oblique.",
    },
  },
  {
    id: "trigonometric",
    name: "Trigonometric Arc",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Sine-Cosine Twin Blades",
    style: "twin",
    accent: "cursed",
    epithet: "Motion is only allowed along the circle.",
    a1: {
      name: "Unit Circle Orbit",
      blurb: "Spins the foe around you.",
      effect: { k: "spin", dmg: 24 },
    },
    a2: {
      name: "Phase Shift",
      blurb: "Slides a half-turn and cuts on arrival.",
      effect: { k: "dash", dmg: 32, dist: 240 },
    },
    domain: {
      id: "orbit",
      name: "Unit Circle Domain",
      blurb: "The arena wraps. Projectiles bend.",
      law: "Leaving one side of the board returns you on the other. Projectiles curve. Positioning is orbital.",
    },
  },
  {
    id: "quadratic",
    name: "Quadratic Storm",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Parabola Bow",
    style: "bow",
    accent: "cursed",
    epithet: "Two roots. One explosion if you touch both.",
    a1: {
      name: "Discriminant Bomb",
      blurb: "Drops a burning parabola on them.",
      effect: { k: "zone", dmg: 22, r: 110, dur: 2.6 },
    },
    a2: {
      name: "Root Extraction",
      blurb: "Two arrows, aimed at the two roots.",
      effect: { k: "shot", dmg: 18, speed: 640, n: 2, spread: 0.12 },
    },
    domain: {
      id: "quadratic",
      name: "Complete the Square",
      blurb: "The roots are marked. Visit both.",
      law: "Strikes near a root are strengthened. Touch both roots in one breath and the discriminant detonates.",
    },
  },
  {
    id: "logarithmic",
    name: "Logarithmic Spiral",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Log Whip",
    style: "whip",
    accent: "cursed",
    chaos: true,
    epithet: "Huge force, compressed. Small force, kept.",
    a1: {
      name: "Log Scale Crush",
      blurb: "A long lash on a cruel scale.",
      effect: melee(30, 210, 0.2, 140),
    },
    a2: {
      name: "Change of Base",
      blurb: "Rescales the law. In a log domain, the base drops to 2.",
      effect: { k: "buff", mul: 1.4, dur: 5 },
    },
    domain: {
      id: "log",
      name: "Logarithmic Spiral Abyss",
      blurb: "Big hits are crushed. Change the base to open them.",
      law: "Damage passes through a logarithm. Large blows shrink. Change of Base drops the base and lets them through.",
    },
  },
  {
    id: "probability",
    name: "Probability Dice",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Fate Dice",
    style: "dice",
    accent: "cursed",
    chaos: true,
    epithet: "Expected value is a rumor.",
    a1: {
      name: "Expected Value Strike",
      blurb: "The average outcome, thrown as a die.",
      effect: { k: "shot", dmg: 26, speed: 500, n: 1, spread: 0 },
    },
    a2: {
      name: "Critical Probability",
      blurb: "Weights your next moments toward the ugly tail.",
      effect: { k: "buff", mul: 1.55, dur: 4 },
    },
    domain: {
      id: "dice",
      name: "Infinite Sample Space",
      blurb: "Every hit rolls a die.",
      law: "Each strike rolls 1–6. Damage swings around the expected value. A six is cruel.",
    },
  },
  {
    id: "exponential",
    name: "Exponential Growth",
    school: "high",
    rarity: "epic",
    stars: 4,
    weapon: "Growth Staff",
    style: "staff",
    accent: "cursed",
    epithet: "It starts polite.",
    a1: {
      name: "Compound Explosion",
      blurb: "Interest, paid in fire.",
      effect: { k: "zone", dmg: 16, r: 100, dur: 3.4 },
    },
    a2: {
      name: "Doubling Time",
      blurb: "A brief doubling of your hand.",
      effect: { k: "buff", mul: 1.75, dur: 3.2 },
    },
    domain: {
      id: "exp",
      name: "Exponential Horizon",
      blurb: "The multiplier compounds until the horizon breaks.",
      law: "Damage growth compounds every few seconds. At the end, the horizon shocks the foe.",
    },
  },
  {
    id: "pi-sorcerer",
    name: "Pi Sorcerer",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Pi Chronosphere",
    style: "orb",
    accent: "seal",
    epithet: "A non-repeating expansion of the wound.",
    a1: {
      name: "Forward Rotation",
      blurb: "Rotates the foe around the chronosphere.",
      effect: { k: "spin", dmg: 26 },
    },
    a2: {
      name: "Numerical State Reset",
      blurb: "Shoves their condition toward the next digit of π.",
      effect: { k: "rewrite", mode: "pi", dmg: 22 },
    },
    domain: {
      id: "pi",
      name: "Infinite Pissacre",
      blurb: "Attacks land on digits. 1, 3, and 4 are hot.",
      law: "A digit of π advances. Hot digits (1, 3, 4) carry full force. Cold digits dull the strike.",
    },
  },
  {
    id: "collatz",
    name: "Collatz Conjecture",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Collatz Chain",
    style: "chain",
    accent: "seal",
    chaos: true,
    epithet: "Even collapses. Odd climbs, then detonates.",
    a1: {
      name: "Even Collapse",
      blurb: "If n is even, halve it and them. If odd, chip it toward even.",
      effect: { k: "parity", even: true, dmg: 18 },
    },
    a2: {
      name: "Odd Explosion",
      blurb: "If n is odd, the climb 3n+1 explodes outward. If even, it fizzles.",
      effect: { k: "parity", even: false, dmg: 16 },
    },
    domain: {
      id: "collatz",
      name: "Hailstone Sequence",
      blurb: "Every hit steps the sequence.",
      law: "Hits advance the hailstone. Even steps collapse into heavy damage. Odd steps climb and weaken the blow. Even Collapse and Odd Explosion still know their jobs.",
    },
  },
  {
    id: "derivative",
    name: "Derivative Edge",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Tangent Blade",
    style: "blade",
    accent: "seal",
    epithet: "Force equal to how fast you were.",
    a1: {
      name: "Limit Approach",
      blurb: "Closes the distance as the limit goes to zero.",
      effect: { k: "dash", dmg: 28, dist: 260 },
    },
    a2: {
      name: "Chain Rule Combo",
      blurb: "Differentiation, applied four times.",
      effect: { k: "flurry", dmg: 12, n: 4, range: 100 },
    },
    domain: {
      id: "derivative",
      name: "Instantaneous Change",
      blurb: "Standing still is a derivative of nothing.",
      law: "Damage scales with your speed. Dash through them. A still blade is almost flat.",
    },
  },
  {
    id: "integral",
    name: "Integral Flood",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Area Scythe",
    style: "scythe",
    accent: "seal",
    epithet: "Area, finally collected.",
    a1: {
      name: "Antiderivative Aegis",
      blurb: "The ward is the area under a kinder curve.",
      effect: { k: "armor", mul: 0.58, dur: 4 },
    },
    a2: {
      name: "Fundamental Theorem Strike",
      blurb: "Pays the accumulated area in one cut.",
      effect: melee(48, 156, 0.26, 150),
    },
    domain: {
      id: "integral",
      name: "Infinite Accumulation",
      blurb: "Stand in the painted area. It fills, then pays.",
      law: "Hits bank into an integral. Standing in the painted interval fills it faster. It releases as one wound.",
    },
  },
  {
    id: "matrix",
    name: "Matrix Overlord",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Transformation Gauntlets",
    style: "gauntlets",
    accent: "seal",
    epithet: "Every hit is a linear map.",
    a1: {
      name: "Eigenvector Lock",
      blurb: "Locks them to a direction they cannot leave.",
      effect: { k: "bind", dmg: 20, dur: 1.1, range: 110 },
    },
    a2: {
      name: "Matrix Multiplication Barrage",
      blurb: "The blow multiplied by itself.",
      effect: { k: "shot", dmg: 13, speed: 500, n: 4, spread: 0.2 },
    },
    domain: {
      id: "matrix",
      name: "Vector Space Dominion",
      blurb: "You swap places. Hits echo.",
      law: "Opening the domain swaps positions. Each clean hit echoes a moment later at reduced force.",
    },
  },
  {
    id: "topological",
    name: "Topological Fold",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Möbius Ribbon Blade",
    style: "blade",
    accent: "seal",
    chaos: true,
    epithet: "No front. No back. A hole where proof was.",
    a1: {
      name: "Homeomorphism Swap",
      blurb: "A continuous deformation that ends with you elsewhere.",
      effect: { k: "swap", dmg: 24 },
    },
    a2: {
      name: "Hole Creation",
      blurb: "Opens a hole that eats what flies into it.",
      effect: { k: "zone", dmg: 18, r: 80, dur: 3.5 },
    },
    domain: {
      id: "fold",
      name: "Non-Orientable Space",
      blurb: "Edges wrap. A hole sits at the center.",
      law: "Melee reaches through both sides. Projectiles wrap, and the center hole deletes them.",
    },
  },
  {
    id: "complex",
    name: "Complex Plane",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Imaginary Twin Swords",
    style: "twin",
    accent: "seal",
    epithet: "Half the wound is real. Half is still arriving.",
    a1: {
      name: "Real-Imag Split",
      blurb: "Two swords. Two axes.",
      effect: { k: "shot", dmg: 16, speed: 520, n: 2, spread: 0.3 },
    },
    a2: {
      name: "Argand Rotation",
      blurb: "Multiplies their position by i.",
      effect: { k: "spin", dmg: 30 },
    },
    domain: {
      id: "complex",
      name: "Complex Plane Absolute",
      blurb: "Real damage now. Imaginary damage after.",
      law: "Each hit splits. The real part lands at once. The imaginary part bleeds in afterward.",
    },
  },
  {
    id: "fourier",
    name: "Fourier Wave",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Wave Conductor",
    style: "staff",
    accent: "seal",
    epithet: "Hit the fundamental. Harmonics do the rest.",
    a1: {
      name: "Frequency Slice",
      blurb: "A single clean frequency, thrown.",
      effect: { k: "shot", dmg: 28, speed: 600, n: 1, spread: 0 },
    },
    a2: {
      name: "Harmonic Resonance",
      blurb: "Stacks you onto the current tone.",
      effect: { k: "buff", mul: 1.5, dur: 4.5 },
    },
    domain: {
      id: "fourier",
      name: "Infinite Series Symphony",
      blurb: "A metronome. On-beat hits add harmonics.",
      law: "Strikes on the beat add a harmonic stack. Off-beat strikes shed one. Stacks multiply damage.",
    },
  },
  {
    id: "abstract-algebra",
    name: "Abstract Algebra",
    school: "college",
    rarity: "legendary",
    stars: 5,
    weapon: "Group Ring",
    style: "orb",
    accent: "seal",
    epithet: "Structure, then the kernel where structure dies.",
    a1: {
      name: "Homomorphism Bind",
      blurb: "Their next action is a dull image of yours.",
      effect: { k: "bind", dmg: 18, dur: 1.25, range: 150 },
    },
    a2: {
      name: "Kernel Collapse",
      blurb: "Deletes the part of their technique that still maps.",
      effect: { k: "silence", dmg: 26, dur: 3.2, range: 130 },
    },
    domain: {
      id: "algebra",
      name: "Algebraic Structure",
      blurb: "Marks build. The fourth is the kernel.",
      law: "Hits mark the foe. Every fourth mark collapses the kernel for heavy damage. Their blows are dulled while the structure holds.",
    },
  },
  {
    id: "absolute-zero",
    name: "Absolute Zero",
    school: "apex",
    rarity: "mythic",
    stars: 6,
    weapon: "Null Gauntlets",
    style: "null",
    accent: "seal",
    epithet: "A technique with nothing left to prove.",
    a1: {
      name: "Partial Erasure",
      blurb: "Deletes one of their workings for a few seconds.",
      effect: { k: "silence", dmg: 20, dur: 3.6, range: 100 },
    },
    a2: {
      name: "System Wipe",
      blurb: "Strips force out of their technique.",
      effect: { k: "drain", dmg: 34 },
    },
    domain: {
      id: "erasure",
      name: "Total Framework Deletion",
      blurb: "Structures fail as the domain proceeds. Weapons remain.",
      law: "As the domain advances, techniques start to fail. Weapon blows never fail. Enemy force ebbs.",
    },
  },
  {
    id: "absolute-fingers",
    name: "Absolute Fingers",
    school: "apex",
    rarity: "secret",
    stars: 6,
    weapon: "Finger of Decay",
    style: "finger",
    accent: "cursed",
    epithet: "The perfect sorcerer. What it erases, it keeps.",
    a1: {
      name: "Erase Technique",
      blurb: "Removes a technique outright, and remembers the shape.",
      effect: { k: "silence", dmg: 24, dur: 4, range: 120 },
    },
    a2: {
      name: "Copy & Evolve",
      blurb: "Casts your grafted technique, evolved. Without a graft, the finger simply decays.",
      effect: { k: "copy" },
    },
    domain: {
      id: "axiom",
      name: "Perfect Axiom",
      blurb: "Devours the foe’s domain and deploys it, improved.",
      law: "On cast, their domain is absorbed and redeployed with harsher constants. If they have no law, a slotted domain opens instead, evolved. Win while it is open and the technique is yours forever.",
    },
  },
];

export const BY_ID: Record<string, Technique> = Object.fromEntries(
  TECHNIQUES.map((t) => [t.id, t]),
);

export function specialEffect(style: WeaponStyle): Effect {
  switch (style) {
    case "staff":
      return { k: "shot", dmg: 28, speed: 560, n: 1, spread: 0 };
    case "blade":
      return melee(36, 118, 0.22, 170);
    case "hammer":
      return melee(42, 96, 0.4, 60);
    case "daggers":
      return { k: "flurry", dmg: 9, n: 4, range: 84 };
    case "gauntlets":
      return { k: "dash", dmg: 30, dist: 180 };
    case "shears":
      return { k: "melee", dmg: 26, range: 200, stun: 0.25, knock: -220 };
    case "scythe":
      return melee(34, 168, 0.22, 150);
    case "spear":
      return { k: "dash", dmg: 32, dist: 250 };
    case "twin":
      return { k: "flurry", dmg: 14, n: 2, range: 104 };
    case "trident":
      return { k: "shot", dmg: 14, speed: 540, n: 3, spread: 0.16 };
    case "lance":
      return { k: "dash", dmg: 38, dist: 280 };
    case "bow":
      return { k: "shot", dmg: 34, speed: 720, n: 1, spread: 0 };
    case "whip":
      return melee(30, 230, 0.18, 80);
    case "dice":
      return { k: "shot", dmg: 18, speed: 480, n: 3, spread: 0.4 };
    case "orb":
      return { k: "shot", dmg: 26, speed: 420, n: 1, spread: 0, homing: true };
    case "chain":
      return melee(28, 220, 0.2, 100);
    case "null":
      return { k: "silence", dmg: 24, dur: 2.2, range: 96 };
    case "finger":
      return { k: "silence", dmg: 32, dur: 2.6, range: 110 };
  }
}

export type BossKind = "shape" | "irrational" | "hailstone" | "null" | "infinite" | "ritual" | "spirit";

export type WaveSpec = {
  name: string;
  title: string;
  hp: number;
  dmg: number;
  ranged: boolean;
  boss: boolean;
  kind: BossKind;
  techniqueId: string;
  style: WeaponStyle;
  domain?: DomainId;
  domainName?: string;
  rank: number;
};

export type Zone = {
  id: string;
  name: string;
  epithet: string;
  brief: string;
  law: string;
  waves: WaveSpec[];
};

export const ZONES: Zone[] = [
  {
    id: "geometry",
    name: "Geometry District",
    epithet: "Where forms still believe they are perfect.",
    brief: "Chalk streets, right angles, a king who refuses irregularity.",
    law: "The Shape King favors perfect forms. Irregular techniques — angles, primes, chance, Collatz, topology — cut deeper. He cages the center of the board.",
    waves: [
      {
        name: "Chalkling",
        title: "Hatred of a smudged line",
        hp: 150,
        dmg: 8,
        ranged: false,
        boss: false,
        kind: "spirit",
        techniqueId: "shape-sorter",
        style: "hammer",
        rank: 1,
      },
      {
        name: "Right-Angle Wraith",
        title: "Ninety degrees, resentful",
        hp: 175,
        dmg: 9,
        ranged: true,
        boss: false,
        kind: "spirit",
        techniqueId: "pythagorean",
        style: "spear",
        rank: 1,
      },
      {
        name: "The Shape King",
        title: "Boss",
        hp: 520,
        dmg: 11,
        ranged: false,
        boss: true,
        kind: "shape",
        techniqueId: "shape-sorter",
        style: "hammer",
        domain: "shape",
        domainName: "Perfect Form Garden",
        rank: 2,
      },
    ],
  },
  {
    id: "pi",
    name: "Pi Labyrinth",
    epithet: "A health bar that does not repeat.",
    brief: "Corridors of digits. The Irrational has no last place.",
    law: "A digit of π burns overhead. 1, 3, and 4 are hot and take full force. Any other digit dulls you. Pi Sorcerer ignores the cold.",
    waves: [
      {
        name: "Remainder",
        title: "A digit that would not settle",
        hp: 200,
        dmg: 10,
        ranged: true,
        boss: false,
        kind: "spirit",
        techniqueId: "pi-sorcerer",
        style: "orb",
        rank: 2,
      },
      {
        name: "Repeating Ghost",
        title: "Pretends to terminate",
        hp: 220,
        dmg: 11,
        ranged: false,
        boss: false,
        kind: "spirit",
        techniqueId: "trigonometric",
        style: "twin",
        rank: 2,
      },
      {
        name: "The Irrational",
        title: "Boss",
        hp: 700,
        dmg: 13,
        ranged: true,
        boss: true,
        kind: "irrational",
        techniqueId: "pi-sorcerer",
        style: "orb",
        domain: "pi",
        domainName: "Infinite Pissacre",
        rank: 3,
      },
    ],
  },
  {
    id: "collatz",
    name: "Collatz Tower",
    epithet: "Climb, then fall down the stairs of half.",
    brief: "Floors numbered by a sequence that has not been proved.",
    law: "Hailstone n starts at 27. Weapon taps subtract 1 — they do not step the sequence. Heavier strikes do: even halves the boss, odd makes the sequence climb and heals them. Set the parity, then collapse it.",
    waves: [
      {
        name: "Hail Speck",
        title: "An odd number with a grudge",
        hp: 240,
        dmg: 12,
        ranged: false,
        boss: false,
        kind: "spirit",
        techniqueId: "collatz",
        style: "chain",
        rank: 3,
      },
      {
        name: "Stair Wraith",
        title: "Keeps taking the long way",
        hp: 260,
        dmg: 12,
        ranged: true,
        boss: false,
        kind: "spirit",
        techniqueId: "exponential",
        style: "staff",
        rank: 3,
      },
      {
        name: "The Hailstone",
        title: "Boss",
        hp: 860,
        dmg: 14,
        ranged: false,
        boss: true,
        kind: "hailstone",
        techniqueId: "collatz",
        style: "chain",
        domain: "collatz",
        domainName: "Hailstone Sequence",
        rank: 3,
      },
    ],
  },
  {
    id: "void",
    name: "Absolute Void",
    epithet: "Almost no mathematical structure at all.",
    brief: "A room that ate its own axioms. Erasure feels at home.",
    law: "Structured techniques barely catch. Weapon blows bite harder. Absolute Zero and Absolute Fingers tear what little structure remains.",
    waves: [
      {
        name: "Blank Term",
        title: "A variable bound to nothing",
        hp: 290,
        dmg: 14,
        ranged: true,
        boss: false,
        kind: "spirit",
        techniqueId: "absolute-zero",
        style: "null",
        rank: 4,
      },
      {
        name: "Deleted Lemma",
        title: "Was true, once",
        hp: 310,
        dmg: 15,
        ranged: false,
        boss: false,
        kind: "spirit",
        techniqueId: "abstract-algebra",
        style: "orb",
        rank: 4,
      },
      {
        name: "Null Entity",
        title: "Boss",
        hp: 1040,
        dmg: 16,
        ranged: true,
        boss: true,
        kind: "null",
        techniqueId: "absolute-zero",
        style: "null",
        domain: "erasure",
        domainName: "Total Framework Deletion",
        rank: 5,
      },
    ],
  },
  {
    id: "hilbert",
    name: "Hilbert Sanctum",
    epithet: "Infinite dimensions. Most proofs fall through.",
    brief: "A hotel with a room for every technique you do not yet have.",
    law: "Common and rare techniques barely touch what lives here. Epic techniques land in part. Legendary techniques and above can wound it fully.",
    waves: [
      {
        name: "Basis Vector",
        title: "One direction among too many",
        hp: 340,
        dmg: 16,
        ranged: true,
        boss: false,
        kind: "spirit",
        techniqueId: "matrix",
        style: "gauntlets",
        rank: 4,
      },
      {
        name: "Unused Room",
        title: "Already occupied by a guest you cannot see",
        hp: 370,
        dmg: 16,
        ranged: false,
        boss: false,
        kind: "spirit",
        techniqueId: "topological",
        style: "blade",
        rank: 4,
      },
      {
        name: "The Infinite Dimensional",
        title: "Boss",
        hp: 1320,
        dmg: 18,
        ranged: true,
        boss: true,
        kind: "infinite",
        techniqueId: "matrix",
        style: "gauntlets",
        domain: "matrix",
        domainName: "Vector Space Dominion",
        rank: 4,
      },
    ],
  },
];

export const LECTURE_WAVE: WaveSpec = {
  name: "Chalk Apprentice",
  title: "Still counting on their fingers",
  hp: 120,
  dmg: 4,
  ranged: false,
  boss: false,
  kind: "spirit",
  techniqueId: "counting-finger",
  style: "staff",
  rank: 1,
};

export const RITUAL_WAVE: WaveSpec = {
  name: "The Unsolved",
  title: "Birth of the Perfect Sorcerer",
  hp: 1180,
  dmg: 16,
  ranged: true,
  boss: true,
  kind: "ritual",
  techniqueId: "abstract-algebra",
  style: "finger",
  domain: "algebra",
  domainName: "Algebraic Structure",
  rank: 4,
};

export const ZONE_ORDER = ZONES.map((z) => z.id);

export function zoneById(id: string): Zone | undefined {
  return ZONES.find((z) => z.id === id);
}

export const PULL_COST = 40;

export const RATE_ROWS: { label: string; stars: string; chance: string }[] = [
  { label: "Common", stars: "1–2★", chance: "60%" },
  { label: "Rare", stars: "3★", chance: "25%" },
  { label: "Epic", stars: "4★", chance: "12%" },
  { label: "Legendary", stars: "5★", chance: "2.4%" },
  { label: "Mythic", stars: "6★", chance: "0.5%" },
  { label: "Secret seed", stars: "after Absolute Zero", chance: "0.1%" },
];
