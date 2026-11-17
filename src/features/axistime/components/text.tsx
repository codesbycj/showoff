import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * axistime's type scale. One variant per role, sized for a 393dp phone (I2).
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
  count: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.ink },
  /** The screen's subject - the dominant line on it (R8). */
  display: { fontFamily: F.bold, fontSize: 31, lineHeight: 39, color: ct.ink },
  day: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  dayOn: { fontFamily: F.bold, fontSize: 12.5, lineHeight: 18, color: ct.ink },
  kindDark: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.onDarkMuted },
  kindLight: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  titleDark: { fontFamily: F.semibold, fontSize: 16, lineHeight: 23, color: ct.onDark },
  titleLight: { fontFamily: F.semibold, fontSize: 16, lineHeight: 23, color: ct.ink },
  priority: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 18, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on axistime goes through this. */
export function T({ variant = 'day', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
