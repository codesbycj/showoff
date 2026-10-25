import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'menu' | 'search' | 'arrow' | 'lock' | 'next';
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
    case 'menu':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M5 8.5h14M5 15.5h14" {...s} />
        </Svg>
      );
    case 'search':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={11} cy={11} r={6.4} {...s} />
          <Path d="M15.8 15.8 20 20" {...s} />
        </Svg>
      );
    case 'arrow':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M7 17 17 7M9.4 7H17v7.6" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'lock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={5.6} y={10.4} width={12.8} height={9.2} rx={3} {...s} />
          <Path d="M8.6 10.4V8.2a3.4 3.4 0 0 1 6.8 0v2.2" {...s} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m7 6 5 6-5 6M13 6l5 6-5 6" {...s} strokeWidth={1.8} />
        </Svg>
      );
  }
}
