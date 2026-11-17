import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * globestay's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The place name — the dominant element on the sheet (R8). */
  place: { fontFamily: F.extra, fontSize: 22, lineHeight: 28, color: ct.ink },
  meta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  rating: { fontFamily: F.bold, fontSize: 12, lineHeight: 16, color: ct.ink },
  price: { fontFamily: F.extra, fontSize: 22, lineHeight: 28, color: ct.ink },
  priceUnit: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 28, color: ct.sub },

  chip: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  sectionTitle: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  about: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.sub },

  totalLabel: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  totalValue: { fontFamily: F.bold, fontSize: 14, lineHeight: 19, color: ct.ink },

  ghost: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  cta: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, color: ct.brandInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on globestay goes through this. */
export function T({ variant = 'about', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
