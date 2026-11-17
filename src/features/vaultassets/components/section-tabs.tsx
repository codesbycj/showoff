import { Pressable, ScrollView, View } from 'react-native';

import { tabs } from '../data/assets';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; onSelect: (route: string) => void };

/**
 * The views of the account.
 *
 * **A horizontal scroller, not a wrap** (R2): the row runs past the screen
 * edge, and a wrap layout physically cannot reproduce that. `flexGrow: 0`
 * keeps it from eating the column's slack.
 *
 * The visual pill is 36dp; the control around it is 44, which is the floor for
 * a pressable (I2 / R7).
 *
 * It takes `onSelect` rather than routing itself: screens decide navigation,
 * components never do, so adding a destination is one line in the screen
 * (RULES SS6.1).
 */
export function SectionTabs({ margin, height, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 8, alignItems: 'center' }}
    >
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          accessibilityRole="tab"
          accessibilityLabel={tab.label}
          onPress={() => onSelect(tab.route)}
        >
          <View style={{ height: 44, justifyContent: 'center' }}>
            <View
              style={{
                height: 36,
                borderRadius: 18,
                paddingHorizontal: 18,
                justifyContent: 'center',
                backgroundColor: tab.on ? ct.beige : 'transparent',
                borderWidth: tab.on ? 0 : 1,
                borderColor: ct.line,
              }}
            >
              <T variant="pill">{tab.label}</T>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
