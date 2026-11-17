import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nordsearch's icon set — interface, so vectors (I4). Every photograph on the
 * screen is a picture *of* a place; every mark here is an idea.
 *
 * No emoji anywhere: they differ across Windows / Android / iOS and the web
 * render cannot show that (I8).
 */
export type GlyphName = 'search' | 'star' | 'heart' | 'close' | 'filter';

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
      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={6.6} {...s} />
          <Path d="m16 16 4.4 4.4" {...s} />
        </>
      )}

      {name === 'star' && (
        <Path
          d="M12 3.4 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9 9.3 9Z"
          fill={color}
        />
      )}

      {name === 'heart' && (
        <Path
          d="M12 20.2C7.4 17 4 14.1 4 10.4A4.4 4.4 0 0 1 12 7.8a4.4 4.4 0 0 1 8 2.6c0 3.7-3.4 6.6-8 9.8Z"
          {...s}
        />
      )}

      {name === 'close' && <Path d="M6.6 6.6 17.4 17.4M17.4 6.6 6.6 17.4" {...s} />}

      {/* Two sliders: the filter control in the sheet's header. */}
      {name === 'filter' && (
        <>
          <Path d="M3.6 8.4h3.2M11.2 8.4h9.2M3.6 15.6h9.2M17.2 15.6h3.2" {...s} />
          <Circle cx={9} cy={8.4} r={2.2} {...s} />
          <Circle cx={15} cy={15.6} r={2.2} {...s} />
        </>
      )}
    </Svg>
  );
}
