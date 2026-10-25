import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'pin' | 'bell' | 'swap' | 'calendar' | 'seat' | 'person' | 'caret';
  size?: number;
  tint: string;
}) {
  const s = {
    stroke: tint,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (name) {
    case 'pin':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 21s6.2-6 6.2-10.2A6.2 6.2 0 0 0 5.8 10.8C5.8 15 12 21 12 21Z" fill={tint} />
          <Circle cx={12} cy={10.4} r={2.2} fill="#0C0D0C" />
        </Svg>
      );
    case 'bell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6.8 17.2V11a5.2 5.2 0 0 1 10.4 0v6.2" {...s} />
          <Path d="M5.2 17.4h13.6" {...s} />
          <Path d="M10.4 19.9a2 2 0 0 0 3.2 0" {...s} />
        </Svg>
      );
    case 'swap':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M7 8h11l-3-3M17 16H6l3 3" {...s} strokeWidth={2} />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={5.6} width={16} height={14} rx={3.2} {...s} />
          <Path d="M4 10h16M8.4 3.8v3.4M15.6 3.8v3.4" {...s} />
        </Svg>
      );
    case 'seat':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M7 5.6h5.6a3 3 0 0 1 3 3V14H7Z" {...s} />
          <Path d="M5.4 14h13.2v4.4H5.4Z" {...s} />
        </Svg>
      );
    case 'person':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={8.6} r={3.4} {...s} />
          <Path d="M5.6 19.4c1-3 3.4-4.6 6.4-4.6s5.4 1.6 6.4 4.6" {...s} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m7 10 5 5 5-5" {...s} strokeWidth={2} />
        </Svg>
      );
  }
}
