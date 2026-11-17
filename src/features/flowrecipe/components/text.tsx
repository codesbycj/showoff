import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * flowrecipe's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Two families, as the board sets them: **Instrument Serif** for the dish name
 * and Plus Jakarta Sans for everything else, both registered per weight in
 * `src/theme/fonts.ts`. `fontWeight` is deliberately absent alongside a named
 * face: Android synthesises a second bolding on top of the real one.
 *
 * A missing variant is not a crash — `style={[undefined, style]}` simply falls
 * back to the platform face, which is how this screen first shipped its title
 * in the wrong typeface until `tsc` named it.
 */
const F = {
  serif: 'InstrumentSerif_400Regular',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  slot: { fontFamily: F.bold, fontSize: 10, lineHeight: 14, letterSpacing: 0.9, color: ct.roseInk },
  /** The dish — the dominant element below the photograph (R8). */
  title: { fontFamily: F.serif, fontSize: 30, lineHeight: 38, color: ct.ink },
  facts: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  macro: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.ink },
  tipLabel: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.lilacInk },
  tipBody: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  tabOnX: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  tabOffX: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.muted },
  item: { fontFamily: F.regular, fontSize: 14, lineHeight: 19, color: ct.ink },
  amount: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.muted },
  cta: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 21, color: ct.onDark },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on flowrecipe goes through this. */
export function T({ variant = 'facts', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
