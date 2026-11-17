import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * cocoahome's type scale. One variant per role, sized for a 393dp phone (I2).
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
  /** The ask - the dominant element at the top (R8). */
  title: { fontFamily: F.semibold, fontSize: 22, lineHeight: 30, color: ct.ink },
  chip: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.onDark },
  section: { fontFamily: F.semibold, fontSize: 16, lineHeight: 22, color: ct.ink },
  cardName: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.ink },
  cardSub: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  price: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },
  barLabel: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.onDark },
  barCount: {
    fontFamily: F.regular,
    fontSize: 11.5,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.72)',
  },
  badge: { fontFamily: F.bold, fontSize: 11, lineHeight: 15, color: ct.onYellow },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on cocoahome goes through this. */
export function T({ variant = 'cardSub', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
