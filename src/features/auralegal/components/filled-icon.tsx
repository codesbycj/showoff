import Svg, { Path } from 'react-native-svg';

/**
 * The three icons the design fills.
 *
 * The export sets `font-variation-settings: 'FILL' 1` on exactly three glyphs —
 * `star`, `verified` and `calendar_month` — and leaves every other icon
 * outlined. The Material Symbols static shipped by `@expo-google-fonts` has no
 * FILL axis (it is one cut of the variable font at FILL 0), so the subset in
 * `../symbols` cannot draw them.
 *
 * Rather than approximate a filled star with an outlined one, or cut a second
 * icon font — two subsets of one source face sharing an internal family name is
 * exactly the collision that renders tofu on Android — these three come across
 * as paths, taken from Google's own `fill1` SVGs for the same family. They keep
 * Material's `0 -960 960 960` viewBox, which is why the `Svg` box is declared
 * that way rather than being renumbered to `0 0 24 24`.
 *
 * `calendar_month` appears both filled (the briefing banner, the booking CTA)
 * and outlined (the date capsules), so both versions are in use — the outlined
 * one still comes from the font.
 */
const PATHS = {
  star: 'm233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z',
  verified:
    'm344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z',
  calendarMonth:
    'M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-188.5-11.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5ZM640-400q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-188.5-11.5Q280-263 280-280t11.5-28.5Q303-320 320-320t28.5 11.5Q360-297 360-280t-11.5 28.5Q337-240 320-240t-28.5-11.5ZM640-240q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z',
} as const;

export type FilledIconName = keyof typeof PATHS;

export function FilledIcon({
  name,
  size = 16,
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
