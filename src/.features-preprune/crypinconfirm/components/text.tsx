import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * crypinconfirm's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Duplicated from the sibling screens on purpose — see `theme.ts`.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  title: { fontFamily: F.bold, fontSize: 16, lineHeight: 22, color: ct.ink },
  /** "BTC to USDT" — the dominant element on this screen (R8). */
  pair: { fontFamily: F.extra, fontSize: 22, lineHeight: 29, color: ct.ink },

  legLabel: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.sub },
  legAmount: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  legApprox: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  rowLabel: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.sub },
  rowValue: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  stepLabel: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  stepWhen: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  totalLabel: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.sub },
  totalValue: { fontFamily: F.bold, fontSize: 19, lineHeight: 25, color: ct.ink },

  slide: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.accent },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on crypinconfirm goes through this. */
export function T({ variant = 'rowValue', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
