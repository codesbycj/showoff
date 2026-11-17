import { View } from 'react-native';

import { ct } from '../theme';

type Props = { radius: number };

/**
 * The sheet's own ground.
 *
 * **It is an absolutely-filled child, not a `backgroundColor` on the block
 * that holds the controls** (§5.5, I9): left on the block, the fill would
 * paint in frame one and the take would open on an empty black sheet over the
 * map instead of the map alone.
 */
export function SheetGround({ radius }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: ct.card,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      }}
    />
  );
}
