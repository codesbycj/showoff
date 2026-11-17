import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * lumistart's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The headline — the dominant element on the screen (R8). */
  headline: { fontFamily: F.extra, fontSize: 35, lineHeight: 50, color: ct.deep },
  body: { fontFamily: F.regular, fontSize: 15, lineHeight: 23, color: ct.sub },

  cta: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.deepInk },
  aside: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.sub },
  link: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.accent },

  cardLabel: { fontFamily: F.medium, fontSize: 9.5, lineHeight: 13, color: ct.onCardSub },
  cardValue: { fontFamily: F.extra, fontSize: 19, lineHeight: 25, color: ct.onCard },
  cardNumber: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.onCard },
  cardMeta: { fontFamily: F.medium, fontSize: 8.5, lineHeight: 12, color: ct.onCardSub },
  cardHolder: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.onCard },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on lumistart goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
