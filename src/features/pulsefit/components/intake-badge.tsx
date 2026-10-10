import { Text, View } from 'react-native';

import { DrawnIcon } from './drawn-icon';
import { R, TYPE, pf } from '../theme';

/**
 * The hero's "Daily intake" pill.
 *
 * 23dp tall — which is the bolt's 15dp glyph plus 4dp of padding each side,
 * not the 14dp text line. The fill is white at 70% over the ramp rather than a
 * flat tint, so the pill picks up whatever the card is doing behind it.
 */
export function IntakeBadge({ label }: { label: string }) {
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: R.full,
        backgroundColor: 'rgba(255,255,255,0.7)',
      }}
    >
      <DrawnIcon name="bolt" size={15} color={pf.primary} />
      <Text style={[TYPE.badge, { color: pf.onLime }]}>{label}</Text>
    </View>
  );
}
