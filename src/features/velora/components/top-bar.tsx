import { View } from 'react-native';

import { IconButton } from './icon-button';

/**
 * The header: a menu on the left, the bag on the right, nothing between.
 *
 * The screen owns where this sits and how far from the top; this owns only
 * what is in it. `justify-between` rather than a spacer, so adding a third
 * control later is one child rather than a re-layout.
 */
export function TopBar({ onMenu, onBag }: { onMenu?: () => void; onBag?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* STEP 1.03 a way into the menu
      <IconButton name="menu" label="Open menu" onPress={onMenu} />
      */}
      {/* STEP 1.04 and a way to the bag
      <IconButton name="bag" label="Open bag" dark onPress={onBag} />
      */}
    </View>
  );
}
