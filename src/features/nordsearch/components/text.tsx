import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nordsearch's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`, standing in
 * for the board's geometric grotesque. `fontWeight` is deliberately absent
 * alongside a named face: Android synthesises a second bolding on top of the
 * real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  sheetTitle: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },
  queryPlace: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.ink },
  queryMeta: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  chipOn: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.onDark },
  chipOff: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  cardTitle: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 21, color: ct.ink },
  rating: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },
  meta: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  priceNow: { fontFamily: F.bold, fontSize: 13.5, lineHeight: 19, color: ct.ink },
  priceWas: {
    fontFamily: F.medium,
    fontSize: 13.5,
    lineHeight: 19,
    color: ct.faint,
    textDecorationLine: 'line-through',
  },
  priceTotal: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 19, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nordsearch goes through this. */
export function T({ variant = 'meta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
