import { useId, useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { crosshair, openLevel, series } from '../data/stock';
import { CHART_MIN, ZOOM_SIZE } from '../layout';
import { radius, sk, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The day, drawn from the series.
 *
 * Every mark on it is read from the data: the ridge is the 48 closes, the
 * dashed rule is the level the day opened on, and the crosshair stands where
 * `crosshair.at` says. Nothing here is a hand-placed offset, so the picture
 * cannot disagree with the figures above it.
 *
 * **The gradient id comes from `useId`.** `Defs` ids are document-global on
 * web, so two charts that both call their gradient "fade" would render in
 * whichever one mounted first — a bug that is invisible until a second chart
 * appears on the page and then impossible to see the cause of.
 *
 * It measures itself rather than taking a width: the plot is `flex: 1` inside
 * a fixed stack, so its size is whatever the screen has left.
 */
export function PriceChart() {
  const gradient = useId();
  const [box, setBox] = useState({ w: 0, h: 0 });

  const path = (() => {
    if (!box.w) return '';
    const step = box.w / (series.length - 1);
    const y = (v: number) => box.h - v * box.h;
    let d = `M0 ${y(series[0])}`;
    for (let i = 1; i < series.length; i += 1) {
      const px = (i - 1) * step;
      const cx = px + step / 2;
      d += ` C${cx} ${y(series[i - 1])} ${cx} ${y(series[i])} ${i * step} ${y(series[i])}`;
    }
    return d;
  })();

  const area = path ? `${path} L${box.w} ${box.h} L0 ${box.h} Z` : '';
  const markX = box.w * crosshair.at;
  const markY = box.h - series[Math.round(crosshair.at * (series.length - 1))] * box.h;

  return (
    <View
      style={{ flex: 1, minHeight: CHART_MIN, justifyContent: 'center' }}
      onLayout={(e) => setBox({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
    >
      {box.w > 0 ? (
        <>
          <Svg width={box.w} height={box.h} style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={sk.acid} stopOpacity={0.95} />
                <Stop offset="1" stopColor={sk.acid} stopOpacity={0.04} />
              </LinearGradient>
            </Defs>
            <Path d={area} fill={`url(#${gradient})`} />
            <Path d={path} stroke={sk.acid} strokeWidth={2.4} fill="none" />
            <Path
              d={`M0 ${box.h - openLevel * box.h} L${box.w} ${box.h - openLevel * box.h}`}
              stroke={sk.rule}
              strokeWidth={1.2}
              strokeDasharray="5 5"
            />
            <Path d={`M${markX} ${markY} L${markX} ${box.h}`} stroke={sk.ink} strokeWidth={1.2} />
          </Svg>

          {/* the reading at the crosshair */}
          <View style={{ position: 'absolute', left: markX - 32, top: Math.max(0, markY - 44) }}>
            <View
              style={{
                paddingHorizontal: 9,
                paddingVertical: 4,
                borderRadius: radius.pill,
                backgroundColor: sk.slab,
              }}
            >
              <T variant="chip" color={sk.ink} style={{ height: type.chip.line }}>
                {crosshair.label}
              </T>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              left: markX - 7,
              top: markY - 7,
              width: 14,
              height: 14,
              borderRadius: radius.control,
              backgroundColor: sk.canvas,
              borderWidth: 2,
              borderColor: sk.ink,
            }}
          />

          {/* zoom, down the left edge */}
          <View style={{ position: 'absolute', left: 0, top: box.h / 2 - ZOOM_SIZE - 4 }}>
            {(['plus', 'minus'] as const).map((n) => (
              <Pressable
                key={n}
                accessibilityRole="button"
                accessibilityLabel={n === 'plus' ? 'Zoom in' : 'Zoom out'}
              >
                <View
                  style={{
                    width: ZOOM_SIZE,
                    height: ZOOM_SIZE,
                    borderRadius: radius.control,
                    // Opaque, with an edge: at 72% white these sat on the
                    // gradient and read as two smudges rather than as
                    // controls, which is the whole of what they are.
                    backgroundColor: sk.canvas,
                    borderWidth: 1.2,
                    borderColor: sk.slab,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: n === 'plus' ? 0 : 8,
                  }}
                >
                  <Glyph name={n} size={18} tint={sk.ink} />
                </View>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}
    </View>
  );
}
