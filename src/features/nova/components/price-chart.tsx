import { Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { TRADE } from '../data/trade';
import { FONT, R, nv } from '../theme';

/**
 * The trade screen's lime chart panel.
 *
 * The plot is the export's own path, carried across unchanged — it is already
 * drawn on a 320×190 box, which is exactly the panel's inner size, so there is
 * nothing to re-fit. `preserveAspectRatio="none"` in the original stretches it
 * to whatever width the panel lands at; here the SVG takes the measured width
 * and the viewBox does the same job.
 *
 * The two callouts are inside the SVG rather than absolutely positioned Views
 * over it, because they are anchored to points on the path — a View would have
 * to recompute its offset every time the panel resized, and would not clip with
 * the plot.
 */
export function PriceChart() {
  const H = 190;

  return (
    <View
      style={{
        borderRadius: 26,
        backgroundColor: nv.limeChart,
        padding: 16,
        paddingBottom: 12,
        overflow: 'hidden',
      }}
    >
      <View style={{ height: H }}>
        <Svg width="100%" height={H} viewBox="0 0 320 190">
          {/* Gridlines — six evenly spaced rules across the panel. */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Line
              key={i}
              x1={0}
              x2={320}
              y1={(i * H) / 5}
              y2={(i * H) / 5}
              stroke="#77a11f"
              strokeWidth={1}
              opacity={0.3}
            />
          ))}

          {/* The price axis, sitting over the gridlines on the left. */}
          {TRADE.yAxis.map((label, i) => (
            <SvgText
              key={label}
              x={0}
              y={(i * H) / 5 + (i === 0 ? 9 : i === 5 ? 0 : 4)}
              fill="#385808"
              fontSize={10}
              fontFamily={FONT.medium}
            >
              {label}
            </SvgText>
          ))}

          <Path
            d={TRADE.path}
            fill="none"
            stroke="#131416"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Low marker — a white pill hanging below its point. */}
          <G transform="translate(142, 135)">
            <Circle cx={0} cy={0} r={3} fill="#131416" />
            <Line
              x1={0}
              x2={0}
              y1={0}
              y2={12}
              stroke="#131416"
              strokeWidth={1.2}
              strokeDasharray="2 2"
            />
            <Rect x={-35} y={12} width={70} height={20} rx={10} fill="#ffffff" />
            <SvgText
              x={0}
              y={26}
              fill="#131416"
              fontSize={11}
              fontFamily={FONT.bold}
              textAnchor="middle"
            >
              {TRADE.lowLabel}
            </SvgText>
          </G>

          {/* Current marker — a dark pill above its point. */}
          <G transform="translate(245, 82)">
            <Circle cx={0} cy={0} r={3.5} fill="#131416" />
            <Rect x={-44} y={-32} width={74} height={22} rx={11} fill="#131416" />
            <SvgText
              x={-7}
              y={-17}
              fill="#ffffff"
              fontSize={11}
              fontFamily={FONT.bold}
              textAnchor="middle"
            >
              {TRADE.highLabel}
            </SvgText>
          </G>
        </Svg>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingHorizontal: 24,
        }}
      >
        {TRADE.xAxis.map((t) => (
          <Text key={t} style={{ fontFamily: FONT.medium, fontSize: 10, color: '#385808' }}>
            {t}
          </Text>
        ))}
      </View>
    </View>
  );
}

/** One of the four stat tiles below the chart. */
export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: nv.surfaceSunken,
        borderRadius: R.lg,
        paddingVertical: 18,
        paddingHorizontal: 12,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: -0.32,
          color: nv.ink,
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: FONT.medium,
          fontSize: 12,
          lineHeight: 16,
          color: nv.muted,
          marginTop: 4,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
}
