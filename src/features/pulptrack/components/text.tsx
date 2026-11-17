import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * pulptrack's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The state of the order - the dominant line in the sheet (R8). */
  sheetTitle: { fontFamily: F.bold, fontSize: 20, lineHeight: 27, color: ct.ink },
  eta: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  stepLabel: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.muted },
  personName: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  personRole: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on pulptrack goes through this. */
export function T({ variant = 'personRole', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
