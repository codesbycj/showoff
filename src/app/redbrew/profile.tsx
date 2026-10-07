import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 6.01 the shared kit
// import { AppHeader, SectionHead, TabBar } from '@/features/redbrew/components/bits';
// STEP 6.02 the account parts
// import { CashCard, ConciergeRow, IdentityCard, LogoutBlock, PerkCard, PrefsCard, StatTiles, } from '@/features/redbrew/components/profile-parts';
import { HOME } from '@/features/redbrew/data/home';
import { TABS } from '@/features/redbrew/data/nav';
import { PERKS, PROFILE } from '@/features/redbrew/data/profile';
import { SP, TYPE, rb, redbrewTheme } from '@/features/redbrew/theme';

/**
 * Screen 6 — profile & rewards.
 *
 * A long column of blocks. The perks rail bleeds to both edges so its second
 * card can be clipped by the right edge the way the reference shows — the tell
 * that it scrolls rather than wraps.
 */
export default function RedbrewProfile() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[redbrewTheme, { flex: 1, backgroundColor: rb.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
{/* STEP 6.03 name the screen
        <AppHeader
          section={PROFILE.section}
          store={HOME.store}
          avatar={require('../../../assets/images/redbrew/alex.jpg')}
          onBell={() => router.push('/redbrew/orders')}
          onAvatar={() => router.push('/redbrew/profile')}
          onStore={() => router.push('/redbrew')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SP.lg, gap: SP.lg }}
      >
        <View style={{ paddingHorizontal: SP.margin, gap: SP.md }}>
{/* STEP 6.04 who they are
          <IdentityCard onEdit={() => router.push('/redbrew/cart')} />
*/}

{/* STEP 6.05 what they have saved
          <View
            style={{
              // MISTAKE 6.06 the balance card came in two thirds wide
              width: "66%",
            }}
          >
          <CashCard
            onTopUp={() => router.push('/redbrew/cart')}
            onTransfer={() => router.push('/redbrew/orders')}
          />
          </View>
*/}

{/* STEP 6.07 three numbers
          <StatTiles />
*/}
        </View>

        <View style={{ gap: SP.md }}>
          <View style={{ paddingHorizontal: SP.margin }}>
{/* STEP 6.08 name the perks
            <SectionHead
              title={PROFILE.perksTitle}
              action={PROFILE.perksAction}
              onAction={() => router.push('/redbrew')}
            />
*/}
          </View>

{/* STEP 6.09 a rail of them
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 12, paddingVertical: 2 }}
          >
            {PERKS.map((p) => (
              <PerkCard key={p.key} perk={p} onApply={() => router.push('/redbrew/cart')} />
            ))}
          </ScrollView>
*/}
        </View>

        <View style={{ paddingHorizontal: SP.margin, gap: SP.md }}>
{/* STEP 6.10 how they like it
          <Text style={[TYPE.headlineMd, { color: rb.ink }]}>{PROFILE.prefsTitle}</Text>

          <PrefsCard onRow={() => router.push('/redbrew/tracking')} />
*/}

{/* STEP 6.11 someone to talk to
          <ConciergeRow onChat={() => router.push('/redbrew/tracking')} />
*/}

{/* STEP 6.18 a way out
          <LogoutBlock onPress={() => router.push('/redbrew')} />
*/}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
{/* STEP 6.19 the tab bar
        <TabBar
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
