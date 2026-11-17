import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.08 import fit frame
// import { FitFrame } from '@/features/orlafit/components/fit-frame';
// STEP 1.05 import glyph
// import { Glyph } from '@/features/orlafit/components/glyph';
// STEP 1.01 import text
// import { T } from '@/features/orlafit/components/text';
import { fit } from '@/features/orlafit/data/fit';
import { useLayout } from '@/features/orlafit/layout';
import { ct } from '@/features/orlafit/theme';

/**
 * Orla - the virtual fitting.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The camera frame is the remainder, so the screen always ends on its action
 * with no band under it (I3).
 */
export default function OrlafitScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          {/* STEP 1.01 title
          <T variant="fitTitle">{fit.title}</T>
          */}
          {/* STEP 1.02 sub
          <T variant="fitSub">{fit.sub}</T>
          */}
        </View>

        {/* STEP 1.05 "Close the fitting"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close the fitting"
          onPress={() => router.push('/orlaring')}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="close" size={17} color={ct.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.08 fit frame
      <FitFrame margin={L.margin} height={L.frame.h} corner={L.frame.corner} />
      */}

      <View style={{ height: L.gapNote }} />
      {/* STEP 1.18 note
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.noteH,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <T variant="fitNote" style={{ textAlign: 'center' }}>
          {fit.note}
        </T>
      </View>
      */}

      <View
        style={{
          marginHorizontal: L.margin,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* STEP 1.21 cta
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={fit.cta}
          onPress={() => router.push('/orlafind')}
          style={{ flex: 1 }}
        >
          <View
            style={{
              height: L.cta.h,
              borderRadius: L.cta.h / 2,
              backgroundColor: ct.sageDeep,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="tryCta">{fit.cta}</T>
          </View>
        </Pressable>
        */}

        {/* STEP 1.24 "Your bag"
        <Pressable accessibilityRole="button" accessibilityLabel="Your bag">
          <View
            style={{
              width: L.cta.h,
              height: L.cta.h,
              borderRadius: L.cta.h / 2,
              backgroundColor: ct.blush,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="cart" size={20} color={ct.onBlush} strokeWidth={1.8} />
          </View>
        </Pressable>
        */}
      </View>
          {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
          <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
          */}
        {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
        <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
      {/* STEP 1.19 a stray rule | FIX 1.20 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.22 a stray rule | FIX 1.23 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}

      <View style={{ height: L.footer }} />
    </View>
  );
}
