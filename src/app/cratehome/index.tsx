import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.14 the two actions
// import { ActionPills } from '@/features/cratehome/components/action-pills';
// STEP 1.18 the deliveries
// import { DeliveryCard } from '@/features/cratehome/components/delivery-card';
// STEP 1.06 who it is talking to
// import { Greeting } from '@/features/cratehome/components/greeting';
// STEP 1.01 who is signed in
// import { PanelHead } from '@/features/cratehome/components/panel-head';
// STEP 1.10 the tracking field
// import { SearchField } from '@/features/cratehome/components/search-field';
// STEP 1.26 and where else it goes
// import { TabBar } from '@/features/cratehome/components/tab-bar';
import { copy, deliveries } from '@/features/cratehome/data/start';
import { CARD_GAP, LIST_TOP, MARGIN, PANEL_PAD } from '@/features/cratehome/layout';
import { cr, radius, type } from '@/features/cratehome/theme';
import { T } from '@/features/cratehome/components/text';
import { useInsets } from '@/features/cratehome/use-insets';

/**
 * Crate — the delivery home.
 *
 * Assembly only: the black panel carrying who is signed in, the greeting, the
 * tracking field and the two actions; then the active deliveries; then where
 * else the app goes.
 *
 * The list scrolls and its last card runs under the tab bar rather than
 * stopping above it — the reference crops its second card for the same
 * reason, and a list that ends in a band of grey reads as a page that ran
 * out.
 */
export default function CratehomeScreen() {
  const insets = useInsets();

  const card = (i: number) => ({
    code: deliveries[i].code,
    name: deliveries[i].name,
    state: deliveries[i].state,
    from: deliveries[i].from,
    at: deliveries[i].at,
    to: deliveries[i].to,
    progress: deliveries[i].progress,
    art: deliveries[i].art,
    onPress: () => router.push('/cratetrack'),
  });

  return (
    <View style={{ flex: 1, backgroundColor: cr.canvas }}>
      <StatusBar style="light" />

      <View
        style={{
          borderBottomLeftRadius: radius.panel,
          borderBottomRightRadius: radius.panel,
          paddingTop: insets.top,
          paddingHorizontal: PANEL_PAD,
          paddingBottom: 20,
        }}
      >
        {/*
          The panel's black is a child, not this View's own `backgroundColor`.
          A container that carries its own fill is painted from step one of
          the reveal, so the first frame of the recording opened on a black
          bar across the top with nothing in it — which is exactly what it
          did. As a child it is a step like everything else.
        */}
{/* STEP 1.02 the black panel
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomLeftRadius: radius.panel,
            borderBottomRightRadius: radius.panel,
            backgroundColor: cr.panel,
          }}
        />
*/}

{/* STEP 1.03 who is signed in
        <PanelHead />
*/}
{/* STEP 1.07 by name
        <Greeting />
*/}
{/* STEP 1.11 and a scanner
        <SearchField onScan={() => router.push('/cratescan')} />
*/}
{/* STEP 1.15 side by side
        <ActionPills
          onSend={() => router.push('/cratescan')}
          onTrack={() => router.push('/cratetrack')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: LIST_TOP, gap: CARD_GAP }}
      >
{/* STEP 1.19 what is moving
        <T variant="section" color={cr.ink} style={{ height: type.section.line }}>
          {copy.section}
        </T>
*/}
{/* STEP 1.20 the first parcel
        <DeliveryCard {...card(0)} />
*/}
{/* STEP 1.24 another
        <DeliveryCard {...card(1)} />
*/}
{/* STEP 1.25 and one that runs off the edge
        <DeliveryCard {...card(2)} />
*/}
      </ScrollView>

{/* STEP 1.27 the tab bar
      <View style={{ paddingBottom: insets.bottom }}>
        <TabBar active="home" onSend={() => router.push('/cratescan')} />
      </View>
*/}
    </View>
  );
}
