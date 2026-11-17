import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * zonestart's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Every colour sits on the brand red, so each is checked against that rather
 * than against white (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  banner: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.ink },
  /** The headline — the dominant element on the screen (R8). */
  headline: { fontFamily: F.extra, fontSize: 36, lineHeight: 44, color: ct.ink },
  action: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ctaInk },
  actionOutline: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  legal: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 15, color: ct.fine },
  legalLink: { fontFamily: F.bold, fontSize: 10.5, lineHeight: 15, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on zonestart goes through this. */
export function T({ variant = 'legal', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
