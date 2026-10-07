import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.01 the shared kit
// import { AppHeader, Chip, FilterChip, SectionHead, TabBar, } from '@/features/redbrew/components/bits';
// STEP 1.03 the menu cards
// import { ClubCard, HeroCard, OrderToggle, PickCard, ReorderCard, RoastNote, SearchRow, } from '@/features/redbrew/components/home-cards';
import { CATEGORIES, HOME, PICKS } from '@/features/redbrew/data/home';
import { TABS } from '@/features/redbrew/data/nav';
import { SP, TYPE, rb, redbrewTheme } from '@/features/redbrew/theme';

/**
 * Screen 1 — menu discovery.
 *
 * A pinned header over one scrolling column at the page's 20dp margin, with the
 * tab bar flat against the bottom edge. The category rail bleeds to both edges
 * so its last chip can be clipped by the right edge the way the reference
 * shows — the tell that it scrolls.
 */
export default function RedbrewHome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[redbrewTheme, { flex: 1, backgroundColor: rb.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
{/* STEP 1.02 name the shop
        <AppHeader
          section={HOME.section}
          store={HOME.store}
          avatar={require('../../../assets/images/redbrew/alex.jpg')}
          onBell={() => router.push('/redbrew/orders')}
          onAvatar={() => router.push('/redbrew/profile')}
          onStore={() => router.push('/redbrew/profile')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SP.lg, gap: SP.lg }}
      >
        <View style={{ paddingHorizontal: SP.margin, gap: SP.md }}>
{/* STEP 1.04 greet them
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[TYPE.headlineMd, { color: rb.ink }]} numberOfLines={1}>
                {HOME.greeting}
              </Text>
              <Text style={[TYPE.bodyLg, { color: rb.secondary, marginTop: 2 }]}>
                {HOME.greetingSub}
              </Text>
            </View>

            <Chip label={HOME.streak} tone="crimsonSoft" icon="localFireDepartment" />
          </View>
*/}

{/* STEP 1.05 somewhere to search
          <SearchRow
            placeholder={HOME.searchPlaceholder}
            onSearch={() => router.push('/redbrew/product')}
            onFilter={() => router.push('/redbrew/product')}
          />
*/}

{/* STEP 1.06 pickup or delivery
          <OrderToggle mode="pickup" />
*/}

{/* STEP 1.07 today's pour
          <View
            style={{
              // MISTAKE 1.08 the hero came in squashed to half its height
              transform: [{ scaleY: 0.55 }],
            }}
          >
            <HeroCard onOrder={() => router.push('/redbrew/product')} />
          </View>
*/}

{/* STEP 1.09 the loyalty strip
          <ClubCard onPress={() => router.push('/redbrew/profile')} />
*/}
        </View>

{/* STEP 1.10 a rail of roasts
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 10, paddingVertical: 2 }}
        >
          {CATEGORIES.map((c, i) => (
            <FilterChip key={c.key} label={c.label} icon={c.icon} selected={i === 0} />
          ))}
        </ScrollView>
*/}

        <View style={{ paddingHorizontal: SP.margin, gap: SP.md }}>
{/* STEP 1.11 name the favourites
          <SectionHead
            title={HOME.popularTitle}
            chip={<Chip label={HOME.popularChip} tone="mint" />}
            action={HOME.seeAll}
            actionIcon="chevronRight"
            onAction={() => router.push('/redbrew/product')}
          />
*/}

{/* STEP 1.12 fill the grid
          <View style={{ gap: 12 }}>
            {[0, 2].map((start) => (
              <View key={start} style={{ flexDirection: 'row', gap: 12 }}>
                {PICKS.slice(start, start + 2).map((p) => (
                  <PickCard key={p.key} pick={p} onPress={() => router.push('/redbrew/product')} />
                ))}
              </View>
            ))}
          </View>
*/}

{/* STEP 1.13 their usual
          <ReorderCard onReorder={() => router.push('/redbrew/cart')} />
*/}

{/* STEP 1.18 what is roasting
          <RoastNote />
*/}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
{/* STEP 1.19 the tab bar
        <TabBar
          active="menu"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'menu') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
