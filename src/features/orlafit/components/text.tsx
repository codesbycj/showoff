import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * orlafit's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * **Two families, as the board sets them**: a serif for the display lines and
 * a grotesque for everything else. Instrument Serif is the closest free
 * substitute for the board's editorial face; at a matched cap height it runs
 * narrower, so the display sits a step larger than the board's apparent size.
 */
const F = {
  serif: 'InstrumentSerif_400Regular',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.medium, fontSize: 15, lineHeight: 20, letterSpacing: 3, color: ct.ink },
  /** The headline - the dominant element on the screen (R8). */
  display: { fontFamily: F.serif, fontSize: 38, lineHeight: 44, color: ct.ink },
  displayMuted: { fontFamily: F.serif, fontSize: 38, lineHeight: 44, color: ct.muted },
  cardName: { fontFamily: F.serif, fontSize: 22, lineHeight: 28, color: ct.ink },
  cardKind: { fontFamily: F.serif, fontSize: 22, lineHeight: 28, color: ct.muted },
  price: { fontFamily: F.serif, fontSize: 30, lineHeight: 36, color: ct.ink },
  cta: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  factValue: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  factLabel: {
    fontFamily: F.regular,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.6,
    color: ct.muted,
  },
  tryCta: {
    fontFamily: F.medium,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 1.1,
    color: ct.white,
  },
  /** The screen's instruction - the dominant element above the frame (R8). */
  fitTitle: { fontFamily: F.serif, fontSize: 30, lineHeight: 37, color: ct.ink },
  fitSub: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  fitNote: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on orlafit goes through this. */
export function T({ variant = 'cta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
