/**
 * Everything the tickets screen says, so the components stay presentational.
 *
 * **The reference's own numbers do not agree and these do.** It prints a
 * departure of 8:15, an arrival of 18:15 and a duration of "1hr 30m" on the
 * same ticket, three times over. Here the duration is computed from the two
 * times, so a ticket cannot say something the clock does not.
 */

function minutes(t: string) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function duration(from: string, to: string) {
  const d = minutes(to) - minutes(from);
  const h = Math.floor(d / 60);
  const m = d % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export const copy = {
  brand: 'Rova',
  display: ['Travel far,', 'booking now.'],
  timer: 'Reserve your seat within',
  countdown: '39:54',
  footTitle: ['Find your ticket,', 'discover the city'],
  footBlurb: 'It is about the stories you bring home.',
} as const;

const raw = [
  {
    id: 't1',
    from: 'DAC',
    to: 'KCB',
    out: '08:15',
    back: '14:45',
    date: '16 June 2025',
    tone: 'rose',
  },
  {
    id: 't2',
    from: 'DAC',
    to: 'KCB',
    out: '09:40',
    back: '16:10',
    date: '16 June 2025',
    tone: 'violet',
  },
  {
    id: 't3',
    from: 'DAC',
    to: 'KCB',
    out: '11:05',
    back: '17:35',
    date: '16 June 2025',
    tone: 'butter',
  },
] as const;

export const tickets = raw.map((t) => ({ ...t, dur: duration(t.out, t.back) }));

export const strip = 'Terminal C1 · Seat B12 · Gate A';

export const dock = [
  { id: 'home', label: 'Home', on: true },
  { id: 'explore', label: 'Explore', on: false },
  { id: 'saved', label: 'Saved', on: false },
  { id: 'settings', label: 'Settings', on: false },
] as const;
