import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * Discovery's search pill — a denser variant of home's.
 *
 * It is not the same control as `search-row.tsx` and is deliberately not shared
 * with it: this one sits on `surface-container-low`, carries a voice button as
 * well as a filter button, and puts both *inside* the pill, where home's filter
 * is a separate 56dp circle beside it. Sharing them would mean three branches
 * in a component whose whole job is a single row.
 */
export function DiscoverSearch({
  placeholder,
  onPress,
  onVoice,
  onFilter,
}: {
  placeholder: string;
  onPress?: () => void;
  onVoice?: () => void;
  onFilter?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
          borderRadius: R.full,
          backgroundColor: tx.surfaceContainerLow,
          paddingHorizontal: SP.md,
          paddingVertical: 6,
        }}
      >
        <Symbol name="search" size={22} color={tx.outline} />

        <Text
          numberOfLines={1}
          style={{ flex: 1, ...TYPE.bodyMd, paddingVertical: SP.sm, color: tx.outline }}
        >
          {placeholder}
        </Text>

        <Pressable onPress={onVoice} accessibilityRole="button" accessibilityLabel="Voice search">
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="mic" size={20} color={tx.onSurfaceVariant} />
          </View>
        </Pressable>

        <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filters">
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              backgroundColor: tx.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="tune" size={18} color={tx.onPrimary} />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
}
