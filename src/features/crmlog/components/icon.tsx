import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import ExternalLink from 'lucide-react-native/icons/external-link';

import { cl } from '../theme';

/**
 * The three stroked glyphs on the screen, behind one component.
 *
 * Lucide rather than a cut-down icon font: these are thin, open, round-capped
 * strokes, which is what Lucide draws — and they arrive as SVG paths through
 * `react-native-svg`, so this showcase ships no font file and cannot hit the
 * Android family-name collision two icon subsets invite.
 */
const GLYPHS = {
  back: ArrowLeft,
  share: ExternalLink,
  go: ArrowUpRight,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 18,
  color = cl.onDark,
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
