import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * tamarstart's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Every colour here sits on a photograph under a scrim, so each is checked
 * against the scrim's darkest band rather than against white (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.extra, fontSize: 21, lineHeight: 27, color: ct.ink },
  /** The headline — the dominant element on the screen (R8). */
  headline: { fontFamily: F.extra, fontSize: 29, lineHeight: 38, color: ct.ink },
  body: { fontFamily: F.regular, fontSize: 14, lineHeight: 21, color: ct.sub },
  cta: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.accentInk },
  aside: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on tamarstart goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
