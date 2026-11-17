import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * lumistock's type scale. One variant per role, sized for a 393dp phone (I2).
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
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  currency: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  company: { fontFamily: F.extra, fontSize: 21, lineHeight: 27, color: ct.ink },
  shares: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  /** The price — the dominant element on the screen (R8). */
  price: { fontFamily: F.extra, fontSize: 29, lineHeight: 37, color: ct.ink },
  moveUp: { fontFamily: F.semibold, fontSize: 12, lineHeight: 16, color: ct.up },
  moveDown: { fontFamily: F.semibold, fontSize: 12, lineHeight: 16, color: ct.down },
  moveMeta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  blurb: { fontFamily: F.medium, fontSize: 15, lineHeight: 22, color: ct.ink },

  callout: { fontFamily: F.extra, fontSize: 19, lineHeight: 25, color: ct.up },
  axis: { fontFamily: F.regular, fontSize: 10, lineHeight: 14, color: ct.sub },
  yearPill: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },

  sectionTitle: { fontFamily: F.bold, fontSize: 16, lineHeight: 21, color: ct.ink },
  statLabel: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.sub },
  statValue: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },

  report: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on lumistock goes through this. */
export function T({ variant = 'statValue', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
