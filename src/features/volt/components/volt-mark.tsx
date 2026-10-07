import Svg, { Circle, Path } from 'react-native-svg';

/**
 * The Volt mark — a lime "A" with a floating dot, inside a ringed disc.
 *
 * This one needed no tracing. Unlike every other brand mark rebuilt here, the
 * export ships it as literal SVG rather than as a raster: `pulsesport_logo` is a
 * 299-byte `code.html` holding exactly this circle, path and dot on a 100-unit
 * box. It is carried across verbatim.
 *
 * Its two colours are the `DESIGN.md` *prose* values — `#D4FF00` on `#141716` —
 * where the rest of the showcase uses the frontmatter's `#caf300` and `#191c1b`,
 * because the renders agree with the frontmatter. A brand asset delivered as
 * code is taken as drawn, so these are left alone; four points of lime is not a
 * visible difference, and recolouring someone's logo to match the UI would be
 * the larger error. See `theme.ts`.
 */
export function VoltMark({ size = 32 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="46" fill="#141716" stroke="#D4FF00" strokeWidth={4} />
      <Path d="M32 68L48 30H54L70 68H60L56 58H44L40 68H32ZM46 51H54L50 40L46 51Z" fill="#D4FF00" />
      <Circle cx="50" cy="22" r="5" fill="#D4FF00" />
    </Svg>
  );
}
