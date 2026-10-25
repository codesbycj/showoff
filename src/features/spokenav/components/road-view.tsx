import { Image, Pressable, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ride, views } from '../data/bikes';
import { HEADER_SIZE, MARGIN, ROAD_RATIO, SEG_HEIGHT } from '../layout';
import { radius, sp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The road ahead, with the route drawn down it.
 *
 * **The road is a photograph and the route is drawn**, which is the whole of
 * the rule in one component: a road is a picture of a place and out of
 * drawing range, while a route line is a piece of interface. There is no map
 * on this screen for the same reason — a map has no idea to interpret, so
 * vectoring one is tracing the reference path by path rather than building
 * anything.
 *
 * The line is in viewBox units and scaled by the measured width, so it stays
 * on the road at any screen size instead of being a dp offset taken off one
 * phone.
 */
export function RoadView({ onBack }: { onBack?: () => void }) {
  const { width, height } = useWindowDimensions();
  const h = height * ROAD_RATIO;

  return (
    <View style={{ height: h, overflow: 'hidden' }}>
      <Image source={ride.src} resizeMode="cover" style={{ width, height: h }} />

      {/*
        The route, in real coordinates rather than a 0–100 viewBox.
        A square viewBox stretched to a 393×477 box scales x and y by
        different amounts, which takes the stroke with it — the first pass
        drew a 9-unit line and got a tapering blob 35dp wide. Measuring the
        box and drawing in its own units cannot do that.

        Two strokes, because the route narrows as it goes away from you: a
        constant-width line laid over a road in perspective reads as a stripe
        painted on the screen rather than as a path on the ground.
      */}
      <Svg width={width} height={h} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Path
          d={`M${width * 0.47} ${h} L${width * 0.475} ${h * 0.82}`}
          stroke={sp.lime}
          strokeWidth={16}
          strokeLinecap="round"
          fill="none"
          opacity={0.88}
        />
        <Path
          d={`M${width * 0.475} ${h * 0.83} L${width * 0.48} ${h * 0.63}`}
          stroke={sp.lime}
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
          opacity={0.88}
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          top: 14,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: radius.control,
              backgroundColor: 'rgba(255, 255, 255, 0.86)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={19} tint={sp.ink} />
          </View>
        </Pressable>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              height: SEG_HEIGHT,
              flexDirection: 'row',
              borderRadius: radius.pill,
              backgroundColor: 'rgba(255, 255, 255, 0.86)',
              padding: 4,
            }}
          >
            {views.map((v) => (
              <Pressable
                key={v.id}
                accessibilityRole="button"
                accessibilityState={{ selected: v.on }}
                accessibilityLabel={v.label}
              >
                <View
                  style={{
                    height: SEG_HEIGHT - 8,
                    paddingHorizontal: 18,
                    borderRadius: radius.pill,
                    backgroundColor: v.on ? sp.dark : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T
                    variant="seg"
                    color={v.on ? sp.onDark : sp.ink}
                    style={{ height: type.seg.line }}
                  >
                    {v.label}
                  </T>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ width: HEADER_SIZE }} />
      </View>
    </View>
  );
}
