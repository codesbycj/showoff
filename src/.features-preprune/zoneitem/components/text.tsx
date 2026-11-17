import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * zoneitem's type scale. One variant per role, sized for a 393dp phone (I2).
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
  badge: { fontFamily: F.semibold, fontSize: 11, lineHeight: 15, color: ct.ink },
  /** The dish name — the dominant element below the photograph (R8). */
  name: { fontFamily: F.extra, fontSize: 21, lineHeight: 27, color: ct.ink },
  meta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  price: { fontFamily: F.extra, fontSize: 19, lineHeight: 25, color: ct.ink },
  blurb: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.sub },

  sectionTitle: { fontFamily: F.bold, fontSize: 14.5, lineHeight: 19, color: ct.ink },
  sectionNote: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },
  optional: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.sub },

  option: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  optionPrice: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 18, color: ct.sub },

  qty: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  cta: { fontFamily: F.bold, fontSize: 15.5, lineHeight: 21, color: ct.brandInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on zoneitem goes through this. */
export function T({ variant = 'option', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
