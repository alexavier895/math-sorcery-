let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(value: boolean): void {
  muted = value;
}

export function unlockAudio(): void {
  if (typeof window === "undefined") return;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, slide = 0): void {
  if (!ctx || muted) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export function sfx(name: string): void {
  if (typeof window === "undefined" || muted) return;
  unlockAudio();
  switch (name) {
    case "m1":
      tone(180 + Math.random() * 40, 0.06, "triangle", 0.05);
      break;
    case "heavy":
      tone(90, 0.14, "sawtooth", 0.06, -40);
      break;
    case "hit":
      tone(240 + Math.random() * 80, 0.08, "square", 0.04);
      tone(120, 0.1, "triangle", 0.04, -50);
      break;
    case "heal":
      tone(440, 0.12, "sine", 0.05, 220);
      tone(660, 0.18, "sine", 0.03, 120);
      break;
    case "domain":
      tone(70, 0.45, "sawtooth", 0.06, 30);
      tone(520, 0.3, "triangle", 0.03, -200);
      break;
    case "fail":
      tone(110, 0.12, "square", 0.04, -40);
      break;
    case "dash":
      tone(300, 0.08, "sine", 0.03, 180);
      break;
    case "awaken":
      tone(392, 0.1, "triangle", 0.05, 80);
      tone(523, 0.16, "sine", 0.04);
      break;
    case "steel":
      tone(160, 0.1, "square", 0.04);
      break;
    case "ui":
      tone(640, 0.04, "sine", 0.03);
      break;
    case "die":
      tone(200, 0.35, "sawtooth", 0.05, -140);
      break;
    case "pull":
      tone(220, 0.2, "triangle", 0.04, 440);
      break;
    default:
      break;
  }
}
