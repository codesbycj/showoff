import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * fernhome's type scale. One variant per role, sized for a 393dp phone (I2).
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
  hello: { fontFamily: F.semibold, fontSize: 17, lineHeight: 23, color: ct.ink },
  weatherLabel: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.muted },
  weather: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  country: {
    fontFamily: F.semibold,
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: 0.8,
    color: ct.muted,
  },
  /** The headline - the dominant element on the screen (R8). */
  display: { fontFamily: F.extra, fontSize: 40, lineHeight: 46, color: ct.ink },

  chip: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.onForest },

  tripTitle: { fontFamily: F.bold, fontSize: 22, lineHeight: 28, color: ct.white },
  tripBody: {
    fontFamily: F.regular,
    fontSize: 12.5,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.9)',
  },
  fact: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.white },
  /** The hero's ghost button, which sits on the photograph. */
  cta: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.white },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on fernhome goes through this. */
export function T({ variant = 'chip', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
