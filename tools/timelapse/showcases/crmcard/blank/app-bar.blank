import { View } from 'react-native';

import { HEADER_BUTTON } from '../layout';
import { cc } from '../theme';
import { RoundButton } from './round-button';
import { T } from './text';

/**
 * The header: a round button either side of a two-line title.
 *
 * Ranged left between the buttons rather than centred, which is what the
 * reference does — a two-line title centred between two controls reads as a
 * heading that has lost its left edge.
 */
export function AppBar({
  one,
  two,
  onBack,
  onStar,
}: {
  one: string;
  two: string;
  onBack?: () => void;
  onStar?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RoundButton name="back" size={HEADER_BUTTON} label="Go back" onPress={onBack} />

      {/* STEP 1.03 what the screen is
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        <T variant="title" color={cc.text}>
          {one}
        </T>
        <T variant="title" color={cc.text}>
          {two}
        </T>
      </View>
      */}

      {/* STEP 1.04 and a way to keep it
      <RoundButton name="star" size={HEADER_BUTTON} label="Favourite" onPress={onStar} />
      */}
    </View>
  );
}
