import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.02 import the filter rail
// import { ChipRail } from '@/features/travelexa/components/chip-rail';
// STEP 2.22 import the collection tile
// import { CollectionTile } from '@/features/travelexa/components/collection-tile';
// STEP 2.33 import the concierge card
// import { ConciergeCard } from '@/features/travelexa/components/concierge-card';
// STEP 2.01 import the search field
// import { DiscoverSearch } from '@/features/travelexa/components/discover-search';
// STEP 2.28 import the dispatch card
// import { DispatchCard } from '@/features/travelexa/components/dispatch-card';
// STEP 2.35 import the dock
// import { Dock } from '@/features/travelexa/components/dock';
// STEP 2.16 import the expedition card
// import { ExpeditionCard } from '@/features/travelexa/components/expedition-card';
// STEP 2.13 import the map banner
// import { MapBanner } from '@/features/travelexa/components/map-banner';
// STEP 2.15 import the section head
// import { SectionHead } from '@/features/travelexa/components/section-head';
import { NAV } from '@/features/travelexa/data/home';
import {
  COLLECTIONS,
  CONCIERGE,
  DISPATCHES,
  EXPEDITIONS,
  FILTERS,
  HEAD,
  MAP,
  SECTIONS,
} from '@/features/travelexa/data/discover';
import { SP, TYPE, travelexaTheme, tx } from '@/features/travelexa/theme';

/**
 * Screen 2 — curated discovery.
 *
 * Saved state lives here, seeded from the data: Kyoto arrives already
 * favourited in the reference, which is the only card on any screen that does.
 *
 * The collections grid is two fixed rows of two rather than a wrapping list.
 * The export writes it as `grid-cols-2`, and with exactly four tiles a wrap adds
 * nothing but a chance for the last row to go ragged.
 */
export default function TravelexaDiscover() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<string>('all');
  const [saved, setSaved] = useState<readonly string[]>(
    EXPEDITIONS.filter((e) => e.saved).map((e) => e.key),
  );

  const toggle = (key: string) =>
    setSaved((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  return (
    <View style={[travelexaTheme, { flex: 1, backgroundColor: tx.surface }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 112,
          gap: SP.xl,
        }}
      >
        <View style={{ paddingHorizontal: SP.margin, paddingTop: SP.md, gap: SP.md }}>
{/* STEP 2.03 name the screen
          <View style={{ gap: SP.xs }}>
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.6, color: tx.onSurfaceVariant }}>
              {HEAD.eyebrow.toUpperCase()}
            </Text>
            <Text
              style={{
                ...TYPE.headlineLg,
                color: tx.onSurface,
                // MISTAKE 2.06 the display line left at body size
                ...TYPE.bodyMd,
              }}
            >
              {HEAD.title}
            </Text>
          </View>
*/}

{/* STEP 2.04 somewhere to search
          <DiscoverSearch placeholder={HEAD.placeholder} />
*/}

{/* STEP 2.05 the filter rail
          <ChipRail items={FILTERS} selected={filter} onSelect={setFilter} />
*/}
        </View>

{/* STEP 2.14 where everyone is right now
        <MapBanner
          live={MAP.live}
          title={MAP.title}
          blurb={MAP.blurb}
          cta={MAP.cta}
          onPress={() => router.push('/travelexa/destination')}
        />
*/}

{/* STEP 2.17 room for the expeditions
        <View style={{ gap: SP.md }}>
          <SectionHead
            title={SECTIONS.expeditions}
            subtitle={SECTIONS.expeditionsSub}
            action={SECTIONS.viewAll}
            large
            tone="ink"
            onAction={() => router.push('/travelexa/saved')}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SP.margin, gap: SP.md }}
          >
            {EXPEDITIONS.map((e) => (
              <ExpeditionCard
                key={e.key}
                item={e}
                saved={saved.includes(e.key)}
                onToggleSave={() => toggle(e.key)}
                onPress={() => router.push('/travelexa/destination')}
              />
            ))}
          </ScrollView>
        </View>
*/}

{/* STEP 2.23 room for the collections
        <View style={{ gap: SP.md }}>
          <SectionHead title={SECTIONS.collections} subtitle={SECTIONS.collectionsSub} large />

          <View style={{ paddingHorizontal: SP.margin, gap: SP.md }}>
            <View style={{ flexDirection: 'row', gap: SP.md }}>
              {COLLECTIONS.slice(0, 2).map((c) => (
                <CollectionTile
                  key={c.key}
                  item={c}
                  onPress={() => router.push('/travelexa/destination')}
                />
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: SP.md }}>
              {COLLECTIONS.slice(2, 4).map((c) => (
                <CollectionTile
                  key={c.key}
                  item={c}
                  onPress={() => router.push('/travelexa/destination')}
                />
              ))}
            </View>
          </View>
        </View>
*/}

{/* STEP 2.29 room for the dispatches
        <View style={{ gap: SP.md }}>
          <SectionHead
            title={SECTIONS.dispatches}
            subtitle={SECTIONS.dispatchesSub}
            action={SECTIONS.followers}
            large
            tone="ink"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SP.margin, gap: SP.md }}
          >
            {DISPATCHES.map((d) => (
              <DispatchCard key={d.key} item={d} />
            ))}
          </ScrollView>
        </View>
*/}

{/* STEP 2.34 someone to ask
        <ConciergeCard title={CONCIERGE.title} blurb={CONCIERGE.blurb} cta={CONCIERGE.cta} />
*/}
      </ScrollView>

{/* STEP 2.36 pin the dock
      <Dock
        items={NAV}
        active="explore"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'explore') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
