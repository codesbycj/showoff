import Bell from 'lucide-react-native/icons/bell';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import House from 'lucide-react-native/icons/house';
import Plus from 'lucide-react-native/icons/plus';
import Receipt from 'lucide-react-native/icons/receipt';
import Repeat from 'lucide-react-native/icons/repeat';
import ScanLine from 'lucide-react-native/icons/scan-line';
import SendHorizontal from 'lucide-react-native/icons/send-horizontal';
import ShoppingBasket from 'lucide-react-native/icons/shopping-basket';
import Smartphone from 'lucide-react-native/icons/smartphone';
import TrendingUp from 'lucide-react-native/icons/trending-up';

import { ph } from '../theme';

/**
 * Every stroked glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these marks are thin, open,
 * round-capped strokes, which is what Lucide draws — and they arrive as SVG
 * paths through `react-native-svg`, so this showcase ships no font file and
 * cannot hit the Android family-name collision that two icon subsets invite.
 *
 * Imported one icon per subpath. The package barrel pulls in every icon Lucide
 * ships; `lucide-react-native/icons/x` is a single module, types included.
 */
const GLYPHS = {
  bell: Bell,
  more: Ellipsis,
  next: ChevronRight,
  plus: Plus,
  send: SendHorizontal,
  bill: Receipt,
  mobile: Smartphone,
  basket: ShoppingBasket,
  house: House,
  subscription: Repeat,
  'basket-alt': ShoppingBasket,
  stats: TrendingUp,
  scan: ScanLine,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = ph.text,
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
