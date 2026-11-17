import { View } from 'react-native';

import { count, likedLine, savedLine } from '../data/feed';
import { T } from './text';

import { StatProps } from './_feed-parts-shared';

/**
 * Who liked it and how many saved it.
 *
 * **"You and N others" is the like count less the viewer** (R9), so the
 * sentence and the number cannot disagree.
 */
export function PostStats({ margin, height }: StatProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* STEP 1.23 t
      <T variant="liked">{likedLine()}</T>
      */}
      {/* STEP 1.24 t
      <T variant="saved">{savedLine()}</T>
      */}
    </View>
  );
}
