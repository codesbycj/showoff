import Svg, { Circle, Path, Polyline, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name:
    'menu' | 'bell' | 'trend' | 'scale' | 'flame' | 'home' | 'clock' | 'plus' | 'pencil' | 'caret';
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
    case 'menu':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M5 8.5h14M5 13h10M5 17.5h6" {...s} />
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
    case 'trend':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Polyline points="4,16 9.5,10.5 13,14 20,7" {...s} strokeWidth={2} />
          <Path d="M15.5 7H20v4.5" {...s} strokeWidth={2} />
        </Svg>
      );
    case 'scale':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={5} width={16} height={14} rx={4} {...s} />
          <Path d="M12 9.4v3.2" {...s} />
        </Svg>
      );
    case 'flame':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 3.4c3 3.2 5.6 5.6 5.6 9.2A5.6 5.6 0 0 1 6.4 12.6c0-1.6.6-2.8 1.8-4 .2 1.6 1 2.4 2 2.4 1.6 0 1.8-2.6 1.8-7.6Z"
            fill={tint}
          />
        </Svg>
      );
    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.6 10.4 12 4.6l7.4 5.8v8a1 1 0 0 1-1 1H5.6a1 1 0 0 1-1-1Z" fill={tint} />
        </Svg>
      );
    case 'clock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={8} {...s} />
          <Path d="M12 7.6V12l3 2" {...s} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.2} />
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
          <Path d="m7 10 5 5 5-5" {...s} strokeWidth={2} />
        </Svg>
      );
  }
}

/** The week's calories, as a line. Drawn, because a chart is a diagram. */
export function Spark({ width, tint }: { width: number; tint: string }) {
  return (
    <Svg width={width} height={34} viewBox="0 0 120 34">
      <Path
        d="M2 24 C12 24 14 10 24 10 S38 26 48 26 60 8 70 8 84 24 94 22 110 12 118 14"
        stroke={tint}
        strokeWidth={2.4}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx={94} cy={22} r={3.4} fill={tint} />
    </Svg>
  );
}
