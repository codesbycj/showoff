import { Pressable, View } from 'react-native';

import { tabs } from '../data/explore';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { DockProps } from './_explore-parts-shared';

/**
 * The floating dock.
 *
 * **`bottomInset` is a lift, not a second strip** (R1b) — when the app is not
 * edge-to-edge the system already reserves its navigation strip, so adding
 * `insets.bottom` to a dock that already stops above it counts it twice.
 */
export function Dock({ width, height, lift, item, bottomInset, value, onSelect }: DockProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: bottomInset + lift,
        alignItems: 'center',
      }}
    >
      {/* STEP 1.22 label
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 8,
          backgroundColor: ct.card,
          borderWidth: 1,
          borderColor: ct.cardEdge,
          shadowColor: '#000000',
          shadowOpacity: 0.5,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
        }}
      >
        {tabs.map((t) => {
          const on = t.id === value;
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    height: item,
                    paddingHorizontal: on ? 13 : 9,
                    borderRadius: item / 2,
                    backgroundColor: on ? ct.lime : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                  }}
                >
                  <Glyph
                    name={t.glyph}
                    size={19}
                    color={on ? ct.onLime : ct.sub}
                    strokeWidth={1.9}
                  />
                  {on ? <T variant="tab">{t.label}</T> : null}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
      */}
    </View>
  );
}
