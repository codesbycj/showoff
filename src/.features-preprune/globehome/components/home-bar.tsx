import { Image, Pressable, ScrollView, View } from 'react-native';

import { BarProps, Round } from './_home-parts-shared';

/** The menu, the search and the bell. */
export function HomeBar({ margin, height, control }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Round glyph="menu" label="Menu" size={control} />
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Round glyph="search" label="Search" size={control} />
        <Round glyph="bell" label="Notifications" size={control} badge />
      </View>
    </View>
  );
}
