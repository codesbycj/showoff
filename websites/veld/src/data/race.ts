/**
 * Picking the next race, and saying how far away it is.
 *
 * Kept out of the component that renders it so that file exports components
 * and nothing else — a module that mixes the two opts the whole file out of
 * fast refresh, and this one is imported by two different bands.
 */
import { COUNTDOWN } from '@/motion/motion';

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

/** `DD:HH:MM:SS` remaining, or null once the target has passed. */
export function formatCountdown(target: Date | null, now = Date.now()): string | null {
  if (!target) return null;
  const ms = target.getTime() - now;
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  // Capped, so a date eleven months out does not render as a four-digit field
  // that changes the width of everything beside it.
  const days = Math.min(COUNTDOWN.maxDays, Math.floor(s / 86400));
  return [
    pad(days),
    pad(Math.floor(s / 3600) % 24),
    pad(Math.floor(s / 60) % 60),
    pad(s % 60),
  ].join(COUNTDOWN.separator);
}

/** The next race that has not started yet, or null once the season is over. */
export function nextRace<T extends { start: Date }>(races: readonly T[]): T | null {
  const now = Date.now();
  return races.find((r) => r.start.getTime() > now) ?? null;
}
