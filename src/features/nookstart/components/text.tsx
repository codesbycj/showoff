import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nookstart's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The headline - the dominant element on the screen (R8). */
  display: { fontFamily: F.regular, fontSize: 40, lineHeight: 48, color: ct.ink },
  cta: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.onInk },
  count: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 20, color: ct.muted },
  wordmark: {
    fontFamily: F.semibold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 2.4,
    paddingRight: 2.4,
    color: ct.ink,
  },
  browse: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 19, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nookstart goes through this. */
export function T({ variant = 'display', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
