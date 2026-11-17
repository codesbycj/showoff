import { Pressable, View } from 'react-native';

import { ranges } from '../data/chart';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The window the chart is drawn over.
 *
 * The active range is a filled pill, not a colour change alone, so it survives
 * a greyscale render; each tab is the full height of the bar, which clears
 * R7's 44dp floor.
 */
export function RangeTabs({ margin, height, radius }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        borderRadius: radius,
        backgroundColor: ct.tray,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
      }}
    >
      {ranges.map((range) => (
        <Pressable
          key={range.id}
          accessibilityRole="tab"
          accessibilityState={{ selected: !!range.on }}
          accessibilityLabel={range.label}
          style={{ flex: 1 }}
        >
          <View
            style={{
              height: height - 8,
              borderRadius: radius - 4,
              backgroundColor: range.on ? ct.accentSoft : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant={range.on ? 'rangeOn' : 'rangeOff'}>{range.label}</T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
