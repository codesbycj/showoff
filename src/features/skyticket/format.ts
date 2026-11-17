/**
 * Clock arithmetic for the Skylark screens.
 *
 * **R9: the picture agrees with the numbers.** The board prints a 07:47
 * departure, a 7h 15m flight and a 14:30 arrival on one card — six hours and
 * forty-three minutes apart — and on the boarding pass it prints 01:30 AM for
 * both ends of the same flight. Every arrival here is computed from the
 * departure, the duration and the destination's offset, so the three can never
 * disagree again.
 */

/** Minutes past midnight -> "07:45". */
export function clock(minutes: number) {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** Minutes -> "8h 05m". */
export function duration(minutes: number) {
  const m = Math.max(0, Math.round(minutes));
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
}

/** Local arrival clock: departure + flight time + the destination's offset. */
export function arrival(departMin: number, durationMin: number, offsetMin: number) {
  return clock(departMin + durationMin + offsetMin);
}
