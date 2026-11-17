import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * pulpitem's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The drink's name - the dominant line under the photograph (R8). */
  title: { fontFamily: F.bold, fontSize: 24, lineHeight: 31, color: ct.ink },
  size: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  tag: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  section: { fontFamily: F.semibold, fontSize: 16, lineHeight: 22, color: ct.ink },
  factLabel: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.muted },
  factValue: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  qty: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.ink },
  cta: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.onDark },
  ctaPrice: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 20, color: ct.onDark },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on pulpitem goes through this. */
export function T({ variant = 'size', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
