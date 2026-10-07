import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 6.01 the small shared parts
// import { RoundButton } from '@/features/nova/components/bits';
// STEP 6.03 who the account belongs to
// import { ProfileBanner } from '@/features/nova/components/profile-banner';
// STEP 6.05 a row per preference
// import { SettingsGroup } from '@/features/nova/components/settings-row';
// STEP 6.10 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/nova/components/tab-dock';
import { TABS } from '@/features/nova/data/nav';
import { GROUPS, SETTINGS } from '@/features/nova/data/settings';
import { SP, TYPE, nv, novaTheme } from '@/features/nova/theme';

/**
 * Screen 6 — settings.
 *
 * A title row, the blue account banner, then two labelled groups of rows. The
 * groups come from data, so adding a preference is an entry rather than a
 * block of markup.
 */
export default function NovaSettings() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[novaTheme, { flex: 1, backgroundColor: nv.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: insets.top + 8,
          paddingBottom: 116,
        }}
      >
{/* STEP 6.02 name the screen
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SP.lg,
          }}
        >
          <Text style={[TYPE.title, { color: nv.ink }]}>{SETTINGS.title}</Text>
          <RoundButton
            icon="bell"
            onPress={() => router.push('/nova/activity')}
            label="Notifications"
          />
        </View>
*/}

{/* STEP 6.04 the account banner
        <ProfileBanner
          name={SETTINGS.profile.name}
          badge={SETTINGS.profile.badge}
          address={SETTINGS.profile.address}
          account={SETTINGS.profile.account}
          status={SETTINGS.profile.status}
        />
*/}

{/* STEP 6.06 stack the groups
        <View
          style={{
            marginTop: SP.lg,
            gap: SP.lg,
            // MISTAKE 6.07 the groups came in pushed off to the right
            paddingLeft: 56,
          }}
        >
          {GROUPS.map((group) => (
            <SettingsGroup
              key={group.key}
              group={group}
              onRow={() => router.push('/nova/wallet')}
            />
          ))}
        </View>
*/}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 4,
        }}
      >
{/* STEP 6.11 the tab bar
        <TabDock
          active="settings"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'settings') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
