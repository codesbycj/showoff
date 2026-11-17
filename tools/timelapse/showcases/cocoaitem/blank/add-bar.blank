import { Pressable, View } from 'react-native';

import { money, product, total } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * The action.
 *
 * The white fill lives on an absolutely-filled child so an emptied bar paints
 * nothing during a reveal (SS5.5), and the cart disc is lifted because an
 * `<svg>` paints BELOW a positioned sibling on web (SS7).
 */
export function AddBar({ margin, height, radius, onPress }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${product.cta}, ${money(total())}`}
        onPress={onPress}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 24,
            paddingRight: 8,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: radius,
              backgroundColor: ct.card,
            }}
          />

          {/* STEP 1.19 cta
          <T variant="cta">{product.cta}</T>
          */}

          {/* STEP 1.20 glyph
          <View style={{ zIndex: 1 }}>
            <View
              style={{
                width: height - 16,
                height: height - 16,
                borderRadius: (height - 16) / 2,
                backgroundColor: ct.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="cart" size={19} color={ct.onDark} strokeWidth={1.8} />
            </View>
          </View>
          */}
        </View>
      </Pressable>
    </View>
  );
}
