import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, count, likedLine, nextPost, post, savedLine, stories, tabs } from '../data/feed';
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
      <T variant="liked">{likedLine()}</T>
      <T variant="saved">{savedLine()}</T>
    </View>
  );
}
