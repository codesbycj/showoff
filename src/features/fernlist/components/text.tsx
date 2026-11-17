import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * fernlist's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  /** The page title. */
  display: { fontFamily: F.extra, fontSize: 40, lineHeight: 48, color: ct.ink },

  featCountry: {
    fontFamily: F.semibold,
    fontSize: 10.5,
    lineHeight: 15,
    letterSpacing: 0.9,
    color: 'rgba(255,255,255,0.82)',
  },
  featTitle: { fontFamily: F.bold, fontSize: 16, lineHeight: 22, color: ct.onForest },
  featDate: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: 'rgba(255,255,255,0.92)' },
  badge: { fontFamily: F.bold, fontSize: 11.5, lineHeight: 15, color: ct.onLime },

  chip: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.onForest },

  cardCountry: {
    fontFamily: F.semibold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.9,
    color: ct.white,
  },
  /** The front card's headline — the dominant element on the screen (R8). */
  cardTitle: { fontFamily: F.bold, fontSize: 26, lineHeight: 32, color: ct.white },
  fact: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.white },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on fernlist goes through this. */
export function T({ variant = 'chip', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
