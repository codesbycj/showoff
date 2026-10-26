import { Pressable, View } from 'react-native';

import { FAB, TABBAR_HEIGHT } from '../layout';
import { cr, radius, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const LABELS: Record<string, string> = {
  home: 'Home',
  order: 'Order',
  tracking: 'Tracking',
  profile: 'Profile',
};

/** One destination. Written out in `TabBar` so the reveal lands them singly. */
function Tab({
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
      style={{ flex: 1 }}
      accessibilityRole="tab"
      accessibilityState={{ selected: on }}
      accessibilityLabel={LABELS[id]}
    >
      <View style={{ alignItems: 'center' }}>
        <Glyph name={id} size={20} tint={on ? cr.ink : cr.faint} />
        <T
          variant="tab"
          color={on ? cr.ink : cr.faint}
          style={{ marginTop: 3, height: type.tab.line }}
        >
          {LABELS[id]}
        </T>
      </View>
    </Pressable>
  );
}

/**
 * Where else the app goes, with the one thing it makes in the middle.
 *
 * The centre control is a raised orange disc rather than a fifth tab: sending
 * a parcel is an action, not a destination, and the reference draws it that
 * way too.
 */
export function TabBar({ active, onSend }: { active: string; onSend?: () => void }) {
  return (
    <View
      style={{
        height: TABBAR_HEIGHT,
        backgroundColor: cr.surface,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Tab id="home" active={active} />
      <Tab id="order" active={active} />

      <View style={{ flex: 1, alignItems: 'center' }}>
{/* STEP 1.28 and the one thing it makes
        <Pressable onPress={onSend} accessibilityRole="button" accessibilityLabel="Send a parcel">
          <View
            style={{
              width: FAB,
              height: FAB,
              borderRadius: radius.pill,
              backgroundColor: cr.orange,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#F4571E',
              shadowOpacity: 0.4,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }}
          >
            <Glyph name="send" size={21} tint={cr.onOrange} />
          </View>
        </Pressable>
*/}
      </View>

      <Tab id="tracking" active={active} />
      <Tab id="profile" active={active} />
    </View>
  );
}
