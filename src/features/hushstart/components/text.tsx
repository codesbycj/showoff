import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * hushstart's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
} as const;

const variants = {
  wordmark: {
    fontFamily: F.semibold,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.4,
    color: ct.onDark,
  },
  skip: { fontFamily: F.medium, fontSize: 14, lineHeight: 20, color: ct.onDark },
  /** The promise - the dominant line on the screen (R8). */
  display: { fontFamily: F.semibold, fontSize: 30, lineHeight: 38, color: ct.onDark },
  body: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.onDarkMuted },
  cta: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.onPill },
  mood: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.onDark },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on hushstart goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
