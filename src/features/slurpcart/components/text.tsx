import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * slurpcart's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Poppins is the closest free substitute for the board's geometric sans - a
 * single-storey `a` and `g`, matched to within 2% of its width-to-cap ratio.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 */
const F = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

const variants = {
  /** The screen's name - the dominant line at the top (R8). */
  screenTitle: { fontFamily: F.semibold, fontSize: 17, lineHeight: 24, color: ct.ink },
  lineName: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  meta: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 15, color: ct.muted },
  cur: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 15, color: ct.accentInk },
  linePrice: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },
  qty: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.ink },
  code: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  codeState: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.onAccent },
  section: { fontFamily: F.semibold, fontSize: 15, lineHeight: 21, color: ct.ink },
  rowLabel: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  rowValue: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.ink },
  totalLabel: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 19, color: ct.ink },
  totalValue: { fontFamily: F.bold, fontSize: 19, lineHeight: 26, color: ct.ink },
  cta: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.onDark },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on slurpcart goes through this. */
export function T({ variant = 'meta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
