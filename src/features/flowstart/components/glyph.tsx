import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';

/**
 * flowstart's icon set — interface, so vectors (I4). The only mark on the
 * screen is the arrow the board draws inside its primary button.
 */
export type GlyphName = 'arrow';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 18, color = ct.onDark, strokeWidth = 1.9 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'arrow' && <Path d="M5.2 12h13.6M13.2 6.4l5.6 5.6-5.6 5.6" {...s} />}
    </Svg>
  );
}
