import type { SymbolName } from '../symbols';
import { PASTEL, mp } from '../theme';

/**
 * The wellness toolkit profile's content.
 *
 * This is the screen where the design's *prose* palette actually runs the page.
 * The four toolkit tiles are the only place `#a7f3d0`, `#e9d5ff`, `#fed7aa` and
 * `#bae6fd` appear as fills, each with its own deep ink — which is why those
 * live in `PASTEL` rather than being scattered here as hex.
 *
 * Four more emoji get replaced: a seedling, a wave and a crescent moon on the
 * achievement chips, and a sparkle on the AI Coach pill.
 */

export const PROFILE = {
  name: 'Alex Miller',
  tier: 'PRO',
  meta: 'Mindful Explorer • Day 48',

  toolkitTitle: 'Quick Toolkit',
  toolkitCount: '4 Active Ready',

  streakTitle: '14-Day Streak',
  streakRank: 'Top 5% Breathers',

  bioTitle: 'Biometrics & Sync',
  bioSynced: 'Synced 12m ago',

  accountTitle: 'Account & Rituals',

  giftTitle: 'Gift Mindful Pro',
  giftSub: 'Send a free month to friends',
  giftCta: 'Invite',
} as const;

export type Tool = {
  key: string;
  icon: SymbolName;
  chip: string;
  /** A pulsing dot ahead of the chip label — only the live tile has one. */
  chipDot?: string;
  title: string;
  sub: string;
  /** The footer's label, and the icon that closes the row. */
  action: string;
  actionIcon: SymbolName;
  /** A trailing note instead of an icon, on the first tile. */
  actionNote?: string;
  fill: string;
  ink: string;
  /** The soft wash behind the tile's corner blob. */
  blob: string;
};

export const TOOLS: readonly Tool[] = [
  // STEP 6.04 soundscapes
  // {
  //   key: 'sound',
  //   icon: 'graphicEq',
  //   chip: 'LIVE',
  //   chipDot: PASTEL.green.strong,
  //   title: 'Soundscapes',
  //   sub: 'Gentle Rain & Woods',
  //   action: 'Playing...',
  //   actionIcon: 'playCircle',
  //   actionNote: '432Hz',
  //   fill: PASTEL.green.fill,
  //   ink: PASTEL.green.ink,
  //   blob: `${PASTEL.green.mid}4d`,
  // },
  // STEP 6.05 the SOS button
  // {
  //   key: 'sos',
  //   icon: 'bolt',
  //   chip: '5-4-3-2-1',
  //   title: 'SOS Calmer',
  //   sub: 'Instant Anxiety Reset',
  //   action: 'Grounding Hub',
  //   actionIcon: 'arrowForward',
  //   fill: PASTEL.lilac.fill,
  //   ink: PASTEL.lilac.ink,
  //   blob: `${PASTEL.lilac.mid}4d`,
  // },
  // STEP 6.06 the journal
  // {
  //   key: 'journal',
  //   icon: 'editNote',
  //   chip: '24 Saved',
  //   title: 'Mood Journal',
  //   sub: 'Prompt: Gratitude Log',
  //   action: 'Write Entry',
  //   actionIcon: 'add',
  //   fill: PASTEL.peach.fill,
  //   ink: PASTEL.peach.ink,
  //   blob: `${PASTEL.peach.mid}4d`,
  // },
  // STEP 6.07 sleep tales
  // {
  //   key: 'sleep',
  //   icon: 'bedtime',
  //   chip: '10 min',
  //   title: 'Sleep Tales',
  //   sub: 'Whispering Valley',
  //   action: 'Drift Off',
  //   actionIcon: 'headphones',
  //   fill: PASTEL.sky.fill,
  //   ink: PASTEL.sky.ink,
  //   blob: `${PASTEL.sky.mid}4d`,
  // },
];

export type StreakDay = {
  key: string;
  label: string;
  icon: SymbolName;
  fill: string;
  ink: string;
  today?: boolean;
};

export const STREAK_DAYS: readonly StreakDay[] = [
  // STEP 6.10 monday
  // {
  //   key: 'mon',
  //   label: 'M',
  //   icon: 'sentimentSatisfied',
  //   fill: PASTEL.green.fill,
  //   ink: PASTEL.green.ink,
  // },
  // STEP 6.11 tuesday
  // { key: 'tue', label: 'T', icon: 'mood', fill: PASTEL.peach.fill, ink: PASTEL.peach.ink },
  // STEP 6.12 wednesday
  // {
  //   key: 'wed',
  //   label: 'W',
  //   icon: 'sentimentVerySatisfied',
  //   fill: PASTEL.sky.fill,
  //   ink: PASTEL.sky.ink,
  // },
  // STEP 6.13 thursday
  // {
  //   key: 'thu',
  //   label: 'T',
  //   icon: 'selfImprovement',
  //   fill: PASTEL.lilac.fill,
  //   ink: PASTEL.lilac.ink,
  // },
  // STEP 6.14 friday
  // {
  //   key: 'fri',
  //   label: 'F',
  //   icon: 'sentimentSatisfied',
  //   fill: PASTEL.green.fill,
  //   ink: PASTEL.green.ink,
  // },
  // STEP 6.15 saturday
  // { key: 'sat', label: 'S', icon: 'celebration', fill: PASTEL.peach.fill, ink: PASTEL.peach.ink },
  // STEP 6.16 today
  // {
  //   key: 'today',
  //   label: 'Today',
  //   icon: 'verified',
  //   fill: mp.primary,
  //   ink: mp.onPrimary,
  //   today: true,
  // },
];

/** The achievement chips. Each icon replaces an emoji in the export. */
export const BADGES: readonly { key: string; icon: SymbolName; label: string }[] = [
  // STEP 6.18 zen master
  // { key: 'zen', icon: 'psychiatry', label: 'Zen Master II' },
  // STEP 6.19 deep breather
  // { key: 'breath', icon: 'waves', label: 'Deep Breather' },
  // STEP 6.20 sleep champion
  // { key: 'sleep', icon: 'bedtime', label: 'Sleep Champion' },
];

/**
 * The two biometric tiles.
 *
 * They differ enough that they are not one shape with a flag — the heart tile
 * ends in a single progress bar, the sleep tile in three coloured segments that
 * together make one bar. Both are given as fractions of the tile's width.
 */
export const HEART = {
  icon: 'favorite' as SymbolName,
  iconColor: mp.error,
  status: 'Optimal',
  statusColor: mp.secondary,
  value: '62',
  unit: 'bpm',
  label: 'Resting Heart Rate',
  bar: 0.78,
} as const;

export const SLEEP = {
  icon: 'ringVolume' as SymbolName,
  iconColor: mp.primary,
  status: 'Apple Health',
  value: '8h 14m',
  label: 'Deep + REM Phase',
  segments: [
    { w: 0.35, color: PASTEL.sky.fill },
    { w: 0.45, color: PASTEL.green.fill },
    { w: 0.2, color: PASTEL.lilac.fill },
  ],
} as const;

export type AccountRow = {
  key: string;
  icon: SymbolName;
  title: string;
  sub: string;
  /** Exactly one of these three trailing controls. */
  toggle?: boolean;
  pill?: { label: string; icon: SymbolName; fill: string; ink: string };
  status?: { label: string; icon: SymbolName; color: string };
};

export const ACCOUNT_ROWS: readonly AccountRow[] = [
  // STEP 6.23 the evening nudge
  // {
  //   key: 'evening',
  //   icon: 'alarm',
  //   title: 'Evening Check-in',
  //   sub: 'Gentle prompt at 9:00 PM',
  //   toggle: true,
  // },
  // STEP 6.24 the coach voice
  // {
  //   key: 'coach',
  //   icon: 'smartToy',
  //   title: 'AI Coach Vibe',
  //   sub: 'Adaptive conversation voice',
  //   pill: {
  //     label: 'Empathetic',
  //     icon: 'autoAwesome',
  //     // `#fde047` at 30%, over the row's own `surface-container-low`.
  //     fill: `${PASTEL.yellow.fill}4d`,
  //     ink: PASTEL.yellow.ink,
  //   },
  // },
  // STEP 6.25 the vault
  // {
  //   key: 'vault',
  //   icon: 'encrypted',
  //   title: 'Vault Privacy',
  //   sub: 'On-Device Zero-Knowledge',
  //   status: { label: 'Encrypted', icon: 'lock', color: mp.secondary },
  // },
];
