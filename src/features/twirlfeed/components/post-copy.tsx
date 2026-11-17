import { View } from 'react-native';

import { post } from '../data/feed';
import { T } from './text';

import { CopyProps } from './_feed-parts-shared';

/** The post's words. One run of body copy, 88 characters — R5's ceiling is
 *  110, and the board's own line is illegible and misspelt (I1). */
export function PostCopy({ margin, titleH, bodyH }: CopyProps) {
  return (
    <View style={{ marginHorizontal: margin }}>
      {/* STEP 1.17 title
      <View style={{ height: titleH, flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
        <T variant="postTitle">{post.title}</T>
        <T variant="postYear">{post.year}</T>
      </View>
      */}
      {/* STEP 1.18 body
      <View style={{ height: bodyH }}>
        <T variant="postBody">{post.body}</T>
      </View>
      */}
    </View>
  );
}
