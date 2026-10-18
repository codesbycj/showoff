import ArrowRight from 'lucide-react-native/icons/arrow-right';
import Check from 'lucide-react-native/icons/check';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import Gauge from 'lucide-react-native/icons/gauge';
import Rabbit from 'lucide-react-native/icons/rabbit';
import SlidersHorizontal from 'lucide-react-native/icons/sliders-horizontal';
import Star from 'lucide-react-native/icons/star';
import Zap from 'lucide-react-native/icons/zap';

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
  filter: SlidersHorizontal,
  check: Check,
  star: Star,
  next: ChevronRight,
  go: ArrowRight,
  range: Gauge,
  speed: Rabbit,
  power: Zap,
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
