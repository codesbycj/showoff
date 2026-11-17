import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * lumoreel's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Every colour here sits on a dark ground, so each is measured against that
 * rather than against white (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  name: { fontFamily: F.semibold, fontSize: 16, lineHeight: 21, color: ct.ink },
  handle: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },
  story: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.muted },

  /** The featured card's heading — the dominant element up top (R8). */
  featured: { fontFamily: F.bold, fontSize: 19, lineHeight: 25, color: ct.ink },
  featuredBody: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.muted },
  featuredCta: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },

  postName: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  postHandle: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  count: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  caption: { fontFamily: F.regular, fontSize: 13, lineHeight: 19, color: ct.muted },

  tabOn: { fontFamily: F.semibold, fontSize: 10.5, lineHeight: 14, color: ct.ink },
  tabOff: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on lumoreel goes through this. */
export function T({ variant = 'caption', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
