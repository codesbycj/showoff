import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * pawshome's type scale. One variant per role, sized for a 393dp phone (I2).
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
  greeting: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 19, color: ct.muted },
  /** The ask — the dominant element at the top of the screen (R8). */
  title: { fontFamily: F.bold, fontSize: 22, lineHeight: 29, color: ct.ink },
  search: { fontFamily: F.regular, fontSize: 14, lineHeight: 20, color: ct.muted },

  chip: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  section: { fontFamily: F.bold, fontSize: 16, lineHeight: 22, color: ct.ink },
  seeAll: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.accentInk },

  cardName: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  cardSub: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  rating: { fontFamily: F.medium, fontSize: 12, lineHeight: 17, color: ct.ink },
  price: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },

  tabOn: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.ink },
  tabOff: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on pawshome goes through this. */
export function T({ variant = 'cardSub', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
