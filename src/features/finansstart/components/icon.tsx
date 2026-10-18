import ArrowDownLeft from 'lucide-react-native/icons/arrow-down-left';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import Eye from 'lucide-react-native/icons/eye';
import Plus from 'lucide-react-native/icons/plus';

import { fn } from '../theme';

/**
 * The stroked glyphs, behind one component.
 *
 * Lucide rather than a cut-down icon font: these are thin, open, round-capped
 * strokes, which is what Lucide draws — and they arrive as SVG paths through
 * `react-native-svg`, so this showcase ships no font file and cannot hit the
 * Android family-name collision two icon subsets invite.
 */
const GLYPHS = {
  transfer: ArrowUpRight,
  request: ArrowDownLeft,
  eye: Eye,
  plus: Plus,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 15,
  color = fn.ink,
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
