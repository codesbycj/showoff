import { Pressable, View } from 'react-native';

import { PILL_GAP, PILL_HEIGHT } from '../layout';
import { ps, radius, shadow } from '../theme';
import { T } from './text';

/**
 * Today, Weekly, Monthly, Yearly.
 *
 * Equal flex columns rather than text-sized pills: "Today" is two thirds the
 * width of "Monthly", and sizing to the text leaves the row lopsided and the
 * selection jumping a different distance each time.
 *
 * `onSelect` is a prop — screens decide what a period change means,
 * components never do.
 */
export function PeriodPills({
  items,
  active,
  onSelect,
}: {
  items: readonly string[];
  active: string;
  onSelect?: (item: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: PILL_GAP }}>
      {/* STEP 1.08 one pill each
      {items.map((item) => {
        const on = item === active;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect?.(item)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                height: PILL_HEIGHT,
                // MISTAKE 1.09 the pills came in sitting low
                marginTop: 10,
                borderRadius: radius.pill,
                backgroundColor: on ? ps.lime : ps.surface,
                alignItems: 'center',
                justifyContent: 'center',
                ...shadow.soft,
              }}
            >
              <T variant={on ? 'pillOn' : 'pill'} color={on ? ps.text : ps.muted}>
                {item}
              </T>
            </View>
          </Pressable>
        );
      })}
      */}
    </View>
  );
}
