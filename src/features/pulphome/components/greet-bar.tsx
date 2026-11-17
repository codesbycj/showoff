import { Image, Pressable, View } from 'react-native';

import { avatar, header } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who is holding the phone, and the one control that leaves the screen.
 *
 * The portrait is a photograph, the search mark is a vector (I4).
 */
export function GreetBar({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={avatar} style={{ width: 36, height: 36, borderRadius: 18 }} />
        {/* STEP 1.02 hello
        <T variant="greet">{header.hello}</T>
        */}
      </View>

      {/* STEP 1.03 "Search"
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search"
        hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="search" size={18} color={ct.ink} strokeWidth={1.8} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
