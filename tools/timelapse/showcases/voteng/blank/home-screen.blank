import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.01 import the masthead
// import { AppHeader } from '@/features/voteng/components/app-header';
// STEP 2.05 import the banner
// import { HeroBanner } from '@/features/voteng/components/hero-banner';
// STEP 2.26 import the story card
// import { NewsCard } from '@/features/voteng/components/news-card';
// STEP 2.17 import the explore tile
// import { QuickTile } from '@/features/voteng/components/quick-tile';
// STEP 2.03 import the search capsule
// import { SearchField } from '@/features/voteng/components/search-field';
// STEP 2.09 import the section head
// import { SectionHead } from '@/features/voteng/components/section-head';
// STEP 2.31 import the tab bar
// import { TabBar } from '@/features/voteng/components/tab-bar';
// STEP 2.07 import the filter rail
// import { TabStrip } from '@/features/voteng/components/tab-strip';
// STEP 2.11 import the tally card
// import { TallyCard } from '@/features/voteng/components/tally-card';
import { NAV } from '@/features/voteng/data/election';
import { CANDIDATES, HOME, NEWS, QUICK } from '@/features/voteng/data/home';
import { SP, vt, votengTheme } from '@/features/voteng/theme';

/**
 * Screen 2 — home.
 *
 * One scrolling column, with the tab bar pinned across the bottom. Nothing in
 * the column is horizontally padded by the scroll itself: the tab strip and the
 * news rail both run off the right edge, so each block owns its own gutter.
 */
export default function VotengHome() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<string>(HOME.tabs[0]);

  return (
    <View style={[votengTheme, { flex: 1, backgroundColor: vt.canvas }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: SP.xl }}
      >
{/* STEP 2.02 who this is
        <AppHeader onProfile={() => router.push('/voteng/results')} />
*/}

{/* STEP 2.04 somewhere to search
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.sm }}>
          <SearchField placeholder={HOME.searchPlaceholder} />
        </View>
*/}

{/* STEP 2.06 nigeria decides
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.sm }}>
          <HeroBanner
            kicker={HOME.hero.kicker}
            title={HOME.hero.title}
            blurb={HOME.hero.blurb}
            cta={HOME.hero.cta}
            art={require('../../../assets/images/voteng/hero-ballot.jpg')}
            onPress={() => router.push('/voteng/results')}
          />
        </View>
*/}

{/* STEP 2.08 four ballots to choose between
        <View style={{ marginTop: 14 }}>
          <TabStrip tabs={HOME.tabs} active={category} onSelect={setCategory} />
        </View>
*/}

{/* STEP 2.10 name the live section
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md + 4 }}>
          <SectionHead
            title={HOME.resultsTitle}
            action={HOME.resultsAction}
            live
            onPress={() => router.push('/voteng/results')}
          />
        </View>
*/}

{/* STEP 2.12 room for the running order
        <View style={{ paddingHorizontal: SP.margin, marginTop: 10, gap: 10 }}>
          {CANDIDATES.map((c, i) => (
            <TallyCard
              key={c.key}
              candidate={c}
              index={i}
              onPress={() => router.push('/voteng/results')}
            />
          ))}
        </View>
*/}

{/* STEP 2.18 all four tiles in one row | FIX 2.24 no — two rows of two
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md + 4, flexDirection: 'row', gap: SP.md }}>
          {QUICK.map((t) => (
            <QuickTile key={t.key} tile={t} onPress={() => router.push('/voteng/results')} />
          ))}
        </View>
*/}

{/* STEP 2.23 the explore grid
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md + 4, gap: SP.md }}>
          <View style={{ flexDirection: 'row', gap: SP.md }}>
            {QUICK.slice(0, 2).map((t) => (
              <QuickTile key={t.key} tile={t} onPress={() => router.push('/voteng/results')} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: SP.md }}>
            {QUICK.slice(2).map((t) => (
              <QuickTile key={t.key} tile={t} onPress={() => router.push('/voteng/results')} />
            ))}
          </View>
        </View>
*/}

{/* STEP 2.25 name the news
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg + 4 }}>
          <SectionHead title={HOME.newsTitle} action={HOME.newsAction} />
        </View>
*/}

{/* STEP 2.27 lay the rail
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 14, paddingTop: SP.md }}
        >
          {NEWS.map((n) => (
            <NewsCard key={n.key} item={n} />
          ))}
        </ScrollView>
*/}
      </ScrollView>

{/* STEP 2.32 pin the tab bar
      <TabBar
        items={NAV}
        active="home"
        inset={insets.bottom}
        onSelect={(k) => {
          const item = NAV.find((n) => n.key === k);
          if (item && k !== 'home') router.push(item.route);
        }}
      />
*/}
    </View>
  );
}
