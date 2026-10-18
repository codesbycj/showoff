import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import type { ScatterName } from '../data/onboarding';
import { pt } from '../theme';

/**
 * The four outline marks scattered round the artwork.
 *
 * Drawn rather than taken from an icon set: the reference's are a particular
 * flat line-art dialect — uniform stroke, round caps, no detail below about
 * three strokes per shape — and mixing a general-purpose icon set in with a
 * hand-drawn illustration is immediately visible as two different hands.
 *
 * The viewBox is 24 units at whatever dp the caller asks for, so each path is
 * in twenty-fourths rather than in dp, and the set stays consistent when the
 * sizes change.
 */
export function ScatterGlyph({ name, size }: { name: ScatterName; size: number }) {
  const stroke = { stroke: pt.ink, strokeWidth: 1.7, fill: 'none' as const };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'coin' ? (
        <G {...stroke} strokeLinecap="round">
          <Circle cx={12} cy={12} r={9.4} />
          <Path d="M12 6.6 V17.4" />
          <Path d="M14.8 9.1 C14.8 8 13.5 7.4 12 7.4 C10.5 7.4 9.3 8.1 9.3 9.4 C9.3 12.4 14.8 11.2 14.8 14.4 C14.8 15.8 13.5 16.6 12 16.6 C10.5 16.6 9.2 16 9.2 14.9" />
        </G>
      ) : null}

      {name === 'scan' ? (
        <G {...stroke} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M3.2 8.2 V4.8 A1.6 1.6 0 0 1 4.8 3.2 H8.2" />
          <Path d="M15.8 3.2 H19.2 A1.6 1.6 0 0 1 20.8 4.8 V8.2" />
          <Path d="M20.8 15.8 V19.2 A1.6 1.6 0 0 1 19.2 20.8 H15.8" />
          <Path d="M8.2 20.8 H4.8 A1.6 1.6 0 0 1 3.2 19.2 V15.8" />
          <Rect x={8.4} y={8.4} width={3.1} height={3.1} rx={0.7} />
          <Rect x={12.5} y={8.4} width={3.1} height={3.1} rx={0.7} />
          <Rect x={8.4} y={12.5} width={3.1} height={3.1} rx={0.7} />
          <Rect x={12.5} y={12.5} width={3.1} height={3.1} rx={0.7} />
        </G>
      ) : null}

      {name === 'card' ? (
        <G {...stroke} strokeLinecap="round" strokeLinejoin="round">
          <Rect x={2.2} y={5.6} width={19.6} height={12.8} rx={2.6} />
          <Path d="M2.2 10 H21.8" />
          <Path d="M5.6 14.6 H9.4" />
        </G>
      ) : null}

      {name === 'receipt' ? (
        <G {...stroke} strokeLinecap="round" strokeLinejoin="round">
          <Path d="M5 2.8 H19 V21.2 L16.2 19.4 L13.4 21.2 L10.6 19.4 L7.8 21.2 L5 19.4 Z" />
          <Path d="M8.6 8 H15.4" />
          <Path d="M8.6 12 H15.4" />
        </G>
      ) : null}
    </Svg>
  );
}
