import Svg, { Path } from 'react-native-svg';

/**
 * The three icons this design fills.
 *
 * The export sets `font-variation-settings: 'FILL' 1` on `favorite`, `star` and
 * `stars` and leaves its other forty-two outlined. The Material Symbols static
 * shipped by `@expo-google-fonts` is one cut of the variable font at FILL 0 and
 * has no `fvar` table, so the subset in `../symbols` cannot draw them.
 *
 * They come across as paths from Google's own `fill1` SVGs for the same family
 * rather than as a second icon font: two subsets of one source face sharing an
 * internal family name is the collision that renders tofu on Android, and the
 * web harness cannot see it.
 *
 * `favorite` is drawn both ways in this design — hollow on an unsaved card,
 * solid red on a saved one — so the outlined heart still comes from the font
 * and only the filled one comes from here.
 *
 * Material's viewBox is `0 -960 960 960`, not `0 0 24 24`, and is kept: the
 * paths are authored against it.
 */
const PATHS = {
  favorite:
    'm480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z',
  star: 'm233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z',
  stars:
    'm320-240 160-122 160 122-60-198 160-114H544l-64-208-64 208H220l160 114-60 198ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z',
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
      <Path fill={color} d={PATHS[name]} />
    </Svg>
  );
}
