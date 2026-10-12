import { Text, View } from 'react-native';

import { SPENDING } from '../data/home';
import { ax, radius, type as t } from '../theme';
import { Symbol } from './symbol';

/**
 * The spending limit row: an icon tile, two lines of copy, and a short bar.
 *
 * The tile is `rounded-xl`, which in this design's renamed radius scale lands
 * at 48 — far more than its own 40dp box, so it clamps to a circle. It is
 * written as 20 here rather than 48 because a radius larger than half the box
 * is a thing React Native and the web round differently, and the resolved
 * shape is what matters.
 */
export function SpendingLimit() {
  return (
    <View
      style={{
        height: 72,
        borderRadius: radius.panel,
        backgroundColor: ax.surfaceLow,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: ax.surfaceHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="trendingUp" size={22} color={ax.signal} />
        </View>
        <View>
          <Text style={[t.labelLg, { color: ax.ink }]}>{SPENDING.label}</Text>
          <Text style={[t.bodySm, { color: ax.inkMuted }]}>{SPENDING.note}</Text>
        </View>
      </View>

      <View
        style={{
          width: 64,
          height: 8,
          borderRadius: radius.full,
          backgroundColor: ax.surfaceHighest,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${SPENDING.fraction * 100}%`,
            height: '100%',
            borderRadius: radius.full,
            backgroundColor: ax.signal,
          }}
        />
      </View>
    </View>
  );
}
