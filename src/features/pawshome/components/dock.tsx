import { Pressable, View } from 'react-native';

import { tabs } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; onCart?: () => void };

/**
 * The navigation.
 *
 * **It does not reserve the indicator's strip.** A pinned, full-width bar is
 * its own height and nothing more; padding it by `insets.bottom` as well
 * counts the system's space twice and produces a bar taller than its contents
 * with the ink floating in the top of it (I11, R1b).
 *
 * The white fill lives on an absolutely-filled child so an emptied dock paints
 * nothing during a reveal (SS5.5).
 */
export function Dock({ height, onCart }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ct.white,
          borderTopWidth: 1,
          borderTopColor: ct.line,
        }}
      />

      {/* STEP 1.23 label
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          accessibilityRole="tab"
          accessibilityState={{ selected: !!tab.on }}
          accessibilityLabel={tab.label}
          onPress={tab.id === 'cart' ? onCart : undefined}
          style={{ flex: 1, height, alignItems: 'center', justifyContent: 'center', gap: 4 }}
        >
          <Glyph
            name={tab.glyph}
            size={20}
            color={tab.on ? ct.ink : ct.muted}
            strokeWidth={tab.on ? 2 : 1.6}
          />
          <T variant={tab.on ? 'tabOn' : 'tabOff'}>{tab.label}</T>
        </Pressable>
      ))}
      */}
    </View>
  );
}
