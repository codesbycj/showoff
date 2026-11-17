import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * tamargym's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The venue name — the dominant element below the photograph (R8). */
  venue: { fontFamily: F.extra, fontSize: 21, lineHeight: 27, color: ct.ink },
  rating: { fontFamily: F.bold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  reviews: { fontFamily: F.regular, fontSize: 11, lineHeight: 17, color: ct.sub },
  address: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.sub },

  chip: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  price: { fontFamily: F.extra, fontSize: 25, lineHeight: 32, color: ct.ink },
  priceUnit: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 32, color: ct.sub },
  priceAlt: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.subOnSoft },

  about: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 20, color: ct.sub },

  factLabel: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  factValue: { fontFamily: F.bold, fontSize: 13.5, lineHeight: 18, color: ct.ink },

  reserve: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.darkInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on tamargym goes through this. */
export function T({ variant = 'about', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
