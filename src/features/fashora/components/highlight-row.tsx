import { Pressable, Text, View } from 'react-native';

import type { Highlight } from '../data/detail';
import { FONT, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * One of the two delivery / returns rows under the pickers.
 *
 * The pair differ only in their trailing element — a bold "Details" link on the
 * first, a chevron on the second — so that is a prop rather than two
 * components: an `action` string gets the link, its absence gets the chevron.
 */
export function HighlightRow({ item, onPress }: { item: Highlight; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={item.label}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: SP.sm,
          paddingHorizontal: SP.md,
          borderRadius: R.xl2,
          backgroundColor: fa.surfaceContainerLow,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flexShrink: 1 }}>
          <Symbol name={item.icon} size={18} color={fa.tertiary} />
          <Text numberOfLines={1} style={{ ...TYPE.labelMd, color: fa.onSurface }}>
            {item.label}
          </Text>
        </View>

        {item.action ? (
          <Text style={{ ...TYPE.labelSm, fontFamily: FONT.bold, color: fa.tertiary }}>
            {item.action}
          </Text>
        ) : (
          <Symbol name="chevronRight" size={16} color={fa.secondary} />
        )}
      </View>
    </Pressable>
  );
}
