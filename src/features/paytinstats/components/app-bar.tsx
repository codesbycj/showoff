import { View } from 'react-native';

import { ps } from '../theme';
import { IconButton } from './icon-button';
import { T } from './text';

/**
 * The header: a round button either side of a centred title.
 *
 * The title is absolutely positioned across the whole bar rather than placed
 * between the buttons. Centring it in the space the buttons leave puts it a
 * couple of dp off whenever the two are different widths of ink, and a lone
 * word at the top of a screen is exactly where that shows.
 */
export function AppBar({
  title,
  onBack,
  onMore,
}: {
  title: string;
  onBack?: () => void;
  onMore?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton name="back" onPress={onBack} accessibilityLabel="Go back" />

      {/* STEP 1.03 the title, centred on the screen
      <View
        style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}
        pointerEvents="none"
      >
        <T variant="title" color={ps.text}>
          {title}
        </T>
      </View>
      */}

      {/* STEP 1.04 and everything else
      <IconButton name="more" onPress={onMore} accessibilityLabel="More options" />
      */}
    </View>
  );
}
