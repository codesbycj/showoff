import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * axisprofile's type scale. One variant per role, sized for a 393dp phone (I2).
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
  tab: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.muted },
  tabOn: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  count: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.ink },
  /** The function under review - the dominant line on the screen (R8). */
  display: { fontFamily: F.bold, fontSize: 31, lineHeight: 39, color: ct.ink },
  cellLabel: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  cellValue: { fontFamily: F.semibold, fontSize: 16, lineHeight: 23, color: ct.ink },
  groupLabel: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  more: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.onDark },
  section: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  body: { fontFamily: F.regular, fontSize: 14, lineHeight: 21, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on axisprofile goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
