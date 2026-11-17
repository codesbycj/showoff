import { Image, Pressable, View } from 'react-native';

import { route } from '../data/fly';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * Where the trip goes.
 *
 * **The board's card says "Searching…" beside a result count** — the two
 * cannot both be true, so the search has resolved and the control under the
 * route is the one that changes it (I1).
 *
 * The ground is a photograph of a valley rather than a traced map: a map is a
 * picture of a place, which I4 puts out of drawing range.
 */
export function RouteCard({ margin, width, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, borderRadius: radius, overflow: 'hidden' }}>
      <Image source={route.image} style={{ width, height, opacity: 0.4 }} resizeMode="cover" />

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(244,243,236,0.55)',
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          paddingVertical: 16,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <T variant="code">{route.fromCode}</T>
            <T variant="city">{route.fromCity}</T>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: ct.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="plane" size={19} color={ct.onDark} />
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <T variant="code">{route.toCode}</T>
            <T variant="city">{route.toCity}</T>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={route.change}
            hitSlop={{ top: 4, bottom: 4, left: 0, right: 0 }}
          >
            <View
              style={{
                height: 38,
                paddingHorizontal: 16,
                borderRadius: 19,
                backgroundColor: ct.white,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <T variant="chip">{route.change}</T>
              <Glyph name="swap" size={15} color={ct.ink} strokeWidth={1.8} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
