import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { pack, products } from '../data/shop';
import { CARD_H } from '../layout';
import { ec, radius } from '../theme';
import { T } from './text';

const ART = {
  leaf: require('../../../../assets/images/ecoshop/pack-leaf.jpg'),
  apricot: require('../../../../assets/images/ecoshop/pack-apricot.jpg'),
} as const;

const BITES = require('../../../../assets/images/ecoshop/bites.png');

type Product = (typeof products)[number];

/**
 * One product on a tinted panel.
 *
 * The panel *is* the photograph: `tools/bake/eco.py` duotones a blank pouch
 * into the card's colour and keeps a third of a frame of empty sweep beside
 * it, so the brand's own type sits on the picture rather than on a coloured
 * rectangle with a picture pasted into it.
 *
 * `overflow: 'hidden'` crops both images to the card's corners, and nothing
 * here carries `elevation` — the two together are unreliable on Android.
 */
export function ProductCard({ product, onPress }: { product: Product; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={product.name}>
      <View style={{ height: CARD_H, borderRadius: radius.stage, overflow: 'hidden' }}>
        <Image
          source={ART[product.art]}
          style={{ position: 'absolute', width: '100%', height: CARD_H }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />

        <Image
          source={BITES}
          style={{ position: 'absolute', left: 10, bottom: 10, width: 112, height: 104 }}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />

        <View style={{ padding: 18, alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
            <T variant="display" color={ec.packInk} style={{ fontSize: 22, lineHeight: 26 }}>
              {pack.top}
            </T>
            <View style={{ marginTop: 3 }}>
              <Leaf size={15} />
            </View>
          </View>
          <T variant="display" color={ec.packLeaf} style={{ fontSize: 22, lineHeight: 26 }}>
            {pack.bottom}
          </T>
        </View>

        {product.price ? (
          <View
            style={{
              position: 'absolute',
              right: 16,
              bottom: 16,
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: radius.pill,
              backgroundColor: ec.action,
            }}
          >
            <T variant="price" color={ec.onDark}>
              {product.price}
            </T>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

/** The leaf in the wordmark. A leaf is a flat mark — drawing range. */
function Leaf({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Path
        d="M18 2 C10 2 3 6 3 12 C3 15 4.6 17.4 7 17.4 C13 17.4 18 11 18 2 Z"
        fill={ec.packLeaf}
      />
      <Path
        d="M15 5 C11 8 8 11.6 6.6 16"
        stroke={ec.packInk}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}
