import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View } from 'react-native';

// STEP 1.11 import day strip
// import { DayStrip } from '@/features/kovacal/components/day-strip';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/kovacal/components/glyph';
// STEP 1.20 import pill dock
// import { PillDock } from '@/features/kovacal/components/pill-dock';
// STEP 1.14 import reminder options
// import { ReminderOptions } from '@/features/kovacal/components/reminder-options';
// STEP 1.03 import text
// import { T } from '@/features/kovacal/components/text';
import { header, job, modes } from '@/features/kovacal/data/cal';
import { useLayout } from '@/features/kovacal/layout';
import { ct } from '@/features/kovacal/theme';

/**
 * Kova — the calendar.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The job card runs under the floating dock as the board crops it, so the foot
 * cannot open a band (I3), and the day strip is generated from its own first
 * date so the labels and the numbers agree (R9).
 */
export default function KovacalScreen() {
  const L = useLayout();

  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.tray,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.01 "Back"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/kovahome')}
        >
          <View style={round}>
            <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>
        */}

        {/* STEP 1.02 "Agenda view"
        <Pressable accessibilityRole="button" accessibilityLabel="Agenda view">
          <View style={round}>
            <Glyph name="stacks" size={19} color={ct.ink} strokeWidth={1.7} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.03 title
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        <T variant="greeting">{header.title}</T>
      </View>
      */}

      <View style={{ height: L.gapTitle }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.rangeH,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* STEP 1.04 glyph
        <Glyph name="calendar" size={18} color={ct.ink} strokeWidth={1.7} />
        */}
        {/* STEP 1.06 a stray gap above it | FIX 1.07 take the gap back out
        <View style={{ width: 11, height: 11 }} />
        */}
        {/* STEP 1.05 range
        <T variant="range" style={{ flex: 1 }}>
          {header.range}
        </T>
        */}

        {/* STEP 1.08 today
        <Pressable accessibilityRole="button" accessibilityLabel={header.today}>
          <View
            style={{
              height: 34,
              paddingHorizontal: 14,
              borderRadius: 17,
              backgroundColor: ct.tray,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="link">{header.today}</T>
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ height: L.gapRange }} />
      {/* STEP 1.09 label
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.mode.h,
          borderRadius: L.mode.radius,
          backgroundColor: ct.tray,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 4,
        }}
      >
        {modes.map((mode) => (
          <Pressable
            key={mode.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: !!mode.on }}
            accessibilityLabel={mode.label}
            hitSlop={{ top: 4, bottom: 4, left: 0, right: 0 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                height: L.mode.h - 8,
                borderRadius: L.mode.radius - 4,
                backgroundColor: mode.on ? ct.dark : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant={mode.on ? 'modeOn' : 'modeOff'}>{mode.label}</T>
            </View>
          </Pressable>
        ))}
      </View>
      */}

      <View style={{ height: L.gapMode }} />
      {/* STEP 1.12 a stray gap above it | FIX 1.13 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.11 day strip
      <DayStrip margin={L.margin} height={L.stripH} />
      */}

      <View style={{ height: L.gapStrip }} />
      {/* STEP 1.14 reminder options
      <ReminderOptions
        margin={L.margin}
        height={L.options.h}
        rowH={L.options.rowH}
        radius={L.options.radius}
      />
      */}

      <View style={{ height: L.gapOptions }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.job.h,
          borderRadius: L.job.radius,
          overflow: 'hidden',
        }}
      >
        {/* STEP 1.18 image
        <Image
          source={job.image}
          style={{ width: L.W - L.margin * 2, height: L.job.h }}
          resizeMode="cover"
          accessibilityLabel={job.title}
        />
        */}
        {/* STEP 1.19 chip
        <View style={{ position: 'absolute', left: 12, top: 12 }}>
          <View
            style={{
              height: 26,
              paddingHorizontal: 11,
              borderRadius: 13,
              backgroundColor: ct.dark,
              justifyContent: 'center',
            }}
          >
            <T variant="chip">{job.chip}</T>
          </View>
        </View>
        */}
      </View>

      {/* STEP 1.26 a stray gap above it | FIX 1.27 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.20 pill dock
      <PillDock
        margin={L.margin}
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="jobs"
        onCalendar={() => router.push('/kovastats')}
      />
      */}
    </View>
  );
}
