import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import Bell from 'lucide-react-native/icons/bell';
import CircleAlert from 'lucide-react-native/icons/circle-alert';
import CircleCheck from 'lucide-react-native/icons/circle-check';
import MessageCircleQuestion from 'lucide-react-native/icons/message-circle-question-mark';
import CircleX from 'lucide-react-native/icons/circle-x';
import House from 'lucide-react-native/icons/house';
import Package from 'lucide-react-native/icons/package';
import Plus from 'lucide-react-native/icons/plus';
import Search from 'lucide-react-native/icons/search';
import SlidersHorizontal from 'lucide-react-native/icons/sliders-horizontal';
import Truck from 'lucide-react-native/icons/truck';
import User from 'lucide-react-native/icons/user';

import { dd } from '../theme';

/**
 * Every stroked glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these marks are thin, open,
 * round-capped strokes, which is what Lucide draws — and they arrive as SVG
 * paths through `react-native-svg`, so this showcase ships no font file and
 * cannot hit the Android family-name collision two icon subsets invite.
 *
 * The four objects on the stat tiles are *not* here: those are solid, two-tone
 * little things, which is a different drawing from a stroke. See
 * `tile-glyph.tsx`.
 */
const GLYPHS = {
  help: MessageCircleQuestion,
  bell: Bell,
  search: Search,
  filter: SlidersHorizontal,
  go: ArrowUpRight,
  ok: CircleCheck,
  low: CircleAlert,
  out: CircleX,
  plus: Plus,
  home: House,
  delivery: Truck,
  products: Package,
  profile: User,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = dd.ink,
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
