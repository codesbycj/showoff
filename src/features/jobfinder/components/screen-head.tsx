import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { FONT, R, jf } from '../theme';

/**
 * A back / title / actions header.
 *
 * The title is centred on the *screen*, not between the controls, so it is
 * absolutely positioned across the full width with the controls laid over it.
 * Centring it inside a flex row instead would shift it whenever the two sides
 * carry a different number of controls, which is exactly what the three screens
 * using this do: the job detail has one action, the profile and saved screens
 * have two.
 *
 * `right` is a slot rather than a list of icons. Each screen's actions are
 * `IconButton`s it assembles itself, so adding one is a line in the screen.
 */
export function ScreenHead({
  title,
  onBack,
  right,
  tone = jf.ink,
  /** Back drawn as a bare glyph rather than in a white disc. */
  bare = false,
  /** The profile header sets its title as a small tracked-out muted caps line. */
  caps = false,
}: {
  title?: string;
  onBack?: () => void;
  right?: ReactNode;
  tone?: string;
  bare?: boolean;
  caps?: boolean;
}) {
  return (
    <View
      style={{
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {title ? (
        <View
          style={{ position: 'absolute', left: 44, right: 44, alignItems: 'center' }}
          pointerEvents="none"
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: caps ? 13 : 17,
              lineHeight: 22,
              letterSpacing: caps ? 1.4 : -0.4,
              color: caps ? jf.muted : tone,
              textAlign: 'center',
            }}
            numberOfLines={2}
          >
            {caps ? title.toUpperCase() : title}
          </Text>
        </View>
      ) : null}

      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: R.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bare ? 'transparent' : jf.card,
          }}
        >
          <BackArrow tone={tone} long={bare} />
        </View>
      </Pressable>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{right}</View>
    </View>
  );
}

/**
 * The reference draws two different back arrows: a long shaft with a short head
 * on the job detail, and a plain chevron inside the white disc everywhere else.
 */
function BackArrow({ tone, long }: { tone: string; long: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d={long ? 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' : 'M15 5l-7 7 7 7'}
        stroke={tone}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
