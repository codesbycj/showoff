import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * skyticket's type scale. One variant per role, sized for a 393dp phone (I2).
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
  reference: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  section: { fontFamily: F.semibold, fontSize: 17, lineHeight: 23, color: ct.ink },
  index: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.label },
  name: { fontFamily: F.medium, fontSize: 15, lineHeight: 20, color: ct.ink },
  seat: { fontFamily: F.semibold, fontSize: 16, lineHeight: 21, color: ct.ink },
  cta: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 21, color: ct.onDark },

  airline: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  clock: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.accent },
  code: { fontFamily: F.semibold, fontSize: 19, lineHeight: 25, color: ct.ink },
  city: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  duration: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  stub: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.label },
  stubValue: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on skyticket goes through this. */
export function T({ variant = 'city', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
