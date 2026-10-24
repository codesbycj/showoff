/**
 * Hook — the camera screen, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other screen — each owns its theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 */

export const hk = {
  /** Behind the photograph, for the frame a short phone leaves. */
  canvas: '#0d0d0f',

  ink: '#ffffff',
  /** The glass discs that float on the picture. */
  glass: 'rgba(20,20,22,0.52)',

  /** The promo sticker. */
  sticker: '#6b3df0',
  stickerZag: '#8f6bf6',
  stickerInk: '#ffffff',
  stickerAccent: '#ffe14d',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "HOOK A BRO!". */
  sticker: { size: 13, line: 16, tracking: -0.3, family: 'Poppins_700Bold' },
  /** "GET MORE HP!", the italic line under it. */
  stickerSub: { size: 12, line: 15, tracking: -0.2, family: 'Poppins_700Bold' },

  /** "Shout hello to the world!". */
  caption: { size: 26, line: 32, tracking: -0.8, family: 'Poppins_700Bold' },

  /** "Riobill Clark". */
  author: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  pill: 999,
  full: 999,
} as const;
