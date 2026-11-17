import { Pressable, View } from 'react-native';

import { tabs } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { width: number; height: number; radius: number; bottom: number; disc: number };

/**
 * The floating dock.
 *
 * **It does not reserve the indicator's strip** (I11 / R1b). A floating pill
 * clears the edge by its own clearance and nothing more; padding it by
 * `insets.bottom` on top of that is what makes a bar 34-40dp longer than the
 * ink inside it. Its slack is even: a 64dp pill around a 44dp disc is 10dp
 * above and 10dp below.
 *
 * The shadow and `elevation` live in one style object, never a
 * `Platform.select` - a select is exactly what the web render cannot check
 * (I8).
 */
export function Dock({ width, height, radius, bottom, disc }: Props) {
  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom, alignItems: 'center' }}>
      <View
        style={{
          width,
          height,
          borderRadius: radius,
          backgroundColor: ct.dark,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 8,
          shadowColor: '#000000',
          shadowOpacity: 0.18,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 10,
        }}
      >
        {tabs.map((tab) => (
          <Pressable key={tab.id} accessibilityRole="tab" accessibilityLabel={tab.label}>
            <View
              style={{
                width: disc,
                height: disc,
                borderRadius: disc / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tab.on ? ct.white : 'transparent',
              }}
            >
              <Glyph
                name={tab.icon}
                size={20}
                color={tab.on ? ct.ink : ct.onDarkMuted}
                strokeWidth={1.8}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
