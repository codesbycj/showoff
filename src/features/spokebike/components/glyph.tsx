import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'back' | 'helmet' | 'arrow' | 'lock' | 'next' | 'bolt' | 'plus' | 'minus';
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
    case 'helmet':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 3.6 19.6 8v8L12 20.4 4.4 16V8Z" {...s} />
          <Circle cx={12} cy={12} r={2.6} {...s} />
        </Svg>
      );
    case 'bolt':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M13.4 2 5 13.4h5.3L9.8 22l8.6-11.6h-5.4Z" fill={tint} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'minus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 12h12" {...s} strokeWidth={2.2} />
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
