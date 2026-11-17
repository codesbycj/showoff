import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nebuhome's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Inter, registered per weight in `src/theme/fonts.ts`, standing in for the
 * board's grotesque. `fontWeight` is deliberately absent alongside a named
 * face: Android synthesises a second bolding on top of the real one.
 *
 * Every colour here sits on a dark ground, so each is measured against that
 * rather than against white (R4).
 */
const F = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

const variants = {
  welcome: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.muted },
  name: { fontFamily: F.semibold, fontSize: 16, lineHeight: 21, color: ct.ink },

  balanceLabel: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 18, color: ct.muted },
  /** The balance — the dominant element on the screen (R8). */
  balance: { fontFamily: F.bold, fontSize: 38, lineHeight: 48, color: ct.ink },
  change: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.up },

  chip: { fontFamily: F.medium, fontSize: 14, lineHeight: 19, color: ct.ink },
  section: { fontFamily: F.semibold, fontSize: 18, lineHeight: 24, color: ct.ink },

  symbol: { fontFamily: F.semibold, fontSize: 16.5, lineHeight: 22, color: ct.ink },
  symbolDark: { fontFamily: F.semibold, fontSize: 16.5, lineHeight: 22, color: ct.ctaInk },
  price: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  priceDark: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: '#55606F' },
  delta: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.up },
  amount: { fontFamily: F.semibold, fontSize: 16, lineHeight: 21, color: ct.ink },
  amountDark: { fontFamily: F.semibold, fontSize: 16, lineHeight: 21, color: ct.ctaInk },
  value: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  valueDark: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: '#55606F' },

  insight: { fontFamily: F.regular, fontSize: 14, lineHeight: 20, color: ct.ink },
  insightStrong: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },

  dockOn: { fontFamily: F.semibold, fontSize: 11, lineHeight: 15, color: ct.ink },
  dockOff: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nebuhome goes through this. */
export function T({ variant = 'price', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
