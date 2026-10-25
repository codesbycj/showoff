import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Line, Mask, Rect } from 'react-native-svg';

import { memory } from '../data/start';
import { CARD_PAD, DONUT_SIZE, DONUT_THICK, PANEL_MIN } from '../layout';
import { radius, st, type } from '../theme';
import { T } from './text';

/**
 * How full the disk is, as a ring.
 *
 * The ring's unused run is **hatched**, which is the reference's own idea and
 * the right one: it reads as "space you have not taken" rather than as a
 * second category. The hatching is drawn as explicit lines inside a mask
 * rather than as an SVG `<Pattern>` — pattern ids are document-global on web,
 * so a second chart on the page would render the first one's.
 *
 * The id comes from `useId` for the same reason.
 */
export function MemoryCard() {
  const maskId = useId();
  const r = (DONUT_SIZE - DONUT_THICK) / 2;
  const c = 2 * Math.PI * r;
  const mid = DONUT_SIZE / 2;

  const lines = [];
  for (let x = -DONUT_SIZE; x < DONUT_SIZE * 2; x += 7) {
    lines.push(
      <Line
        key={x}
        x1={x}
        y1={DONUT_SIZE}
        x2={x + DONUT_SIZE}
        y2={0}
        stroke="#FFFFFF"
        strokeWidth={3}
      />,
    );
  }

  return (
    <View
      style={{
        flex: 1,
        minHeight: PANEL_MIN,
        borderRadius: radius.card,
        backgroundColor: st.panel,
        padding: CARD_PAD,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        />
        <T
          variant="cardTitle"
          color={st.onDark}
          style={{ flex: 1, marginLeft: 10, height: type.cardTitle.line }}
        >
          {copyMemory}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel="Open storage detail">
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: radius.control,
              backgroundColor: 'rgba(255,255,255,0.1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24">
              <Line
                x1={7}
                y1={17}
                x2={17}
                y2={7}
                stroke={st.onDark}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <Line
                x1={9.4}
                y1={7}
                x2={17}
                y2={7}
                stroke={st.onDark}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <Line
                x1={17}
                y1={7}
                x2={17}
                y2={14.6}
                stroke={st.onDark}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={DONUT_SIZE} height={DONUT_SIZE}>
          <Defs>
            <Mask id={maskId}>
              <Rect x={0} y={0} width={DONUT_SIZE} height={DONUT_SIZE} fill="#000000" />
              {lines}
            </Mask>
          </Defs>

          {/* the space you have not taken, hatched */}
          <Circle
            cx={mid}
            cy={mid}
            r={r}
            stroke="#FFFFFF"
            strokeWidth={DONUT_THICK}
            fill="none"
            mask={`url(#${maskId})`}
          />
          {/* the space you have */}
          <Circle
            cx={mid}
            cy={mid}
            r={r}
            stroke={st.canvas}
            strokeWidth={DONUT_THICK}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${c * memory.share} ${c}`}
            transform={`rotate(-90 ${mid} ${mid})`}
          />
        </Svg>

        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <T variant="donut" color={st.onDark} style={{ height: type.donut.line }}>
              {String(memory.pct)}
            </T>
            <T variant="statUnit" color={st.onDark} style={{ height: type.statUnit.line }}>
              %
            </T>
          </View>
          <T
            variant="donutSub"
            color="rgba(255,255,255,0.6)"
            style={{ height: type.donutSub.line }}
          >
            {memory.sub}
          </T>
        </View>
      </View>
    </View>
  );
}

const copyMemory = 'Memory status';
