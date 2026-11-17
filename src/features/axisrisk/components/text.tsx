import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * axisrisk's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The risk - the dominant line on the screen (R8). */
  display: { fontFamily: F.bold, fontSize: 28, lineHeight: 36, color: ct.ink },
  cardLabel: { fontFamily: F.semibold, fontSize: 16, lineHeight: 23, color: ct.ink },
  grade: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.onDark },
  cellLabel: { fontFamily: F.regular, fontSize: 12, lineHeight: 17, color: ct.muted },
  cellValue: { fontFamily: F.semibold, fontSize: 15, lineHeight: 22, color: ct.ink },
  section: { fontFamily: F.bold, fontSize: 19, lineHeight: 26, color: ct.ink },
  name: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 21, color: ct.ink },
  stageIndigo: { fontFamily: F.semibold, fontSize: 12, lineHeight: 17, color: ct.indigo },
  stageMagenta: { fontFamily: F.semibold, fontSize: 12, lineHeight: 17, color: ct.magentaInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on axisrisk goes through this. */
export function T({ variant = 'cellValue', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
