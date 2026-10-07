import Svg, { Path } from 'react-native-svg';

/**
 * The two icons this design actually fills.
 *
 * The export asks for `font-variation-settings: 'FILL' 1` on four glyphs —
 * `favorite` on a saved product card, `verified` beside the profile name,
 * `star` on the detail rating, `stars` in the VIP pill — and its own renders
 * only honour two of them. The reference draws the heart solid and the profile
 * check solid, and draws the rating star and the membership star **outlined**,
 * at FILL 0, with the setting ignored. The export loads Material Symbols twice,
 * from two css2 URLs declaring different axis ranges, which is the likeliest
 * reason the axis reaches some glyphs and not others.
 *
 * Whatever the cause, the reference is the design. So only the two that render
 * filled are here; `star` and `stars` come from the icon subset like every
 * other outlined glyph, and the result matches the reference rather than the
 * markup's stated intent.
 *
 * The two that are here come across as paths from Google's own `fill1` SVGs
 * rather than as a second icon font: the packaged Material Symbols static is
 * one cut at FILL 0 with no `fvar` table, and cutting a second font to get the
 * filled forms is the family-name collision that renders tofu on Android, which
 * the web harness cannot see.
 *
 * Both glyphs are drawn both ways in this design — a hollow heart on an unsaved
 * card against a solid one on a saved card, an outlined `verified` on the
 * cart's applied-promo pill against a solid one by the profile name — so the
 * outlined forms still come from the font and only the filled ones from here.
 *
 * `fillRule="evenodd"` is what keeps `verified` readable: it is a solid badge
 * with a check *cut out* of it, and under the default non-zero rule the cut-out
 * fills in and the glyph comes out as a plain blob.
 *
 * Material's viewBox is `0 -960 960 960`, not `0 0 24 24`, and is kept: the
 * paths are authored against it.
 */
const PATHS = {
  favorite:
    'm480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z',
  verified:
    'm344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z',
} as const;

export type FilledIconName = keyof typeof PATHS;

export function FilledIcon({
  name,
  size = 20,
  color,
}: {
  name: FilledIconName;
  size?: number;
  color: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 -960 960 960">
      <Path fill={color} fillRule="evenodd" d={PATHS[name]} />
    </Svg>
  );
}
