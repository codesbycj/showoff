import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * crypinswap's type scale. One variant per role, sized for a 393dp phone (I2).
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

  panelLabel: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.sub },
  /** The amount being typed — the dominant element on this screen (R8). */
  amount: { fontFamily: F.bold, fontSize: 30, lineHeight: 38, color: ct.ink },
  /** The receive side is the same size but quieter: one figure leads. */
  amountDim: { fontFamily: F.bold, fontSize: 30, lineHeight: 38, color: ct.dim },
  approx: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  balance: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  coin: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  chip: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.ink },

  key: { fontFamily: F.semibold, fontSize: 24, lineHeight: 32, color: ct.ink },
  cta: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.ctaFg },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on crypinswap goes through this. */
export function T({ variant = 'coin', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
