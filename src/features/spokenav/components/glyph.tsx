import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'back' | 'pin' | 'crosshair' | 'turn' | 'caret';
  size?: number;
  tint: string;
}) {
  const s = {
    stroke: tint,
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (name) {
    case 'back':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'pin':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 21s6.4-6.1 6.4-10.4A6.4 6.4 0 0 0 5.6 10.6C5.6 14.9 12 21 12 21Z" {...s} />
          <Circle cx={12} cy={10.4} r={2.4} {...s} />
        </Svg>
      );
    case 'crosshair':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={5.4} {...s} />
          <Path d="M12 2.6v3.2M12 18.2v3.2M21.4 12h-3.2M5.8 12H2.6" {...s} />
        </Svg>
      );
    case 'turn':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M17 19v-6.4A4.6 4.6 0 0 0 12.4 8H6.8" {...s} strokeWidth={2.2} />
          <Path d="M10.2 4.4 6.2 8l4 3.6" {...s} strokeWidth={2.2} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m7 14 5-5 5 5" {...s} strokeWidth={2} />
        </Svg>
      );
  }
}
