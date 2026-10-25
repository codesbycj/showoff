import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { tabs } from '../data/start';
import { TABBAR_HEIGHT } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/** The four destinations, drawn — an icon is an idea, and squarely in range. */
function TabGlyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'home') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          d="M4.4 10.4 12 4.6l7.6 5.8v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          stroke={tint}
          strokeWidth={1.7}
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  if (id === 'cards') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Rect
          x={3.4}
          y={6}
          width={17.2}
          height={12}
          rx={2.6}
          stroke={tint}
          strokeWidth={1.7}
          fill="none"
        />
        <Path d="M3.4 10h17.2" stroke={tint} strokeWidth={1.7} />
      </Svg>
    );
  }
  if (id === 'stats') {
    return (
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          d="M6 16.4v-4M12 16.4V8M18 16.4v-6"
          stroke={tint}
          strokeWidth={1.9}
          strokeLinecap="round"
        />
        <Rect
          x={3.4}
          y={3.6}
          width={17.2}
          height={16.8}
          rx={3.4}
          stroke={tint}
          strokeWidth={1.5}
          fill="none"
          opacity={0.5}
        />
      </Svg>
    );
  }
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Circle cx={12} cy={8.6} r={3.6} stroke={tint} strokeWidth={1.7} fill="none" />
      <Path
        d="M5.4 19.4a6.6 6.6 0 0 1 13.2 0"
        stroke={tint}
        strokeWidth={1.7}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * Where else the app goes.
 *
 * A floating white pill rather than a bar welded to the screen's foot, which
 * is the reference's shape. The active tab is a dark pill with its label
 * beside the glyph, the others stack label under glyph — so the selected one
 * is wider and reads at a glance.
 *
 * The screen decides navigation; this takes `onSelect` and nothing else.
 */
export function TabBar({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  return (
    <View
      style={{
        height: TABBAR_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: kt.surface,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
      }}
    >
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <Pressable
            key={t.id}
            onPress={() => onSelect?.(t.id)}
            style={{ flex: on ? 1.5 : 1 }}
            accessibilityRole="tab"
            accessibilityLabel={t.label}
          >
            <View
              style={{
                height: 46,
                marginHorizontal: 3,
                borderRadius: radius.pill,
                backgroundColor: on ? kt.panel : 'transparent',
                flexDirection: on ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TabGlyph id={t.id} tint={on ? kt.ink : kt.onCanvasDim} />
              <T
                variant="tab"
                color={on ? kt.ink : kt.onCanvasDim}
                style={{
                  marginLeft: on ? 6 : 0,
                  marginTop: on ? 0 : 2,
                  height: type.tab.line,
                }}
              >
                {t.label}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
