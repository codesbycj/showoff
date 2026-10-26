/**
 * Everything the language picker says, so the components stay presentational.
 *
 * **The selected language is state, not a flag in the data.** The reference
 * shows Italian lit; here `larkpick` holds which row is chosen so the list
 * answers a tap, which is the whole point of the screen.
 *
 * Each entry names a drawn flag rather than an emoji one. Flags are the one
 * glyph that differs hardest across platforms - Windows has none of them at
 * all - so they are built out of bands and shapes (AGENTS.md, "Draw small
 * brand glyphs rather than relying on emoji ... flags in particular").
 */

export const copy = {
  headline: ['What language do', 'you want to learn?'],
  action: 'Continue',
} as const;

export const languages = [
  { id: 'fr', label: 'French', flag: 'fr' },
  { id: 'it', label: 'Italian', flag: 'it' },
  { id: 'es', label: 'Spanish', flag: 'es' },
  { id: 'cn', label: 'Chinese', flag: 'cn' },
  { id: 'kr', label: 'Korean', flag: 'kr' },
  { id: 'de', label: 'German', flag: 'de' },
  { id: 'jp', label: 'Japanese', flag: 'jp' },
] as const;

/** Which row the screen opens on. */
export const initial = 'it';
