import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Copy,
  CreditCard,
  EllipsisVertical,
  Globe,
  House,
  KeyRound,
  ListFilter,
  Plus,
  ScanFace,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react-native';

import { nv } from '../theme';

/**
 * Every icon on every Nova screen, addressed by a semantic name.
 *
 * The export draws its icons inline as Feather-shaped SVG — 24-unit box,
 * `stroke-2`, round caps — so Lucide is the same drawing, not a substitution.
 * The two places it fills rather than strokes (the dock's active house, the
 * trend caret) are handled by passing `fill`, not by a second icon set.
 */
const GLYPHS = {
  // navigation
  back: ArrowLeft,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  more: EllipsisVertical,

  // dock
  home: House,
  activity: Clock,
  wallet: CreditCard,
  settings: Settings,

  // header actions
  scan: ScanLine,
  bell: Bell,
  search: Search,
  filter: ListFilter,

  // money movement
  deposit: Plus,
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  swap: ArrowLeftRight,
  trade: ArrowLeftRight,
  earn: Zap,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,

  // settings rows
  face: ScanFace,
  key: KeyRound,
  shield: ShieldCheck,
  currency: CircleDollarSign,
  trend: TrendingUp,
  network: Globe,
  copy: Copy,
  verified: CheckCheck,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = nv.ink,
  strokeWidth = 2,
  fill = 'none',
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  /** Set to the stroke colour for the two glyphs the reference draws solid. */
  fill?: string;
}) {
  const Glyph = GLYPHS[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} fill={fill} />;
}
