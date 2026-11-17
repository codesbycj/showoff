import { Pressable, ScrollView, View } from 'react-native';

import { screen, sizes } from '../data/item';
import { T } from './text';

import { HeadProps } from './_size-picker-shared';

/** "Select Size" and the way to the chart. */
export function SizeHead({ margin, height }: HeadProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="sizeLabel">{screen.sizeTitle}</T>
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={screen.sizeChart}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore">{screen.sizeChart}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
