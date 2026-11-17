import { Pressable, ScrollView, View } from 'react-native';

import { activities } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * What the trip is for.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its last chip at
 * the screen edge, and a wrap layout physically cannot reproduce that — it
 * would either fold the chip onto a second line or report `OFFSCREEN`.
 *
 * The selected chip takes the forest ground and white type (6.8:1); the rest
 * are ink on white (R4).
 */
export function ActivityChips({ margin, height, radius }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
    >
      {activities.map((activity) => (
        <Pressable
          key={activity.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!activity.on }}
          accessibilityLabel={activity.label}
        >
          <View
            style={{
              height,
              paddingHorizontal: 18,
              borderRadius: radius,
              backgroundColor: activity.on ? ct.forest : ct.white,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Glyph
              name={activity.glyph}
              size={17}
              color={activity.on ? ct.onForest : ct.ink}
              strokeWidth={1.7}
            />
            <T variant={activity.on ? 'chipOn' : 'chip'}>{activity.label}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
