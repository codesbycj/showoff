import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * ferntrip's type scale. One variant per role, sized for a 393dp phone (I2).
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
  weatherLabel: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.muted },
  weather: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  altitude: { fontFamily: F.medium, fontSize: 14, lineHeight: 19, color: ct.white },
  summit: { fontFamily: F.extra, fontSize: 36, lineHeight: 42, color: ct.white },
  badge: { fontFamily: F.bold, fontSize: 11.5, lineHeight: 15, color: ct.ink },

  country: {
    fontFamily: F.semibold,
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: 0.9,
    color: ct.ink,
  },
  /** The trip's headline — the dominant element on the sheet (R8). */
  title: { fontFamily: F.extra, fontSize: 32, lineHeight: 40, color: ct.ink },

  chip: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },

  stayName: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },
  stayLine: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.muted },
  rating: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  link: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.link },
  price: { fontFamily: F.bold, fontSize: 19, lineHeight: 25, color: ct.ink },
  per: { fontFamily: F.regular, fontSize: 14, lineHeight: 19, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on ferntrip goes through this. */
export function T({ variant = 'chip', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
