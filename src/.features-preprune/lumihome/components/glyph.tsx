import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * lumihome's icon set — interface, so vectors (I4). The only photograph on the
 * screen is the account avatar.
 *
 * The merchant marks are **abstract shapes for invented services**. The board
 * draws Netflix, Envato and Figma with their real logos; a rebuild that ships
 * a real company's mark is impersonation, so these stand for fictional ones.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot see that (§4.4).
 */
export type GlyphName =
  | 'bell'
  | 'grid'
  | 'chevronDown'
  | 'dollar'
  | 'plus'
  | 'transfer'
  | 'bill'
  | 'bank'
  | 'topup'
  | 'play'
  | 'leaf'
  | 'bolt'
  | 'ring'
  | 'hex'
  | 'flag';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.8 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'bell' && (
        <>
          <Path d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z" {...s} />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
        </>
      )}

      {name === 'grid' && (
        <>
          <Circle cx={8.4} cy={8.4} r={2.4} {...s} />
          <Circle cx={15.6} cy={8.4} r={2.4} {...s} />
          <Circle cx={8.4} cy={15.6} r={2.4} {...s} />
          <Circle cx={15.6} cy={15.6} r={2.4} {...s} />
        </>
      )}

      {name === 'chevronDown' && <Path d="m7.6 10 4.4 4.4 4.4-4.4" {...s} strokeWidth={2} />}

      {name === 'dollar' && (
        <>
          <Path d="M12 5.4v13.2" {...s} strokeWidth={1.9} />
          <Path d="M15.2 8.4a3 3 0 0 0-3-1.6h-.6a2.6 2.6 0 0 0 0 5.2h.8a2.6 2.6 0 0 1 0 5.2h-.6a3 3 0 0 1-3-1.6" {...s} strokeWidth={1.9} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.2v11.6M6.2 12h11.6" {...s} strokeWidth={2.2} />}

      {name === 'transfer' && (
        // A circle of value with two arrows round it.
        <>
          <Circle cx={12} cy={12} r={5.2} {...s} />
          <Path d="M12 9.4v5.2M13.6 10.4a2 2 0 0 0-1.9-.9h-.2a1.5 1.5 0 0 0 0 3h.6a1.5 1.5 0 0 1 0 3h-.3a2 2 0 0 1-1.8-.9" {...s} strokeWidth={1.4} />
        </>
      )}

      {name === 'bill' && (
        <>
          <Path d="M6 3.8h12v16.4l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6L6 18.6Z" {...s} />
          <Path d="M9.4 9h5.2M9.4 12.6h3.4" {...s} strokeWidth={1.6} />
        </>
      )}

      {name === 'bank' && (
        <>
          <Path d="M3.6 9.4 12 4.6l8.4 4.8" {...s} />
          <Path d="M6.2 11.4v6M10.8 11.4v6M13.2 11.4v6M17.8 11.4v6M4 20h16" {...s} strokeWidth={1.7} />
        </>
      )}

      {name === 'topup' && (
        <>
          <Rect x={3.6} y={6.4} width={16.8} height={11.2} rx={2.4} {...s} />
          <Path d="M3.6 10.4h16.8M12 13.2v2.6M10.7 14.5h2.6" {...s} strokeWidth={1.6} />
        </>
      )}

      {/* --- merchant marks, for invented services ------------------------ */}
      {name === 'play' && <Path d="M9 6.2 18 12l-9 5.8Z" fill={color} />}
      {name === 'leaf' && (
        <Path
          d="M18.4 5.6c0 7.2-4.2 11.2-9.4 11.2-1.4 0-2.6-.3-3.4-.8C6.6 9.6 11.4 5.6 18.4 5.6Z"
          fill={color}
        />
      )}
      {name === 'bolt' && <Path d="M13.6 3.4 6.6 13.4h4.2l-1.4 7.2 7.6-10.4h-4.4Z" fill={color} />}
      {name === 'ring' && (
        <>
          <Circle cx={12} cy={12} r={6.4} {...s} strokeWidth={2.6} />
          <Circle cx={12} cy={12} r={2} fill={color} />
        </>
      )}

      {name === 'hex' && <Path d="M12 3.4 20 8v8l-8 4.6L4 16V8Z" fill={color} />}

      {name === 'flag' && (
        // A flag disc, simplified: a canton and stripes. An idea, not a trace.
        <>
          <Circle cx={12} cy={12} r={11} fill="#F2F2F2" />
          <Path d="M1.6 9h20.8M1.6 12h20.8M1.6 15h20.8M3.4 18h17.2" stroke="#C8303A" strokeWidth={2.2} />
          <Path d="M1.6 6.6h20.8" stroke="#C8303A" strokeWidth={2.2} />
          <Rect x={2} y={3} width={10} height={7} fill="#2B3C8C" />
        </>
      )}
    </Svg>
  );
}
