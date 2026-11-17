import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.23 import dock
// import { Dock } from '@/features/nebuswap/components/dock';
// STEP 1.01 import nebula ground
// import { NebulaGround } from '@/features/nebuswap/components/nebula-ground';
// STEP 1.14 import rate insight
// import { RateInsight } from '@/features/nebuswap/components/rate-insight';
// STEP 1.17 import section title
// import { SectionTitle } from '@/features/nebuswap/components/section-title';
// STEP 1.05 import swap fields
// import { SwapFields } from '@/features/nebuswap/components/swap-fields';
// STEP 1.18 import swap list
// import { SwapList } from '@/features/nebuswap/components/swap-list';
// STEP 1.04 import text
// import { T } from '@/features/nebuswap/components/text';
import { header, recent, swap } from '@/features/nebuswap/data/swap';
import { useLayout } from '@/features/nebuswap/layout';
import { ct } from '@/features/nebuswap/theme';

/**
 * Nebula — swap.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The nebula is the page's own ground and may paint in frame one; everything
 * else is a block that appears (§5.5).
 */
export default function NebuswapScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 nebula ground
      <NebulaGround width={L.W} height={L.glowH} />
      */}

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.04 title
      <View style={{ height: L.headerH, alignItems: 'center', justifyContent: 'center' }}>
        <T variant="title">{header.title}</T>
      </View>
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 swap fields
      <View style={{ marginHorizontal: L.margin }}>
        <SwapFields height={L.field.h} gap={L.field.gap} radius={L.field.radius} />
      </View>
      */}

      <View style={{ height: L.gapCta }} />
      {/* STEP 1.13 cta
      <View style={{ marginHorizontal: L.margin }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={swap.cta}
          onPress={() => router.push('/nebuhome')}
        >
          <View
            style={{
              height: L.cta.h,
              borderRadius: L.cta.radius,
              backgroundColor: ct.cta,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="ctaInk">{swap.cta}</T>
          </View>
        </Pressable>
      </View>
      */}

      <View style={{ height: L.gapCta }} />
      {/* STEP 1.14 rate insight
      <View style={{ marginHorizontal: L.margin }}>
        <RateInsight width={L.W - L.margin * 2} height={L.insight.h} radius={L.insight.radius} />
      </View>
      */}

      <View style={{ height: L.gapInsight }} />
      {/* STEP 1.17 section title
      <SectionTitle margin={L.margin} height={L.sectionH} label={recent.title} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.18 swap list
      <SwapList
        margin={L.margin}
        height={L.row.h}
        radius={L.row.radius}
        gap={L.row.gap}
        dayH={L.dayH}
        bottomPad={L.dock.h + L.dock.bottom}
      />
      */}

      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.23 dock
      <Dock
        margin={L.margin}
        height={L.dock.h}
        radius={L.dock.radius}
        bottom={L.dock.bottom}
        active="swap"
      />
      */}
    </View>
  );
}
