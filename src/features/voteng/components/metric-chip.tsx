import { ChevronDown } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, vt } from '../theme';

/**
 * The "% Percentage" selector beside National Results — the switch between
 * showing shares and showing raw counts.
 *
 * It is a chip with a caret rather than the green text-and-chevron link the
 * other section heads carry, because it changes what the list below says rather
 * than navigating away from it.
 */
export function MetricChip({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={6}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          backgroundColor: vt.fillCool,
          borderRadius: R.DEFAULT,
          paddingHorizontal: 10,
          paddingVertical: 4,
        }}
      >
        <Text style={{ fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, color: '#334155' }}>
          {label}
        </Text>
        <ChevronDown size={14} color={vt.muted} strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}
