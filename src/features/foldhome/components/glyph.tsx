import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * foldhome's icon set - interface, so vectors (I4).
 *
 * The board sets its card faces with the **VISA and PayPal marks**; neither is
 * ours to ship, so the schemes here are invented and their wordmarks are set
 * in the app's own type (I1).
 */
export type GlyphName =
  | 'qr'
  | 'plus'
  | 'more'
  | 'deposit'
  | 'transfer'
  | 'withdraw'
  | 'grid'
  | 'chevronDown'
  | 'send'
  | 'dumbbell'
  | 'wallet'
  | 'music';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.7 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'qr' && (
        <>
          <Rect x={3.4} y={3.4} width={7} height={7} rx={1.6} {...s} />
          <Rect x={13.6} y={3.4} width={7} height={7} rx={1.6} {...s} />
          <Rect x={3.4} y={13.6} width={7} height={7} rx={1.6} {...s} />
          <Rect x={13.6} y={13.6} width={7} height={7} rx={1.6} {...s} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'more' && (
        <>
          <Circle cx={5.4} cy={12} r={1.5} fill={color} stroke="none" />
          <Circle cx={12} cy={12} r={1.5} fill={color} stroke="none" />
          <Circle cx={18.6} cy={12} r={1.5} fill={color} stroke="none" />
        </>
      )}

      {name === 'deposit' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.8v8.4M8.6 12.8 12 16.2l3.4-3.4" {...s} />
        </>
      )}

      {name === 'transfer' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M8.4 10.2h7.2l-2.4-2.4M15.6 13.8H8.4l2.4 2.4" {...s} />
        </>
      )}

      {name === 'withdraw' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 16.2V7.8M8.6 11.2 12 7.8l3.4 3.4" {...s} />
        </>
      )}

      {name === 'grid' && (
        <>
          <Rect x={4} y={4} width={6.4} height={6.4} rx={1.4} {...s} />
          <Rect x={13.6} y={4} width={6.4} height={6.4} rx={1.4} {...s} />
          <Rect x={4} y={13.6} width={6.4} height={6.4} rx={1.4} {...s} />
          <Rect x={13.6} y={13.6} width={6.4} height={6.4} rx={1.4} {...s} />
        </>
      )}

      {name === 'chevronDown' && <Path d="m6.8 9.6 5.2 5.2 5.2-5.2" {...s} />}

      {name === 'send' && <Path d="M20.4 3.6 3.2 10.4l7 2.6 2.6 7Z" {...s} />}

      {name === 'dumbbell' && (
        <>
          <Path d="M3.4 9.6v4.8M6.6 7.4v9.2M17.4 7.4v9.2M20.6 9.6v4.8" {...s} />
          <Path d="M6.6 12h10.8" {...s} />
        </>
      )}

      {name === 'wallet' && (
        <>
          <Path
            d="M4 7.6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9.6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
            {...s}
          />
          <Path d="M14.6 12.4h4.6" {...s} />
        </>
      )}

      {name === 'music' && (
        <>
          <Path d="M9.4 17.2V5.8l9.2-1.8v11.4" {...s} />
          <Circle cx={7} cy={17.6} r={2.4} {...s} />
          <Circle cx={16.2} cy={15.4} r={2.4} {...s} />
        </>
      )}
    </Svg>
  );
}
