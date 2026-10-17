import Settings from 'lucide-react-native/icons/settings';
import Svg, { G, Path, Rect } from 'react-native-svg';

import type { TabKey } from '../data/tabs';
import { DOCK_ICON } from '../layout';

/**
 * The dock's four glyphs.
 *
 * Three of them are drawn here rather than taken from Lucide, because the
 * reference's are not the shapes Lucide ships: its house has a door and this
 * one is a bare pentagon, its wallet is an outline and this one is solid with
 * a slot cut out of it, and its bar chart has an axis. The gear is the one
 * Lucide draws, so that one is Lucide's.
 *
 * Sizes are the reference's: the house 20.7 by 21.7, the card 22.6 by 17.9,
 * the bars 21.7 by 19.8, the gear 23.6 by 22.6 — all on a 1.7dp stroke except
 * the card, which is filled. The viewBox is 24 units at 24dp, so every number
 * in the paths below is a measurement in dp.
 */
export type DockName = TabKey;

export function DockGlyph({
  name,
  color,
  size = DOCK_ICON,
}: {
  name: DockName;
  color: string;
  size?: number;
}) {
  if (name === 'settings') {
    // Lucide's gear draws its ink at about 0.82 of the size it is given,
    // so 26 lands the 23.6dp the reference measures.
    return <Settings size={26} color={color} strokeWidth={1.7} />;
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'home' ? (
        <Path
          d="M12 1.9 L21.35 11 L21.35 22.55 L2.65 22.55 L2.65 11 Z"
          fill="none"
          stroke={color}
          strokeWidth={1.7}
          strokeLinejoin="round"
        />
      ) : null}

      {name === 'cards' ? (
        <G>
          <Rect x={0.7} y={3.05} width={22.6} height={17.9} rx={3.4} fill={color} />
          <Rect x={3.1} y={5.9} width={17.8} height={2.8} rx={1.2} fill="#fbfbfb" />
          {/* The slot: a shallow tongue hanging off the card's lower edge. */}
          <Path d="M9.2 13.2 L14.8 13.2 L12 16.6 Z" fill="#fbfbfb" />
        </G>
      ) : null}

      {name === 'analytics' ? (
        <G fill="none" stroke={color} strokeWidth={1.7} strokeLinejoin="round">
          <Rect x={2.0} y={13.5} width={5.4} height={8.55} rx={1.3} />
          <Rect x={9.3} y={8.6} width={5.4} height={13.45} rx={1.3} />
          <Rect x={16.6} y={3.8} width={5.4} height={18.25} rx={1.3} />
        </G>
      ) : null}
    </Svg>
  );
}
