import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * foldhome's type scale. One variant per role, sized for a 393dp phone (I2).
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
} as const;

const variants = {
  hi: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 19, color: ct.muted },
  /** The welcome - the dominant line above the cards (R8). */
  welcome: { fontFamily: F.bold, fontSize: 23, lineHeight: 31, color: ct.ink },
  cardAdd: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.onNavy },
  wordmark: { fontFamily: F.bold, fontSize: 19, lineHeight: 26, color: ct.ink, letterSpacing: 1 },
  wordmarkDark: { fontFamily: F.bold, fontSize: 17, lineHeight: 24, color: ct.navy },
  pan: { fontFamily: F.semibold, fontSize: 19, lineHeight: 26, color: ct.ink, letterSpacing: 1.5 },
  fieldLabel: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 15, color: '#4A5A33' },
  fieldValue: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },
  action: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.ink },
  section: { fontFamily: F.bold, fontSize: 17, lineHeight: 24, color: ct.ink },
  filter: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  txName: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },
  txKind: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  txOut: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 19, color: ct.ink },
  txIn: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 19, color: '#2E7A1E' },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on foldhome goes through this. */
export function T({ variant = 'txKind', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
