import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { banner } from '../data/work';
import { BANNER_HEIGHT } from '../layout';
import { radius, sl } from '../theme';
import { T } from './text';

/**
 * The performance teaser: what it is, the way in, and the shape of the number.
 *
 * The block is a grid of cells rather than a chart library. It is decoration
 * standing in for a sparkline — small flat marks, which is drawing range — and
 * a fixed grid means a reveal cannot reshuffle it between steps.
 */
export function PerformanceBanner({ onCheck }: { onCheck?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <View
      style={{
        height: BANNER_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: sl.surface,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
      }}
    >
      <View style={{ width: 108 }}>
        <T variant="banner" color={sl.ink}>
          {banner.title}
        </T>

        <Pressable
          onPress={onCheck}
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={banner.cta}
          style={{ marginTop: 8, alignSelf: 'flex-start' }}
        >
          <View
            style={{
              height: 28,
              paddingHorizontal: 14,
              borderRadius: radius.pill,
              backgroundColor: sl.action,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="bannerAction" color={sl.onDark}>
              {banner.cta}
            </T>
          </View>
        </Pressable>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ alignSelf: 'flex-end', marginBottom: 5 }}>
          <View
            style={{
              height: 20,
              paddingHorizontal: 8,
              borderRadius: radius.pill,
              backgroundColor: sl.canvas,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Caret />
            <T variant="gain" color={sl.gain}>
              {banner.gain}
            </T>
          </View>
        </View>

        <View style={{ gap: 2 }}>
          {banner.cells.map((row, r) => (
            <View key={r} style={{ flexDirection: 'row', gap: 2 }}>
              {row.map((on, c) => (
                <View
                  key={c}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 1.5,
                    backgroundColor: on ? sl.bar : sl.well,
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

/** The rising mark beside the gain. Drawn: an emoji triangle differs per platform. */
function Caret() {
  return (
    <Svg width={8} height={7} viewBox="0 0 8 7">
      <Path d="M4 0 L8 7 H0 Z" fill={sl.gain} />
    </Svg>
  );
}
