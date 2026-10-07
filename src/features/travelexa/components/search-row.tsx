import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * The search pill and its filter button.
 *
 * A pressable row rather than a `TextInput`, on the same reasoning as every
 * search field in these showcases: there is no results screen behind it, and a
 * live input would raise the keyboard mid-take over the half of the screen the
 * recording is about.
 *
 * The filter button is the design system's "trailing circular filter icon
 * button (`#111111`)" — the one piece of pure black on an otherwise bone-white
 * screen, which is what makes it read as the primary control.
 */
export function SearchRow({
  placeholder,
  onPress,
  onFilter,
}: {
  placeholder: string;
  onPress?: () => void;
  onFilter?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: SP.sm,
        paddingHorizontal: SP.margin,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 56,
            borderRadius: R.full,
            backgroundColor: tx.surfaceContainer,
            paddingHorizontal: SP.md,
          }}
        >
          <Symbol name="search" size={22} color={tx.onSurfaceVariant} />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginLeft: SP.sm,
              ...TYPE.bodyMd,
              color: alpha(tx.onSurfaceVariant, 0.7),
            }}
          >
            {placeholder}
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filter search">
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: R.full,
            backgroundColor: tx.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...ELEV.card,
          }}
        >
          <Symbol name="tune" size={22} color={tx.onPrimary} />
        </View>
      </Pressable>
    </View>
  );
}
