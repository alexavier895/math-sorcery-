import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Star, c as Lock, i as Swords, l as BookOpen, n as Volume2, o as Sparkles, s as Map, t as VolumeX, u as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-4aobn2Cf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ctx = null;
var muted = false;
function setMuted(value) {
	muted = value;
}
function unlockAudio() {
	if (typeof window === "undefined") return;
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return;
	if (!ctx) ctx = new AC();
	if (ctx.state === "suspended") ctx.resume();
}
function tone(freq, dur, type, gain, slide = 0) {
	if (!ctx || muted) return;
	const t = ctx.currentTime;
	const o = ctx.createOscillator();
	const g = ctx.createGain();
	o.type = type;
	o.frequency.setValueAtTime(freq, t);
	if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
	g.gain.setValueAtTime(gain, t);
	g.gain.exponentialRampToValueAtTime(8e-4, t + dur);
	o.connect(g);
	g.connect(ctx.destination);
	o.start(t);
	o.stop(t + dur + .02);
}
function sfx(name) {
	if (typeof window === "undefined" || muted) return;
	unlockAudio();
	switch (name) {
		case "m1":
			tone(180 + Math.random() * 40, .06, "triangle", .05);
			break;
		case "heavy":
			tone(90, .14, "sawtooth", .06, -40);
			break;
		case "hit":
			tone(240 + Math.random() * 80, .08, "square", .04);
			tone(120, .1, "triangle", .04, -50);
			break;
		case "heal":
			tone(440, .12, "sine", .05, 220);
			tone(660, .18, "sine", .03, 120);
			break;
		case "domain":
			tone(70, .45, "sawtooth", .06, 30);
			tone(520, .3, "triangle", .03, -200);
			break;
		case "fail":
			tone(110, .12, "square", .04, -40);
			break;
		case "dash":
			tone(300, .08, "sine", .03, 180);
			break;
		case "awaken":
			tone(392, .1, "triangle", .05, 80);
			tone(523, .16, "sine", .04);
			break;
		case "steel":
			tone(160, .1, "square", .04);
			break;
		case "ui":
			tone(640, .04, "sine", .03);
			break;
		case "die":
			tone(200, .35, "sawtooth", .05, -140);
			break;
		case "pull": tone(220, .2, "triangle", .04, 440);
	}
}
var ACCENT = {
	chalk: "#efe7d2",
	cursed: "#2fcaa8",
	seal: "#e06a62"
};
var SCHOOL_LABEL = {
	elementary: "Elementary",
	middle: "Middle School",
	high: "High School",
	college: "College",
	apex: "Apex"
};
var RARITY_LABEL = {
	common: "Common",
	rare: "Rare",
	epic: "Epic",
	legendary: "Legendary",
	mythic: "Mythic",
	secret: "Secret"
};
var melee = (dmg, range = 96, stun = .16, knock = 80) => ({
	k: "melee",
	dmg,
	range,
	stun,
	knock
});
var TECHNIQUES = [
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
			effect: {
				k: "bind",
				dmg: 14,
				dur: .95,
				range: 120
			}
		},
		a2: {
			name: "Cardinality Surge",
			blurb: "Summons a counting spirit for each nearby mark.",
			effect: {
				k: "summon",
				n: 3,
				dmg: 11
			}
		},
		domain: {
			id: "counting",
			name: "Infinite Counting Room",
			blurb: "Declare a number. Only that beat of the cycle may wound.",
			law: "A count cycles from 1 to 9. Strikes land only on your declared number. Everything else is a miscount."
		}
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
			effect: {
				k: "shot",
				dmg: 9,
				speed: 540,
				n: 5,
				spread: .18
			}
		},
		a2: {
			name: "Associative Reorder",
			blurb: "Rearranges your next strikes into a heavier order.",
			effect: {
				k: "buff",
				mul: 1.45,
				dur: 4.5
			}
		},
		domain: {
			id: "sum",
			name: "Endless Summation",
			blurb: "Damage is withheld, then released as one total.",
			law: "Most of each hit is banked. Every few seconds the partial sum is paid at once."
		}
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
			effect: {
				k: "armor",
				mul: .62,
				dur: 4.2
			}
		},
		a2: {
			name: "Square Confinement",
			blurb: "Closes a square around the foe and holds them there.",
			effect: {
				k: "bind",
				dmg: 18,
				dur: 1.15,
				range: 130
			}
		},
		domain: {
			id: "shape",
			name: "Perfect Form Garden",
			blurb: "A circle guards you. The center square jails them.",
			law: "You take less damage. Foes standing in the center square are slowed."
		}
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
			effect: {
				k: "rewrite",
				mode: "half",
				dmg: 12
			}
		},
		a2: {
			name: "Improper Fraction Storm",
			blurb: "More cuts than the body has places for.",
			effect: {
				k: "flurry",
				dmg: 8,
				n: 5,
				range: 88
			}
		},
		domain: {
			id: "fraction",
			name: "Realm of Equivalent Fractions",
			blurb: "Crossing a quarter of their life severs again.",
			law: "Hits are a little sharper. Crossing each quarter of the foe’s life triggers a sever."
		}
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
			effect: {
				k: "zone",
				dmg: 14,
				r: 90,
				dur: 3.2
			}
		},
		a2: {
			name: "Multiple Barrage",
			blurb: "The same strike, several times, all at once.",
			effect: {
				k: "shot",
				dmg: 11,
				speed: 500,
				n: 6,
				spread: .22
			}
		},
		domain: {
			id: "multiply",
			name: "Multiplication Table Hell",
			blurb: "The table changes. Damage changes with it.",
			law: "A table from 2 to 12 rotates every few seconds. All damage is scaled by that table."
		}
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
			effect: {
				k: "bind",
				dmg: 16,
				dur: 1,
				range: 200
			}
		},
		a2: {
			name: "Scale Distortion",
			blurb: "Throws the foe along a larger copy of the room.",
			effect: {
				k: "spin",
				dmg: 28
			}
		},
		domain: {
			id: "ratio",
			name: "Golden Ratio Realm",
			blurb: "Burst past the ratio and your strikes diminish.",
			law: "Keep your share of the damage under the golden cut. Exceed it and further blows weaken."
		}
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
			effect: {
				k: "rewrite",
				mode: "percent",
				dmg: 8
			}
		},
		a2: {
			name: "Absolute Critical",
			blurb: "One clean percent, taken absolutely.",
			effect: melee(46, 150, .28, 160)
		},
		domain: {
			id: "percent",
			name: "Percent Absolute",
			blurb: "Flat force becomes a percent of remaining life.",
			law: "Strikes deal a percent of current life instead of a flat wound. Healthy foes melt. The dying do not."
		}
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
			effect: {
				k: "bind",
				dmg: 16,
				dur: .9,
				range: 170
			}
		},
		a2: {
			name: "Quadrant Shift",
			blurb: "Swaps your position with theirs.",
			effect: {
				k: "swap",
				dmg: 22
			}
		},
		domain: {
			id: "grid",
			name: "Infinite Grid",
			blurb: "Only lattice points carry full force.",
			law: "Stand on a chalk node. Off-grid strikes are dulled. On-axis strikes flare."
		}
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
			effect: melee(30, 100, .18, 90)
		},
		a2: {
			name: "Sieve of Eratosthenes",
			blurb: "Throws out every composite in reach.",
			effect: {
				k: "shot",
				dmg: 12,
				speed: 560,
				n: 5,
				spread: .28
			}
		},
		domain: {
			id: "prime",
			name: "Prime Number Field",
			blurb: "The hit count is judged prime or composite.",
			law: "Each attempted hit is numbered. Prime indices erupt. Composite indices barely scratch."
		}
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
			effect: {
				k: "buff",
				mul: 1.28,
				dur: 4.5
			}
		},
		a2: {
			name: "Scalene Chaos",
			blurb: "Three unequal throws. None of them polite.",
			effect: {
				k: "shot",
				dmg: 14,
				speed: 520,
				n: 3,
				spread: .42
			}
		},
		domain: {
			id: "angles",
			name: "Shrine of Infinite Angles",
			blurb: "Strike only when the needle sits in the seal.",
			law: "A needle sweeps. Inside the seal, blows are enormous. Off-angle blows wither. This binds everyone."
		}
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
			effect: {
				k: "shot",
				dmg: 16,
				speed: 480,
				n: 2,
				spread: .35
			}
		},
		a2: {
			name: "Legs of the Triangle",
			blurb: "Pins the foe between two spears.",
			effect: {
				k: "bind",
				dmg: 26,
				dur: 1.05,
				range: 180
			}
		},
		domain: {
			id: "right",
			name: "Perfect Right Triangle",
			blurb: "Stand at the marked vertex.",
			law: "A right angle is drawn on the floor. Strike from the vertex for a massive bonus. Elsewhere you are oblique."
		}
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
			effect: {
				k: "spin",
				dmg: 24
			}
		},
		a2: {
			name: "Phase Shift",
			blurb: "Slides a half-turn and cuts on arrival.",
			effect: {
				k: "dash",
				dmg: 32,
				dist: 240
			}
		},
		domain: {
			id: "orbit",
			name: "Unit Circle Domain",
			blurb: "The arena wraps. Projectiles bend.",
			law: "Leaving one side of the board returns you on the other. Projectiles curve. Positioning is orbital."
		}
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
			effect: {
				k: "zone",
				dmg: 22,
				r: 110,
				dur: 2.6
			}
		},
		a2: {
			name: "Root Extraction",
			blurb: "Two arrows, aimed at the two roots.",
			effect: {
				k: "shot",
				dmg: 18,
				speed: 640,
				n: 2,
				spread: .12
			}
		},
		domain: {
			id: "quadratic",
			name: "Complete the Square",
			blurb: "The roots are marked. Visit both.",
			law: "Strikes near a root are strengthened. Touch both roots in one breath and the discriminant detonates."
		}
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
			effect: melee(30, 210, .2, 140)
		},
		a2: {
			name: "Change of Base",
			blurb: "Rescales the law. In a log domain, the base drops to 2.",
			effect: {
				k: "buff",
				mul: 1.4,
				dur: 5
			}
		},
		domain: {
			id: "log",
			name: "Logarithmic Spiral Abyss",
			blurb: "Big hits are crushed. Change the base to open them.",
			law: "Damage passes through a logarithm. Large blows shrink. Change of Base drops the base and lets them through."
		}
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
			effect: {
				k: "shot",
				dmg: 26,
				speed: 500,
				n: 1,
				spread: 0
			}
		},
		a2: {
			name: "Critical Probability",
			blurb: "Weights your next moments toward the ugly tail.",
			effect: {
				k: "buff",
				mul: 1.55,
				dur: 4
			}
		},
		domain: {
			id: "dice",
			name: "Infinite Sample Space",
			blurb: "Every hit rolls a die.",
			law: "Each strike rolls 1–6. Damage swings around the expected value. A six is cruel."
		}
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
			effect: {
				k: "zone",
				dmg: 16,
				r: 100,
				dur: 3.4
			}
		},
		a2: {
			name: "Doubling Time",
			blurb: "A brief doubling of your hand.",
			effect: {
				k: "buff",
				mul: 1.75,
				dur: 3.2
			}
		},
		domain: {
			id: "exp",
			name: "Exponential Horizon",
			blurb: "The multiplier compounds until the horizon breaks.",
			law: "Damage growth compounds every few seconds. At the end, the horizon shocks the foe."
		}
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
			effect: {
				k: "spin",
				dmg: 26
			}
		},
		a2: {
			name: "Numerical State Reset",
			blurb: "Shoves their condition toward the next digit of π.",
			effect: {
				k: "rewrite",
				mode: "pi",
				dmg: 22
			}
		},
		domain: {
			id: "pi",
			name: "Infinite Pissacre",
			blurb: "Attacks land on digits. 1, 3, and 4 are hot.",
			law: "A digit of π advances. Hot digits (1, 3, 4) carry full force. Cold digits dull the strike."
		}
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
			effect: {
				k: "parity",
				even: true,
				dmg: 18
			}
		},
		a2: {
			name: "Odd Explosion",
			blurb: "If n is odd, the climb 3n+1 explodes outward. If even, it fizzles.",
			effect: {
				k: "parity",
				even: false,
				dmg: 16
			}
		},
		domain: {
			id: "collatz",
			name: "Hailstone Sequence",
			blurb: "Every hit steps the sequence.",
			law: "Hits advance the hailstone. Even steps collapse into heavy damage. Odd steps climb and weaken the blow. Even Collapse and Odd Explosion still know their jobs."
		}
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
			effect: {
				k: "dash",
				dmg: 28,
				dist: 260
			}
		},
		a2: {
			name: "Chain Rule Combo",
			blurb: "Differentiation, applied four times.",
			effect: {
				k: "flurry",
				dmg: 12,
				n: 4,
				range: 100
			}
		},
		domain: {
			id: "derivative",
			name: "Instantaneous Change",
			blurb: "Standing still is a derivative of nothing.",
			law: "Damage scales with your speed. Dash through them. A still blade is almost flat."
		}
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
			effect: {
				k: "armor",
				mul: .58,
				dur: 4
			}
		},
		a2: {
			name: "Fundamental Theorem Strike",
			blurb: "Pays the accumulated area in one cut.",
			effect: melee(48, 156, .26, 150)
		},
		domain: {
			id: "integral",
			name: "Infinite Accumulation",
			blurb: "Stand in the painted area. It fills, then pays.",
			law: "Hits bank into an integral. Standing in the painted interval fills it faster. It releases as one wound."
		}
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
			effect: {
				k: "bind",
				dmg: 20,
				dur: 1.1,
				range: 110
			}
		},
		a2: {
			name: "Matrix Multiplication Barrage",
			blurb: "The blow multiplied by itself.",
			effect: {
				k: "shot",
				dmg: 13,
				speed: 500,
				n: 4,
				spread: .2
			}
		},
		domain: {
			id: "matrix",
			name: "Vector Space Dominion",
			blurb: "You swap places. Hits echo.",
			law: "Opening the domain swaps positions. Each clean hit echoes a moment later at reduced force."
		}
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
			effect: {
				k: "swap",
				dmg: 24
			}
		},
		a2: {
			name: "Hole Creation",
			blurb: "Opens a hole that eats what flies into it.",
			effect: {
				k: "zone",
				dmg: 18,
				r: 80,
				dur: 3.5
			}
		},
		domain: {
			id: "fold",
			name: "Non-Orientable Space",
			blurb: "Edges wrap. A hole sits at the center.",
			law: "Melee reaches through both sides. Projectiles wrap, and the center hole deletes them."
		}
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
			effect: {
				k: "shot",
				dmg: 16,
				speed: 520,
				n: 2,
				spread: .3
			}
		},
		a2: {
			name: "Argand Rotation",
			blurb: "Multiplies their position by i.",
			effect: {
				k: "spin",
				dmg: 30
			}
		},
		domain: {
			id: "complex",
			name: "Complex Plane Absolute",
			blurb: "Real damage now. Imaginary damage after.",
			law: "Each hit splits. The real part lands at once. The imaginary part bleeds in afterward."
		}
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
			effect: {
				k: "shot",
				dmg: 28,
				speed: 600,
				n: 1,
				spread: 0
			}
		},
		a2: {
			name: "Harmonic Resonance",
			blurb: "Stacks you onto the current tone.",
			effect: {
				k: "buff",
				mul: 1.5,
				dur: 4.5
			}
		},
		domain: {
			id: "fourier",
			name: "Infinite Series Symphony",
			blurb: "A metronome. On-beat hits add harmonics.",
			law: "Strikes on the beat add a harmonic stack. Off-beat strikes shed one. Stacks multiply damage."
		}
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
			effect: {
				k: "bind",
				dmg: 18,
				dur: 1.25,
				range: 150
			}
		},
		a2: {
			name: "Kernel Collapse",
			blurb: "Deletes the part of their technique that still maps.",
			effect: {
				k: "silence",
				dmg: 26,
				dur: 3.2,
				range: 130
			}
		},
		domain: {
			id: "algebra",
			name: "Algebraic Structure",
			blurb: "Marks build. The fourth is the kernel.",
			law: "Hits mark the foe. Every fourth mark collapses the kernel for heavy damage. Their blows are dulled while the structure holds."
		}
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
			effect: {
				k: "silence",
				dmg: 20,
				dur: 3.6,
				range: 100
			}
		},
		a2: {
			name: "System Wipe",
			blurb: "Strips force out of their technique.",
			effect: {
				k: "drain",
				dmg: 34
			}
		},
		domain: {
			id: "erasure",
			name: "Total Framework Deletion",
			blurb: "Structures fail as the domain proceeds. Weapons remain.",
			law: "As the domain advances, techniques start to fail. Weapon blows never fail. Enemy force ebbs."
		}
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
			effect: {
				k: "silence",
				dmg: 24,
				dur: 4,
				range: 120
			}
		},
		a2: {
			name: "Copy & Evolve",
			blurb: "Casts your grafted technique, evolved. Without a graft, the finger simply decays.",
			effect: { k: "copy" }
		},
		domain: {
			id: "axiom",
			name: "Perfect Axiom",
			blurb: "Devours the foe’s domain and deploys it, improved.",
			law: "On cast, their domain is absorbed and redeployed with harsher constants. If they have no law, a slotted domain opens instead, evolved. Win while it is open and the technique is yours forever."
		}
	}
];
var BY_ID = Object.fromEntries(TECHNIQUES.map((t) => [t.id, t]));
function specialEffect(style) {
	switch (style) {
		case "staff": return {
			k: "shot",
			dmg: 28,
			speed: 560,
			n: 1,
			spread: 0
		};
		case "blade": return melee(36, 118, .22, 170);
		case "hammer": return melee(42, 96, .4, 60);
		case "daggers": return {
			k: "flurry",
			dmg: 9,
			n: 4,
			range: 84
		};
		case "gauntlets": return {
			k: "dash",
			dmg: 30,
			dist: 180
		};
		case "shears": return {
			k: "melee",
			dmg: 26,
			range: 200,
			stun: .25,
			knock: -220
		};
		case "scythe": return melee(34, 168, .22, 150);
		case "spear": return {
			k: "dash",
			dmg: 32,
			dist: 250
		};
		case "twin": return {
			k: "flurry",
			dmg: 14,
			n: 2,
			range: 104
		};
		case "trident": return {
			k: "shot",
			dmg: 14,
			speed: 540,
			n: 3,
			spread: .16
		};
		case "lance": return {
			k: "dash",
			dmg: 38,
			dist: 280
		};
		case "bow": return {
			k: "shot",
			dmg: 34,
			speed: 720,
			n: 1,
			spread: 0
		};
		case "whip": return melee(30, 230, .18, 80);
		case "dice": return {
			k: "shot",
			dmg: 18,
			speed: 480,
			n: 3,
			spread: .4
		};
		case "orb": return {
			k: "shot",
			dmg: 26,
			speed: 420,
			n: 1,
			spread: 0,
			homing: true
		};
		case "chain": return melee(28, 220, .2, 100);
		case "null": return {
			k: "silence",
			dmg: 24,
			dur: 2.2,
			range: 96
		};
		case "finger": return {
			k: "silence",
			dmg: 32,
			dur: 2.6,
			range: 110
		};
	}
}
var ZONES = [
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
				rank: 1
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
				rank: 1
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
				rank: 2
			}
		]
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
				rank: 2
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
				rank: 2
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
				rank: 3
			}
		]
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
				rank: 3
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
				rank: 3
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
				rank: 3
			}
		]
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
				rank: 4
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
				rank: 4
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
				rank: 5
			}
		]
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
				rank: 4
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
				rank: 4
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
				rank: 4
			}
		]
	}
];
var LECTURE_WAVE = {
	name: "Chalk Apprentice",
	title: "Still counting on their fingers",
	hp: 120,
	dmg: 4,
	ranged: false,
	boss: false,
	kind: "spirit",
	techniqueId: "counting-finger",
	style: "staff",
	rank: 1
};
var RITUAL_WAVE = {
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
	rank: 4
};
var ZONE_ORDER = ZONES.map((z) => z.id);
function zoneById(id) {
	return ZONES.find((z) => z.id === id);
}
var RATE_ROWS = [
	{
		label: "Common",
		stars: "1–2★",
		chance: "60%"
	},
	{
		label: "Rare",
		stars: "3★",
		chance: "25%"
	},
	{
		label: "Epic",
		stars: "4★",
		chance: "12%"
	},
	{
		label: "Legendary",
		stars: "5★",
		chance: "2.4%"
	},
	{
		label: "Mythic",
		stars: "6★",
		chance: "0.5%"
	},
	{
		label: "Secret seed",
		stars: "after Absolute Zero",
		chance: "0.1%"
	}
];
var KEY = "theorem-save-v1";
function freshSave() {
	return {
		v: 1,
		theorems: 100,
		ce: 100,
		pity: 0,
		pulls: 0,
		kills: 0,
		techs: { "counting-finger": {
			level: 1,
			weapon: 1
		} },
		equipped: "counting-finger",
		clears: {},
		quest: {
			s1: false,
			s2: false,
			s3: false
		},
		seed: false,
		evolved: false,
		absorbed: [],
		graft: null,
		domainSlot: null,
		lectured: false,
		lesson: false,
		shake: true,
		sfx: true
	};
}
function clamp$1(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function sane(raw) {
	const base = freshSave();
	if (!raw || typeof raw !== "object") return base;
	const s = raw;
	const techs = { ...base.techs };
	if (s.techs && typeof s.techs === "object") for (const [id, prog] of Object.entries(s.techs)) {
		if (!BY_ID[id] || !prog) continue;
		techs[id] = {
			level: clamp$1(Math.round(prog.level || 1), 1, 8),
			weapon: clamp$1(Math.round(prog.weapon || 1), 1, 8)
		};
	}
	let equipped = typeof s.equipped === "string" && techs[s.equipped] ? s.equipped : "counting-finger";
	const evolved = Boolean(s.evolved);
	if (evolved && techs["absolute-fingers"]) equipped = techs[equipped] ? equipped : "absolute-fingers";
	if (evolved && equipped === "absolute-zero" && techs["absolute-fingers"]) equipped = "absolute-fingers";
	const absorbed = Array.isArray(s.absorbed) ? s.absorbed.filter((id) => typeof id === "string" && BY_ID[id]) : [];
	const slot = typeof s.domainSlot === "string" && evolved && absorbed.includes(s.domainSlot) ? s.domainSlot : null;
	return {
		v: 1,
		theorems: clamp$1(Math.round(s.theorems ?? 100), 0, 999999),
		ce: clamp$1(Math.round(s.ce ?? 100), 0, 100),
		pity: clamp$1(Math.round(s.pity ?? 0), 0, 90),
		pulls: Math.max(0, Math.round(s.pulls ?? 0)),
		kills: Math.max(0, Math.round(s.kills ?? 0)),
		techs,
		equipped,
		clears: s.clears && typeof s.clears === "object" ? { ...s.clears } : {},
		quest: {
			s1: Boolean(s.quest?.s1),
			s2: Boolean(s.quest?.s2),
			s3: Boolean(s.quest?.s3)
		},
		seed: Boolean(s.seed),
		evolved,
		absorbed,
		graft: typeof s.graft === "string" && BY_ID[s.graft] ? s.graft : null,
		domainSlot: slot,
		lectured: Boolean(s.lectured),
		lesson: Boolean(s.lesson),
		shake: s.shake !== false,
		sfx: s.sfx !== false
	};
}
function loadSave() {
	try {
		const text = localStorage.getItem(KEY);
		if (!text) return freshSave();
		return sane(JSON.parse(text));
	} catch {
		return freshSave();
	}
}
function writeSave(save) {
	try {
		localStorage.setItem(KEY, JSON.stringify(save));
	} catch {}
}
function formTitle(kills) {
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
		"Perfect Candidate"
	];
	return forms[Math.min(forms.length - 1, Math.floor(kills / 2))] ?? "Auditor";
}
function maxHpFor(kills) {
	return 124 + Math.min(20, Math.floor(kills / 2)) * 7;
}
function techPower(level) {
	return 1 + (level - 1) * .1;
}
function weaponPower(rank) {
	return 1 + (rank - 1) * .12;
}
function upgradeCost(kind, rank) {
	return kind === "level" ? 28 * rank : 22 * rank;
}
function zoneUnlocked(save, zoneId) {
	const i = ZONE_ORDER.indexOf(zoneId);
	if (i <= 0) return true;
	const prev = ZONE_ORDER[i - 1];
	return prev ? Boolean(save.clears[prev]) : false;
}
function ownsZero(save) {
	return Boolean(save.techs["absolute-zero"] || save.evolved);
}
function equippable(save) {
	return Object.keys(save.techs).filter((id) => {
		if (id === "absolute-fingers") return save.evolved;
		if (id === "absolute-zero" && save.evolved) return false;
		return true;
	});
}
var REFUND = {
	common: 18,
	rare: 30,
	epic: 46,
	legendary: 70,
	mythic: 100,
	secret: 80
};
function grantTechnique(save, id) {
	const tech = BY_ID[id];
	if (!tech) return {
		save,
		duplicate: false,
		note: ""
	};
	const next = structuredClone(save);
	const owned = next.techs[id];
	if (!owned) {
		next.techs[id] = {
			level: 1,
			weapon: 1
		};
		return {
			save: next,
			duplicate: false,
			note: "New technique."
		};
	}
	let note = "Duplicate. ";
	if (owned.level < 8) {
		owned.level += 1;
		note += `${tech.name} rose to level ${owned.level}.`;
	} else {
		const bonus = REFUND[tech.rarity];
		next.theorems += bonus;
		note += `Already mastered. +${bonus} theorems.`;
	}
	next.theorems += Math.round(REFUND[tech.rarity] * .5);
	note += ` +${Math.round(REFUND[tech.rarity] * .5)} theorems.`;
	return {
		save: next,
		duplicate: true,
		note
	};
}
function applyReport(save, r) {
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
		next.ce = clamp$1(next.ce + ceGain, 0, 100);
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
		next.ce = clamp$1(Math.round(r.ce + ceGain), 0, 100);
		next.kills += r.spiritKills + (r.bossKilled ? 1 : 0);
	}
	let evolved = false;
	const hasZero = Boolean(next.techs["absolute-zero"]);
	if (!next.evolved && hasZero) {
		if (r.bossKilled && r.zoneId === "void" && (r.equippedId === "absolute-zero" || r.equippedId === "absolute-fingers")) next.quest.s1 = true;
		if (next.quest.s1 && r.bossKilled && r.usedErasureDomain && !r.fled) next.quest.s2 = true;
		const need = next.seed ? 1 : 3;
		if (next.quest.s1 && next.quest.s2 && r.ritual && r.bossKilled && r.erases >= need) {
			next.quest.s3 = true;
			evolved = true;
			const az = next.techs["absolute-zero"];
			next.techs["absolute-fingers"] = {
				level: az?.level ?? 1,
				weapon: az?.weapon ?? 1
			};
			next.evolved = true;
			next.equipped = "absolute-fingers";
		}
	}
	const absorbedNew = [];
	if (r.usedAxiom && (r.equippedId === "absolute-fingers" || evolved)) for (const id of r.absorbed) {
		if (!BY_ID[id] || id === "absolute-fingers") continue;
		if (!next.absorbed.includes(id)) {
			next.absorbed.push(id);
			absorbedNew.push(id);
		}
	}
	let title = "The proof collapsed.";
	let detail = "Cursed energy you spent stays spent. The weapon still works at any tide.";
	if (r.lecture) {
		title = firstLecture ? "The lecture holds." : r.fled ? "You left the board." : lectureWin ? "The apprentice is already solved." : "The chalk won.";
		detail = firstLecture ? "A small purse of theorems. The real districts do not forgive a miscount." : "Practice does not pay twice. Your cursed energy was not spent.";
	} else if (r.fled) {
		title = "You left the board.";
		detail = "Spirits already unbound still paid their theorems.";
	} else if (r.bossKilled) {
		title = evolved ? "Absolute Zero transmuted." : "The district yields.";
		detail = evolved ? "Absolute Fingers is awake. What you erase under Perfect Axiom stays yours." : "Theorems returned with you. Cursed energy crept back in.";
	} else if (r.spiritKills > 0) {
		title = "A partial proof.";
		detail = "You kept what the spirits dropped.";
	}
	return {
		save: next,
		theorems,
		ceGain,
		evolved,
		absorbedNew,
		title,
		detail
	};
}
function rollRarity(pity, zero, rng) {
	const next = pity + 1;
	const base = .03;
	const force = next >= 90;
	let p = base;
	if (!force && next >= 70) p = base + .97 * ((next - 69) / 21);
	if (!(force || rng() < p)) {
		const u = rng();
		return {
			rarity: u < 60 / 97 ? "common" : u < 85 / 97 ? "rare" : "epic",
			pity: next
		};
	}
	const u = rng();
	if (zero) {
		if (u < .1 / 3) return {
			rarity: "secret",
			pity: 0
		};
		if (u < .6 / 3) return {
			rarity: "mythic",
			pity: 0
		};
		return {
			rarity: "legendary",
			pity: 0
		};
	}
	if (u < .6 / 3) return {
		rarity: "mythic",
		pity: 0
	};
	return {
		rarity: "legendary",
		pity: 0
	};
}
function pullOnce(save, rng = Math.random) {
	if (save.theorems < 40) return null;
	let next = {
		...save,
		techs: { ...save.techs },
		theorems: save.theorems - 40,
		pulls: save.pulls + 1
	};
	const zero = ownsZero(save);
	const rolled = rollRarity(save.pity, zero, rng);
	next.pity = rolled.pity;
	if (rolled.rarity === "secret") {
		const already = next.seed;
		next.seed = true;
		if (already) next.theorems += 80;
		if (!next.quest.s1 || !next.quest.s2) next.quest = {
			...next.quest,
			s1: true,
			s2: true
		};
		return {
			save: next,
			reveal: {
				rarity: "secret",
				techniqueId: null,
				seed: true,
				duplicate: already,
				note: already ? "Another seed. It dissolves into 80 theorems." : "Absolute Fingers seed. The ritual's early seals crack open.",
				pity: next.pity
			}
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
			pity: next.pity
		}
	};
}
var PI = "3141592653589793238462643383279502884197";
var NODES = [
	150,
	300,
	450,
	600,
	750
];
function clamp(n, a, b) {
	return Math.max(a, Math.min(b, n));
}
function isPrime(n) {
	if (n < 2) return false;
	for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
	return true;
}
function rankOf(r) {
	return {
		common: 1,
		rare: 2,
		epic: 3,
		legendary: 4,
		mythic: 5,
		secret: 6
	}[r];
}
function timings(effect) {
	switch (effect.k) {
		case "shot": return {
			windup: .16,
			active: .08,
			recover: .28
		};
		case "dash": return {
			windup: .06,
			active: .16,
			recover: .18
		};
		case "bind":
		case "silence": return {
			windup: .18,
			active: .1,
			recover: .3
		};
		case "flurry": return {
			windup: .08,
			active: .08 * effect.n,
			recover: .22
		};
		case "buff":
		case "armor": return {
			windup: .12,
			active: .08,
			recover: .2
		};
		default: return {
			windup: .14,
			active: .12,
			recover: .26
		};
	}
}
function scaleEffect(effect, mul) {
	if ("dmg" in effect && typeof effect.dmg === "number") return {
		...effect,
		dmg: Math.round(effect.dmg * mul * 10) / 10
	};
	return { ...effect };
}
function def(id, name, effect, kind, source) {
	return {
		id,
		name,
		...timings(effect),
		effect,
		kind,
		source
	};
}
function makeFighter(partial) {
	return {
		y: 458,
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
		brainT: .6,
		didDomain: false,
		stunResist: 1,
		ranged: false,
		title: "",
		accent: ACCENT.chalk,
		style: "blade",
		anim: 0,
		boss: false,
		...partial
	};
}
function makeLaw(id, name, owner, duration, upgraded) {
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
		piT: 0
	};
}
function createFight(opts) {
	const wMul = weaponPower(opts.weaponRank);
	const tMul = techPower(opts.techLevel);
	const tech = opts.tech;
	const m1 = [
		11,
		13,
		20
	].map((d, i) => def(`m1-${i}`, "Weapon", {
		k: "melee",
		dmg: d * wMul,
		range: 104 + i * 8,
		stun: .1,
		knock: 40 + i * 30
	}, "weapon", "m1"));
	const fight = {
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
			speed: 280,
			accent: ACCENT[tech.accent],
			style: tech.style,
			title: tech.name
		}),
		enemy: makeFighter({
			side: "enemy",
			name: "",
			x: 760,
			hp: 1,
			maxHp: 1
		}),
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
			heavy: def("heavy", "Heavy", {
				k: "melee",
				dmg: 30 * wMul,
				range: 108,
				stun: .32,
				knock: 210
			}, "weapon", "heavy"),
			special: def("special", "Special", scaleEffect(specialEffect(tech.style), wMul), "weapon", "special"),
			a1: def("a1", tech.a1.name, scaleEffect(tech.a1.effect, tMul), "tech", "a1"),
			a2: def("a2", tech.a2.name, scaleEffect(tech.a2.effect, tMul * 1.05), "tech", "a2"),
			domain: def("domain", tech.domain.name, {
				k: "buff",
				mul: 1,
				dur: .05
			}, "tech", "domain")
		},
		m1: 0,
		m1T: 0,
		cd: {
			heavy: 0,
			special: 0,
			a1: 0,
			a2: 0,
			domain: 0,
			dash: 0,
			rmt: 0
		},
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
		logNote: ""
	};
	fight.atk.heavy.windup = .28;
	fight.atk.heavy.recover = .34;
	fight.atk.domain.windup = .46;
	fight.atk.domain.recover = .36;
	summonWave(fight, opts.waves[0], false);
	writeLawLine(fight);
	return fight;
}
function summonWave(fight, wave, heal) {
	if (heal) fight.player.hp = Math.min(fight.player.maxHp, fight.player.hp + fight.player.maxHp * .12);
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
		stunResist: wave.boss ? .48 : 1,
		ranged: wave.ranged,
		boss: wave.boss,
		brainT: .45
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
function burst(fight, x, y, color, n, speed) {
	for (let i = 0; i < n; i++) {
		if (fight.parts.length > 150) fight.parts.shift();
		const a = Math.random() * Math.PI * 2;
		const s = speed * (.35 + Math.random());
		const life = .35 + Math.random() * .4;
		fight.parts.push({
			x,
			y,
			vx: Math.cos(a) * s,
			vy: Math.sin(a) * s - 30,
			life,
			max: life,
			color,
			r: 1.2 + Math.random() * 2.2
		});
	}
}
function floater(fight, x, y, text, color) {
	if (!text) return;
	if (fight.floats.length > 18) fight.floats.shift();
	fight.floats.push({
		x,
		y,
		text,
		life: .85,
		max: .85,
		color
	});
}
function other(side) {
	return side === "player" ? "enemy" : "player";
}
function body(fight, side) {
	return side === "player" ? fight.player : fight.enemy;
}
function inRange(fight, a, b, range) {
	const dx = b.x - a.x;
	return (fight.law?.id === "fold" || Math.abs(dx) < 26 || Math.sign(dx) === a.facing) && Math.abs(dx) <= range && Math.abs(b.y - a.y) < 150;
}
function applyHit(fight, hit) {
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
			dmg *= .55;
			note = `SET UP → ${fight.hail}`;
		} else if (fight.hail % 2 === 1) {
			const next = 3 * fight.hail + 1;
			dmg += (next - fight.hail) * .85;
			fight.hail = next;
			note = `ODD BURST → ${fight.hail}`;
		} else {
			dmg *= .45;
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
	if (hit.attacker === "player" && hit.kind !== "domain") dmg *= 1 + .04 * Math.min(10, fight.combo);
	dmg = Math.max(1, Math.round(dmg));
	const before = target.hp;
	target.hp -= dmg;
	if (fight.law?.id === "fraction" && hit.target === fight.law.victim) for (const q of [
		.75,
		.5,
		.25
	]) {
		const line = target.maxHp * q;
		if (before > line && target.hp <= line) {
			target.hp -= 18 * (fight.law.upgraded ? 1.25 : 1);
			floater(fight, target.x + 20, target.y - 100, "SEVER", "#efe7d2");
		}
	}
	if (hit.attacker === "player" && hit.kind !== "domain") {
		fight.combo += 1;
		fight.comboT = 1.3;
	}
	target.flash = .12;
	target.vx += Math.sign(target.x - attacker.x || attacker.facing) * hit.knock;
	const stun = hit.stun * target.stunResist;
	if (stun > .04) {
		target.stun = Math.max(target.stun, stun);
		if (target.state !== "dead") {
			target.state = "hurt";
			target.attack = null;
			target.swing = null;
		}
	}
	floater(fight, target.x, target.y - 130, `${note ? note + " " : ""}${dmg}`, hit.attacker === "player" ? "#efe7d2" : "#d64545");
	burst(fight, (attacker.x + target.x) / 2, target.y - 80, attacker.accent, hit.kind === "weapon" ? 7 : 12, 140);
	fight.trauma = Math.min(1, fight.trauma + Math.min(.55, dmg / 90));
	if (hit.source !== "imag") fight.hitstop = dmg > 24 ? .055 : .03;
	sfx(hit.source === "heavy" ? "heavy" : "hit");
	if (target.hp <= 0) target.hp = 0;
	checkEnd(fight);
}
function applyLaw(fight, hit, dmg) {
	const law = fight.law;
	const attacker = body(fight, hit.attacker);
	const target = body(fight, hit.target);
	let note = "";
	let cancel = false;
	let heal = 0;
	const up = law.upgraded ? 1.22 : 1;
	switch (law.id) {
		case "counting":
			if (law.beat !== law.declared) {
				cancel = true;
				note = `MISCOUNT ${law.beat}≠${law.declared}`;
			} else {
				dmg *= 2.15 * up;
				note = `COUNTED ${law.beat}`;
			}
			break;
		case "multiply":
			dmg *= law.table / 6 * up;
			note = `×${law.table}`;
			break;
		case "angles": {
			const window = law.upgraded ? 26 : 16;
			if (Math.abs(law.angle - law.seal) <= window) {
				dmg *= 2.35 * up;
				note = "TRUE ANGLE";
			} else {
				dmg *= .34;
				note = "OFF-ANGLE";
			}
			break;
		}
		case "collatz":
			if (hit.target === law.victim && !hit.skipCollatz && hit.source !== "release" && hit.source !== "imag") {
				if (fight.hail % 2 === 0) {
					const prev = fight.hail;
					fight.hail = Math.max(1, fight.hail / 2);
					dmg *= 1.9 * up;
					note = `EVEN ${prev}→${fight.hail}`;
				} else {
					const prev = fight.hail;
					fight.hail = 3 * fight.hail + 1;
					dmg *= .4;
					const victim = body(fight, law.victim);
					victim.dmgMul = Math.max(victim.dmgMul, 1.28);
					victim.dmgMulT = Math.max(victim.dmgMulT, 2);
					note = `ODD ${prev}→${fight.hail}`;
				}
			}
			break;
		case "erasure": {
			const p = clamp(law.t / law.duration, 0, 1);
			if (hit.kind === "tech" && Math.random() < p * .85) {
				cancel = true;
				note = "ERASED";
			}
			if (hit.attacker === "enemy") dmg *= 1 - .48 * p;
			dmg *= up;
			break;
		}
		case "axiom":
			dmg *= 1.5 * up;
			note = "AXIOM";
			break;
		case "right":
			if (Math.abs(attacker.x - law.vertexX) < 38) {
				dmg *= 2.3 * up;
				note = "RIGHT ANGLE";
			} else {
				dmg *= .6;
				note = "OBLIQUE";
			}
			break;
		case "pi": {
			const digit = "3141592653589793238462643383279502884197"[law.piI] ?? "1";
			if (digit === "1" || digit === "3" || digit === "4" || law.upgraded && digit === "2") {
				dmg *= 1.9 * up;
				note = `π ${digit} HOT`;
			} else {
				dmg *= .4;
				note = `π ${digit} COLD`;
			}
			break;
		}
		case "grid":
			if (NODES.some((n) => Math.abs(attacker.x - n) < 34)) {
				dmg *= 1.85 * up;
				note = "ON AXIS";
			} else {
				dmg *= .66;
				note = "OFF GRID";
			}
			break;
		case "percent":
			dmg = Math.max(8, target.hp * .09) * up;
			note = "PERCENT";
			break;
		case "prime":
			law.hitIndex += 1;
			if (isPrime(law.hitIndex)) {
				dmg *= 2.25 * up;
				note = `PRIME ${law.hitIndex}`;
			} else {
				dmg *= .5;
				note = `COMPOSITE ${law.hitIndex}`;
			}
			break;
		case "fraction":
			dmg *= 1.12 * up;
			break;
		case "sum":
			if (!hit.noRebank && hit.source !== "release") {
				law.bank += dmg * .8;
				dmg *= .2;
				note = `BANK ${Math.round(law.bank)}`;
			} else dmg *= up;
			break;
		case "shape":
			if (hit.target === law.owner) dmg *= .62;
			else dmg *= up;
			note = "FORM";
			break;
		case "ratio": {
			const total = fight.dealtP + fight.dealtE + dmg;
			if (((hit.attacker === "player" ? fight.dealtP : fight.dealtE) + dmg) / total > .62) {
				dmg *= .52;
				note = "PAST φ";
			} else {
				dmg *= 1.15 * up;
				note = "IN RATIO";
			}
			if (hit.attacker === "player") fight.dealtP += dmg;
			else fight.dealtE += dmg;
			break;
		}
		case "orbit":
			dmg *= 1.1 * up;
			note = "ORBITAL";
			break;
		case "log": {
			const base = law.logBase;
			dmg = 24 * Math.log(1 + Math.max(0, dmg)) / Math.log(base) * up;
			note = `LOG ${base}`;
			break;
		}
		case "dice": {
			const roll = 1 + Math.floor(Math.random() * 6);
			dmg *= roll / 3.5 * (roll === 6 ? 1.4 : 1) * up;
			note = `DIE ${roll}`;
			break;
		}
		case "exp":
			dmg *= law.growth * up;
			note = `GROWTH ${law.growth.toFixed(2)}`;
			break;
		case "derivative": {
			const sp = Math.abs(attacker.vx);
			const m = clamp(sp / 230, .4, 2.4);
			dmg *= m * up;
			note = sp > 200 ? "STEEP" : "FLAT";
			break;
		}
		case "integral":
			if (!hit.noRebank && hit.source !== "release") {
				law.bank += dmg * .75;
				dmg *= .25;
				note = `AREA ${Math.round(law.bank)}`;
			}
			break;
		case "matrix":
			dmg *= 1.05 * up;
			if (!hit.echo && hit.source !== "imag") {
				fight.delayed.push({
					t: .16,
					hit: {
						...hit,
						dmg: hit.dmg * .55,
						echo: true,
						stun: 0,
						knock: 16,
						noLaw: false
					}
				});
				note = "ECHO";
			}
			break;
		case "fold":
			dmg *= 1.12 * up;
			note = "FOLD";
			break;
		case "complex":
			if (hit.source !== "imag") {
				target.imag += dmg * .55;
				dmg *= .6 * up;
				note = "REAL + i";
			}
			break;
		case "fourier": {
			const phase = law.t % .75;
			const on = phase < .12 || phase > .63;
			if (on) law.stacks = Math.min(8, law.stacks + 1);
			else law.stacks = Math.max(0, law.stacks - 1);
			dmg *= (1 + law.stacks * .24) * up;
			note = on ? `BEAT ${law.stacks}` : `OFF ${law.stacks}`;
			break;
		}
		case "algebra":
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
			if (hit.attacker === law.victim) dmg *= .72;
			break;
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
				dmg *= .62;
				note = "OFF ROOT";
			}
			break;
		}
	}
	return {
		dmg,
		note,
		cancel,
		heal
	};
}
function bossMod(fight, hit, dmg) {
	let note = "";
	let heal = 0;
	const kind = fight.bossKind;
	if (kind === "hailstone" && fight.law?.id !== "collatz" && !hit.skipCollatz && hit.attacker === "player") {
		if (hit.source === "m1") {
			fight.hail = Math.max(1, fight.hail - 1);
			return {
				dmg,
				note: `n → ${fight.hail}`,
				heal: 0,
				cancel: false
			};
		}
		if (fight.hail % 2 === 0) {
			fight.hail = Math.max(1, fight.hail / 2);
			return {
				dmg: dmg * 1.75,
				note: `COLLAPSE → ${fight.hail}`,
				heal: 0,
				cancel: false
			};
		}
		fight.hail = 3 * fight.hail + 1;
		return {
			dmg: 0,
			note: `CLIMB → ${fight.hail}`,
			heal: fight.enemy.maxHp * .07,
			cancel: false
		};
	}
	if (kind === "irrational" && fight.law?.id !== "pi") {
		const digit = "3141592653589793238462643383279502884197"[fight.piI] ?? "3";
		const hot = digit === "1" || digit === "3" || digit === "4";
		if (!hot && fight.playerTech.id !== "pi-sorcerer") {
			dmg *= .58;
			note = `π ${digit} COLD`;
		} else note = hot ? `π ${digit} HOT` : `π ${digit}`;
	}
	if (kind === "null") {
		if (hit.kind === "weapon") dmg *= 1.22;
		else if (fight.playerTech.id === "absolute-zero" || fight.playerTech.id === "absolute-fingers") dmg *= 1.7;
		else {
			dmg *= .55;
			note = note || "NO STRUCTURE";
		}
	}
	if (kind === "infinite") {
		const r = fight.playerTech.rarity;
		if (r === "common" || r === "rare") {
			dmg *= .36;
			note = "TOO FINITE";
		} else if (r === "epic") {
			dmg *= .7;
			note = "PARTIAL";
		} else dmg *= 1.12;
	}
	if (kind === "shape") {
		if (fight.playerTech.chaos) {
			dmg *= 1.3;
			note = note || "IRREGULAR";
		}
		if (fight.playerTech.id === "shape-sorter") dmg *= .78;
	}
	return {
		dmg,
		note,
		heal,
		cancel: false
	};
}
function checkEnd(fight) {
	if (fight.phase !== "combat") return;
	if (fight.player.hp <= 0) {
		fight.player.hp = 0;
		fight.player.state = "dead";
		fight.phase = "resolving";
		fight.resolveT = .95;
		sfx("die");
		return;
	}
	if (fight.enemy.hp <= 0) {
		fight.enemy.hp = 0;
		fight.enemy.state = "dead";
		fight.phase = "resolving";
		fight.resolveT = .8;
		if (fight.enemy.boss) fight.bossKilled = true;
		else fight.spiritKills += 1;
		if (fight.axiomThisWave) {
			fight.axiomEver = true;
			if (!fight.absorbedIds.includes(fight.currentId)) fight.absorbedIds.push(fight.currentId);
		}
		sfx("die");
	}
}
function spawnShot(fight, owner, dmg, speed, n, spread, homing, kind, source, silence = false) {
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
			silence
		});
	}
}
function fireEffect(fight, fighter, attack) {
	if (attack.source === "edomain") {
		enemyDomain(fight);
		return;
	}
	const target = body(fight, other(fighter.side));
	if (attack.source === "espec" && fight.bossKind === "infinite") {
		fighter.x = clamp(target.x - target.facing * 120, 70, 890);
		fighter.facing = target.x >= fighter.x ? 1 : -1;
	}
	let effect = attack.effect;
	if (effect.k === "copy") {
		const g = fight.graft;
		effect = g ? scaleEffect(g.a2.effect, fight.techMul * 1.3) : {
			k: "melee",
			dmg: 36 * fight.techMul,
			range: 100,
			stun: .2,
			knock: 80
		};
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
			spawnShot(fight, fighter, effect.dmg, effect.speed, effect.n, effect.spread, Boolean(effect.homing), attack.kind, attack.source, attack.source === "esilence");
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
			for (let i = 0; i < effect.n; i++) fight.summons.push({
				x: fighter.x + fighter.facing * (40 + i * 18),
				y: fighter.y - 110 - i * 8,
				dmg: effect.dmg,
				life: 4,
				owner: fighter.side,
				cd: .2 * i
			});
			sfx("awaken");
			break;
		case "zone":
			fight.hazards.push({
				x: target.x,
				r: effect.r,
				dps: effect.dmg,
				t: effect.dur,
				tick: .15,
				owner: fighter.side
			});
			burst(fight, target.x, 458, fighter.accent, 14, 100);
			break;
		case "spin":
			target.x = clamp(fighter.x + fighter.facing * 160, 70, 890);
			target.y = 458;
			applyHit(fight, {
				attacker: fighter.side,
				target: target.side,
				dmg: effect.dmg,
				kind: attack.kind,
				source: attack.source,
				stun: .25,
				knock: 40
			});
			break;
		case "swap": {
			const x = fighter.x;
			fighter.x = target.x;
			target.x = x;
			fighter.facing = fighter.x < target.x ? 1 : -1;
			target.facing = -fighter.facing;
			applyHit(fight, {
				attacker: fighter.side,
				target: target.side,
				dmg: effect.dmg,
				kind: attack.kind,
				source: attack.source,
				stun: .2,
				knock: 20
			});
			break;
		}
		case "dash":
			fighter.vx = fighter.facing * (effect.dist / .16);
			fighter.iframes = Math.max(fighter.iframes, .1);
			fighter.swing = {
				effect: {
					k: "melee",
					dmg: effect.dmg,
					range: 78,
					stun: .16,
					knock: 120
				},
				source: attack.source,
				kind: attack.kind,
				pulse: 0,
				every: 9,
				left: 1,
				total: 1
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
				every: effect.k === "flurry" ? .08 : 9,
				left: effect.k === "flurry" ? effect.n : 1,
				total: effect.k === "flurry" ? effect.n : 1
			};
			sfx(attack.source === "heavy" ? "heavy" : "m1");
	}
}
function swingHit(fight, fighter, swing) {
	const target = body(fight, other(fighter.side));
	const effect = swing.effect;
	if (!inRange(fight, fighter, target, effect.k === "melee" || effect.k === "flurry" || effect.k === "bind" || effect.k === "silence" ? effect.range : 110)) {
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
			knock: 10
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
			stun: .2,
			knock: 40
		});
		floater(fight, target.x, target.y - 160, "ERASED", "#d64545");
		return;
	}
	if (effect.k === "drain") {
		target.outMul = Math.min(target.outMul, .68);
		target.outMulT = Math.max(target.outMulT, 6);
		applyHit(fight, {
			attacker: fighter.side,
			target: target.side,
			dmg: effect.dmg,
			kind: swing.kind,
			source: swing.source,
			stun: .25,
			knock: 80
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
			stun: .18,
			knock: 70,
			parity: effect.even ? "even" : "odd",
			skipCollatz: true
		});
		return;
	}
	if (effect.k === "rewrite") {
		let dmg = effect.dmg;
		if (effect.mode === "percent") dmg += target.hp * .14;
		if (effect.mode === "half") dmg += target.hp * .22;
		if (effect.mode === "pi") {
			const digit = Number("3141592653589793238462643383279502884197"[fight.piI] ?? "3");
			dmg += target.maxHp * (.04 + digit * .012);
		}
		applyHit(fight, {
			attacker: fighter.side,
			target: target.side,
			dmg,
			kind: swing.kind,
			source: swing.source,
			stun: .16,
			knock: 50
		});
		return;
	}
	if (effect.k === "melee" || effect.k === "flurry") applyHit(fight, {
		attacker: fighter.side,
		target: target.side,
		dmg: effect.dmg,
		kind: swing.kind,
		source: swing.source,
		stun: effect.k === "melee" ? effect.stun ?? .1 : .08,
		knock: effect.k === "melee" ? effect.knock ?? 50 : 36
	});
}
function tickSwing(fight, fighter, dt) {
	const swing = fighter.swing;
	if (!swing) return;
	swing.pulse -= dt;
	if (swing.pulse > 0) return;
	swingHit(fight, fighter, swing);
	swing.left -= 1;
	swing.pulse = swing.every;
	if (swing.left <= 0) fighter.swing = null;
}
function openPlayerDomain(fight) {
	const tech = fight.playerTech;
	let id = tech.domain.id;
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
		if (rankOf(tech.rarity) >= fight.enemyRank) fight.banner = "DOMAIN CLASH — YOURS HOLDS";
		else {
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
	fight.trauma = Math.min(1, fight.trauma + .7);
	burst(fight, 480, 300, ACCENT[tech.accent], 28, 180);
	sfx("domain");
}
function enemyDomain(fight) {
	fight.enemy.didDomain = true;
	if (!fight.enemyDomain || !fight.enemyDomainName) return;
	if (fight.axiomThisWave || fight.law?.owner === "player" && fight.playerTech.domain.id === "axiom") {
		fight.banner = "DEVOURED";
		fight.bannerT = 1.2;
		return;
	}
	if (fight.law?.owner === "player") {
		if (rankOf(fight.playerTech.rarity) >= fight.enemyRank) {
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
	fight.trauma = Math.min(1, fight.trauma + .55);
}
function tickLaw(fight, dt) {
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
		if (law.beatT > .55) {
			law.beatT = 0;
			law.beat = law.beat % 9 + 1;
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
		if (law.piT > .48) {
			law.piT = 0;
			law.piI = (law.piI + 1) % 40;
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
				stun: .3,
				knock: 160,
				noRebank: true
			});
		}
		if ((law.id === "sum" || law.id === "integral") && law.bank > 0) release(fight);
		fight.law = null;
	}
}
function release(fight) {
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
		stun: .2,
		knock: 60,
		noRebank: true
	});
	fight.banner = "SUM RELEASED";
	fight.bannerT = .8;
}
function writeLawLine(fight) {
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
				fight.lawLine = law.owner === "player" ? `${tag}. n=${fight.hail} (${fight.hail % 2 === 0 ? "EVEN — hit to collapse" : "ODD — weak, or use Odd Explosion"}).` : `${tag}. n=${fight.hail} is ${fight.hail % 2 === 0 ? "EVEN — do not get hit" : "ODD — the climb is safer"}.`;
				break;
			case "erasure":
				fight.lawLine = `${tag}. Deletion ${Math.round(law.t / law.duration * 100)}%. Techniques may fail. Weapons hold.`;
				break;
			case "axiom":
				fight.lawLine = `${tag}. The axiom is bare — their kit had no domain to steal. Your blows are heavier.`;
				break;
			case "right":
				fight.lawLine = `${tag}. Stand on the vertex at center. Oblique strikes are wasted.`;
				break;
			case "pi": {
				const d = PI[law.piI];
				const hot = d === "1" || d === "3" || d === "4" || law.upgraded && d === "2";
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
				fight.lawLine = `${tag}. Your share ${Math.round(fight.dealtP / t * 100)}%. Stay under 62% or your strikes thin.`;
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
			default: fight.lawLine = tag;
		}
		return;
	}
	if (kind === "hailstone") {
		fight.lawLine = fight.hail % 2 === 0 ? `Hailstone n=${fight.hail} EVEN. A heavy or technique collapses them. Weapon taps only sculpt.` : `Hailstone n=${fight.hail} ODD. Do not heavy — they will climb and heal. Weapon tap subtracts 1.`;
		return;
	}
	if (kind === "irrational") {
		const d = "3141592653589793238462643383279502884197"[fight.piI] ?? "3";
		fight.lawLine = `π digit ${d} is ${d === "1" || d === "3" || d === "4" ? "HOT — full damage" : "COLD — your strikes dull"}. Hot digits are 1, 3, and 4.`;
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
	if (fight.mode === "weapon") fight.lawLine = "Cursed energy is under 30%. The technique sleeps. Heavy and weapon special are open.";
	else if (fight.lecture) fight.lawLine = "Lecture board. Jab with J. Abilities need 30% cursed energy — the well here is full, and it will not bill you.";
	else if (fight.playerTech.id === "absolute-fingers" && fight.slotted) fight.lawLine = `Technique awake. Perfect Axiom devours an enemy law if one is open. Otherwise it deploys ${fight.slotted.name}, evolved.`;
	else fight.lawLine = "Technique awake. Spend it on an ability or a domain. Jab with the signature weapon whenever you like.";
}
function canAct(fight) {
	const p = fight.player;
	if (p.hp <= 0 || p.stun > 0 || p.state === "dash" || p.state === "hurt" || p.state === "dead") return false;
	if (p.state === "attack" && p.attack) {
		const total = p.attack.windup + p.attack.active + p.attack.recover;
		if (p.attackT < total - .12) return false;
	}
	return true;
}
function tryAction(fight, act) {
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
		fight.bufferT = .18;
		return;
	}
	const tech = fight.ce >= 30;
	if (act === "m1") {
		if (fight.m1T > .7) fight.m1 = 0;
		const base = fight.atk.m1[fight.m1] ?? fight.atk.m1[0];
		begin(p, {
			...base,
			windup: fight.m1 > 0 ? .05 : base.windup
		});
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
		if (fight.cd[act] > 0 || fight.ce < cost) return;
		fight.ce -= cost;
		begin(p, act === "a1" ? fight.atk.a1 : fight.atk.a2);
		fight.cd[act] = act === "a1" ? 3.3 : 6.2;
		fight.m1 = 0;
		return;
	}
	if (act === "domain") {
		if (!tech) return floater(fight, p.x, p.y - 150, "NEED 30% CE", "#d64545");
		if (p.silenceT > 0) return floater(fight, p.x, p.y - 150, "SILENCED", "#d64545");
		if (fight.usedDomain) return floater(fight, p.x, p.y - 150, "DOMAIN SPENT", "#a39b82");
		if (fight.ce < 40) return floater(fight, p.x, p.y - 150, "NEED 40% CE", "#d64545");
		fight.ce -= 40;
		fight.usedDomain = true;
		begin(p, fight.atk.domain);
		fight.m1 = 0;
	}
}
function begin(fighter, attack) {
	fighter.state = "attack";
	fighter.attack = attack;
	fighter.attackT = 0;
	fighter.fired = false;
	fighter.swing = null;
	fighter.vx = 0;
}
function castRmt(fight) {
	const p = fight.player;
	if (fight.cd.rmt > 0 || p.hp <= 0) return;
	if (fight.ce < 20) {
		floater(fight, p.x, p.y - 150, "NEED 20% CE", "#d64545");
		return;
	}
	const ce = fight.ce;
	const cost = Math.round(ce * .45);
	const pct = .2 + .2 * (ce / 100);
	const heal = p.maxHp * pct;
	fight.ce = Math.max(0, ce - cost);
	p.hp = Math.min(p.maxHp, p.hp + heal);
	fight.cd.rmt = 14;
	floater(fight, p.x, p.y - 140, `+${Math.round(heal)}`, "#2fcaa8");
	burst(fight, p.x, p.y - 80, "#2fcaa8", 16, 90);
	sfx("heal");
}
function tickFighter(fight, fighter, dt) {
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
		fighter.vx = fighter.facing * 760;
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
	if (fighter.y >= 458) {
		if (!fighter.grounded && fighter.vy > 240) {
			fighter.squash = .45;
			burst(fight, fighter.x, 458, "#a39b82", 4, 40);
		}
		fighter.y = 458;
		fighter.vy = 0;
		fighter.grounded = true;
	} else fighter.grounded = false;
	if (fight.law?.id === "orbit") {
		if (fighter.x < 80) fighter.x = 870;
		if (fighter.x > 890) fighter.x = 90;
	} else fighter.x = clamp(fighter.x, 70, 890);
}
function shapeSlow(fight, fighter) {
	const law = fight.law;
	if (law?.id !== "shape") return 1;
	if (!(fighter.x > 400 && fighter.x < 560)) return 1;
	return (law.owner === "player" ? fighter.side === "enemy" : fighter.side === "player") ? .42 : 1;
}
function tickEnemy(fight, dt) {
	const e = fight.enemy;
	const p = fight.player;
	if (e.hp <= 0 || e.stun > 0 || e.state === "attack" || e.state === "dash" || e.state === "hurt" || e.state === "dead") return;
	const dist = p.x - e.x;
	e.facing = dist >= 0 ? 1 : -1;
	e.brainT -= dt;
	if (e.brainT <= 0) {
		e.brainT = (fight.lecture ? 1.05 : .5) + Math.random() * .35;
		if (!e.didDomain && e.boss && e.hp < e.maxHp * .7 && e.silenceT <= 0 && fight.enemyDomain) {
			begin(e, def("edom", "Domain", {
				k: "buff",
				mul: 1,
				dur: .1
			}, "tech", "edomain"));
			e.attack.windup = .55;
			return;
		}
		const ad = Math.abs(dist);
		if (ad < 116) {
			begin(e, def("emelee", "Strike", {
				k: "melee",
				dmg: e.dmg,
				range: 100,
				stun: .22,
				knock: 140
			}, "weapon", "emelee"));
			e.attack.windup = .36;
			return;
		}
		if (e.ranged && ad < 460 && e.silenceT <= 0 && Math.random() < .65) {
			const silence = fight.bossKind === "null";
			begin(e, def("eshot", "Cast", {
				k: "shot",
				dmg: e.dmg * .9,
				speed: 420,
				n: 1,
				spread: 0
			}, "tech", silence ? "esilence" : "eshot"));
			e.attack.windup = .32;
			return;
		}
		if (e.boss && ad < 200 && Math.random() < .35 && e.silenceT <= 0) {
			begin(e, def("espec", "Special", {
				k: "melee",
				dmg: e.dmg * 1.35,
				range: 130,
				stun: .35,
				knock: 200
			}, "tech", "espec"));
			e.attack.windup = .5;
			return;
		}
	}
	const ad = Math.abs(dist);
	if (ad > 154) e.vx = Math.sign(dist) * e.speed * shapeSlow(fight, e);
	else if (ad < 78) e.vx = -Math.sign(dist || 1) * e.speed * .55;
	else e.vx = 0;
	if (e.state === "idle" || e.state === "walk") e.state = e.vx !== 0 ? "walk" : "idle";
}
function tickShots(fight, dt) {
	const hole = fight.law?.id === "fold" || fight.holeT > 0;
	for (const s of fight.shots) {
		if (s.homing) {
			const t = body(fight, other(s.owner));
			const dx = t.x - s.x;
			const dy = t.y - 70 - s.y;
			const m = Math.hypot(dx, dy) || 1;
			s.vx += dx / m * 520 * dt;
			s.vy += dy / m * 520 * dt;
			const sp = Math.hypot(s.vx, s.vy) || 1;
			s.vx = s.vx / sp * s.speed;
			s.vy = s.vy / sp * s.speed;
		}
		if (fight.law?.id === "orbit") s.vy += Math.sin(fight.time * 6) * 30;
		s.x += s.vx * dt;
		s.y += s.vy * dt;
		s.life -= dt;
		if (fight.law?.id === "fold" || fight.law?.id === "orbit") {
			if (s.x < 40) s.x = 890;
			if (s.x > 910) s.x = 50;
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
				stun: .12,
				knock: 70
			});
			s.life = 0;
		}
		if (s.y > 478 || s.x < -40 || s.x > 1020) s.life = 0;
	}
	fight.shots = fight.shots.filter((s) => s.life > 0);
}
function tickHazards(fight, dt) {
	for (const h of fight.hazards) {
		h.t -= dt;
		h.tick -= dt;
		const t = body(fight, other(h.owner));
		if (h.tick <= 0 && Math.abs(t.x - h.x) < h.r && t.y > 438) {
			h.tick = .35;
			applyHit(fight, {
				attacker: h.owner,
				target: t.side,
				dmg: h.dps,
				kind: "tech",
				source: "zone",
				stun: 0,
				knock: 0
			});
		}
	}
	fight.hazards = fight.hazards.filter((h) => h.t > 0);
}
function tickSummons(fight, dt) {
	for (const s of fight.summons) {
		s.life -= dt;
		s.cd -= dt;
		const t = body(fight, other(s.owner));
		const dx = t.x - s.x;
		const dy = t.y - 80 - s.y;
		const m = Math.hypot(dx, dy) || 1;
		s.x += dx / m * 160 * dt;
		s.y += dy / m * 160 * dt;
		if (s.cd <= 0 && m < 36) {
			s.cd = .45;
			applyHit(fight, {
				attacker: s.owner,
				target: t.side,
				dmg: s.dmg,
				kind: "tech",
				source: "summon",
				stun: .05,
				knock: 20
			});
		}
	}
	fight.summons = fight.summons.filter((s) => s.life > 0);
}
function tickPresent(fight, dt) {
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
	if (Math.random() < dt * 6) burst(fight, Math.random() * 960, 20 + Math.random() * 200, "#a39b82", 1, 12);
}
function tickImag(fight, dt) {
	for (const f of [fight.player, fight.enemy]) {
		if (f.imag <= .4) {
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
			noLaw: true
		});
	}
}
function stepFight(fight, input, dt) {
	fight.time += dt;
	if (fight.hitstop > 0) {
		fight.hitstop -= dt;
		tickPresent(fight, dt);
		return;
	}
	tickPresent(fight, dt);
	if (fight.bossKind === "irrational" || fight.law?.id === "pi") {
		fight.piT += dt;
		if (fight.piT > .5) {
			fight.piT = 0;
			fight.piI = (fight.piI + 1) % 40;
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
	if (input.dash && !fight.dashLatch && fight.cd.dash <= 0 && p.stun <= 0 && p.hp > 0 && p.state !== "dead") {
		if (input.left) p.facing = -1;
		if (input.right) p.facing = 1;
		p.state = "dash";
		p.stateT = .16;
		p.iframes = .13;
		p.attack = null;
		p.swing = null;
		fight.cd.dash = .72;
		fight.dashLatch = true;
		sfx("dash");
	}
	if (!input.dash) fight.dashLatch = false;
	if (p.state !== "dash" && p.stun <= 0 && p.hp > 0) {
		let dir = 0;
		if (input.left && !input.right) dir = -1;
		if (input.right && !input.left) dir = 1;
		if (dir) {
			p.facing = dir;
			const attacking = p.state === "attack";
			p.vx = dir * p.speed * (attacking ? .4 : 1) * shapeSlow(fight, p);
			if (p.state === "idle") p.state = "walk";
		} else {
			if (p.state === "walk") p.state = "idle";
			p.vx = 0;
		}
		if (input.jump && !fight.jumpLatch && p.grounded && p.state !== "hurt") {
			p.vy = -560;
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
function advanceWave(fight) {
	const next = fight.waves[fight.wave + 1];
	if (!next) {
		fight.phase = "victory";
		return;
	}
	fight.wave += 1;
	summonWave(fight, next, true);
	writeLawLine(fight);
}
function fleeFight(fight) {
	fight.phase = "fled";
}
function declareCount(fight, n) {
	if (fight.law?.id === "counting") fight.law.declared = n;
}
function buildReport(fight, zoneId) {
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
		lecture: fight.lecture
	};
}
function healPreview(ce) {
	return Math.round((.2 + .2 * (ce / 100)) * 100);
}
var INK = "#14160f";
var CHALK = "#efe7d2";
var DUST = "#a39b82";
var SEAL = "#d64545";
var CURSED = "#2fcaa8";
var GOLD = "#e2b15a";
var GLYPHS = [
	"∑",
	"∫",
	"π",
	"√",
	"∞",
	"∂",
	"θ",
	"φ",
	"Δ",
	"λ",
	"∈",
	"∀",
	"≠",
	"Ω",
	"α"
];
function drawFight(ctx, fight, shake) {
	const s = shake ? fight.trauma * fight.trauma : 0;
	const ox = Math.sin(fight.time * 42) * 14 * s;
	const oy = Math.cos(fight.time * 35) * 10 * s;
	ctx.save();
	ctx.translate(ox, oy);
	ctx.fillStyle = INK;
	ctx.fillRect(-40, -40, 1040, 620);
	vignette(ctx);
	atmosphere(ctx, fight);
	ruled(ctx);
	drawLawWorld(ctx, fight);
	floor(ctx);
	for (const h of fight.hazards) {
		ctx.beginPath();
		ctx.strokeStyle = "rgba(214,69,69,0.7)";
		ctx.lineWidth = 2;
		ctx.ellipse(h.x, 458, h.r, 16, 0, 0, Math.PI * 2);
		ctx.stroke();
	}
	if (fight.law?.id === "fold" || fight.holeT > 0) {
		ctx.beginPath();
		ctx.fillStyle = "#070806";
		ctx.arc(480, 400, 36, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = DUST;
		ctx.stroke();
	}
	for (const shot of fight.shots) {
		ctx.save();
		ctx.translate(shot.x, shot.y);
		ctx.rotate(Math.atan2(shot.vy, shot.vx));
		ctx.fillStyle = shot.owner === "player" ? CURSED : SEAL;
		ctx.fillRect(-10, -2.2, 20, 4.4);
		ctx.restore();
	}
	for (const sum of fight.summons) {
		ctx.beginPath();
		ctx.strokeStyle = CURSED;
		ctx.arc(sum.x, sum.y, 8, 0, Math.PI * 2);
		ctx.stroke();
	}
	drawFighter(ctx, fight.enemy, fight);
	drawFighter(ctx, fight.player, fight);
	for (const p of fight.parts) {
		ctx.globalAlpha = Math.max(0, p.life / p.max);
		ctx.fillStyle = p.color;
		ctx.fillRect(p.x, p.y, p.r, p.r);
		ctx.globalAlpha = 1;
	}
	ctx.font = "600 16px Outfit, sans-serif";
	ctx.textAlign = "center";
	for (const f of fight.floats) {
		ctx.globalAlpha = Math.max(0, f.life / f.max);
		ctx.fillStyle = f.color;
		ctx.fillText(f.text, f.x, f.y);
	}
	ctx.globalAlpha = 1;
	if (fight.bannerT > 0) {
		ctx.globalAlpha = Math.min(1, fight.bannerT);
		ctx.fillStyle = CHALK;
		ctx.font = "680 42px Fraunces, serif";
		ctx.fillText(fight.banner, 480, 150);
		ctx.globalAlpha = 1;
	}
	if (fight.modeFlashT > 0) {
		ctx.globalAlpha = Math.min(1, fight.modeFlashT);
		ctx.fillStyle = fight.mode === "tech" ? CURSED : CHALK;
		ctx.font = "600 18px Outfit, sans-serif";
		ctx.fillText(fight.modeFlash, 480, 188);
		ctx.globalAlpha = 1;
	}
	if (fight.combo > 1) {
		ctx.fillStyle = DUST;
		ctx.font = "600 14px Outfit, sans-serif";
		ctx.textAlign = "left";
		ctx.fillText(`${fight.combo} HIT`, 36, 48);
	}
	ctx.restore();
}
function vignette(ctx) {
	const g = ctx.createRadialGradient(480, 270, 120, 480, 270, 620);
	g.addColorStop(0, "rgba(0,0,0,0)");
	g.addColorStop(1, "rgba(0,0,0,0.45)");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 960, 540);
}
function atmosphere(ctx, fight) {
	ctx.save();
	ctx.font = "600 22px Fraunces, serif";
	ctx.fillStyle = "rgba(239,231,210,0.07)";
	ctx.textAlign = "center";
	for (let i = 0; i < GLYPHS.length; i++) {
		const x = (i * 67 + 28) % 960;
		const y = (i * 91 + fight.time * (16 + i % 4 * 7)) % 600 - 30;
		ctx.fillText(GLYPHS[i], x, y);
	}
	ctx.strokeStyle = "rgba(239,231,210,0.12)";
	ctx.lineWidth = 1.25;
	if (fight.mood === "geometry" || fight.mood === "lecture") {
		strokeTri(ctx, 80, 90, 150, 40, 210, 110);
		strokeTri(ctx, 760, 70, 860, 40, 890, 120);
	}
	if (fight.mood === "pi" || fight.mood === "ritual") {
		ctx.font = "600 14px Outfit, sans-serif";
		ctx.fillStyle = "rgba(47,202,168,0.28)";
		const start = Math.floor(fight.time * 4) % PI.length;
		let row = "";
		for (let i = 0; i < 28; i++) row += PI[(start + i) % PI.length];
		ctx.fillText(row, 480, 36);
	}
	if (fight.mood === "collatz") {
		ctx.beginPath();
		let x = 90;
		let y = 120;
		ctx.moveTo(x, y);
		for (let i = 0; i < 8; i++) {
			x += 90;
			y += i % 2 === 0 ? 36 : -22;
			ctx.lineTo(x, y);
		}
		ctx.stroke();
	}
	if (fight.mood === "void") {
		ctx.fillStyle = "rgba(0,0,0,0.35)";
		ctx.beginPath();
		ctx.arc(160, 120, 50, 0, Math.PI * 2);
		ctx.arc(790, 150, 70, 0, Math.PI * 2);
		ctx.fill();
	}
	if (fight.mood === "hilbert") {
		ctx.beginPath();
		for (let i = 0; i < 7; i++) {
			const y = 70 + i * 28;
			const inset = i * 18;
			ctx.moveTo(120 + inset, y);
			ctx.lineTo(840 - inset, y);
		}
		ctx.stroke();
	}
	if (fight.mood === "lecture") {
		ctx.font = "680 72px Fraunces, serif";
		ctx.fillStyle = "rgba(239,231,210,0.05)";
		ctx.fillText("1  2  3", 480, 200);
	}
	ctx.restore();
}
function ruled(ctx) {
	ctx.strokeStyle = "rgba(239,231,210,0.05)";
	ctx.lineWidth = 1;
	for (let y = 40; y < 540; y += 28) {
		ctx.beginPath();
		ctx.moveTo(24, y);
		ctx.lineTo(936, y);
		ctx.stroke();
	}
}
function floor(ctx) {
	ctx.strokeStyle = "rgba(239,231,210,0.85)";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(50, 458);
	ctx.lineTo(910, 458);
	ctx.stroke();
	ctx.strokeStyle = "rgba(239,231,210,0.25)";
	ctx.beginPath();
	ctx.moveTo(50, 464);
	ctx.lineTo(910, 464);
	ctx.stroke();
}
function drawLawWorld(ctx, fight) {
	const law = fight.law;
	ctx.save();
	ctx.strokeStyle = law && fight.law?.upgraded ? "rgba(226,177,90,0.45)" : "rgba(239,231,210,0.18)";
	ctx.fillStyle = law && fight.law?.upgraded ? "rgba(226,177,90,0.1)" : "rgba(239,231,210,0.08)";
	ctx.lineWidth = 1.5;
	if (!law) {
		if (fight.bossKind === "irrational") digitRow(ctx, "3141592653589793238462643383279502884197"[fight.piI] ?? "3");
		if (fight.bossKind === "hailstone") big(ctx, String(fight.hail), 80);
		ctx.restore();
		return;
	}
	switch (law.id) {
		case "counting":
			big(ctx, String(law.beat), 120);
			ctx.font = "600 22px Outfit, sans-serif";
			ctx.fillStyle = CURSED;
			ctx.textAlign = "center";
			ctx.fillText(`DECLARED ${law.declared}`, 480, 250);
			break;
		case "multiply":
			big(ctx, `×${law.table}`, 100);
			break;
		case "angles":
			drawNeedle(ctx, law);
			break;
		case "grid":
			ctx.strokeStyle = "rgba(47,202,168,0.35)";
			for (const x of [
				150,
				300,
				450,
				600,
				750
			]) {
				ctx.beginPath();
				ctx.moveTo(x, 80);
				ctx.lineTo(x, 458);
				ctx.stroke();
			}
			break;
		case "right":
			strokeTri(ctx, law.vertexX - 120, 458, law.vertexX, 308, law.vertexX + 160, 458);
			mark(ctx, law.vertexX, "VERTEX");
			break;
		case "quadratic":
			ctx.beginPath();
			ctx.moveTo(160, 458);
			for (let x = 160; x <= 820; x += 12) {
				const u = (x - 480) / 220;
				ctx.lineTo(x, 458 - 160 * (1 - u * u));
			}
			ctx.stroke();
			mark(ctx, law.rootA, "ROOT");
			mark(ctx, law.rootB, "ROOT");
			break;
		case "orbit":
			ctx.beginPath();
			ctx.ellipse(480, 360, 340, 90, 0, 0, Math.PI * 2);
			ctx.stroke();
			break;
		case "pi":
			digitRow(ctx, "3141592653589793238462643383279502884197"[law.piI] ?? "3");
			break;
		case "collatz":
			big(ctx, String(fight.hail), 110);
			break;
		case "erasure": {
			const p = law.t / law.duration;
			ctx.fillStyle = `rgba(0,0,0,${.15 + p * .45})`;
			ctx.beginPath();
			ctx.arc(480, 280, 40 + p * 280, 0, Math.PI * 2);
			ctx.fill();
			break;
		}
		case "integral":
			ctx.fillStyle = "rgba(47,202,168,0.13)";
			ctx.fillRect(400, 388, 180, 70);
			ctx.strokeStyle = CURSED;
			ctx.strokeRect(400, 388, 180, 70);
			break;
		case "shape": {
			const owner = law.owner === "player" ? fight.player : fight.enemy;
			ctx.beginPath();
			ctx.strokeStyle = "rgba(47,202,168,0.7)";
			ctx.arc(owner.x, owner.y - 70, 78, 0, Math.PI * 2);
			ctx.stroke();
			ctx.strokeStyle = "rgba(214,69,69,0.6)";
			ctx.strokeRect(400, 298, 160, 160);
			break;
		}
		case "exp":
			ctx.beginPath();
			ctx.strokeStyle = CURSED;
			ctx.arc(480, 300, 30 + law.growth * 28, 0, Math.PI * 2);
			ctx.stroke();
			break;
		case "fourier": {
			ctx.beginPath();
			const period = .75;
			ctx.strokeStyle = law.t % period < .12 || law.t % period > .63 ? CURSED : "rgba(239,231,210,0.3)";
			for (let x = 60; x < 900; x += 8) {
				const y = 180 + Math.sin(x * .05 + fight.time * 8) * (16 + law.stacks * 4);
				if (x === 60) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			break;
		}
		case "prime":
			big(ctx, String(law.hitIndex + 1), 90);
			break;
		case "fraction":
			ctx.fillStyle = "rgba(239,231,210,0.15)";
			ctx.fillRect(70, 96, 820 * (fight.enemy.hp / fight.enemy.maxHp), 8);
			ctx.beginPath();
			ctx.moveTo(480, 70);
			ctx.lineTo(480, 458);
			ctx.stroke();
			break;
		case "sum":
			big(ctx, String(Math.round(law.bank)), 100);
			break;
		case "ratio": {
			const phi = 1.618;
			let x = 180;
			let y = 160;
			let w = 220;
			ctx.strokeStyle = GOLD;
			for (let i = 0; i < 5; i++) {
				ctx.strokeRect(x, y, w, w / phi);
				x += w;
				w /= phi;
			}
			break;
		}
		case "percent":
			big(ctx, "%", 90);
			break;
		case "log":
			ctx.beginPath();
			for (let i = 0; i < 80; i++) {
				const a = i * .28 + fight.time;
				const r = 8 + i * 3.2;
				const x = 480 + Math.cos(a) * r * .55;
				const y = 250 + Math.sin(a) * r * .28;
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			break;
		case "dice": {
			const face = 1 + Math.floor(fight.time * 2) % 6;
			big(ctx, String(face), 90);
			break;
		}
		case "derivative": {
			ctx.beginPath();
			ctx.moveTo(140, 320);
			ctx.quadraticCurveTo(400, 80, 820, 300);
			ctx.stroke();
			const px = fight.player.x;
			ctx.strokeStyle = CURSED;
			ctx.beginPath();
			ctx.moveTo(px - 70, 378);
			ctx.lineTo(px + 70, 258);
			ctx.stroke();
			break;
		}
		case "matrix":
			ctx.strokeStyle = "rgba(47,202,168,0.4)";
			for (let i = 0; i < 4; i++) {
				ctx.beginPath();
				ctx.moveTo(200 + i * 40, 140);
				ctx.lineTo(620 + i * 30, 300);
				ctx.stroke();
			}
			break;
		case "fold":
			ctx.beginPath();
			ctx.moveTo(320, 220);
			ctx.bezierCurveTo(420, 80, 540, 360, 640, 220);
			ctx.bezierCurveTo(540, 80, 420, 360, 320, 220);
			ctx.stroke();
			break;
		case "complex":
			ctx.beginPath();
			ctx.moveTo(180, 240);
			ctx.lineTo(780, 240);
			ctx.moveTo(480, 80);
			ctx.lineTo(480, 400);
			ctx.stroke();
			ctx.font = "600 16px Outfit, sans-serif";
			ctx.fillStyle = DUST;
			ctx.textAlign = "center";
			ctx.fillText("REAL", 740, 228);
			ctx.fillText("i", 496, 100);
			break;
		case "algebra":
			ctx.font = "680 64px Fraunces, serif";
			ctx.textAlign = "center";
			ctx.fillStyle = "rgba(239,231,210,0.16)";
			ctx.fillText(`${law.marks % 4}/4`, 480, 180);
			break;
		case "axiom":
			ctx.font = "italic 28px Fraunces, serif";
			ctx.textAlign = "center";
			ctx.fillStyle = GOLD;
			ctx.fillText("nothing left to steal", 480, 150);
			break;
		default:
			ctx.font = "italic 22px Fraunces, serif";
			ctx.fillStyle = "rgba(239,231,210,0.25)";
			ctx.textAlign = "center";
			ctx.fillText(law.name, 480, 120);
	}
	ctx.restore();
}
function big(ctx, text, y) {
	ctx.font = "680 140px Fraunces, serif";
	ctx.textAlign = "center";
	ctx.fillStyle = "rgba(239,231,210,0.09)";
	ctx.fillText(text, 480, y + 80);
}
function digitRow(ctx, hot) {
	ctx.font = "680 64px Fraunces, serif";
	ctx.textAlign = "center";
	ctx.fillStyle = hot === "1" || hot === "3" || hot === "4" ? CURSED : "rgba(214,69,69,0.85)";
	ctx.fillText(hot, 480, 150);
	ctx.font = "600 16px Outfit, sans-serif";
	ctx.fillStyle = DUST;
	ctx.fillText("π", 480, 176);
}
function mark(ctx, x, label) {
	ctx.strokeStyle = CURSED;
	ctx.beginPath();
	ctx.moveTo(x, 458);
	ctx.lineTo(x, 422);
	ctx.stroke();
	ctx.fillStyle = CURSED;
	ctx.font = "600 12px Outfit, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(label, x, 414);
}
function strokeTri(ctx, x1, y1, x2, y2, x3, y3) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.closePath();
	ctx.stroke();
}
function drawNeedle(ctx, law) {
	const cx = 480;
	const cy = 210;
	ctx.beginPath();
	ctx.arc(cx, cy, 90, Math.PI, 0);
	ctx.stroke();
	const seal = Math.PI + law.seal / 180 * Math.PI;
	ctx.strokeStyle = "rgba(214,69,69,0.9)";
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(cx + Math.cos(seal) * 70, cy + Math.sin(seal) * 70);
	ctx.lineTo(cx + Math.cos(seal) * 98, cy + Math.sin(seal) * 98);
	ctx.stroke();
	const ang = Math.PI + law.angle / 180 * Math.PI;
	ctx.strokeStyle = CHALK;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(cx, cy);
	ctx.lineTo(cx + Math.cos(ang) * 84, cy + Math.sin(ang) * 84);
	ctx.stroke();
}
function drawFighter(ctx, f, fight) {
	if (f.hp <= 0 && f.state === "dead") ctx.globalAlpha = .45;
	ctx.save();
	const sy = 1 - f.squash * .28;
	const sx = 1 + f.squash * .18;
	const lunge = f.state === "attack" && f.fired ? 14 : 0;
	ctx.translate(f.x + f.facing * lunge, f.y);
	ctx.scale(f.facing * sx, sy);
	if (f.side === "player" && fight.mode === "tech") {
		ctx.beginPath();
		ctx.strokeStyle = "rgba(47,202,168,0.45)";
		ctx.arc(0, -78, 70, 0, Math.PI * 2);
		ctx.stroke();
	}
	if (f.armorT > 0) {
		ctx.beginPath();
		ctx.strokeStyle = "rgba(47,202,168,0.8)";
		ctx.arc(0, -78, 62, 0, Math.PI * 2);
		ctx.stroke();
	}
	const chalk = f.flash > 0 ? "#ffffff" : f.accent || CHALK;
	ctx.strokeStyle = chalk;
	ctx.fillStyle = chalk;
	ctx.lineWidth = 2.4;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	const step = f.state === "walk" || f.state === "dash" ? Math.sin(f.anim * 10) * 10 : 0;
	ctx.beginPath();
	ctx.moveTo(-16, -58);
	ctx.lineTo(-28, -6);
	ctx.lineTo(28, -6);
	ctx.lineTo(16, -58);
	ctx.moveTo(-8, -8);
	ctx.lineTo(-16, -step);
	ctx.moveTo(8, -8);
	ctx.lineTo(16, step);
	ctx.moveTo(0, -52);
	ctx.lineTo(-20, -34);
	ctx.moveTo(0, -50);
	ctx.lineTo(22, -36);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, -78, 14, 0, Math.PI * 2);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(4, -80, 1.6, 0, Math.PI * 2);
	ctx.fill();
	drawWeapon(ctx, f, fight, chalk);
	if (f.state === "attack" && f.attack && !f.fired) {
		const p = Math.min(1, f.attackT / Math.max(.05, f.attack.windup));
		ctx.strokeStyle = f.side === "player" ? CURSED : SEAL;
		ctx.globalAlpha = .35 + p * .65;
		ctx.beginPath();
		ctx.arc(46, -48, 18 + p * 26, -.8, .8);
		ctx.stroke();
		ctx.globalAlpha = 1;
	}
	ctx.restore();
	ctx.globalAlpha = 1;
	ctx.fillStyle = DUST;
	ctx.font = "600 13px Outfit, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(f.name, f.x, f.y + 22);
}
function drawWeapon(ctx, f, fight, color) {
	ctx.save();
	ctx.translate(22, -36);
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 2.2;
	ctx.beginPath();
	const t = fight.time;
	switch (f.style) {
		case "staff":
			ctx.moveTo(0, 18);
			ctx.lineTo(8, -48);
			ctx.stroke();
			ctx.font = "700 16px Fraunces, serif";
			ctx.fillStyle = CURSED;
			ctx.textAlign = "center";
			ctx.fillText(String(Math.floor(t * 4) % 10), 8, -16);
			break;
		case "spear":
		case "lance":
			ctx.moveTo(0, 10);
			ctx.lineTo(58, -34);
			ctx.moveTo(48, -28);
			ctx.lineTo(66, -40);
			ctx.lineTo(50, -18);
			ctx.stroke();
			break;
		case "trident": {
			ctx.moveTo(0, 8);
			ctx.lineTo(40, -18);
			ctx.stroke();
			const spread = .35 + Math.sin(t * 3) * .28;
			for (const ang of [
				-spread,
				0,
				spread
			]) {
				ctx.beginPath();
				ctx.moveTo(40, -18);
				ctx.lineTo(40 + Math.cos(-1.1 + ang) * 28, -18 + Math.sin(-1.1 + ang) * 28);
				ctx.stroke();
			}
			break;
		}
		case "blade":
			ctx.moveTo(0, 6);
			ctx.lineTo(54, -28);
			ctx.lineTo(46, -16);
			ctx.closePath();
			ctx.stroke();
			break;
		case "twin":
			ctx.moveTo(0, 4);
			ctx.lineTo(40, -22);
			ctx.moveTo(10, 12);
			ctx.lineTo(50, -14);
			ctx.stroke();
			break;
		case "hammer":
			ctx.moveTo(0, 8);
			ctx.lineTo(36, -16);
			ctx.stroke();
			ctx.strokeRect(28, -34, 26, 18);
			break;
		case "daggers":
			ctx.moveTo(0, 0);
			ctx.lineTo(28, -16);
			ctx.moveTo(8, 10);
			ctx.lineTo(36, -6);
			ctx.stroke();
			break;
		case "gauntlets":
			ctx.strokeRect(-4, -8, 16, 16);
			ctx.strokeRect(10, -18, 16, 16);
			break;
		case "null":
			ctx.fillStyle = "#050605";
			ctx.beginPath();
			ctx.arc(4, -6, 16 + Math.sin(t * 5) * 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = CHALK;
			ctx.beginPath();
			ctx.arc(4, -6, 18, 0, Math.PI * 2);
			ctx.stroke();
			break;
		case "shears":
			ctx.moveTo(0, 0);
			ctx.lineTo(36, -20);
			ctx.moveTo(0, 0);
			ctx.lineTo(36, 4);
			ctx.stroke();
			break;
		case "scythe":
			ctx.moveTo(0, 16);
			ctx.lineTo(20, -40);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(20, -28, 18, -1.4, .4);
			ctx.stroke();
			ctx.font = "700 14px Fraunces, serif";
			ctx.fillText("%", 28, -24);
			break;
		case "bow":
			ctx.beginPath();
			ctx.moveTo(18, -36);
			for (let i = 0; i <= 12; i++) {
				const u = i / 12 * 2 - 1;
				ctx.lineTo(18 + u * 26, -8 - (1 - u * u) * 28);
			}
			ctx.stroke();
			break;
		case "whip":
			ctx.moveTo(0, 0);
			ctx.quadraticCurveTo(20, -10 + Math.sin(t * 8) * 8, 34, 8);
			ctx.quadraticCurveTo(48, 22, 62, Math.sin(t * 8) * 10);
			ctx.stroke();
			break;
		case "chain": {
			let x = 0;
			let y = 0;
			const n = 4 + Math.abs(fight.hail) % 5;
			ctx.moveTo(0, 0);
			for (let i = 1; i <= n; i++) {
				x += 10;
				y = Math.sin(t * 6 + i) * 8;
				ctx.lineTo(x, y);
			}
			ctx.stroke();
			break;
		}
		case "dice":
			ctx.save();
			ctx.translate(12, -8);
			ctx.rotate(Math.sin(t * 2) * .4);
			ctx.strokeRect(-9, -9, 18, 18);
			ctx.restore();
			break;
		case "orb":
			ctx.beginPath();
			ctx.arc(16, -10, 14, 0, Math.PI * 2);
			ctx.stroke();
			ctx.font = "700 14px Fraunces, serif";
			ctx.textAlign = "center";
			ctx.fillStyle = CURSED;
			ctx.fillText("3141592653589793238462643383279502884197"[Math.floor(t * 6) % 40] ?? "3", 16, -5);
			break;
		case "finger":
			ctx.moveTo(0, 8);
			ctx.quadraticCurveTo(24, -18, 58, -8 + Math.sin(t * 3) * 4);
			ctx.stroke();
			ctx.fillStyle = SEAL;
			ctx.beginPath();
			ctx.arc(58, -8, 3, 0, Math.PI * 2);
			ctx.fill();
			break;
		default:
			ctx.moveTo(0, 0);
			ctx.lineTo(40, -20);
			ctx.stroke();
	}
	ctx.restore();
}
function FightView({ save, zoneId, ritual, lecture, onFinish }) {
	const canvasRef = (0, import_react.useRef)(null);
	const fightRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)({
		left: false,
		right: false,
		jump: false,
		dash: false,
		queue: []
	});
	const pausedRef = (0, import_react.useRef)(false);
	const finished = (0, import_react.useRef)(false);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const zone = zoneId ? zoneById(zoneId) : void 0;
		const waves = lecture ? [LECTURE_WAVE] : ritual ? [RITUAL_WAVE] : zone?.waves ?? [];
		const techId = save.equipped;
		const prog = save.techs[techId];
		if (!waves.length || !prog) return;
		const technique = BY_ID[techId];
		if (!technique) return;
		const graftId = save.graft;
		const graft = graftId ? BY_ID[graftId] ?? null : null;
		const slotTech = save.evolved && technique.id === "absolute-fingers" && save.domainSlot ? BY_ID[save.domainSlot] : void 0;
		const fight = createFight({
			waves,
			ce: save.ce,
			maxHp: maxHpFor(save.kills),
			tech: technique,
			weaponRank: prog.weapon,
			techLevel: prog.level,
			graft,
			slotted: slotTech ? {
				id: slotTech.domain.id,
				name: slotTech.domain.name
			} : null,
			ritual,
			lecture,
			mood: lecture ? "lecture" : ritual ? "ritual" : zone?.id ?? "none"
		});
		fightRef.current = fight;
		setMuted(!save.sfx);
		unlockAudio();
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		let last = performance.now();
		let acc = 0;
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
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
	}, []);
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			if (e.repeat) return;
			const map = {
				KeyA: () => inputRef.current.left = true,
				ArrowLeft: () => inputRef.current.left = true,
				KeyD: () => inputRef.current.right = true,
				ArrowRight: () => inputRef.current.right = true,
				KeyW: () => inputRef.current.jump = true,
				ArrowUp: () => inputRef.current.jump = true,
				Space: () => inputRef.current.jump = true,
				ShiftLeft: () => inputRef.current.dash = true,
				ShiftRight: () => inputRef.current.dash = true
			};
			if (map[e.code]) {
				e.preventDefault();
				map[e.code]();
				return;
			}
			const act = {
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
				Digit9: "9"
			};
			if (act[e.code]) {
				e.preventDefault();
				push(act[e.code]);
			}
			if (e.code === "Escape") {
				e.preventDefault();
				togglePause();
			}
		};
		const up = (e) => {
			if (e.code === "KeyA" || e.code === "ArrowLeft") inputRef.current.left = false;
			if (e.code === "KeyD" || e.code === "ArrowRight") inputRef.current.right = false;
			if (e.code === "KeyW" || e.code === "ArrowUp" || e.code === "Space") inputRef.current.jump = false;
			if (e.code === "ShiftLeft" || e.code === "ShiftRight") inputRef.current.dash = false;
		};
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
		};
	}, []);
	function push(act) {
		const fight = fightRef.current;
		if (!fight || pausedRef.current || fight.phase !== "combat") return;
		if (inputRef.current.queue.length < 3) inputRef.current.queue.push(act);
	}
	function hold(key, value) {
		inputRef.current[key] = value;
	}
	function togglePause() {
		const fight = fightRef.current;
		if (!fight || fight.phase !== "combat") return;
		pausedRef.current = !pausedRef.current;
		setPaused(pausedRef.current);
		inputRef.current.left = false;
		inputRef.current.right = false;
		inputRef.current.jump = false;
		inputRef.current.dash = false;
	}
	function leave() {
		const fight = fightRef.current;
		if (!fight || finished.current) return;
		finished.current = true;
		onFinish(buildReport(fight, zoneId));
	}
	const fight = fightRef.current;
	const techName = fight?.playerTech.name ?? "Technique";
	const ce = Math.round(fight?.ce ?? save.ce);
	const techMode = ce >= 30;
	const php = fight ? Math.max(0, Math.ceil(fight.player.hp)) : 0;
	const pmax = fight?.player.maxHp ?? 1;
	const ehp = fight ? Math.max(0, Math.ceil(fight.enemy.hp)) : 0;
	const emax = fight?.enemy.maxHp ?? 1;
	const phase = fight?.phase ?? "combat";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col gap-2 overflow-hidden px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker truncate",
							children: fight?.enemy.title || "Encounter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-2xl leading-none",
							children: fight?.enemy.name || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							value: ehp / emax,
							tone: "seal",
							label: `${ehp} / ${emax}`
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn",
					onClick: togglePause,
					children: "Pause"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-40 flex-1 bg-board",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						className: "absolute inset-0 h-full w-full"
					}),
					phase === "break" && fight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
						title: "The spirit unravels.",
						body: `${fight.waves[fight.wave + 1]?.name ?? "The next proof"} is still on the board. You recover a little vitality. Cursed energy does not.`,
						primary: "Continue",
						onPrimary: () => advanceWave(fight),
						secondary: "Bank and leave",
						onSecondary: () => {
							fleeFight(fight);
							leave();
						}
					}) : null,
					phase === "victory" || phase === "defeat" || phase === "fled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
						title: phase === "victory" ? "The board is yours." : phase === "fled" ? "You closed the ledger." : "The proof collapsed.",
						body: lecture ? "The apprentice unravels. The real districts do not forgive a miscount. Cursed energy spent here is not billed." : phase === "defeat" ? "What you spent stays spent. Weapon form still answers at any tide of cursed energy." : "The district pays in theorems and a little cursed energy.",
						primary: "Return to the sanctum",
						onPrimary: leave
					}) : null,
					paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
						title: "Paused",
						body: "The law waits. Dash through red chalk arcs.",
						primary: "Resume",
						onPrimary: togglePause,
						secondary: "Flee",
						onSecondary: () => {
							if (fight) fleeFight(fight);
							pausedRef.current = false;
							leave();
						}
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plate px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-snug text-chalk",
					children: fight?.lawLine || "The chalk is settling."
				}), fight?.law?.id === "counting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1",
					children: Array.from({ length: 9 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						style: {
							minWidth: 44,
							borderColor: fight.law?.declared === i + 1 ? "var(--color-cursed)" : void 0,
							color: fight.law?.declared === i + 1 ? "var(--color-cursed)" : void 0
						},
						onClick: () => {
							if (fightRef.current) declareCount(fightRef.current, i + 1);
						},
						children: i + 1
					}, i))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: techMode ? "Technique" : "Weapon form"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-dust",
							children: techName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-xs text-dust",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Vitality ", php] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"CE ",
								ce,
								"% · threshold 30"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							value: php / pmax,
							tone: "chalk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								value: ce / 100,
								tone: "cursed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute top-0 bottom-0 w-px bg-seal",
								style: { left: "30%" }
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hold, {
								label: "Left",
								onHold: (v) => hold("left", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hold, {
								label: "Right",
								onHold: (v) => hold("right", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hold, {
								label: "Jump",
								onHold: (v) => hold("jump", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hold, {
								label: "Dash",
								onHold: (v) => hold("dash", v)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: "Weapon",
								hint: "J",
								onClick: () => push("m1")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: "Heavy",
								hint: techMode ? "locked" : cd(fight, "heavy"),
								disabled: techMode,
								onClick: () => push("heavy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: "Special",
								hint: techMode ? "locked" : cd(fight, "special"),
								disabled: techMode,
								onClick: () => push("special")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: fight?.playerTech.a1.name ?? "Ability",
								hint: techMode ? `${cd(fight, "a1")} · 14` : "30%",
								disabled: !techMode,
								onClick: () => push("a1")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: fight?.playerTech.a2.name ?? "Ability II",
								hint: techMode ? `${cd(fight, "a2")} · 24` : "30%",
								disabled: !techMode,
								onClick: () => push("a2")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: fight?.playerTech.id === "absolute-fingers" ? fight.slotted ? "Evolved law" : "Axiom" : "Domain",
								hint: fight?.usedDomain ? "spent" : techMode ? fight?.slotted ? `40 · ${fight.slotted.name}` : "40" : "30%",
								disabled: !techMode || Boolean(fight?.usedDomain),
								seal: true,
								onClick: () => push("domain")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Act, {
								label: "Reverse",
								hint: ce < 20 ? "20%" : `${cd(fight, "rmt")} · ${healPreview(ce)}%`,
								disabled: ce < 20,
								onClick: () => push("rmt")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-xs text-dust md:block",
						children: "A D move · W jump · Shift dash · J weapon · K heavy · L special · U I techniques · O domain · R reverse · 1–9 declare"
					})
				]
			})
		]
	});
}
function cd(fight, key) {
	const n = fight?.cd[key] ?? 0;
	if (n <= .05) return "ready";
	return `${n.toFixed(1)}s`;
}
function paint(canvas, fight, shake) {
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
	ctx.fillRect(-2e3, -2e3, 5e3, 5e3);
	drawFight(ctx, fight, shake);
}
function Bar({ value, tone }) {
	const color = tone === "seal" ? "var(--color-seal)" : tone === "cursed" ? "var(--color-cursed)" : "var(--color-chalk)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 w-full bg-board-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full",
			style: {
				width: `${Math.max(0, Math.min(1, value)) * 100}%`,
				background: color
			}
		})
	});
}
function Act({ label, hint, onClick, disabled, seal }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: `btn fight-btn ${seal ? "btn-seal" : ""}`,
		disabled,
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block truncate text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs text-dust",
			children: hint
		})]
	});
}
function Hold({ label, onHold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "btn fight-btn",
		onPointerDown: (e) => {
			e.preventDefault();
			onHold(true);
		},
		onPointerUp: () => onHold(false),
		onPointerLeave: () => onHold(false),
		onPointerCancel: () => onHold(false),
		children: label
	});
}
function Overlay({ title, body, primary, onPrimary, secondary, onSecondary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex items-center justify-center bg-ink/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "plate w-full max-w-md p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-dust",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: onPrimary,
						children: primary
					}), secondary && onSecondary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						onClick: onSecondary,
						children: secondary
					}) : null]
				})
			]
		})
	});
}
function TheoremApp() {
	const [save, setSave] = (0, import_react.useState)(freshSave);
	const [booted, setBooted] = (0, import_react.useState)(false);
	const [screen, setScreen] = (0, import_react.useState)("title");
	const [zoneId, setZoneId] = (0, import_react.useState)(null);
	const [ritual, setRitual] = (0, import_react.useState)(false);
	const [lecture, setLecture] = (0, import_react.useState)(false);
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [reveal, setReveal] = (0, import_react.useState)(null);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [school, setSchool] = (0, import_react.useState)("all");
	const [confirmErase, setConfirmErase] = (0, import_react.useState)(false);
	const saveRef = (0, import_react.useRef)(save);
	saveRef.current = save;
	(0, import_react.useEffect)(() => {
		setSave(loadSave());
		setBooted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (booted) writeSave(save);
	}, [save, booted]);
	(0, import_react.useEffect)(() => {
		const unlock = () => unlockAudio();
		window.addEventListener("pointerdown", unlock, { once: true });
		return () => window.removeEventListener("pointerdown", unlock);
	}, []);
	function finish(report) {
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
	if (screen === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col justify-between px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Cursed arithmetic"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-dust",
					children: "a ledger of techniques"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-6xl leading-none sm:text-8xl",
					children: "THEOREM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-md text-dust",
					children: "Pull a technique. The signature weapon answers even when cursed energy falls below thirty percent. Open a domain, and the fight must obey a new law."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-primary mt-6",
					onClick: () => setScreen("sanctum"),
					children: "Enter the sanctum"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-dust",
				children: "Counting Finger is already proved. One hundred theorems sit in the well. Hard pity waits at ninety."
			})
		]
	});
	if (screen === "result" && summary) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "After the proof"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-4xl",
			children: summary.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-lg text-dust",
			children: summary.detail
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Theorems",
					v: `+${summary.theorems}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Cursed energy",
					v: `+${summary.ceGain}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					k: "Now held",
					v: `${summary.save.theorems}`
				})
			]
		}),
		summary.evolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "plate mt-4 p-4 text-cursed",
			children: "Absolute Zero has become Absolute Fingers. Erased techniques can be kept."
		}) : null,
		summary.absorbedNew.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm",
			children: ["Absorbed: ", summary.absorbedNew.map((id) => BY_ID[id]?.name).filter(Boolean).join(", ")]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn btn-primary mt-6",
			onClick: () => setScreen("sanctum"),
			children: "Back to the sanctum"
		})
	] });
	if (screen === "fight") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightView, {
		save,
		zoneId,
		ritual,
		lecture,
		onFinish: finish
	});
	const tech = BY_ID[save.equipped] ?? TECHNIQUES[0];
	const prog = save.techs[save.equipped] ?? {
		level: 1,
		weapon: 1
	};
	const zone = zoneId ? ZONES.find((z) => z.id === zoneId) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "kicker",
				children: ["Sanctum · ", formTitle(save.kills)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl leading-none",
				children: screen === "sanctum" ? "THEOREM" : screen === "codex" ? "Codex" : screen === "zones" ? "Districts" : screen === "brief" ? zone?.name : screen === "quest" ? "The Ritual" : "Upgrade"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl leading-none",
					children: save.theorems
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Theorems"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex justify-between text-xs text-dust",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Cursed energy ",
						Math.round(save.ce),
						"%"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Vitality ", maxHpFor(save.kills)] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-2 bg-board-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-cursed",
						style: { width: `${save.ce}%` }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-0 bottom-0 w-px bg-seal",
						style: { left: "30%" }
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-dust",
					children: "Below the seal, only the weapon answers. At thirty and above, the technique wakes."
				})
			]
		}),
		screen !== "sanctum" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn mt-4",
			onClick: () => setScreen(screen === "brief" ? "zones" : "sanctum"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
				className: "mr-2 inline size-4",
				"aria-hidden": true
			}), "Back"]
		}) : null,
		screen === "sanctum" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sanctum, {
			save,
			tech,
			level: prog.level,
			weapon: prog.weapon,
			onZones: () => setScreen("zones"),
			onCodex: () => setScreen("codex"),
			onQuest: () => setScreen("quest"),
			onUpgrade: () => setScreen("upgrade"),
			onPull: doPull,
			onEquip: (id) => setSave({
				...save,
				equipped: id
			}),
			onSound: () => setSave({
				...save,
				sfx: !save.sfx
			}),
			onLesson: () => setSave({
				...save,
				lesson: true
			}),
			onLecture: () => {
				setLecture(true);
				setRitual(false);
				setZoneId(null);
				setScreen("fight");
			},
			confirmErase,
			onErase: () => {
				if (!confirmErase) {
					setConfirmErase(true);
					return;
				}
				const next = freshSave();
				setSave(next);
				setConfirmErase(false);
			}
		}) : null,
		screen === "codex" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Codex, {
			save,
			school,
			onSchool: setSchool,
			onEquip: (id) => setSave({
				...save,
				equipped: id
			}),
			onGraft: (id) => setSave({
				...save,
				graft: save.graft === id ? null : id
			}),
			onSlot: (id) => setSave({
				...save,
				domainSlot: save.domainSlot === id ? null : id
			})
		}) : null,
		screen === "zones" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zones, {
			save,
			onOpen: (id) => {
				setZoneId(id);
				setRitual(false);
				setLecture(false);
				setScreen("brief");
			}
		}) : null,
		screen === "brief" && zone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brief, {
			zoneName: zone.name,
			epithet: zone.epithet,
			brief: zone.brief,
			law: zone.law,
			onStart: () => {
				setRitual(false);
				setLecture(false);
				setScreen("fight");
			}
		}) : null,
		screen === "upgrade" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upgrade, {
			save,
			tech,
			onLevel: () => {
				const cost = upgradeCost("level", prog.level);
				if (prog.level >= 8 || save.theorems < cost) return;
				setSave({
					...save,
					theorems: save.theorems - cost,
					techs: {
						...save.techs,
						[tech.id]: {
							...prog,
							level: prog.level + 1
						}
					}
				});
			},
			onWeapon: () => {
				const cost = upgradeCost("weapon", prog.weapon);
				if (prog.weapon >= 8 || save.theorems < cost) return;
				setSave({
					...save,
					theorems: save.theorems - cost,
					techs: {
						...save.techs,
						[tech.id]: {
							...prog,
							weapon: prog.weapon + 1
						}
					}
				});
			}
		}) : null,
		screen === "quest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quest, {
			save,
			onVoid: () => {
				setZoneId("void");
				setRitual(false);
				setScreen("brief");
			},
			onRitual: () => {
				setRitual(true);
				setLecture(false);
				setZoneId(null);
				setScreen("fight");
			},
			onAnyBoss: () => setScreen("zones")
		}) : null,
		spinning || reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-20 flex items-center justify-center bg-ink/85 p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "plate w-full max-w-md p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Theorem pull"
					}),
					spinning || !reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl",
						children: "The well is turning…"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealCard, { reveal }),
					!spinning && reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: () => setReveal(null),
							children: "Close"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn",
							disabled: save.theorems < 40,
							onClick: doPull,
							children: ["Pull again · ", 40]
						})]
					}) : null
				]
			})
		}) : null
	] });
}
function Shell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto min-h-dvh max-w-3xl px-4 py-5",
		children
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "plate p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: v
		})]
	});
}
function Stars({ n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex gap-0.5 text-cursed",
		"aria-label": `${n} star`,
		children: Array.from({ length: n }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
			className: "size-3.5 fill-current",
			"aria-hidden": true
		}, i))
	});
}
function Sanctum({ save, tech, level, weapon, onZones, onCodex, onQuest, onUpgrade, onPull, onEquip, onSound, onLesson, onLecture, confirmErase, onErase }) {
	const ids = equippable(save);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 flex flex-col gap-4",
		children: [
			!save.lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plate p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "First lecture"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 list-disc space-y-1 pl-4 text-sm text-dust",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The signature weapon is always yours. Jab, and when energy is low, heavy and special." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Techniques wake at 30% cursed energy: ability, ability, domain." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A domain rewrites the rules. Read the law line. Dash through red chalk arcs." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Reverse Math heals more when you are full of energy, and spends nearly half of it." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn",
							onClick: onLesson,
							children: "I have the law"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: onLecture,
							children: "Prove it on the board"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plate p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "kicker",
								children: [
									SCHOOL_LABEL[tech.school],
									" · ",
									RARITY_LABEL[tech.rarity]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl leading-tight",
								children: tech.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-dust",
								children: tech.epithet
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: tech.stars })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"Weapon · ",
							tech.weapon,
							" · rank ",
							weapon
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-dust",
						children: ["Technique level ", level]
					}),
					save.equipped === "absolute-fingers" && save.domainSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-cursed",
						children: ["Evolved law slotted · ", BY_ID[save.domainSlot]?.domain.name]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-chalk",
								children: tech.a1.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-dust",
								children: tech.a1.blurb
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-chalk",
								children: tech.a2.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-dust",
								children: tech.a2.blurb
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-cursed",
								children: tech.domain.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-dust",
								children: tech.domain.law
							})] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-primary",
					onClick: onZones,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, {
						className: "mr-2 inline size-4",
						"aria-hidden": true
					}), "Enter a district"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-seal",
					disabled: save.theorems < 40,
					onClick: onPull,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "mr-2 inline size-4",
							"aria-hidden": true
						}),
						"Theorem pull · ",
						40
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn",
						onClick: onCodex,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							className: "mr-1 inline size-4",
							"aria-hidden": true
						}), "Codex"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn",
						onClick: onUpgrade,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, {
							className: "mr-1 inline size-4",
							"aria-hidden": true
						}), "Upgrade"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn",
						onClick: onQuest,
						children: "Ritual"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn",
				onClick: onLecture,
				children: ["Chalk lecture", save.lectured ? "" : " · first proof pays"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker mb-2",
				children: "Equipped from the ledger"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: ids.map((id) => {
					const t = BY_ID[id];
					if (!t) return null;
					const on = id === save.equipped;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `btn ${on ? "btn-primary" : ""}`,
						onClick: () => onEquip(id),
						children: t.name
					}, id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plate p-4 text-sm text-dust",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Pity ",
						save.pity,
						"/90. Soft pity begins at 70. Legendary or better is guaranteed at 90. Pulls so far: ",
						save.pulls,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-2 h-2 bg-board-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-cursed",
							style: { width: `${save.pity / 90 * 100}%` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-0 bottom-0 w-px bg-dust",
							style: { left: `${70 / 90 * 100}%` }
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn",
							onClick: onSound,
							children: [
								save.sfx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "mr-1 inline size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "mr-1 inline size-4" }),
								"Sound ",
								save.sfx ? "on" : "off"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn",
							onClick: onErase,
							children: confirmErase ? "Confirm erase" : "Erase ledger"
						})]
					})
				]
			})
		]
	});
}
function Codex({ save, school, onSchool, onEquip, onGraft, onSlot }) {
	const schools = [
		"all",
		"elementary",
		"middle",
		"high",
		"college",
		"apex"
	];
	const list = TECHNIQUES.filter((t) => school === "all" || t.school === school);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: schools.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `btn ${school === s ? "btn-primary" : ""}`,
					onClick: () => onSchool(s),
					children: s === "all" ? "All" : SCHOOL_LABEL[s]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-3",
				children: list.map((t) => {
					const owned = Boolean(save.techs[t.id]);
					const hiddenFinger = t.id === "absolute-fingers" && !save.evolved;
					const transmuted = t.id === "absolute-zero" && save.evolved;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "plate p-4",
						style: { opacity: owned && !hiddenFinger ? 1 : .72 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "kicker",
								children: [
									SCHOOL_LABEL[t.school],
									" · ",
									RARITY_LABEL[t.rarity]
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: hiddenFinger ? "Absolute Fingers" : t.name
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: t.stars })]
						}), hiddenFinger ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-dust",
							children: "Secret. Absolute Zero must finish the ritual before the finger exists."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-dust",
								children: t.epithet
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: ["Weapon · ", t.weapon]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-dust",
								children: t.domain.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-dust",
								children: owned ? t.domain.law : "Prove it in the well to read the law."
							}),
							transmuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-seal-chalk",
								children: "Transmuted into Absolute Fingers."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [owned && !transmuted && t.id !== "absolute-fingers" || t.id === "absolute-fingers" && save.evolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn",
									onClick: () => onEquip(t.id),
									children: save.equipped === t.id ? "Equipped" : "Equip"
								}) : null, !owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 text-xs text-dust",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										className: "size-3.5",
										"aria-hidden": true
									}), " Unproved"]
								}) : null]
							})
						] })]
					}, t.id);
				})
			}),
			save.absorbed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker mb-2",
						children: "Kept forever"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-dust",
						children: "Graft an ability into Copy & Evolve. Slot a domain and Perfect Axiom opens that law — evolved — whenever the enemy has nothing to devour."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: save.absorbed.map((id) => {
							const t = BY_ID[id];
							if (!t) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "plate p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl leading-tight",
										children: t.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-dust",
										children: t.domain.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: `btn ${save.graft === id ? "btn-primary" : ""}`,
											onClick: () => onGraft(id),
											children: save.graft === id ? "Grafted" : "Graft ability"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: `btn ${save.domainSlot === id ? "btn-seal" : ""}`,
											onClick: () => onSlot(id),
											children: save.domainSlot === id ? "Domain slotted" : "Slot evolved domain"
										})]
									})
								]
							}, id);
						})
					})
				]
			}) : null
		]
	});
}
function Zones({ save, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 flex flex-col gap-3",
		children: ZONES.map((z, i) => {
			const open = zoneUnlocked(save, z.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "plate p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "kicker",
						children: [
							"0",
							i + 1,
							" ",
							save.clears[z.id] ? "· cleared" : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: z.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-dust",
						children: z.epithet
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary mt-3",
						disabled: !open,
						onClick: () => onOpen(z.id),
						children: open ? "Read the brief" : "Sealed until the previous boss falls"
					})
				]
			}, z.id);
		})
	});
}
function Brief({ zoneName, epithet, brief, law, onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-dust",
				children: epithet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: brief
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "plate mt-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "The law you will meet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: law
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-dust",
				children: "Dash the red chalk arc. Hold forward and use the weapon until a technique is worth the energy."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn btn-primary mt-4",
				onClick: onStart,
				children: ["Begin in ", zoneName]
			})
		]
	});
}
function Upgrade({ save, tech, onLevel, onWeapon }) {
	const prog = save.techs[tech.id] ?? {
		level: 1,
		weapon: 1
	};
	const lc = upgradeCost("level", prog.level);
	const wc = upgradeCost("weapon", prog.weapon);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-dust",
				children: [
					"Upgrading ",
					tech.name,
					". Weapons grow stronger with rank. Abilities grow with technique level. Both cap at ",
					8,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn",
				disabled: prog.level >= 8 || save.theorems < lc,
				onClick: onLevel,
				children: [
					"Technique ",
					prog.level,
					" → ",
					Math.min(8, prog.level + 1),
					" · ",
					prog.level >= 8 ? "mastered" : `${lc} theorems`
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn",
				disabled: prog.weapon >= 8 || save.theorems < wc,
				onClick: onWeapon,
				children: [
					tech.weapon,
					" ",
					prog.weapon,
					" → ",
					Math.min(8, prog.weapon + 1),
					" · ",
					prog.weapon >= 8 ? "mastered" : `${wc} theorems`
				]
			})
		]
	});
}
function Quest({ save, onVoid, onRitual, onAnyBoss }) {
	const zero = ownsZero(save);
	const need = save.seed ? 1 : 3;
	if (save.evolved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: "You are the Perfect Sorcerer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-dust",
				children: "Perfect Axiom devours a foe’s domain and, if they fall while it is open, keeps that technique. Graft the ability. Slot the domain. Both stay evolved."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm",
				children: ["Kept: ", save.absorbed.length ? save.absorbed.map((id) => BY_ID[id]?.name).join(", ") : "none yet."]
			})
		]
	});
	if (!save.techs["absolute-zero"]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-dust",
			children: "Birth of the Perfect Sorcerer stays shut until Absolute Zero is in the ledger. Mythic. Half a percent. The secret seed cannot appear before it."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-dust",
				children: [
					zero ? "Absolute Zero is proved." : "",
					" Equip it. Three seals. Then the finger.",
					save.seed ? " A seed already cracked the first two seals." : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
				n: "I",
				title: "Erase the Null",
				done: save.quest.s1,
				body: "Defeat Null Entity in the Absolute Void while Absolute Zero is equipped.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn mt-2",
					disabled: !zoneUnlocked(save, "void") || save.quest.s1,
					onClick: onVoid,
					children: zoneUnlocked(save, "void") ? "Open the void brief" : "The void is still sealed"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
				n: "II",
				title: "Delete a framework",
				done: save.quest.s2,
				body: "With the first seal broken, cast Total Framework Deletion and kill any boss before the law ends the wave.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn mt-2",
					disabled: !save.quest.s1 || save.quest.s2,
					onClick: onAnyBoss,
					children: "Choose a district"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
				n: "III",
				title: "Birth of the Perfect Sorcerer",
				done: save.quest.s3,
				body: `Face The Unsolved with Absolute Zero. Land Partial Erasure ${need} time${need > 1 ? "s" : ""}, then win. You need the cursed energy to pay for each erase.`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-seal mt-2",
					disabled: !save.quest.s1 || !save.quest.s2,
					onClick: onRitual,
					children: "Begin the ritual"
				})
			})
		]
	});
}
function Stage({ n, title, done, body, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "plate p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "kicker",
				children: [
					"Seal ",
					n,
					" ",
					done ? "· broken" : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-dust",
				children: body
			}),
			children
		]
	});
}
function rarityInk(rarity) {
	if (rarity === "mythic" || rarity === "secret") return "var(--color-seal-chalk)";
	if (rarity === "legendary") return "#e2b15a";
	if (rarity === "epic") return "var(--color-cursed)";
	return "var(--color-dust)";
}
function RevealCard({ reveal }) {
	if (reveal.seed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker mt-3 text-cursed",
			children: "Secret"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-4xl",
			children: "Absolute Fingers seed"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-dust",
			children: reveal.note
		})
	] });
	const tech = reveal.techniqueId ? BY_ID[reveal.techniqueId] : void 0;
	if (!tech) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-3xl",
		children: "The well returned nothing."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "kicker mt-3",
			style: { color: rarityInk(tech.rarity) },
			children: [
				RARITY_LABEL[tech.rarity],
				" · ",
				reveal.duplicate ? "duplicate" : "new"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-4xl leading-tight",
			children: tech.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { n: tech.stars }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm",
			children: ["Weapon · ", tech.weapon]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-dust",
			children: tech.domain.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-dust",
			children: reveal.note
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: RATE_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex justify-between text-xs text-dust",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					row.label,
					" · ",
					row.stars
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.chance })]
			}, row.label))
		})
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheoremApp, {});
}
//#endregion
export { Home as component };
