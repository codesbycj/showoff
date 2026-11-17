import { View } from 'react-native';

import { headline } from '../data/performance';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What the figure above it is.
 *
 * The board's own caption misspells portfolio; it is corrected here and listed
 * in the handover - a design shot is not an authority on spelling (I1).
 *
 * Extracted out of the screen rather than written inline: a screen file is a
 * list of imports and the blocks they mount, and a caption written as markup
 * reveals in the same beat as whatever wraps it (rule 2 / I5).
 */
export function ReturnCaption({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="caption">{headline.caption}</T>
    </View>
  );
}
