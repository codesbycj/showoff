import { View } from 'react-native';

import { screen, track } from '../data/player';
import { T } from './text';

import { BarProps, Round } from './_player-parts-shared';

/** Collapse, what is playing, and the overflow. */
export function PlayerBar({ margin, height, control, onBack }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {/* STEP 1.02 round
      <Round glyph="chevronDown" label="Collapse" size={control} onPress={onBack} />
      */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* STEP 1.03 from
        <T variant="fromLabel">{screen.from}</T>
        */}
        {/* STEP 1.04 album
        <T variant="fromAlbum" numberOfLines={1}>
          {track.album}
        </T>
        */}
      </View>
      {/* STEP 1.05 round
      <Round glyph="more" label="More" size={control} />
      */}
    </View>
  );
}
