import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * skyresults's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Poppins, registered per weight in `src/theme/fonts.ts`, standing in for the
 * board's geometric display face. `fontWeight` is deliberately absent
 * alongside a named face: Android synthesises a second bolding on top of the
 * real one.
 */
const F = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

const variants = {
  /** The page title. */
  title: { fontFamily: F.semibold, fontSize: 22, lineHeight: 29, color: ct.ink },
  chipOn: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.onDark },
  chipOff: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  price: { fontFamily: F.semibold, fontSize: 22, lineHeight: 28, color: ct.accent },
  per: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  cta: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.onDark },
  flag: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.accent },

  airline: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  clock: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.accent },
  code: { fontFamily: F.semibold, fontSize: 19, lineHeight: 25, color: ct.ink },
  city: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  duration: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  stub: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.label },
  stubValue: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on skyresults goes through this. */
export function T({ variant = 'city', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
