import { View } from 'react-native';

import { vs } from '../theme';
import { IconButton } from './icon-button';
import { T } from './text';

/**
 * The header: a round button either side of a centred title.
 *
 * The title is absolutely positioned across the whole bar rather than placed
 * between the buttons. Centring it in the space the buttons leave puts it a
 * couple of dp off whenever the two buttons are different widths of ink, and
 * a lone word at the top of a screen is exactly where that shows.
 *
 * `pointerEvents="none"` on the title so it cannot eat a tap meant for the
 * button underneath it — it spans the full bar, including both of them.
 */
export function AppBar({
  title,
  onBack,
  onCalendar,
}: {
  title: string;
  onBack?: () => void;
  onCalendar?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton name="back" onPress={onBack} accessibilityLabel="Go back" />

      {/* STEP 1.03 the title, centred on the screen
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
        pointerEvents="none"
      >
        <T variant="title" color={vs.ink}>
          {title}
        </T>
      </View>
      */}

      {/* STEP 1.04 a second opinion | FIX 1.05 one title is enough
      <T variant="title" color={vs.muted} style={{ opacity: 0.6 }}>
        Analytics
      </T>
      */}

      {/* STEP 1.06 and a way to change the month
      <IconButton name="calendar" onPress={onCalendar} accessibilityLabel="Pick a month" />
      */}
    </View>
  );
}
