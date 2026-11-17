import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, View } from 'react-native';

import { banner, delivery, offers, place, reviews, usd } from '../data/menu';
import { ct } from '../theme';
import { T } from './text';

import { BannerProps, Round } from './_menu-head-shared';

/**
 * The promo banner.
 *
 * **The photograph and the brand wash are on an absolutely-filled child**, so
 * a reveal that stages the wordmark and the controls does not open on a solid
 * red sheet (§5.5 / I9).
 *
 * The scrim runs top to bottom, which `expo-linear-gradient` handles; only a
 * *diagonal* is mirrored on web (Part 7). It is there because the wordmark has
 * to clear 4.5:1 over a photograph (R4).
 */
export function MenuBanner({ width, height, margin, topInset, control, onBack }: BannerProps) {
  return (
    <View style={{ width, height }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: ct.brand, overflow: 'hidden' }}>
        <Image source={banner.photo} style={{ width, height }} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(224,41,29,0.9)', 'rgba(224,41,29,0.35)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          pointerEvents="none"
        />
      </View>

      <View style={{ paddingTop: topInset }}>
        <View
          style={{
            marginHorizontal: margin,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Round glyph="back" label="Back" size={control} onPress={onBack} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Round glyph="heart" label="Save" size={control} />
            <Round glyph="arrowUpRight" label="Share" size={control} />
          </View>
        </View>

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <T variant="bannerKicker">{banner.kicker}</T>
          <T variant="bannerWord">{banner.word}</T>
        </View>
      </View>
    </View>
  );
}
