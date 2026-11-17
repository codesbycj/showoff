import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * globestart's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Every colour sits on a photograph under a scrim, so each is checked against
 * the scrim's darkest band rather than against white (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.extra, fontSize: 27, lineHeight: 34, color: ct.ink },
  /** The headline — the dominant element on the screen (R8). */
  headline: { fontFamily: F.extra, fontSize: 32, lineHeight: 40, color: ct.ink },
  subline: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 19, color: ct.sub },
  chip: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, color: ct.chipInk },
  hint: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.sub },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on globestart goes through this. */
export function T({ variant = 'subline', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
