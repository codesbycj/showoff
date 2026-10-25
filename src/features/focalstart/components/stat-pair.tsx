import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { copy, note, points, share, trend, uplift } from '../data/start';
import {
  CARD_GAP,
  CARD_PAD,
  CARDS_MIN,
  CARDS_TOP,
  GAUGE,
  GAUGE_THICK,
  TREND_HEIGHT,
} from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

/**
 * The two proof cards: how many points, and what that is worth.
 *
 * The gauge is a dashed circle rotated with a `transform` string on the
 * `Circle` itself. A `<G origin>` emits an invalid DOM prop on web and
 * red-bars the screen (AGENTS.md), so the arc is built rotated instead of
 * being wrapped in a rotated group.
 *
 * Its sweep is `share` — the points read against the target — so the arc and
 * the figure in the middle of it are the same fact. The reference's arc is
 * of nothing in particular.
 *
 * Every gradient id comes from `useId`: react-native-svg's `Defs` ids are
 * document-global on web.
 */
export function StatPair() {
  const bar = useId();

  const r = (GAUGE - GAUGE_THICK) / 2;
  const mid = GAUGE / 2;
  // Three quarters of the circle is the track; the rest is the gap at the
  // foot, which is what makes it read as a gauge rather than a donut.
  const c = 2 * Math.PI * r;
  const track = c * 0.75;

  return (
    <View style={{ flex: 1, minHeight: CARDS_MIN, flexDirection: 'row', marginTop: CARDS_TOP }}>
      <View
        style={{
          flex: 1.25,
          borderRadius: radius.card,
          backgroundColor: fc.surface,
          borderWidth: 1,
          borderColor: fc.hairline,
          padding: CARD_PAD,
        }}
      >
        <T variant="note" color={fc.muted} style={{ height: type.note.line }}>
          {copy.gaugeTitle}
        </T>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={GAUGE} height={GAUGE}>
            <Circle
              cx={mid}
              cy={mid}
              r={r}
              stroke={fc.violetSoft}
              strokeWidth={GAUGE_THICK}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${track} ${c}`}
              transform={`rotate(135 ${mid} ${mid})`}
            />
            <Circle
              cx={mid}
              cy={mid}
              r={r}
              stroke={fc.violet}
              strokeWidth={GAUGE_THICK}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${track * share} ${c}`}
              transform={`rotate(135 ${mid} ${mid})`}
            />
          </Svg>

          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <T variant="gaugeBig" color={fc.ink} style={{ height: type.gaugeBig.line }}>
              {String(points)}
            </T>
            <T variant="gaugeUnit" color={fc.muted} style={{ height: type.gaugeUnit.line }}>
              {copy.gaugeUnit}
            </T>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 7,
            paddingHorizontal: 9,
            borderRadius: radius.control,
            backgroundColor: fc.limeSoft,
          }}
        >
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: radius.pill,
              backgroundColor: fc.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={9} height={9} viewBox="0 0 24 24">
              <Path d="M13.4 2.6 5.6 13.4h5l-.8 8 8-10.8h-5Z" fill={fc.onLime} />
            </Svg>
          </View>
          <T variant="note" color={fc.ink} style={{ flex: 1, marginLeft: 6 }}>
            {note}
          </T>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: CARD_GAP,
          borderRadius: radius.card,
          backgroundColor: fc.surface,
          borderWidth: 1,
          borderColor: fc.hairline,
          padding: CARD_PAD,
        }}
      >
        <T variant="gaugeBig" color={fc.ink} style={{ height: type.gaugeBig.line }}>
          {uplift + '%'}
        </T>
        <T variant="note" color={fc.muted} style={{ marginTop: 2 }}>
          {'Increases user productivity'}
        </T>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 10 }}>
          <Svg width="100%" height={TREND_HEIGHT}>
            <Defs>
              <LinearGradient
                id={bar}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={String(TREND_HEIGHT)}
              >
                <Stop offset="0" stopColor={fc.violet} />
                <Stop offset="1" stopColor={fc.violetSoft} />
              </LinearGradient>
            </Defs>
            {trend.map((t, i) => {
              const h = Math.max(10, Math.round(TREND_HEIGHT * t));
              return (
                <Rect
                  key={i}
                  x={`${i * 20 + 2}%`}
                  y={TREND_HEIGHT - h}
                  width="14%"
                  height={h}
                  rx={6}
                  fill={`url(#${bar})`}
                />
              );
            })}
          </Svg>
        </View>
      </View>
    </View>
  );
}
