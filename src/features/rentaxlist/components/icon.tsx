import ArrowRight from 'lucide-react-native/icons/arrow-right';
import Bell from 'lucide-react-native/icons/bell';
import Bookmark from 'lucide-react-native/icons/bookmark';
import CalendarDays from 'lucide-react-native/icons/calendar-days';
import ChartPie from 'lucide-react-native/icons/chart-pie';
import Check from 'lucide-react-native/icons/check';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import Gauge from 'lucide-react-native/icons/gauge';
import LayoutGrid from 'lucide-react-native/icons/layout-grid';
import Plus from 'lucide-react-native/icons/plus';
import Rows3 from 'lucide-react-native/icons/rows-3';
import Star from 'lucide-react-native/icons/star';
import User from 'lucide-react-native/icons/user';

import { rx } from '../theme';

/**
 * Every stroked glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these marks are thin, open,
 * round-capped strokes, which is what Lucide draws — and they arrive as SVG
 * paths through `react-native-svg`, so this showcase ships no font file and
 * cannot hit the Android family-name collision two icon subsets invite.
 */
const GLYPHS = {
  bell: Bell,
  plus: Plus,
  calendar: CalendarDays,
  check: Check,
  pick: ChevronDown,
  rows: Rows3,
  grid: LayoutGrid,
  range: Gauge,
  star: Star,
  go: ArrowRight,
  browse: LayoutGrid,
  stats: ChartPie,
  saved: Bookmark,
  profile: User,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = rx.onDark,
  strokeWidth = 1.9,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const Glyph = GLYPHS[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} />;
}
