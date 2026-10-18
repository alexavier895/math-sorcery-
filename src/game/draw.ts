import {
  ARENA_L,
  ARENA_R,
  FLOOR,
  PI_DIGITS,
  VH,
  VW,
  type Fight,
  type Fighter,
  type Law,
} from "./fight";

const INK = "#14160f";
const CHALK = "#efe7d2";
const DUST = "#a39b82";
const SEAL = "#d64545";
const CURSED = "#2fcaa8";
const GOLD = "#e2b15a";
const GLYPHS = ["∑", "∫", "π", "√", "∞", "∂", "θ", "φ", "Δ", "λ", "∈", "∀", "≠", "Ω", "α"];

export function drawFight(ctx: CanvasRenderingContext2D, fight: Fight, shake: boolean): void {
  const s = shake ? fight.trauma * fight.trauma : 0;
  const ox = Math.sin(fight.time * 42) * 14 * s;
  const oy = Math.cos(fight.time * 35) * 10 * s;
  ctx.save();
  ctx.translate(ox, oy);
  ctx.fillStyle = INK;
  ctx.fillRect(-40, -40, VW + 80, VH + 80);
  vignette(ctx);
  atmosphere(ctx, fight);
  ruled(ctx);
  drawLawWorld(ctx, fight);
  floor(ctx);
  for (const h of fight.hazards) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(214,69,69,0.7)";
    ctx.lineWidth = 2;
    ctx.ellipse(h.x, FLOOR, h.r, 16, 0, 0, Math.PI * 2);
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
    ctx.fillStyle = fight.banner.startsWith("RAGE") ? "#d64545" : CHALK;
    ctx.font = "680 42px Fraunces, serif";
    ctx.fillText(fight.banner, VW / 2, 150);
    ctx.globalAlpha = 1;
  }
  if (fight.modeFlashT > 0) {
    ctx.globalAlpha = Math.min(1, fight.modeFlashT);
    ctx.fillStyle = fight.mode === "tech" ? CURSED : CHALK;
    ctx.font = "600 18px Outfit, sans-serif";
    ctx.fillText(fight.modeFlash, VW / 2, 188);
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

function vignette(ctx: CanvasRenderingContext2D): void {
  const g = ctx.createRadialGradient(VW / 2, VH / 2, 120, VW / 2, VH / 2, 620);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, VW, VH);
}

function atmosphere(ctx: CanvasRenderingContext2D, fight: Fight): void {
  ctx.save();
  ctx.font = "600 22px Fraunces, serif";
  ctx.fillStyle = "rgba(239,231,210,0.07)";
  ctx.textAlign = "center";
  for (let i = 0; i < GLYPHS.length; i++) {
    const x = (i * 67 + 28) % VW;
    const y = ((i * 91 + fight.time * (16 + (i % 4) * 7)) % (VH + 60)) - 30;
    ctx.fillText(GLYPHS[i]!, x, y);
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
    const start = Math.floor(fight.time * 4) % PI_DIGITS.length;
    let row = "";
    for (let i = 0; i < 28; i++) row += PI_DIGITS[(start + i) % PI_DIGITS.length];
    ctx.fillText(row, VW / 2, 36);
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
    ctx.fillText("1  2  3", VW / 2, 200);
  }
  ctx.restore();
}

function ruled(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = "rgba(239,231,210,0.05)";
  ctx.lineWidth = 1;
  for (let y = 40; y < VH; y += 28) {
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(VW - 24, y);
    ctx.stroke();
  }
}

function floor(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = "rgba(239,231,210,0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(ARENA_L - 20, FLOOR);
  ctx.lineTo(ARENA_R + 20, FLOOR);
  ctx.stroke();
  ctx.strokeStyle = "rgba(239,231,210,0.25)";
  ctx.beginPath();
  ctx.moveTo(ARENA_L - 20, FLOOR + 6);
  ctx.lineTo(ARENA_R + 20, FLOOR + 6);
  ctx.stroke();
}

function drawLawWorld(ctx: CanvasRenderingContext2D, fight: Fight): void {
  const law = fight.law;
  ctx.save();
  ctx.strokeStyle = law && fight.law?.upgraded ? "rgba(226,177,90,0.45)" : "rgba(239,231,210,0.18)";
  ctx.fillStyle = law && fight.law?.upgraded ? "rgba(226,177,90,0.1)" : "rgba(239,231,210,0.08)";
  ctx.lineWidth = 1.5;
  if (!law) {
    if (fight.bossKind === "irrational") digitRow(ctx, PI_DIGITS[fight.piI] ?? "3");
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
      ctx.fillText(`DECLARED ${law.declared}`, VW / 2, 250);
      break;
    case "multiply":
      big(ctx, `×${law.table}`, 100);
      break;
    case "angles":
      drawNeedle(ctx, law);
      break;
    case "grid":
      ctx.strokeStyle = "rgba(47,202,168,0.35)";
      for (const x of [150, 300, 450, 600, 750]) {
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.lineTo(x, FLOOR);
        ctx.stroke();
      }
      break;
    case "right":
      strokeTri(ctx, law.vertexX - 120, FLOOR, law.vertexX, FLOOR - 150, law.vertexX + 160, FLOOR);
      mark(ctx, law.vertexX, "VERTEX");
      break;
    case "quadratic":
      ctx.beginPath();
      ctx.moveTo(160, FLOOR);
      for (let x = 160; x <= 820; x += 12) {
        const u = (x - 480) / 220;
        ctx.lineTo(x, FLOOR - 160 * (1 - u * u));
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
      digitRow(ctx, PI_DIGITS[law.piI] ?? "3");
      break;
    case "collatz":
      big(ctx, String(fight.hail), 110);
      break;
    case "erasure": {
      const p = law.t / law.duration;
      ctx.fillStyle = `rgba(0,0,0,${0.15 + p * 0.45})`;
      ctx.beginPath();
      ctx.arc(480, 280, 40 + p * 280, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "integral":
      ctx.fillStyle = "rgba(47,202,168,0.13)";
      ctx.fillRect(400, FLOOR - 70, 180, 70);
      ctx.strokeStyle = CURSED;
      ctx.strokeRect(400, FLOOR - 70, 180, 70);
      break;
    case "shape": {
      const owner = law.owner === "player" ? fight.player : fight.enemy;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(47,202,168,0.7)";
      ctx.arc(owner.x, owner.y - 70, 78, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(214,69,69,0.6)";
      ctx.strokeRect(400, FLOOR - 160, 160, 160);
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
      const period = 0.75;
      const on = law.t % period < 0.12 || law.t % period > period - 0.12;
      ctx.strokeStyle = on ? CURSED : "rgba(239,231,210,0.3)";
      for (let x = 60; x < 900; x += 8) {
        const y = 180 + Math.sin(x * 0.05 + fight.time * 8) * (16 + law.stacks * 4);
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
      ctx.fillRect(ARENA_L, 96, (ARENA_R - ARENA_L) * (fight.enemy.hp / fight.enemy.maxHp), 8);
      ctx.beginPath();
      ctx.moveTo(VW / 2, 70);
      ctx.lineTo(VW / 2, FLOOR);
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
    case "log": {
      ctx.beginPath();
      for (let i = 0; i < 80; i++) {
        const a = i * 0.28 + fight.time;
        const r = 8 + i * 3.2;
        const x = 480 + Math.cos(a) * r * 0.55;
        const y = 250 + Math.sin(a) * r * 0.28;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      break;
    }
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
      ctx.moveTo(px - 70, FLOOR - 80);
      ctx.lineTo(px + 70, FLOOR - 200);
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
      ctx.fillText(`${law.marks % 4}/4`, VW / 2, 180);
      break;
    case "axiom":
      ctx.font = "italic 28px Fraunces, serif";
      ctx.textAlign = "center";
      ctx.fillStyle = GOLD;
      ctx.fillText("nothing left to steal", VW / 2, 150);
      break;
    default:
      ctx.font = "italic 22px Fraunces, serif";
      ctx.fillStyle = "rgba(239,231,210,0.25)";
      ctx.textAlign = "center";
      ctx.fillText(law.name, VW / 2, 120);
  }
  ctx.restore();
}

function big(ctx: CanvasRenderingContext2D, text: string, y: number): void {
  ctx.font = "680 140px Fraunces, serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(239,231,210,0.09)";
  ctx.fillText(text, VW / 2, y + 80);
}

function digitRow(ctx: CanvasRenderingContext2D, hot: string): void {
  ctx.font = "680 64px Fraunces, serif";
  ctx.textAlign = "center";
  const on = hot === "1" || hot === "3" || hot === "4";
  ctx.fillStyle = on ? CURSED : "rgba(214,69,69,0.85)";
  ctx.fillText(hot, VW / 2, 150);
  ctx.font = "600 16px Outfit, sans-serif";
  ctx.fillStyle = DUST;
  ctx.fillText("π", VW / 2, 176);
}

function mark(ctx: CanvasRenderingContext2D, x: number, label: string): void {
  ctx.strokeStyle = CURSED;
  ctx.beginPath();
  ctx.moveTo(x, FLOOR);
  ctx.lineTo(x, FLOOR - 36);
  ctx.stroke();
  ctx.fillStyle = CURSED;
  ctx.font = "600 12px Outfit, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, FLOOR - 44);
}

function strokeTri(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.stroke();
}

function drawNeedle(ctx: CanvasRenderingContext2D, law: Law): void {
  const cx = 480;
  const cy = 210;
  ctx.beginPath();
  ctx.arc(cx, cy, 90, Math.PI, 0);
  ctx.stroke();
  const seal = Math.PI + (law.seal / 180) * Math.PI;
  ctx.strokeStyle = "rgba(214,69,69,0.9)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(seal) * 70, cy + Math.sin(seal) * 70);
  ctx.lineTo(cx + Math.cos(seal) * 98, cy + Math.sin(seal) * 98);
  ctx.stroke();
  const ang = Math.PI + (law.angle / 180) * Math.PI;
  ctx.strokeStyle = CHALK;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(ang) * 84, cy + Math.sin(ang) * 84);
  ctx.stroke();
}

function drawFighter(ctx: CanvasRenderingContext2D, f: Fighter, fight: Fight): void {
  if (f.hp <= 0 && f.state === "dead") ctx.globalAlpha = 0.45;
  ctx.save();
  const sy = 1 - f.squash * 0.28;
  const sx = 1 + f.squash * 0.18;
  const lunge = f.state === "attack" && f.fired ? 14 : 0;
  ctx.translate(f.x + f.facing * lunge, f.y);
  ctx.scale(f.facing * sx, sy);

  if (f.side === "player" && fight.rageT > 0) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(214,69,69,0.9)";
    ctx.lineWidth = 3;
    ctx.arc(0, -78, 78, 0, Math.PI * 2);
    ctx.stroke();
  }
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
    const p = Math.min(1, f.attackT / Math.max(0.05, f.attack.windup));
    ctx.strokeStyle = f.side === "player" ? CURSED : SEAL;
    ctx.globalAlpha = 0.35 + p * 0.65;
    ctx.beginPath();
    ctx.arc(46, -48, 18 + p * 26, -0.8, 0.8);
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

function drawWeapon(ctx: CanvasRenderingContext2D, f: Fighter, fight: Fight, color: string): void {
  ctx.save();
  ctx.translate(22, -36);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  const t = fight.time;
  switch (f.style) {
    case "staff": {
      ctx.moveTo(0, 18);
      ctx.lineTo(8, -48);
      ctx.stroke();
      ctx.font = "700 16px Fraunces, serif";
      ctx.fillStyle = CURSED;
      ctx.textAlign = "center";
      ctx.fillText(String(Math.floor(t * 4) % 10), 8, -16);
      break;
    }
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
      const spread = 0.35 + Math.sin(t * 3) * 0.28;
      for (const ang of [-spread, 0, spread]) {
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
      ctx.arc(20, -28, 18, -1.4, 0.4);
      ctx.stroke();
      ctx.font = "700 14px Fraunces, serif";
      ctx.fillText("%", 28, -24);
      break;
    case "bow":
      ctx.beginPath();
      ctx.moveTo(18, -36);
      for (let i = 0; i <= 12; i++) {
        const u = (i / 12) * 2 - 1;
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
      const n = 4 + (Math.abs(fight.hail) % 5);
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
      ctx.rotate(Math.sin(t * 2) * 0.4);
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
      ctx.fillText(PI_DIGITS[Math.floor(t * 6) % PI_DIGITS.length] ?? "3", 16, -5);
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
