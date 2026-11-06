import { Pressable, View } from 'react-native';

import { BELL, GREET_SUB_GAP } from '../layout';
import { ct, type } from '../theme';
import { copy, unread } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Who is looking at the screen, and what is waiting for them.
 *
 * The bell is a 44dp control with a 26dp glyph inside it, rather than a 26dp
 * control: the badge makes it look bigger than it is and a 26dp target is
 * below the floor on every platform.
 */
export function Greeting({ onBell }: { onBell?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex: 1 }}>
        <T variant="greeting" color={ct.ink} style={{ height: type.greeting.line }}>
          {copy.greeting}
        </T>
        <T
          variant="sub"
          color={ct.muted}
          style={{ height: type.sub.line, marginTop: GREET_SUB_GAP }}
        >
          {copy.welcome}
        </T>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Notifications, ${unread} unread`}
        onPress={onBell}
        style={{ width: 44, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}
      >
        <View>
          <Glyph name="bell" size={BELL} tint={ct.ink} />
          <View
            style={{
              position: 'absolute',
              top: -4,
              right: -5,
              minWidth: 17,
              height: 17,
              borderRadius: 9,
              paddingHorizontal: 4,
              backgroundColor: ct.alert,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="badge" color="#FFFFFF" style={{ height: type.badge.line }}>
              {String(unread)}
            </T>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
