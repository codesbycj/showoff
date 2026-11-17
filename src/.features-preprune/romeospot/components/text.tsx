import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * romeospot's type scale. One variant per role, sized for a 393dp phone
 * (INSPO-RULES I2) rather than scaled off the board's artboard.
 *
 * Plus Jakarta Sans stands in for the reference's face — a geometric sans with
 * the same open apertures and a single-storey `g`. It is already registered in
 * `src/theme/fonts.ts`, so this showcase adds no face and drifts no other
 * showcase's lock.
 *
 * Families are named per weight because React Native resolves a face by family
 * name, not by numeric weight. `fontWeight` is deliberately absent: setting it
 * alongside a named face makes Android synthesise a second bolding on top of
 * the real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  /** Restaurant name over the photograph — the dominant string on the screen. */
  heroTitle: { fontFamily: F.bold, fontSize: 21, lineHeight: 27, color: ct.onPhoto },
  heroMeta: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.onPhotoDim },
  /** Text inside the two glass pills on the photograph. */
  pill: { fontFamily: F.semibold, fontSize: 12, lineHeight: 16, color: ct.onPhoto },

  sectionHead: { fontFamily: F.bold, fontSize: 17, lineHeight: 24, color: ct.ink },
  rowTitle: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  rowSub: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.sub },

  chip: { fontFamily: F.medium, fontSize: 13, lineHeight: 17, color: ct.ink },
  chipOn: { fontFamily: F.semibold, fontSize: 13, lineHeight: 17, color: ct.accent },

  cta: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.ink },
  ctaOn: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.accentFg },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on romeospot goes through this. */
export function T({ variant = 'rowTitle', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
