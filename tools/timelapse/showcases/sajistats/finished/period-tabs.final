import { Pressable, View } from 'react-native';

import { TABS_HEIGHT, TABS_INSET } from '../layout';
import { radius, sj } from '../theme';
import { T } from './text';

/**
 * Day, Week, Month, Year — on a sunken track with the live one on a pill.
 *
 * Equal flex columns rather than text-sized tabs: "Day" is half the width of
 * "Month", and sizing to the text would leave the row lopsided and the pill
 * jumping a different distance each time.
 */
export function PeriodTabs({
  items,
  active,
  onSelect,
}: {
  items: readonly string[];
  active: string;
  onSelect?: (item: string) => void;
}) {
  return (
    <View
      style={{
        height: TABS_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: sj.raised,
        flexDirection: 'row',
        alignItems: 'center',
        padding: TABS_INSET,
      }}
    >
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
                height: TABS_HEIGHT - TABS_INSET * 2,
                borderRadius: radius.pill,
                backgroundColor: on ? sj.lime : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant={on ? 'tabOn' : 'tab'} color={on ? sj.onLime : sj.onDarkMuted}>
                {item}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
