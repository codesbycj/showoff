import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.05 a word about it
// import { NoticePill } from '@/features/tempotask/components/notice-pill';
// STEP 1.03 how the week went
// import { ProgressCard } from '@/features/tempotask/components/progress-card';
// STEP 1.07 and what ran when
// import { TimelineCard } from '@/features/tempotask/components/timeline-card';
// STEP 1.01 the way back and what this is
// import { TopBar } from '@/features/tempotask/components/top-bar';
import {
  HEADER_TOP,
  MARGIN,
  NOTICE_TOP,
  PROGRESS_TOP,
  TIMELINE_TOP,
} from '@/features/tempotask/layout';
import { tp } from '@/features/tempotask/theme';
import { useInsets } from '@/features/tempotask/use-insets';

/**
 * Tempo — the task screen.
 *
 * Assembly only: the way back and what this is, how the week went, a word
 * about it, and what ran when.
 *
 * Both cards are given explicit heights so the stack solves to the bottom of
 * the screen rather than ending in a band of canvas — the arithmetic is in
 * `layout.ts`. They also share one six-day scale, which is why the marker line
 * on the timeline stands on the same day the chart's solid column does.
 */
export default function TempotaskScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: tp.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 in place
      <TopBar />
*/}

{/* STEP 1.04 six days of it
      <View style={{ marginTop: PROGRESS_TOP }}>
        <ProgressCard />
      </View>
*/}

{/* STEP 1.06 said once, in the dark
      <View style={{ marginTop: NOTICE_TOP }}>
        <NoticePill />
      </View>
*/}

{/* STEP 1.08 on the same scale
      <View
        style={{
          flex: 1,
          marginTop: TIMELINE_TOP,
          marginBottom: 2,
          // MISTAKE 1.09 the timeline came in squeezed
          maxHeight: 150,
        }}
      >
        <TimelineCard />
      </View>
*/}
    </View>
  );
}
