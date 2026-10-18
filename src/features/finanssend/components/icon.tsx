import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import CreditCard from 'lucide-react-native/icons/credit-card';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import Landmark from 'lucide-react-native/icons/landmark';
import Search from 'lucide-react-native/icons/search';

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
  back: ArrowLeft,
  bank: Landmark,
  card: CreditCard,
  pick: ChevronDown,
  search: Search,
  more: Ellipsis,
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
