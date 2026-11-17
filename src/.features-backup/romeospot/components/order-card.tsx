import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, View } from 'react-native';

import { modes, type OrderMode } from '../data/spot';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** One order mode: a tinted tile, a title and a one-line subtitle. */
function Row({
  mode,
  tile,
  height,
  last,
}: {
  mode: OrderMode;
  tile: number;
  height: number;
  last: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={mode.title}>
      {({ pressed }) => (
        <View
          style={{
            height,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderBottomWidth: last ? 0 : 1,
            borderBottomColor: ct.hairline,
            opacity: pressed ? 0.6 : 1,
          }}
        >
          <LinearGradient
            colors={[mode.tint[0], mode.tint[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: tile,
              height: tile,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name={mode.glyph} size={20} color="#FFFFFF" strokeWidth={1.8} />
          </LinearGradient>

          <View style={{ flex: 1, gap: 2 }}>
            <T variant="rowTitle">{mode.title}</T>
            <T variant="rowSub">{mode.sub}</T>
          </View>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  margin: number;
  height: number;
  rowH: number;
  padV: number;
  radius: number;
  tile: number;
};

/**
 * The three ways to order, as one white card.
 *
 * **The card's fill is an absolutely-filled child, not the container.**
 * Descending a container to stage its rows leaves its own `backgroundColor`
 * live, so the take would open on an empty white card floating over the page
 * (§5.5, I9). The shadow and `elevation` ride on that same child — left on the
 * container, an emptied card still paints its padding as a strip with a shadow
 * under it.
 *
 * `shadow*` and `elevation` sit in one style object, never a `Platform.select`:
 * a select is exactly what the web render cannot check (RULES §4.4).
 */
export function OrderCard({ margin, height, rowH, padV, radius, tile }: Props) {
  return (
    <View
      style={{ marginHorizontal: margin, height, paddingHorizontal: 14, paddingVertical: padV }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.surface,
          shadowColor: '#0B1220',
          shadowOpacity: 0.06,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        }}
      />

      {modes.map((m, i) => (
        <Row key={m.id} mode={m} tile={tile} height={rowH} last={i === modes.length - 1} />
      ))}
    </View>
  );
}
