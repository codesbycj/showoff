import Svg, { Path } from 'react-native-svg';

/**
 * The arrow on the primary button.
 *
 * Drawn rather than set as a character: "→" resolves to a different face on
 * every platform and is one of the things this project has shipped wrong
 * before. A path is the same shape on web, on Android and in a screenshot.
 *
 * The shaft and the head are one path with a round join, so the corner where
 * they meet stays sharp at 17dp instead of showing the overlap two separate
 * strokes leave.
 */
export function ArrowGlyph({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3.5 12 H19.5 M13 5.5 L19.5 12 L13 18.5"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
