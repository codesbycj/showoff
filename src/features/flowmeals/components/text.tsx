import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * flowmeals's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Two families, as the board sets them: **Instrument Serif** for the display
 * lines and Plus Jakarta Sans for everything else, both registered per weight
 * in `src/theme/fonts.ts`. At matched cap height the serif runs a little
 * narrower than the board's, so the headline is set a step larger than a
 * straight conversion would give (§6.2).
 *
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 */
const F = {
  serif: 'InstrumentSerif_400Regular',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  /** The phase headline - the dominant element on the screen (R8). */
  display: { fontFamily: F.serif, fontSize: 30, lineHeight: 38, color: ct.ink },
  slot: { fontFamily: F.bold, fontSize: 10, lineHeight: 14, letterSpacing: 0.9, color: ct.roseInk },
  meal: { fontFamily: F.serif, fontSize: 22, lineHeight: 28, color: ct.ink },
  mealSmall: { fontFamily: F.serif, fontSize: 17, lineHeight: 23, color: ct.ink },
  facts: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  section: { fontFamily: F.semibold, fontSize: 16, lineHeight: 22, color: ct.ink },
  tabOn: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.ink },
  tabOff: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.muted },
  body: { fontFamily: F.regular, fontSize: 14.5, lineHeight: 21, color: ct.muted },
  cta: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 21, color: ct.onDark },
  link: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 19, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on flowmeals goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
