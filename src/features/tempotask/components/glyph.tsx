import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

/**
 * The marks on the task screen, drawn — all of them interface.
 *
 * `hatch` is the striped ground behind the chart. It is drawn as explicit
 * lines rather than as an SVG `<Pattern>`: react-native-svg's pattern ids are
 * document-global on web, so two cards using one id would both render the
 * first card's pattern, and the bug is invisible until a second chart appears.
 *
 * `thumb` replaces the 👍 the reference sets in its notice. An emoji is a
 * different mark on every platform and missing on some, so it cannot be
 * shipped as UI.
 */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'back' | 'dots' | 'board' | 'close' | 'thumb';
  size?: number;
  tint: string;
}) {
  const s = { stroke: tint, strokeWidth: 1.9, strokeLinecap: 'round' as const, fill: 'none' };

  if (name === 'back') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
      </Svg>
    );
  }
  if (name === 'dots') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx={7.5} cy={12} r={1.5} fill={tint} />
        <Circle cx={16.5} cy={12} r={1.5} fill={tint} />
      </Svg>
    );
  }
  if (name === 'board') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Rect x={4} y={4.6} width={16} height={14.8} rx={4} {...s} strokeWidth={1.7} />
        <Path d="M8.4 9.6h7.2M8.4 13.2h4.6" {...s} strokeWidth={1.7} />
      </Svg>
    );
  }
  if (name === 'close') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M8 8l8 8M16 8l-8 8" {...s} />
      </Svg>
    );
  }
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path
        d="M11.5 13.8 16.4 5a1.9 1.9 0 0 1 3.5 1l-.8 5.6h5.4c1.9 0 3.2 1.7 2.8 3.5l-1.8 8a3.4 3.4 0 0 1-3.3 2.7h-8.2c-1 0-1.9-.3-2.7-.9l-.3-.2V13.8Z"
        fill="#F5B942"
      />
      <Rect x={4.4} y={13.2} width={6} height={12.6} rx={2.2} fill="#E8A72F" />
    </Svg>
  );
}

/** The striped ground a column stands on. */
export function Hatch({ width, height, tint }: { width: number; height: number; tint: string }) {
  const step = 6;
  const lines = [];
  for (let x = -height; x < width; x += step) {
    lines.push(
      <Line key={x} x1={x} y1={height} x2={x + height} y2={0} stroke={tint} strokeWidth={1.4} />,
    );
  }
  return (
    <Svg width={width} height={height}>
      {lines}
    </Svg>
  );
}
