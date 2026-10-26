import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { DOCK_DISC, DOCK_HEIGHT } from '../layout';
import { ms, radius } from '../theme';

/** The four destinations, drawn. */
function Glyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'home') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Path
          d="M4.4 10.4 12 4.6l7.6 5.8v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          fill={tint}
        />
      </Svg>
    );
  }
  if (id === 'board') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Rect
          x={5}
          y={4}
          width={14}
          height={16}
          rx={3}
          stroke={tint}
          strokeWidth={1.8}
          fill="none"
        />
        <Path d="M9 3.4h6v3H9z" fill={tint} />
        <Path d="M8.6 11h6.8M8.6 15h4" stroke={tint} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  if (id === 'docs') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Path
          d="M6 3.6h7l5 5v11.8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.6a1 1 0 0 1 1-1Z"
          stroke={tint}
          strokeWidth={1.8}
          strokeLinejoin="round"
          fill="none"
        />
        <Path d="M13 3.6v5h5" stroke={tint} strokeWidth={1.8} strokeLinejoin="round" fill="none" />
      </Svg>
    );
  }
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24">
      <Circle cx={6} cy={12} r={1.8} fill={tint} />
      <Circle cx={12} cy={12} r={1.8} fill={tint} />
      <Circle cx={18} cy={12} r={1.8} fill={tint} />
    </Svg>
  );
}

/** One disc. Written out in `Dock` so the reveal lands them one at a time. */
function Cell({
  id,
  active,
  onSelect,
}: {
  id: string;
  active: string;
  onSelect?: (id: string) => void;
}) {
  const on = id === active;
  return (
    <Pressable
      onPress={() => onSelect?.(id)}
      style={{ flex: 1, alignItems: 'center' }}
      accessibilityRole="tab"
      accessibilityState={{ selected: on }}
      accessibilityLabel={id}
    >
      <View
        style={{
          width: DOCK_DISC,
          height: DOCK_DISC,
          borderRadius: radius.pill,
          backgroundColor: on ? ms.panel : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph id={id} tint={on ? ms.onPanel : ms.faint} />
      </View>
    </Pressable>
  );
}

/**
 * Where else the app goes.
 *
 * A floating white pill rather than a bar welded to the foot, which is the
 * reference's shape. It carries `shadow*` and `elevation` together — a
 * `Platform.select` is what the web harness cannot check — and no
 * `overflow: 'hidden'`, because that pair is unreliable on Android.
 */
export function Dock({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  const cell = (id: string) => ({ id, active, onSelect });

  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: ms.card,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        shadowColor: '#2A1B12',
        shadowOpacity: 0.14,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
      }}
    >
      <Cell {...cell('home')} />
      <Cell {...cell('board')} />
      <Cell {...cell('docs')} />
      <Cell {...cell('more')} />
    </View>
  );
}
