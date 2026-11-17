import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.12 import client rail
// import { ClientRail } from '@/features/kovahome/components/client-rail';
// STEP 1.13 import glyph
// import { Glyph } from '@/features/kovahome/components/glyph';
// STEP 1.01 import greet row
// import { GreetRow } from '@/features/kovahome/components/greet-row';
// STEP 1.20 import pill dock
// import { PillDock } from '@/features/kovahome/components/pill-dock';
// STEP 1.15 import reminder card
// import { ReminderCard } from '@/features/kovahome/components/reminder-card';
// STEP 1.09 import section row
// import { SectionRow } from '@/features/kovahome/components/section-row';
// STEP 1.04 import stat strip
// import { StatStrip } from '@/features/kovahome/components/stat-strip';
// STEP 1.13 import text
// import { T } from '@/features/kovahome/components/text';
// STEP 1.19 import upcoming rail
// import { UpcomingRail } from '@/features/kovahome/components/upcoming-rail';
import { labels } from '@/features/kovahome/data/home';
import { useLayout } from '@/features/kovahome/layout';
import { ct } from '@/features/kovahome/theme';

/**
 * Kova — the creator desk.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The upcoming rail runs under the floating dock as the board crops it, so the
 * foot cannot open a band (I3), and the three counts at the top are computed
 * from the lists below them (R9).
 */
export default function KovahomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 greet row
      <GreetRow margin={L.margin} height={L.greetH} />
      */}

      <View style={{ height: L.gapGreet }} />
      {/* STEP 1.04 stat strip
      <StatStrip margin={L.margin} height={L.statsH} />
      */}

      <View style={{ height: L.gapStats }} />
      {/* STEP 1.09 section row
      <SectionRow
        margin={L.margin}
        height={L.sectionH}
        label={labels.clients}
        link={labels.manage}
      />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.12 client rail
      <ClientRail
        margin={L.margin}
        width={L.client.w}
        height={L.client.h}
        radius={L.client.radius}
        gap={L.gapClients}
      />
      */}

      <View style={{ height: L.gapClients }} />
      {/* STEP 1.13 add
      <View style={{ marginHorizontal: L.margin }}>
        <Pressable accessibilityRole="button" accessibilityLabel={labels.add}>
          <View
            style={{
              height: L.add.h,
              borderRadius: L.add.radius,
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: ct.line,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Glyph name="plus" size={18} color={ct.muted} strokeWidth={2} />
            <T variant="add">{labels.add}</T>
          </View>
        </Pressable>
      </View>
      */}

      <View style={{ height: L.gapAdd }} />
      {/* STEP 1.14 section row
      <SectionRow
        margin={L.margin}
        height={L.sectionH}
        label={labels.reminders}
        link={labels.seeAll}
      />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.15 reminder card
      <ReminderCard margin={L.margin} height={L.reminder.h} radius={L.reminder.radius} />
      */}

      <View style={{ height: L.gapReminder }} />
      {/* STEP 1.18 section row
      <SectionRow
        margin={L.margin}
        height={L.sectionH}
        label={labels.upcoming}
        link={labels.seeAll}
      />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.19 upcoming rail
      <UpcomingRail
        margin={L.margin}
        width={L.upcoming.w}
        height={L.upcoming.h}
        radius={L.upcoming.radius}
      />
      */}

      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.20 pill dock
      <PillDock
        margin={L.margin}
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="home"
        onCalendar={() => router.push('/kovacal')}
      />
      */}
    </View>
  );
}
