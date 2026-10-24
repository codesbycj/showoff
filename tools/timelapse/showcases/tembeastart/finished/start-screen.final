import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { BackButton } from '@/features/tembeastart/components/back-button';
import { FootNote } from '@/features/tembeastart/components/foot-note';
import { Headline } from '@/features/tembeastart/components/headline';
import { SignInButton } from '@/features/tembeastart/components/sign-in-button';
import { TagCluster } from '@/features/tembeastart/components/tag-cluster';
import { buttons } from '@/features/tembeastart/data/signin';
import {
  BUTTON_GAP,
  BUTTONS_TOP,
  CLUSTER_BOTTOM,
  DISPLAY_TOP,
  FOOT_BOTTOM,
  FOOT_TOP,
  MARGIN,
  PANEL_HEIGHT,
  PANEL_PAD,
  PANEL_TOP,
} from '@/features/tembeastart/layout';
import { radius, tb } from '@/features/tembeastart/theme';
import { useInsets } from '@/features/tembeastart/use-insets';

/**
 * Tembea — sign in.
 *
 * Assembly only: the way back, what the app is for, a throw of places you
 * could go, the three ways in, and a line for people who have been here
 * before.
 *
 * The panel is a fixed height rather than a share of the window because every
 * other block on this screen is a fixed number of dp, and the arithmetic that
 * makes the screen reach its own bottom edge is written out in `layout.ts`.
 * The cluster takes `flex: 1` inside the panel, so the throw of tags sits on
 * the panel's floor whatever the headline does above it.
 */
export default function TembeastartScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tb.canvas }}>
      <StatusBar style="light" />

      <View
        style={{
          marginTop: insets.top + PANEL_TOP,
          marginHorizontal: MARGIN,
          height: PANEL_HEIGHT,
          borderRadius: radius.panel,
          backgroundColor: tb.green,
          padding: PANEL_PAD,
          overflow: 'hidden',
        }}
      >
        <BackButton />

        <View style={{ marginTop: DISPLAY_TOP }}>
          <Headline />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginHorizontal: -PANEL_PAD,
            paddingBottom: CLUSTER_BOTTOM - PANEL_PAD,
          }}
        >
          <TagCluster />
        </View>
      </View>

      <View style={{ marginTop: BUTTONS_TOP, marginHorizontal: MARGIN }}>
        {buttons.map((b, i) => (
          <View key={b.id} style={{ marginTop: i === 0 ? 0 : BUTTON_GAP }}>
            <SignInButton label={b.label} glyph={b.id} tone={b.tone} />
          </View>
        ))}
      </View>

      <View style={{ marginTop: FOOT_TOP - 14, marginBottom: insets.bottom + FOOT_BOTTOM - 14 }}>
        <FootNote />
      </View>
    </View>
  );
}
