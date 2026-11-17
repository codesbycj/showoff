import { View } from 'react-native';

import { headline } from '../data/assets';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What the figure above it is.
 *
 * The board reads "Total Mange Assets"; it is corrected here and listed in the
 * handover - a design shot is not an authority on spelling (I1).
 */
export function TotalCaption({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="caption">{headline.caption}</T>
    </View>
  );
}
