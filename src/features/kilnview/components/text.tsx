import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * kilnview's type scale. One variant per role, sized for a 393dp phone (I2).
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
  mode: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.onDarkMuted },
  modeOn: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.onDark },
  pieceName: { fontFamily: F.semibold, fontSize: 17, lineHeight: 23, color: ct.onDark },
  pieceMaker: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.onDarkMuted },
  finish: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.onDarkMuted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on kilnview goes through this. */
export function T({ variant = 'finish', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
