import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { Dock } from '@/features/flowhome/components/dock';
import { GreetingRow } from '@/features/flowhome/components/greeting-row';
import { MoodChips } from '@/features/flowhome/components/mood-chips';
import { PhaseCard } from '@/features/flowhome/components/phase-card';
import { SessionCard } from '@/features/flowhome/components/session-card';
import { T } from '@/features/flowhome/components/text';
import { WeekStrip } from '@/features/flowhome/components/week-strip';
import { mood, training } from '@/features/flowhome/data/home';
import { useLayout } from '@/features/flowhome/layout';
import { ct } from '@/features/flowhome/theme';

/**
 * Flowan — today.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The phase card is the remainder, so the mood row always sits above the dock
 * and the foot can never open a band (I3).
 */
export default function FlowhomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <GreetingRow margin={L.margin} height={L.greetH} />

      <View style={{ height: L.gapGreet }} />
      <WeekStrip margin={L.margin} height={L.weekH} />

      <View style={{ height: L.gapWeek }} />
      <PhaseCard
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.phase.h}
        radius={L.phase.radius}
      />

      <View style={{ height: L.gapCard }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.sectionH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <T variant="section">{training.sectionLabel}</T>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={training.seeAll}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 10 }}
        >
          <T variant="seeAll">{training.seeAll}</T>
        </Pressable>
      </View>

      <View style={{ height: L.gapSection }} />
      <SessionCard
        margin={L.margin}
        height={L.session.h}
        radius={L.session.radius}
        onOpen={() => router.push('/flowtrain')}
      />

      <View style={{ height: L.gapSession }} />
      <View style={{ marginHorizontal: L.margin, height: L.questionH }}>
        <T variant="question">{mood.question}</T>
      </View>

      <View style={{ height: L.gapQuestion }} />
      <MoodChips margin={L.margin} height={L.mood.h} radius={L.mood.radius} />

      <Dock
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="home"
        onNourish={() => router.push('/flowmeals')}
      />
    </View>
  );
}
