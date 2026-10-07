import Svg, { Path } from 'react-native-svg';

/**
 * The plane mark, on home's active tab and on the ticket's route badge.
 *
 * This is the export's own path, lifted verbatim from the ticket screen's
 * inline SVG rather than mapped onto an icon-set lookalike. Two reasons: the
 * two screens would otherwise disagree — home sets Font Awesome's `fa-plane`
 * and the ticket draws this path — and the icon sets point their planes in
 * different directions, so matching the reference's angle by rotating a
 * substitute is guesswork.
 *
 * The path's nose points straight up. Both screens show it at 45deg, which the
 * export reaches from two different starting angles (`-rotate-45` on a
 * right-pointing Font Awesome glyph, `rotate-45` on this up-pointing one), so
 * the rotation lives here and neither caller has to know that.
 */
export function PlaneGlyph({ size = 14, color }: { size?: number; color: string }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: [{ rotate: '45deg' }] }}
    >
      <Path
        fill={color}
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </Svg>
  );
}
