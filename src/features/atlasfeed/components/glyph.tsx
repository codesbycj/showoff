import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/** Atlas's icons, drawn. */
export type GlyphName =
  'bell' | 'plus' | 'heart' | 'comment' | 'pentagon' | 'image' | 'clock' | 'friends';

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
      {name === 'bell' && (
        <>
          <Path {...s} d="M18 9.2a6 6 0 1 0-12 0c0 5-1.4 6.4-1.4 6.4h14.8S18 14.2 18 9.2Z" />
          <Path {...s} d="M13.7 19a2 2 0 0 1-3.4 0" />
        </>
      )}
      {name === 'plus' && <Path {...s} strokeWidth={2} d="M12 6v12M6 12h12" />}
      {name === 'heart' && (
        <Path
          fill={filled ? tint : 'none'}
          stroke={tint}
          strokeWidth={filled ? 0 : strokeWidth}
          d="M12 20.4s-7.8-4.6-7.8-10a4.5 4.5 0 0 1 7.8-3.1 4.5 4.5 0 0 1 7.8 3.1c0 5.4-7.8 10-7.8 10Z"
        />
      )}
      {name === 'comment' && (
        <Path
          {...s}
          d="M20.2 11.4c0 3.9-3.7 7-8.2 7a9.5 9.5 0 0 1-2.5-.3L4.8 20l1.4-3.5a6.8 6.8 0 0 1-2.4-5.1c0-3.9 3.7-7 8.2-7s8.2 3.1 8.2 7Z"
        />
      )}
      {name === 'pentagon' && (
        <Path
          fill={filled ? tint : 'none'}
          stroke={tint}
          strokeWidth={filled ? 0 : strokeWidth}
          d="M12 3.6l7.4 5.4-2.8 8.7H7.4L4.6 9Z"
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
      {name === 'friends' && (
        <>
          <Circle {...s} cx="10" cy="8.6" r="3.4" />
          <Path {...s} d="M3.8 19.6a6.2 6.2 0 0 1 12.4 0" />
          <Path {...s} d="M16.4 6.2a3.4 3.4 0 0 1 0 6.4M17.4 14.6a5.8 5.8 0 0 1 3.4 5" />
        </>
      )}
    </Svg>
  );
}
