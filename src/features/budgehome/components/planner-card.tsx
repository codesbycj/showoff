import { Image, Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { planner } from '../data/budget';
import { BAR_HEIGHT, BAR_TOP, CARD_PAD, GAUGE_SIZE, GAUGE_THICK, PLANNER_MIN } from '../layout';
import { bg, radius, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What the month has cost so far, as a gauge.
 *
 * The arc is drawn with a dash offset rather than as a hand-plotted path, so
 * the sweep *is* `planner.share` — the fraction of the budget already spent —
 * and the figure in the middle is the same number written out. The
 * reference's gauge and its total describe different months.
 *
 * The arc is built already rotated rather than wrapped in a rotated `<G>`:
 * react-native-svg's `origin` prop emits an invalid DOM attribute on web and
 * red-bars the screen.
 */
export function PlannerCard() {
  const r = (GAUGE_SIZE - GAUGE_THICK) / 2;
  const c = 2 * Math.PI * r;
  /* three quarters of the circle is the track, open at the foot */
  const sweep = c * 0.75;

  return (
    <View
      style={{
        flex: 1,
        minHeight: PLANNER_MIN,
        borderRadius: radius.card,
        backgroundColor: bg.canvas,
        borderWidth: 1,
        borderColor: bg.hair,
        padding: CARD_PAD,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          {planner.crew.map((f, i) => (
            <Image
              key={i}
              source={f}
              style={{
                width: 30,
                height: 30,
                borderRadius: radius.control,
                borderWidth: 2,
                borderColor: bg.canvas,
                marginLeft: i === 0 ? 0 : -9,
              }}
            />
          ))}
        </View>
        <T
          variant="cardTitle"
          color={bg.ink}
          style={{ flex: 1, textAlign: 'center', height: type.cardTitle.line }}
        >
          {planner.title}
        </T>
        <Glyph name="dots" size={18} tint={bg.muted} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={GAUGE_SIZE} height={GAUGE_SIZE}>
          <Circle
            cx={GAUGE_SIZE / 2}
            cy={GAUGE_SIZE / 2}
            r={r}
            stroke={bg.track}
            strokeWidth={GAUGE_THICK}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${sweep} ${c}`}
            transform={`rotate(135 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
          />
          <Circle
            cx={GAUGE_SIZE / 2}
            cy={GAUGE_SIZE / 2}
            r={r}
            stroke={bg.green}
            strokeWidth={GAUGE_THICK}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${sweep * planner.share} ${c}`}
            transform={`rotate(135 ${GAUGE_SIZE / 2} ${GAUGE_SIZE / 2})`}
          />
        </Svg>

        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <T variant="gaugeLabel" color={bg.muted} style={{ height: type.gaugeLabel.line }}>
            {planner.label}
          </T>
          <T variant="gauge" color={bg.ink} style={{ height: type.gauge.line }}>
            {planner.total}
          </T>
        </View>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel={planner.action}>
        <View
          style={{
            height: BAR_HEIGHT,
            marginTop: BAR_TOP,
            borderRadius: radius.pill,
            backgroundColor: bg.dark,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 7,
          }}
        >
          <View
            style={{
              width: BAR_HEIGHT - 14,
              height: BAR_HEIGHT - 14,
              borderRadius: radius.control,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={16} tint={bg.onDark} />
          </View>
          <T
            variant="action"
            color={bg.onDark}
            style={{ flex: 1, textAlign: 'center', height: type.action.line }}
          >
            {planner.action}
          </T>
          <View
            style={{
              width: BAR_HEIGHT - 14,
              height: BAR_HEIGHT - 14,
              borderRadius: radius.control,
              backgroundColor: bg.green,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="next" size={16} tint={bg.onGreen} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
