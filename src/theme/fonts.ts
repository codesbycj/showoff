/**
 * Inter for UI text, standing in for whichever proprietary face a showcase uses.
 * Caveat for handwriting, where a design shows written notes. DM Sans stands in
 * for Alta's grotesque: its tail-less `a` and horizontally cut terminals are the
 * two features Inter gets wrong, and at matched cap height it runs 2% narrower
 * than the reference rather than the usual 10-15% wider.
 *
 * Space Grotesk is not a substitute either — Red Brew's spec names it outright
 * for display and Google Fonts carries it. It tops out at 700, and the brand
 * lockup asks for 900; the wordmark is therefore set in Bold and tracked in.
 *
 * Plus Jakarta Sans stands in for Affirm's face. It was picked by measurement,
 * not by eye: at matched cap height its ink width lands within 0.4% of the
 * reference on "Pay off", "your plans" and "Explore without signing in", where
 * Inter runs 3-4% wide and DM Sans 2-6%. It also has the two letterforms that
 * identify the original — a double-storey `a` with no spur, and a `y` with a
 * straight diagonal tail cut square.
 *
 * Outfit stands in for Bumble's geometric sans. The letterform that decides it
 * is the single-storey `a` — a circle with a plain stem, which Inter, Plus
 * Jakarta and Figtree all draw double-storey — and among the geometric faces
 * that have it, Outfit is the only one that also matches the widths: +1.7% at
 * matched cap height on "Time to put a face to the" and "Put your best photo",
 * against +5% for Jost and +15% for Poppins and Lexend.
 *
 * IBM Plex Mono stands in for SF Mono in GitHub's diff view. Monospace faces all
 * share a 0.6em advance, so the one that separates them is cap height against
 * that advance: the reference measures 1.146, and Plex Mono's 1.163 is closer
 * than JetBrains Mono's 1.217 or Roboto Mono's 1.185.
 *
 * FlexRounded stands in for SF Pro Rounded, which Jomo sets all of its copy in.
 * It is Google Sans Flex cut to static files at ROND 100, wdth 100, opsz 18
 * (see assets/fonts/flex-rounded) — renamed, since the upstream notice
 * keeps "Google" out of derived names. SF Pro Rounded shares SF Pro's widths, so
 * the rounded faces that exist as plain families all miss: Nunito, Rubik, Varela
 * Round and M PLUS Rounded run 5-13% off on "12min". FlexRounded 600 lands within
 * 2.3% there, and within 0.7% on "Today", "Screen time" and "Thanks for helping
 * me", closer than Inter; only its digits run ~7% narrow, which tracking absorbs.
 * Its Bold is cut at 660, not 700: SF Pro Rounded Bold measures 0.200-0.209 stem
 * to cap on Jomo's large glyphs, and FlexRounded reaches that at 660 (700: 0.215).
 *
 * Anton stands in for Fixtured's compressed display face. Nothing free is as
 * narrow as the reference — that family is a Druk-style ultra-compressed — so
 * this is the one place the substitute is chosen on weight and colour rather
 * than width: Anton matches the solid black mass and tight sidebearings, and
 * runs about 12% wider at matched cap height. Headlines are therefore set a
 * size smaller than measured and tracked in slightly.
 *
 * Titillium Web is not a substitute at all — it is the family Formula 1 sets its
 * own site in, and Google Fonts carries it. So the UI text matches outright. Its
 * Black stands in for Formula1 Display on the headings: squarer and heavier than
 * the Bold, with the flat-sided bowls the real display face has, though it keeps
 * a little more curve in the C and S.
 *
 * Saira stands in for MacroFactor's display face, which is a Eurostile-style
 * square grotesque — wide, heavy, with flat-sided bowls and a splayed M. Nothing
 * free is that square at that width: Michroma has the shapes but only a 400,
 * Chakra Petch has the width but chamfers every corner, and Titillium runs too
 * narrow. Saira's Bold keeps the squared-off round forms and the straight-legged
 * R, and is tracked out to reach the reference's width.
 *
 * Fashora needs no substitute either: its spec names Plus Jakarta Sans for all
 * eleven of its type styles, down to the 800 weight its promo headline is set
 * in, and the family is already here. Only its icon subset is new.
 *
 * Mindful Pop needs no substitute at all: its spec names Plus Jakarta Sans for
 * every one of its nine type styles, and Google Fonts carries the family. It is
 * already here for Affirm, so the showcase adds no text face — only its icons.
 *
 * PesseSymbols, KineticSymbols, RedbrewSymbols, MindfulSymbols,
 * AuralegalSymbols, VoltSymbols, TravelexaSymbols and FashoraSymbols are not text
 * faces at all — each is Material
 * Symbols Outlined, the icon set both designs draw every glyph from, cut down
 * to the icons that one showcase uses (see tools/subset-symbols.py). The full
 * 400 face is 944KB; Pesse's subset is 11.5KB and Kinetic's 9.8KB. Both are
 * addressed by codepoint rather than by Material's ligature names, because a
 * ligature that fails to shape renders the literal word `notifications` and the
 * web harness cannot see that.
 *
 * Instrument Serif Italic is Voyago's accent face, set on exactly three words
 * across the showcase -- "with us!", "for you" and "Ticket". Two of that
 * export's three screens name it outright; the third names Playfair Display,
 * and was unified onto this one. Only the italic is registered, because the
 * upright is never used.
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
 */
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Caveat_600SemiBold } from '@expo-google-fonts/caveat/600SemiBold';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans/500Medium';
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold';
import { Outfit_400Regular } from '@expo-google-fonts/outfit/400Regular';
import { Outfit_500Medium } from '@expo-google-fonts/outfit/500Medium';
import { Outfit_600SemiBold } from '@expo-google-fonts/outfit/600SemiBold';
import { Outfit_700Bold } from '@expo-google-fonts/outfit/700Bold';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono/400Regular';
import { IBMPlexMono_600SemiBold } from '@expo-google-fonts/ibm-plex-mono/600SemiBold';
import { Anton_400Regular } from '@expo-google-fonts/anton/400Regular';
import { Saira_600SemiBold } from '@expo-google-fonts/saira/600SemiBold';
import { Saira_700Bold } from '@expo-google-fonts/saira/700Bold';
import { TitilliumWeb_400Regular } from '@expo-google-fonts/titillium-web/400Regular';
import { TitilliumWeb_600SemiBold } from '@expo-google-fonts/titillium-web/600SemiBold';
import { TitilliumWeb_700Bold } from '@expo-google-fonts/titillium-web/700Bold';
import { TitilliumWeb_900Black } from '@expo-google-fonts/titillium-web/900Black';
import { SpaceGrotesk_500Medium } from '@expo-google-fonts/space-grotesk/500Medium';
import { SpaceGrotesk_600SemiBold } from '@expo-google-fonts/space-grotesk/600SemiBold';
import { SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk/700Bold';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans/800ExtraBold';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif/400Regular_Italic';

export const fontMap = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Caveat_600SemiBold,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  IBMPlexMono_400Regular,
  IBMPlexMono_600SemiBold,
  Anton_400Regular,
  Saira_600SemiBold,
  Saira_700Bold,
  TitilliumWeb_400Regular,
  TitilliumWeb_600SemiBold,
  TitilliumWeb_700Bold,
  TitilliumWeb_900Black,
  PlusJakartaSans_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  PlusJakartaSans_800ExtraBold,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  InstrumentSerif_400Regular_Italic,
  FlexRounded_400Regular: require('../../assets/fonts/flex-rounded/FlexRounded_400Regular.ttf'),
  FlexRounded_500Medium: require('../../assets/fonts/flex-rounded/FlexRounded_500Medium.ttf'),
  FlexRounded_600SemiBold: require('../../assets/fonts/flex-rounded/FlexRounded_600SemiBold.ttf'),
  FlexRounded_660Bold: require('../../assets/fonts/flex-rounded/FlexRounded_660Bold.ttf'),
  PesseSymbols_400Regular: require('../../assets/fonts/pesse-symbols/PesseSymbols_400Regular.ttf'),
  KineticSymbols_400Regular: require('../../assets/fonts/kinetic-symbols/KineticSymbols_400Regular.ttf'),
  RedbrewSymbols_400Regular: require('../../assets/fonts/redbrew-symbols/RedbrewSymbols_400Regular.ttf'),
  MindfulSymbols_400Regular: require('../../assets/fonts/mindful-symbols/MindfulSymbols_400Regular.ttf'),
  AuralegalSymbols_400Regular: require('../../assets/fonts/auralegal-symbols/AuralegalSymbols_400Regular.ttf'),
  VoltSymbols_400Regular: require('../../assets/fonts/volt-symbols/VoltSymbols_400Regular.ttf'),
  TravelexaSymbols_400Regular: require('../../assets/fonts/travelexa-symbols/TravelexaSymbols_400Regular.ttf'),
  FashoraSymbols_400Regular: require('../../assets/fonts/fashora-symbols/FashoraSymbols_400Regular.ttf'),
};

export const hasCustomFonts = Object.keys(fontMap).length > 0;
