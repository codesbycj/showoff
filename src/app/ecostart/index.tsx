import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';

import { PackStage } from '@/features/ecostart/components/pack-stage';
import { T } from '@/features/ecostart/components/text';
import { intro } from '@/features/ecostart/data/intro';
import {
  BODY_TOP,
  BUTTON_BOTTOM,
  BUTTON_HEIGHT,
  BUTTON_TOP,
  COPY_TOP,
  MARGIN,
  STAGE_TOP,
} from '@/features/ecostart/layout';
import { ec, radius } from '@/features/ecostart/theme';
import { useInsets } from '@/features/ecostart/use-insets';

/**
 * Eco Bites — the intro.
 *
 * Assembly only: what the brand is, the product, and the one thing it asks.
 *
 * The stage takes `flex: 1`, so the pack grows into whatever the copy and the
 * button leave — which keeps the page full to its bottom edge on a tall phone
 * rather than leaving a band of empty canvas under the pouch.
 */
export default function EcoStart() {
  const insets = useInsets();
  const { width } = useWindowDimensions();
  const [held, setHeld] = useState(false);
  const [stage, setStage] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: ec.canvas }}>
      <StatusBar style="dark" />

      {/* Vertical, so it is not the diagonal case that comes out mirrored on
          web (AGENTS.md, "Diagonal gradients flip on web"). */}
      <LinearGradient
        colors={[ec.canvas, ec.canvasDeep]}
        locations={[0.25, 1]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + COPY_TOP,
          paddingBottom: insets.bottom + BUTTON_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        <T variant="display" color={ec.ink} style={{ textAlign: 'center' }}>
          {intro.display}
        </T>
        <T variant="body" color={ec.muted} style={{ marginTop: BODY_TOP, textAlign: 'center' }}>
          {intro.body}
        </T>

        {/* The stage measures itself rather than taking a dp height: the pack
            is placed in fractions of it, and a fraction of nothing is nothing
            until the first layout pass reports a height. */}
        <View
          style={{ flex: 1, marginTop: STAGE_TOP }}
          onLayout={(e) => setStage(e.nativeEvent.layout.height)}
        >
          {stage > 0 ? <PackStage width={width - MARGIN * 2} height={stage} /> : null}
        </View>

        <Pressable
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={intro.cta}
          style={{ marginTop: BUTTON_TOP }}
        >
          <View
            style={{
              height: BUTTON_HEIGHT,
              borderRadius: radius.pill,
              backgroundColor: ec.lime,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="button" color={ec.onLime}>
              {intro.cta}
            </T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
