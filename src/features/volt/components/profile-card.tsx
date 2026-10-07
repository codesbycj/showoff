import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Stat } from '../data/wallet';
import { R, SP, TYPE, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Glow } from './glow';
import { Symbol } from './symbol';

/**
 * The identity card: portrait, tier badge, handle and three stat tiles.
 *
 * The verified tick hangs off the portrait's lower-right corner, outside the
 * circle. That is why the portrait's ring is a border on the image rather than
 * `overflow: 'hidden'` on a wrapper — a clip there would take the tick with it,
 * and Android clips more eagerly than the web.
 *
 * Each stat tile differs in exactly one way (lime value, lime caption, a flame,
 * a rising arrow), so those are flags on the datum rather than three bespoke
 * tiles — which is what the export writes.
 */
export function ProfileCard({
  name,
  tier,
  handle,
  member,
  photo,
  stats,
  onTier,
}: {
  name: string;
  tier: string;
  handle: string;
  member: string;
  photo: number;
  stats: readonly Stat[];
  onTier?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        overflow: 'hidden',
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.lg,
      }}
    >
      <Glow color={vt.primaryFixed} size={192} opacity={0.1} top={-48} right={-48} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
          <View>
            <Image
              source={photo}
              style={{
                width: 64,
                height: 64,
                borderRadius: R.full,
                borderWidth: 2,
                borderColor: vt.primaryFixed,
              }}
              contentFit="cover"
            />
            <View
              style={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                borderRadius: R.full,
                backgroundColor: vt.surfaceContainerLowest,
                padding: 2,
              }}
            >
              <FilledIcon name="verified" size={16} color={vt.primaryFixed} />
            </View>
          </View>

          <View style={{ flexShrink: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <Text numberOfLines={1} style={{ ...TYPE.headlineMd, color: vt.primary }}>
                {name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: SP.xs,
                  paddingHorizontal: SP.sm,
                  paddingVertical: 2,
                  borderRadius: R.full,
                  backgroundColor: vt.primaryFixed,
                }}
              >
                <FilledIcon name="bolt" size={12} color={vt.onPrimaryFixed} />
                <Text style={{ ...TYPE.labelSm, color: vt.onPrimaryFixed }}>
                  {tier.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, marginTop: 2 }}>
              <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.secondary }}>
                {handle}
              </Text>
              <View
                style={{ width: 4, height: 4, borderRadius: R.full, backgroundColor: vt.secondary }}
              />
              <Text style={{ ...TYPE.bodySm, color: vt.onSurfaceVariant }}>{member}</Text>
            </View>
          </View>
        </View>

        <Pressable onPress={onTier} accessibilityRole="button" accessibilityLabel="Tier rewards">
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerHigh,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilledIcon name="militaryTech" size={20} color={vt.primaryFixed} />
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', gap: SP.md }}>
        {stats.map((s) => (
          <View
            key={s.key}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              gap: SP.xs,
              paddingVertical: SP.md,
              paddingHorizontal: SP.sm,
              borderRadius: R.DEFAULT,
              backgroundColor: vt.surfaceContainer,
            }}
          >
            <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{s.label}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text style={{ ...TYPE.headlineMd, color: s.accent ? vt.primaryFixed : vt.primary }}>
                {s.value}
              </Text>
              {s.flame ? (
                <FilledIcon name="localFireDepartment" size={16} color={vt.primaryFixed} />
              ) : null}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              {s.trend ? <Symbol name="trendingUp" size={11} color={vt.primaryFixed} /> : null}
              <Text
                numberOfLines={1}
                style={{
                  ...TYPE.labelSm,
                  color: s.captionAccent ? vt.primaryFixed : vt.onSurfaceVariant,
                }}
              >
                {s.caption}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
