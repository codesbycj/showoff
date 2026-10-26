import { Pressable, View } from 'react-native';

import { DOCK_HEIGHT, DOCK_TOP } from '../layout';
import { radius, type, vl } from '../theme';
import { DockGlyph } from './glyphs';
import { T } from './text';

/** One tab. Written out in `Dock` so the reveal lands them one at a time. */
function Cell({
  id,
  label,
  active,
  onSelect,
}: {
  id: string;
  label: string;
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
      accessibilityLabel={label}
    >
      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 7,
          borderRadius: radius.pill,
          backgroundColor: on ? vl.greenSoft : 'transparent',
          // MISTAKE 1.32 the lit tab came in squared off
          borderBottomRightRadius: 0,
          alignItems: 'center',
        }}
      >
        <DockGlyph id={id} tint={on ? vl.green : vl.faint} />
      </View>
      <T
        variant="tab"
        color={on ? vl.green : vl.faint}
        style={{ marginTop: 2, height: type.tab.line }}
      >
        {label}
      </T>
    </Pressable>
  );
}

/** Where else the app goes. */
export function Dock({ active, onSelect }: { active: string; onSelect?: (id: string) => void }) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        marginTop: DOCK_TOP,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
{/* STEP 1.28 home
      <Cell id="home" label="Home" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.29 bookings
      <Cell id="booking" label="Booking" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.30 the board
      <Cell id="rank" label="Rank" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.31 and you
      <Cell id="profile" label="Profile" active={active} onSelect={onSelect} />
*/}
    </View>
  );
}
