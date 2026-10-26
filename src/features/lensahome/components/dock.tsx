import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { avatar } from '../data/start';
import { DOCK_HEIGHT, DOCK_TOP, FAB } from '../layout';
import { ls, radius } from '../theme';

/** The four destinations beside the shutter, drawn. */
function Glyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'boards') {
    return (
      <Svg width={21} height={21} viewBox="0 0 24 24">
        <Rect x={3.6} y={3.6} width={7} height={7} rx={2} fill={tint} />
        <Rect x={13.4} y={3.6} width={7} height={7} rx={2} fill={tint} />
        <Rect x={3.6} y={13.4} width={7} height={7} rx={2} fill={tint} />
        <Rect x={13.4} y={13.4} width={7} height={7} rx={2} fill={tint} />
      </Svg>
    );
  }
  if (id === 'stats') {
    return (
      <Svg width={21} height={21} viewBox="0 0 24 24">
        <Path
          d="M3.6 16.4 9 9.6l4.4 4.2L20.4 6"
          stroke={tint}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  return (
    <Svg width={21} height={21} viewBox="0 0 24 24">
      <Path
        d="M4.4 5.4h15.2a1 1 0 0 1 1 1v8.4a1 1 0 0 1-1 1H9.8L5.6 19.4v-3.6H4.4a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1Z"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

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
      <Glyph id={id} tint={on ? ls.limeDeep : ls.faint} />
    </Pressable>
  );
}

/**
 * Where else the app goes, and the one thing this app is for.
 *
 * The shutter is in the row rather than floating over it, so nothing on the
 * screen is hidden behind it. The avatar at the far end is a photograph — a
 * face is a picture, not an icon.
 */
export function Dock({
  active,
  onSelect,
  onShoot,
  onProfile,
}: {
  active: string;
  onSelect?: (id: string) => void;
  onShoot?: () => void;
  onProfile?: () => void;
}) {
  return (
    <View
      style={{
        height: DOCK_HEIGHT,
        // MISTAKE 1.34 the dock came in crushed against the foot
        maxHeight: 34,
        marginTop: DOCK_TOP,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
{/* STEP 1.28 the boards
      <Cell id="boards" active={active} onSelect={onSelect} />
*/}
{/* STEP 1.29 the figures
      <Cell id="stats" active={active} onSelect={onSelect} />
*/}

{/* STEP 1.30 the shutter
      <Pressable
        onPress={onShoot}
        accessibilityRole="button"
        accessibilityLabel="Photograph a meal"
      >
        <View
          style={{
            width: FAB,
            height: FAB,
            borderRadius: radius.pill,
            backgroundColor: ls.panel,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#1A2410',
            shadowOpacity: 0.24,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
        >
          <Svg width={23} height={23} viewBox="0 0 24 24">
            <Path
              d="M4.4 7.6h3.2l1.4-2.2h5.8l1.4 2.2h3.4a1 1 0 0 1 1 1v9.4a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1V8.6a1 1 0 0 1 1-1Z"
              stroke={ls.onPanel}
              strokeWidth={1.7}
              strokeLinejoin="round"
              fill="none"
            />
            <Circle cx={12} cy={13.2} r={3.4} stroke={ls.onPanel} strokeWidth={1.7} fill="none" />
          </Svg>
        </View>
      </Pressable>
*/}

{/* STEP 1.31 the coach
      <Cell id="chat" active={active} onSelect={onSelect} />
*/}

{/* STEP 1.32 and you
      <Pressable
        onPress={onProfile}
        style={{ flex: 1, alignItems: 'center' }}
        accessibilityRole="button"
        accessibilityLabel="Your profile"
      >
        <Image source={avatar} style={{ width: 34, height: 34, borderRadius: radius.pill }} />
      </Pressable>
*/}
    </View>
  );
}
