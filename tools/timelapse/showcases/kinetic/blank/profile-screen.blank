import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.01 the shared kit
// import { RoundButton } from '@/features/kinetic/components/bits';
// STEP 5.03 the account cards
// import { AccountCard, DropoffCard, LogoutCard, SettingsGroup, StatTiles, } from '@/features/kinetic/components/profile-cards';
// STEP 5.10 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/kinetic/components/tab-dock';
import { TABS } from '@/features/kinetic/data/nav';
import { GROUPS, PROFILE } from '@/features/kinetic/data/profile';
import { SP, TYPE, kc, kineticTheme } from '@/features/kinetic/theme';

/**
 * Screen 5 — my account.
 *
 * A title row, the account card, three counters, the drop-off card, then three
 * labelled setting groups and a log-out card. The groups come from data, so
 * adding a preference is an entry rather than a block of markup.
 */
export default function KineticProfile() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[kineticTheme, { flex: 1, backgroundColor: kc.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: insets.top + SP.sm,
          paddingBottom: 136,
          gap: SP.md,
        }}
      >
{/* STEP 5.02 name the account
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SP.xs,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <Text style={[TYPE.headlineLg, { color: kc.ink }]}>{PROFILE.title}</Text>
            <View
              style={{
                backgroundColor: kc.coralTint,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 999,
              }}
            >
              <Text style={[TYPE.labelSm, { color: kc.rust }]}>{PROFILE.verified}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <RoundButton
              icon="edit"
              size={40}
              iconSize={20}
              fill={kc.surface}
              onPress={() => router.push('/kinetic/parcels')}
              label="Edit profile"
            />
            <RoundButton
              icon="settings"
              size={40}
              iconSize={20}
              fill={kc.surface}
              onPress={() => router.push('/kinetic/fleet')}
              label="Settings"
            />
          </View>
        </View>
*/}

{/* STEP 5.04 who it belongs to
        <AccountCard onRedeem={() => router.push('/kinetic/parcels')} />
*/}

{/* STEP 5.05 three numbers
        <StatTiles />
*/}

{/* STEP 5.06 where parcels land
        <View
          style={{
            // MISTAKE 5.07 the drop-off card came in tipped over
            transform: [{ rotate: '-4deg' }],
          }}
        >
        <DropoffCard
          onChange={() => router.push('/kinetic/tracking')}
          onSwitch={() => router.push('/kinetic/tracking')}
        />
        </View>
*/}

{/* STEP 5.08 every preference
        {GROUPS.map((g) => (
          <SettingsGroup key={g.key} group={g} onRow={() => router.push('/kinetic/parcels')} />
        ))}
*/}

{/* STEP 5.09 and a way out
        <LogoutCard onPress={() => router.push('/kinetic')} />
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
{/* STEP 5.11 the tab bar
        <TabDock
          active="profile"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'profile') router.push(tab.route);
          }}
          onDispatch={() => router.push('/kinetic/parcels')}
        />
*/}
      </View>
    </View>
  );
}
