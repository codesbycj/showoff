import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * Every mark on the screen, drawn — all of them interface.
 *
 * `brand` is this project's own mark, invented: two slabs offset about a
 * centre, which is the idea the name is about. The reference's wordmark is a
 * real company's and does not come along (AGENTS.md).
 */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'grid' | 'arrow' | 'link' | 'chart' | 'dot' | 'back' | 'caret' | 'plus';
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
    case 'grid':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={8} cy={8} r={2.4} fill={tint} />
          <Circle cx={15.4} cy={8} r={2.4} fill={tint} />
          <Circle cx={8} cy={15.4} r={2.4} fill={tint} />
          <Path d="M15.4 13v4.8M13 15.4h4.8" {...s} strokeWidth={2} />
        </Svg>
      );
    case 'arrow':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M7 17 17 7M9.4 7H17v7.6" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'link':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M9.6 12H5.4M14.4 12h4.2" {...s} strokeWidth={2} />
          <Path d="M7.8 8.6 5 12l2.8 3.4M16.2 8.6 19 12l-2.8 3.4" {...s} strokeWidth={2} />
        </Svg>
      );
    case 'chart':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={5} y={12} width={3.4} height={7} rx={1.7} fill={tint} />
          <Rect x={10.3} y={7} width={3.4} height={12} rx={1.7} fill={tint} />
          <Rect x={15.6} y={14.4} width={3.4} height={4.6} rx={1.7} fill={tint} />
        </Svg>
      );
    case 'dot':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={7.4} {...s} strokeWidth={2} />
          <Circle cx={12} cy={12} r={2.6} fill={tint} />
        </Svg>
      );
    case 'back':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.2} />
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

/** The brand's mark: two slabs offset about a centre. */
export function BrandMark({ size = 30, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size * 1.15} viewBox="0 0 30 34">
      <Rect x={2} y={3} width={19} height={11} rx={5.5} fill={tint} />
      <Rect x={9} y={19} width={19} height={11} rx={5.5} fill={tint} />
    </Svg>
  );
}
