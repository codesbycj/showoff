import { Image, Pressable, View } from 'react-native';

import { me } from '../data/data';
import { HEADER_SIZE } from '../layout';
import { radius, vt } from '../theme';
import { Glyph } from './glyph';

/**
 * The assistant, the shortcut, the alerts, and who is signed in.
 *
 * Four discs of one size: three controls and a photograph. The bolt is the
 * only one filled in the accent, because it is the thing this app is for and
 * the other three are furniture.
 */
export function TopBar() {
  const disc = (fill: string) => ({
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.control,
    backgroundColor: fill,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Assistant">
        <View style={disc(vt.slab)}>
          <Glyph name="bolt" size={20} tint={vt.acid} />
        </View>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Shortcuts">
        <View style={disc(vt.slab)}>
          <Glyph name="command" size={19} tint={vt.ink} />
        </View>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Alerts">
        <View style={disc(vt.slab)}>
          <Glyph name="bell" size={19} tint={vt.ink} />
          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 13,
              width: 8,
              height: 8,
              borderRadius: radius.control,
              backgroundColor: vt.alert,
              borderWidth: 1.6,
              borderColor: vt.slab,
            }}
          />
        </View>
      </Pressable>
      <View style={{ flex: 1 }} />
      <Pressable accessibilityRole="button" accessibilityLabel="Your account">
        <Image
          source={me}
          style={{ width: HEADER_SIZE, height: HEADER_SIZE, borderRadius: radius.control }}
        />
      </Pressable>
    </View>
  );
}
