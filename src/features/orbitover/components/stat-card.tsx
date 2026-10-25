import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { copy, money, monthSpend, months, selectedMonth } from '../data/start';
import { BAR_MIN, BAR_WIDTH, CARD_PAD, STAT_HEIGHT } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * The seven months behind the total, on the one white card.
 *
 * Each bar is its own `Svg` at a numeric width and height with its own
 * gradient id from `useId`. A single shared id would paint every bar in
 * whichever gradient mounted first: react-native-svg's `Defs` ids are
 * document-global on web.
 *
 * The bars fade to near-white at the foot rather than sitting on a baseline
 * rule, which is the reference's own idea and a good one — the card has no
 * axis line to draw.
 *
 * The tooltip reads `monthSpend`, the same figure as the delta under the
 * total, so the two cannot drift apart.
 */
export function StatCard() {
  const base = useId();

  const tones = [ob.holo3, ob.holo2, ob.holo1, ob.holo2, ob.holo3, ob.holo1, ob.holo2];
  const max = Math.max(...months.map((m) => m.amount));
  const plot = STAT_HEIGHT - CARD_PAD * 2 - type.sectionTitle.line - 14 - type.axis.line - 8;

  return (
    <View
      style={{
        height: STAT_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: ob.panel,
        padding: CARD_PAD,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T
          variant="sectionTitle"
          color={ob.onPanel}
          style={{ marginRight: 12, height: type.sectionTitle.line }}
        >
          {copy.statistic}
        </T>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: radius.pill,
            backgroundColor: ob.canvas,
          }}
        >
          <T variant="tip" color={ob.ink} style={{ height: type.tip.line }}>
            {money(-monthSpend)}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 14 }}>
        {months.map((m, i) => {
          const lit = m.key === selectedMonth;
          const bar = Math.round(BAR_MIN + (plot - BAR_MIN) * (m.amount / max));
          const id = `${base}-${i}`;

          return (
            <View key={m.key} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ height: plot, justifyContent: 'flex-end' }}>
                <Svg width={BAR_WIDTH} height={bar}>
                  <Defs>
                    <LinearGradient
                      id={id}
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2={String(bar)}
                    >
                      <Stop offset="0" stopColor={tones[i % tones.length]} />
                      <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.15" />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    x={0}
                    y={0}
                    width={BAR_WIDTH}
                    height={bar}
                    rx={BAR_WIDTH / 2}
                    fill={`url(#${id})`}
                  />
                </Svg>
              </View>
              <T
                variant={lit ? 'axisOn' : 'axis'}
                color={lit ? ob.onPanel : ob.panelMuted}
                style={{ marginTop: 8, height: type.axis.line }}
              >
                {m.key}
              </T>
            </View>
          );
        })}
      </View>
    </View>
  );
}
