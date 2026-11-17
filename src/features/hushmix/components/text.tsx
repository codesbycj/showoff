import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * hushmix's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
} as const;

const variants = {
  /** The session - the dominant line on the screen (R8). */
  session: { fontFamily: F.semibold, fontSize: 25, lineHeight: 33, color: ct.onDark },
  by: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.onDarkMuted },
  rowTitle: { fontFamily: F.medium, fontSize: 16, lineHeight: 23, color: ct.onDark },
  rowValue: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.onDarkMuted },
  tag: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 15, color: ct.onChip },
  pick: { fontFamily: F.medium, fontSize: 13, lineHeight: 19, color: ct.onDark },
  genre: {
    fontFamily: F.regular,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.6,
    color: ct.onDarkMuted,
  },
  track: { fontFamily: F.medium, fontSize: 14.5, lineHeight: 21, color: ct.onDark },
  edge: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 15, color: ct.onDarkMuted },
  cta: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.onPill },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on hushmix goes through this. */
export function T({ variant = 'rowValue', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
