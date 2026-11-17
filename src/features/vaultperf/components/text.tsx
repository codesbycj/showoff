import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * vaultperf's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * **Two families, as the board sets them**: a serif for the wordmark and the
 * figures, a grotesque for the labels. Instrument Serif is the closest free
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
  wordmark: { fontFamily: F.serif, fontSize: 23, lineHeight: 30, color: ct.ink },
  pill: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  /** The return - the dominant figure on the screen (R8). */
  display: { fontFamily: F.serif, fontSize: 60, lineHeight: 70, color: ct.ink },
  caption: { fontFamily: F.regular, fontSize: 14, lineHeight: 20, color: ct.ink },
  compare: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  tileFigure: { fontFamily: F.serif, fontSize: 34, lineHeight: 42, color: ct.ink },
  tileLabel: { fontFamily: F.medium, fontSize: 14.5, lineHeight: 21, color: ct.ink },
  tileNote: { fontFamily: F.regular, fontSize: 12, lineHeight: 17, color: ct.inkSoft },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on vaultperf goes through this. */
export function T({ variant = 'caption', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
