import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * crypinhome's icon set — interface, so vectors (INSPO-RULES I4).
 *
 * Includes the asset marks. A coin logo is a *wordmark-scale brand mark*, not a
 * picture of something — it is drawn as a vector in every real wallet app, so
 * it is in drawing range by the §2.5 test. They are simplified rather than
 * traced: at 34dp the Bitcoin B and the Ethereum octahedron carry the
 * recognition, and the reference draws them the same way.
 *
 * The dock's five icons are my call — the reference's are ~8px on its board and
 * unreadable. Named in the handover.
 */
export type GlyphName =
  | 'spark'
  | 'bell'
  | 'eye'
  | 'plus'
  | 'minus'
  | 'receive'
  | 'more'
  | 'chevronRight'
  | 'trendUp'
  | 'trendDown'
  | 'sliders'
  | 'home'
  | 'chart'
  | 'swap'
  | 'cards'
  | 'gear'
  | 'btc'
  | 'eth'
  | 'usdt'
  | 'xrp'
  | 'sol'
  | 'ada'
  | 'link';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.9 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'spark' && (
        // The Crypin mark: a six-point asterisk.
        <Path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" {...s} strokeWidth={2.3} />
      )}

      {name === 'bell' && (
        <>
          <Path
            d="M6.4 10.2a5.6 5.6 0 0 1 11.2 0c0 4 1.3 5.4 1.9 6H4.5c.6-.6 1.9-2 1.9-6Z"
            {...s}
          />
          <Path d="M10.2 19.4a2 2 0 0 0 3.6 0" {...s} />
        </>
      )}

      {name === 'eye' && (
        <>
          <Path d="M2.6 12S6 6.4 12 6.4 21.4 12 21.4 12 18 17.6 12 17.6 2.6 12 2.6 12Z" {...s} />
          <Circle cx={12} cy={12} r={2.7} {...s} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} strokeWidth={2.2} />}
      {name === 'minus' && <Path d="M6.4 12h11.2" {...s} strokeWidth={2.2} />}

      {name === 'receive' && (
        // Into a tray — distinct from the plain minus that means withdraw.
        <>
          <Path d="M12 4.4v9.4m0 0 3.6-3.6M12 13.8 8.4 10.2" {...s} strokeWidth={2.1} />
          <Path d="M4.8 15.6v2a2 2 0 0 0 2 2h10.4a2 2 0 0 0 2-2v-2" {...s} />
        </>
      )}

      {name === 'more' && (
        <>
          <Circle cx={8.4} cy={8.4} r={1.8} fill={color} />
          <Circle cx={15.6} cy={8.4} r={1.8} fill={color} />
          <Circle cx={8.4} cy={15.6} r={1.8} fill={color} />
          <Circle cx={15.6} cy={15.6} r={1.8} fill={color} />
        </>
      )}

      {name === 'chevronRight' && <Path d="m9.6 6 6 6-6 6" {...s} />}

      {name === 'trendUp' && (
        <>
          <Path d="M4 16.4 9.6 10.8l3.4 3.4L20 7.2" {...s} />
          <Path d="M15.2 7.2H20v4.8" {...s} />
        </>
      )}
      {name === 'trendDown' && (
        <>
          <Path d="M4 7.6 9.6 13.2l3.4-3.4L20 16.8" {...s} />
          <Path d="M15.2 16.8H20V12" {...s} />
        </>
      )}

      {name === 'sliders' && (
        <>
          <Path d="M4.4 8h15.2M4.4 16h15.2" {...s} />
          <Circle cx={9.2} cy={8} r={2.4} {...s} fill={ct.surface} />
          <Circle cx={15.2} cy={16} r={2.4} {...s} fill={ct.surface} />
        </>
      )}

      {name === 'home' && (
        <Path d="M4 10.4 12 4l8 6.4V19a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 19Z" {...s} />
      )}
      {name === 'chart' && <Path d="M5 19V9.5M12 19V5M19 19v-6.5" {...s} strokeWidth={2.2} />}
      {name === 'swap' && (
        <Path d="M7 5.2 3.6 8.6 7 12M3.6 8.6h12M17 18.8l3.4-3.4L17 12M20.4 15.4h-12" {...s} />
      )}
      {name === 'cards' && (
        <>
          <Rect x={3.2} y={6.4} width={17.6} height={11.2} rx={2.6} {...s} />
          <Path d="M3.2 10.4h17.6" {...s} />
        </>
      )}
      {name === 'gear' && (
        // A profile, not a cog. A cog without teeth is a sun at 20px, which is
        // what the first pass drew — and the fifth dock slot in a wallet is the
        // account anyway.
        <>
          <Circle cx={12} cy={8.4} r={3.6} {...s} />
          <Path d="M4.8 20.2c0-3.8 3.2-6.2 7.2-6.2s7.2 2.4 7.2 6.2" {...s} />
        </>
      )}

      {/* --- asset marks ------------------------------------------------- */}
      {name === 'btc' && (
        // The Bitcoin B, stroked. Filling the two bowls as one path closes the
        // counters at 17px and the mark comes out a solid blob, which is what
        // the first pass rendered.
        <>
          <Path d="M8.6 5.6v12.8" {...s} strokeWidth={2.1} />
          <Path d="M8.6 5.6h4.6a3.2 3.2 0 0 1 0 6.4H8.6" {...s} strokeWidth={2.1} />
          <Path d="M8.6 12h5.2a3.2 3.2 0 0 1 0 6.4H8.6" {...s} strokeWidth={2.1} />
          <Path
            d="M10.8 3.3v2.3M13.7 3.3v2.3M10.8 18.4v2.3M13.7 18.4v2.3"
            {...s}
            strokeWidth={1.8}
          />
        </>
      )}

      {name === 'eth' && (
        // The octahedron, upper and lower halves.
        <>
          <Path d="M12 2.6 5.6 12.2 12 15.9l6.4-3.7Z" fill={color} />
          <Path d="M12 17.3 5.6 13.6 12 21.4l6.4-7.8Z" fill={color} opacity={0.75} />
        </>
      )}

      {name === 'usdt' && (
        // Tether's T on a bar.
        <>
          <Path d="M5.4 5.4h13.2v3.2h-4.8v2.1h-3.6V8.6H5.4Z" fill={color} />
          <Path d="M10.2 10.1v8.5h3.6v-8.5Z" fill={color} />
          <Path
            d="M12 13.4c3.9 0 7-.9 7-2.1s-3.1-2.1-7-2.1-7 .9-7 2.1 3.1 2.1 7 2.1Z"
            stroke={color}
            strokeWidth={1.5}
            fill="none"
          />
        </>
      )}

      {name === 'xrp' && (
        // Two crossed arcs meeting in the middle, as the mark reads.
        <Path
          d="M5 5.4c2.4 0 3.9 2 7 5.1 3.1-3.1 4.6-5.1 7-5.1M5 18.6c2.4 0 3.9-2 7-5.1 3.1 3.1 4.6 5.1 7 5.1"
          {...s}
          strokeWidth={2.1}
        />
      )}

      {name === 'sol' && (
        // Three slanted bars — the Solana mark is literally that.
        <>
          <Path d="M7 5.4h11.4l-2.8 3H4.2Z" fill={color} />
          <Path d="M4.2 10.6h11.4l2.8 3H7Z" fill={color} />
          <Path d="M7 15.8h11.4l-2.8 3H4.2Z" fill={color} />
        </>
      )}

      {name === 'ada' && (
        // A ring of small discs around a centre, as Cardano's mark reads.
        <>
          <Circle cx={12} cy={12} r={2.4} fill={color} />
          <Circle cx={12} cy={4.6} r={1.5} fill={color} />
          <Circle cx={12} cy={19.4} r={1.5} fill={color} />
          <Circle cx={5.6} cy={8.3} r={1.5} fill={color} />
          <Circle cx={18.4} cy={8.3} r={1.5} fill={color} />
          <Circle cx={5.6} cy={15.7} r={1.5} fill={color} />
          <Circle cx={18.4} cy={15.7} r={1.5} fill={color} />
        </>
      )}

      {name === 'link' && (
        // A hexagon with a solid inner one — Chainlink's cube silhouette.
        <>
          <Path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4Z" {...s} strokeWidth={1.9} />
          <Path d="M12 8.2 16.2 10.6v4.8L12 17.8 7.8 15.4v-4.8Z" fill={color} />
        </>
      )}
    </Svg>
  );
}
