import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { tabs } from '../data/start';
import { FAB, TABBAR_HEIGHT } from '../layout';
import { on, radius } from '../theme';

/** The five destinations, drawn — icons are ideas, and squarely in range. */
function TabGlyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'home') {
    return (
      <Svg width={21} height={21} viewBox="0 0 24 24">
        <Path
          d="M4.4 10.4 12 4.4l7.6 6v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          fill={tint}
        />
      </Svg>
    );
  }
  if (id === 'docs') {
    return (
      <Svg width={21} height={21} viewBox="0 0 24 24">
        <Rect x={5} y={3.4} width={14} height={17.2} rx={3} fill={tint} />
        <Path
          d="M8.6 8.4h6.8M8.6 12h6.8M8.6 15.6h4"
          stroke={on.surface}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  if (id === 'alerts') {
    return (
      <Svg width={21} height={21} viewBox="0 0 24 24">
        <Path
          d="M12 3.8a5.6 5.6 0 0 0-5.6 5.6c0 3.5-1 5-1.8 5.9-.4.4-.1 1.1.5 1.1h13.8c.6 0 .9-.7.5-1.1-.8-.9-1.8-2.4-1.8-5.9A5.6 5.6 0 0 0 12 3.8Z"
          fill={tint}
        />
        <Path
          d="M10.1 19.2a2 2 0 0 0 3.8 0"
          stroke={tint}
          strokeWidth={1.7}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }
  return (
    <Svg width={21} height={21} viewBox="0 0 24 24">
      <Circle cx={12} cy={8.4} r={3.8} fill={tint} />
      <Path d="M5 20a7 7 0 0 1 14 0Z" fill={tint} />
    </Svg>
  );
}

/**
 * Where else the app goes, with the one thing it makes in the middle.
 *
 * The centre control is a raised circle rather than a fifth tab: it adds a
 * project, which is not a destination. The screen decides what each one does
 * — this takes `active` and `onSelect` and nothing else.
 */
export function TabBar({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  return (
    <View
      style={{
        height: TABBAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {tabs.map((t) =>
        t === 'add' ? (
          <View key={t} style={{ flex: 1, alignItems: 'center' }}>
            <Pressable
              onPress={() => onSelect?.(t)}
              accessibilityRole="button"
              accessibilityLabel="New project"
            >
              <View
                style={{
                  width: FAB,
                  height: FAB,
                  borderRadius: radius.pill,
                  backgroundColor: on.panel,
                  borderWidth: 3,
                  borderColor: on.canvas,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#0B0B0D',
                  shadowOpacity: 0.18,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 6,
                }}
              >
                <Svg width={20} height={20} viewBox="0 0 24 24">
                  <Path
                    d="M12 5.6v12.8M5.6 12h12.8"
                    stroke={on.onPanel}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            </Pressable>
          </View>
        ) : (
          <View key={t} style={{ flex: 1, alignItems: 'center' }}>
            <Pressable onPress={() => onSelect?.(t)} accessibilityRole="tab" accessibilityLabel={t}>
              <View
                style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}
              >
                <TabGlyph id={t} tint={t === active ? on.ink : on.faint} />
              </View>
            </Pressable>
          </View>
        ),
      )}
    </View>
  );
}
