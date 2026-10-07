import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.15 where else they can go
// import { MenuRow } from '@/features/lumina/components/menu-row';
// STEP 4.03 who they are
// import { ProfileIdentity } from '@/features/lumina/components/profile-identity';
// STEP 4.13 the upsell again
// import { PromoBanner } from '@/features/lumina/components/promo-banner';
// STEP 4.01 a way back out
// import { ScreenHead } from '@/features/lumina/components/screen-head';
// STEP 4.05 how they are doing
// import { StatCard, StatTriple } from '@/features/lumina/components/stat-card';
// STEP 4.20 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/lumina/components/tab-dock';
import { TABS } from '@/features/lumina/data/home';
import { KEY_STATS, MENU, PROFILE, TOP_STATS } from '@/features/lumina/data/profile';
import { SP, ll, luminaTheme } from '@/features/lumina/theme';

/**
 * Screen 4 — the student profile.
 *
 * The header is a two-column row rather than a stack: the identity block on the
 * left and the two stat cards on the right, both stretching to the taller of
 * the pair. Everything below it is a single 16dp-spaced column.
 */
export default function LuminaProfile() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[luminaTheme, { flex: 1, backgroundColor: ll.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: SP.margin }}>
{/* STEP 4.02 name the screen
        <ScreenHead
          title={PROFILE.title}
          action="settings"
          onBack={() => router.back()}
          onAction={() => router.push('/lumina')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: SP.md,
          paddingBottom: 112,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'stretch', gap: 12 }}>
{/* STEP 4.04 the face and the name
          <ProfileIdentity
            name={PROFILE.name}
            level={PROFILE.level}
            tagline={PROFILE.tagline}
            photo={require('../../../assets/images/lumina/student.jpg')}
          />
*/}

{/* STEP 4.06 two numbers beside it
          <View style={{ flex: 1, gap: 10 }}>
            {TOP_STATS.map((stat) => (
              <StatCard key={stat.key} stat={stat} />
            ))}
          </View>
*/}
        </View>

        <View style={{ marginTop: SP.md }}>
{/* STEP 4.09 three more below
          <StatTriple stats={KEY_STATS} />
*/}
        </View>

        <View style={{ marginTop: SP.md }}>
{/* STEP 4.14 unlock study pro
          <PromoBanner
            title={PROFILE.promo.title}
            body={PROFILE.promo.body}
            cta={PROFILE.promo.cta}
            compact
          />
*/}
        </View>

{/* STEP 4.16 stack the menu
        <View
          style={{
            marginTop: SP.md,
            gap: 10,
            // MISTAKE 4.17 the menu came in half the width of the screen
            width: '55%',
          }}
        >
          {MENU.map((item) => (
            <MenuRow key={item.key} item={item} onPress={() => router.push(item.route)} />
          ))}
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
{/* STEP 4.21 the tab bar
        <TabDock
          active="profile"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'profile') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
