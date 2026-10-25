import { View } from 'react-native';

import { header } from '../data/board';
import { GEM_HEIGHT } from '../layout';
import { qz, radius } from '../theme';
import { Gem } from './gem';
import { T } from './text';

/** What the screen is, and what the player has to spend. */
export function Header() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <T variant="title" color={qz.ink} style={{ flex: 1 }}>
        {header.title}
      </T>

      <View
        style={{
          height: GEM_HEIGHT,
          paddingHorizontal: 13,
          borderRadius: radius.pill,
          backgroundColor: qz.surface,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <Gem size={19} />
        <T variant="gem" color={qz.onGem}>
          {header.gems}
        </T>
      </View>
    </View>
  );
}
