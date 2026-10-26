import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.07 the courses
// import { CourseCard } from '@/features/larkhome/components/course-card';
// STEP 1.16 and where else it goes
// import { Dock } from '@/features/larkhome/components/dock';
// STEP 1.01 who is signed in
// import { Header } from '@/features/larkhome/components/header';
import { courses } from '@/features/larkhome/data/start';
import { CARD_GAP, LIST_TOP, MARGIN } from '@/features/larkhome/layout';
import { lk } from '@/features/larkhome/theme';
import { useInsets } from '@/features/larkhome/use-insets';

/**
 * Lark — the course board.
 *
 * Assembly only: who is signed in, the courses, and where else the app goes.
 *
 * The cards are written out rather than mapped so the reveal can land them
 * one at a time, which on a screen that is mostly one list is the build.
 *
 * The list scrolls and the last card runs off the bottom edge rather than
 * stopping above it — the reference crops its fifth card for the same reason,
 * and a stack that ends in a band of black reads as a page that ran out.
 */
export default function LarkhomeScreen() {
  const insets = useInsets();

  const card = (i: number) => ({
    title: courses[i].title,
    body: courses[i].body,
    tone: courses[i].tone,
    art: courses[i].art,
    onPress: () => router.push('/larkquiz'),
  });

  return (
    <View style={{ flex: 1, backgroundColor: lk.canvas, paddingTop: insets.top }}>
      <StatusBar style="light" />

      <View style={{ paddingHorizontal: MARGIN }}>
{/* STEP 1.02 along the top
        <Header />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: LIST_TOP,
          gap: CARD_GAP,
        }}
      >
{/* STEP 1.08 the first one
        <CourseCard {...card(0)} />
*/}
{/* STEP 1.12 another
        <CourseCard {...card(1)} />
*/}
{/* STEP 1.13 another
        <CourseCard {...card(2)} />
*/}
{/* STEP 1.14 another
        <CourseCard {...card(3)} />
*/}
{/* STEP 1.15 and one that runs off the edge
        <CourseCard {...card(4)} />
*/}
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }}>
{/* STEP 1.17 floating
        <Dock active="home" onSelect={(id) => id === 'chart' && router.push('/larkquiz')} />
*/}
      </View>
    </View>
  );
}
