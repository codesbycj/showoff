import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.19 import controls card
// import { ControlsCard } from '@/features/hushmix/components/controls-card';
// STEP 1.11 import foundation card
// import { FoundationCard } from '@/features/hushmix/components/foundation-card';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/hushmix/components/glyph';
// STEP 1.15 import motive card
// import { MotiveCard } from '@/features/hushmix/components/motive-card';
// STEP 1.04 import session card
// import { SessionCard } from '@/features/hushmix/components/session-card';
// STEP 1.27 import text
// import { T } from '@/features/hushmix/components/text';
// STEP 1.09 import timer card
// import { TimerCard } from '@/features/hushmix/components/timer-card';
import { session } from '@/features/hushmix/data/session';
import { useLayout } from '@/features/hushmix/layout';
import { ct } from '@/features/hushmix/theme';

/**
 * Hush - the session.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The five cards share the remainder, so the screen is full to the bottom edge
 * with no band under it (I3).
 */
export default function HushmixScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.topH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.01 "Back"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/hushstart')}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={19} color={ct.onDark} strokeWidth={1.9} />
          </View>
        </Pressable>
        */}

        <View style={{ flexDirection: 'row' }}>
          {/* STEP 1.02 "Save this session"
          <Pressable accessibilityRole="button" accessibilityLabel="Save this session">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="heart" size={19} color={ct.onDark} strokeWidth={1.7} />
            </View>
          </Pressable>
          */}

          {/* STEP 1.03 "Share this session"
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share this session"
            onPress={() => router.push('/hushshare')}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="share" size={19} color={ct.onDark} strokeWidth={1.7} />
            </View>
          </Pressable>
          */}
        </View>
      </View>

      <View style={{ height: L.gapTop }} />
      <View style={{ marginHorizontal: L.margin, gap: L.card.gap }}>
        {/* STEP 1.04 session card
        <SessionCard
          radius={L.card.radius}
          height={L.card.h}
          onOpen={() => router.push('/hushshare')}
        />
        */}
        {/* STEP 1.09 timer card
        <TimerCard radius={L.card.radius} height={L.card.h} />
        */}
        {/* STEP 1.11 foundation card
        <FoundationCard radius={L.card.radius} height={L.card.h} />
        */}
        {/* STEP 1.15 motive card
        <MotiveCard radius={L.card.radius} height={L.card.h} />
        */}
        {/* STEP 1.19 controls card
        <ControlsCard radius={L.card.radius} height={L.card.h} width={L.card.width} />
        */}
      </View>

      <View style={{ height: L.gapStack }} />
      {/* STEP 1.27 cta
      <Pressable accessibilityRole="button" accessibilityLabel={session.cta}>
        <View
          style={{
            marginHorizontal: L.margin,
            height: L.cta.h,
            borderRadius: L.cta.radius,
            backgroundColor: ct.pill,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="cta">{session.cta}</T>
        </View>
      </Pressable>
      */}

        {/* STEP 1.25 a stray rule | FIX 1.26 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
