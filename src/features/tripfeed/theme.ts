/**
 * Trip brand tokens, read off ref/batch3/25.png.
 *
 * A pale grey page with white cards and one blue for the trip names and the
 * active tab. The blue is darkened from the board's: a 13dp link on white at
 * the reference's value reads under 4.5:1.
 */
export const ct = {
  page: '#F1F2F4',
  card: '#FFFFFF',
  ink: '#121318',
  muted: '#64666E',
  faint: '#6B6D75',
  hairline: '#E7E8EC',
  blue: '#1668DA',
  like: '#E8402A',
} as const;

export const type = {
  name: { size: 15.5, line: 21, weight: 'Inter_700Bold' as const, track: -0.3 },
  action: { size: 13.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  actionLink: { size: 13.5, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  story: { size: 12.5, line: 17, weight: 'Inter_500Medium' as const, track: -0.1 },
  count: { size: 13, line: 18, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  when: { size: 12.5, line: 17, weight: 'Inter_400Regular' as const, track: -0.1 },
} as const;

export const radius = { card: 22, photo: 16, story: 18, disc: 22 } as const;
