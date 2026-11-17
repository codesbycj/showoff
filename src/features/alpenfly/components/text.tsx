import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * alpenfly's type scale. One variant per role, sized for a 393dp phone (I2).
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
  modeOn: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.onDark },
  modeOff: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.muted },

  code: { fontFamily: F.bold, fontSize: 22, lineHeight: 29, color: ct.ink },
  city: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  chip: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.onLime },

  dayLabel: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.muted },
  dayDate: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.ink },
  dayDateOn: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.onLime },

  /** The result count - the dominant line on the screen (R8). */
  count: { fontFamily: F.bold, fontSize: 22, lineHeight: 29, color: ct.ink },
  rail: { fontFamily: F.bold, fontSize: 11, lineHeight: 15, letterSpacing: 1.4, color: ct.onLime },
  clock: { fontFamily: F.semibold, fontSize: 16, lineHeight: 21, color: ct.ink },
  stubLabel: { fontFamily: F.regular, fontSize: 10, lineHeight: 14, color: ct.muted },
  stubValue: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  duration: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on alpenfly goes through this. */
export function T({ variant = 'city', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
