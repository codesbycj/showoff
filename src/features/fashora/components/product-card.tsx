import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import type { Product } from '../data/home';
import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * One product in the feed's two-column grid.
 *
 * The heart is the only element on this screen with two states, and they are
 * drawn by two different mechanisms: the hollow one is the `favorite` glyph out
 * of the icon subset, the solid one a path from Material's `fill1` SVG. The
 * packaged Symbols static has no FILL axis, and cutting a second icon font to
 * get one is the collision that renders tofu on Android.
 *
 * The clip and the shadow sit on two Views: `overflow: 'hidden'` is what rounds
 * the photo into the card's top corners, `elevation` is what casts `shadow-sm`,
 * and the pair on one View is unreliable on Android.
 *
 * The visual box is on an inner `View`, not on the `Pressable`'s own style — a
 * `style={({pressed}) => …}` function is dropped in static render, which takes
 * the fill and the height with it and is invisible until the harness shoots it.
 */
export function ProductCard({
  product,
  saved,
  onToggleSave,
  onPress,
}: {
  product: Product;
  saved: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
}) {
  return (
    <View style={{ flex: 1, borderRadius: R.xl2, ...ELEV.card }}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={product.name}>
        <View
          style={{
            borderRadius: R.xl2,
            backgroundColor: fa.surfaceContainerLowest,
            overflow: 'hidden',
          }}
        >
          <View style={{ aspectRatio: 4 / 5, backgroundColor: fa.surfaceContainerLow }}>
            <Image
              source={product.image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>

          <View style={{ padding: SP.gutterMobile, gap: SP.xs }}>
            <Text numberOfLines={1} style={{ ...TYPE.labelSm, color: fa.secondary }}>
              {product.category}
            </Text>
            <Text numberOfLines={1} style={{ ...TYPE.labelLg, color: fa.onSurface }}>
              {product.name}
            </Text>
            <Text style={{ ...TYPE.headlineSm, fontFamily: FONT.bold, color: fa.primaryContainer }}>
              {product.price}
            </Text>
          </View>
        </View>
      </Pressable>

      {/*
        The heart is a sibling of the card's own Pressable, not a child of it.
        Nesting one pressable inside another renders as a `<button>` inside a
        `<button>`, which is invalid HTML — the web harness says so out loud,
        and on a device the outer press target swallows the inner one.
      */}
      <Pressable
        onPress={onToggleSave}
        accessibilityRole="button"
        accessibilityLabel="Add to favorites"
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerLowest,
            alignItems: 'center',
            justifyContent: 'center',
            ...ELEV.card,
          }}
        >
          {saved ? (
            <FilledIcon name="favorite" size={18} color={fa.primaryContainer} />
          ) : (
            <Symbol name="favorite" size={18} color={fa.secondary} />
          )}
        </View>
      </Pressable>
    </View>
  );
}
