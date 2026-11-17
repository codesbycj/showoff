import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * skyticket's icon set — interface, so vectors (I4). The only photographs on the
 * app are faces.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'back' | 'plane' | 'lark' | 'download';

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

      {/* The aircraft on the route arc, filled so it reads at 14dp. */}
      {name === 'plane' && (
        <Path
          d="M21 12.6 14.2 14l-3 5.6-1.7.1 1.5-5.2-4 .8-1.3 2-1.3.1.6-2.3-1.4-1.8 1.3.1 1.6 1.5 4-.7-3-4.6 1.6-.4 4.6 4.3 6.8-1.3a1 1 0 0 1 0 2.4Z"
          fill={color}
        />
      )}

      {/* The invented carrier's mark: a lark. A mark is an idea, so it is
          drawn rather than traced (I4). */}
      {name === 'lark' && (
        <Path
          d="M3.6 15.4c4.6.4 7.2-1.4 9-4 1.8-2.6 3.4-4 7.8-3.6-1 3.4-3 5.6-5.6 6.8-2.6 1.2-6.6 1.6-11.2.8Z"
          fill={color}
        />
      )}

      {name === 'download' && (
        <Path
          d="M12 3.8v10.4M12 14.2 8.2 10.4M12 14.2l3.8-3.8M4.8 16.4v2a1.8 1.8 0 0 0 1.8 1.8h10.8a1.8 1.8 0 0 0 1.8-1.8v-2"
          {...s}
        />
      )}
    </Svg>
  );
}
