import { Pressable, View } from 'react-native';

import { sources } from '../data/data';
import { SOURCE_GAP, SOURCE_SIZE } from '../layout';
import { radius, vt } from '../theme';
import { Glyph } from './glyph';

/**
 * Where the numbers come from, and the way to add another.
 *
 * The "+" takes the rest of the row rather than being a fourth disc: adding a
 * source is the action on this block, and a control that looks like the three
 * things it acts on reads as a fourth source.
 */
export function SourceRow({ onAdd }: { onAdd?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {sources.map((s, i) => (
        <Pressable key={s.id} accessibilityRole="button" accessibilityLabel="A connected source">
          <View
            style={{
              width: SOURCE_SIZE,
              height: SOURCE_SIZE,
              borderRadius: radius.tile,
              backgroundColor: vt.slab,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: i === 0 ? 0 : SOURCE_GAP,
            }}
          >
            <Glyph name={s.mark} size={24} tint={s.tint} />
          </View>
        </Pressable>
      ))}

      <Pressable
        onPress={onAdd}
        style={{ flex: 1 }}
        accessibilityRole="button"
        accessibilityLabel="Connect another source"
      >
        <View
          style={{
            height: SOURCE_SIZE,
            marginLeft: SOURCE_GAP,
            borderRadius: radius.control,
            backgroundColor: vt.acid,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="plus" size={22} tint={vt.onAcid} />
        </View>
      </Pressable>
    </View>
  );
}
