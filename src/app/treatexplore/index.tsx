import Search from 'lucide-react-native/icons/search';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.05 the collections
// import { CollectionCard } from '@/features/treatexplore/components/collection-card';
// STEP 1.03 what to filter by
// import { FilterRow } from '@/features/treatexplore/components/filter-row';
// STEP 1.08 and where else it goes
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
{/* STEP 1.02 and a way to search it
          <Pressable accessibilityRole="button" accessibilityLabel="Search">
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
          </Pressable>
*/}
        </View>

{/* STEP 1.04 a rail of filters
        <View style={{ marginTop: FILTER_TOP }}>
          <FilterRow />
        </View>
*/}

{/* STEP 1.06 card by card
        <View
          style={{
            marginTop: CARD_TOP,
            gap: CARD_GAP,
            // MISTAKE 1.07 the cards came in half-faded
            opacity: 0.4,
          }}
        >
          {collections.map((c) => (
            <CollectionCard key={c.key} collection={c} />
          ))}
        </View>
*/}
      </ScrollView>

{/* STEP 1.09 the dock
      <View
        style={{
          paddingBottom: insets.bottom,
          // MISTAKE 1.20 the dock came in inset
          paddingHorizontal: 34,
        }}
      >
        <TabBar />
      </View>
*/}
    </View>
  );
}
