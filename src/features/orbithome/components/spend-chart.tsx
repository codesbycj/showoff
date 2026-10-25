import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { axisDays, copy, money, selectedDay, spend } from '../data/start';
import { BAR_MIN, BAR_WIDTH, CARD_PAD } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * What the month went on.
 *
 * The plot's height is passed in rather than taken as a percentage: a
 * percentage height needs a definite parent, and a `flex: 1` box is not one
 * on web — the bars come out as hairlines or inflate the row.
 *
 * Each day is a column, not a bar in a `space-between` row. A column is wide
 * enough for its own axis label, so the label never has to overflow an 11dp
 * bar — and Android clips an overflow the web render happily shows.
 *
 * The chip reads the selected day out of the same array the bars are drawn
 * from, so the lit bar and the figure cannot disagree.
 */
export function SpendChart({ h }: { h: number }) {
  const fill = useId();

  const top = CARD_PAD + type.label.line + 12 + 34 + 14;
  const plot = Math.max(90, h - top - type.axis.line - CARD_PAD - 6);

  const max = Math.max(...spend.map((s) => s.amount));
  const selected = spend.find((s) => s.day === selectedDay);

  return (
    <View
      style={{
        height: h,
        borderRadius: radius.card,
        backgroundColor: ob.card,
        borderWidth: 1,
        borderColor: ob.cardEdge,
        padding: CARD_PAD,
      }}
    >
      <T variant="label" color={ob.ink} style={{ height: type.label.line }}>
        {copy.spent}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.period}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 34,
              paddingHorizontal: 12,
              borderRadius: radius.chip,
              backgroundColor: ob.chip,
              borderWidth: 1,
              borderColor: ob.cardEdge,
            }}
          >
            <T variant="chip" color={ob.ink} style={{ height: type.chip.line }}>
              {copy.period}
            </T>
            <Svg width={12} height={12} viewBox="0 0 24 24" style={{ marginLeft: 5 }}>
              <Path
                d="m7 10 5 5 5-5"
                stroke={ob.body}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>

        <View style={{ flex: 1 }} />

        <View
          style={{
            height: 34,
            paddingHorizontal: 14,
            borderRadius: radius.chip,
            backgroundColor: ob.sheet,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="amount" color={ob.onSheet} style={{ height: type.amount.line }}>
            {money(selected ? selected.amount : 0)}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 14 }}>
        {spend.map((s) => {
          const lit = s.day === selectedDay;
          const bar = Math.round(BAR_MIN + (plot - BAR_MIN) * (s.amount / max));
          const labelled = axisDays.includes(s.day);

          return (
            <View key={s.day} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ height: plot, justifyContent: 'flex-end' }}>
                {lit ? (
                  <Svg width={BAR_WIDTH} height={bar}>
                    <Defs>
                      <LinearGradient
                        id={fill + '-bar'}
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2={String(bar)}
                      >
                        <Stop offset="0" stopColor={ob.holo1} />
                        <Stop offset="1" stopColor={ob.holo2} />
                      </LinearGradient>
                    </Defs>
                    <Rect
                      x={0}
                      y={0}
                      width={BAR_WIDTH}
                      height={bar}
                      rx={BAR_WIDTH / 2}
                      fill={`url(#${fill}-bar)`}
                    />
                  </Svg>
                ) : (
                  <View
                    style={{
                      width: BAR_WIDTH,
                      height: bar,
                      borderRadius: BAR_WIDTH / 2,
                      backgroundColor: s.amount > max * 0.55 ? ob.sheet : 'rgba(255,255,255,0.72)',
                    }}
                  />
                )}
              </View>
              <T
                variant="axis"
                color={labelled ? ob.body : 'transparent'}
                style={{ marginTop: 10, height: type.axis.line }}
              >
                {String(s.day)}
              </T>
            </View>
          );
        })}
      </View>
    </View>
  );
}
