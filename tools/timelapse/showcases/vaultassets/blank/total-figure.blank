import { View } from 'react-native';

import { headline } from '../data/assets';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What is under management - the dominant figure on the screen (R8).
 *
 * Extracted out of the screen rather than written inline: a screen file is a
 * list of imports and the blocks they mount, and a figure written as markup
 * reveals in the same beat as whatever wraps it (rule 2 / I5).
 */
export function TotalFigure({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 12,
      }}
    >
      <T variant="display">{headline.figure}</T>
      {/* STEP 1.11 change
      <T variant="change">{headline.change}</T>
      */}
    </View>
  );
}
