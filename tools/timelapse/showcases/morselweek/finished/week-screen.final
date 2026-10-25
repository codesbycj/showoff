import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { Glyph } from '@/features/morselweek/components/glyph';
import { T } from '@/features/morselweek/components/text';
import {
  copy,
  days,
  dock,
  foods,
  left,
  restShare,
  shares,
  today,
  weekdays,
} from '@/features/morselweek/data/day';
import {
  BAR_HEIGHT,
  BAR_TOP,
  CARD_GAP,
  CARD_PAD,
  CARDS_TOP,
  DAY_SIZE,
  DOCK_HEIGHT,
  FOOD_HEIGHT,
  HEADER_SIZE,
  HEADER_TOP,
  LEFT_TOP,
  MARGIN,
  TITLE_TOP,
  WEEK_TOP,
} from '@/features/morselweek/layout';
import { radius, ms, type } from '@/features/morselweek/theme';
import { useInsets } from '@/features/morselweek/use-insets';

/**
 * Morsel — the week.
 *
 * Assembly only: the way back and the calendar, which week this is, what is
 * left of the day, and what it went on — with the dock floating over it.
 *
 * The bar under "calories left" is the four cards: each segment is that
 * food's share of the day's target, so the picture and the figures are one
 * fact. The reference's segments have no relation to the numbers on its
 * cards.
 */
export default function MorselweekScreen() {
  const insets = useInsets();

  const fill = (tone: string) =>
    tone === 'indigo' ? ms.indigo : tone === 'teal' ? ms.teal : tone === 'lime' ? ms.lime : ms.sky;
  const ink = (tone: string) => (tone === 'indigo' || tone === 'teal' ? ms.onDark : ms.onLight);

  const disc = {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.control,
    backgroundColor: ms.chip,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: ms.canvas }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, paddingTop: insets.top + HEADER_TOP, paddingHorizontal: MARGIN }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back">
            <View style={disc}>
              <Glyph name="caret" size={19} tint={ms.ink} />
            </View>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" accessibilityLabel="Search">
            <View style={disc}>
              <Glyph name="scale" size={18} tint={ms.ink} />
            </View>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Alerts">
            <View style={[disc, { marginLeft: 10 }]}>
              <Glyph name="bell" size={18} tint={ms.ink} />
            </View>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: TITLE_TOP }}>
          <View style={{ flex: 1 }}>
            <T variant="title" color={ms.ink} style={{ height: type.title.line }}>
              {copy.title}
            </T>
            <T variant="meta" color={ms.body} style={{ height: type.meta.line }}>
              {copy.sub}
            </T>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Pick a week">
            <View style={[disc, { width: 38, height: 38 }]}>
              <Glyph name="clock" size={17} tint={ms.ink} />
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: WEEK_TOP }}>
          <View style={{ flexDirection: 'row' }}>
            {weekdays.map((d, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                <T variant="weekday" color={ms.muted} style={{ height: type.weekday.line }}>
                  {d}
                </T>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {days.map((d) => {
              const on = d === today;
              return (
                <View key={d} style={{ flex: 1, alignItems: 'center' }}>
                  <Pressable accessibilityRole="button" accessibilityLabel={'Day ' + d}>
                    <View
                      style={{
                        width: DAY_SIZE,
                        height: DAY_SIZE,
                        borderRadius: radius.control,
                        backgroundColor: on ? ms.dark : 'transparent',
                        borderWidth: on ? 0 : 1,
                        borderColor: ms.chip,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <T
                        variant="date"
                        color={on ? ms.onDark : ms.ink}
                        style={{ height: type.date.line }}
                      >
                        {String(d)}
                      </T>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: LEFT_TOP }}>
          <T variant="meta" color={ms.body} style={{ height: type.meta.line }}>
            {copy.left}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <T variant="figure" color={ms.ink} style={{ height: type.figure.line }}>
              {left}
            </T>
            <T variant="unit" color={ms.body} style={{ marginLeft: 5, height: type.unit.line }}>
              {copy.unit}
            </T>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: BAR_HEIGHT,
            marginTop: BAR_TOP,
            borderRadius: radius.pill,
            overflow: 'hidden',
            backgroundColor: ms.chip,
          }}
        >
          {shares.map((s) => (
            <View key={s.id} style={{ flex: s.share, backgroundColor: fill(s.tone) }} />
          ))}
          <View style={{ flex: restShare }} />
        </View>

        <View
          style={{ marginTop: CARDS_TOP, flexDirection: 'row', flexWrap: 'wrap', gap: CARD_GAP }}
        >
          {foods.map((f) => (
            <View
              key={f.id}
              style={{
                width: '47.5%',
                height: FOOD_HEIGHT,
                borderRadius: radius.card,
                backgroundColor: fill(f.tone),
                padding: CARD_PAD,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <T
                  variant="statValue"
                  color={ink(f.tone)}
                  style={{ flex: 1, height: type.statValue.line }}
                >
                  {f.name}
                </T>
                <Glyph name="menu" size={14} tint={ink(f.tone)} />
              </View>

              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Glyph name="flame" size={14} tint={ink(f.tone)} />
                  <View style={{ marginLeft: 7 }}>
                    <T
                      variant="statLabel"
                      color={ink(f.tone)}
                      style={{ height: type.statLabel.line }}
                    >
                      Calories
                    </T>
                    <T
                      variant="statValue"
                      color={ink(f.tone)}
                      style={{ height: type.statValue.line }}
                    >
                      {String(f.calories)}
                    </T>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <Glyph name="scale" size={14} tint={ink(f.tone)} />
                  <View style={{ marginLeft: 7 }}>
                    <T
                      variant="statLabel"
                      color={ink(f.tone)}
                      style={{ height: type.statLabel.line }}
                    >
                      Carbs
                    </T>
                    <T
                      variant="statValue"
                      color={ink(f.tone)}
                      style={{ height: type.statValue.line }}
                    >
                      {f.carbs}
                    </T>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + 6,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            borderRadius: radius.pill,
            backgroundColor: ms.chip,
          }}
        >
          {dock.map((d, i) => (
            <Pressable key={d} accessibilityRole="tab" accessibilityLabel={d}>
              <View
                style={{
                  width: DOCK_HEIGHT - 10,
                  height: DOCK_HEIGHT - 10,
                  marginLeft: i === 0 ? 0 : 6,
                  borderRadius: radius.control,
                  backgroundColor: i === 1 ? ms.dark : ms.canvas,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name={d} size={19} tint={i === 1 ? ms.onDark : ms.ink} />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
