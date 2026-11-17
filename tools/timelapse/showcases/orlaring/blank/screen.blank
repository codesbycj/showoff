import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.13 import fact discs
// import { FactDiscs } from '@/features/orlaring/components/fact-discs';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/orlaring/components/glyph';
// STEP 1.09 import ring hero
// import { RingHero } from '@/features/orlaring/components/ring-hero';
// STEP 1.05 import text
// import { T } from '@/features/orlaring/components/text';
import { ring } from '@/features/orlaring/data/ring';
import { useLayout } from '@/features/orlaring/layout';
import { ct } from '@/features/orlaring/theme';

/**
 * Orla - the ring.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The ring is the remainder, so the screen always ends on its action with no
 * band under it (I3).
 */
export default function OrlaringScreen() {
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
        }}
      >
        {/* STEP 1.01 "Back"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/orlafind')}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
            <Glyph name="back" size={20} color={ct.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
        */}

        {/* STEP 1.02 "Menu"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Menu"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
            <Glyph name="menu" size={20} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ height: L.gapHeader }} />
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        {/* STEP 1.05 name
        <T variant="cardName">{ring.name}</T>
        */}
        {/* STEP 1.08 kind
        <T variant="cardKind">{ring.kind}</T>
        */}
      </View>

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.09 ring hero
      <RingHero width={L.W} height={L.hero.h} finish={L.hero.finish} margin={L.margin} />
      */}

      {/* STEP 1.13 fact discs
      <FactDiscs margin={L.margin} height={L.factsH} />
      */}

      <View style={{ height: L.gapFacts }} />
      <View
        style={{
          marginHorizontal: L.margin,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {/* STEP 1.19 cta
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={ring.cta}
          onPress={() => router.push('/orlafit')}
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
            <T variant="tryCta">{ring.cta}</T>
          </View>
        </Pressable>
        */}

        {/* STEP 1.22 "Your bag"
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
      {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.20 a stray rule | FIX 1.21 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
    </View>
  );
}
