import { Pressable, Text, View } from 'react-native';

import { type SymbolName } from '../symbols';
import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * One of the three card actions — Freeze card, Set PIN, Security.
 *
 * Flexed to an equal third by its row rather than sized here, so "Freeze card"
 * and "Security" get the same tile despite the difference in label width.
 */
export function QuickAction({
  icon,
  label,
  onPress,
}: {
  icon: SymbolName;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            alignItems: 'center',
            gap: 8,
            paddingVertical: 16,
            borderRadius: R.lg,
            backgroundColor: ps.surfaceLowest,
          },
          LEVEL.container,
        ]}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: ps.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={icon} size={20} color={ps.onSurface} />
        </View>
        <Text style={[TYPE.labelSm, { color: ps.onSurface }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
