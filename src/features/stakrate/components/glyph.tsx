import Svg, { Line, Path } from 'react-native-svg';

/** The three marks on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'back' | 'check' | 'next';
  size?: number;
  tint: string;
}) {
  const s = {
    stroke: tint,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  if (name === 'back') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
      </Svg>
    );
  }
  if (name === 'next') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="m7 6 5 6-5 6M13 6l5 6-5 6" {...s} strokeWidth={2} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m5.5 12.5 4.2 4.2L18.5 8" {...s} strokeWidth={2.6} />
    </Svg>
  );
}

/**
 * The questions still to come, hatched.
 *
 * Explicit lines rather than an SVG `<Pattern>`: react-native-svg's pattern
 * ids are document-global on web, so every segment sharing one id would
 * render the first segment's pattern.
 */
export function Hatch({ width, height, tint }: { width: number; height: number; tint: string }) {
  const step = 5;
  const lines = [];
  for (let x = -height; x < width; x += step) {
    lines.push(
      <Line key={x} x1={x} y1={height} x2={x + height} y2={0} stroke={tint} strokeWidth={1.6} />,
    );
  }
  return (
    <Svg width={width} height={height}>
      {lines}
    </Svg>
  );
}
