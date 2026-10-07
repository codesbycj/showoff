import { Pressable, Text, View } from 'react-native';

import { BARS, ANALYTICS } from '../data/analytics';
import { LEVEL, R, TYPE, ps } from '../theme';
import { Glow } from './glow';
import { Symbol } from './symbol';

const BAND = 112;

/**
 * The obsidian analytics hero: total outflow, a trend pill, and a seven-bar
 * daily chart with one bar selected.
 *
 * The bars are capsules, not rectangles — `borderRadius: full` on a 20%-tall
 * bar gives a pill, and on the 92% one it gives a rounded column. That is one
 * radius doing both jobs, which is why the shortest bar does not need a special
 * case.
 *
 * The selected bar carries a lime glow. On Android that is `elevation`, which
 * cannot be coloured, so the glow is drawn as a second, larger translucent
 * capsule behind the bar rather than as a shadow. It renders the same on both
 * platforms, which a coloured shadow would not.
 */
export function OutflowChart({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect?: (key: string) => void;
}) {
  const active = BARS.find((b) => b.key === selected) ?? BARS[0];

  return (
    <View style={[{ borderRadius: R.lg }, LEVEL.card]}>
      <View
        style={{
          borderRadius: R.lg,
          backgroundColor: ps.inverse,
          padding: 24,
          gap: 24,
          overflow: 'hidden',
        }}
      >
        <Glow color="196,240,0" opacity={0.28} corner="top-right" reach={0.7} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={[TYPE.labelMd, { color: ps.tertiaryFixed, letterSpacing: 0.6 }]}>
                {ANALYTICS.outflowLabel.toUpperCase()}
              </Text>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ps.lime }} />
            </View>
            <Text style={[TYPE.headlineLgMobile, { color: ps.onInverse, marginTop: 4 }]}>
              {ANALYTICS.outflow}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: R.full,
              backgroundColor: ps.lime,
            }}
          >
            <Symbol name="trendingUp" size={14} color={ps.onLime} />
            <Text style={[TYPE.labelSm, { color: ps.onLime }]}>{ANALYTICS.trend}</Text>
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: BAND,
              gap: 8,
              paddingHorizontal: 4,
            }}
          >
            {BARS.map((bar) => {
              const on = bar.key === selected;
              const h = (BAND - 22) * (bar.height / 100);
              return (
                <Pressable
                  key={bar.key}
                  style={{ flex: 1, height: '100%', justifyContent: 'flex-end' }}
                  onPress={() => onSelect?.(bar.key)}
                  accessibilityRole="button"
                  accessibilityLabel={bar.label}
                >
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <View style={{ width: '100%', height: h, justifyContent: 'flex-end' }}>
                      {on ? (
                        <View
                          style={{
                            position: 'absolute',
                            left: -4,
                            right: -4,
                            top: -6,
                            bottom: -6,
                            borderRadius: R.full,
                            backgroundColor: 'rgba(196,240,0,0.22)',
                          }}
                        />
                      ) : null}
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: R.full,
                          backgroundColor: on ? ps.lime : 'rgba(240,240,242,0.2)',
                        }}
                      />
                    </View>
                    <Text style={[TYPE.labelSm, { color: on ? ps.lime : ps.tertiaryFixedDim }]}>
                      {bar.day}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={[TYPE.labelSm, { color: ps.tertiaryFixed }]}>
              {ANALYTICS.selectedLabel} <Text style={{ color: ps.lime }}>{active.label}</Text>
            </Text>
            <Text style={[TYPE.labelMd, { color: ps.onInverse }]}>{active.amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
