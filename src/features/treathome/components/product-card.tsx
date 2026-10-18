import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { labels, products } from '../data/home';
import { CARD_PAD, PANEL_H } from '../layout';
import { radius, shadow, tr } from '../theme';
import { T } from './text';

const PACK = require('../../../../assets/images/treathome/pack-violet.jpg');

type Product = (typeof products)[number];

/**
 * The collection's lead product: the pack, what it costs, and the way to buy.
 *
 * The panel is the photograph. `tools/bake/treats.py` duotones a blank
 * stand-up pouch into the card's violet and keeps a third of a frame of empty
 * sweep beside it, so the card's own type sits on the photograph rather than
 * on a coloured rectangle with a picture pasted into it. A snack pack is a
 * specific manufactured object and AGENTS.md puts it outside drawing range.
 */
export function ProductCard({ product, onAdd }: { product: Product; onAdd?: () => void }) {
  const [held, setHeld] = useState(false);

  return (
    <View
      style={{
        padding: CARD_PAD,
        borderRadius: radius.card,
        backgroundColor: tr.card,
        ...shadow.card,
      }}
    >
      <View style={{ height: PANEL_H, borderRadius: radius.panel, overflow: 'hidden' }}>
        {/* STEP 1.17 the pack shot
        <Image
          source={PACK}
          // A width, not a pair of insets. An absolutely positioned Image
          // given only `left`/`right` lays out at the file's own pixel size
          // and the panel clips it, which looks like a flat colour with a
          // sliver of pack at the edge.
          style={{ position: 'absolute', width: '100%', height: PANEL_H }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        */}

        <View style={{ padding: 18, width: '58%' }}>
          {/* STEP 1.18 what it is
          <T variant="product" color={tr.ink}>
            {product.name}
          </T>
          */}
        </View>

        {/* STEP 1.19 whether you like it
        <View
          style={{
            position: 'absolute',
            right: 14,
            top: 14,
            width: 40,
            height: 40,
            borderRadius: radius.full,
            backgroundColor: tr.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={17} />
        </View>
        */}
      </View>

      {/* STEP 1.20 what it costs, and the way to buy it
      <View
        style={{
          marginTop: 14,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <T variant="priceLabel" color={tr.muted}>
            {labels.price}
          </T>
          <T variant="price" color={tr.ink}>
            {product.price}
          </T>
        </View>

        <Pressable
          onPress={onAdd}
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={`${labels.addToCart}, ${product.name}`}
        >
          <View
            style={{
              height: 48,
              paddingHorizontal: 28,
              borderRadius: radius.pill,
              backgroundColor: tr.action,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="cardAction" color={tr.onDark}>
              {labels.addToCart}
            </T>
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}

/** The favourite mark. Drawn, because an emoji heart differs per platform. */
function Heart({ size }: { size: number }) {
  return (
    <Svg width={size} height={size * 0.9} viewBox="0 0 20 18">
      <Path
        d="M10 17 C2 11.6 0 8.3 0 5.4 C0 2.4 2.2 0.4 5 0.4 C7 0.4 8.9 1.6 10 3.4 C11.1 1.6 13 0.4 15 0.4 C17.8 0.4 20 2.4 20 5.4 C20 8.3 18 11.6 10 17 Z"
        fill={tr.ink}
      />
    </Svg>
  );
}
