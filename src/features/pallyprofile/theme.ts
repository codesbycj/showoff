/**
 * Pally brand tokens.
 *
 * The screen is a photograph of sky with a white page under it, so the only
 * colours that matter are the chip tints and the one blue the dock uses.
 * Each chip's ink is darkened from the reference's until it clears 4.5:1 on
 * its own fill — at the board's values several of them sit near 2:1.
 */
export const ct = {
  page: '#FFFFFF',
  ink: '#0B0B0D',
  muted: '#62626A',
  hairline: '#ECECEF',
  onPhoto: '#FFFFFF',
  blue: '#1E6DF0',
  dock: '#F3F3F5',
} as const;

export const chipTints = [
  { bg: '#F3E8FF', ink: '#6B21A8' },
  { bg: '#FFEDD5', ink: '#9A4B06' },
  { bg: '#E0EDFF', ink: '#1D4FAE' },
  { bg: '#FFE4E9', ink: '#A3123C' },
] as const;

export const type = {
  screenTitle: { size: 18, line: 24, weight: 'Inter_700Bold' as const, track: -0.4 },
  name: { size: 32, line: 40, weight: 'Inter_700Bold' as const, track: -1.1 },
  stat: { size: 15, line: 20, weight: 'Inter_500Medium' as const, track: -0.2 },
  statStrong: { size: 15, line: 20, weight: 'Inter_700Bold' as const, track: -0.2 },
  bio: { size: 13.5, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
  chip: { size: 13, line: 17, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  section: { size: 19, line: 25, weight: 'Inter_700Bold' as const, track: -0.5 },
  sectionNote: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: -0.1 },
} as const;

export const radius = { chip: 16, disc: 22, memory: 20 } as const;
