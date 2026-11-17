import { Image, ScrollView, View } from 'react-native';

import { posts } from '../data/stats';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; gap: number; radius: number; bottomPad: number };

/**
 * What did best.
 *
 * The list takes the remainder of the screen, so the content reaches the dock
 * rather than stopping two thirds of the way down as the board's own insights
 * screen does (I3).
 */
export function PostList({ margin, height, gap, radius, bottomPad }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: bottomPad }}
    >
      {posts.map((post) => (
        <View
          key={post.id}
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.surface,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 12,
          }}
        >
          <Image
            source={post.image}
            style={{ width: 64, height: 64, borderRadius: 12 }}
            resizeMode="cover"
          />

          <View style={{ flex: 1, gap: 2 }}>
            <T variant="postTitle" numberOfLines={2}>
              {post.title}
            </T>
            <T variant="postMeta">
              {post.kind} · {post.date}
            </T>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <T variant="rate">{post.rate.toFixed(1)}%</T>
            <T variant="postMeta">eng. rate</T>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
