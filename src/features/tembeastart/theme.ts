/**
 * Tembea — the sign-in screen.
 *
 * The reference is a **design shot** — a photograph of a phone held in a hand
 * — so this is an inspo brief and rule 1 is off (AGENTS.md, "Three kinds of
 * reference"). The palette, the two-tone headline and the order of the blocks
 * are taken from it; every size is chosen for a real 393dp screen.
 *
 * One showcase per screen, so this carries its own theme, layout, insets and
 * text primitive rather than sharing another showcase's.
 *
 * Tembea is Swahili for "to travel". The brand is invented, as are the six
 * places on the tags — the reference repeats one placeholder name eight times,
 * which is a thing to fix rather than copy.
 */

export const tb = {
  /** The page under the panel. */
  canvas: '#141414',
  /** The panel the headline sits on. */
  green: '#6FE12B',
  /** The second half of the headline, and the ink on green. */
  deep: '#14401A',

  ink: '#ffffff',
  muted: 'rgba(255, 255, 255, 0.55)',

  /** The back control, which is the panel with a hole in it. */
  scrim: 'rgba(255, 255, 255, 0.28)',

  /** The buttons. Apple is the one in brand green; the others are raised ink. */
  raise: '#232323',
  onRaise: '#ffffff',
  onGreen: '#14401A',

  /** The tags. Most are white; two carry an accent so the throw is not flat. */
  tag: '#ffffff',
  tagInk: '#141414',
  tagMuted: 'rgba(20, 20, 20, 0.5)',
  tagMint: '#C9F7A8',
  tagPink: '#FF6FD8',
  onPink: '#2A0A22',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /**
   * "Your journey / starts / now." Plus Jakarta Sans 800 is the closest free
   * face to the reference's: a tight grotesk with a near-square bowl, set
   * here at 48/46 so the leading is shorter than the point size the way the
   * reference's is.
   */
  display: { size: 48, line: 46, tracking: -1.7, family: 'PlusJakartaSans_800ExtraBold' },

  /** "Mirama Ranch" on a tag. */
  tag: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "#Most visited" under it. */
  tagSub: { size: 10.5, line: 13, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Continue with Apple". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Already have an account?" */
  foot: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  footLink: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  panel: 30,
  button: 999,
  tag: 999,
  thumb: 8,
} as const;

/**
 * The shadow under a tag.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check (AGENTS.md).
 */
export const shadow = {
  tag: {
    shadowColor: '#0B2A06',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },
} as const;
