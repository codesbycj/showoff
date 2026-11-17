import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * nookshop's icon set — interface, so vectors (I4). The furniture on the cards
 * is photography, because a chair is a picture of a chair; these are the
 * category marks, which are ideas.
 */
export type GlyphName = 'search' | 'cart' | 'plus' | 'lamp' | 'sofa' | 'bed' | 'chair' | 'table';

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
          <Circle cx={10.8} cy={10.8} r={6.4} {...s} />
          <Path d="m15.6 15.6 4 4" {...s} />
        </>
      )}

      {name === 'cart' && (
        <>
          <Path d="M3 4h2.4l2.2 10.4h9.6l2-7.2H6.2" {...s} />
          <Circle cx={9} cy={19} r={1.6} {...s} />
          <Circle cx={17} cy={19} r={1.6} {...s} />
        </>
      )}

      {name === 'plus' && <Path d="M12 6.4v11.2M6.4 12h11.2" {...s} />}

      {name === 'lamp' && (
        <>
          <Path d="M8.2 10.4 12 3.8l3.8 6.6Z" {...s} />
          <Path d="M12 10.4v9.4M8.6 19.8h6.8" {...s} />
        </>
      )}

      {name === 'sofa' && (
        <>
          <Path d="M4.4 11.4V8.6a2 2 0 0 1 2-2h11.2a2 2 0 0 1 2 2v2.8" {...s} />
          <Path d="M3 13.6a2 2 0 0 1 4 0v2.2h10v-2.2a2 2 0 0 1 4 0v4.4H3Z" {...s} />
        </>
      )}

      {name === 'bed' && (
        <>
          <Path d="M3.2 18.4v-9M3.2 13.2h17.6v5.2M20.8 13.2v-2a2 2 0 0 0-2-2H10v4" {...s} />
          <Circle cx={6.8} cy={11.4} r={1.8} {...s} />
        </>
      )}

      {name === 'chair' && (
        <>
          <Path d="M6.8 3.8h10.4l-1 9.4H7.8Z" {...s} />
          <Path d="M6.4 13.2h11.2M8 13.2l-.8 7M16 13.2l.8 7" {...s} />
        </>
      )}

      {name === 'table' && (
        <>
          <Path d="M3 9.4h18M5.4 9.4l1.2 9M18.6 9.4l-1.2 9" {...s} />
          <Path d="M7.2 6.2h9.6" {...s} />
        </>
      )}
    </Svg>
  );
}
