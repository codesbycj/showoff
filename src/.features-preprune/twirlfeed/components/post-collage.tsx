import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, count, likedLine, nextPost, post, savedLine, stories, tabs } from '../data/feed';
import { ct } from '../theme';
import { CollageProps } from './_feed-parts-shared';

/**
 * The collage.
 *
 * **Photographs, because food is a picture *of* something** (I4). Laid out as
 * one large frame and two stacked beside it, which is what the board does; the
 * columns are explicit rather than a wrap, so a reveal can stage one frame at
 * a time.
 *
 * Each `Image` carries a numeric height — absolute insets alone make an
 * `Image` paint nothing on native, silently (Part 7).
 */
export function PostCollage({ margin, height, gap, radius }: CollageProps) {
  const small = (height - gap) / 2;

  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      <View style={{ flex: 2, borderRadius: radius, overflow: 'hidden', backgroundColor: ct.tile }}>
        <Image source={post.photos[0]} style={{ width: '100%', height }} resizeMode="cover" />
      </View>
      <View style={{ flex: 1, gap }}>
        <View style={{ borderRadius: radius, overflow: 'hidden', backgroundColor: ct.tile }}>
          <Image source={post.photos[1]} style={{ width: '100%', height: small }} resizeMode="cover" />
        </View>
        <View style={{ borderRadius: radius, overflow: 'hidden', backgroundColor: ct.tile }}>
          <Image source={post.photos[2]} style={{ width: '100%', height: small }} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
}
