import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, FilterChip } from '@/features/kinetic/components/bits';
import { ParcelCard, ParcelSearch, StatChip } from '@/features/kinetic/components/parcel-card';
import { DOCK_CLEARANCE, TabDock } from '@/features/kinetic/components/tab-dock';
import { TABS } from '@/features/kinetic/data/nav';
import { PARCELS, SHIPMENTS } from '@/features/kinetic/data/parcels';
import { SP, kc, kineticTheme } from '@/features/kinetic/theme';

/**
 * Screen 3 — my shipments.
 *
 * A search row and two counters over a filter rail and five shipment cards.
 * The cards all share a header and differ below it, which is why the variation
 * lives in the data as a tagged union rather than in five near-identical
 * components here.
 */
export default function KineticParcels() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[kineticTheme, { flex: 1, backgroundColor: kc.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
        <AppHeader
          title={PARCELS.title}
          onBell={() => router.push('/kinetic/fleet')}
          onAvatar={() => router.push('/kinetic/profile')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: SP.sm,
          paddingBottom: DOCK_CLEARANCE + SP.lg,
          gap: SP.md,
        }}
      >
        <View style={{ paddingHorizontal: SP.margin }}>
          <ParcelSearch
            placeholder={PARCELS.searchPlaceholder}
            onScan={() => router.push('/kinetic/tracking')}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: SP.sm, paddingHorizontal: SP.margin }}>
          {PARCELS.stats.map((s) => (
            <StatChip key={s.key} icon={s.icon} value={s.value} label={s.label} accent={s.accent} />
          ))}
        </View>

        {/* The rail bleeds to both edges so its last chip can be clipped by the
            right edge the way the reference shows — the tell that it scrolls. */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 8, paddingVertical: 2 }}
        >
          {PARCELS.filters.map((f, i) => (
            <FilterChip key={f} label={f} selected={i === 0} />
          ))}
        </ScrollView>

        <View style={{ paddingHorizontal: SP.margin, gap: SP.md }}>
          {SHIPMENTS.map((p) => (
            <ParcelCard
              key={p.key}
              parcel={p}
              onPrimary={() => router.push('/kinetic/tracking')}
              onSecondary={() => router.push('/kinetic/tracking')}
            />
          ))}
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
          active="parcels"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'parcels') router.push(tab.route);
          }}
          onDispatch={() => router.push('/kinetic/tracking')}
        />
      </View>
    </View>
  );
}
