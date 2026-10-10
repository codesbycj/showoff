import Svg, { Path } from 'react-native-svg';

import { pf } from '../theme';

/**
 * The five glyphs the subset cannot supply, drawn from their own paths.
 *
 * `@expo-google-fonts/material-symbols-outlined` ships seven *static* weights
 * and no `fvar` table. The export loads the variable face from Google's CDN
 * with both axes open, so it can ask for things the static cut simply does not
 * contain:
 *
 *   * `FILL 1` on the badge's bolt, a tile's footprint and water drop, and a
 *     meal row's flame — four glyphs that never appear unfilled anywhere on
 *     the screen, so none of them needs the font at all.
 *   * `font-weight: 700` on every `add`. Measured off the render, the FAB's
 *     plus spans 19.7dp of its 30dp em with a 3.7dp bar; the 400 cut draws the
 *     same glyph 17.5dp wide with a 2.5dp bar, which is a third thinner and
 *     obvious at that size.
 *
 * Cutting a second subset for either is the trap, not the fix: two faces
 * trimmed out of one source file both keep the family name written *inside*
 * the file, Android resolves a face by that name rather than by its `useFonts`
 * key, and the second one renders tofu — invisible on web, which gives every
 * key its own `@font-face`. So the authoritative paths are inlined instead,
 * from `fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/
 * <name>/<fill1|wght700>/24px.svg`.
 *
 * They come back on a `0 -960 960 960` viewBox and keep it. Renumbering to
 * `0 0 24 24` puts the glyph off-box.
 */

type DrawnName = 'bolt' | 'footprint' | 'waterDrop' | 'localFireDepartment' | 'addBold';

const PATHS: Record<DrawnName, string> = {
  bolt: 'm320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z',
  footprint:
    'M260-920q85 0 132.5 75.5T440-680q0 41-8.5 78T412-536l-285 57q-15-29-31-80.5T80-680q0-103 ' +
    '51-171.5T260-920Zm55 680q-71 0-110.5-49.5T160-404l258-52q8 17 15 38.5t7 44.5q0 57-35.5 ' +
    '95T315-240Zm385-480q78 0 129 68.5T880-480q0 69-16 120.5T833-279l-285-57q-11-29-19.5-66t-8.5' +
    '-78q0-89 47.5-164.5T700-720ZM645-40q-54 0-89.5-38T520-173q0-23 7-44.5t15-38.5l257 52q-5 ' +
    '65-44 114.5T645-40Z',
  waterDrop:
    'M491-200q12-1 20.5-9.5T520-230q0-14-9-22.5t-23-7.5q-41 3-87-22.5T343-375q-2-11-10.5-18t-19.5' +
    '-7q-14 0-23 10.5t-6 24.5q17 91 80 130t127 35Zm-239.5 26Q160-268 160-408q0-100 79.5-217.5T480' +
    '-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80q-137 0-228.5-94Z',
  localFireDepartment:
    'M160-400q0-105 50-187t110-138q60-56 110-85.5l50-29.5v132q0 37 25 58.5t56 21.5q17 0 32.5-7t28.5' +
    '-23l18-22q72 42 116 116.5T800-400q0 88-43 160.5T644-125q17-24 26.5-52.5T680-238q0-40-15-75.5T622' +
    '-377L480-516 339-377q-29 29-44 64t-15 75q0 32 9.5 60.5T316-125q-70-42-113-114.5T160-400Zm320-4 ' +
    '85 83q17 17 26 38t9 45q0 49-35 83.5T480-120q-50 0-85-34.5T360-238q0-23 9-44.5t26-38.5l85-83Z',
  addBold: 'M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z',
};

export function DrawnIcon({
  name,
  size,
  color = pf.ink,
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
