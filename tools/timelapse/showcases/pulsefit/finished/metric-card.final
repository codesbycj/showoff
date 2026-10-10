import { Pressable, Text, View } from 'react-native';

import { DrawnIcon } from './drawn-icon';
import type { Metric } from '../data/home';
import { LEVEL, R, TYPE, pf } from '../theme';

/**
 * Each tone is a tint, an ink and a glyph. The tints are the only two alpha
 * fills on the page that had to be resolved rather than read: `tertiary-fixed`
 * at 60% and `secondary-container` at 70%, both over white.
 */
const TONES = {
  orange: { tint: pf.orangeTintStrong, ink: pf.orange, icon: 'footprint' },
  blue: { tint: pf.blueTint, ink: pf.blue, icon: 'waterDrop' },
} as const;

/**
 * One telemetry tile — "Step to walk", "Drink Water".
 *
 * 112dp tall: 16dp of padding, a 32dp head row whose height comes from the
 * icon disc rather than the two 15dp label lines beside it, 16dp of air, and a
 * 32dp figure row.
 *
 * The figure and its unit are baseline-aligned, not bottom-aligned. At 24dp
 * against 13dp that is a 2dp difference in where "steps" sits, and bottom
 * alignment reads as a typo once the two are side by side.
 */
export function MetricCard({ metric, onPress }: { metric: Metric; onPress?: () => void }) {
  const tone = TONES[metric.tone];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${metric.label.join(' ')}: ${metric.value} ${metric.unit}`}
      style={{ flex: 1 }}
    >
      <View
        style={[
          {
            height: 112,
            borderRadius: R.card,
            backgroundColor: pf.surface,
            padding: 16,
          },
          LEVEL.card,
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={[TYPE.tileLabel, { color: pf.muted }]}>{metric.label[0]}</Text>
            <Text style={[TYPE.tileLabel, { color: pf.muted }]}>{metric.label[1]}</Text>
          </View>

          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: tone.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DrawnIcon name={tone.icon} size={18} color={tone.ink} />
          </View>
        </View>

        <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text style={[TYPE.metric, { color: pf.ink }]}>{metric.value}</Text>
          <Text style={[TYPE.body, { color: pf.muted }]}>{metric.unit}</Text>
        </View>
      </View>
    </Pressable>
  );
}
