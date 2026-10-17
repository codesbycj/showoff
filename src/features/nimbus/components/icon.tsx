import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import Eye from 'lucide-react-native/icons/eye';
import EyeOff from 'lucide-react-native/icons/eye-off';
import Plus from 'lucide-react-native/icons/plus';

import { nb } from '../theme';

/**
 * The stroked glyphs, behind one component.
 *
 * Lucide rather than a Material Symbols subset: the reference's chrome icons
 * are thin, open, round-capped strokes, which is what Lucide draws — and these
 * are SVG paths through `react-native-svg`, so this showcase ships no font file
 * and cannot hit the Android family-name collision two icon subsets invite.
 *
 * Imported one icon per subpath. The package barrel pulls in every icon Lucide
 * ships; `lucide-react-native/icons/x` is a single module, types included.
 *
 * The screen's other glyphs are not here. The dock's four, and the four on the
 * action tiles, are drawn in their own components: the dock's are a different
 * drawing from anything Lucide ships (a doorless house, a three-bar chart), and
 * the tiles' are solid 3D shapes rather than strokes at all.
 */
const GLYPHS = {
  back: ChevronLeft,
  add: Plus,
  hide: EyeOff,
  show: Eye,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = nb.ink,
  strokeWidth = 2,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const Glyph = GLYPHS[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} />;
}
