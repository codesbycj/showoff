import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BookCopy,
  BookOpen,
  Calculator,
  Camera,
  ChevronDown,
  ChevronsRight,
  Clapperboard,
  CircleCheck,
  CirclePlay,
  Clock,
  Crown,
  Flame,
  FlaskConical,
  Gem,
  Globe,
  House,
  Lightbulb,
  MessageCircle,
  MessageCircleMore,
  Mic,
  MonitorPlay,
  Microscope,
  NotebookPen,
  Pencil,
  PenLine,
  Plus,
  RotateCcwClock,
  Ruler,
  Search,
  Send,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
  WandSparkles,
} from 'lucide-react-native';

import { ll } from '../theme';

/**
 * Every icon on every Lumina screen, addressed by a semantic name.
 *
 * The Stitch export draws its icons from two sets that do not agree: the chat
 * and library screens use Heroicons outline, while home and profile use Font
 * Awesome solid. That split is an artefact of the four screens being generated
 * in separate passes — `DESIGN.md` describes one language, "soft monochrome
 * outline icons", and nothing in the renders reads as two deliberate sets.
 *
 * So they are unified on Lucide, which is already this repo's icon source and
 * is the same 24-unit outline grid Heroicons is drawn on. Where the reference
 * showed a Font Awesome solid glyph the outline cut is used instead, which is
 * a visible change on five glyphs — crown, trophy, gem, flame, house — and is
 * called out in the handover.
 *
 * `strokeWidth` defaults to 2, matching the `stroke-2` the export's own SVGs
 * carry. The library screen's back and filter glyphs are drawn at 2.2 there,
 * which is close enough to 2 that it is not worth a second code path.
 */
const GLYPHS = {
  // navigation
  back: ArrowLeft,
  chevronDown: ChevronDown,
  chevronsRight: ChevronsRight,
  arrowUpRight: ArrowUpRight,

  // tab bar
  home: House,
  chat: MessageCircle,
  library: BookOpen,
  bookmark: Bookmark,
  profile: User,
  settings: Settings,

  // home screen
  wand: WandSparkles,
  sparkles: Sparkles,
  commentDots: MessageCircleMore,
  screen: MonitorPlay,
  camera: Camera,
  mic: Mic,
  crown: Crown,
  calculator: Calculator,
  play: CirclePlay,
  lightbulb: Lightbulb,

  // chat screen
  pencil: Pencil,
  plus: Plus,
  send: Send,

  // library screen
  search: Search,
  filter: SlidersHorizontal,
  check: CircleCheck,

  // subject marks
  //
  // The reference sets these as emoji — 📐 🔬 📖 🌐 on the chat chips, 📚 📝 🎯
  // 🎬 on the library filters, 🧪 📐 🖋️ on the note rows. Emoji are the one
  // glyph class that is not the same picture on two platforms: the harness
  // renders Segoe on Windows, the emulator renders Noto, and neither is what
  // the reference was captured with. `DESIGN.md` asks for "pastel category
  // icons" rather than emoji in the first place, so they are drawn from the
  // same outline set as everything else and tinted per subject.
  math: Ruler,
  science: Microscope,
  chemistry: FlaskConical,
  english: BookOpen,
  world: Globe,
  textbooks: BookCopy,
  notes: NotebookPen,
  practice: Target,
  videos: Clapperboard,
  penLine: PenLine,

  // profile screen
  clock: Clock,
  trophy: Trophy,
  gem: Gem,
  flame: Flame,
  star: Star,
  history: RotateCcwClock,
} as const;

export type IconName = keyof typeof GLYPHS;

export function Icon({
  name,
  size = 20,
  color = ll.ink,
  strokeWidth = 2,
  fill = 'none',
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  /** Set to the stroke colour for the few glyphs the reference draws solid. */
  fill?: string;
}) {
  const Glyph = GLYPHS[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} fill={fill} />;
}
