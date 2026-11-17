import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * crypinhome's type scale. One variant per role, sized for a 393dp phone
 * (INSPO-RULES I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`. `fontWeight`
 * is deliberately absent alongside a named face: Android synthesises a second
 * bolding on top of the real one.
 *
 * Every colour here is chosen against a dark ground. Reusing a light theme's
 * greys is what makes text vanish on black (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  brand: { fontFamily: F.bold, fontSize: 16, lineHeight: 22, color: ct.ink },

  heroLabel: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.sub },
  /** The portfolio figure — the dominant element on the screen (R8). */
  heroValue: { fontFamily: F.extra, fontSize: 36, lineHeight: 44, color: ct.ink },
  /** The cents, set down a step as the reference does. */
  heroCents: { fontFamily: F.extra, fontSize: 24, lineHeight: 44, color: 'rgba(255,255,255,0.55)' },
  heroChange: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.up },

  actionLabel: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.sub },

  coinName: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  coinValue: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  viewAll: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.sub },

  sectionTitle: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },

  tab: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.sub },
  tabOn: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  rowName: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  rowTicker: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  rowPrice: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  rowUp: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.up },
  rowDown: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.down },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on crypinhome goes through this. */
export function T({ variant = 'rowName', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
