import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import SlidersHorizontal from 'lucide-react-native/icons/sliders-horizontal';
import TrendingDown from 'lucide-react-native/icons/trending-down';
import TrendingUp from 'lucide-react-native/icons/trending-up';

import { ps } from '../theme';

/**
 * Every glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these marks are thin, open,
 * round-capped strokes, which is what Lucide draws — and they arrive as SVG
 * paths through `react-native-svg`, so this showcase ships no font file and
 * cannot hit the Android family-name collision that two icon subsets invite.
 */
const GLYPHS = {
  back: ChevronLeft,
  more: Ellipsis,
  filter: SlidersHorizontal,
  up: TrendingUp,
  down: TrendingDown,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = ps.text,
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
