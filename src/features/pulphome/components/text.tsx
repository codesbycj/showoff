import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * pulphome's type scale. One variant per role, sized for a 393dp phone (I2).
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
  greet: { fontFamily: F.medium, fontSize: 14, lineHeight: 19, color: ct.ink },
  /** The ask - the dominant element on the screen (R8). */
  display: { fontFamily: F.bold, fontSize: 32, lineHeight: 40, color: ct.ink },
  sub: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.muted },
  chip: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.ink },
  cardName: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.ink },
  cardSize: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  price: { fontFamily: F.bold, fontSize: 16, lineHeight: 22, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on pulphome goes through this. */
export function T({ variant = 'sub', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
