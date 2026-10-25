import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'caret' | 'bell' | 'back' | 'next' | 'dots' | 'share' | 'pencil' | 'dollar';
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
    case 'caret':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m7 10 5 5 5-5" {...s} strokeWidth={2} />
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
    case 'back':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'next':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M9.5 5.5 16 12l-6.5 6.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'dots':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={6} cy={12} r={1.5} fill={tint} />
          <Circle cx={12} cy={12} r={1.5} fill={tint} />
          <Circle cx={18} cy={12} r={1.5} fill={tint} />
        </Svg>
      );
    case 'share':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 15.4V4.6M8.4 8.2 12 4.6l3.6 3.6" {...s} />
          <Path d="M5.4 13.6v4.2a1.6 1.6 0 0 0 1.6 1.6h10a1.6 1.6 0 0 0 1.6-1.6v-4.2" {...s} />
        </Svg>
      );
    case 'pencil':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M15.6 4.8 19.2 8.4 8.6 19H5v-3.6Z" {...s} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={4} width={16} height={16} rx={8} {...s} strokeWidth={1.6} />
          <Path
            d="M12 7.6v8.8M14 10c0-.9-.9-1.5-2-1.5s-2 .6-2 1.5.9 1.4 2 1.7 2 .8 2 1.7-.9 1.5-2 1.5-2-.6-2-1.5"
            {...s}
            strokeWidth={1.5}
          />
        </Svg>
      );
  }
}
