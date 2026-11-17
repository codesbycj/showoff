import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * nordstay's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`, standing in
 * for the board's geometric grotesque. `fontWeight` is deliberately absent
 * alongside a named face: Android synthesises a second bolding on top of the
 * real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  /** The listing title — the dominant element below the gallery (R8). */
  title: { fontFamily: F.semibold, fontSize: 22, lineHeight: 29, color: ct.ink },
  rating: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  section: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },
  rowTitle: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 21, color: ct.ink },
  chip: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  counter: { fontFamily: F.semibold, fontSize: 12, lineHeight: 16, color: ct.white },
  barMeta: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.onDarkMuted },
  barTotal: { fontFamily: F.bold, fontSize: 22, lineHeight: 28, color: ct.onDark },
  cta: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  meta: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 18, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on nordstay goes through this. */
export function T({ variant = 'meta', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
