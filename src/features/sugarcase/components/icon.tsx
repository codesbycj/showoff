import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import CalendarDays from 'lucide-react-native/icons/calendar-days';
import Check from 'lucide-react-native/icons/check';
import Database from 'lucide-react-native/icons/database';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import Phone from 'lucide-react-native/icons/phone';
import Plus from 'lucide-react-native/icons/plus';
import Search from 'lucide-react-native/icons/search';
import Send from 'lucide-react-native/icons/send';
import Share2 from 'lucide-react-native/icons/share-2';
import Star from 'lucide-react-native/icons/star';

import { sc } from '../theme';

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
  plus: Plus,
  share: Share2,
  calendar: CalendarDays,
  search: Search,
  star: Star,
  phone: Phone,
  data: Database,
  send: Send,
  check: Check,
  more: Ellipsis,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = sc.ink,
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
