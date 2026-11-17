import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * slurpdish's type scale. One variant per role, sized for a 393dp phone (I2).
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
  barLabel: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 15, color: ct.onDarkMuted },
  barValue: { fontFamily: F.medium, fontSize: 12, lineHeight: 17, color: ct.onDark },
  /** The dish - the dominant line on the screen (R8). */
  heroTitle: { fontFamily: F.semibold, fontSize: 27, lineHeight: 34, color: ct.onDark },
  heroSub: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.onDarkMuted },
  heroCur: { fontFamily: F.medium, fontSize: 14, lineHeight: 20, color: ct.accent },
  heroPrice: { fontFamily: F.bold, fontSize: 30, lineHeight: 38, color: ct.onDark },
  qty: { fontFamily: F.medium, fontSize: 13, lineHeight: 18, color: ct.onDark },
  sizeLabel: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.onDarkMuted },
  sizeLabelOn: { fontFamily: F.semibold, fontSize: 11, lineHeight: 15, color: ct.onDark },
  sheetTitle: { fontFamily: F.semibold, fontSize: 19, lineHeight: 26, color: ct.ink },
  body: {
    fontFamily: F.regular,
    fontSize: 12.5,
    lineHeight: 19,
    color: ct.muted,
    textAlign: 'center' as const,
  },
  chip: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.ink },
  section: { fontFamily: F.semibold, fontSize: 14, lineHeight: 20, color: ct.ink },
  extra: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.ink },
  extraPrice: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.accentInk },
  selected: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 19, color: ct.onDark },
  total: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.onDark },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on slurpdish goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
