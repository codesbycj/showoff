import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * voltitem's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`, standing
 * in for the board's grotesque. `fontWeight` is deliberately absent alongside
 * a named face: Android synthesises a second bolding on top of the real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  /** The product name - the dominant element under the gallery (R8). */
  title: { fontFamily: F.bold, fontSize: 21, lineHeight: 28, color: ct.ink },
  maker: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.muted },
  pill: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  fact: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  finance: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  cta: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.acidInk },
  delivery: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  finish: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  /** Section headings — "Categories", "Flash Sale" (R8's second tier). */
  section: { fontFamily: F.bold, fontSize: 19, lineHeight: 25, color: ct.ink },
  seeAll: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.muted },
  timer: { fontFamily: F.bold, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  tile: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.ink },

  productTitle: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18.5, color: ct.ink },
  price: { fontFamily: F.bold, fontSize: 16, lineHeight: 21, color: ct.ink },
  was: {
    fontFamily: F.medium,
    fontSize: 13,
    lineHeight: 18,
    color: ct.wasInk,
    textDecorationLine: 'line-through',
  },

  tabOn: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.ink },
  tabOff: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.muted },
  badge: { fontFamily: F.bold, fontSize: 10, lineHeight: 13, color: ct.flagInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on voltitem goes through this. */
export function T({ variant = 'productTitle', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
