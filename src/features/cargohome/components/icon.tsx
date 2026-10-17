import BadgePercent from 'lucide-react-native/icons/badge-percent';
import Bell from 'lucide-react-native/icons/bell';
import ChartNoAxesColumn from 'lucide-react-native/icons/chart-no-axes-column';
import CircleDot from 'lucide-react-native/icons/circle-dot';
import House from 'lucide-react-native/icons/house';
import MapPin from 'lucide-react-native/icons/map-pin';
import Package from 'lucide-react-native/icons/package';
import Search from 'lucide-react-native/icons/search';
import Truck from 'lucide-react-native/icons/truck';

import { cg } from '../theme';

/**
 * Every glyph on the home screen, behind one component.
 *
 * Lucide rather than a Material Symbols subset: the reference's icons are
 * thin, open, round-capped strokes, which is what Lucide draws — and these are
 * SVG paths through `react-native-svg`, so there is no font file to load and
 * no chance of the Android family-name collision two Material subsets invite.
 *
 * Imported one icon per subpath. The package barrel pulls in every icon Lucide
 * ships; `lucide-react-native/icons/x` is a single module and is in the
 * package's own export map, types included.
 *
 * The tab glyphs are keyed by **destination**, not by shape — `history` rather
 * than `package` — so changing which drawing a tab uses is one line here
 * instead of a change to the data file.
 */

const GLYPHS = {
  bell: Bell,
  search: Search,
  pin: MapPin,
  truck: Truck,
  status: CircleDot,
  home: House,
  track: ChartNoAxesColumn,
  history: Package,
  promos: BadgePercent,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = cg.ink,
  filled = false,
  strokeWidth = 1.9,
}: {
  name: IconName;
  size?: number;
  color?: string;
  /** The active tab's house is filled; nothing else on this screen is. */
  filled?: boolean;
  strokeWidth?: number;
}) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph size={size} color={color} strokeWidth={strokeWidth} fill={filled ? color : 'none'} />
  );
}
