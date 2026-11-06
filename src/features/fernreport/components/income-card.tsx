import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Line, Path, Rect, Stop } from 'react-native-svg';

import { ct, type } from '../theme';
import { axisTop, copy, money, months, ticks, total } from '../data/report';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The income card: the figure, the change, and the six months behind it.
 *
 * **The hatched bars are a real hatch, drawn as diagonal lines clipped to
 * each bar's rounded box** rather than a flat tint pretending to be one. The
 * reference's texture is what gives the card its depth, and a flat fill
 * reads as a mistake beside it.
 *
 * **The axis brackets the data.** `axisTop` rounds the largest month up, so
 * the marked bar always sits under the top gridline — the reference's does
 * not, which is the chart defect this repo has shipped before.
 */
export function IncomeCard({ height }: { height: number }) {
  const id = useId();
  const bg = `fernCard-${id}`;
  const hatch = `fernHatch-${id}`;

  const padX = 18;
  const axisW = 42;
  // 104 for the figure plus 46 of headroom for the tooltip, which rises
  // above the tallest bar and was landing on the total underneath it.
  const headH = 150;
  const labelH = 22;
  const plotTop = headH;
  const plotH = height - headH - labelH - 14;

  return (
    <View style={{ height, borderRadius: 22, overflow: 'hidden' }}>
      <Svg width="100%" height={height} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={bg} x1="0" y1="0" x2="0.9" y2="1">
            <Stop offset="0" stopColor="#8FDC85" />
            <Stop offset="0.5" stopColor={ct.leaf} />
            <Stop offset="1" stopColor="#53B254" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={height} fill={`url(#${bg})`} />
      </Svg>

      <View style={{ flex: 1, zIndex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: padX }}>
          <T
            variant="cardLabelBig"
            color="rgba(13,34,16,0.82)"
            style={{ flex: 1, height: type.cardLabelBig.line }}
          >
            {copy.totalIncome}
          </T>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 32,
              paddingHorizontal: 12,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(13,34,16,0.28)',
            }}
          >
            <Glyph name="trend" size={14} tint={ct.onLeaf} strokeWidth={2.2} />
            <T variant="delta" color={ct.onLeaf} style={{ height: type.delta.line, marginLeft: 5 }}>
              {copy.delta}
            </T>
          </View>
        </View>

        <T
          variant="cardTotal"
          color={ct.onLeaf}
          style={{ height: type.cardTotal.line, marginTop: -8, marginLeft: padX }}
        >
          {total}
        </T>
      </View>

      <Svg width="100%" height={height} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={hatch} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.18" />
          </LinearGradient>
        </Defs>

        {ticks.map((t) => (
          <Line
            key={t}
            x1={padX + axisW}
            y1={plotTop + plotH - (t / axisTop) * plotH}
            x2="100%"
            y2={plotTop + plotH - (t / axisTop) * plotH}
            stroke="rgba(13,34,16,0.1)"
            strokeWidth={1}
          />
        ))}
      </Svg>

      <View
        style={{
          position: 'absolute',
          left: padX,
          right: padX,
          top: plotTop,
          height: plotH,
          flexDirection: 'row',
          alignItems: 'flex-end',
          zIndex: 1,
        }}
      >
        <View style={{ width: axisW }} />
        {months.map((m) => {
          const on = 'on' in m && m.on;
          const h = Math.max(10, (m.value / axisTop) * plotH);
          return (
            <View key={m.id} style={{ flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  width: on ? 30 : 34,
                  height: h,
                  borderRadius: 17,
                  backgroundColor: on ? '#1B2A1A' : 'rgba(255,255,255,0.34)',
                  borderWidth: on ? 0 : 1,
                  borderColor: 'rgba(255,255,255,0.5)',
                }}
              />
              {on ? (
                // Spilling past the column on both sides: the cell is a
                // sixth of the card and the bubble is wider than that, so
                // constrained to the cell the figure wrapped mid-number.
                <View
                  style={{
                    position: 'absolute',
                    bottom: h + 6,
                    left: -60,
                    right: -60,
                    alignItems: 'center',
                  }}
                >
                  <Tooltip label={money(m.value)} />
                </View>
              ) : null}
            </View>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          left: padX + axisW,
          right: padX,
          top: plotTop + plotH + 4,
          flexDirection: 'row',
          zIndex: 1,
        }}
      >
        {months.map((m) => {
          const on = 'on' in m && m.on;
          return (
            <View key={m.id} style={{ flex: 1, alignItems: 'center' }}>
              <T
                variant={on ? 'axisOn' : 'axis'}
                color={on ? ct.onLeaf : 'rgba(13,34,16,0.6)'}
                style={{ height: type.axis.line }}
              >
                {m.label}
              </T>
            </View>
          );
        })}
      </View>

      {ticks.map((t) => (
        <View
          key={t}
          style={{
            position: 'absolute',
            left: padX,
            width: axisW - 6,
            top: plotTop + plotH - (t / axisTop) * plotH - 8,
            zIndex: 1,
          }}
        >
          <T
            variant="axis"
            color="rgba(13,34,16,0.6)"
            style={{ height: type.axis.line, textAlign: 'right' }}
          >
            {String(t)}
          </T>
        </View>
      ))}
    </View>
  );
}

/** The bubble, with the little tail the reference gives it. */
function Tooltip({ label }: { label: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          height: 36,
          paddingHorizontal: 16,
          borderRadius: 18,
          backgroundColor: '#1B2A1A',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="tip" color="#FFFFFF" numberOfLines={1} style={{ height: type.tip.line }}>
          {label}
        </T>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Svg width={16} height={9} viewBox="0 0 16 9">
          <Path d="M0 0h16L8 9Z" fill="#1B2A1A" />
        </Svg>
      </View>
    </View>
  );
}
