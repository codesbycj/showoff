import { Image, View } from 'react-native';

import { SEARCH_AVATAR, SEARCH_HEIGHT } from '../layout';
import { dm, radius, shadow } from '../theme';
import { FACES } from './faces';
import { Icon } from './icon';
import { T } from './text';

/**
 * The search bar floating over the map.
 *
 * Not a `TextInput`: nothing on this screen is typed into on camera, and a
 * real input brings a keyboard, a focus ring and a caret the harness would
 * have to be told to leave alone.
 *
 * The pin on the left is drawn here rather than taken from the icon set — the
 * reference's is a two-tone map marker, and every icon library draws that as a
 * single-colour outline.
 */
export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <View
      style={{
        height: SEARCH_HEIGHT,
        borderRadius: radius.field,
        backgroundColor: dm.surface,
        borderWidth: 1,
        // MISTAKE 1.14 the bar came in inset
        marginHorizontal: 40,
        borderColor: dm.edge,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 7,
        gap: 9,
        ...shadow.float,
      }}
    >
      {/* STEP 1.13 a mark for the place
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: radius.full,
          backgroundColor: dm.pinShop,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{ width: 6, height: 6, borderRadius: radius.full, backgroundColor: '#ffffff' }}
        />
      </View>
      */}

      <T variant="search" color={dm.faint} style={{ flex: 1 }}>
        {placeholder}
      </T>

      <Icon name="mic" size={17} color={dm.muted} />

      <Image
        source={FACES[0]}
        style={{ width: SEARCH_AVATAR, height: SEARCH_AVATAR, borderRadius: radius.full }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}
