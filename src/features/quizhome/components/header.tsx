import { View } from 'react-native';

import { header } from '../data/home';
import { DISPLAY_TOP, GEM_HEIGHT } from '../layout';
import { qz, radius } from '../theme';
import { Gem } from './gem';
import { T } from './text';

/**
 * Who is here, what the screen is for, and what they have to spend.
 *
 * The gem pill is bottom-aligned with the display line rather than centred on
 * the whole block: the greeting above it is a small line, and centring the
 * pill against both would float it half a line clear of the headline it reads
 * with.
 */
export function Header() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <View style={{ flex: 1 }}>
        {/* STEP 1.03 the greeting
        <T variant="greeting" color={qz.muted}>
          {header.greeting}
        </T>
        */}
        {/* STEP 1.04 and the question
        <T variant="display" color={qz.ink} style={{ marginTop: DISPLAY_TOP }}>
          {header.display}
        </T>
        */}
      </View>

      {/* STEP 1.05 what there is to spend
      <View
        style={{
          height: GEM_HEIGHT,
          paddingHorizontal: 13,
          borderRadius: radius.pill,
          backgroundColor: qz.surface,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
          marginBottom: 3,
        }}
      >
        <Gem size={19} />
        <T variant="gem" color={qz.ink}>
          {header.gems}
        </T>
      </View>
      */}
    </View>
  );
}
