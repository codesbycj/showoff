import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { FAB_SIZE, TAB_HEIGHT } from '../layout';
import { radius, shadow, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The dock, and the one button that starts something.
 *
 * It floats over the list rather than sitting under it, so the task list runs
 * on under the bar the way a real list does — which is what keeps the screen
 * full to its bottom edge instead of ending in a band of empty canvas.
 *
 * `overflow: 'hidden'` and `elevation` are never on the same `View` here: the
 * combination is unreliable on Android, and nothing on this bar needs
 * clipping. The button's shadow lives on the button.
 */
export function TabBar({ active = 'home', bottom }: { active?: string; bottom: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottom,
        backgroundColor: tp.card,
      }}
    >
      <View
        style={{
          height: TAB_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        {tabs.map((t, i) => {
          const on = t.id === active;
          return (
            <View key={t.id} style={{ flex: 1, alignItems: 'center' }}>
              {/* The middle of the row belongs to the button, so the four
                  tabs are two and two with a gap between them. */}
              {i === 2 ? <View style={{ width: FAB_SIZE + 18 }} /> : null}
              <Pressable accessibilityRole="tab" accessibilityLabel={t.label} hitSlop={8}>
                <View style={{ alignItems: 'center', paddingVertical: 4 }}>
                  <Glyph name={t.id as 'home'} size={21} tint={on ? tp.green : tp.muted} />
                  <T
                    variant={on ? 'tabOn' : 'tab'}
                    color={on ? tp.green : tp.muted}
                    style={{ marginTop: 3, height: type.tab.line }}
                  >
                    {t.label}
                  </T>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: -FAB_SIZE / 2,
          alignItems: 'center',
        }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel="Add a task">
          <View
            style={{
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: radius.control,
              backgroundColor: tp.orange,
              alignItems: 'center',
              justifyContent: 'center',
              ...shadow.fab,
            }}
          >
            <Glyph name="plus" size={24} tint="#FFFFFF" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
