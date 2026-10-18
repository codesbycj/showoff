import { Pressable, View } from 'react-native';

import { TAB_GAP, TAB_RULE } from '../layout';
import { fn } from '../theme';
import { T } from './text';

/**
 * All, Friends, Favorites — with a rule under the live one.
 *
 * The rule is a child of the tab rather than a bar positioned under the row,
 * so it is exactly as wide as its own word and cannot drift when the labels
 * change. A measured underline is a thing that goes wrong the first time
 * somebody translates the screen.
 */
export function FilterTabs({
  items,
  active,
  onSelect,
}: {
  items: readonly string[];
  active: string;
  onSelect?: (item: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: TAB_GAP }}>
      {items.map((item) => {
        const on = item === active;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect?.(item)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
          >
            <View style={{ alignItems: 'center' }}>
              <T variant={on ? 'tabOn' : 'tab'} color={on ? fn.ink : fn.muted}>
                {item}
              </T>
              <View
                style={{
                  // MISTAKE 1.26 the underline came in a fixed width
                  width: 60,
                  height: TAB_RULE,
                  alignSelf: 'stretch',
                  marginTop: 5,
                  borderRadius: TAB_RULE,
                  backgroundColor: on ? fn.ink : 'transparent',
                }}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
