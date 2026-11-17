import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * skyresults's icon set — interface, so vectors (I4). The only photographs on the
 * app are faces.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'back' | 'more' | 'filter' | 'plane' | 'lark' | 'auric' | 'nord';

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
      {name === 'back' && <Path d="M14.4 5.6 8 12l6.4 6.4" {...s} />}

      {name === 'more' && (
        <>
          <Circle cx={12} cy={5.4} r={1.7} fill={color} stroke="none" />
          <Circle cx={12} cy={12} r={1.7} fill={color} stroke="none" />
          <Circle cx={12} cy={18.6} r={1.7} fill={color} stroke="none" />
        </>
      )}

      {name === 'filter' && <Path d="M3.6 5.6h16.8l-6.6 7.8v5.4l-3.6 2v-7.4Z" {...s} />}

      {/* The aircraft on the route arc, filled so it reads at 14dp. */}
      {name === 'plane' && (
        <Path
          d="M21 12.6 14.2 14l-3 5.6-1.7.1 1.5-5.2-4 .8-1.3 2-1.3.1.6-2.3-1.4-1.8 1.3.1 1.6 1.5 4-.7-3-4.6 1.6-.4 4.6 4.3 6.8-1.3a1 1 0 0 1 0 2.4Z"
          fill={color}
        />
      )}

      {/* Three invented carrier marks. A mark is an idea, so it is drawn (I4). */}
      {name === 'lark' && (
        <Path
          d="M3.6 15.4c4.6.4 7.2-1.4 9-4 1.8-2.6 3.4-4 7.8-3.6-1 3.4-3 5.6-5.6 6.8-2.6 1.2-6.6 1.6-11.2.8Z"
          fill={color}
        />
      )}

      {name === 'auric' && (
        <>
          <Circle cx={12} cy={12} r={4.2} fill={color} stroke="none" />
          <Path
            d="M12 3.4v2.2M12 18.4v2.2M3.4 12h2.2M18.4 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
            {...s}
          />
        </>
      )}

      {name === 'nord' && (
        <Path
          d="M3.4 14.6c2.4-2.6 4-2.6 6.4 0s4 2.6 6.4 0 4-2.6 4.4-1.4M3.4 9.4c2.4-2.6 4-2.6 6.4 0s4 2.6 6.4 0 4-2.6 4.4-1.4"
          {...s}
        />
      )}
    </Svg>
  );
}
