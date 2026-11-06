/**
 * Nudge brand tokens, read off ref/batch3/21.png.
 *
 * A white page with one red doing every urgent thing — the day marker, the
 * "Reschedule" link, the "New" control and the raised add button — and two
 * quiet accents on the task badges.
 *
 * Three of these are darker than the board's. The reference's grey reads
 * 2.74:1 on white, its red 4.20:1 and its amber 3.98:1 on its own wash, and
 * every string set in them is 12-14dp. R4 puts the floor at 4.5:1 and says
 * to fix the reference rather than copy it.
 */
export const ct = {
  page: '#FFFFFF',
  ink: '#111115',
  muted: '#73757E',
  faint: '#6B6D76',
  hairline: '#ECEDF1',
  card: '#FFFFFF',
  shade: '#F4F5F7',

  red: '#CE2A24',
  onRed: '#FFFFFF',
  amber: '#8E5209',
  amberWash: '#FDF3E2',
  purple: '#8B3FD4',
  blue: '#2F6BE8',
  flame: '#F0862A',
} as const;

export const type = {
  hello: { size: 19, line: 25, weight: 'Inter_400Regular' as const, track: -0.4 },
  helloName: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.4 },
  streak: { size: 15, line: 20, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  habit: { size: 13, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  section: { size: 17, line: 23, weight: 'Inter_700Bold' as const, track: -0.4 },
  dayNum: { size: 13.5, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  dayLetter: { size: 12.5, line: 17, weight: 'Inter_600SemiBold' as const, track: 0 },
  taskTitle: { size: 15.5, line: 21, weight: 'Inter_600SemiBold' as const, track: -0.2 },
  taskTime: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  chip: { size: 12, line: 16, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  link: { size: 13, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  badge: { size: 12, line: 16, weight: 'Inter_700Bold' as const, track: 0 },
} as const;

export const radius = { habit: 18, card: 18, chip: 9, day: 18 } as const;
