import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * vitalprog's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * **Two families, as the board sets it**: a display serif for the headings and
 * a grotesque for everything else. Instrument Serif is the free substitute for
 * the board's own serif — at matched cap height it runs a little narrower, so
 * the headline is set a step larger than a straight conversion would give
 * (RULES §6.2: choose the family by ratio, the weight by stem/cap, then solve
 * size and tracking together).
 *
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 */
const F = {
  serif: 'InstrumentSerif_400Regular',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  /** The headline — the dominant element on the screen (R8). */
  display: { fontFamily: F.serif, fontSize: 30, lineHeight: 37, color: ct.ink },
  section: { fontFamily: F.serif, fontSize: 21, lineHeight: 27, color: ct.ink },

  tab: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.sub },
  tabOn: { fontFamily: F.semibold, fontSize: 12.5, lineHeight: 17, color: ct.darkInk },

  dayLabel: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  dayOn: { fontFamily: F.bold, fontSize: 14, lineHeight: 19, color: ct.onAccent },
  dayValue: { fontFamily: F.semibold, fontSize: 11, lineHeight: 15, color: ct.ink },

  chip: { fontFamily: F.medium, fontSize: 12, lineHeight: 16, color: ct.ink },

  promoTitle: { fontFamily: F.semibold, fontSize: 14.5, lineHeight: 20, color: ct.ink },
  promoLine: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  promoCta: { fontFamily: F.bold, fontSize: 13.5, lineHeight: 18, color: ct.ink },

  noteTitle: { fontFamily: F.semibold, fontSize: 12, lineHeight: 17, color: ct.ink },
  noteLine: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },

  /** The calorie figure — the dominant element on the screen (R8). */
  kcal: { fontFamily: F.bold, fontSize: 20, lineHeight: 26, color: ct.ink },
  kcalLine: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  time: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 15, color: ct.sub },
  boardTitle: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },
  boardDay: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.ink },
  rowTitle: { fontFamily: F.semibold, fontSize: 14, lineHeight: 19, color: ct.ink },
  rowMeta: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },
  rowValue: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.ink },
  dayTick: { fontFamily: F.medium, fontSize: 8.5, lineHeight: 12, color: ct.sub },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on vitalprog goes through this. */
export function T({ variant = 'chip', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
