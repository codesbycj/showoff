import Search from 'lucide-react-native/icons/search';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.08 the collections
// import { CollectionCard } from '@/features/treatexplore/components/collection-card';
// STEP 1.03 how to narrow it
// import { FilterRow } from '@/features/treatexplore/components/filter-row';
// STEP 1.13 the way around
// import { TabBar } from '@/features/treatexplore/components/tab-bar';
import { T } from '@/features/treatexplore/components/text';
import { collections, header } from '@/features/treatexplore/data/explore';
import {
  CARD_GAP,
  CARD_TOP,
  FILTER_TOP,
  HEADER_TOP,
  MARGIN,
  SCROLL_TAIL,
  SEARCH_DISC,
} from '@/features/treatexplore/layout';
import { radius, tr } from '@/features/treatexplore/theme';
import { useInsets } from '@/features/treatexplore/use-insets';

/**
 * Treats — explore.
 *
 * Assembly only: what the screen is, how to narrow it, and the collections
 * themselves — over a scroll, with the tab bar pinned below it.
 *
 * The title and the search disc sit on one row with the disc top-aligned: the
 * title runs to two lines and centring the disc against both would float it
 * half a line below the cap it reads with.
 */
export default function TreatExplore() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tr.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          {/* STEP 1.01 what the screen is
          <T variant="title" color={tr.ink} style={{ flex: 1 }}>
            {header.title}
          </T>
          */}
          <Pressable accessibilityRole="button" accessibilityLabel="Search">
            {/* STEP 1.02 and the way to search it
            <View
              style={{
                width: SEARCH_DISC,
                height: SEARCH_DISC,
                borderRadius: radius.full,
                backgroundColor: tr.well,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Search size={19} color={tr.muted} strokeWidth={1.9} />
            </View>
            */}
          </Pressable>
        </View>

        <View style={{ marginTop: FILTER_TOP }}>
          {/* STEP 1.04 under the title
          <FilterRow />
          */}
        </View>

        <View style={{ marginTop: CARD_TOP, gap: CARD_GAP }}>
          {/* STEP 1.09 one card each
          {collections.map((c) => (
            <CollectionCard key={c.key} collection={c} />
          ))}
          */}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }}>
        {/* STEP 1.14 along the bottom
        <TabBar />
        */}
      </View>
    </View>
  );
}
