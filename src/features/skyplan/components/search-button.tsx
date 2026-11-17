import { Pressable, View } from 'react-native';

import { trip } from '../data/plan';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; onPress?: () => void };

/**
 * The card's primary action.
 *
 * The visual box is an inner `View`: a `Pressable` whose style is a function
 * of `pressed` is dropped in a static render and loses its height and fill
 * (§7).
 */
export function SearchButton({ height, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={trip.cta} onPress={onPress}>
      <View
        style={{
          height,
          borderRadius: height / 2,
          backgroundColor: ct.dark,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* STEP 1.17 cta
        <T variant="cta">{trip.cta}</T>
        */}
      </View>
    </Pressable>
  );
}
