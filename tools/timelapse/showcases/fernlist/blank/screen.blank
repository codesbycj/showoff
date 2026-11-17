import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.23 import date chips
// import { DateChips } from '@/features/fernlist/components/date-chips';
// STEP 1.05 import featured trip
// import { FeaturedTrip } from '@/features/fernlist/components/featured-trip';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/fernlist/components/glyph';
// STEP 1.04 import text
// import { T } from '@/features/fernlist/components/text';
// STEP 1.26 import trip deck
// import { TripDeck } from '@/features/fernlist/components/trip-deck';
import { header } from '@/features/fernlist/data/list';
import { useLayout } from '@/features/fernlist/layout';
import { ct } from '@/features/fernlist/theme';

/**
 * Fernweh — popular trips.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The deck is the remainder — its front card grows into whatever the header,
 * the title, the featured trip and the date chips leave — so the screen always
 * ends on the deck with no band under it (I3).
 */
export default function FernlistScreen() {
  const L = useLayout();

  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.white,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

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
          onPress={() => router.push('/fernhome')}
        >
          <View style={round}>
            <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>
        */}

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* STEP 1.02 "Filter trips"
          <Pressable accessibilityRole="button" accessibilityLabel="Filter trips">
            <View style={round}>
              <Glyph name="filter" size={18} color={ct.ink} strokeWidth={1.9} />
            </View>
          </Pressable>
          */}

          {/* STEP 1.03 "Saved trips"
          <Pressable accessibilityRole="button" accessibilityLabel="Saved trips">
            <View style={round}>
              <Glyph name="star" size={18} color={ct.ink} strokeWidth={1.8} />
            </View>
          </Pressable>
          */}
        </View>
      </View>

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 title
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        <T variant="display">{header.title}</T>
      </View>
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.05 featured trip
      <FeaturedTrip
        margin={L.margin}
        height={L.feat.h}
        radius={L.feat.radius}
        tile={L.feat.tile}
        onPress={() => router.push('/ferntrip')}
      />
      */}

      <View style={{ height: L.gapFeat }} />
      {/* STEP 1.23 date chips
      <DateChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.29 a stray gap above it | FIX 1.30 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.26 trip deck
      <TripDeck
        margin={L.margin}
        width={L.deck.w}
        height={L.deck.h}
        front={L.deck.front}
        peek={L.deck.peek}
        radius={L.deck.radius}
        inset={L.deck.inset}
      />
      */}
    </View>
  );
}
