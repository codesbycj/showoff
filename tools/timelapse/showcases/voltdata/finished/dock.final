import { Pressable, View } from 'react-native';

import { copy, dock } from '../data/data';
import { DOCK_HEIGHT } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Three places to go, and the one thing to do.
 *
 * The chat pill takes the rest of the bar in the accent, for the same reason
 * the "+" does upstairs: it is the action, and an action that looks like the
 * navigation beside it gets read as more navigation.
 */
export function Dock() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      {dock.map((d) => (
        <Pressable key={d} accessibilityRole="tab" accessibilityLabel={d}>
          <View
            style={{
              width: DOCK_HEIGHT,
              height: DOCK_HEIGHT,
              borderRadius: radius.tile,
              backgroundColor: vt.slab,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name={d} size={21} tint={vt.body} />
          </View>
        </Pressable>
      ))}

      <Pressable style={{ flex: 1 }} accessibilityRole="button" accessibilityLabel={copy.chat}>
        <View
          style={{
            height: DOCK_HEIGHT,
            borderRadius: radius.control,
            backgroundColor: vt.acid,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="action" color={vt.onAcid} style={{ height: type.action.line }}>
            {copy.chat}
          </T>
          <View style={{ marginLeft: 6 }}>
            <Glyph name="bolt" size={16} tint={vt.onAcid} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
