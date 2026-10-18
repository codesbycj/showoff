import Activity from 'lucide-react-native/icons/activity';
import ArrowDownLeft from 'lucide-react-native/icons/arrow-down-left';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import Bell from 'lucide-react-native/icons/bell';
import ChartLine from 'lucide-react-native/icons/chart-line';
import CreditCard from 'lucide-react-native/icons/credit-card';
import Eye from 'lucide-react-native/icons/eye';
import House from 'lucide-react-native/icons/house';
import Plus from 'lucide-react-native/icons/plus';
import ScanLine from 'lucide-react-native/icons/scan-line';

import { fn } from '../theme';

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
  eye: Eye,
  request: ArrowDownLeft,
  transfer: ArrowUpRight,
  plus: Plus,
  scan: ScanLine,
  home: House,
  statistic: ChartLine,
  activity: Activity,
  card: CreditCard,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = fn.ink,
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
