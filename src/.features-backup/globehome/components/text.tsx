import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * globehome's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * The card variants are checked against the scrim over the photograph, the
 * rest against the page (R4) — a token has to clear every ground it lands on.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  /** The greeting — the dominant element above the cards (R8). */
  greeting: { fontFamily: F.extra, fontSize: 24, lineHeight: 31, color: ct.ink },
  region: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  rating: { fontFamily: F.bold, fontSize: 12, lineHeight: 17, color: ct.ink },
  country: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.onPhoto },
  place: { fontFamily: F.extra, fontSize: 21, lineHeight: 27, color: ct.onPhoto },

  tab: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.sub },
  tabOn: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.brand },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on globehome goes through this. */
export function T({ variant = 'region', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
