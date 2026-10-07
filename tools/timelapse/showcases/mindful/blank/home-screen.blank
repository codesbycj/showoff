import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.15 the floating dock
// import { TabBar } from '@/features/mindful/components/bits';
// STEP 2.01 everything the dashboard is made of
// import { MetricTile, MoodChipButton, ProfileHeader, QuizCard, RoutineRow, } from '@/features/mindful/components/home-parts';
import { HOME, METRICS, MOOD_CHIPS, QUIZ, ROUTINE } from '@/features/mindful/data/home';
import { TABS } from '@/features/mindful/data/nav';
import { SP, TYPE, mindfulTheme, mp } from '@/features/mindful/theme';

/**
 * Screen 2 — today's mood dashboard.
 *
 * One scrolling column at the page's 16dp margin, with the nav dock floating
 * over it. The mood row is the exception: it bleeds to both edges so its last
 * chip can be clipped by the right edge the way the reference shows — the tell
 * that it scrolls rather than wraps.
 *
 * The dock overlays the content rather than sitting below it, so the scroll
 * view reserves room for it at the bottom instead of being squeezed.
 */
export default function MindfulHome() {
  const insets = useSafeAreaInsets();
  const dockSpace = 48 + SP.sm + SP.md + Math.max(insets.bottom, SP.md);

  return (
    <View style={[mindfulTheme, { flex: 1, backgroundColor: mp.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + SP.xs, paddingBottom: dockSpace }}
      >
        <View style={{ paddingHorizontal: SP.marginSm, gap: SP.lg }}>
{/* STEP 2.02 say who is here
          <ProfileHeader
            eyebrow={HOME.eyebrow}
            name={HOME.name}
            avatar={require('../../../assets/images/mindful/alex.jpg')}
            onMenu={() => router.push('/mindful/profile')}
            onAvatar={() => router.push('/mindful/profile')}
          />
*/}

{/* STEP 2.03 ask the day's question
          <View style={{ gap: SP.xs }}>
            <Text style={[TYPE.labelMd, { color: mp.variant }]}>{HOME.date}</Text>
            <Text style={[TYPE.headlineXlMobile, { color: mp.ink }]}>{HOME.greeting}</Text>
          </View>
*/}
        </View>

{/* STEP 2.04 a rail of moods to pick from
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SP.marginSm,
            gap: SP.sm,
            paddingVertical: SP.xs,
          }}
          style={{ marginTop: SP.lg }}
        >
          {MOOD_CHIPS.map((c) => (
            <MoodChipButton key={c.key} chip={c} onPress={() => router.push('/mindful/checkin')} />
          ))}
        </ScrollView>
*/}

        <View style={{ paddingHorizontal: SP.marginSm, gap: SP.lg, marginTop: SP.lg }}>
{/* STEP 2.09 two tiles side by side
          <View style={{ flexDirection: 'row', gap: SP.gutterSm }}>
            {METRICS.map((m) => (
              <MetricTile key={m.key} metric={m} />
            ))}
          </View>
*/}

{/* STEP 2.12 the daily quiz
          <View
            style={{
              // MISTAKE 2.13 the quiz card came in shrunk away from the margin
              marginHorizontal: 28,
            }}
          >
            <QuizCard
              eyebrow={QUIZ.eyebrow}
              counter={QUIZ.counter}
              question={QUIZ.question}
              yes={QUIZ.yes}
              no={QUIZ.no}
              onAnswer={() => router.push('/mindful/checkin')}
            />
          </View>
*/}

{/* STEP 2.14 where the routine stands
          <RoutineRow
            title={ROUTINE.title}
            sub={ROUTINE.sub}
            onPress={() => router.push('/mindful/insights')}
          />
*/}
        </View>
      </ScrollView>

{/* STEP 2.16 float the dock over it all
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 0) + SP.md,
        }}
      >
        <TabBar
          active="home"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'home') router.push(tab.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
