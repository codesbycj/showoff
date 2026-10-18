import Bike from 'lucide-react-native/icons/bike';
import Bookmark from 'lucide-react-native/icons/bookmark';
import Car from 'lucide-react-native/icons/car';
import Check from 'lucide-react-native/icons/check';
import Fuel from 'lucide-react-native/icons/fuel';
import Mic from 'lucide-react-native/icons/mic';
import Navigation from 'lucide-react-native/icons/navigation';
import Phone from 'lucide-react-native/icons/phone';
import Plus from 'lucide-react-native/icons/plus';
import Share2 from 'lucide-react-native/icons/share-2';
import ShoppingCart from 'lucide-react-native/icons/shopping-cart';
import X from 'lucide-react-native/icons/x';

import { dm } from '../theme';

/**
 * Every stroked glyph on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these marks are thin, open,
 * round-capped strokes, which is what Lucide draws — and they arrive as SVG
 * paths through `react-native-svg`, so this showcase ships no font file and
 * cannot hit the Android family-name collision two icon subsets invite.
 */
const GLYPHS = {
  mic: Mic,
  close: X,
  add: Plus,
  grocery: ShoppingCart,
  fuel: Fuel,
  car: Car,
  bike: Bike,
  check: Check,
  start: Navigation,
  call: Phone,
  share: Share2,
  save: Bookmark,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = dm.ink,
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
