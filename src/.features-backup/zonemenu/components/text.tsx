import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * zonemenu's type scale. One variant per role, sized for a 393dp phone (I2).
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
  bannerKicker: { fontFamily: F.extra, fontSize: 22, lineHeight: 26, color: ct.onDark },
  bannerWord: { fontFamily: F.extra, fontSize: 30, lineHeight: 34, color: ct.onDark },

  /** The restaurant name — the dominant element below the banner (R8). */
  place: { fontFamily: F.extra, fontSize: 19, lineHeight: 25, color: ct.ink },
  rating: { fontFamily: F.bold, fontSize: 12, lineHeight: 17, color: ct.ink },
  meta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 17, color: ct.sub },
  badge: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 17, color: ct.brand },

  deliveryLabel: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  deliveryValue: { fontFamily: F.bold, fontSize: 13.5, lineHeight: 18, color: ct.ink },

  offerValue: { fontFamily: F.extra, fontSize: 15, lineHeight: 20, color: ct.ink },
  offerNote: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.sub },

  tab: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.sub },
  tabOn: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.ink },

  dish: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  price: { fontFamily: F.bold, fontSize: 13.5, lineHeight: 18, color: ct.brand },
  was: {
    fontFamily: F.medium,
    fontSize: 11,
    lineHeight: 18,
    color: ct.sub,
    textDecorationLine: 'line-through',
  },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on zonemenu goes through this. */
export function T({ variant = 'meta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
