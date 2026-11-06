import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * Huddle's icons, drawn.
 *
 * The reference sets its category chips with little pictograms and its dock
 * with line icons — interface, so vectors. The reference's calendar and pin
 * on the event screen are full-colour emoji; those are the one glyph source
 * that renders differently on Windows, Android and iOS and cannot be checked
 * on the web render, so they are drawn here too.
 */
export type GlyphName =
  | 'search'
  | 'filter'
  | 'sparkle'
  | 'music'
  | 'coffee'
  | 'camera'
  | 'calendar'
  | 'pin'
  | 'chevron'
  | 'home'
  | 'compass'
  | 'chat'
  | 'person';

export function Glyph({
  name,
  size = 22,
  tint = ct.ink,
  strokeWidth = 1.7,
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
      {name === 'search' && (
        <>
          <Circle {...s} cx="11" cy="11" r="6.6" />
          <Path {...s} d="m16 16 4 4" />
        </>
      )}
      {name === 'filter' && (
        <>
          <Path {...s} d="M4 7.5h16M4 12h16M4 16.5h16" />
          <Circle cx="9" cy="7.5" r="2.4" fill={tint} />
          <Circle cx="15" cy="12" r="2.4" fill={tint} />
          <Circle cx="8" cy="16.5" r="2.4" fill={tint} />
        </>
      )}
      {name === 'sparkle' && (
        <Path
          fill={tint}
          d="M11.2 3.4a.9.9 0 0 1 1.6 0l1.3 3a3 3 0 0 0 1.5 1.5l3 1.3a.9.9 0 0 1 0 1.6l-3 1.3a3 3 0 0 0-1.5 1.5l-1.3 3a.9.9 0 0 1-1.6 0l-1.3-3a3 3 0 0 0-1.5-1.5l-3-1.3a.9.9 0 0 1 0-1.6l3-1.3a3 3 0 0 0 1.5-1.5ZM18.4 15.6a.6.6 0 0 1 1.1 0l.5 1.1a1.8 1.8 0 0 0 .9.9l1.1.5a.6.6 0 0 1 0 1.1l-1.1.5a1.8 1.8 0 0 0-.9.9l-.5 1.1a.6.6 0 0 1-1.1 0l-.5-1.1a1.8 1.8 0 0 0-.9-.9l-1.1-.5a.6.6 0 0 1 0-1.1l1.1-.5a1.8 1.8 0 0 0 .9-.9Z"
        />
      )}
      {name === 'music' && (
        <>
          <Path {...s} d="M9.4 17.6V6.4l8.2-1.8v11" />
          <Circle {...s} cx="7.2" cy="17.8" r="2.3" />
          <Circle {...s} cx="15.4" cy="15.6" r="2.3" />
        </>
      )}
      {name === 'coffee' && (
        <>
          <Path {...s} d="M4.8 8.6h11.4v5.6a4.4 4.4 0 0 1-4.4 4.4H9.2a4.4 4.4 0 0 1-4.4-4.4Z" />
          <Path {...s} d="M16.2 10.1h1.6a2.2 2.2 0 0 1 0 4.4h-1.6" />
          <Path {...s} d="M8.2 3.4v2.2M12 3.4v2.2" />
        </>
      )}
      {name === 'camera' && (
        <>
          <Rect {...s} x="3.4" y="7" width="17.2" height="12.4" rx="3.2" />
          <Circle {...s} cx="12" cy="13.2" r="3.3" />
          <Path {...s} d="M8.6 7l1.1-2.2h4.6L15.4 7" />
        </>
      )}
      {name === 'calendar' && (
        <>
          <Rect {...s} x="3.6" y="5.4" width="16.8" height="15" rx="3.4" />
          <Path {...s} d="M3.6 10.1h16.8M8.4 3.4v3.4M15.6 3.4v3.4" />
          <Circle cx="9" cy="14.4" r="1.3" fill={tint} />
          <Circle cx="13.4" cy="14.4" r="1.3" fill={tint} />
        </>
      )}
      {name === 'pin' && (
        <>
          <Path
            {...s}
            d="M12 21.2s6.6-5.6 6.6-10.4a6.6 6.6 0 1 0-13.2 0C5.4 15.6 12 21.2 12 21.2Z"
          />
          <Circle {...s} cx="12" cy="10.6" r="2.5" />
        </>
      )}
      {name === 'chevron' && <Path {...s} d="m9.6 5.6 6.4 6.4-6.4 6.4" />}
      {name === 'home' && (
        <Path
          {...s}
          d="M4.6 10.4a2.6 2.6 0 0 1 1-2l5.1-3.8a2.2 2.2 0 0 1 2.6 0l5.1 3.8a2.6 2.6 0 0 1 1 2v7a2.8 2.8 0 0 1-2.8 2.8H7.4a2.8 2.8 0 0 1-2.8-2.8Z"
        />
      )}
      {name === 'compass' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.6" />
          <Path {...s} d="m15.2 8.8-1.8 4.6-4.6 1.8 1.8-4.6Z" />
        </>
      )}
      {name === 'chat' && (
        <Path
          {...s}
          d="M20.2 11.6c0 4-3.7 7.2-8.2 7.2a9.4 9.4 0 0 1-2.4-.3L4.8 20l1.3-3.4a6.9 6.9 0 0 1-2.3-5c0-4 3.7-7.2 8.2-7.2s8.2 3.2 8.2 7.2Z"
        />
      )}
      {name === 'person' && (
        <>
          <Circle {...s} cx="12" cy="8.6" r="3.6" />
          <Path {...s} d="M5.2 20a6.8 6.8 0 0 1 13.6 0" />
        </>
      )}
    </Svg>
  );
}
