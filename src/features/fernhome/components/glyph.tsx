import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/** Fern's icons, drawn. */
export type GlyphName =
  | 'in'
  | 'out'
  | 'plus'
  | 'grid'
  | 'inbox'
  | 'eyeOff'
  | 'copy'
  | 'trend'
  | 'home'
  | 'stats'
  | 'target'
  | 'person';

export function Glyph({
  name,
  size = 22,
  tint = ct.onGround,
  strokeWidth = 1.7,
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
      {name === 'in' && (
        <>
          <Path {...s} d="M19.4 4.6 9.6 14.4" />
          <Path {...s} d="M10.6 7.8v6.6h6.6" />
          <Path
            {...s}
            d="M19.4 14.6v2.8a2.4 2.4 0 0 1-2.4 2.4H6.6a2.4 2.4 0 0 1-2.4-2.4V7a2.4 2.4 0 0 1 2.4-2.4h2.8"
          />
        </>
      )}
      {name === 'out' && (
        <>
          <Path {...s} d="M9.6 14.4 19.4 4.6" />
          <Path {...s} d="M13.4 4.6h6v6" />
          <Path
            {...s}
            d="M19.4 14.6v2.8a2.4 2.4 0 0 1-2.4 2.4H6.6a2.4 2.4 0 0 1-2.4-2.4V7a2.4 2.4 0 0 1 2.4-2.4h2.8"
          />
        </>
      )}
      {name === 'plus' && <Path {...s} strokeWidth={2} d="M12 5.8v12.4M5.8 12h12.4" />}
      {name === 'grid' && (
        <>
          <Circle cx="9" cy="9" r="1.9" fill={tint} />
          <Circle cx="15" cy="9" r="1.9" fill={tint} />
          <Circle cx="9" cy="15" r="1.9" fill={tint} />
          <Circle cx="15" cy="15" r="1.9" fill={tint} />
        </>
      )}
      {name === 'inbox' && (
        <>
          <Rect {...s} x="3.6" y="5.4" width="16.8" height="13.2" rx="3.2" />
          <Path {...s} d="M3.6 9.2h7.6M3.6 13h5.6" />
          <Circle cx="17" cy="9" r="2.6" fill={tint} />
        </>
      )}
      {name === 'eyeOff' && (
        <>
          <Path {...s} d="M4 4.4 20 20.4" />
          <Path {...s} d="M9.3 6.2A8.6 8.6 0 0 1 12 5.9c6 0 9.5 6.1 9.5 6.1a16 16 0 0 1-3.1 3.8" />
          <Path {...s} d="M6.4 8A16.3 16.3 0 0 0 2.5 12s3.5 6.1 9.5 6.1a8.9 8.9 0 0 0 3.2-.6" />
          <Path {...s} d="M10.2 10.3a2.6 2.6 0 0 0 3.5 3.6" />
        </>
      )}
      {name === 'copy' && (
        <>
          <Rect {...s} x="8.6" y="8.6" width="11" height="11" rx="2.6" />
          <Path
            {...s}
            d="M15.4 8.6V7a2.6 2.6 0 0 0-2.6-2.6H7A2.6 2.6 0 0 0 4.4 7v5.8A2.6 2.6 0 0 0 7 15.4h1.6"
          />
        </>
      )}
      {name === 'trend' && (
        <>
          <Path {...s} strokeWidth={2} d="M4.6 15.4 9.4 10.6l3 3 6.4-6.4" />
          <Path {...s} strokeWidth={2} d="M14.6 7.2h4.6v4.6" />
        </>
      )}
      {name === 'home' && (
        <Path
          {...s}
          fill={filled ? tint : 'none'}
          d="M5 10.6a2.5 2.5 0 0 1 .95-1.96l5.05-4a1.6 1.6 0 0 1 2 0l5.05 4A2.5 2.5 0 0 1 19 10.6v6.9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 17.5Z"
        />
      )}
      {name === 'stats' && (
        <>
          <Rect {...s} x="4.4" y="4.4" width="15.2" height="15.2" rx="4" />
          <Path {...s} d="M8.8 15.2v-2.8M12 15.2V9.4M15.2 15.2v-1.6" />
        </>
      )}
      {name === 'target' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8" />
          <Circle {...s} cx="12" cy="12" r="3.2" />
        </>
      )}
      {name === 'person' && (
        <>
          <Circle {...s} cx="12" cy="8.4" r="3.4" />
          <Path {...s} d="M5.8 19.8a6.4 6.4 0 0 1 12.4 0" />
        </>
      )}
    </Svg>
  );
}
