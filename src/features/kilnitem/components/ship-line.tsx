import { View } from 'react-native';

import { piece } from '../data/item';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * When it arrives.
 *
 * A state, not a sentence (R5). The board ends on its Buy bar and says nothing
 * about delivery; inventing the row a board cuts is the sanctioned fix for a
 * short screen (I3).
 */
export function ShipLine({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="ship">{piece.ship}</T>
    </View>
  );
}
