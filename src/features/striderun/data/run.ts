/**
 * Everything striderun says.
 *
 * **R9: the pace is computed from the duration and the distance**, not typed
 * beside them - 18:26 over 3.84 km is 4:48 a kilometre, and if either number
 * moves the pace moves with it.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const session = {
  state: 'RUN · RECORDING',
  durationLabel: 'DURATION',
  /** Seconds elapsed. */
  seconds: 18 * 60 + 26,
  /** Kilometres covered. */
  km: 3.84,
  bpm: 156,
  zone: 'Z4',
  calories: 312,
};

export type Stat = { id: string; label: string; value: string; tag?: string };

/** Minutes and seconds, zero-padded: "4:48". */
export function clock(totalSeconds: number) {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** The elapsed time as mm:ss. */
export function elapsed() {
  return clock(session.seconds);
}

/**
 * Seconds per kilometre, guarded against a distance of zero - the reveal can
 * leave this screen mid-build and a divide by zero is `Infinity`, which
 * formats as nonsense rather than throwing (I7).
 */
export function pace() {
  return clock(session.seconds / Math.max(session.km, 0.01));
}

export const EFFORT_ZONES = 5;
/** Which zone the athlete is in, 1-based. */
export const EFFORT_AT = 4;
export const effortLabel = 'THRESHOLD';

export type Split = { id: string; km: string; pace: string; seconds: number; best?: boolean };

/**
 * The per-kilometre splits.
 *
 * **Added, not copied.** The board's recording screen carries nothing between
 * its stats and its controls, which at 393dp leaves 84dp of dead canvas at the
 * foot and a 76dp hole above it - R1 fails both, and I3 says the fix is the
 * row the board cropped, never a spacer.
 */
export const splits: Split[] = [
  { id: 'k1', km: 'KM 1', pace: '4:52', seconds: 292 },
  // STEP 1.17 k2
  // { id: 'k2', km: 'KM 2', pace: '4:49', seconds: 289 },
  // STEP 1.18 k3
  // { id: 'k3', km: 'KM 3', pace: '4:44', seconds: 284, best: true },
  // STEP 1.19 k4
  // { id: 'k4', km: 'KM 4', pace: '4:47', seconds: 287 },
];

/**
 * A split's bar width as a percentage.
 *
 * Mapped onto 40-100% of the strip rather than onto zero, because four splits
 * within eight seconds of each other are four identical bars on an absolute
 * scale — the picture has to show the difference it claims (R9). Longer is
 * still slower, and the range is clamped so an empty or single-entry list
 * cannot divide by zero (I7).
 */
export function splitWidth(rows: Split[], seconds: number) {
  const all = rows.map((row) => row.seconds);
  const fastest = Math.min(...all, seconds);
  const slowest = Math.max(...all, seconds);
  const span = Math.max(slowest - fastest, 1);
  return 40 + Math.round(((seconds - fastest) / span) * 60);
}

export type Control = { id: string; label: string; glyph: 'lap' | 'pause' | 'map' };

export const controls: Control[] = [
  { id: 'lap', label: 'LAP', glyph: 'lap' },
  // STEP 1.25 "Pause"
  // { id: 'pause', label: 'Pause', glyph: 'pause' },
  // STEP 1.26 "Map"
  // { id: 'map', label: 'Map', glyph: 'map' },
];
