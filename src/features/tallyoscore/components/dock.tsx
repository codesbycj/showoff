import { Pressable, View } from 'react-native';

import { DOCK_HEIGHT, DOCK_PILL, DOCK_TOP } from '../layout';
import { radius, ty } from '../theme';
import { DockGlyph } from './glyphs';

/** One tab. Written out in `Dock` so the reveal lands them one at a time. */
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
          width: on ? DOCK_PILL + 20 : DOCK_PILL,
          height: DOCK_PILL,
          borderRadius: radius.pill,
          backgroundColor: on ? ty.onDock : 'transparent',
          // MISTAKE 1.37 the lit tab came in squared off
          borderTopLeftRadius: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DockGlyph id={id} tint={on ? ty.ink : ty.dockDim} />
      </View>
    </Pressable>
  );
}

/**
 * Where else the app goes.
 *
 * A dark bar with the current tab in a white pill, which is the reference's
 * shape. The dark fill is an absolutely-filled child rather than this View's
 * own `backgroundColor`: a container that carries its own fill is painted
 * from step one of the reveal, so the first frame would open on a black bar
 * across the foot with nothing in it.
 */
export function Dock({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        marginTop: DOCK_TOP,
        borderRadius: radius.pill,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
      }}
    >
{/* STEP 1.31 the bar
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.pill,
          backgroundColor: ty.dock,
        }}
      />
*/}

{/* STEP 1.32 the tasks
      <Cell id="tasks" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.33 the figures
      <Cell id="stats" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.34 the settings
      <Cell id="settings" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.35 and you
      <Cell id="you" active={active} onSelect={onSelect} />
*/}
    </View>
  );
}
