/**
 * Clove brand tokens, read off the reference board with
 * `python tools/preview/swatch.py ref/batch3/11.png --avg ...` rather than
 * guessed: the lime is #B0EC70 and the deep green is #15461A, both medians of
 * a flat region so the board's own soft shadow does not drag them.
 *
 * The reference is a design shot, so these are the palette and the voice —
 * not a dp scale. Sizes live in `layout.ts` and are chosen for a 393dp phone.
 */
export const ct = {
  /** The page. */
  lime: '#B0EC70',
  /** A second lime, for a surface that has to separate from the page. */
  limeSoft: '#C6F294',
  /** Ink on lime, and the fill of the primary control. */
  ink: '#15461A',
  inkSoft: 'rgba(21, 70, 26, 0.74)',
  inkFaint: 'rgba(21, 70, 26, 0.34)',
  onInk: '#FFFFFF',
  /** The card in the hero: the dark plastic of the app's own product. */
  card: '#0D1517',
  cardEdge: '#1E2A2B',
  white: '#FFFFFF',
} as const;

/**
 * One type scale for the screen. Each entry carries its own line height,
 * because a row is as tall as its text line and gaps measured off anything
 * else drift down the screen.
 */
export const type = {
  display: { size: 38, line: 44, weight: 'Inter_500Medium' as const, track: -1.1 },
  body: { size: 14.5, line: 21, weight: 'Inter_400Regular' as const, track: 0 },
  button: { size: 16, line: 22, weight: 'Inter_600SemiBold' as const, track: -0.1 },
  foot: { size: 13, line: 18, weight: 'Inter_400Regular' as const, track: 0 },
  footStrong: { size: 13, line: 18, weight: 'Inter_600SemiBold' as const, track: 0 },
  cardLabel: { size: 11, line: 14, weight: 'Inter_500Medium' as const, track: 0.3 },
  cardFigure: { size: 25, line: 30, weight: 'Inter_600SemiBold' as const, track: -0.6 },
  cardDigits: { size: 13, line: 17, weight: 'Inter_500Medium' as const, track: 1.6 },
} as const;

export const radius = {
  button: 28,
  card: 22,
  mark: 9,
} as const;
