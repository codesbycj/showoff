import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.33 one line of history
// import { HistoryRow } from '@/features/deltrack/components/history-row';
// STEP 1.03 who you are and where
// import { LocationHeader } from '@/features/deltrack/components/location-header';
// STEP 1.11 which of the four you are on
// import { PageDots } from '@/features/deltrack/components/page-dots';
// STEP 1.01 the wash behind the top of the page
// import { PageWash } from '@/features/deltrack/components/page-wash';
// STEP 1.20 a section needs a name
// import { SectionHead } from '@/features/deltrack/components/section-head';
// STEP 1.24 the rail of shipments
// import { ShipmentRail } from '@/features/deltrack/components/shipment-rail';
// STEP 1.39 everywhere else the app goes
// import { TabDock } from '@/features/deltrack/components/tab-dock';
// STEP 1.08 the card that holds the search
// import { TrackBanner } from '@/features/deltrack/components/track-banner';
// STEP 1.09 somewhere to type a number
// import { TrackingField } from '@/features/deltrack/components/tracking-field';
// STEP 1.10 the parcel that is moving
// import { TransitCard } from '@/features/deltrack/components/transit-card';
import { HISTORY, HOME, SHIPMENTS, TABS } from '@/features/deltrack/data/home';
import { DOCK_CLEARANCE, DOCK_GAP, DOCK_MARGIN, TOP_INSET } from '@/features/deltrack/layout';
import { deltrackTheme, dt } from '@/features/deltrack/theme';

/**
 * Screen 1 - Deltrack's home.
 *
 * Assembly only. Every band on the page is its own component under
 * `src/features/deltrack/components`, so the speed-build video shows the
 * screen arriving a piece at a time.
 */
export default function DeltrackHome() {
  const insets = useSafeAreaInsets();
  const top = Math.max(insets.top, TOP_INSET);

  return (
    <View style={[deltrackTheme, { flex: 1, backgroundColor: dt.bg }]}>
      <StatusBar style="dark" />
{/* STEP 1.02 lay the wash down
      <PageWash />
*/}

{/* STEP 1.04 pin the header
      <View style={{ paddingTop: top + 7 }}>
        <LocationHeader label={HOME.locationLabel} address={HOME.address} unread={HOME.unread} />
      </View>
*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 13, paddingBottom: DOCK_CLEARANCE + 8 }}
      >
{/* STEP 1.12 the hero, and everything inside it
        <TrackBanner title={HOME.hero.title} subtitle={HOME.hero.subtitle}>
          <View style={{ marginTop: 17 }}>
            <TrackingField placeholder={HOME.hero.placeholder} />
          </View>

          <View style={{ marginTop: 15 }}>
            <TransitCard
              id={HOME.transit.id}
              status={HOME.transit.status}
              done={HOME.transit.done}
              at={HOME.transit.at}
              originLabel={HOME.transit.originLabel}
              originDate={HOME.transit.originDate}
              destLabel={HOME.transit.destLabel}
              destDate={HOME.transit.destDate}
            />
          </View>

          <View style={{ marginTop: 1 }}>
            <PageDots count={HOME.pages} page={HOME.page} />
          </View>
        </TrackBanner>
*/}

{/* STEP 1.21 name the first section | FIX 1.22 it came in with the wrong name
        <SectionHead title="Current Shipments" action={HOME.viewAll} />
*/}

{/* STEP 1.23 name it again, properly
        <View style={{ marginTop: 10 }}>
          <SectionHead title={HOME.currentTitle} action={HOME.viewAll} />
        </View>
*/}

{/* STEP 1.25 lay the rail
        <View style={{ marginTop: 15 }}>
          <ShipmentRail shipments={SHIPMENTS} />
        </View>
*/}

{/* STEP 1.32 name the history
        <View style={{ marginTop: 18 }}>
          <SectionHead title={HOME.historyTitle} action={HOME.viewAll} />
        </View>
*/}

{/* STEP 1.34 the history list
        <View style={{ marginTop: 11, gap: 12 }}>
          {HISTORY.map((h) => (
            <HistoryRow
              key={h.key}
              id={h.id}
              note={h.note}
              status={h.status}
              date={h.date}
              dimmed={h.dimmed}
            />
          ))}
        </View>
*/}

{/* STEP 1.37 one more out of the archive | FIX 1.38 that one is not ours
        <HistoryRow id="#96425361843-XX" note="Checked in at the depot" status="Pending" date="21 May 2025" />
*/}
      </ScrollView>

{/* STEP 1.40 pin the dock
      <View
        style={{ position: 'absolute', left: DOCK_MARGIN, right: DOCK_MARGIN, bottom: DOCK_GAP }}
      >
        <TabDock tabs={TABS} active="home" />
      </View>
*/}
    </View>
  );
}
