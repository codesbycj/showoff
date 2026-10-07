import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.17 import the verdict card
// import { FactCheckCard } from '@/features/voteng/components/fact-check-card';
// STEP 4.05 import the lead
// import { LeadStory } from '@/features/voteng/components/lead-story';
// STEP 4.01 import the masthead
// import { PageHead } from '@/features/voteng/components/page-head';
// STEP 4.07 import the section head
// import { SectionHead } from '@/features/voteng/components/section-head';
// STEP 4.09 import the story row
// import { StoryRow } from '@/features/voteng/components/story-row';
// STEP 4.24 import the tab bar
// import { TabBar } from '@/features/voteng/components/tab-bar';
// STEP 4.03 import the filter rail
// import { TabStrip } from '@/features/voteng/components/tab-strip';
import { NAV } from '@/features/voteng/data/election';
import { CHECKS, LEAD, NEWS_PAGE, STORIES } from '@/features/voteng/data/news';
import { SP, vt, votengTheme } from '@/features/voteng/theme';

/**
 * Screen 4 — news.
 *
 * Home's news rail is three cards wide and horizontal; this is the same
 * material given a page. It runs one lead story at full bleed, then a vertical
 * list, then the fact-check rail — widest item first, so the eye starts at the
 * one story the desk is leading on and the rest reads as the tail.
 */
export default function VotengNews() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<string>(NEWS_PAGE.filters[0]);

  return (
    <View style={[votengTheme, { flex: 1, backgroundColor: vt.canvas }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: SP.xl }}
      >
{/* STEP 4.02 name the page
        <PageHead title={NEWS_PAGE.title} subtitle={NEWS_PAGE.subtitle} />
*/}

{/* STEP 4.04 five ways to narrow it
        <View style={{ marginTop: SP.md }}>
          <TabStrip tabs={NEWS_PAGE.filters} active={filter} onSelect={setFilter} />
        </View>
*/}

{/* STEP 4.06 what the desk is leading on
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md }}>
          <LeadStory story={LEAD} />
        </View>
*/}

{/* STEP 4.08 name the top stories
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg + 4 }}>
          <SectionHead title={NEWS_PAGE.topTitle} action={NEWS_PAGE.topAction} />
        </View>
*/}

{/* STEP 4.10 room for the list
        <View style={{ paddingHorizontal: SP.margin, marginTop: 10, gap: 10 }}>
          {STORIES.map((s) => (
            <StoryRow key={s.key} story={s} />
          ))}
        </View>
*/}

{/* STEP 4.16 name the fact check
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg + 4 }}>
          <SectionHead title={NEWS_PAGE.factTitle} action={NEWS_PAGE.factAction} />
        </View>
*/}

{/* STEP 4.18 the verdicts, stacked | FIX 4.23 fixed-width cards belong in a rail
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md, gap: SP.md }}>
          {CHECKS.map((c) => (
            <FactCheckCard key={c.key} check={c} />
          ))}
        </View>
*/}

{/* STEP 4.22 the fact-check rail
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: SP.md, paddingTop: SP.md }}
        >
          {CHECKS.map((c) => (
            <FactCheckCard key={c.key} check={c} />
          ))}
        </ScrollView>
*/}
      </ScrollView>

{/* STEP 4.25 pin the tab bar
      <TabBar
        items={NAV}
        active="news"
        inset={insets.bottom}
        onSelect={(k) => {
          const item = NAV.find((n) => n.key === k);
          if (item && k !== 'news') router.push(item.route);
        }}
      />
*/}
    </View>
  );
}
