import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import Heart from 'lucide-react-native/icons/heart';
import House from 'lucide-react-native/icons/house';
import Menu from 'lucide-react-native/icons/menu';
import Search from 'lucide-react-native/icons/search';
import ShoppingBag from 'lucide-react-native/icons/shopping-bag';
import SlidersHorizontal from 'lucide-react-native/icons/sliders-horizontal';
import Truck from 'lucide-react-native/icons/truck';
import User from 'lucide-react-native/icons/user';

import { vl } from '../theme';

/**
 * Every glyph on the screen, behind one component.
 *
 * Lucide rather than a Material Symbols subset, which is what the other
 * showcases here cut. Three reasons, and the first is the only one about
 * looks: the reference's icons are thin, open, round-capped strokes, which is
 * exactly what Lucide draws and what Material Symbols only approximates at its
 * lightest weight. The other two are about risk — these are SVG paths through
 * `react-native-svg`, so there is no font file to load, and no chance of the
 * Android family-name collision that two Material subsets in one app invite.
 *
 * Imported one icon per subpath. The package barrel pulls in every icon Lucide
 * ships, which Metro then has to parse in full; `lucide-react-native/icons/x`
 * is a single module and is in the package's own export map, types included.
 *
 * `strokeWidth` is set here and nowhere else, so the whole screen keeps one
 * line weight. Lucide's own default is 2 at a 24px box, which reads heavy at
 * the 20-22px these are drawn at.
 */

const GLYPHS = {
  menu: Menu,
  bag: ShoppingBag,
  search: Search,
  filter: SlidersHorizontal,
  arrow: ArrowUpRight,
  heart: Heart,
  home: House,
  orders: Truck,
  saved: Heart,
  account: User,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = vl.ink,
  filled = false,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  color?: string;
  /** Only meaningful on `heart`/`saved`, which is the one glyph with a state. */
  filled?: boolean;
  strokeWidth?: number;
}) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      fill={filled ? color : 'none'}
    />
  );
}
