import { Image, Pressable, View } from 'react-native';

import { me } from '../data/bikes';
import { HEADER_SIZE } from '../layout';
import { radius, shadow, sp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The menu, and who is riding.
 *
 * The account is one control — the photograph, the name and the plan in a
 * single pill — rather than a disc with two lines beside it, so the whole
 * thing is the target instead of the 46dp circle at its end.
 */
export function TopBar() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Menu">
        <View
          style={{
            width: HEADER_SIZE,
            height: HEADER_SIZE,
            borderRadius: radius.control,
            backgroundColor: sp.card,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadow.card,
          }}
        >
          <Glyph name="menu" size={20} tint={sp.ink} />
        </View>
      </Pressable>

      <Pressable accessibilityRole="button" accessibilityLabel={`${me.name}, ${me.plan}`}>
        <View
          style={{
            height: HEADER_SIZE,
            paddingLeft: 5,
            paddingRight: 16,
            borderRadius: radius.pill,
            backgroundColor: sp.card,
            flexDirection: 'row',
            alignItems: 'center',
            ...shadow.card,
          }}
        >
          <Image source={me.src} style={{ width: 36, height: 36, borderRadius: radius.control }} />
          <View style={{ marginLeft: 10 }}>
            <T variant="name" color={sp.ink} style={{ height: type.name.line }}>
              {me.name}
            </T>
            <T variant="plan" color={sp.muted} style={{ height: type.plan.line }}>
              {me.plan}
            </T>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
