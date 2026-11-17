import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * stridehome's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Two families: Inter for anything that reads as speech, and IBM Plex Mono for
 * the tracked uppercase labels the board sets over every metric — both are
 * registered per weight in `src/theme/fonts.ts`. `fontWeight` is deliberately
 * absent alongside a named face: Android synthesises a second bolding on top
 * of the real one.
 *
 * Every colour here sits on a dark ground, so each is measured against that
 * rather than against white (R4).
 */
const F = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  mono: 'IBMPlexMono_400Regular',
} as const;

const variants = {
  date: { fontFamily: F.mono, fontSize: 11.5, lineHeight: 16, letterSpacing: 1.6, color: ct.muted },
  /** The greeting — the dominant element at the top (R8). */
  greeting: { fontFamily: F.bold, fontSize: 27, lineHeight: 34, color: ct.ink },
  badge: { fontFamily: F.bold, fontSize: 10.5, lineHeight: 14, color: ct.onLime },

  label: { fontFamily: F.mono, fontSize: 11, lineHeight: 15, letterSpacing: 1.4, color: ct.muted },
  chipOn: {
    fontFamily: F.mono,
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1.2,
    color: ct.onLime,
  },
  chipOff: {
    fontFamily: F.mono,
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1.2,
    color: ct.muted,
  },

  score: { fontFamily: F.bold, fontSize: 38, lineHeight: 44, color: ct.ink },
  scoreLabel: {
    fontFamily: F.mono,
    fontSize: 9.5,
    lineHeight: 13,
    letterSpacing: 1.4,
    color: ct.muted,
  },

  metric: { fontFamily: F.semibold, fontSize: 19, lineHeight: 25, color: ct.ink },
  unit: { fontFamily: F.mono, fontSize: 10, lineHeight: 14, color: ct.muted },
  delta: { fontFamily: F.mono, fontSize: 10, lineHeight: 14, color: ct.up },

  tile: { fontFamily: F.semibold, fontSize: 18, lineHeight: 24, color: ct.ink },
  tileLabel: { fontFamily: F.mono, fontSize: 10.5, lineHeight: 14, color: ct.muted },

  focus: { fontFamily: F.bold, fontSize: 22, lineHeight: 28, color: ct.ink },
  focusMeta: {
    fontFamily: F.mono,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.8,
    color: ct.muted,
  },
  focusMinutes: { fontFamily: F.bold, fontSize: 22, lineHeight: 28, color: ct.ink },
  cta: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, letterSpacing: 0.8, color: ct.onLime },

  weekValue: { fontFamily: F.bold, fontSize: 20, lineHeight: 26, color: ct.ink },
  weekGoal: {
    fontFamily: F.mono,
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1,
    color: ct.muted,
  },
  day: { fontFamily: F.mono, fontSize: 9.5, lineHeight: 13, color: ct.faint },

  dockOn: { fontFamily: F.semibold, fontSize: 11, lineHeight: 15, color: ct.lime },
  dockOff: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on stridehome goes through this. */
export function T({ variant = 'label', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
