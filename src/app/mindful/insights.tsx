import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.23 the floating dock
// import { TabBar } from '@/features/mindful/components/bits';
// STEP 5.01 everything the insights page is made of
// import { CorrelationPanel, InsightsHeader, PracticeCard, PulseHero, ReflectionCard, SectionHead, } from '@/features/mindful/components/insights-parts';
import {
  BOOSTERS,
  DRAINS,
  INSIGHTS,
  PRACTICES,
  REFLECTION_TAGS,
} from '@/features/mindful/data/insights';
import { TABS } from '@/features/mindful/data/nav';
import { SP, mindfulTheme, mp } from '@/features/mindful/theme';

/**
 * Screen 5 — insights and practices.
 *
 * The longest screen in the set: header, the emotional-pulse hero, three
 * micro-practice cards, the correlation panel, then the weekly reflection.
 * One scrolling column throughout, with the dock floating over it.
 *
 * The reflection chips are the only live state; a practice card's action goes
 * to the check-in, which is where a logged session would land.
 */
export default function MindfulInsights() {
  const insets = useSafeAreaInsets();
  const [tags, setTags] = useState<string[]>([]);
  const dockSpace = 48 + SP.sm + SP.md + Math.max(insets.bottom, SP.md);

  return (
    <View style={[mindfulTheme, { flex: 1, backgroundColor: mp.bg, paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.marginSm,
          paddingBottom: dockSpace,
          gap: SP.lg,
        }}
      >
{/* STEP 5.02 introduce the coach
        <InsightsHeader onTune={() => router.push('/mindful/profile')} />
*/}

{/* STEP 5.03 today's emotional pulse
        <View
          style={{
            // MISTAKE 5.04 the hero came in squashed to half its height
            transform: [{ scaleY: 0.5 }],
          }}
        >
          <PulseHero />
        </View>
*/}

{/* STEP 5.05 offer three small practices
        <View style={{ gap: SP.sm }}>
          <SectionHead
            title={INSIGHTS.practicesTitle}
            sub={INSIGHTS.practicesSub}
            chip={INSIGHTS.practicesCount}
          />
          <View style={{ gap: SP.sm }}>
            {PRACTICES.map((p) => (
              <PracticeCard key={p.key} p={p} onPress={() => router.push('/mindful/checkin')} />
            ))}
          </View>
        </View>
*/}

{/* STEP 5.09 what lifted and drained the week
        <View style={{ gap: SP.sm }}>
          <SectionHead title={INSIGHTS.correlationTitle} sub={INSIGHTS.correlationSub} />
          <CorrelationPanel boosters={BOOSTERS} drains={DRAINS} />
        </View>
*/}

{/* STEP 5.17 ask for a reflection
        <View style={{ gap: SP.sm }}>
          <SectionHead title={INSIGHTS.reflectionTitle} note={INSIGHTS.reflectionWeek} />
          <ReflectionCard
            tags={REFLECTION_TAGS}
            selected={tags}
            onToggle={(key) =>
              setTags((t) => (t.includes(key) ? t.filter((k) => k !== key) : [...t, key]))
            }
            onSave={() => router.push('/mindful/calendar')}
          />
        </View>
*/}
      </ScrollView>

{/* STEP 5.24 float the dock over it all
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 0) + SP.md,
        }}
      >
        <TabBar
          active="mood-analytics"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'mood-analytics') router.push(tab.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
