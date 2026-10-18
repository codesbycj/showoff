import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import CalendarDays from 'lucide-react-native/icons/calendar-days';
import CalendarPlus from 'lucide-react-native/icons/calendar-plus';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import ExternalLink from 'lucide-react-native/icons/external-link';
import Mail from 'lucide-react-native/icons/mail';
import Pencil from 'lucide-react-native/icons/pencil';
import Phone from 'lucide-react-native/icons/phone';
import Share2 from 'lucide-react-native/icons/share-2';
import Star from 'lucide-react-native/icons/star';
import Waypoints from 'lucide-react-native/icons/waypoints';

import { cc } from '../theme';

/**
 * Every stroked glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these marks are thin, open,
 * round-capped strokes, which is what Lucide draws — and they arrive as SVG
 * paths through `react-native-svg`, so this showcase ships no font file and
 * cannot hit the Android family-name collision two icon subsets invite.
 */
const GLYPHS = {
  back: ArrowLeft,
  star: Star,
  network: Waypoints,
  share: Share2,
  more: Ellipsis,
  edit: Pencil,
  mail: Mail,
  call: Phone,
  book: CalendarPlus,
  plan: CalendarDays,
  open: ExternalLink,
  go: ArrowUpRight,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = cc.text,
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
