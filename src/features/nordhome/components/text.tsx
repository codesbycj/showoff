import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nordhome's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The hero headline — the dominant element on the screen (R8). */
  hero: { fontFamily: F.semibold, fontSize: 23, lineHeight: 31, color: ct.white },
  place: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.white },

  pillTitle: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.white },
  pillMeta: {
    fontFamily: F.medium,
    fontSize: 12.5,
    lineHeight: 17,
    color: 'rgba(255,255,255,0.86)',
  },

  section: { fontFamily: F.bold, fontSize: 20, lineHeight: 26, color: ct.ink },
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

  dockOn: { fontFamily: F.bold, fontSize: 11, lineHeight: 15, color: ct.onDark },
  dockOff: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.onDarkMuted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nordhome goes through this. */
export function T({ variant = 'meta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
