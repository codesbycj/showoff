import { Pressable, TextInput, View } from 'react-native';

import { FIELD_H, FILTER } from '../layout';
import { ct, radius, type } from '../theme';
import { copy } from '../data/home';
import { Glyph } from './glyph';

/**
 * A real text field and the filter beside it.
 *
 * The reference draws a field; this is one. A search box that cannot be typed
 * into is the detail that gives a mock-up away the moment the recording taps
 * it, and a `TextInput` costs nothing.
 */
export function SearchRow({ onFilter }: { onFilter?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          flex: 1,
          height: FIELD_H,
          borderRadius: radius.field,
          backgroundColor: ct.card,
          borderWidth: 1,
          borderColor: ct.hairline,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 18,
        }}
      >
        <Glyph name="search" size={20} tint={ct.muted} />
        <TextInput
          placeholder={copy.placeholder}
          placeholderTextColor={ct.muted}
          style={{
            flex: 1,
            marginLeft: 10,
            fontFamily: type.field.weight,
            fontSize: type.field.size,
            color: ct.ink,
            // Height rather than padding: a bare TextInput on web renders at
            // the browser's own line box and sits two or three dp high in the
            // pill.
            height: FIELD_H,
          }}
        />
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Filters" onPress={onFilter}>
        <View
          style={{
            width: FILTER,
            height: FILTER,
            borderRadius: FILTER / 2,
            backgroundColor: ct.card,
            borderWidth: 1,
            borderColor: ct.hairline,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 12,
          }}
        >
          <Glyph name="filter" size={21} tint={ct.ink} strokeWidth={1.6} />
        </View>
      </Pressable>
    </View>
  );
}
