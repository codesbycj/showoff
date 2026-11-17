import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * quranthree's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Every colour sits on the night gradient, so each is checked against its
 * darkest band rather than against white (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },
  skip: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.sub },

  /** The headline — the dominant element on the screen (R8). */
  headline: { fontFamily: F.extra, fontSize: 27, lineHeight: 35, color: ct.ink },
  body: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.sub },
  cta: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.ctaInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on quranthree goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
