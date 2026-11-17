import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * verdehome's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Poppins, registered per weight in `src/theme/fonts.ts`, standing in for the
 * board's rounded grotesque. `fontWeight` is deliberately absent alongside a
 * named face: Android synthesises a second bolding on top of the real one.
 */
const F = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

const variants = {
  welcome: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 19, color: ct.muted },
  name: { fontFamily: F.semibold, fontSize: 19, lineHeight: 26, color: ct.ink },

  searchHint: { fontFamily: F.regular, fontSize: 14.5, lineHeight: 20, color: ct.muted },

  promoKicker: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.onGreen },
  /** The promo heading — the dominant element on the screen (R8). */
  promoTitle: { fontFamily: F.semibold, fontSize: 25, lineHeight: 32, color: ct.onGreen },
  promoCta: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.greenDeep },

  section: { fontFamily: F.semibold, fontSize: 19, lineHeight: 26, color: ct.ink },
  seeAll: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.muted },

  chipOn: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.onGreen },
  chipOff: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },

  dish: { fontFamily: F.medium, fontSize: 14, lineHeight: 19, color: ct.ink },
  kcal: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.muted },
  price: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.priceInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on verdehome goes through this. */
export function T({ variant = 'dish', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
