import { Text, View } from 'react-native';

import { R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The boot bar: a lime fill inside a grey track, with a spinning sync glyph, a
 * status line and a percentage under it.
 *
 * The track carries 2dp of padding and the fill sits inside it, so at 100% the
 * lime stops short of the track's own ends — the reference's `p-0.5` on the
 * track, and the reason the bar reads as a capsule inside a capsule rather than
 * as one flat rule.
 */
export function BootProgress({ progress, status }: { progress: number; status: string }) {
  return (
    <View style={{ width: '100%', maxWidth: 310, alignItems: 'center' }}>
      <View
        style={{
          width: '100%',
          height: 8,
          borderRadius: R.full,
          backgroundColor: ps.surfaceHighest,
          padding: 2,
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: R.full,
            backgroundColor: ps.lime,
            shadowColor: ps.lime,
            shadowOpacity: 0.9,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 0 },
          }}
        />
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingHorizontal: 4,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Symbol name="sync" size={15} color={ps.olive} />
          <Text style={[TYPE.labelSm, { color: ps.onSurfaceVariant }]} numberOfLines={1}>
            {status}
          </Text>
        </View>
        <Text style={[TYPE.labelSm, { color: ps.secondary }]}>{progress}%</Text>
      </View>
    </View>
  );
}
