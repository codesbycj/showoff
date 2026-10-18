import { View } from 'react-native';

import { SEARCH_BUTTON, SEARCH_HEIGHT } from '../layout';
import { dd, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * The search field, with the filter control built into it.
 *
 * Not a `TextInput`: nothing on this screen is typed into on camera, and a
 * real input brings a keyboard, a focus ring and a caret the harness would
 * have to be told to leave alone. It is the field as the design shows it, and
 * swapping it for an input later is one line.
 */
export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <View
      style={{
        height: SEARCH_HEIGHT,
        borderRadius: radius.field,
        backgroundColor: dd.surface,
        borderWidth: 1,
        // MISTAKE 1.08 the field came in inset
        marginHorizontal: 30,
        borderColor: dd.edge,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 8,
        gap: 10,
      }}
    >
      <Icon name="search" size={17} color={dd.muted} />
      <T variant="search" color={dd.faint} style={{ flex: 1 }}>
        {placeholder}
      </T>
      <View
        style={{
          width: SEARCH_BUTTON,
          height: SEARCH_BUTTON,
          borderRadius: radius.full,
          backgroundColor: dd.canvas,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="filter" size={15} color={dd.ink} />
      </View>
    </View>
  );
}
