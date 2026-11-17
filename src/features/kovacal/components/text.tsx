import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * kovacal's type scale. One variant per role, sized for a 393dp phone (I2).
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
} as const;

const variants = {
  /** The page title - the dominant element up top (R8). */
  greeting: { fontFamily: F.bold, fontSize: 26, lineHeight: 34, color: ct.ink },
  range: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  modeOn: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.onDark },
  modeOff: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.muted },
  dayLabel: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  dayDate: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.ink },
  dayDateOn: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.onDark },
  optionTitle: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  optionBody: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },
  date: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.muted },

  statValue: { fontFamily: F.bold, fontSize: 24, lineHeight: 31, color: ct.ink },
  statLabel: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.muted },

  section: { fontFamily: F.semibold, fontSize: 16, lineHeight: 22, color: ct.ink },
  link: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.muted },

  clientName: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  clientTag: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.muted },
  add: { fontFamily: F.medium, fontSize: 13.5, lineHeight: 18, color: ct.muted },

  reminder: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  reminderMeta: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 17, color: ct.muted },

  chip: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.onDark },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on kovacal goes through this. */
export function T({ variant = 'date', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
