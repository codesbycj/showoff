import { Image, Pressable, Text, View, type ImageSourcePropType } from 'react-native';

import { DrawnIcon } from './drawn-icon';
import type { Meal } from '../data/home';
import { LEVEL, R, TYPE, pf } from '../theme';

/**
 * One dish in a meal's thumbnail cluster.
 *
 * The cluster overlaps by 12dp and each thumbnail carries a 2dp white ring,
 * so the later one cuts a crescent out of the one before it. Both facts are
 * load-bearing: the ring is a CSS `ring`, drawn outside the 44dp box and
 * taking no layout space, and the overlap is a negative margin — so the
 * crescent only appears if the ring is a circle of its own behind the image
 * and the second thumbnail paints after the first.
 */
function Thumb({ source, first }: { source: ImageSourcePropType; first: boolean }) {
  return (
    <View style={{ width: 44, height: 44, marginLeft: first ? 0 : -12 }}>
      <View
        style={{
          position: 'absolute',
          left: -2,
          top: -2,
          width: 48,
          height: 48,
          borderRadius: R.full,
          backgroundColor: pf.ring,
        }}
      />
      <Image
        source={source}
        style={[{ width: 44, height: 44, borderRadius: R.full }, LEVEL.thumb]}
      />
    </View>
  );
}

/**
 * A logged meal: name, calorie range, what was eaten, and a way to add more.
 *
 * 68dp tall — 12dp of padding round a 44dp row whose height comes from the
 * thumbnails, not from the two lines of text beside them.
 *
 * The card itself is not pressable, and that is the reference's own call: only
 * the `+` is a control. It is also the only shape that survives the static web
 * build — a `Pressable` with a button role inside another one renders as a
 * `<button>` inside a `<button>`, which the HTML parser is required to unnest,
 * and the card comes apart.
 */
export function MealRow({ meal, onAdd }: { meal: Meal; onAdd?: () => void }) {
  return (
    <View
      style={[
        {
          borderRadius: R.card,
          backgroundColor: pf.surface,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        LEVEL.card,
      ]}
    >
      <View style={{ flexShrink: 1, paddingRight: 8, gap: 4 }}>
{/* STEP 1.37 which meal this was
        <Text style={[TYPE.mealName, { color: pf.ink }]}>{meal.name}</Text>
*/}

{/* STEP 1.38 and what it cost you
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: R.full,
              backgroundColor: pf.orangeTint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DrawnIcon name="localFireDepartment" size={12} color={pf.orange} />
          </View>

          <Text style={[TYPE.kcal, { color: pf.muted }]}>{meal.kcal}</Text>
        </View>
*/}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
{/* STEP 1.39 the dishes, overlapping
        {meal.thumbs.map((src, i) => (
          <Thumb key={i} source={src} first={i === 0} />
        ))}
*/}

{/* STEP 1.40 and room for one more
        <Pressable
          onPress={onAdd}
          accessibilityRole="button"
          accessibilityLabel={`Add food to ${meal.name}`}
          // 8dp of gap plus the button's own `ml-1`.
          style={{ marginLeft: 12 }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              backgroundColor: pf.surfaceLow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DrawnIcon name="addBold" size={20} color={pf.ink} />
          </View>
        </Pressable>
*/}
      </View>
    </View>
  );
}
