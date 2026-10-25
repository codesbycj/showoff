import Plus from 'lucide-react-native/icons/plus';
import { Image, Pressable, View } from 'react-native';

import { feature } from '../data/home';
import { FEATURE_PAD } from '../layout';
import { radius, sp } from '../theme';
import { T } from './text';

const CAROL = require('../../../../assets/images/sproutshome/carol.jpg');

/**
 * The thing the shop is pushing this week.
 *
 * The portrait is a cropped photograph rather than a cut-out. The reference
 * keys its figure onto the yellow; this source has a shaded studio wall behind
 * it, and a flood fill on that leaves a halo on every frame — so the picture
 * fills the card's lower half instead, which keeps the same composition with
 * no edge to get wrong.
 *
 * `overflow: 'hidden'` crops it to the card's corners, and nothing here
 * carries `elevation` — the two together are unreliable on Android.
 */
export function FeatureCard({ height, onAdd }: { height: number; onAdd?: () => void }) {
  return (
    <View
      style={{
        height,
        borderRadius: radius.card,
        backgroundColor: sp.feature,
        overflow: 'hidden',
      }}
    >
      <Image
        source={CAROL}
        style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: height * 0.62 }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <View style={{ padding: FEATURE_PAD, alignItems: 'center' }}>
        <T variant="kicker" color={sp.featureInk}>
          {feature.kicker}
        </T>
        <T variant="display" color={sp.featureInk} style={{ marginTop: 2, textAlign: 'center' }}>
          {feature.display}
        </T>
      </View>

      <View style={{ flex: 1 }} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          padding: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 36,
            borderRadius: radius.pill,
            backgroundColor: sp.feature,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 14,
          }}
        >
          <T variant="product" color={sp.featureInk}>
            {feature.product}
          </T>
          <T variant="price" color={sp.featureInk}>
            {feature.price}
          </T>
        </View>

        <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add">
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: radius.full,
              backgroundColor: sp.feature,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={18} color={sp.featureInk} strokeWidth={2.4} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
