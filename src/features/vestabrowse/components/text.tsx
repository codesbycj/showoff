import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * vestabrowse's type scale. One variant per role, sized for a 393dp phone (I2).
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
  greeting: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  placeholder: { fontFamily: F.regular, fontSize: 14, lineHeight: 19, color: ct.sub },

  /** The promo headline — the dominant element on the screen (R8). */
  promo: { fontFamily: F.extra, fontSize: 23, lineHeight: 28, color: ct.onDark },
  promoLead: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.onDark },
  promoValue: { fontFamily: F.extra, fontSize: 19, lineHeight: 25, color: ct.accent },
  promoCta: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.accentInk },

  chip: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.onDark },

  sectionTitle: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },
  sectionMore: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.sub },

  cardCategory: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },
  cardName: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  cardPrice: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  cardWas: {
    fontFamily: F.medium,
    fontSize: 11.5,
    lineHeight: 20,
    color: ct.strike,
    textDecorationLine: 'line-through',
  },

  tab: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.accentInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on vestabrowse goes through this. */
export function T({ variant = 'cardName', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
