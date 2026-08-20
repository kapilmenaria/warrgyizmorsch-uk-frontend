/* =========================================================
   SCREEN PAINTERS

   Each function draws one animated "app screen" onto a 2D
   canvas. That canvas is used as a THREE.CanvasTexture and
   mapped onto the screen of a 3D device, so the monitors,
   phones and panels in the services card show live UI rather
   than a static image.

   Signature: (ctx, width, height, time, accent) => void
   `time` is seconds since the scene mounted.
========================================================= */

export type Painter = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  accent: string,
) => void;

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

const SANS =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

/** Rounded rectangle path. */
export function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function fillRR(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string | CanvasGradient | CanvasPattern,
) {
  rr(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

/** "#006FC9" + alpha -> "rgba(0,111,201,alpha)" */
export function alpha(hex: string, a: number) {
  const clean = hex.replace("#", "");
  const int = parseInt(
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean,
    16,
  );

  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;

  return `rgba(${r},${g},${b},${a})`;
}

/** Smooth 0..1 ramp. */
function ease(x: number) {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

/** Deterministic pseudo-random in 0..1 from an integer seed. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function traceLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string,
  weight = 600,
  font = SANS,
) {
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, x, y);
}

/* =========================================================
   1. WEB DEVELOPMENT — code editor with live typing
========================================================= */

type Token = [text: string, color: string];

const CODE: Token[][] = [
  [
    ["import", "#C084FC"],
    [" { Hero, Services } ", "#CBD5E1"],
    ["from", "#C084FC"],
    [" '@/sections'", "#6EE7B7"],
  ],
  [],
  [
    ["export default function", "#C084FC"],
    [" Page", "#7DD3FC"],
    ["() {", "#CBD5E1"],
  ],
  [
    ["  return", "#C084FC"],
    [" (", "#CBD5E1"],
  ],
  [
    ["    <main", "#7DD3FC"],
    [" className", "#FBBF24"],
    ["=", "#CBD5E1"],
    ['"min-h-screen"', "#6EE7B7"],
    [">", "#7DD3FC"],
  ],
  [
    ["      <Hero", "#7DD3FC"],
    [" animated ", "#FBBF24"],
    ["/>", "#7DD3FC"],
  ],
  [
    ["      <Services", "#7DD3FC"],
    [" responsive ", "#FBBF24"],
    ["/>", "#7DD3FC"],
  ],
  [
    ["    </main>", "#7DD3FC"],
  ],
  [
    ["  )", "#CBD5E1"],
  ],
  [
    ["}", "#CBD5E1"],
  ],
];

const CODE_TOTAL = CODE.reduce(
  (sum, line) => sum + line.reduce((s, [text]) => s + text.length, 0) + 1,
  0,
);

export const paintWeb: Painter = (ctx, w, h, t, accent) => {
  ctx.clearRect(0, 0, w, h);

  /* Background */
  ctx.fillStyle = "#050D18";
  ctx.fillRect(0, 0, w, h);

  /* --- Browser chrome --- */
  const barH = 54;
  ctx.fillStyle = "#0B1B2C";
  ctx.fillRect(0, 0, w, barH);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(0, barH - 1, w, 1);

  const dots = ["#EF4444", "#F59E0B", "#10B981"];
  dots.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(26 + i * 20, barH / 2, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  fillRR(ctx, 104, 13, 150, 28, 8, "rgba(255,255,255,0.07)");
  traceLabel(ctx, "page.tsx", 122, 32, 15, "rgba(255,255,255,0.66)", 600, MONO);

  fillRR(ctx, 268, 13, w - 300, 28, 14, "rgba(255,255,255,0.045)");
  traceLabel(
    ctx,
    "localhost:3000",
    288,
    32,
    14,
    "rgba(255,255,255,0.35)",
    500,
    MONO,
  );

  /* --- Split panes --- */
  const splitX = Math.round(w * 0.58);
  const bodyY = barH;
  const bodyH = h - barH - 44;

  /* Editor gutter */
  ctx.fillStyle = "#07131F";
  ctx.fillRect(0, bodyY, 56, bodyH);

  /* How many characters are typed right now */
  const cycle = CODE_TOTAL + 90;
  const typed = Math.min(CODE_TOTAL, (t * 34) % cycle);
  const progress = typed / CODE_TOTAL;

  let budget = typed;
  const lineH = 30;
  let cursorX = 0;
  let cursorY = 0;

  ctx.font = `500 17px ${MONO}`;
  ctx.textBaseline = "alphabetic";

  CODE.forEach((line, lineIndex) => {
    const y = bodyY + 40 + lineIndex * lineH;

    /* Line number */
    traceLabel(
      ctx,
      String(lineIndex + 1).padStart(2, "0"),
      16,
      y,
      14,
      budget > 0 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)",
      500,
      MONO,
    );

    let x = 72;

    for (const [text, color] of line) {
      if (budget <= 0) break;

      const slice = text.slice(0, Math.floor(budget));
      budget -= text.length;

      ctx.font = `500 17px ${MONO}`;
      ctx.fillStyle = color;
      ctx.fillText(slice, x, y);

      x += ctx.measureText(slice).width;
    }

    if (budget > 0) budget -= 1; // newline

    if (budget > -1 && budget <= 0 && cursorY === 0) {
      cursorX = x;
      cursorY = y;
    }
  });

  /* Blinking caret */
  if (typed < CODE_TOTAL && Math.floor(t * 2.2) % 2 === 0) {
    ctx.fillStyle = accent;
    ctx.fillRect(cursorX + 2, cursorY - 16, 3, 21);
  }

  /* Divider */
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(splitX, bodyY, 1, bodyH);

  /* --- Live preview pane --- */
  const px = splitX + 1;
  const pw = w - px;

  ctx.fillStyle = "#08182A";
  ctx.fillRect(px, bodyY, pw, bodyH);

  const pad = 26;

  /* Preview nav appears first */
  const navIn = ease(progress / 0.18);
  if (navIn > 0.01) {
    ctx.globalAlpha = navIn;
    fillRR(ctx, px + pad, bodyY + pad, pw - pad * 2, 34, 10, "rgba(255,255,255,0.05)");
    fillRR(ctx, px + pad + 12, bodyY + pad + 11, 54, 12, 6, alpha(accent, 0.85));

    [0, 1, 2].forEach((i) => {
      fillRR(
        ctx,
        px + pad + 90 + i * 46,
        bodyY + pad + 13,
        32,
        8,
        4,
        "rgba(255,255,255,0.16)",
      );
    });
    ctx.globalAlpha = 1;
  }

  /* Hero block */
  const heroIn = ease((progress - 0.34) / 0.22);
  if (heroIn > 0.01) {
    ctx.globalAlpha = heroIn;
    const hy = bodyY + pad + 52;
    const hh = 128;

    const grad = ctx.createLinearGradient(px + pad, hy, px + pw - pad, hy + hh);
    grad.addColorStop(0, alpha(accent, 0.34));
    grad.addColorStop(1, alpha(accent, 0.05));

    fillRR(ctx, px + pad, hy, pw - pad * 2, hh, 14, grad);

    fillRR(ctx, px + pad + 20, hy + 28, (pw - pad * 2 - 40) * 0.72, 16, 8, "rgba(255,255,255,0.72)");
    fillRR(ctx, px + pad + 20, hy + 56, (pw - pad * 2 - 40) * 0.5, 10, 5, "rgba(255,255,255,0.34)");
    fillRR(ctx, px + pad + 20, hy + 84, 86, 24, 12, accent);
    ctx.globalAlpha = 1;
  }

  /* Card row */
  const cardsIn = ease((progress - 0.62) / 0.26);
  if (cardsIn > 0.01) {
    ctx.globalAlpha = cardsIn;
    const cy = bodyY + pad + 200;
    const gap = 12;
    const cw = (pw - pad * 2 - gap * 2) / 3;

    [0, 1, 2].forEach((i) => {
      const cx = px + pad + i * (cw + gap);
      const lift = Math.sin(t * 2 + i * 0.9) * 3;

      fillRR(ctx, cx, cy + lift, cw, 84, 12, "rgba(255,255,255,0.045)");
      fillRR(ctx, cx + 12, cy + lift + 14, 22, 22, 7, alpha(accent, 0.7));
      fillRR(ctx, cx + 12, cy + lift + 48, cw - 34, 8, 4, "rgba(255,255,255,0.2)");
      fillRR(ctx, cx + 12, cy + lift + 62, cw - 54, 6, 3, "rgba(255,255,255,0.11)");
    });
    ctx.globalAlpha = 1;
  }

  /* --- Status bar --- */
  const sy = h - 44;
  ctx.fillStyle = "#0A1A2B";
  ctx.fillRect(0, sy, w, 44);

  ctx.fillStyle = accent;
  ctx.fillRect(0, sy, 6, 44);

  const compiled = typed >= CODE_TOTAL;
  traceLabel(
    ctx,
    compiled ? "✓  Compiled successfully" : "●  Building…",
    26,
    sy + 28,
    15,
    compiled ? "#34D399" : "rgba(255,255,255,0.5)",
    600,
    MONO,
  );

  traceLabel(
    ctx,
    `${Math.round(progress * 100)}%`,
    w - 74,
    sy + 28,
    15,
    "rgba(255,255,255,0.4)",
    600,
    MONO,
  );
};

/* =========================================================
   2. APP DEVELOPMENT — mobile app UI
========================================================= */

const APP_ROWS = [
  ["Design review", "9:30 AM"],
  ["Sprint standup", "11:00 AM"],
  ["Client demo", "2:15 PM"],
  ["QA handoff", "4:00 PM"],
  ["Release notes", "5:30 PM"],
  ["Retro", "6:00 PM"],
];

export const paintApp: Painter = (ctx, w, h, t, accent) => {
  ctx.clearRect(0, 0, w, h);

  /* Background */
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#07182A");
  bg.addColorStop(1, "#040E1A");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  /* Status bar */
  traceLabel(ctx, "9:41", 34, 46, 22, "rgba(255,255,255,0.9)", 700);

  [0, 1, 2, 3].forEach((i) => {
    const bh = 6 + i * 4;
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillRect(w - 118 + i * 10, 44 - bh, 6, bh);
  });

  fillRR(ctx, w - 66, 30, 34, 16, 5, "rgba(255,255,255,0.35)");
  fillRR(ctx, w - 64, 32, 24, 12, 3, "#34D399");

  /* Header */
  traceLabel(ctx, "Good morning", 34, 108, 20, "rgba(255,255,255,0.4)", 500);
  traceLabel(ctx, "Your day", 34, 146, 34, "#FFFFFF", 800);

  ctx.beginPath();
  ctx.arc(w - 60, 126, 26, 0, Math.PI * 2);
  ctx.fillStyle = alpha(accent, 0.85);
  ctx.fill();
  traceLabel(ctx, "JC", w - 76, 134, 20, "#FFFFFF", 700);

  /* Hero metric card */
  const cardY = 188;
  const cardH = 176;
  const grad = ctx.createLinearGradient(30, cardY, w - 30, cardY + cardH);
  grad.addColorStop(0, alpha(accent, 0.9));
  grad.addColorStop(1, alpha(accent, 0.35));

  fillRR(ctx, 30, cardY, w - 60, cardH, 26, grad);

  traceLabel(
    ctx,
    "TASKS COMPLETED",
    56,
    cardY + 44,
    16,
    "rgba(255,255,255,0.72)",
    700,
  );

  /* Counting number */
  const count = Math.floor(12 + (Math.sin(t * 0.5) * 0.5 + 0.5) * 14);
  traceLabel(ctx, `${count}`, 56, cardY + 108, 62, "#FFFFFF", 800);
  traceLabel(ctx, "/ 32", 56 + 84, cardY + 108, 26, "rgba(255,255,255,0.6)", 700);

  /* Progress bar */
  const pct = count / 32;
  fillRR(ctx, 56, cardY + 130, w - 112, 10, 5, "rgba(255,255,255,0.22)");
  fillRR(ctx, 56, cardY + 130, (w - 112) * pct, 10, 5, "#FFFFFF");

  /* Segmented chips */
  const chipY = cardY + cardH + 30;
  const chips = ["Today", "Week", "Month"];
  const activeChip = Math.floor(t / 3) % chips.length;

  let cx = 30;
  chips.forEach((chip, i) => {
    ctx.font = `600 19px ${SANS}`;
    const cw = ctx.measureText(chip).width + 40;

    fillRR(
      ctx,
      cx,
      chipY,
      cw,
      44,
      22,
      i === activeChip ? alpha(accent, 0.9) : "rgba(255,255,255,0.06)",
    );

    traceLabel(
      ctx,
      chip,
      cx + 20,
      chipY + 29,
      19,
      i === activeChip ? "#FFFFFF" : "rgba(255,255,255,0.45)",
      600,
    );

    cx += cw + 12;
  });

  /* Scrolling list */
  const listTop = chipY + 68;
  const listBottom = h - 130;
  const rowH = 92;

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, listTop, w, listBottom - listTop);
  ctx.clip();

  const offset = (t * 26) % (APP_ROWS.length * rowH);

  for (let i = 0; i < APP_ROWS.length * 2; i++) {
    const row = APP_ROWS[i % APP_ROWS.length];
    const y = listTop + i * rowH - offset;

    if (y < listTop - rowH || y > listBottom) continue;

    fillRR(ctx, 30, y, w - 60, rowH - 14, 18, "rgba(255,255,255,0.045)");
    fillRR(ctx, 48, y + 22, 34, 34, 11, alpha(accent, 0.7));

    traceLabel(ctx, row[0], 100, y + 36, 21, "rgba(255,255,255,0.88)", 600);
    traceLabel(ctx, row[1], 100, y + 62, 17, "rgba(255,255,255,0.34)", 500);

    /* Right-hand tick */
    ctx.beginPath();
    ctx.arc(w - 62, y + 39, 12, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.restore();

  /* Fade under the list */
  const fade = ctx.createLinearGradient(0, listBottom - 60, 0, listBottom);
  fade.addColorStop(0, "rgba(4,14,26,0)");
  fade.addColorStop(1, "rgba(4,14,26,1)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, listBottom - 60, w, 60);

  /* Bottom tab bar */
  const tabY = h - 110;
  fillRR(ctx, 24, tabY, w - 48, 84, 28, "rgba(255,255,255,0.06)");

  const tabs = 4;
  const activeTab = Math.floor(t / 2.4) % tabs;
  const tabW = (w - 48) / tabs;

  /* Sliding indicator */
  const indicatorX = 24 + activeTab * tabW + tabW / 2 - 26;
  fillRR(ctx, indicatorX, tabY + 12, 52, 60, 20, alpha(accent, 0.22));

  for (let i = 0; i < tabs; i++) {
    const tx = 24 + i * tabW + tabW / 2;
    const on = i === activeTab;

    fillRR(
      ctx,
      tx - 13,
      tabY + 26,
      26,
      26,
      8,
      on ? accent : "rgba(255,255,255,0.25)",
    );
  }

  /* Home indicator */
  fillRR(ctx, w / 2 - 60, h - 18, 120, 6, 3, "rgba(255,255,255,0.3)");
};

/* =========================================================
   3. ARTIFICIAL INTELLIGENCE — streaming assistant console
========================================================= */

const AI_REPLY =
  "Analysing 42,180 support tickets… clustering by intent. Three automation candidates found: refund status, delivery ETA, and password reset. Estimated deflection: 68%.";

export const paintAI: Painter = (ctx, w, h, t, accent) => {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#060C1C";
  ctx.fillRect(0, 0, w, h);

  /* Header */
  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(0, 52, w, 1);

  ctx.beginPath();
  ctx.arc(38, 30, 9, 0, Math.PI * 2);
  ctx.fillStyle = "#A78BFA";
  ctx.fill();

  traceLabel(ctx, "assistant.warr", 60, 36, 17, "rgba(255,255,255,0.66)", 700, MONO);

  const dotPulse = 0.4 + Math.abs(Math.sin(t * 2)) * 0.6;
  ctx.beginPath();
  ctx.arc(w - 96, 30, 5, 0, Math.PI * 2);
  ctx.fillStyle = alpha("#34D399", dotPulse);
  ctx.fill();
  traceLabel(ctx, "online", w - 82, 36, 15, "rgba(255,255,255,0.35)", 600, MONO);

  /* User message */
  const userText = "Where can we automate first?";
  ctx.font = `500 19px ${SANS}`;
  const userW = ctx.measureText(userText).width + 44;

  fillRR(ctx, w - userW - 30, 84, userW, 54, 18, alpha(accent, 0.85));
  traceLabel(ctx, userText, w - userW - 8, 118, 19, "#FFFFFF", 500);

  /* Assistant streaming reply */
  const cycle = AI_REPLY.length + 70;
  const shown = Math.min(AI_REPLY.length, Math.floor((t * 26) % cycle));
  const text = AI_REPLY.slice(0, shown);

  const bubbleX = 30;
  const bubbleY = 162;
  const bubbleW = w - 170;

  /* Word-wrap */
  ctx.font = `500 19px ${SANS}`;
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > bubbleW - 44) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  const bubbleH = Math.max(60, lines.length * 30 + 34);

  fillRR(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 18, "rgba(255,255,255,0.05)");
  rr(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 18);
  ctx.strokeStyle = "rgba(167,139,250,0.22)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  lines.forEach((line, i) => {
    traceLabel(
      ctx,
      line,
      bubbleX + 22,
      bubbleY + 40 + i * 30,
      19,
      "rgba(255,255,255,0.8)",
      500,
    );
  });

  /* Caret */
  if (shown < AI_REPLY.length && Math.floor(t * 2.4) % 2 === 0) {
    const lastLine = lines[lines.length - 1] ?? "";
    ctx.font = `500 19px ${SANS}`;
    const cw = ctx.measureText(lastLine).width;

    ctx.fillStyle = "#A78BFA";
    ctx.fillRect(
      bubbleX + 24 + cw,
      bubbleY + 24 + (lines.length - 1) * 30,
      3,
      21,
    );
  }

  /* Confidence meters */
  const metaY = bubbleY + bubbleH + 34;
  const metrics: [string, number][] = [
    ["refund status", 0.92],
    ["delivery ETA", 0.81],
    ["password reset", 0.74],
  ];

  metrics.forEach(([label, value], i) => {
    const y = metaY + i * 46;
    const reveal = ease((shown / AI_REPLY.length - 0.5 - i * 0.12) / 0.2);

    if (reveal < 0.02) return;

    ctx.globalAlpha = reveal;

    traceLabel(ctx, label, 30, y + 16, 16, "rgba(255,255,255,0.45)", 600, MONO);

    const barX = 220;
    const barW = w - barX - 110;

    fillRR(ctx, barX, y + 4, barW, 12, 6, "rgba(255,255,255,0.06)");

    const grow = value * ease((t * 0.6 + i * 0.2) % 3);
    const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    barGrad.addColorStop(0, "#A78BFA");
    barGrad.addColorStop(1, accent);

    fillRR(ctx, barX, y + 4, barW * Math.max(grow, value * 0.35), 12, 6, barGrad);

    traceLabel(
      ctx,
      `${Math.round(value * 100)}%`,
      w - 84,
      y + 16,
      16,
      "rgba(255,255,255,0.7)",
      700,
      MONO,
    );

    ctx.globalAlpha = 1;
  });

  /* Input row */
  const inputY = h - 68;
  fillRR(ctx, 30, inputY, w - 60, 50, 16, "rgba(255,255,255,0.045)");
  traceLabel(
    ctx,
    "Ask anything…",
    52,
    inputY + 32,
    17,
    "rgba(255,255,255,0.25)",
    500,
  );

  fillRR(ctx, w - 92, inputY + 9, 42, 32, 12, accent);
};

/* =========================================================
   4. SOFTWARE DEVELOPMENT — operations dashboard
========================================================= */

export const paintSoftware: Painter = (ctx, w, h, t, accent) => {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#06131F";
  ctx.fillRect(0, 0, w, h);

  /* Header */
  traceLabel(ctx, "Operations", 32, 44, 26, "#FFFFFF", 800);

  const pulse = 0.4 + Math.abs(Math.sin(t * 2.2)) * 0.6;
  ctx.beginPath();
  ctx.arc(w - 118, 36, 6, 0, Math.PI * 2);
  ctx.fillStyle = alpha("#34D399", pulse);
  ctx.fill();
  traceLabel(ctx, "LIVE", w - 102, 42, 16, "#34D399", 700, MONO);

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(0, 66, w, 1);

  /* KPI tiles */
  const kpis: [string, number, string][] = [
    ["Uptime", 99.98, "%"],
    ["Orders / hr", 1284, ""],
    ["Avg. response", 214, "ms"],
  ];

  const gap = 16;
  const tileW = (w - 64 - gap * 2) / 3;

  kpis.forEach(([label, target, unit], i) => {
    const x = 32 + i * (tileW + gap);
    const y = 92;

    fillRR(ctx, x, y, tileW, 108, 16, "rgba(255,255,255,0.04)");
    fillRR(ctx, x, y, 4, 108, 2, i === 0 ? accent : alpha(accent, 0.35));

    /* Gentle live wobble so the numbers feel real */
    const wobble = 1 + Math.sin(t * 1.3 + i * 2) * 0.012;
    const value = target * wobble;

    traceLabel(
      ctx,
      label.toUpperCase(),
      x + 20,
      y + 32,
      14,
      "rgba(255,255,255,0.38)",
      700,
    );

    traceLabel(
      ctx,
      target > 1000
        ? Math.round(value).toLocaleString("en-US")
        : value.toFixed(target % 1 === 0 ? 0 : 2),
      x + 20,
      y + 78,
      36,
      "#FFFFFF",
      800,
    );

    if (unit) {
      ctx.font = `800 36px ${SANS}`;
      const numW = ctx.measureText(
        target > 1000
          ? Math.round(value).toLocaleString("en-US")
          : value.toFixed(target % 1 === 0 ? 0 : 2),
      ).width;

      traceLabel(
        ctx,
        unit,
        x + 26 + numW,
        y + 78,
        18,
        "rgba(255,255,255,0.4)",
        700,
      );
    }
  });

  /* Bar chart */
  const chartX = 32;
  const chartY = 226;
  const chartW = w * 0.6;
  const chartH = h - chartY - 56;

  fillRR(ctx, chartX, chartY, chartW, chartH, 16, "rgba(255,255,255,0.03)");

  traceLabel(
    ctx,
    "THROUGHPUT — LAST 12 HOURS",
    chartX + 20,
    chartY + 32,
    14,
    "rgba(255,255,255,0.35)",
    700,
  );

  /* Gridlines */
  for (let g = 1; g <= 3; g++) {
    const gy = chartY + 52 + ((chartH - 84) / 4) * g;
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.fillRect(chartX + 20, gy, chartW - 40, 1);
  }

  const bars = 12;
  const barGap = 10;
  const barW = (chartW - 40 - barGap * (bars - 1)) / bars;
  const baseY = chartY + chartH - 26;
  const maxH = chartH - 84;

  for (let i = 0; i < bars; i++) {
    const seed = rand(i + 1);
    const wave = 0.45 + seed * 0.35 + Math.sin(t * 1.1 + i * 0.55) * 0.16;
    const bh = Math.max(10, maxH * Math.min(1, wave));
    const bx = chartX + 20 + i * (barW + barGap);

    const isLast = i === bars - 1;
    const grad = ctx.createLinearGradient(0, baseY - bh, 0, baseY);
    grad.addColorStop(0, isLast ? accent : alpha(accent, 0.62));
    grad.addColorStop(1, alpha(accent, 0.12));

    fillRR(ctx, bx, baseY - bh, barW, bh, 5, grad);
  }

  /* Side list */
  const sx = chartX + chartW + 20;
  const sw = w - sx - 32;

  fillRR(ctx, sx, chartY, sw, chartH, 16, "rgba(255,255,255,0.03)");

  traceLabel(
    ctx,
    "SERVICES",
    sx + 18,
    chartY + 32,
    14,
    "rgba(255,255,255,0.35)",
    700,
  );

  const services: [string, string][] = [
    ["api-gateway", "#34D399"],
    ["billing", "#34D399"],
    ["search", "#FBBF24"],
    ["reporting", "#34D399"],
    ["webhooks", "#34D399"],
  ];

  services.forEach(([name, color], i) => {
    const y = chartY + 60 + i * 42;

    fillRR(ctx, sx + 14, y, sw - 28, 32, 10, "rgba(255,255,255,0.035)");

    const blink = i === 2 ? 0.35 + Math.abs(Math.sin(t * 3)) * 0.65 : 1;

    ctx.beginPath();
    ctx.arc(sx + 32, y + 16, 5, 0, Math.PI * 2);
    ctx.fillStyle = alpha(color, blink);
    ctx.fill();

    traceLabel(ctx, name, sx + 48, y + 22, 15, "rgba(255,255,255,0.6)", 600, MONO);
  });
};

/* =========================================================
   5. DIGITAL MARKETING — growth analytics
========================================================= */

export const paintMarketing: Painter = (ctx, w, h, t, accent) => {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#06121F";
  ctx.fillRect(0, 0, w, h);

  traceLabel(ctx, "Campaign performance", 32, 44, 25, "#FFFFFF", 800);
  traceLabel(
    ctx,
    "Last 30 days",
    32,
    70,
    16,
    "rgba(255,255,255,0.35)",
    500,
  );

  /* Metric row */
  const metrics: [string, string, string][] = [
    ["Impressions", "1.24M", "+18%"],
    ["Clicks", "86.4K", "+27%"],
    ["Conversions", "3,912", "+41%"],
  ];

  const gap = 16;
  const tileW = (w - 64 - gap * 2) / 3;

  metrics.forEach(([label, value, delta], i) => {
    const x = 32 + i * (tileW + gap);
    const y = 96;
    const lift = Math.sin(t * 1.4 + i * 0.8) * 2;

    fillRR(ctx, x, y + lift, tileW, 96, 16, "rgba(255,255,255,0.04)");

    traceLabel(
      ctx,
      label.toUpperCase(),
      x + 18,
      y + lift + 30,
      13,
      "rgba(255,255,255,0.36)",
      700,
    );

    traceLabel(ctx, value, x + 18, y + lift + 70, 30, "#FFFFFF", 800);

    ctx.font = `700 15px ${SANS}`;
    const dw = ctx.measureText(delta).width + 20;
    fillRR(ctx, x + tileW - dw - 16, y + lift + 48, dw, 26, 13, "rgba(52,211,153,0.16)");
    traceLabel(ctx, delta, x + tileW - dw - 6, y + lift + 66, 15, "#34D399", 700);
  });

  /* Area chart */
  const cx = 32;
  const cy = 216;
  const cw = w - 64;
  const ch = h - cy - 130;

  fillRR(ctx, cx, cy, cw, ch, 16, "rgba(255,255,255,0.03)");

  traceLabel(
    ctx,
    "ORGANIC + PAID TRAFFIC",
    cx + 20,
    cy + 30,
    14,
    "rgba(255,255,255,0.35)",
    700,
  );

  const points = 26;
  const plotX = cx + 24;
  const plotW = cw - 48;
  const plotBottom = cy + ch - 22;
  const plotH = ch - 70;

  const valueAt = (i: number) => {
    const growth = i / (points - 1);
    const noise = rand(i + 7) * 0.22;
    const breathe = Math.sin(t * 0.9 + i * 0.4) * 0.05;
    return Math.min(1, 0.18 + growth * 0.68 + noise * 0.4 + breathe);
  };

  /* Filled area */
  ctx.beginPath();
  ctx.moveTo(plotX, plotBottom);

  for (let i = 0; i < points; i++) {
    const x = plotX + (plotW / (points - 1)) * i;
    const y = plotBottom - valueAt(i) * plotH;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(plotX + plotW, plotBottom);
  ctx.closePath();

  const areaGrad = ctx.createLinearGradient(0, plotBottom - plotH, 0, plotBottom);
  areaGrad.addColorStop(0, alpha(accent, 0.42));
  areaGrad.addColorStop(1, alpha(accent, 0));
  ctx.fillStyle = areaGrad;
  ctx.fill();

  /* Line */
  ctx.beginPath();
  for (let i = 0; i < points; i++) {
    const x = plotX + (plotW / (points - 1)) * i;
    const y = plotBottom - valueAt(i) * plotH;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.stroke();

  /* Travelling marker */
  const markerIndex = (t * 3) % (points - 1);
  const mi = Math.floor(markerIndex);
  const frac = markerIndex - mi;
  const mx = plotX + (plotW / (points - 1)) * markerIndex;
  const my =
    plotBottom - (valueAt(mi) + (valueAt(mi + 1) - valueAt(mi)) * frac) * plotH;

  ctx.beginPath();
  ctx.arc(mx, my, 12, 0, Math.PI * 2);
  ctx.fillStyle = alpha(accent, 0.22);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(mx, my, 5.5, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();

  /* Channel funnel */
  const fy = h - 96;
  const channels: [string, number][] = [
    ["SEO", 0.86],
    ["Paid", 0.64],
    ["Social", 0.48],
    ["Email", 0.32],
  ];

  const fGap = 14;
  const fW = (w - 64 - fGap * 3) / 4;

  channels.forEach(([name, value], i) => {
    const x = 32 + i * (fW + fGap);

    fillRR(ctx, x, fy, fW, 60, 14, "rgba(255,255,255,0.035)");

    const grow = value * (0.85 + Math.sin(t * 1.2 + i) * 0.15);
    fillRR(ctx, x, fy, fW * grow, 60, 14, alpha(accent, 0.2));

    traceLabel(ctx, name, x + 16, fy + 26, 15, "rgba(255,255,255,0.7)", 700);
    traceLabel(
      ctx,
      `${Math.round(value * 100)}%`,
      x + 16,
      fy + 48,
      14,
      "rgba(255,255,255,0.4)",
      600,
      MONO,
    );
  });
};

/* =========================================================
   6. ECOMMERCE — storefront with live checkout
========================================================= */

const PRODUCTS: [string, string][] = [
  ["Linen Throw", "$129"],
  ["Oak Side Table", "$340"],
  ["Ceramic Vase", "$68"],
];

export const paintEcommerce: Painter = (ctx, w, h, t, accent) => {
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#06131F";
  ctx.fillRect(0, 0, w, h);

  /* Store header */
  traceLabel(ctx, "SAFFRON", 32, 44, 24, "#FFFFFF", 800);

  /* Nav */
  ["New", "Living", "Kitchen", "Sale"].forEach((item, i) => {
    traceLabel(
      ctx,
      item,
      190 + i * 84,
      42,
      16,
      "rgba(255,255,255,0.38)",
      600,
    );
  });

  /* Cart with counting badge */
  const cartCount = 1 + (Math.floor(t / 4) % 4);

  fillRR(ctx, w - 96, 20, 34, 30, 8, "rgba(255,255,255,0.08)");
  fillRR(ctx, w - 88, 14, 18, 10, 5, "rgba(255,255,255,0.2)");

  ctx.beginPath();
  ctx.arc(w - 56, 20, 13, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  traceLabel(ctx, `${cartCount}`, w - 61, 26, 16, "#FFFFFF", 800);

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(0, 68, w, 1);

  /* Product grid */
  const gap = 18;
  const cardW = (w - 64 - gap * 2) / 3;
  const cardY = 96;
  const cardH = h - cardY - 168;

  const hovered = Math.floor(t / 2.6) % 3;

  PRODUCTS.forEach(([name, price], i) => {
    const x = 32 + i * (cardW + gap);
    const isHover = i === hovered;
    const lift = isHover ? -8 : 0;

    fillRR(
      ctx,
      x,
      cardY + lift,
      cardW,
      cardH,
      18,
      isHover ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.035)",
    );

    if (isHover) {
      rr(ctx, x, cardY + lift, cardW, cardH, 18);
      ctx.strokeStyle = alpha(accent, 0.5);
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    /* Image placeholder */
    const imgH = cardH - 96;
    const imgGrad = ctx.createLinearGradient(x, cardY + lift, x + cardW, cardY + lift + imgH);
    imgGrad.addColorStop(0, "rgba(255,255,255,0.09)");
    imgGrad.addColorStop(1, alpha(accent, 0.14));

    fillRR(ctx, x + 14, cardY + lift + 14, cardW - 28, imgH, 12, imgGrad);

    traceLabel(
      ctx,
      name,
      x + 18,
      cardY + lift + imgH + 46,
      18,
      "rgba(255,255,255,0.86)",
      600,
    );

    traceLabel(
      ctx,
      price,
      x + 18,
      cardY + lift + imgH + 74,
      20,
      accent,
      800,
    );

    /* Add-to-cart pill on the hovered card */
    if (isHover) {
      const pop = ease((t % 2.6) / 0.4);
      ctx.globalAlpha = pop;
      fillRR(ctx, x + cardW - 60, cardY + lift + imgH + 50, 44, 30, 15, accent);
      traceLabel(ctx, "+", x + cardW - 44, cardY + lift + imgH + 72, 22, "#FFFFFF", 800);
      ctx.globalAlpha = 1;
    }
  });

  /* Checkout strip */
  const sy = h - 140;
  fillRR(ctx, 32, sy, w - 64, 108, 18, "rgba(255,255,255,0.04)");

  traceLabel(ctx, "CHECKOUT", 56, sy + 32, 14, "rgba(255,255,255,0.35)", 700);

  const steps = ["Cart", "Details", "Payment", "Done"];
  const activeStep = Math.floor(t / 2) % steps.length;

  const trackX = 56;
  const trackW = w - 112;

  fillRR(ctx, trackX, sy + 52, trackW, 6, 3, "rgba(255,255,255,0.07)");

  const fillW = (trackW / (steps.length - 1)) * activeStep;
  const stripGrad = ctx.createLinearGradient(trackX, 0, trackX + trackW, 0);
  stripGrad.addColorStop(0, accent);
  stripGrad.addColorStop(1, "#60C7FF");
  fillRR(ctx, trackX, sy + 52, Math.max(6, fillW), 6, 3, stripGrad);

  steps.forEach((step, i) => {
    const sx = trackX + (trackW / (steps.length - 1)) * i;
    const done = i <= activeStep;

    ctx.beginPath();
    ctx.arc(sx, sy + 55, done ? 11 : 8, 0, Math.PI * 2);
    ctx.fillStyle = done ? accent : "rgba(255,255,255,0.14)";
    ctx.fill();

    if (i === activeStep) {
      ctx.beginPath();
      ctx.arc(sx, sy + 55, 11 + Math.sin(t * 4) * 3 + 5, 0, Math.PI * 2);
      ctx.strokeStyle = alpha(accent, 0.4);
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.textAlign = "center";
    traceLabel(
      ctx,
      step,
      sx,
      sy + 90,
      14,
      done ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)",
      600,
    );
    ctx.textAlign = "left";
  });
};

/* =========================================================
   7. GAME: Live Cyber Action Game UI & Gameplay
========================================================= */

const paintGame: Painter = (ctx, w, h, t, accent) => {
  // Deep space gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#050B18");
  bg.addColorStop(0.5, "#0A1428");
  bg.addColorStop(1, "#040814");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Parallax Scrolling Starfield
  ctx.save();
  for (let i = 0; i < 45; i++) {
    const speed = ((i % 3) + 1) * 65;
    const starY = (rand(i * 13) * h + t * speed) % h;
    const starX = rand(i * 7) * w;
    const size = (i % 3) * 0.8 + 1.2;
    const brightness = Math.sin(t * 3 + i) * 0.3 + 0.7;
    ctx.fillStyle =
      i % 5 === 0
        ? alpha("#22D3EE", brightness)
        : alpha("#FFFFFF", brightness * 0.8);
    ctx.beginPath();
    ctx.arc(starX, starY, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Distant Nebula Glow
  const nebX = w * 0.5 + Math.sin(t * 0.5) * 40;
  const nebY = h * 0.35 + Math.cos(t * 0.4) * 30;
  const nebGrad = ctx.createRadialGradient(nebX, nebY, 10, nebX, nebY, 160);
  nebGrad.addColorStop(0, alpha("#7C3AED", 0.25));
  nebGrad.addColorStop(0.5, alpha(accent, 0.15));
  nebGrad.addColorStop(1, "transparent");
  ctx.fillStyle = nebGrad;
  ctx.fillRect(0, 0, w, h);

  // Cyber Grid Ground / Horizon Lines
  ctx.save();
  ctx.strokeStyle = "rgba(34, 211, 238, 0.08)";
  ctx.lineWidth = 1;
  for (let gx = 0; gx < w; gx += 40) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, h);
    ctx.stroke();
  }
  ctx.restore();

  // ==================== ENEMY DRONES (TOP-MID) ====================
  for (let e = 0; e < 3; e++) {
    const ex = w * 0.25 * (e + 1) + Math.sin(t * 2 + e * 2) * 25;
    const ey = 220 + Math.cos(t * 2.5 + e) * 20 + (e % 2 === 1 ? 40 : 0);

    // Enemy Thruster Glow
    ctx.beginPath();
    ctx.arc(ex, ey - 8, 12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(244, 63, 94, 0.3)";
    ctx.fill();

    // Enemy Ship Body
    ctx.save();
    ctx.translate(ex, ey);
    ctx.fillStyle = "#E11D48";
    ctx.beginPath();
    ctx.moveTo(0, 16);
    ctx.lineTo(14, -10);
    ctx.lineTo(0, -4);
    ctx.lineTo(-14, -10);
    ctx.closePath();
    ctx.fill();

    // Enemy Core
    ctx.fillStyle = "#FDA4AF";
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Enemy Laser Beams
    const laserY = ey + ((t * 220 + e * 80) % 250);
    if (laserY < h - 250) {
      ctx.fillStyle = "#FB7185";
      ctx.shadowColor = "#E11D48";
      ctx.shadowBlur = 8;
      ctx.fillRect(ex - 1.5, laserY, 3, 14);
      ctx.shadowBlur = 0;
    }
  }

  // ==================== PLAYER LASER BLASTS ====================
  const playerX = w * 0.5 + Math.sin(t * 2.2) * 65;
  const playerY = h * 0.65;

  for (let b = 0; b < 4; b++) {
    const blastOffset = (t * 450 + b * 90) % (playerY - 120);
    const blastY = playerY - blastOffset;
    if (blastY > 140) {
      ctx.fillStyle = "#22D3EE";
      ctx.shadowColor = "#00E5FF";
      ctx.shadowBlur = 10;
      // Dual lasers
      ctx.fillRect(playerX - 16, blastY, 4, 18);
      ctx.fillRect(playerX + 12, blastY, 4, 18);
      ctx.shadowBlur = 0;
    }
  }

  // ==================== PLAYER STARFIGHTER ====================
  ctx.save();
  ctx.translate(playerX, playerY);
  const bankAngle = Math.cos(t * 2.2) * 0.15;
  ctx.rotate(bankAngle);

  // Engine Plasma Glow & Fire
  const fireLength = 22 + Math.sin(t * 18) * 8;
  const engineGrad = ctx.createLinearGradient(0, 18, 0, 18 + fireLength);
  engineGrad.addColorStop(0, "#22D3EE");
  engineGrad.addColorStop(0.5, accent);
  engineGrad.addColorStop(1, "transparent");

  ctx.fillStyle = engineGrad;
  ctx.beginPath();
  ctx.moveTo(-10, 18);
  ctx.lineTo(-6, 18 + fireLength);
  ctx.lineTo(-2, 18);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(2, 18);
  ctx.lineTo(6, 18 + fireLength);
  ctx.lineTo(10, 18);
  ctx.fill();

  // Main Ship Hull
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(0, -28); // Nose
  ctx.lineTo(16, 16);
  ctx.lineTo(6, 12);
  ctx.lineTo(0, 18);
  ctx.lineTo(-6, 12);
  ctx.lineTo(-16, 16);
  ctx.closePath();
  ctx.fill();

  // Wings (Cyan / Brand Blue Trim)
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.lineTo(32, 18);
  ctx.lineTo(24, 22);
  ctx.lineTo(12, 14);
  ctx.lineTo(0, -2);
  ctx.lineTo(-12, 14);
  ctx.lineTo(-24, 22);
  ctx.lineTo(-32, 18);
  ctx.closePath();
  ctx.fill();

  // Cockpit Canopy (Glowing Cyan Glass)
  const canopyGrad = ctx.createLinearGradient(0, -16, 0, 2);
  canopyGrad.addColorStop(0, "#A5F3FC");
  canopyGrad.addColorStop(1, "#0284C7");
  ctx.fillStyle = canopyGrad;
  ctx.beginPath();
  ctx.ellipse(0, -6, 5, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shield Dome pulse
  ctx.strokeStyle = "rgba(34, 211, 238, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 38 + Math.sin(t * 5) * 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();

  // ==================== HUD HEADER (TOP) ====================
  // Top Status Bar Scrim
  const hudGrad = ctx.createLinearGradient(0, 0, 0, 150);
  hudGrad.addColorStop(0, "rgba(5, 13, 24, 0.92)");
  hudGrad.addColorStop(1, "transparent");
  ctx.fillStyle = hudGrad;
  ctx.fillRect(0, 0, w, 150);

  // Time & Battery pill
  fillRR(ctx, 32, 38, 70, 26, 13, "rgba(255,255,255,0.08)");
  traceLabel(ctx, "9:41", 48, 55, 13, "#FFFFFF", 700);

  fillRR(ctx, w - 100, 38, 68, 26, 13, "rgba(255,255,255,0.08)");
  traceLabel(ctx, "60 FPS", w - 88, 55, 11, "#34D399", 700);

  // Level Badge
  fillRR(ctx, 32, 78, 100, 28, 8, alpha(accent, 0.25));
  ctx.strokeStyle = alpha("#60C7FF", 0.6);
  ctx.lineWidth = 1;
  ctx.stroke();
  traceLabel(ctx, "★ LEVEL 07", 44, 97, 12, "#E0F2FE", 800);

  // Score & Combo
  const scoreNum = 84250 + Math.floor(t * 320);
  ctx.textAlign = "right";
  traceLabel(ctx, "SCORE", w - 32, 86, 10, "rgba(255,255,255,0.45)", 700);
  traceLabel(ctx, scoreNum.toLocaleString(), w - 32, 108, 20, "#FFFFFF", 900);
  traceLabel(ctx, "x3 COMBO", w - 32, 126, 10, "#FBBF24", 800);
  ctx.textAlign = "left";

  // Health & Shield Bar (Left)
  fillRR(ctx, 32, 116, 150, 8, 4, "rgba(255,255,255,0.12)");
  const hpGrad = ctx.createLinearGradient(32, 0, 182, 0);
  hpGrad.addColorStop(0, "#10B981");
  hpGrad.addColorStop(1, "#34D399");
  fillRR(ctx, 32, 116, 150 * 0.82, 8, 4, hpGrad);

  // Energy / Special Bar
  fillRR(ctx, 32, 128, 150, 5, 2.5, "rgba(255,255,255,0.12)");
  const energyFill = 0.5 + Math.sin(t * 2) * 0.45;
  fillRR(ctx, 32, 128, 150 * energyFill, 5, 2.5, "#22D3EE");

  // ==================== ON-SCREEN GAME CONTROLS (BOTTOM) ====================
  // Virtual D-pad / Joystick (Bottom Left)
  const joyX = 90;
  const joyY = h - 110;
  ctx.beginPath();
  ctx.arc(joyX, joyY, 44, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Joystick Stick Thumb
  const thumbX = joyX + Math.sin(t * 2.2) * 16;
  const thumbY = joyY + Math.cos(t * 1.8) * 12;
  ctx.beginPath();
  ctx.arc(thumbX, thumbY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(34, 211, 238, 0.4)";
  ctx.fill();
  ctx.strokeStyle = "#22D3EE";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Action Buttons (Bottom Right)
  // Fire Button (Large)
  const fireX = w - 85;
  const fireY = h - 105;
  ctx.beginPath();
  ctx.arc(fireX, fireY, 32, 0, Math.PI * 2);
  const fireBtnGrad = ctx.createRadialGradient(
    fireX,
    fireY,
    5,
    fireX,
    fireY,
    32,
  );
  fireBtnGrad.addColorStop(0, alpha("#EF4444", 0.6));
  fireBtnGrad.addColorStop(1, alpha("#DC2626", 0.25));
  ctx.fillStyle = fireBtnGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(239, 68, 68, 0.6)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = "center";
  traceLabel(ctx, "FIRE", fireX, fireY + 5, 12, "#FFFFFF", 800);

  // Boost Button (Small)
  const boostX = w - 145;
  const boostY = h - 135;
  ctx.beginPath();
  ctx.arc(boostX, boostY, 22, 0, Math.PI * 2);
  ctx.fillStyle = alpha(accent, 0.4);
  ctx.fill();
  ctx.strokeStyle = alpha(accent, 0.8);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  traceLabel(ctx, "BOOST", boostX, boostY + 4, 9, "#E0F2FE", 700);

  // Game Engine Tag Banner (Bottom Center)
  fillRR(ctx, w * 0.5 - 75, h - 45, 150, 22, 11, "rgba(0,0,0,0.5)");
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.stroke();
  traceLabel(
    ctx,
    "GAME DEV • UNITY 6",
    w * 0.5,
    h - 30,
    9,
    "rgba(255,255,255,0.7)",
    700,
  );
  ctx.textAlign = "left";
};

/* ---------------------------------------------------------
   REGISTRY
--------------------------------------------------------- */

export const painters: Record<string, Painter> = {
  web: paintWeb,
  app: paintApp,
  game: paintGame,
  ai: paintAI,
  software: paintSoftware,
  marketing: paintMarketing,
  ecommerce: paintEcommerce,
};
