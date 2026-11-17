import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * foldspend's type scale. One variant per role, sized for a 393dp phone (I2).
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
  totalLabel: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  /** What was spent - the dominant figure on the screen (R8). */
  total: { fontFamily: F.bold, fontSize: 34, lineHeight: 44, color: ct.ink },
  axis: { fontFamily: F.regular, fontSize: 9.5, lineHeight: 13, color: ct.onNavyMuted },
  chip: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  tileLabel: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: '#3F4A33' },
  tileValue: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },
  section: { fontFamily: F.bold, fontSize: 17, lineHeight: 24, color: ct.ink },
  filter: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  catLabel: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.muted },
  catValue: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },
  txName: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },
  txKind: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  txOut: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 19, color: ct.ink },
  txIn: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 19, color: '#2E7A1E' },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on foldspend goes through this. */
export function T({ variant = 'txKind', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
