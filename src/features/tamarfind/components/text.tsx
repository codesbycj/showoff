import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * tamarfind's type scale. One variant per role, sized for a 393dp phone (I2).
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
  wordmark: { fontFamily: F.extra, fontSize: 17, lineHeight: 22, color: ct.ink },
  placeholder: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 18, color: ct.sub },

  sectionTitle: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  chip: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.darkInk },

  pin: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.ink },
  pinOn: { fontFamily: F.bold, fontSize: 11.5, lineHeight: 16, color: ct.darkInk },

  /** The venue name — the dominant element inside the result card (R8). */
  venue: { fontFamily: F.extra, fontSize: 17, lineHeight: 23, color: ct.ink },
  rating: { fontFamily: F.bold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  reviews: { fontFamily: F.regular, fontSize: 11, lineHeight: 17, color: ct.sub },
  meta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  price: { fontFamily: F.extra, fontSize: 15, lineHeight: 20, color: ct.ink },
  priceUnit: { fontFamily: F.medium, fontSize: 11, lineHeight: 20, color: ct.sub },
  reserve: { fontFamily: F.bold, fontSize: 13.5, lineHeight: 18, color: ct.darkInk },

  tab: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.sub },
  tabOn: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.accent },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on tamarfind goes through this. */
export function T({ variant = 'meta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
