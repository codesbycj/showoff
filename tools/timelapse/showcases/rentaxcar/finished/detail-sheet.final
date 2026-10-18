import { Pressable, View } from 'react-native';

import { car, stats } from '../data/car';
import { BADGE, BLOCK_TOP, SHEET_PAD, SHEET_TOP, TILE_GAP, TILES_TOP } from '../layout';
import { radius, rx } from '../theme';
import { FaceStack } from './face-stack';
import { Icon } from './icon';
import { StatTile } from './stat-tile';
import { T } from './text';

/**
 * The dark half: what the car is, what it is like, and what it can do.
 *
 * Rounded only at the top, so it reads as the page rising over the yellow
 * stage rather than as a card laid on it — which is what the reference draws
 * and what lets the car overlap its edge.
 */
export function DetailSheet({ onReviews }: { onReviews?: () => void }) {
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        backgroundColor: rx.canvas,
        paddingHorizontal: SHEET_PAD,
        paddingTop: SHEET_TOP,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View
          style={{
            width: BADGE,
            height: BADGE,
            borderRadius: radius.full,
            backgroundColor: rx.raised,
            borderWidth: 1,
            borderColor: rx.raisedEdge,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="title" color={rx.onDark} style={{ fontSize: 14 }}>
            {car.badge}
          </T>
        </View>
        <T variant="name" color={rx.onDark}>
          {car.name}
        </T>
      </View>

      <T variant="body" color={rx.onDarkMuted} style={{ marginTop: BLOCK_TOP }}>
        {car.body}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 7, marginTop: 8 }}>
        <View style={{ marginTop: 2 }}>
          <Icon name="check" size={13} color={rx.check} strokeWidth={3} />
        </View>
        <T variant="note" color={rx.onDark} style={{ flex: 1 }}>
          {car.note}
        </T>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: BLOCK_TOP }}>
        <FaceStack ring={rx.canvas} />
        <Icon name="star" size={13} color={rx.onDark} strokeWidth={2.2} />
        <T variant="rating" color={rx.onDark} style={{ marginLeft: 4 }}>
          {car.rating}
        </T>
        <View style={{ flex: 1 }} />
        <Pressable onPress={onReviews} hitSlop={10} accessibilityRole="button">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <T variant="link" color={rx.action}>
              {car.reviews}
            </T>
            <Icon name="next" size={13} color={rx.action} strokeWidth={2} />
          </View>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', gap: TILE_GAP, marginTop: TILES_TOP }}>
        {stats.map((s) => (
          <StatTile key={s.key} name={s.key} value={s.value} unit={s.unit} />
        ))}
      </View>
    </View>
  );
}
