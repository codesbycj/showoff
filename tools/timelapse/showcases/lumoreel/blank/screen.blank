import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View } from 'react-native';

// STEP 1.06 import action rail
// import { ActionRail } from '@/features/lumoreel/components/action-rail';
// STEP 1.19 import dock
// import { Dock } from '@/features/lumoreel/components/dock';
// STEP 1.02 import glyph
// import { Glyph } from '@/features/lumoreel/components/glyph';
// STEP 1.11 import reel caption
// import { ReelCaption } from '@/features/lumoreel/components/reel-caption';
import { reel } from '@/features/lumoreel/data/reel';
import { useLayout } from '@/features/lumoreel/layout';
import { ct } from '@/features/lumoreel/theme';

/**
 * Lumora — reel.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * **The photograph is the page.** It is full-bleed, every control sits over
 * it, and there is nothing that could leave a band at the foot (I3).
 */
export default function LumoreelScreen() {
  const L = useLayout();

  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(18,11,34,0.55)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 image
      <Image
        source={reel.image}
        style={{ width: L.W, height: L.H }}
        resizeMode="cover"
        accessibilityLabel={reel.caption}
      />
      */}

      <View
        style={{
          position: 'absolute',
          top: L.insets.top + 4,
          left: L.margin,
          right: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.02 "Back"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/lumofeed')}
        >
          <View style={round}>
            <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>
        */}

        {/* STEP 1.04 a stray gap above it | FIX 1.05 take the gap back out
        <View style={{ width: 11, height: 11 }} />
        */}
        {/* STEP 1.03 "Search"
        <Pressable accessibilityRole="button" accessibilityLabel="Search">
          <View style={round}>
            <Glyph name="search" size={19} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>
        */}
      </View>

      {/* STEP 1.09 a stray gap above it | FIX 1.10 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.06 action rail
      <ActionRail bottom={L.dock.h + L.dock.bottom + 110} gap={L.railGap} />
      */}

      {/* STEP 1.11 reel caption
      <ReelCaption margin={L.margin} height={L.captionH} bottom={L.dock.h + L.dock.bottom + 16} />
      */}

      {/* STEP 1.24 a stray gap above it | FIX 1.25 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.19 dock
      <Dock
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="home"
        onProfile={() => router.push('/lumoprofile')}
      />
      */}
    </View>
  );
}
