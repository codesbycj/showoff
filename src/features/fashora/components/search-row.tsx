import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The search field and its filter button.
 *
 * The field is a `Text` placeholder inside a pressable pill rather than a live
 * `TextInput`. Nothing in the recording types into it, and a focused input
 * raises the keyboard and a caret that the reference frame does not have.
 */
export function SearchRow({
  placeholder,
  onSearch,
  onFilter,
}: {
  placeholder: string;
  onSearch?: () => void;
  onFilter?: () => void;
}) {
  return (
    <View
      style={{
        paddingHorizontal: SP.marginMobile,
        paddingVertical: SP.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onSearch} accessibilityRole="search">
        <View
          style={{
            height: 48,
            paddingHorizontal: SP.md,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerLow,
            flexDirection: 'row',
            alignItems: 'center',
            ...ELEV.card,
          }}
        >
          <Symbol name="search" size={20} color={fa.secondary} style={{ marginRight: 10 }} />
          <Text numberOfLines={1} style={{ ...TYPE.bodyMd, color: fa.secondary, flex: 1 }}>
            {placeholder}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filter products">
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerLow,
            alignItems: 'center',
            justifyContent: 'center',
            ...ELEV.card,
          }}
        >
          <Symbol name="tune" size={22} />
        </View>
      </Pressable>
    </View>
  );
}
