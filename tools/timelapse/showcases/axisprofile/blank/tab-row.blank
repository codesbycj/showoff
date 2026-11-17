import { Pressable, ScrollView, View } from 'react-native';

import { tabs } from '../data/profile';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The three views of this function.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its third tab at
 * the screen edge, which is what tells you the row scrolls. `flexGrow: 0`
 * keeps it from eating the column's slack.
 */
export function TabRow({ margin, height }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
    >
      {tabs.map((tab) => (
        <Pressable key={tab.id} accessibilityRole="tab" accessibilityLabel={tab.label}>
          <View
            style={{
              height,
              borderRadius: height / 2,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: tab.on ? ct.white : ct.card,
            }}
          >
            <T variant={tab.on ? 'tabOn' : 'tab'}>{tab.label}</T>

            {tab.count ? (
              <View
                style={{
                  minWidth: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: ct.lavenderTile,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T variant="count">{tab.count}</T>
              </View>
            ) : null}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
