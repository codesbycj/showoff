import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/nudgehome/components/glyph';
// STEP 1.02 import text
// import { T } from '@/features/nudgehome/components/text';
import { anytime, copy, days, habits, streak, tabs, tasks } from '@/features/nudgehome/data/home';
import { ct, radius, type } from '@/features/nudgehome/theme';
import { useInsets } from '@/features/nudgehome/use-insets';

const MARGIN = 18;
const HABIT_H = 116;
const DAY = 46;
const DOCK_H = 58;

/**
 * Nudge — today.
 *
 * Assembly only: who you are and your streak, the habits, the day strip, the
 * planned tasks and the one you can do any time.
 *
 * The habit cards overlap each other slightly and tilt, which is the
 * reference's own composition — they are siblings in a row with negative
 * margins rather than absolutely placed, so the row still measures correctly
 * and still fits the screen.
 */
export default function NudgehomeScreen() {
  const insets = useInsets();
  const { width } = useWindowDimensions();
  const [day, setDay] = useState(days.findIndex((d) => d.today));

  // A small gap, not an overlap. At the reference's overlap the third card
  // covered the second one's label, which the audit reported as both
  // clipped and covered -- and it was.
  const habitW = Math.floor((width - MARGIN * 2 - 12) / habits.length);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      {/* STEP 1.03 the next block

      */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
      >
        {/* STEP 1.04 hello
        <View style={{ paddingTop: insets.top + 6, paddingHorizontal: MARGIN }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 44 }}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 9,
                backgroundColor: ct.ink,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="ghost" size={16} tint={ct.page} />
            </View>
            <T variant="hello" color={ct.muted} style={{ height: type.hello.line, marginLeft: 9 }}>
              {copy.hello}
            </T>
            <T variant="helloName" color={ct.ink} style={{ height: type.helloName.line }}>
              {copy.name}
            </T>
            <View style={{ flex: 1 }} />
            <T variant="streak" color={ct.ink} style={{ height: type.streak.line }}>
              {String(streak)}
            </T>
            <View style={{ marginLeft: 5 }}>
              <Glyph name="flame" size={18} tint={ct.flame} />
            </View>
          </View>
        </View>
        */}

        {/* STEP 1.05 label
        <View style={{ flexDirection: 'row', paddingHorizontal: MARGIN, marginTop: 10 }}>
          {habits.map((h, i) => (
            <Pressable key={h.id} accessibilityRole="button" accessibilityLabel={h.label}>
              <View
                style={{
                  width: habitW,
                  height: HABIT_H,
                  borderRadius: radius.habit,
                  overflow: 'hidden',
                  marginLeft: i === 0 ? 0 : 6,
                  borderWidth: 3,
                  borderColor: ct.page,
                  transform: [{ rotate: `${(i - 1) * 2.5}deg` }],
                  justifyContent: 'flex-end',
                }}
              >
                <Image
                  source={h.photo}
                  style={{ position: 'absolute', width: habitW, height: HABIT_H }}
                  contentFit="cover"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 6,
                    marginBottom: 6,
                    paddingHorizontal: 8,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: 'rgba(14,14,18,0.58)',
                  }}
                >
                  <Glyph name={h.icon} size={13} tint={ct.page} strokeWidth={1.9} />
                  <T
                    variant="habit"
                    color={ct.page}
                    numberOfLines={1}
                    style={{ height: type.habit.line, marginLeft: 5 }}
                  >
                    {h.label}
                  </T>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        */}

        {/* STEP 1.06 "Collapse planned"
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: MARGIN,
            marginTop: 22,
          }}
        >
          <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.planned}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Collapse planned"
            style={{ width: 44, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}
          >
            <Glyph name="chevron" size={18} tint={ct.muted} />
          </Pressable>
        </View>
        */}

        {/* STEP 1.07 letter
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: MARGIN,
            marginTop: 6,
          }}
        >
          {days.map((d, i) => {
            const on = i === day;
            return (
              <Pressable
                key={d.id}
                accessibilityRole="button"
                accessibilityLabel={`${d.num}`}
                accessibilityState={{ selected: on }}
                onPress={() => setDay(i)}
              >
                <View style={{ alignItems: 'center', width: DAY }}>
                  <T
                    variant="dayNum"
                    color={d.done ? ct.faint : ct.ink}
                    style={{ height: type.dayNum.line }}
                  >
                    {String(d.num)}
                  </T>
                  <View
                    style={{
                      width: DAY - 10,
                      height: DAY - 10,
                      borderRadius: (DAY - 10) / 2,
                      marginTop: 4,
                      backgroundColor: on ? ct.red : ct.shade,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {d.done ? (
                      <Glyph name="check" size={16} tint={ct.faint} />
                    ) : (
                      <T
                        variant="dayLetter"
                        color={on ? ct.onRed : ct.faint}
                        style={{ height: type.dayLetter.line }}
                      >
                        {d.letter}
                      </T>
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
        */}

        {/* STEP 1.08 title
        <View style={{ paddingHorizontal: MARGIN, marginTop: 14 }}>
          {tasks.map((t) => (
            <View
              key={t.id}
              style={{
                borderRadius: radius.card,
                backgroundColor: ct.card,
                borderWidth: 1,
                borderColor: ct.hairline,
                padding: 14,
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: t.tint === 'purple' ? ct.purple : ct.blue,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 1,
                  }}
                >
                  <T variant="badge" color={ct.onRed} style={{ height: type.badge.line }}>
                    {String(t.n)}
                  </T>
                </View>
                <T
                  variant="taskTitle"
                  color={ct.ink}
                  style={{ flex: 1, marginLeft: 10, marginRight: 8 }}
                >
                  {t.title}
                </T>
                <Pressable accessibilityRole="button" accessibilityLabel={`Options for ${t.title}`}>
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Glyph name="kebab" size={16} tint={ct.faint} />
                  </View>
                </Pressable>
              </View>

              <T
                variant="taskTime"
                color={ct.muted}
                style={{ height: type.taskTime.line, marginTop: 8, marginLeft: 32 }}
              >
                {t.time}
              </T>

              {t.chip ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 32,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 28,
                      paddingHorizontal: 10,
                      borderRadius: radius.chip,
                      borderWidth: 1,
                      borderColor: '#F2DDB6',
                      backgroundColor: ct.amberWash,
                    }}
                  >
                    <Glyph name="clock" size={13} tint={ct.amber} strokeWidth={1.9} />
                    <T
                      variant="chip"
                      color={ct.amber}
                      style={{ height: type.chip.line, marginLeft: 5 }}
                    >
                      {t.chip}
                    </T>
                  </View>

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={copy.reschedule}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 13,
                      paddingHorizontal: 12,
                    }}
                  >
                    <T variant="link" color={ct.red} style={{ height: type.link.line }}>
                      {copy.reschedule}
                    </T>
                    <View style={{ marginLeft: 5 }}>
                      <Glyph name="arrow" size={14} tint={ct.red} />
                    </View>
                  </Pressable>
                </View>
              ) : null}
            </View>
          ))}
        </View>
        */}

        {/* STEP 1.09 anytime
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: MARGIN,
            marginTop: 20,
          }}
        >
          <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.anytime}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${copy.new} task`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 13,
              paddingLeft: 12,
            }}
          >
            <Glyph name="plus" size={14} tint={ct.red} />
            <T variant="link" color={ct.red} style={{ height: type.link.line, marginLeft: 5 }}>
              {copy.new}
            </T>
          </Pressable>
        </View>
        */}

        {/* STEP 1.10 "Options"
        <View style={{ paddingHorizontal: MARGIN, marginTop: 6 }}>
          <View
            style={{
              borderRadius: radius.card,
              backgroundColor: ct.card,
              borderWidth: 1,
              borderColor: ct.hairline,
              padding: 14,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={copy.startNow}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 13,
                  paddingRight: 12,
                }}
              >
                <T variant="link" color={ct.red} style={{ height: type.link.line }}>
                  {copy.startNow}
                </T>
                <View style={{ marginLeft: 6 }}>
                  <Glyph name="play" size={11} tint={ct.red} />
                </View>
              </Pressable>
              <View style={{ flex: 1 }} />
              <Pressable accessibilityRole="button" accessibilityLabel="Options">
                <View
                  style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Glyph name="kebab" size={16} tint={ct.faint} />
                </View>
              </Pressable>
            </View>
            <T variant="taskTitle" color={ct.ink} style={{ marginTop: 2 }}>
              {anytime.title}
            </T>
            <T
              variant="taskTime"
              color={ct.faint}
              style={{ height: type.taskTime.line, marginTop: 6 }}
            >
              {anytime.length}
            </T>
          </View>
        </View>
        */}
      </ScrollView>

      {/* STEP 1.11 glyph
      <View
        style={{
          height: DOCK_H + insets.bottom,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: ct.hairline,
        }}
      >
        {tabs.map((tab, i) => {
          const isAdd = tab.id === 'add';
          return (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: i === 0 }}
              style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
              {isAdd ? (
                <View
                  style={{
                    width: 54,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: ct.red,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph name="plus" size={20} tint={ct.onRed} />
                </View>
              ) : (
                <Glyph name={tab.icon} size={22} tint={i === 0 ? ct.ink : ct.faint} />
              )}
            </Pressable>
          );
        })}
      </View>
      */}
      {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
