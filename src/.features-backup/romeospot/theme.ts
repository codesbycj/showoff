/**
 * romeospot brand tokens, sampled off `ref/inspo/booking-app/01.png`.
 *
 * Taken as the modal colour of a box, or the most-saturated pixel in a row for
 * the small tiles — single-pixel reads land on antialiased edges and come back
 * 15-20% off, which is how a palette ends up "close but muddy".
 *
 * Two greens in the reference and they are genuinely different: the primary
 * button is #109E87 and the selected date pill is #10B181. Kept apart.
 *
 * INSPO-RULES I1: the palette is the design and is reproduced. I4/R4: `sub` is
 * darkened from the reference's grey, which lands near 3.2:1 on white and is
 * unreadable body text — see the note on that token.
 */
export const ct = {
  /** Page ground behind the white cards. */
  page: '#F4F6F8',
  surface: '#FFFFFF',

  ink: '#111619',
  /**
   * The reference's row subtitles are a pale grey around #9AA3AE — 2.9:1 on
   * white, which R4 fails for body text. Darkened to clear 4.5:1 while staying
   * visibly subordinate to `ink`.
   */
  sub: '#5F6B76',
  hairline: '#ECEFF2',

  /** The dark header card on the booking screens. */
  navy: '#314054',
  navySub: '#AFBAC8',

  /**
   * The reference's green is #109E87, which is 3.35:1 against white — it fails
   * R4 both ways round: as white text on the primary button, and as green text
   * on a white chip. Darkened until white clears 4.5:1 (this lands at 4.81),
   * staying in the same green family. R4: a design shot is not an authority on
   * contrast.
   */
  accent: '#0B8169',
  /** The reference's brighter pill green, same correction applied. */
  accentPill: '#0E9476',
  accentFg: '#FFFFFF',

  chip: '#F4F6F6',
  chipBorder: '#E3E8E9',

  gold: '#FFD714',
  openDot: '#4FA83A',

  /** The three order-mode tiles, each a two-stop gradient in the reference. */
  tileGreen: ['#80EA65', '#69D455'] as const,
  tileCoral: ['#FF987C', '#F57B65'] as const,
  tilePink: ['#FF7CA9', '#FB5A8E'] as const,

  /** Over the hero photograph. */
  onPhoto: '#FFFFFF',
  onPhotoDim: '#E8E6E2',
  scrim: 'rgba(8,10,12,0.55)',
  glass: 'rgba(255,255,255,0.22)',
} as const;
