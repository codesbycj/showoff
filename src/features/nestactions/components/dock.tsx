import { Pressable, View } from 'react-native';

import { DOCK_HEIGHT } from '../layout';
import { ne, radius } from '../theme';
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
          width: 48,
          height: 48,
          borderRadius: radius.pill,
          // MISTAKE 1.27 the tabs came in half-faded
          opacity: 0.35,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DockGlyph id={id} tint={on ? ne.onDock : ne.dockDim} />
      </View>
    </Pressable>
  );
}

/**
 * Where else the app goes.
 *
 * The dark bar is an absolutely-filled child rather than this View's own
 * `backgroundColor`: a container that carries its own fill is painted from
 * step one of the reveal, so the first frame of the recording would open on
 * a black band across the foot with nothing in it.
 */
export function Dock({
  active,
  bottom,
  onSelect,
}: {
  active: string;
  bottom: number;
  onSelect?: (id: string) => void;
}) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT + bottom,
        paddingBottom: bottom,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
{/* STEP 1.22 the bar
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ne.dock,
        }}
      />
*/}

{/* STEP 1.23 the wallet
      <Cell id="home" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.24 how it is doing
      <Cell id="perf" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.25 what has happened
      <Cell id="actions" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.26 and where it is kept
      <Cell id="vault" active={active} onSelect={onSelect} />
*/}
    </View>
  );
}
