import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { type Holding } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { HoldingRow } from './holding-row';
import { T } from './text';

type Props = { holding: Holding; width: number; height: number; rowH: number; radius: number };

/**
 * The asset the wallet is currently making a case for.
 *
 * The sweep is drawn in `react-native-svg` user space, not with
 * `expo-linear-gradient`, which mirrors a diagonal on web (§7); its id comes
 * from `useId` because SVG ids are document-global there.
 *
 * **The insight panel is guarded**: `holding.insight` is optional, so the
 * block returns the row alone when there is nothing to say — the reveal fills
 * that field in on its own schedule (I7).
 */
export function FeaturedHolding({ holding, width, height, rowH, radius }: Props) {
  const gid = useId();

  return (
    <View style={{ height, borderRadius: radius }}>
      {/* STEP 1.21 linear gradient
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, borderRadius: radius }}
      >
        <Defs>
          <LinearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor={ct.g3} />
            <Stop offset="0.55" stopColor={ct.g2} />
            <Stop offset="1" stopColor={ct.g1} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} rx={radius} fill={`url(#${gid})`} />
      </Svg>
      */}

      {/* STEP 1.22 holding row
      <View style={{ padding: 6 }}>
        <HoldingRow holding={holding} height={rowH} radius={radius - 4} onLight />
      </View>
      */}

      {/* STEP 1.23 "Ask the assistant"
      {holding.insight ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingBottom: 10,
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <T variant="insightStrong">{holding.insight.lead}</T>
            <T variant="insight">{holding.insight.body}</T>
          </View>

          <Pressable accessibilityRole="button" accessibilityLabel="Ask the assistant">
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: ct.page,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="spark" size={21} color={ct.white} strokeWidth={1.6} />
            </View>
          </Pressable>
        </View>
      ) : null}
      */}
    </View>
  );
}
