import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * zoneroute's type scale. One variant per role, sized for a 393dp phone (I2).
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
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  /** The ETA — the dominant element on the sheet (R8). */
  eta: { fontFamily: F.extra, fontSize: 27, lineHeight: 34, color: ct.ink },
  etaLabel: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.sub },
  distance: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  riderName: { fontFamily: F.bold, fontSize: 14, lineHeight: 19, color: ct.ink },
  riderRole: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  rating: { fontFamily: F.bold, fontSize: 12, lineHeight: 17, color: ct.ink },

  stepDone: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  stepTodo: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.sub },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on zoneroute goes through this. */
export function T({ variant = 'stepTodo', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
