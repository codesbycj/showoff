import Svg, { Path } from 'react-native-svg';

/**
 * The arrow used twice: inside the headline's pill, and in the start button.
 *
 * Drawn rather than set as a character. "→" resolves to a different face on
 * every platform and is one of the things this project has shipped wrong
 * before; a path is the same shape on web, on Android and in a screenshot.
 *
 * `angle` turns it without turning its box — the start button's arrow points
 * up and to the right, and React Native rotates about an element's centre,
 * which for a square glyph is exactly what is wanted.
 */
export function ArrowGlyph({
  size,
  color,
  angle = 0,
}: {
  size: number;
  color: string;
  angle?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: [{ rotate: `${angle}deg` }] }}
    >
      <Path
        d="M4 12 H19 M12.5 5.5 L19 12 L12.5 18.5"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
