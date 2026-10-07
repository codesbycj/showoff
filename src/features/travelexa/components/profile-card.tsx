import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Stat } from '../data/profile';
import { ELEV, R, SP, TYPE, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The identity card: portrait, name, level badge and the three-up stats strip.
 *
 * The verification tick hangs off the portrait's lower-right corner, outside
 * the circle, so the portrait is rounded by its own `borderRadius` and ringed by
 * its own border rather than clipped by a parent — a clip on the path to the
 * tick would take it with it, and Android clips more eagerly than the web.
 *
 * The level badge uses the terracotta at low opacity, which is the one place
 * this otherwise monochrome screen shows brand colour.
 *
 * The edit pencil is a sibling of the text column, not a child of it, so it
 * pins to the card's right edge rather than trailing the name — which is where
 * the reference puts it, and it stays there whatever the name's length.
 */
export function ProfileCard({
  name,
  handle,
  level,
  photo,
  stats,
  onEdit,
}: {
  name: string;
  handle: string;
  level: string;
  photo: number;
  stats: readonly Stat[];
  onEdit?: () => void;
}) {
  return (
    <View
      style={{
        marginHorizontal: SP.margin,
        borderRadius: R.md,
        backgroundColor: tx.surfaceContainerLowest,
        padding: SP.lg,
        gap: SP.md,
        ...ELEV.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md }}>
        <View>
          <Image
            source={photo}
            style={{
              width: 80,
              height: 80,
              borderRadius: R.full,
              borderWidth: 4,
              borderColor: tx.surface,
            }}
            contentFit="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 26,
              height: 26,
              borderRadius: R.full,
              backgroundColor: tx.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: tx.surfaceContainerLowest,
            }}
          >
            <Symbol name="verified" size={14} color={tx.onPrimary} />
          </View>
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ ...TYPE.headlineMd, color: tx.onSurface }}>
            {name}
          </Text>

          <Text style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>{handle}</Text>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.xs,
              paddingHorizontal: SP.sm,
              paddingVertical: 3,
              borderRadius: R.full,
              backgroundColor: tx.secondaryFixed,
              marginTop: SP.xs,
            }}
          >
            <FilledIcon name="stars" size={13} color={tx.onSecondaryContainer} />
            <Text style={{ ...TYPE.labelSm, color: tx.onSecondaryContainer }}>{level}</Text>
          </View>
        </View>

        <Pressable
          onPress={onEdit}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Edit profile"
          style={{ alignSelf: 'flex-start' }}
        >
          <Symbol name="edit" size={18} color={tx.onSurfaceVariant} />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: R.DEFAULT,
          backgroundColor: tx.surfaceContainerLow,
          paddingVertical: SP.md,
        }}
      >
        {stats.map((s, i) => (
          <View key={s.key} style={{ flexDirection: 'row', flex: 1 }}>
            {i > 0 ? (
              <View style={{ width: 1, height: 36, backgroundColor: tx.surfaceContainerHigh }} />
            ) : null}
            <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
              <Text style={{ ...TYPE.headlineSm, color: tx.onSurface }}>{s.value}</Text>
              <Text style={{ ...TYPE.labelSm, letterSpacing: 0.5, color: tx.onSurfaceVariant }}>
                {s.label.toUpperCase()}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
