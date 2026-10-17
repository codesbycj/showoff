import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import Bath from 'lucide-react-native/icons/bath';
import Flame from 'lucide-react-native/icons/flame';
import Heart from 'lucide-react-native/icons/heart';
import MessageCircle from 'lucide-react-native/icons/message-circle';
import Phone from 'lucide-react-native/icons/phone';
import Sailboat from 'lucide-react-native/icons/sailboat';
import Star from 'lucide-react-native/icons/star';
import Sun from 'lucide-react-native/icons/sun';
import Wifi from 'lucide-react-native/icons/wifi';

import { mr } from '../theme';

/**
 * Every glyph on the screen, behind one component.
 *
 * Lucide rather than a Material Symbols subset. The reference's icons are
 * thin, open, round-capped strokes, which is what Lucide draws and what
 * Material Symbols only approximates at its lightest weight — and these are
 * SVG paths through `react-native-svg`, so there is no font file to load and
 * no chance of the Android family-name collision that two Material subsets in
 * one app invite.
 *
 * Imported one icon per subpath. The package barrel pulls in every icon Lucide
 * ships; `lucide-react-native/icons/x` is a single module, and it is in the
 * package's own export map with types.
 *
 * Two of the amenity glyphs are stand-ins and are named for the *amenity*
 * rather than the shape, so swapping the drawing later is one line here:
 * Lucide has no jacuzzi and no barbecue, so a bath and a flame do that work.
 * Naming them `bath` and `flame` at the call site would tie the data file to
 * whatever Lucide happens to ship.
 */

const GLYPHS = {
  back: ArrowLeft,
  heart: Heart,
  star: Star,
  boat: Sailboat,
  sun: Sun,
  jacuzzi: Bath,
  grill: Flame,
  wifi: Wifi,
  message: MessageCircle,
  phone: Phone,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = mr.ink,
  filled = false,
  strokeWidth = 1.9,
}: {
  name: IconName;
  size?: number;
  color?: string;
  /** Only meaningful on `heart` and `star`, the two with a filled state. */
  filled?: boolean;
  strokeWidth?: number;
}) {
  const Glyph = GLYPHS[name];
  return (
    <Glyph size={size} color={color} strokeWidth={strokeWidth} fill={filled ? color : 'none'} />
  );
}
