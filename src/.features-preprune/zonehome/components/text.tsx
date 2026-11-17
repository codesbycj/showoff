import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * zonehome's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * The header variants are checked against the dark scrim, the rest against
 * white (R4) — a token has to clear every ground it lands on.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  locLabel: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.onDarkSub },
  locValue: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.onDark },

  /** The promo figure — the dominant element on the screen (R8). */
  promoValue: { fontFamily: F.extra, fontSize: 32, lineHeight: 38, color: ct.onDark },
  promoLabel: { fontFamily: F.bold, fontSize: 12, lineHeight: 15, color: ct.onDark },
  promoLine: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.onDarkSub },

  placeholder: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 18, color: ct.sub },

  category: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.ink },
  sectionTitle: { fontFamily: F.extra, fontSize: 17, lineHeight: 23, color: ct.ink },

  offer: { fontFamily: F.bold, fontSize: 10.5, lineHeight: 14, color: ct.brandInk },
  cardName: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 19, color: ct.ink },
  cardMeta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  rating: { fontFamily: F.bold, fontSize: 11.5, lineHeight: 16, color: ct.ink },

  tab: { fontFamily: F.medium, fontSize: 10, lineHeight: 13, color: ct.sub },
  tabOn: { fontFamily: F.semibold, fontSize: 10, lineHeight: 13, color: ct.brand },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on zonehome goes through this. */
export function T({ variant = 'cardMeta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
