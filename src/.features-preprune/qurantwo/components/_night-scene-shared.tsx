
export type GroundProps = { width: number; height: number };

/** The arch's outline, as a path in a 0..w / 0..h box. */
export function archPath(w: number, h: number, inset: number) {
  const l = inset;
  const r = w - inset;
  const t = inset;
  const b = h - inset;
  const peak = t;
  const shoulder = t + (b - t) * 0.34;
  const foot = b - (b - t) * 0.06;
  return `M${w / 2} ${peak}
          C${r} ${shoulder * 0.86} ${r} ${shoulder} ${r} ${shoulder + (b - t) * 0.06}
          L${r} ${foot}
          C${r} ${b} ${r * 0.94} ${b} ${r - (r - l) * 0.08} ${b}
          L${l + (r - l) * 0.08} ${b}
          C${l} ${b} ${l} ${b} ${l} ${foot}
          L${l} ${shoulder + (b - t) * 0.06}
          C${l} ${shoulder} ${l} ${shoulder * 0.86} ${w / 2} ${peak} Z`;
}

export type SceneProps = { width: number; height: number };
