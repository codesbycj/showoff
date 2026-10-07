import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Dispatch } from '../data/discover';
import { R, SP, TYPE, alpha, tx } from '../theme';

import { Symbol } from './symbol';

/** The card's own width, as the export's `min-w-[220px]`. */
const CARD = 220;

/**
 * One community dispatch.
 *
 * The author's avatar is an initial in a neutral disc rather than a photograph
 * — the export sets it that way, and it is the only avatar in this showcase
 * that is not an image.
 *
 * The reference's own render overlaps the place badge with the author row and
 * the follower count with the name. Both are separate rows in the markup, so
 * neither collision is reproduced.
 */
export function DispatchCard({ item, onPress }: { item: Dispatch; onPress?: () => void }) {
  return (
    <View
      style={{
        width: CARD,
        borderRadius: R.DEFAULT,
        backgroundColor: tx.surfaceContainerLow,
        padding: SP.md,
        gap: SP.sm,
      }}
    >
      <View style={{ height: 176, borderRadius: 12, overflow: 'hidden' }}>
        <Image source={item.image} style={{ width: '100%', height: '100%' }} contentFit="cover" />

        <View
          style={{
            position: 'absolute',
            left: SP.sm,
            bottom: SP.sm,
            paddingHorizontal: SP.sm,
            paddingVertical: 2,
            borderRadius: R.full,
            backgroundColor: alpha(tx.primary, 0.75),
          }}
        >
          <Text style={{ ...TYPE.labelSm, color: tx.onPrimary }}>{item.place}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flexShrink: 1 }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: R.full,
              backgroundColor: tx.surfaceContainerHighest,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ ...TYPE.labelSm, color: tx.onSurface }}>{item.initial}</Text>
          </View>

          <View style={{ flexShrink: 1 }}>
            <Text numberOfLines={1} style={{ ...TYPE.labelSm, color: tx.onSurface }}>
              {item.author}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...TYPE.bodySm, fontSize: 11, color: tx.onSurfaceVariant }}
            >
              {item.followers}
            </Text>
          </View>
        </View>

        <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Open dispatch">
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: R.full,
              backgroundColor: tx.surfaceContainerHighest,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="arrowForward" size={14} color={tx.onSurface} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
