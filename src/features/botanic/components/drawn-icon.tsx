import Svg, { Path } from 'react-native-svg';

import { bt } from '../theme';

/**
 * The three glyphs the subset cannot supply, drawn from their own paths.
 *
 * `@expo-google-fonts/material-symbols-outlined` ships seven *static* weights
 * and no `fvar` table, so there is no FILL axis: every glyph in the cut is the
 * outlined one. The export loads the variable face from Google's CDN with the
 * axis open and sets `font-variation-settings: 'FILL' 1` on two icons — the
 * brand tag's leaf and the four rating stars — which the static face simply
 * does not contain.
 *
 * Cutting a second subset for them is the trap, not the fix: two faces trimmed
 * from one source file both keep the family name written *inside* the file,
 * Android resolves a face by that name rather than by its `useFonts` key, and
 * the second renders tofu — invisible on web, which gives every key its own
 * `@font-face`. So the authoritative paths are inlined instead, from
 * `fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/<name>/fill1/24px.svg`.
 *
 * They come back on a `0 -960 960 960` viewBox and keep it. Renumbering to
 * `0 0 24 24` puts the glyph off-box.
 *
 * `favorite` is here for the same reason even though the resting screen draws
 * it outlined: the export's script flips it to FILL 1 on tap, so the filled
 * path is what the toggle needs.
 */
export type DrawnName = 'spa' | 'star' | 'favorite';

const PATHS: Record<DrawnName, string> = {
  spa:
    'M480-80q-94-12-168-48t-125.5-94Q135-280 108-356.5T81-526q110 11 186 40t123.5 82Q438-351 ' +
    '459-271.5T480-80Zm0-337q-23-35-62.5-69T326-548q6-42 20-87t34-88.5q20-43.5 45.5-83.5t54.5-73' +
    'q29 33 54.5 73t45.5 83.5q20 43.5 34 88.5t20 87q-52 27-91.5 61T480-417Zm80 321q-2-70-10.5-129.5' +
    'T523-338q47-81 129.5-132T879-526q1 158-84.5 272.5T560-96Z',
  star: 'm233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z',
  favorite:
    'm480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 ' +
    '99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172' +
    'l-58 52Z',
};

export function DrawnIcon({
  name,
  size,
  color = bt.ink,
}: {
  name: DrawnName;
  size: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960">
      <Path d={PATHS[name]} fill={color} />
    </Svg>
  );
}
