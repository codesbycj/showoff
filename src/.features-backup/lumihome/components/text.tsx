import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * lumihome's type scale. One variant per role, sized for a 393dp phone (I2).
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
  eyebrow: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },
  hello: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },

  balanceLabel: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.sub },
  /** The balance — the dominant element on the screen (R8). */
  balance: { fontFamily: F.extra, fontSize: 33, lineHeight: 42, color: ct.ink },
  currency: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  actionDeep: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.deepInk },
  actionLime: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.limeInk },

  sectionTitle: { fontFamily: F.bold, fontSize: 16, lineHeight: 21, color: ct.ink },
  sectionMore: {
    fontFamily: F.semibold,
    fontSize: 12.5,
    lineHeight: 17,
    color: ct.in,
    textDecorationLine: 'underline',
  },

  tileLabel: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  txnName: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  txnDate: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  txnOut: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 19, color: ct.ink },
  txnIn: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 19, color: ct.in },
  txnUnit: { fontFamily: F.medium, fontSize: 9.5, lineHeight: 19, color: ct.sub },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on lumihome goes through this. */
export function T({ variant = 'txnName', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
