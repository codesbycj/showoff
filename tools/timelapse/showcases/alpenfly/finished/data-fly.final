/**
 * Everything alpenfly says.
 *
 * **Three of the board's own mistakes are fixed here** (I1):
 *
 *   * its date strip reads S13 M14 T15 W16 T16 — the same number twice;
 *   * its search card says "Searching…" *and* "14 Tickets found", which cannot
 *     both be true, so the search has resolved;
 *   * its airline and airport names are real, and are invented here.
 *
 * **R9: the result count is the list's own length** and the arrival clock is
 * the departure plus the block time.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export type Mode = { id: string; label: string; on?: boolean };

export const modes: Mode[] = [
  { id: 'one', label: 'One way', on: true },
  { id: 'round', label: 'Round trip' },
];

export const route = {
  fromCode: 'ZRH',
  fromCity: 'Zurich',
  toCode: 'SZG',
  toCity: 'Salzburg',
  image: require('../../../../assets/images/alpenfly/route.jpg'),
  change: 'Change',
};

export type Filter = { id: string; label: string; glyph: 'calendar' | 'month' | 'party' };

export const filters: Filter[] = [
  { id: 'when', label: 'Today', glyph: 'calendar' },
  { id: 'month', label: 'February 2026', glyph: 'month' },
  { id: 'party', label: '8 / 10 seats', glyph: 'party' },
];

export const MONTH_FIRST = 13;
export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const PICKED = 14;

export type Day = { id: string; label: string; date: number; on: boolean };

/** Generated from `MONTH_FIRST`, so no number can appear twice (R9). */
export const days: Day[] = WEEKDAYS.map((label, i) => ({
  id: `d${MONTH_FIRST + i}`,
  label,
  date: MONTH_FIRST + i,
  on: MONTH_FIRST + i === PICKED,
}));

export type Ticket = {
  id: string;
  airline: string;
  departMin: number;
  durationMin: number;
  seats: string;
  terminal: string;
  gate: string;
  /** Only the first fare is the cheapest; declared, not inferred. */
  best?: boolean;
};

export const tickets: Ticket[] = [
  {
    id: 'alpen-1',
    airline: 'Alpenroute',
    departMin: 16 * 60 + 30,
    durationMin: 70,
    seats: '18B, 19A',
    terminal: 'Y4',
    gate: '8',
    best: true,
  },
  {
    id: 'alpen-2',
    airline: 'Alpenroute',
    departMin: 19 * 60 + 15,
    durationMin: 75,
    seats: '11C, 11D',
    terminal: 'Y2',
    gate: '3',
  },
];

export const labels = { found: 'tickets found' };

/** Minutes past midnight -> "16:30". */
export function clock(minutes: number) {
  const m = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** "1h 10m" from minutes. */
export function duration(minutes: number) {
  const m = Math.max(0, Math.round(minutes));
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
}

/** The arrival clock: departure plus block time, same zone (R9). */
export function arrival(ticket: Ticket) {
  return clock(ticket.departMin + ticket.durationMin);
}
