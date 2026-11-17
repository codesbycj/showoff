import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nookshop's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The page title - the dominant element at the top (R8). */
  title: { fontFamily: F.regular, fontSize: 34, lineHeight: 42, color: ct.ink },
  cardName: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.muted },
  price: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.ink },
  promo: { fontFamily: F.semibold, fontSize: 19, lineHeight: 26, color: ct.onPromo },
  promoCta: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 19, color: ct.ink },
  badge: { fontFamily: F.bold, fontSize: 10.5, lineHeight: 14, color: ct.onInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nookshop goes through this. */
export function T({ variant = 'cardName', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
