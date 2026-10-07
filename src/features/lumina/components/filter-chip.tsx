import { Pressable, Text, View } from 'react-native';

import { Icon } from './icon';
import type { Filter } from '../data/saved';
import { FONT, LEVEL, ll } from '../theme';

/**
 * One chip on the library's filter rail.
 *
 * Selected is the design system's "high-contrast dark forest green background
 * with white typography"; unselected is white with a hairline and a tinted
 * category glyph. The selected chip drops its icon in the reference, which is
 * why `icon` is optional on the data rather than hidden here.
 */
export function FilterChip({
  filter,
  selected,
  onPress,
}: {
  filter: Filter;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 16,
            paddingVertical: 9,
            borderRadius: 999,
            backgroundColor: selected ? ll.ink : ll.surface,
          },
          !selected && { borderWidth: 1, borderColor: 'rgba(232,239,227,0.8)' },
          selected ? LEVEL.sm : LEVEL.card,
        ]}
      >
        {filter.icon ? <Icon name={filter.icon} size={14} color={ll.muted} /> : null}
        <Text
          style={{
            fontFamily: selected ? FONT.semibold : FONT.medium,
            fontSize: 12.5,
            lineHeight: 16,
            color: selected ? ll.surface : ll.ink,
          }}
        >
          {filter.label}
        </Text>
      </View>
    </Pressable>
  );
}
