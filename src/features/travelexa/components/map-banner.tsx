import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, alpha, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * The "Interactive World Map" banner.
 *
 * It ships with no photograph. The export points its background at
 * `stitch-placeholder-300x300.svg` — Stitch's own "image goes here" tile — so
 * there was nothing to download and nothing to bundle. What the reference
 * actually renders is the dark card plus its left-to-right gradient, and that is
 * what is rebuilt. Inventing a map texture to fill the gap would be adding
 * something the design never specified.
 */
export function MapBanner({
  live,
  title,
  blurb,
  cta,
  onPress,
}: {
  live: string;
  title: string;
  blurb: string;
  cta: string;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        marginHorizontal: SP.margin,
        borderRadius: R.DEFAULT,
        overflow: 'hidden',
        backgroundColor: tx.primaryContainer,
        ...ELEV.card,
        shadowOpacity: 0.08,
      }}
    >
      <LinearGradient
        colors={[tx.primary, alpha(tx.primary, 0.8), 'transparent']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        pointerEvents="none"
      />

      <View style={{ height: 176, padding: SP.lg, justifyContent: 'space-between' }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.sm,
              paddingHorizontal: SP.sm,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: alpha(tx.onPrimary, 0.1),
            }}
          >
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: R.full,
                backgroundColor: tx.secondaryContainer,
              }}
            />
            <Text style={{ ...TYPE.labelSm, color: tx.onPrimary }}>{live}</Text>
          </View>

          <Symbol name="public" size={20} color={alpha(tx.onPrimary, 0.6)} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: SP.md,
          }}
        >
          <View style={{ flexShrink: 1 }}>
            <Text style={{ ...TYPE.headlineSm, color: tx.onPrimary }}>{title}</Text>
            <Text style={{ ...TYPE.bodySm, color: alpha(tx.onPrimary, 0.7) }}>{blurb}</Text>
          </View>

          <Pressable onPress={onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SP.xs,
                height: 40,
                paddingHorizontal: SP.md,
                borderRadius: R.full,
                backgroundColor: tx.surface,
              }}
            >
              <Text style={{ ...TYPE.labelMd, color: tx.primary }}>{cta}</Text>
              <Symbol name="arrowOutward" size={18} color={tx.primary} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
