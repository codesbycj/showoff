/**
 * Job Finder's tokens.
 *
 * This showcase came from Google Stitch, which exports a `code.html` per screen
 * alongside the render — so every value here is lifted from the markup rather
 * than measured off a capture. Where Stitch re-guessed a colour per export, the
 * screens are reconciled here once and the components never see the variants.
 *
 * Three reconciliations worth recording:
 *
 * - The page background is declared `#EFF0E9`, `#EEF1EB`, `#EDF0EB`, `#EFF1EB`
 *   and `#F5F5F0` across the seven exports. Sampling the renders agrees with the
 *   `#EEF1EB` cluster on five of seven; the two outliers are the home feed pair,
 *   which drifted warm. `#EEF1EB` wins.
 * - The ink is `#191A1E`, `#1C1C1E`, `#18191B`, `#161719` and `#121614`. These
 *   are the same near-black at rounding noise, so `#191A1E` — the value three
 *   exports agree on — is the one.
 * - PokerStars red is `#FF334B`, `#FF3B30` and `#FF6239` depending on the file.
 *   `#FF3B30` is iOS system red and the render matches it, so that is used.
 *
 * The design is laid out at 390dp; the harness renders 393dp. The 0.8%
 * difference is below the rounding of every value here, so the markup's CSS
 * pixels are carried across as dp unchanged.
 */
export const jf = {
  /** Page canvas. Every screen sits on this; only cards lift off it. */
  bg: '#EEF1EB',
  card: '#FFFFFF',
  /** The slightly sunk panel used for the job-detail sections. */
  panel: '#E4E8DF',
  /** The badge/chip fill on the detail screen, a shade under `panel`. */
  panelDeep: '#DCE2D6',

  ink: '#191A1E',
  muted: '#8E9491',
  /** Body copy that is not quite muted — description paragraphs, row subtitles. */
  dim: '#58615A',
  hairline: '#E3E6E0',

  /** Brand marks that appear as company badges. */
  dropbox: '#0061FE',
  poker: '#FF3B30',
  apple: '#191A1E',
  nikitin: '#111111',
  figma: '#1C1C1E',
  slack: '#4A154B',
  skype: '#4BAFF7',

  /** Onboarding collage accents. */
  lime: '#D2F54D',
  coral: '#E59981',

  /** The lime disc behind the second logo on the job detail hero. */
  accentYellow: '#E4EC9C',

  online: '#22C55E',
  unread: '#0061FE',
  alert: '#FF334B',
  verified: '#0061FE',
} as const;

/**
 * Tag chips. Stitch gives each tag an explicit pair rather than deriving one, so
 * the pairs are kept as pairs — a `green` chip is `#E5EFE9` on `#2C6B4F` and
 * nothing computes that from a single hue.
 */
export const TAG = {
  green: { bg: '#E5EFE9', fg: '#2C6B4F' },
  rose: { bg: '#FCECEE', fg: '#B83E51' },
  blue: { bg: '#EBF0F5', fg: '#476788' },
  grey: { bg: '#ECEFEA', fg: '#5A635E' },
  amber: { bg: '#F3ECE5', fg: '#8C5D38' },
  purple: { bg: '#EFEAF6', fg: '#69488F' },
} as const;

export type TagTone = keyof typeof TAG;

/**
 * Plus Jakarta Sans is not a substitute here — it is the family the design sets
 * every screen in, and Google Fonts carries it. So the type matches outright,
 * which is why this showcase carries no width compromise note.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
} as const;

/**
 * The type scale, read off the markup's explicit sizes. Stitch sets line height
 * as a ratio (`leading-tight`, `leading-[1.12]`); those are resolved to dp here
 * so nothing downstream has to multiply.
 */
export const TYPE = {
  /** Onboarding headline. */
  hero: { fontFamily: FONT.bold, fontSize: 34, lineHeight: 38, letterSpacing: -0.9 },
  /** "Saved Jobs", "Messages". */
  screenTitle: { fontFamily: FONT.bold, fontSize: 28, lineHeight: 34, letterSpacing: -0.7 },
  /** The salary on the job detail hero. */
  salaryHero: { fontFamily: FONT.extrabold, fontSize: 30, lineHeight: 36, letterSpacing: -0.9 },
  /** Profile name, section headings inside panels. */
  title: { fontFamily: FONT.bold, fontSize: 22, lineHeight: 28, letterSpacing: -0.5 },
  /** Card headline — job title, conversation name, case-study name. */
  cardTitle: { fontFamily: FONT.bold, fontSize: 16, lineHeight: 20, letterSpacing: -0.3 },
  /** Panel heading — "Job Description", "Responsibilities". */
  sectionTitle: { fontFamily: FONT.bold, fontSize: 15, lineHeight: 20, letterSpacing: -0.2 },
  /** Salary line on a feed card. */
  salary: { fontFamily: FONT.extrabold, fontSize: 15, lineHeight: 20, letterSpacing: -0.3 },
  body: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 21 },
  bodyMedium: { fontFamily: FONT.medium, fontSize: 14, lineHeight: 21 },
  /** The onboarding paragraph, set a half-point smaller than body. */
  lede: { fontFamily: FONT.regular, fontSize: 13.5, lineHeight: 20 },
  /** Filter pill label. */
  pill: { fontFamily: FONT.semibold, fontSize: 13, lineHeight: 20 },
  /** Company + location line under a job title. */
  meta: { fontFamily: FONT.medium, fontSize: 12, lineHeight: 18 },
  /** Tag chip. */
  tag: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 17 },
  /** Eyebrow above a case study, stat caption. */
  eyebrow: { fontFamily: FONT.bold, fontSize: 10, lineHeight: 13, letterSpacing: 0.6 },
  /** The CTA inside a dark pill. */
  button: { fontFamily: FONT.semibold, fontSize: 16, lineHeight: 20 },
} as const;

/** Radii and spacing, in dp. */
export const R = { sm: 8, md: 14, lg: 20, xl: 24, card: 28, sheet: 36, full: 9999 } as const;
export const SP = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, gutter: 20 } as const;

/**
 * The card lift. Stitch writes it as two stacked box-shadows; React Native takes
 * one, so this is the visible one of the pair. It is deliberately `shadowColor`
 * plus `elevation` on the same object rather than a `Platform.select` — the
 * extra keys are inert on the platform that does not read them, and a select
 * here is exactly the thing the web harness cannot verify.
 */
export const CARD_SHADOW = {
  shadowColor: '#000000',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
} as const;

/** The floating dock sits higher off the page than a card does. */
export const DOCK_SHADOW = {
  shadowColor: '#000000',
  shadowOpacity: 0.12,
  shadowRadius: 22,
  shadowOffset: { width: 0, height: 10 },
  elevation: 8,
} as const;

/** Semantic overrides, so the shared primitives read on Job Finder's page. */
export const jobfinderTheme = {
  '--bg': jf.bg,
  '--surface': jf.card,
  '--fg': jf.ink,
  '--muted': jf.muted,
  '--border': jf.hairline,
  '--accent': jf.ink,
  '--accent-fg': jf.card,
} as unknown as Record<string, string>;
