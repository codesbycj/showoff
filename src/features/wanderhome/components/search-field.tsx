import { Pressable, TextInput, View } from 'react-native';

import { FIELD_H, FILTER } from '../layout';
import { ct, radius, type } from '../theme';
import { copy } from '../data/home';
import { Glyph } from './glyph';

/**
 * Where to next — a real field, with the filter button inside it.
 *
 * The button is 42dp inside a 54dp row, which gives it a 54dp-tall target
 * without a 54dp-tall blue square: the Pressable is the row's height and the
 * painted box is the smaller one.
 */
export function SearchField({ onFilter }: { onFilter?: () => void }) {
  return (
    <View
      style={{
        height: FIELD_H,
        borderRadius: radius.field,
        backgroundColor: ct.field,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 6,
      }}
    >
      <Glyph name="search" size={19} tint={ct.dim} />
      <TextInput
        placeholder={copy.placeholder}
        placeholderTextColor={ct.dim}
        style={{
          flex: 1,
          marginLeft: 10,
          height: FIELD_H,
          fontFamily: type.field.weight,
          fontSize: type.field.size,
          color: ct.onPage,
        }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Filters"
        onPress={onFilter}
        // 48 wide so the control clears 44dp in both directions; the painted
        // square stays the reference's 42.
        style={{ height: FIELD_H, width: 48, alignItems: 'center', justifyContent: 'center' }}
      >
        <View
          style={{
            width: FILTER,
            height: FILTER,
            borderRadius: 12,
            backgroundColor: ct.blue,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="sliders" size={20} tint={ct.onBlue} strokeWidth={1.7} />
        </View>
      </Pressable>
    </View>
  );
}
