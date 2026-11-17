import { View } from 'react-native';

import { header } from '../data/find';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The headline - the dominant element on the screen (R8).
 *
 * Its two lines are two elements rather than one string with a newline in it:
 * the reveal paints one element per step, and a two-line display that lands
 * whole is the biggest thing on the screen arriving in one beat (I9).
 */
export function DiscoverTitle({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="display">{header.displayTop}</T>
      {/* STEP 1.05 display bottom
      <T variant="displayMuted">{header.displayBottom}</T>
      */}
    </View>
  );
}
