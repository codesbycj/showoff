import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/** Pally's icons, drawn. */
export type GlyphName =
  'back' | 'kebab' | 'shots' | 'paw' | 'spark' | 'note' | 'home' | 'image' | 'clock' | 'person';

export function Glyph({
  name,
  size = 20,
  tint = ct.ink,
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
      {name === 'back' && <Path {...s} strokeWidth={2.2} d="m14.2 5.6-6.4 6.4 6.4 6.4" />}
      {name === 'kebab' && (
        <>
          <Circle cx="12" cy="5.4" r="1.8" fill={tint} />
          <Circle cx="12" cy="12" r="1.8" fill={tint} />
          <Circle cx="12" cy="18.6" r="1.8" fill={tint} />
        </>
      )}
      {name === 'shots' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.4" />
          <Path {...s} d="M5.8 6.4c3.6 3.8 5.7 8 6.5 13.9" />
          <Path {...s} d="M3.8 13.4c5.2-1.2 10.8-.4 15.2 2.4" />
          <Path {...s} d="M20.2 9.6c-5 1.4-9.8.9-14-1.5" />
        </>
      )}
      {name === 'paw' && (
        <>
          <Circle cx="7.6" cy="9.4" r="2.2" fill={tint} />
          <Circle cx="12" cy="7.6" r="2.3" fill={tint} />
          <Circle cx="16.4" cy="9.4" r="2.2" fill={tint} />
          <Path
            fill={tint}
            d="M12 11.6c2.9 0 5.4 2.2 5.4 4.6 0 2-1.6 3.2-3.4 3.2-.9 0-1.4-.3-2-.3s-1.1.3-2 .3c-1.8 0-3.4-1.2-3.4-3.2 0-2.4 2.5-4.6 5.4-4.6Z"
          />
        </>
      )}
      {name === 'spark' && (
        <Path
          fill={tint}
          d="M11.3 3.6a.8.8 0 0 1 1.4 0l1.4 3.3a3 3 0 0 0 1.6 1.6l3.3 1.4a.8.8 0 0 1 0 1.4l-3.3 1.4a3 3 0 0 0-1.6 1.6l-1.4 3.3a.8.8 0 0 1-1.4 0l-1.4-3.3a3 3 0 0 0-1.6-1.6l-3.3-1.4a.8.8 0 0 1 0-1.4l3.3-1.4a3 3 0 0 0 1.6-1.6Z"
        />
      )}
      {name === 'note' && (
        <>
          <Path {...s} d="M9.6 17.4V6.6l8-1.7v10.9" />
          <Circle {...s} cx="7.4" cy="17.6" r="2.2" />
          <Circle {...s} cx="15.4" cy="15.6" r="2.2" />
        </>
      )}
      {name === 'home' && (
        <Path
          {...s}
          fill={filled ? tint : 'none'}
          d="M5 10.6a2.5 2.5 0 0 1 .95-1.96l5.05-4a1.6 1.6 0 0 1 2 0l5.05 4A2.5 2.5 0 0 1 19 10.6v6.9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 17.5Z"
        />
      )}
      {name === 'image' && (
        <>
          <Rect {...s} x="3.6" y="4.8" width="16.8" height="14.4" rx="3.4" />
          <Circle {...s} cx="9" cy="10" r="1.8" />
          <Path {...s} d="m4.6 17.4 4.8-4.6 4 3.6 3-2.6 4 3.8" />
        </>
      )}
      {name === 'clock' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.4" />
          <Path {...s} d="M12 7.4V12l3 1.8" />
        </>
      )}
      {name === 'person' && (
        <>
          <Circle {...s} fill={filled ? tint : 'none'} cx="12" cy="8.4" r="3.6" />
          <Path {...s} fill={filled ? tint : 'none'} d="M5.4 20a6.6 6.6 0 0 1 13.2 0Z" />
        </>
      )}
    </Svg>
  );
}
