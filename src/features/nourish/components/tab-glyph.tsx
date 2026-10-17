import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import type { TabKey } from '../data/home';
import { DOCK_ICON } from '../layout';

/**
 * The dock's four glyphs, drawn rather than taken from an icon set.
 *
 * Lucide is stroked and these are **solid**, which is not a weight you can ask
 * a stroke icon for — a filled house and a 1.8dp outline of a house are
 * different drawings, and the reference's dock is unmistakably the first. The
 * two on the Today cards are Lucide's, because those ones really are thin
 * outlines; see `goal-glyph.tsx`.
 *
 * The viewBox is 24 units rendered at `DOCK_ICON` dp, so the numbers below are
 * twenty-fourths of the glyph box rather than dp — which is what keeps the set
 * consistent when the dock's icon size changes.
 */
export function TabGlyph({
  name,
  color,
  size = DOCK_ICON,
}: {
  name: TabKey;
  color: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' ? (
        <Path
          d="M12 2.4 L22 11 V20.2 A1.8 1.8 0 0 1 20.2 22 H3.8 A1.8 1.8 0 0 1 2 20.2 V11 Z"
          fill={color}
        />
      ) : null}

      {name === 'journey' ? (
        <G fill={color}>
          <Rect x={2.6} y={13.4} width={4.2} height={8.6} rx={2.1} />
          <Rect x={9.9} y={8.2} width={4.2} height={13.8} rx={2.1} />
          <Rect x={17.2} y={11} width={4.2} height={11} rx={2.1} />
          {/* The dot the reference floats over the shortest bar. */}
          <Circle cx={4.7} cy={9.2} r={1.9} />
        </G>
      ) : null}

      {name === 'explore' ? (
        <G fill={color}>
          {/* The fork: three tines into a shared neck, then the stem. */}
          <Rect x={3.1} y={2.2} width={1.7} height={6.4} rx={0.85} />
          <Rect x={6.3} y={2.2} width={1.7} height={6.4} rx={0.85} />
          <Path d="M2.4 8 H8.7 A0.9 0.9 0 0 1 9.6 9 C9.6 11 8.2 12.3 6.6 12.6 V21.1 A0.95 0.95 0 0 1 4.7 21.1 V12.6 C3.1 12.3 1.5 11 1.5 9 A0.9 0.9 0 0 1 2.4 8 Z" />
          {/* The knife: a blade that tapers into its handle. */}
          <Path d="M18.6 2.2 C20.6 3.6 21.8 6.5 21.8 9.4 C21.8 11.6 20.9 13 19.4 13.4 V21.1 A0.95 0.95 0 0 1 17.5 21.1 V3.2 C17.5 2.2 18 1.8 18.6 2.2 Z" />
        </G>
      ) : null}

      {name === 'profile' ? (
        <G fill={color}>
          <Circle cx={12} cy={7.6} r={4.3} />
          <Path d="M12 13.6 C16.4 13.6 20 16.9 20 21 A1 1 0 0 1 19 22 H5 A1 1 0 0 1 4 21 C4 16.9 7.6 13.6 12 13.6 Z" />
        </G>
      ) : null}
    </Svg>
  );
}
