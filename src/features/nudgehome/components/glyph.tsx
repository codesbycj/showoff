import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * Nudge's icons, drawn — including the flame beside the streak, which the
 * reference sets as an emoji. Emoji differ across Windows, Android and iOS
 * and cannot be checked on the web harness, so it is a path.
 */
export type GlyphName =
  | 'flame'
  | 'paw'
  | 'basket'
  | 'run'
  | 'pencil'
  | 'chevron'
  | 'check'
  | 'kebab'
  | 'clock'
  | 'arrow'
  | 'play'
  | 'plus'
  | 'ghost'
  | 'calendar'
  | 'person';

export function Glyph({
  name,
  size = 20,
  tint = ct.ink,
  strokeWidth = 1.8,
}: {
  name: GlyphName;
  size?: number;
  tint?: string;
  strokeWidth?: number;
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
      {name === 'flame' && (
        <Path
          fill={tint}
          d="M12.6 2.2c.6 3.4 2.6 4.6 4 6.6 1.6 2.2 2 4.4 2 6 0 4.2-3 7-6.6 7s-6.6-2.6-6.6-6.6c0-2 .8-3.8 1.8-5.2.4 1.8 2 2.6 2 2.6s-.4-1-.4-2.2c0-2.8 2-5.8 3.8-8.2Z"
        />
      )}
      {name === 'paw' && (
        <>
          <Circle cx="7.6" cy="9.4" r="2.1" fill={tint} />
          <Circle cx="12" cy="7.8" r="2.2" fill={tint} />
          <Circle cx="16.4" cy="9.4" r="2.1" fill={tint} />
          <Path
            fill={tint}
            d="M12 11.8c2.8 0 5.2 2.1 5.2 4.4 0 1.9-1.5 3-3.2 3-.9 0-1.4-.3-2-.3s-1.1.3-2 .3c-1.7 0-3.2-1.1-3.2-3 0-2.3 2.4-4.4 5.2-4.4Z"
          />
        </>
      )}
      {name === 'basket' && (
        <>
          <Path {...s} d="M3.6 9.4h16.8l-1.6 9a2.4 2.4 0 0 1-2.4 2H7.6a2.4 2.4 0 0 1-2.4-2Z" />
          <Path {...s} d="m8.4 9.4 2.4-5.6M15.6 9.4l-2.4-5.6" />
        </>
      )}
      {name === 'run' && (
        <>
          <Circle cx="14.6" cy="4.8" r="2.2" fill={tint} />
          <Path {...s} strokeWidth={2} d="M8 20.4l2.6-4.6 2.4-2-1-4.4-3.4 2-1.6 3" />
          <Path {...s} strokeWidth={2} d="m13 9.4 3.4 1.8 1 3.6M16.4 11.2l-3.4 3.6 2.6 5.6" />
        </>
      )}
      {name === 'pencil' && <Path {...s} d="M16.6 3.8 20.2 7.4 8.6 19H5v-3.6ZM14.4 6l3.6 3.6" />}
      {name === 'chevron' && <Path {...s} strokeWidth={2} d="m6 9.4 6 6 6-6" />}
      {name === 'check' && <Path {...s} strokeWidth={2.4} d="m5.6 12.4 4.2 4.2 8.6-9" />}
      {name === 'kebab' && (
        <>
          <Circle cx="12" cy="5.4" r="1.7" fill={tint} />
          <Circle cx="12" cy="12" r="1.7" fill={tint} />
          <Circle cx="12" cy="18.6" r="1.7" fill={tint} />
        </>
      )}
      {name === 'clock' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.2" />
          <Path {...s} d="M12 7.6V12l3 1.8" />
        </>
      )}
      {name === 'arrow' && <Path {...s} strokeWidth={2} d="M4.8 12h14M13.2 6.4 18.8 12l-5.6 5.6" />}
      {name === 'play' && <Path fill={tint} d="M7.8 5.2 18.6 12 7.8 18.8Z" />}
      {name === 'plus' && <Path {...s} strokeWidth={2.4} d="M12 5.6v12.8M5.6 12h12.8" />}
      {name === 'ghost' && (
        <Path
          fill={tint}
          d="M12 3.4a7.4 7.4 0 0 1 7.4 7.4v8.4l-2.5-1.8-2.4 1.8-2.5-1.8-2.5 1.8-2.4-1.8-2.5 1.8v-8.4A7.4 7.4 0 0 1 12 3.4Z"
        />
      )}
      {name === 'calendar' && (
        <>
          <Rect {...s} x="3.8" y="5.6" width="16.4" height="14.6" rx="3.4" />
          <Path {...s} d="M3.8 10.2h16.4M8.6 3.6v3.4M15.4 3.6v3.4" />
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
