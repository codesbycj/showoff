import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { CTA_H, FOOTER_PAD, MARGIN } from '../layout';
import { ct, radius, type } from '../theme';
import { copy } from '../data/event';
import { T } from './text';

function Star({ tint }: { tint: string }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24">
      <Path
        fill={tint}
        d="M12 2.6l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.6l-5.6 3.2 1.3-6.3L2.9 9.2l6.4-.7Z"
      />
    </Svg>
  );
}

/**
 * The price and the one thing to do.
 *
 * **This is the block the reference gets wrong.** There, a floating pill lies
 * across the line underneath it, clipping both the paragraph and the count —
 * the exact collision R3 is about. Here the footer is an opaque bar with a
 * hairline over it, the scroll content is padded by its height, and the price
 * sits beside the button rather than under it.
 */
export function FooterBar({ bottom, onPress }: { bottom: number; onPress?: () => void }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottom,
        backgroundColor: ct.page,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: MARGIN,
          paddingVertical: FOOTER_PAD,
        }}
      >
        <View style={{ marginRight: 16 }}>
          <T variant="price" color={ct.free} style={{ height: type.price.line }}>
            {copy.price}
          </T>
          <T variant="priceNote" color={ct.muted} style={{ height: type.priceNote.line }}>
            {copy.priceNote}
          </T>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.cta}
          onPress={onPress}
          style={{ flex: 1 }}
        >
          {({ pressed }) => (
            <View
              style={{
                height: CTA_H,
                borderRadius: radius.cta,
                backgroundColor: ct.cta,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.9 : 1,
              }}
            >
              <Star tint={ct.onCta} />
              <T variant="cta" color={ct.onCta} style={{ height: type.cta.line, marginLeft: 8 }}>
                {copy.cta}
              </T>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
