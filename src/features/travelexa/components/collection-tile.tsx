import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { type Collection } from '../data/discover';
import { R, SP, TYPE, alpha, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * One tile in the two-column collections grid.
 *
 * The icon chip sits on a frosted disc above the title. `backdrop-blur` is
 * dropped — React Native has no backdrop filter — and the 20% white fill the
 * export sets is kept, which over a scrim this dark lands on the same colour.
 */
export function CollectionTile({ item, onPress }: { item: Collection; onPress?: () => void }) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <View style={{ height: 192, borderRadius: R.DEFAULT, overflow: 'hidden' }}>
        <Image
          source={item.image}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          contentFit="cover"
        />

        <LinearGradient
          colors={['transparent', alpha(tx.primary, 0.3), alpha(tx.primary, 0.85)]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        />

        <View style={{ flex: 1, justifyContent: 'flex-end', padding: SP.md }}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: R.full,
              backgroundColor: alpha(tx.surface, 0.2),
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: SP.xs,
            }}
          >
            <Symbol name={item.icon} size={16} color={tx.onPrimary} />
          </View>

          <Text style={{ ...TYPE.labelLg, color: tx.onPrimary }}>{item.title}</Text>
          <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: alpha(tx.onPrimary, 0.75) }}>
            {item.blurb}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
