import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Expert } from '../data/explore';
import { R, SP, TYPE, al } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * One attorney in the "Top Rated" list.
 *
 * The online pip is a sibling of the avatar, not a child of a clipping wrapper.
 * The export nests it inside a `rounded-full overflow-hidden` box, where it
 * happens to sit far enough in to survive; rebuilding it that way would put an
 * `overflow: 'hidden'` on the path to a dot that sits 2dp from the edge, and
 * Android clips more eagerly than the web. The photo is rounded by its own
 * `borderRadius` instead, so nothing above the pip clips at all.
 */
export function ExpertRow({ expert, onPress }: { expert: Expert; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={expert.name}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: al.surfaceContainer,
          borderRadius: 20,
          padding: 14,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md - 4, flexShrink: 1 }}>
          <View style={{ width: 48, height: 48 }}>
            <Image
              source={expert.photo}
              style={{ width: 48, height: 48, borderRadius: R.full }}
              contentFit="cover"
            />
            <View
              style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 12,
                height: 12,
                borderRadius: R.full,
                backgroundColor: al.secondary,
              }}
            />
          </View>

          <View style={{ flexShrink: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text numberOfLines={1} style={{ ...TYPE.titleMd, color: al.onSurface }}>
                {expert.name}
              </Text>
              <FilledIcon name="verified" size={16} color={al.secondary} />
            </View>
            <Text numberOfLines={1} style={{ ...TYPE.labelSm, color: al.onSurfaceVariant }}>
              {expert.detail}
            </Text>
          </View>
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, paddingLeft: SP.sm }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.xs,
              paddingHorizontal: SP.sm,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: al.surfaceContainerHighest,
            }}
          >
            <FilledIcon name="star" size={14} color={al.secondary} />
            <Text style={{ ...TYPE.labelSm, color: al.onSurface }}>{expert.rating}</Text>
          </View>

          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: al.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="chevronRight" size={18} color={al.onSurface} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
