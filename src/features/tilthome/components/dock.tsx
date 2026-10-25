import { Pressable, View } from 'react-native';

import { dock } from '../data/home';
import { DOCK_HEIGHT, DOCK_SIDE } from '../layout';
import { radius, shadow, tl } from '../theme';
import { Glyph } from './glyph';

/**
 * The dock, floating over the list.
 *
 * It floats rather than sitting under the content, so the payments run on
 * beneath it the way a real list does — which is what keeps the screen full to
 * its bottom edge.
 *
 * `overflow: 'hidden'` and `elevation` are never on the same `View`: the
 * combination is unreliable on Android, and the rounded bar does not need a
 * clip because nothing inside it reaches its edge.
 */
export function Dock({ active = 'home', bottom }: { active?: string; bottom: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: DOCK_SIDE,
        right: DOCK_SIDE,
        bottom: bottom + 10,
        height: DOCK_HEIGHT,
        borderRadius: radius.dock,
        backgroundColor: tl.navy,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadow.dock,
      }}
    >
{/* STEP 1.25 tab by tab
      {dock.map((d) => (
        <View key={d} style={{ flex: 1, alignItems: 'center' }}>
          <Pressable accessibilityRole="tab" accessibilityLabel={d} hitSlop={12}>
            <View style={{ padding: 6 }}>
              <Glyph name={d as 'home'} size={22} tint={d === active ? tl.onNavy : tl.navyMuted} />
              {d === 'bell' ? (
                <View
                  style={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                    width: 8,
                    height: 8,
                    borderRadius: radius.control,
                    backgroundColor: tl.alert,
                  }}
                />
              ) : null}
            </View>
          </Pressable>
        </View>
      ))}
*/}
    </View>
  );
}
