import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/features/pesse/components/app-header';
// STEP 6.01 who is signed in
// import { ProfileCard } from '@/features/pesse/components/profile-card';
// STEP 6.06 an offer to share
// import { ReferralCard } from '@/features/pesse/components/referral-card';
// STEP 6.08 a settings row
// import { SettingRow } from '@/features/pesse/components/setting-row';
import { Symbol } from '@/features/pesse/components/symbol';
import { DOCK_CLEARANCE, TabDock } from '@/features/pesse/components/tab-dock';
import { SETTINGS, SETTING_GROUPS } from '@/features/pesse/data/settings';
import { TABS, WALLET } from '@/features/pesse/data/wallet';
import { LEVEL, R, SP, TYPE, ps, pesseTheme } from '@/features/pesse/theme';

/**
 * Screen 6 — profile and settings.
 *
 * A long scroll of grouped cards. Each group is one card with hairline-divided
 * rows inside it, not a stack of cards — which is why the rows draw their own
 * top border and the group draws none.
 *
 * Log Out goes back to the boot screen with `replace`, so the stack does not
 * keep a signed-in app behind a splash.
 */
export default function PesseSettings() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[pesseTheme, { flex: 1, backgroundColor: ps.surface }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
        <AppHeader
          tokens={WALLET.tokens}
          photo={require('../../../assets/images/pesse/linda.jpg')}
          onNotifications={() => router.push('/pesse/cards')}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: SP.xs,
          paddingBottom: DOCK_CLEARANCE + insets.bottom,
          gap: SP.lg,
        }}
      >
{/* STEP 6.02 the account card
        <ProfileCard photo={require('../../../assets/images/pesse/linda-settings.jpg')} />
*/}

{/* STEP 6.12 a banner that belongs on another screen | FIX 6.13 take it out
        <ProfileCard photo={require('../../../assets/images/pesse/linda.jpg')} />
*/}

{/* STEP 6.07 the referral block
        <ReferralCard />
*/}

        {SETTING_GROUPS.map((group) => (
          <View key={group.key} style={{ gap: SP.sm }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 4,
              }}
            >
{/* STEP 6.09 label each group
              <Text style={[TYPE.labelMd, { color: ps.secondary, letterSpacing: 0.8 }]}>
                {group.label.toUpperCase()}
              </Text>
*/}
              {group.status ? (
                <Text style={[TYPE.labelSm, { color: ps.olive }]}>{group.status}</Text>
              ) : null}
            </View>

            <View
              style={[
                {
                  backgroundColor: ps.surfaceLowest,
                  borderRadius: R.lg,
                  paddingHorizontal: 16,
                },
                LEVEL.container,
              ]}
            >
{/* STEP 6.10 fill them in
              {group.rows.map((row, i) => (
                <SettingRow key={row.key} row={row} first={i === 0} />
              ))}
*/}
            </View>
          </View>
        ))}

        <View style={{ gap: SP.md, alignItems: 'center' }}>
          <Pressable
            onPress={() => router.replace('/pesse')}
            accessibilityRole="button"
            style={{ width: '100%' }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                height: 56,
                borderRadius: R.full,
                backgroundColor: ps.surfaceContainer,
              }}
            >
              <Symbol name="logout" size={20} color={ps.error} />
{/* STEP 6.14 a way out
              <Text style={[TYPE.labelLg, { color: ps.error }]}>{SETTINGS.logOut}</Text>
*/}
            </View>
          </Pressable>

          <Pressable accessibilityRole="button">
            <Text style={[TYPE.labelMd, { color: ps.secondary }]}>{SETTINGS.deleteAccount}</Text>
          </Pressable>

          <View style={{ alignItems: 'center', gap: 2, marginTop: SP.xs }}>
{/* STEP 6.15 and the small print
            <Text style={[TYPE.labelSm, { color: ps.secondary }]}>{SETTINGS.version}</Text>
*/}
            <Text style={[TYPE.bodySm, { color: ps.outline }]}>{SETTINGS.licence}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 12) + 12,
        }}
      >
        <TabDock
          active="settings"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'settings') router.push(tab.route);
          }}
        />
      </View>
    </View>
  );
}
