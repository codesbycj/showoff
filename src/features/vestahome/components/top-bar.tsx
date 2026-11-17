import { Image, Pressable, View } from 'react-native';

import { avatar, greeting } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; margin: number; pillH: number; avatarSize: number; control: number };

/**
 * The greeting pill and the bag.
 *
 * The avatar is a **photograph** (I4) — initials on a coloured disc is a
 * fallback state, not a substitute, and a screen built from one is visibly
 * missing something the board had.
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (RULES Part 7).
 */
export function TopBar({ height, margin, pillH, avatarSize, control }: Props) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* STEP 1.02 hello
      <Pressable accessibilityRole="button" accessibilityLabel={`${greeting.hello}, open account`}>
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              height: pillH,
              paddingLeft: 6,
              paddingRight: 12,
              borderRadius: pillH / 2,
              borderWidth: 1,
              borderColor: ct.fieldEdge,
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Image
              source={avatar}
              style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
            />
            <T variant="greeting">{greeting.hello}</T>
            <Glyph name="chevronDown" size={14} color={ct.sub} strokeWidth={2} />
          </View>
        )}
      </Pressable>
      */}

      {/* STEP 1.03 "Bag"
      <Pressable hitSlop={6} accessibilityRole="button" accessibilityLabel="Bag">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              borderRadius: control / 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: ct.fieldEdge,
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="bag" size={19} color={ct.ink} />
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}
