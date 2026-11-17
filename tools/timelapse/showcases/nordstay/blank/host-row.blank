import { Image, View } from 'react-native';

import { hostAvatar, stay } from '../data/stay';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who is letting the cabin.
 *
 * **The host is a photograph** (I4). Initials on a coloured disc is a fallback
 * state, not a substitute: a screen built from it is visibly missing something
 * the board had.
 */
export function HostRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: ct.line,
      }}
    >
      {/* STEP 1.15 kind
      <View>
        <T variant="rowTitle">{stay.kind}</T>
        <T variant="meta">{stay.host}</T>
      </View>
      */}

      {/* STEP 1.16 image
      <Image
        source={hostAvatar}
        style={{ width: 46, height: 46, borderRadius: 23 }}
        resizeMode="cover"
        accessibilityLabel={stay.host}
      />
      */}
    </View>
  );
}
