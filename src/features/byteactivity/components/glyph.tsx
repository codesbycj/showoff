import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/** Byte's icons: the four actions, the dock, and the search. */
export type GlyphName =
  | 'search'
  | 'topup'
  | 'transfer'
  | 'bill'
  | 'other'
  | 'plus'
  | 'home'
  | 'stat'
  | 'bell'
  | 'person'
  | 'scan'
  | 'wordmark'
  | 'back'
  | 'kebab'
  | 'chevron'
  | 'bag'
  | 'car'
  | 'cup';

export function Glyph({
  name,
  size = 22,
  tint = ct.onDeep,
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
      {name === 'search' && (
        <>
          <Circle {...s} cx="11" cy="11" r="6.4" />
          <Path {...s} d="m15.8 15.8 4 4" />
        </>
      )}
      {name === 'topup' && (
        <>
          <Path {...s} d="M4.6 12a7.4 7.4 0 1 0 2.6-5.6" />
          <Path {...s} d="M4.4 4.2v3.6h3.6" />
          <Path {...s} d="M9.8 14.2 14.2 9.8M10.3 9.8h3.9v3.9" />
        </>
      )}
      {name === 'transfer' && (
        <>
          <Path {...s} d="M4.4 9h13M14 5.6 17.4 9 14 12.4" />
          <Path {...s} d="M19.6 15h-13M10 11.6 6.6 15 10 18.4" />
        </>
      )}
      {name === 'bill' && (
        <>
          <Rect {...s} x="3.4" y="6.4" width="17.2" height="11.2" rx="2.8" />
          <Path {...s} d="M3.4 10.2h17.2M6.8 14.2h3.4" />
        </>
      )}
      {name === 'other' && (
        <>
          <Rect {...s} x="4.4" y="4.4" width="6" height="6" rx="1.8" />
          <Rect {...s} x="13.6" y="4.4" width="6" height="6" rx="1.8" />
          <Rect {...s} x="4.4" y="13.6" width="6" height="6" rx="1.8" />
          <Rect {...s} x="13.6" y="13.6" width="6" height="6" rx="1.8" />
        </>
      )}
      {name === 'plus' && <Path {...s} strokeWidth={2} d="M12 6v12M6 12h12" />}
      {name === 'home' && (
        <Path
          {...s}
          fill={filled ? tint : 'none'}
          d="M5 10.6a2.5 2.5 0 0 1 .95-1.96l5.05-4a1.6 1.6 0 0 1 2 0l5.05 4A2.5 2.5 0 0 1 19 10.6v6.9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 17.5Z"
        />
      )}
      {name === 'stat' && (
        <>
          <Path {...s} d="M4 16.2 9 11l3.4 3.4L19.6 7" />
          <Path {...s} d="M15.6 7h4v4" />
        </>
      )}
      {name === 'bell' && (
        <>
          <Path {...s} d="M18 9.2a6 6 0 1 0-12 0c0 5-1.4 6.4-1.4 6.4h14.8S18 14.2 18 9.2Z" />
          <Path {...s} d="M13.7 19a2 2 0 0 1-3.4 0" />
        </>
      )}
      {name === 'person' && (
        <>
          <Circle {...s} cx="12" cy="8.2" r="3.4" />
          <Path {...s} d="M5.6 19.6a6.4 6.4 0 0 1 12.8 0" />
        </>
      )}
      {name === 'scan' && (
        <>
          <Path
            {...s}
            d="M5 9.4V7.6A2.6 2.6 0 0 1 7.6 5h1.8M14.6 5h1.8A2.6 2.6 0 0 1 19 7.6v1.8M19 14.6v1.8a2.6 2.6 0 0 1-2.6 2.6h-1.8M9.4 19H7.6A2.6 2.6 0 0 1 5 16.4v-1.8"
          />
          <Rect {...s} x="9.2" y="9.2" width="5.6" height="5.6" rx="1.6" />
        </>
      )}
      {name === 'back' && <Path {...s} strokeWidth={2} d="m14.2 5.6-6.4 6.4 6.4 6.4" />}
      {name === 'chevron' && <Path {...s} strokeWidth={2} d="m9.8 5.6 6.4 6.4-6.4 6.4" />}
      {name === 'kebab' && (
        <>
          <Circle cx="12" cy="5.4" r="1.8" fill={tint} />
          <Circle cx="12" cy="12" r="1.8" fill={tint} />
          <Circle cx="12" cy="18.6" r="1.8" fill={tint} />
        </>
      )}
      {name === 'bag' && (
        <>
          <Path {...s} d="M5.4 8.2h13.2l-1 11a2.4 2.4 0 0 1-2.4 2.2H8.8a2.4 2.4 0 0 1-2.4-2.2Z" />
          <Path {...s} d="M9 8.2V6.6a3 3 0 0 1 6 0v1.6" />
        </>
      )}
      {name === 'car' && (
        <>
          <Path
            {...s}
            d="M4 15.4v-2.2l1.8-4.4A2.4 2.4 0 0 1 8 7.2h8a2.4 2.4 0 0 1 2.2 1.6l1.8 4.4v2.2a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 15.4Z"
          />
          <Path {...s} d="M4.6 13h14.8" />
          <Circle cx="8" cy="15" r="1.3" fill={tint} />
          <Circle cx="16" cy="15" r="1.3" fill={tint} />
        </>
      )}
      {name === 'cup' && (
        <>
          <Path {...s} d="M5.4 8.6h11v6a4.4 4.4 0 0 1-4.4 4.4H9.8a4.4 4.4 0 0 1-4.4-4.4Z" />
          <Path {...s} d="M16.4 10.2h1.4a2.1 2.1 0 0 1 0 4.2h-1.4" />
          <Path {...s} d="M8.6 3.6v2M12 3.6v2" />
        </>
      )}
      {name === 'wordmark' && (
        <Path fill={tint} d="M2 14.6 8.6 6h4.2l-6.6 8.6Zm7.4 0L16 6h4.2l-6.6 8.6Z" />
      )}
    </Svg>
  );
}
