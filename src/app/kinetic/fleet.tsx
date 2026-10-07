import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.01 the shared kit
// import { AppHeader, Card, SectionHead } from '@/features/kinetic/components/bits';
// STEP 4.05 the dispatch panel
// import { DispatchPanel, FleetRow } from '@/features/kinetic/components/fleet-panel';
// STEP 4.03 a map to put them on
// import { CourierMarker, MapCanvas, MapControls } from '@/features/kinetic/components/map-canvas';
import { Symbol } from '@/features/kinetic/components/symbol';
// STEP 4.10 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/kinetic/components/tab-dock';
import { FLEET, UNITS } from '@/features/kinetic/data/fleet';
import { TABS } from '@/features/kinetic/data/nav';
import { LEVEL, R, SP, TYPE, kc, kineticTheme } from '@/features/kinetic/theme';

/**
 * Screen 4 — the live fleet.
 *
 * The map runs behind a floating search field and an "8 drivers active" chip,
 * with the dispatch panel overlapping its bottom edge. Everything below that
 * scrolls normally.
 *
 * The map is the same `MapCanvas` the tracking screen uses. The reference
 * screenshots a real Google map here and a vector one there, which is a
 * difference in how two Stitch passes filled the same slot rather than a design
 * decision — and a real map would need a network key the recording cannot rely
 * on. One vector map, two screens.
 */
export default function KineticFleet() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[kineticTheme, { flex: 1, backgroundColor: kc.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
{/* STEP 4.02 name the screen
        <AppHeader
          title={FLEET.title}
          onBell={() => router.push('/kinetic/parcels')}
          onAvatar={() => router.push('/kinetic/profile')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 136 }}
      >
{/* STEP 4.04 put the city down
        <MapCanvas height={420}>
          <View
            style={{
              position: 'absolute',
              top: 16,
              left: SP.margin,
              right: SP.margin,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Card padding={0} radius={999}>
                <View
                  style={{
                    height: 48,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    gap: 10,
                  }}
                >
                  <Symbol name="search" size={20} color={kc.secondary} />
                  <Text style={[TYPE.bodyMd, { color: kc.ink, flex: 1 }]} numberOfLines={1}>
                    {FLEET.searchValue}
                  </Text>
                  <Symbol name="tune" size={20} color={kc.secondary} />
                </View>
              </Card>
            </View>

            <View
              style={[
                {
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: kc.charcoal,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                LEVEL.dock,
              ]}
            >
              <Symbol name="filterCenterFocus" size={22} color={kc.surface} />
            </View>
          </View>

          <CourierMarker
            top={230}
            left={200}
            label="Van #04 • 24m"
            icon="localShipping"
            rotate={0}
          />

          <View
            style={{
              position: 'absolute',
              left: 96,
              top: 132,
              backgroundColor: kc.surface,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: R.base,
            }}
          >
            <Text style={[TYPE.labelSm, { color: kc.ink }]}>Bike #12</Text>
          </View>

          <View
            style={{
              position: 'absolute',
              right: 62,
              top: 286,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: kc.coral,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 999,
            }}
          >
            <Symbol name="pinDrop" size={16} color={kc.onCoral} />
            <Text style={[TYPE.labelMd, { color: kc.onCoral }]}>Jawhra, Jeddah</Text>
          </View>

          <MapControls top={280} onRecenter={() => router.push('/kinetic/tracking')} />

          <View
            style={{
              position: 'absolute',
              left: SP.margin,
              bottom: 40,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: kc.inverseSurface,
              paddingHorizontal: 14,
              paddingVertical: 9,
              borderRadius: 999,
            }}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' }} />
            <Text style={[TYPE.labelMd, { color: kc.surface }]}>{FLEET.activeLabel}</Text>
            <Text style={[TYPE.labelMd, { color: kc.onDarkLabel }]}>• {FLEET.activeArea}</Text>
          </View>
        </MapCanvas>
*/}

{/* STEP 4.06 who is driving what
        <View
          style={{
            paddingHorizontal: SP.margin,
            marginTop: -28,
            // MISTAKE 4.07 the panel came in adrift from the map
            marginTop: 40,
          }}
        >
          <DispatchPanel
            onCall={() => router.push('/kinetic/tracking')}
            onMessage={() => router.push('/kinetic/tracking')}
            onTurnByTurn={() => router.push('/kinetic/tracking')}
            onAssign={() => router.push('/kinetic/parcels')}
          />
        </View>
*/}

{/* STEP 4.08 who else is out there
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg, gap: SP.sm }}>
          <SectionHead
            title={FLEET.vicinityTitle}
            action={FLEET.refresh}
            actionTone={kc.coral}
            onAction={() => router.push('/kinetic/fleet')}
          />

          <View style={{ gap: 10 }}>
            {UNITS.map((u) => (
              <FleetRow key={u.key} unit={u} onPress={() => router.push('/kinetic/tracking')} />
            ))}
          </View>
        </View>
*/}

{/* STEP 4.14 the numbers for the day
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md }}>
          <Card padding={16}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {FLEET.stats.map((s, i) => (
                <View
                  key={s.key}
                  style={[
                    { flex: 1, alignItems: 'center' },
                    i > 0 && { borderLeftWidth: 1, borderLeftColor: kc.surfaceHigh },
                  ]}
                >
                  <Text style={[TYPE.headlineLg, { color: s.accent ? kc.coral : kc.ink }]}>
                    {s.value}
                  </Text>
                  <Text
                    style={[TYPE.bodySm, { color: kc.secondary, marginTop: 2 }]}
                    numberOfLines={1}
                  >
                    {s.label}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
*/}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 8,
        }}
      >
{/* STEP 4.11 the tab bar
        <TabDock
          active="track"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'track') router.push(tab.route);
          }}
          onDispatch={() => router.push('/kinetic/parcels')}
        />
*/}
      </View>
    </View>
  );
}
