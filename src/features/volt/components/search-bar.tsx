import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, alpha, vt } from '../theme';

import { Symbol } from './symbol';

/**
 * The search cavity and its filter button.
 *
 * A pressable row rather than a `TextInput`, on the same reasoning as every
 * search field in these showcases: there is no results screen behind it, and a
 * live input would raise the keyboard mid-take over the half of the screen the
 * recording is about.
 *
 * The export gives it `shadow-inner`, which React Native has no equivalent for.
 * The design system describes the intent — "pill-shaped dark input cavities with
 * subtle internal inset border" — so it is drawn as a hairline border a shade
 * lighter than the fill, which reads as recessed on this canvas.
 */
export function SearchBar({
  placeholder,
  onPress,
  onFilter,
}: {
  placeholder: string;
  onPress?: () => void;
  onFilter?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 48,
            paddingHorizontal: SP.md,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainerLow,
            borderWidth: 1,
            borderColor: alpha(vt.white, 0.04),
          }}
        >
          <Symbol name="search" size={20} color={vt.secondary} />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              marginLeft: SP.xs,
              ...TYPE.bodyMd,
              color: alpha(vt.secondary, 0.6),
            }}
          >
            {placeholder}
          </Text>
          <Symbol name="mic" size={18} color={vt.secondary} />
        </View>
      </Pressable>

      <Pressable onPress={onFilter} accessibilityRole="button" accessibilityLabel="Filter settings">
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainerHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="tune" size={20} color={vt.onSurface} />
        </View>
      </Pressable>
    </View>
  );
}
