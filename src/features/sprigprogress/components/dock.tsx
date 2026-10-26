import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { DOCK_HEIGHT, FAB } from '../layout';
import { radius, sg } from '../theme';

/** The four destinations, drawn. */
function Glyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'day') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M4.4 13.4h15.2a1 1 0 0 1 1 1.2 9 9 0 0 1-8.6 6.2 9 9 0 0 1-8.6-6.2 1 1 0 0 1 1-1.2Z"
          fill={tint}
        />
        <Path
          d="M8.6 10.2c0-2 2.4-2.2 2.4-4.2M13 10.2c0-2 2.4-2.2 2.4-4.2"
          stroke={tint}
          strokeWidth={1.7}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }
  if (id === 'plan') {
    // A calendar, because the destination is the week's plan. The bowl shape
    // this started as read as a second copy of the day tab at 20dp.
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M4.4 6.6h15.2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z"
          stroke={tint}
          strokeWidth={1.7}
          strokeLinejoin="round"
          fill="none"
        />
        <Path d="M3.4 11h17.2" stroke={tint} strokeWidth={1.7} strokeLinecap="round" />
        <Path d="M8 3.4v4M16 3.4v4" stroke={tint} strokeWidth={1.7} strokeLinecap="round" />
      </Svg>
    );
  }
  if (id === 'burn') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M13 2.6c3 3.1 4.2 5.2 4.2 7.3 0 .9-.3 1.7-.8 2.3.8-.2 1.5-.8 2-1.6 1 1.6 1.6 3.2 1.6 4.8 0 3.8-3.1 6.6-7 6.6s-7-2.8-7-6.6c0-4 2.6-7.1 5.3-10.4.6 1 .8 2.1.6 3.2 1-1.4 1.4-3.4 1.1-5.6Z"
          fill={tint}
        />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={3.6} stroke={tint} strokeWidth={1.8} fill="none" />
      <Path
        d="M4.8 20.2c.6-3.6 3.6-5.6 7.2-5.6s6.6 2 7.2 5.6"
        stroke={tint}
        strokeWidth={1.8}
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
      style={{ flex: 1, alignItems: 'center' }}
      accessibilityRole="tab"
      accessibilityState={{ selected: on }}
      accessibilityLabel={id}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.pill,
          backgroundColor: on ? sg.lime : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph id={id} tint={on ? sg.limeInk : sg.faint} />
      </View>
    </Pressable>
  );
}

/**
 * Where else the app goes, and the one thing this screen is for.
 *
 * **The add button sits in the row, not over it.** In the reference a black
 * FAB floats across the last meal row and covers half of it; here the row
 * leaves it a gap, so nothing is hidden behind it.
 */
export function Dock({
  active,
  onSelect,
  onAdd,
}: {
  active: string;
  onSelect?: (id: string) => void;
  onAdd?: () => void;
}) {
  return (
    <View style={{ height: DOCK_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
{/* STEP 1.28 the day and the plan
      <Cell id="day" active={active} onSelect={onSelect} />
      <Cell id="plan" active={active} onSelect={onSelect} />
*/}

{/* STEP 1.29 add something
      <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add food">
        <View
          style={{
            width: FAB,
            height: FAB,
            borderRadius: radius.pill,
            backgroundColor: sg.panel,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#1A2610',
            shadowOpacity: 0.26,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path
              d="M12 5v14M5 12h14"
              stroke={sg.onPanel}
              strokeWidth={2.3}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Pressable>
*/}

{/* STEP 1.30 what was burned, and you
      <Cell id="burn" active={active} onSelect={onSelect} />
      <Cell id="you" active={active} onSelect={onSelect} />
*/}
    </View>
  );
}
