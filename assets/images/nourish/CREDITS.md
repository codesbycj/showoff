# nourish imagery

**None.** This showcase ships no image files.

Everything on the screen is drawn: the calorie arc and the three macro rings in
`react-native-svg` off `src/features/nourish/arc.ts`, the dock's four glyphs as
paths in `tab-glyph.tsx`, and the add button's plus. The two outline marks on
the Today cards come from Lucide, which is paths through the same renderer, so
no font file is involved there either.

The one face this showcase adds is Instrument Serif, for the greeting — see
`src/theme/fonts.ts`. It is a Google font under the SIL Open Font License,
installed as `@expo-google-fonts/instrument-serif`, and its licence travels with
the package.
