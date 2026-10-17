import { View } from 'react-native';

import { PILL_HEIGHT, PILL_PAD } from '../layout';
import { radius } from '../theme';
import { T } from './text';

/**
 * One macro's grams, on a filled pill, in the macro's own colour.
 *
 * The pill sizes to its text rather than to a fixed width: "3g" and "54g" both
 * appear in the reference's two rows and a fixed width would leave the short
 * one swimming. Only the height is pinned, so a row of them stays level.
 */
export function MacroPill({ grams, color }: { grams: number; color: string }) {
  return (
    <View
      style={{
        height: PILL_HEIGHT,
        paddingHorizontal: PILL_PAD,
        borderRadius: radius.full,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <T variant="pill" color="#ffffff">
        {`${grams}g`}
      </T>
    </View>
  );
}
