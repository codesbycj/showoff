import ArrowLeftRight from 'lucide-react-native/icons/arrow-left-right';
import CalendarDays from 'lucide-react-native/icons/calendar-days';
import ChartColumnBig from 'lucide-react-native/icons/chart-column-big';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import CreditCard from 'lucide-react-native/icons/credit-card';
import House from 'lucide-react-native/icons/house';
import Leaf from 'lucide-react-native/icons/leaf';
import User from 'lucide-react-native/icons/user';

import { vs } from '../theme';

/**
 * Every glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: this screen's marks are all thin,
 * open, round-capped strokes, which is what Lucide draws — and they arrive as
 * SVG paths through `react-native-svg`, so this showcase ships no font file
 * and cannot hit the Android family-name collision that two icon subsets
 * invite.
 *
 * Imported one icon per subpath. The package barrel pulls in every icon Lucide
 * ships; `lucide-react-native/icons/x` is a single module, types included.
 */
const GLYPHS = {
  back: ChevronLeft,
  calendar: CalendarDays,
  period: ChevronDown,
  more: ChevronRight,
  leaf: Leaf,
  swap: ArrowLeftRight,
  home: House,
  analytics: ChartColumnBig,
  cards: CreditCard,
  profile: User,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = vs.ink,
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
