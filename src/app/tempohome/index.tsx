import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.05 who is about
// import { CrewRow } from '@/features/tempohome/components/crew-row';
// STEP 1.03 what the day is for
// import { Headline } from '@/features/tempohome/components/headline';
// STEP 1.09 how much is waiting
// import { NoticePill } from '@/features/tempohome/components/notice-pill';
// STEP 1.11 today's work
// import { SectionHead } from '@/features/tempohome/components/section-head';
// STEP 1.17 the dock over the lot
// import { TabBar } from '@/features/tempohome/components/tab-bar';
// STEP 1.13 the first of them
// import { TaskCard } from '@/features/tempohome/components/task-card';
// STEP 1.01 the controls across the top
// import { TopBar } from '@/features/tempohome/components/top-bar';
import { tasks } from '@/features/tempohome/data/home';
import {
  CARD_GAP,
  CARD_TOP,
  CREW_TOP,
  DISPLAY_TOP,
  HEADER_TOP,
  MARGIN,
  NOTICE_TOP,
  SECTION_TOP,
  TAB_HEIGHT,
} from '@/features/tempohome/layout';
import { tp } from '@/features/tempohome/theme';
import { useInsets } from '@/features/tempohome/use-insets';

/**
 * Tempo — the home screen.
 *
 * Assembly only: the controls across the top, what the day is for, who is
 * about, how much is waiting, and today's work — over a scroll, with the dock
 * floating above it.
 *
 * The list scrolls under the dock rather than stopping above it. The
 * reference crops its phone just below the first card, which would leave
 * about 170dp of empty canvas at the foot if it were built literally; a list
 * that runs under the bar fills the screen and is also how the app would
 * really behave.
 */
export default function TempohomeScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tp.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
          paddingBottom: insets.bottom + TAB_HEIGHT + 20,
        }}
      >
{/* STEP 1.02 in place
        <TopBar />
*/}

{/* STEP 1.04 two lines and a gesture
        <View style={{ marginTop: DISPLAY_TOP }}>
          <Headline />
        </View>
*/}

{/* STEP 1.06 on their own card
        <View style={{ marginTop: CREW_TOP }}>
          <CrewRow />
        </View>
*/}

{/* STEP 1.10 said once, in the dark
        <View style={{ marginTop: NOTICE_TOP }}>
          <NoticePill />
        </View>
*/}

{/* STEP 1.12 and the way to the rest
        <View style={{ marginTop: SECTION_TOP }}>
          <SectionHead />
        </View>
*/}

{/* STEP 1.14 stacked down the page
        {tasks.map((t, i) => (
          <View
            key={t.id}
            style={{
              marginTop: i === 0 ? CARD_TOP : CARD_GAP,
              // MISTAKE 1.15 the cards came in washed out
              opacity: 0.45,
            }}
          >
            <TaskCard
              title={t.title}
              body={t.body}
              faces={t.faces}
              more={t.more}
              progress={t.progress}
            />
          </View>
        ))}
*/}
      </ScrollView>

{/* STEP 1.18 floating over the list
      <TabBar bottom={insets.bottom} />
*/}
    </View>
  );
}
