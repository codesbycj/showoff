import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * wisetrip's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`, standing
 * in for the board's geometric sans. `fontWeight` is deliberately absent
 * alongside a named face: Android synthesises a second bolding on top of the
 * real one.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.bold, fontSize: 19, lineHeight: 25, color: ct.ink },

  /** The promise — the dominant element on the screen (R8). */
  display: { fontFamily: F.extra, fontSize: 29, lineHeight: 38, color: ct.ink },
  body: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 20, color: ct.muted },
  cta: { fontFamily: F.semibold, fontSize: 15.5, lineHeight: 21, color: ct.onOrange },

  cardTitle: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  cardMeta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  budgetLabel: { fontFamily: F.medium, fontSize: 9.5, lineHeight: 13, color: ct.onOrange },
  budget: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.onOrange },

  listName: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  listMeta: { fontFamily: F.regular, fontSize: 10.5, lineHeight: 14, color: ct.muted },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on wisetrip goes through this. */
export function T({ variant = 'body', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
