import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * Every icon on the screen, drawn.
 *
 * These are interface — a bell, a dock, a chevron, a card — and interface is
 * vectors in every real app. Nothing here is a picture *of* anything, so
 * nothing here is a bitmap and nothing here is an emoji (which differs across
 * Windows, Android and iOS and is the one glyph source that cannot be
 * checked on the web render).
 *
 * All paths are authored in a 24x24 box so one `size` scales them together.
 */
export type GlyphName =
  | 'bell'
  | 'eye'
  | 'plus'
  | 'send'
  | 'request'
  | 'grid'
  | 'chevron'
  | 'home'
  | 'chart'
  | 'scan'
  | 'card'
  | 'person'
  | 'dribbble';

export function Glyph({
  name,
  size = 24,
  tint = ct.ink,
  strokeWidth = 1.7,
}: {
  name: GlyphName;
  size?: number;
  tint?: string;
  strokeWidth?: number;
}) {
  const stroke = {
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
          <Path {...stroke} d="M18 8.6a6 6 0 1 0-12 0c0 5.1-1.4 6.6-1.4 6.6h14.8S18 13.7 18 8.6Z" />
          <Path {...stroke} d="M13.7 18.6a2 2 0 0 1-3.4 0" />
        </>
      )}
      {name === 'eye' && (
        <>
          <Path
            {...stroke}
            d="M2.5 12S6 5.9 12 5.9 21.5 12 21.5 12 18 18.1 12 18.1 2.5 12 2.5 12Z"
          />
          <Circle cx="12" cy="12" r="3.1" fill={tint} />
        </>
      )}
      {name === 'plus' && <Path {...stroke} strokeWidth={2.2} d="M12 5.8v12.4M5.8 12h12.4" />}
      {name === 'send' && (
        <>
          <Circle {...stroke} cx="12" cy="12" r="8.4" strokeDasharray="3.6 3.6" />
          <Path {...stroke} d="M14.6 9.4 9.4 14.6M9.4 9.9v4.7h4.7" />
        </>
      )}
      {name === 'request' && (
        <>
          <Circle {...stroke} cx="12" cy="12" r="8.4" strokeDasharray="3.6 3.6" />
          <Path {...stroke} d="M9.4 14.6 14.6 9.4M14.6 14.1V9.4H9.9" />
        </>
      )}
      {name === 'grid' && (
        <>
          <Circle cx="9" cy="9" r="2.5" fill={tint} />
          <Circle cx="15" cy="9" r="2.5" fill={tint} />
          <Circle cx="9" cy="15" r="2.5" fill={tint} />
          <Circle cx="15" cy="15" r="2.5" fill={tint} />
        </>
      )}
      {name === 'chevron' && <Path {...stroke} d="m9.5 5.5 6.5 6.5-6.5 6.5" />}
      {name === 'home' && (
        <Path
          fill={tint}
          d="M5.2 9.4a3 3 0 0 1 1.2-2.4l4.1-3a2.5 2.5 0 0 1 3 0l4.1 3a3 3 0 0 1 1.2 2.4v6.9a3 3 0 0 1-3 3H8.2a3 3 0 0 1-3-3V9.4Z"
        />
      )}
      {name === 'chart' && (
        <>
          <Rect {...stroke} x="4.2" y="4.6" width="15.6" height="14.8" rx="3.4" />
          <Path {...stroke} d="M9 15.2v-3.6M12 15.2V9M15 15.2v-2" />
        </>
      )}
      {name === 'scan' && (
        <>
          <Path
            {...stroke}
            d="M4.8 9V7.2a2.4 2.4 0 0 1 2.4-2.4H9M15 4.8h1.8a2.4 2.4 0 0 1 2.4 2.4V9M19.2 15v1.8a2.4 2.4 0 0 1-2.4 2.4H15M9 19.2H7.2a2.4 2.4 0 0 1-2.4-2.4V15"
          />
          <Path {...stroke} d="M12 5.4v13.2" />
        </>
      )}
      {name === 'card' && (
        <>
          <Rect {...stroke} x="3.2" y="6.2" width="17.6" height="11.6" rx="3" />
          <Path {...stroke} d="M3.2 10.4h17.6" />
        </>
      )}
      {name === 'person' && (
        <>
          <Circle {...stroke} cx="12" cy="12" r="8.6" />
          <Circle {...stroke} cx="12" cy="10" r="2.9" />
          <Path {...stroke} d="M6.9 18.6a5.6 5.6 0 0 1 10.2 0" />
        </>
      )}
      {name === 'dribbble' && (
        <>
          <Circle {...stroke} cx="12" cy="12" r="9" strokeWidth={1.9} />
          <Path {...stroke} strokeWidth={1.9} d="M5.6 5.9c3.9 4.2 6.1 8.6 7 15.1" />
          <Path {...stroke} strokeWidth={1.9} d="M3.2 13.6c5.6-1.3 11.6-.5 16.4 2.6" />
          <Path {...stroke} strokeWidth={1.9} d="M8.1 3.9c3.6 2.6 6.3 6.2 8.1 10.8" />
          <Path {...stroke} strokeWidth={1.9} d="M20.8 9.8c-5.4 1.6-10.6 1-15.2-1.6" />
        </>
      )}
    </Svg>
  );
}
