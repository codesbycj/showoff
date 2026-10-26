import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { DOCK_DISC, DOCK_TOP } from '../layout';
import { nb, radius } from '../theme';

/** The three destinations, drawn. */
function Glyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'you') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Circle cx={12} cy={8} r={3.6} stroke={tint} strokeWidth={1.9} fill="none" />
        <Path
          d="M4.8 20.2c.6-3.6 3.6-5.6 7.2-5.6s6.6 2 7.2 5.6"
          stroke={tint}
          strokeWidth={1.9}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }
  if (id === 'week') {
    return (
      <Svg width={19} height={19} viewBox="0 0 24 24">
        <Rect
          x={4}
          y={6}
          width={16}
          height={14}
          rx={3.4}
          stroke={tint}
          strokeWidth={1.9}
          fill="none"
        />
        <Path
          d="M4 10.6h16M8.4 3.6v4M15.6 3.6v4"
          stroke={tint}
          strokeWidth={1.9}
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  return (
    <Svg width={19} height={19} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={3.2} stroke={tint} strokeWidth={1.9} fill="none" />
      <Path
        d="M4.4 8.4V6a1.6 1.6 0 0 1 1.6-1.6h2.4M19.6 8.4V6A1.6 1.6 0 0 0 18 4.4h-2.4M4.4 15.6V18a1.6 1.6 0 0 0 1.6 1.6h2.4M19.6 15.6V18a1.6 1.6 0 0 1-1.6 1.6h-2.4"
        stroke={tint}
        strokeWidth={1.9}
        strokeLinecap="round"
        fill="none"
      />
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
      accessibilityRole="tab"
      accessibilityState={{ selected: on }}
      accessibilityLabel={id}
    >
      <View
        style={{
          width: DOCK_DISC,
          height: DOCK_DISC,
          marginHorizontal: 5,
          borderRadius: radius.pill,
          backgroundColor: on ? nb.yellow : nb.well,
          // MISTAKE 1.40 the discs came in half-faded
          opacity: 0.4,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph id={id} tint={on ? nb.yellowInk : nb.muted} />
      </View>
    </Pressable>
  );
}

/**
 * Where else the app goes.
 *
 * Three discs centred rather than a bar across the foot, which is the
 * reference's shape — and it leaves the screen's own margins alone.
 */
export function Dock({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: DOCK_TOP,
      }}
    >
{/* STEP 1.36 you
      <Cell id="you" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.37 the week
      <Cell id="week" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.38 and the camera
      <Cell id="scan" active={active} onSelect={onSelect} />
*/}
    </View>
  );
}
