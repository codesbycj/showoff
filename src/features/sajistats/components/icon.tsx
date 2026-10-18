import Bell from 'lucide-react-native/icons/bell';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import Search from 'lucide-react-native/icons/search';

import { sj } from '../theme';

/**
 * The three stroked glyphs on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these are thin, open, round-capped
 * strokes, which is what Lucide draws — and they arrive as SVG paths through
 * `react-native-svg`, so this showcase ships no font file and cannot hit the
 * Android family-name collision two icon subsets invite.
 */
const GLYPHS = {
  search: Search,
  bell: Bell,
  next: ChevronRight,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = sj.onDark,
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
