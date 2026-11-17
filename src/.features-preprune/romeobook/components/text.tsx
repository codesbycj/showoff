import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * romeobook's type scale. One variant per role, sized for a 393dp phone
 * (INSPO-RULES I2) rather than scaled off the board's artboard.
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`. `fontWeight`
 * is deliberately absent alongside a named face: Android synthesises a second
 * bolding on top of the real one.
 *
 * Its own copy rather than an import from romeospot — rule 4 duplicates per
 * showcase so `lock` and `preflight` stay per-slug.
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
} as const;

const variants = {
  /** The screen's own title, centred in the top bar. */
  screenTitle: { fontFamily: F.bold, fontSize: 17, lineHeight: 23, color: ct.ink },

  /** Inside the navy venue card. */
  venueName: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: '#FFFFFF' },
  venueMeta: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.navySub },

  /** Field label above a value — "Date", "Time", "Party size". */
  fieldLabel: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.sub },
  fieldValue: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },
  /** A field whose value has not been chosen yet. */
  fieldEmpty: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },

  /** The horizontal day strip. */
  dayName: { fontFamily: F.medium, fontSize: 11, lineHeight: 15, color: ct.sub },
  dayNum: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },
  dayNameOn: {
    fontFamily: F.medium,
    fontSize: 11,
    lineHeight: 15,
    color: 'rgba(255,255,255,0.82)',
  },
  dayNumOn: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: '#FFFFFF' },

  /** Section captions outside a card — "Special Requests", "Booking by". */
  caption: { fontFamily: F.medium, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  /** Placeholder text inside an input. */
  placeholder: { fontFamily: F.regular, fontSize: 13, lineHeight: 18, color: ct.sub },

  stepper: { fontFamily: F.bold, fontSize: 15, lineHeight: 21, color: ct.ink },
  ctaOn: { fontFamily: F.semibold, fontSize: 15, lineHeight: 20, color: ct.accentFg },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on romeobook goes through this. */
export function T({ variant = 'fieldValue', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
