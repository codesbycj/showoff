import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 the way back
// import { BackButton } from '@/features/tembeastart/components/back-button';
// STEP 1.12 the line at the foot
// import { FootNote } from '@/features/tembeastart/components/foot-note';
// STEP 1.03 what the app is for
// import { Headline } from '@/features/tembeastart/components/headline';
// STEP 1.09 the three ways in
// import { SignInButton } from '@/features/tembeastart/components/sign-in-button';
// STEP 1.05 the throw of places
// import { TagCluster } from '@/features/tembeastart/components/tag-cluster';
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
        {/* STEP 1.02 dropped on the panel
        <BackButton />
        */}

        {/* STEP 1.04 three lines of it
        <View style={{ marginTop: DISPLAY_TOP }}>
          <Headline />
        </View>
        */}

        {/* STEP 1.06 scattered on its floor
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
        */}
      </View>

      {/* STEP 1.10 stacked under the panel
      <View
        style={{
          marginTop: BUTTONS_TOP,
          marginHorizontal: MARGIN,
          // MISTAKE 1.11 the stack starts too far down
          paddingTop: 26,
        }}
      >
        {buttons.map((b, i) => (
          <View key={b.id} style={{ marginTop: i === 0 ? 0 : BUTTON_GAP }}>
            <SignInButton label={b.label} glyph={b.id} tone={b.tone} />
          </View>
        ))}
      </View>
      */}

      {/* STEP 1.13 for people who have been here
      <View style={{ marginTop: FOOT_TOP - 14, marginBottom: insets.bottom + FOOT_BOTTOM - 14 }}>
        <FootNote />
      </View>
      */}
    </View>
  );
}
