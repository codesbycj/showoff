import { View } from 'react-native';

import { SEARCH_HEIGHT } from '../layout';
import { fn, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * The search field.
 *
 * Not a `TextInput`: nothing on this screen is typed into on camera, and a
 * real input brings a keyboard, a focus ring and a caret that the harness
 * would have to be told to leave alone. It is the field as the design shows
 * it — a label and a magnifier — and swapping it for an input later is one
 * line.
 */
export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <View
      style={{
        height: SEARCH_HEIGHT,
        borderRadius: radius.field,
        backgroundColor: fn.sunken,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
      }}
    >
      <T variant="search" color={fn.faint} style={{ flex: 1 }}>
        {placeholder}
      </T>
      <Icon name="search" size={17} color={fn.muted} />
    </View>
  );
}
