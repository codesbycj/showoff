import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * sonicexplore's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * Plus Jakarta Sans, registered per weight in `src/theme/fonts.ts`.
 * `fontWeight` is deliberately absent alongside a named face: Android
 * synthesises a second bolding on top of the real one.
 *
 * Every colour here is chosen against a dark ground — except the two that sit
 * on the white collection card, which are checked against that (R4).
 */
const F = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  hello: { fontFamily: F.regular, fontSize: 15, lineHeight: 20, color: ct.sub },
  name: { fontFamily: F.bold, fontSize: 15, lineHeight: 20, color: ct.ink },

  sectionLabel: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  sectionTitle: { fontFamily: F.bold, fontSize: 16, lineHeight: 21, color: ct.ink },
  sectionMore: { fontFamily: F.medium, fontSize: 12, lineHeight: 17, color: ct.sub },

  chip: { fontFamily: F.medium, fontSize: 12.5, lineHeight: 17, color: ct.ink },
  chipOn: { fontFamily: F.bold, fontSize: 12.5, lineHeight: 17, color: ct.onLime },

  songTitle: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
  songArtist: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },

  /** On the white card. 15:1 and 5.4:1 against it. */
  cardTitle: { fontFamily: F.extra, fontSize: 21, lineHeight: 26, color: ct.onSheet },
  cardLine: { fontFamily: F.regular, fontSize: 12, lineHeight: 16, color: ct.onSheetSub },

  trackTitle: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  trackMeta: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },

  tab: { fontFamily: F.bold, fontSize: 12.5, lineHeight: 17, color: ct.onLime },

  placeholder: { fontFamily: F.regular, fontSize: 13.5, lineHeight: 18, color: ct.sub },
  tag: { fontFamily: F.bold, fontSize: 13, lineHeight: 18, color: ct.ink },
  tagArtist: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: 'rgba(255,255,255,0.82)' },
  genre: { fontFamily: F.semibold, fontSize: 13, lineHeight: 18, color: ct.ink },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on sonicexplore goes through this. */
export function T({ variant = 'songTitle', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
