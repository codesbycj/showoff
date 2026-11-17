import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * vaultadvisor's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * **Two families, as the board sets them**: a serif for the wordmark and the
 * name, a grotesque for everything else. Instrument Serif is the closest free
 * substitute for the board's editorial face; at a matched cap height it runs
 * narrower, so the name sits a step larger than the board's apparent size.
 */
const F = {
  serif: 'InstrumentSerif_400Regular',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.serif, fontSize: 23, lineHeight: 30, color: ct.ink },
  /** The advisor - the dominant line under the portrait (R8). */
  name: { fontFamily: F.serif, fontSize: 42, lineHeight: 50, color: ct.ink },
  role: { fontFamily: F.regular, fontSize: 15, lineHeight: 22, color: ct.ink },
  place: { fontFamily: F.regular, fontSize: 15, lineHeight: 22, color: ct.muted },
  trust: { fontFamily: F.regular, fontSize: 14, lineHeight: 20, color: ct.ink },
  credValue: { fontFamily: F.serif, fontSize: 24, lineHeight: 30, color: ct.ink },
  credLabel: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on vaultadvisor goes through this. */
export function T({ variant = 'role', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
