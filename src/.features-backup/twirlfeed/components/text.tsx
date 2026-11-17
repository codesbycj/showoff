import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { ct } from '../theme';

/**
 * twirlfeed's type scale. One variant per role, sized for a 393dp phone (I2).
 *
 * The wordmark is set in Caveat, the repo's registered script face — the
 * board's own is a hand-drawn logotype that cannot be obtained. It is a
 * substitute and it is named in the handover (§6.2).
 *
 * Everything else is Plus Jakarta Sans, registered per weight in
 * `src/theme/fonts.ts`. `fontWeight` is deliberately absent alongside a named
 * face: Android synthesises a second bolding on top of the real one.
 */
const F = {
  script: 'Caveat_600SemiBold',
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extra: 'PlusJakartaSans_800ExtraBold',
} as const;

const variants = {
  wordmark: { fontFamily: F.script, fontSize: 26, lineHeight: 32, color: ct.brand },

  storyLabel: { fontFamily: F.medium, fontSize: 10.5, lineHeight: 14, color: ct.sub },

  author: { fontFamily: F.semibold, fontSize: 13.5, lineHeight: 18, color: ct.ink },
  when: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: ct.sub },

  /** The post title — the dominant element on the screen (R8). */
  postTitle: { fontFamily: F.extra, fontSize: 17, lineHeight: 23, color: ct.ink },
  postYear: { fontFamily: F.medium, fontSize: 13, lineHeight: 23, color: ct.sub },
  postBody: { fontFamily: F.regular, fontSize: 12.5, lineHeight: 18, color: ct.sub },

  liked: { fontFamily: F.semibold, fontSize: 11.5, lineHeight: 16, color: ct.ink },
  saved: { fontFamily: F.regular, fontSize: 11.5, lineHeight: 16, color: ct.sub },
  action: { fontFamily: F.medium, fontSize: 12, lineHeight: 17, color: ct.sub },

  tab: { fontFamily: F.medium, fontSize: 10, lineHeight: 13, color: ct.sub },
  tabOn: { fontFamily: F.semibold, fontSize: 10, lineHeight: 13, color: ct.brand },
  badge: { fontFamily: F.bold, fontSize: 9, lineHeight: 12, color: ct.brandInk },
} satisfies Record<string, TextStyle>;

type Props = TextProps & { variant?: keyof typeof variants };

/** Every string on twirlfeed goes through this. */
export function T({ variant = 'postBody', style, ...rest }: Props) {
  return <RNText {...rest} style={[variants[variant], style]} />;
}
