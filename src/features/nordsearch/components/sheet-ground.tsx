import { View } from 'react-native';

import { ct } from '../theme';

type Props = { radius: number };

/**
 * The sheet's own ground.
 *
 * **It is an absolutely-filled child, not a `backgroundColor` on the block
 * that holds the sheet's contents** (§5.5, I9). Descending a container to
 * stage its children leaves the container's fill live, so the take would open
 * on an empty white sheet instead of the dark screen the sheet is drawn over.
 * As a child it is a step of its own, and it is the first thing that paints.
 *
 * `@not-a-ground`: It fills the SHEET, not the page: the page behind it is the dark ground
 * the search slides up over, so this surface is a step of the reveal.
 * `stage.js` reads a component's own root to decide whether it is the
 * page's ground, and an absolute fill looks the same either way (SS5.5).
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
        backgroundColor: ct.page,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      }}
    />
  );
}
