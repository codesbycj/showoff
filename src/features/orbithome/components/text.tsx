import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * orbithome's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`, standing
 * in for the board's rounded grotesque. `fontWeight` is deliberately absent
 * alongside a named face: Android synthesises a second bolding on top of the
 * real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  hello: { fontFamily: F.bold, fontSize: 19, lineHeight: 25, color: ct.ink },
  welcome: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.muted },

  /** The balance — the dominant element on the screen (R8). */
  balance: { fontFamily: F.extra, fontSize: 34, lineHeight: 44, color: ct.ink },
  balanceLabel: { fontFamily: F.medium, fontSize: 14, lineHeight: 19, color: ct.muted },

  action: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  section: { fontFamily: F.bold, fontSize: 18, lineHeight: 24, color: ct.ink },
  seeAll: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.muted },

  contact: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  promoTitle: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.accentInk },
  promoBody: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },

  txName: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  txTime: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  txOut: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, color: ct.out },
  txIn: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, color: ct.in },
  txState: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },

  dockOn: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.white },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on orbithome goes through this. */
export function T({ variant = 'txTime', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
