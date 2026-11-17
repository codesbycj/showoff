import Svg, { Circle, Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * cocoahome's icon set - interface, so vectors (I4). The snacks are
 * photographs, because a chocolate is a picture of a chocolate.
 */
export type GlyphName = 'filter' | 'cart' | 'arrow';

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
      {name === 'filter' && <Path d="M4 7h16M7 12h10M10 17h4" {...s} />}

      {name === 'cart' && (
        <>
          <Path d="M3 4h2.4l2.2 10.4h9.6l2-7.2H6.2" {...s} />
          <Circle cx={9} cy={19} r={1.6} {...s} />
          <Circle cx={17} cy={19} r={1.6} {...s} />
        </>
      )}

      {name === 'arrow' && <Path d="M5.2 12h13.6M13.2 6.4l5.6 5.6-5.6 5.6" {...s} />}
    </Svg>
  );
}
