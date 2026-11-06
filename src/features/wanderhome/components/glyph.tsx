import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/** Wander's icons, drawn — a search, a filter, a pin, a star, and the dock. */
export type GlyphName = 'search' | 'sliders' | 'pin' | 'star' | 'heart' | 'home' | 'map' | 'person';

export function Glyph({
  name,
  size = 22,
  tint = ct.onPage,
  strokeWidth = 1.8,
  filled = false,
}: {
  name: GlyphName;
  size?: number;
  tint?: string;
  strokeWidth?: number;
  filled?: boolean;
}) {
  const s = {
    stroke: tint,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'search' && (
        <>
          <Circle {...s} cx="11" cy="11" r="6.4" />
          <Path {...s} d="m15.8 15.8 4 4" />
        </>
      )}
      {name === 'sliders' && (
        <>
          <Path {...s} d="M8.4 4.6v14.8M15.6 4.6v14.8" />
          <Circle cx="8.4" cy="9" r="2.6" fill={tint} />
          <Circle cx="15.6" cy="15.4" r="2.6" fill={tint} />
        </>
      )}
      {name === 'pin' && (
        <>
          <Path {...s} d="M12 21s6.2-5.4 6.2-10a6.2 6.2 0 1 0-12.4 0C5.8 15.6 12 21 12 21Z" />
          <Circle {...s} cx="12" cy="10.8" r="2.3" />
        </>
      )}
      {name === 'star' && (
        <Path
          fill={tint}
          d="M12 2.8 14.8 8.6l6.4.9-4.6 4.5 1.1 6.4L12 17.4 6.3 20.4l1.1-6.4L2.8 9.5l6.4-.9Z"
        />
      )}
      {name === 'heart' && (
        <Path
          {...s}
          fill={filled ? tint : 'none'}
          d="M12 20.4s-7.8-4.6-7.8-10a4.5 4.5 0 0 1 7.8-3.1 4.5 4.5 0 0 1 7.8 3.1c0 5.4-7.8 10-7.8 10Z"
        />
      )}
      {name === 'home' && (
        <Path
          {...s}
          fill={filled ? tint : 'none'}
          d="M4.8 10.6a2.5 2.5 0 0 1 .95-1.96l5.2-4.1a1.7 1.7 0 0 1 2.1 0l5.2 4.1a2.5 2.5 0 0 1 .95 1.96v6.8a2.6 2.6 0 0 1-2.6 2.6H7.4a2.6 2.6 0 0 1-2.6-2.6Z"
        />
      )}
      {name === 'map' && (
        <>
          <Path
            {...s}
            fill={filled ? tint : 'none'}
            d="M9 4.4 3.8 6.6v13l5.2-2.2 6 2.2 5.2-2.2v-13L15 6.6Z"
          />
          <Path {...s} stroke={filled ? ct.sheet : tint} d="M9 4.4v13.2M15 6.6v13" />
        </>
      )}
      {name === 'person' && (
        <>
          <Circle {...s} cx="12" cy="8.4" r="3.6" />
          <Path {...s} d="M5.4 20a6.6 6.6 0 0 1 13.2 0" />
        </>
      )}
    </Svg>
  );
}
