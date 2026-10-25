import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * Every mark on the screen, drawn — all of them interface.
 *
 * The three source marks are **invented**. The reference puts three real
 * products' logos in its connect row; those are other companies' trademarks
 * and this page is branded as an app that is not theirs. These stand in at the
 * same size in the same place, in the same flat two-colour idiom.
 */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name:
    | 'bolt'
    | 'command'
    | 'bell'
    | 'plus'
    | 'clock'
    | 'wallet'
    | 'grid'
    | 'store'
    | 'board'
    | 'flake'
    | 'orbit'
    | 'bars';
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
    case 'bolt':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M13.4 2 5 13.4h5.3L9.8 22l8.6-11.6h-5.4Z" fill={tint} />
        </Svg>
      );
    case 'command':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M9 9V7a2.5 2.5 0 1 0-2.5 2.5H9Zm0 0h6m-6 0v6m6-6V7a2.5 2.5 0 1 1 2.5 2.5H15Zm0 0v6m0 0h2.5A2.5 2.5 0 1 1 15 17.5V15Zm-6 0H6.5A2.5 2.5 0 1 0 9 17.5V15Z"
            {...s}
          />
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
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.4} />
        </Svg>
      );
    case 'clock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={8} {...s} />
          <Path d="M12 7.6V12l3 2" {...s} />
        </Svg>
      );
    case 'wallet':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={3.6} y={6.4} width={16.8} height={11.2} rx={3} {...s} />
          <Path d="M15.6 12h2.8" {...s} strokeWidth={2.6} />
        </Svg>
      );
    case 'grid':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={4} width={6.4} height={6.4} rx={2} fill={tint} />
          <Rect x={13.6} y={4} width={6.4} height={6.4} rx={2} fill={tint} />
          <Rect x={4} y={13.6} width={6.4} height={6.4} rx={2} fill={tint} />
          <Rect x={13.6} y={13.6} width={6.4} height={6.4} rx={2} fill={tint} />
        </Svg>
      );
    case 'store':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.5 9.5h15v8.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5Z" {...s} />
          <Path d="M4.5 9.5 6.4 5h11.2l1.9 4.5" {...s} />
        </Svg>
      );
    case 'board':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={4.6} width={16} height={14.8} rx={3.4} {...s} />
          <Path d="M9 9.4v6M15 9.4v3.4" {...s} />
        </Svg>
      );
    case 'flake':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"
            stroke={tint}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'orbit':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={4.2} fill={tint} />
          <Circle cx={12} cy={12} r={8} stroke={tint} strokeWidth={1.8} fill="none" />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={5} y={9} width={3.6} height={10} rx={1.8} fill={tint} />
          <Rect x={10.2} y={5} width={3.6} height={14} rx={1.8} fill={tint} />
          <Rect x={15.4} y={11.5} width={3.6} height={7.5} rx={1.8} fill={tint} />
        </Svg>
      );
  }
}
