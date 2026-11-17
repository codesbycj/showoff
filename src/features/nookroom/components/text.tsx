import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nookroom's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Every string here sits on a photograph, so each carries its own ground
 * rather than relying on the frame behind it (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
} as const;

const variants = {
  price: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  look: { fontFamily: F.medium, fontSize: 12, lineHeight: 17, color: ct.onInk },
  pieceName: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 22, color: ct.ink },
  pieceMeta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  detail: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nookroom goes through this. */
export function T({ variant = 'price', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
