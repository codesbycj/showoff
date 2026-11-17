import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, count, likedLine, nextPost, post, savedLine, stories, tabs } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BarProps } from './_feed-parts-shared';

/** The wordmark and the bell. */
export function FeedBar({ margin, height, control }: BarProps) {
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
      <T variant="wordmark">{brand.name}</T>
      <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Notifications">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              borderRadius: control / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.tile,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="bell" size={18} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
