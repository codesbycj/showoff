import { Image, Pressable, ScrollView, View } from 'react-native';

import { grid, gridTabs } from '../data/profile';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { margin: number; tabsH: number; cell: number; gap: number; bottomPad: number };

/**
 * The account's posts, under the four view tabs.
 *
 * The grid runs under the dock exactly as the board crops it, which is what
 * keeps the foot closed (I3). The active tab is marked by a rule as well as by
 * colour, so it survives a greyscale render.
 */
export function PhotoGrid({ margin, tabsH, cell, gap, bottomPad }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {/* STEP 1.18 glyph
      <View
        style={{
          marginHorizontal: margin,
          height: tabsH,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: ct.line,
        }}
      >
        {gridTabs.map((tab) => (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: !!tab.on }}
            accessibilityLabel={tab.id}
            style={{ flex: 1, height: tabsH, alignItems: 'center', justifyContent: 'center' }}
          >
            <Glyph
              name={tab.glyph}
              size={20}
              color={tab.on ? ct.ink : ct.faint}
              strokeWidth={tab.on ? 2 : 1.6}
            />
            {tab.on ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: 34,
                  height: 2.5,
                  borderRadius: 2,
                  backgroundColor: ct.violet,
                }}
              />
            ) : null}
          </Pressable>
        ))}
      </View>
      */}

      {/* STEP 1.19 image
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: margin,
          paddingTop: gap,
          paddingBottom: bottomPad,
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
          {grid.map((image, i) => (
            <Image
              key={`g-${i}`}
              source={image}
              style={{ width: cell, height: cell, borderRadius: 10 }}
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>
      */}
    </View>
  );
}
