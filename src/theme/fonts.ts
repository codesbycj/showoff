/**
 * The baseline faces, and nothing else.
 *
 * These three families are the ones `src/global.css` names, so they are what
 * the shared primitives in `src/components/ui` resolve against:
 *
 *   --font-sans / -medium / -semibold / -bold   Inter
 *   --font-hand                                 Caveat
 *   --font-mono                                 IBM Plex Mono
 *
 * Inter is the default UI face — the stand-in for whichever proprietary
 * typeface a showcase's reference actually uses, until that showcase picks a
 * closer substitute of its own.
 *
 * **A showcase adds its faces here and takes them away again when it is
 * wiped.** Everything beyond the three above is per-showcase and belongs to
 * the showcase, not to the repo.
 *
 * Adding a face here drifts every other showcase's lock, since each one tracks
 * this file. Re-lock them after touching it.
 *
 * React Native resolves weights by family name, not by numeric weight, so each
 * face is registered separately and mapped to its own utility in
 * tailwind.config.js (font-sans, font-sans-medium, ...).
 *
 * Import each face by subpath. The package barrel (`@expo-google-fonts/inter`)
 * eagerly requires all 18 weights, which Metro then ships as 18 assets — about
 * 6MB the device has to pull before first paint.
 *
 * Two traps worth keeping in mind when a showcase cuts its own icon subset:
 *
 *   * Android resolves a face by the family name *inside the file*, not by the
 *     key used here. Two subsets that both still call themselves "Material
 *     Symbols Outlined" collide, and the second renders out of the first one's
 *     glyph set — invisible on web, which gives every `useFonts` key its own
 *     `@font-face`. `tools/subset-symbols.py` rewrites name IDs 1/3/4/6/16 per
 *     showcase so the name is unique by construction.
 *   * Never gate first paint on font loading without a timeout. A stalled font
 *     request over a LAN dev server never rejects, so the app hangs on the
 *     splash forever. See `use-app-fonts.ts`.
 */
import { Caveat_600SemiBold } from '@expo-google-fonts/caveat/600SemiBold';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono/400Regular';
import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif/400Regular';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans/800ExtraBold';
import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_500Medium } from '@expo-google-fonts/poppins/500Medium';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold } from '@expo-google-fonts/poppins/700Bold';

export const fontMap = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Caveat_600SemiBold,
  IBMPlexMono_400Regular,

  // The geometric-sans voice: a single-storey `a` and `g`, which Poppins
  // matches to within 2% of its width-to-cap ratio (Outfit, the other
  // candidate, runs 12% narrow for its height). Most of the current board
  // uses it.
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,

  // Plus Jakarta Sans, named outright by several of these designs, so there
  // is no substitute to fit. The quiz board sets all five of these weights;
  // 800 is what its wordmark and its section headings are.
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,

  // nourish - Instrument Serif for the one serif line on its home screen,
  // "Great job today". The reference sets that greeting in a high-contrast
  // serif against an otherwise sans UI, and that contrast is the whole
  // personality of the design; substituting a sans would lose it. One weight,
  // no italic. Its body face is Plus Jakarta Sans, already above.
  InstrumentSerif_400Regular,
};

export const hasCustomFonts = Object.keys(fontMap).length > 0;
