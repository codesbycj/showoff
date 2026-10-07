import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, SectionHead } from '@/features/kinetic/components/bits';
import {
  AddressBar,
  QuickCard,
  RecentRow,
  SearchRow,
  ShipmentCard,
} from '@/features/kinetic/components/home-cards';
import { DeliveryVan, ParcelBox } from '@/features/kinetic/components/parcel-art';
import { DOCK_CLEARANCE, TabDock } from '@/features/kinetic/components/tab-dock';
import { HOME, RECENT } from '@/features/kinetic/data/home';
import { TABS } from '@/features/kinetic/data/nav';
import { SP, kc, kineticTheme } from '@/features/kinetic/theme';

/**
 * Screen 1 — the delivery home.
 *
 * A pinned header over one scrolling column at the page's 20dp margin, with the
 * dock floating above it. Every band is 24dp apart, which is the reference's
 * `space-y-space-lg`.
 */
export default function KineticHome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[kineticTheme, { flex: 1, backgroundColor: kc.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
        <AppHeader
          title={HOME.title}
          onBell={() => router.push('/kinetic/parcels')}
          onAvatar={() => router.push('/kinetic/profile')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: SP.xs,
          paddingBottom: DOCK_CLEARANCE + SP.lg,
          gap: SP.lg,
        }}
      >
        <AddressBar
          label={HOME.addressLabel}
          address={HOME.address}
          unread={HOME.unread}
          onAddress={() => router.push('/kinetic/profile')}
          onBell={() => router.push('/kinetic/parcels')}
        />

        <SearchRow
          placeholder={HOME.searchPlaceholder}
          onSearch={() => router.push('/kinetic/parcels')}
          onScan={() => router.push('/kinetic/tracking')}
        />

        <View style={{ flexDirection: 'row', gap: SP.md }}>
          <QuickCard
            title={HOME.quick.newTitle}
            action={HOME.quick.newAction}
            actionIcon="arrowForward"
            art={<DeliveryVan size={96} />}
            onPress={() => router.push('/kinetic/parcels')}
          />
          <QuickCard
            title={HOME.quick.trackTitle}
            action={HOME.quick.trackAction}
            actionIcon="nearMe"
            actionTone={kc.variant}
            art={<ParcelBox size={96} />}
            onPress={() => router.push('/kinetic/tracking')}
          />
        </View>

        <View style={{ gap: SP.sm }}>
          <SectionHead
            title={HOME.currentTitle}
            action={HOME.seeAll}
            onAction={() => router.push('/kinetic/parcels')}
          />

          <ShipmentCard
            id={HOME.current.id}
            item={HOME.current.item}
            product={HOME.current.product}
            status={HOME.current.status}
            tone={HOME.current.tone}
            badge={HOME.current.badge}
            fromDate={HOME.current.fromDate}
            fromPlace={HOME.current.fromPlace}
            toDate={HOME.current.toDate}
            toPlace={HOME.current.toPlace}
            carrierLabel={HOME.current.carrierLabel}
            carrier={HOME.current.carrier}
            details={HOME.current.details}
            art={<ParcelBox size={92} />}
            onDetails={() => router.push('/kinetic/tracking')}
          />
        </View>

        <View style={{ gap: SP.sm }}>
          <SectionHead
            title={HOME.recentTitle}
            action={HOME.seeAll}
            onAction={() => router.push('/kinetic/parcels')}
          />

          <View style={{ gap: 12 }}>
            {RECENT.map((r) => (
              <RecentRow key={r.key} recent={r} onPress={() => router.push('/kinetic/tracking')} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 8,
        }}
      >
        <TabDock
          active="home"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'home') router.push(tab.route);
          }}
          onDispatch={() => router.push('/kinetic/parcels')}
        />
      </View>
    </View>
  );
}
