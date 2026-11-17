import { Image, Pressable, View } from 'react-native';

import { courier } from '../data/order';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Who is bringing it, and the two ways to reach them.
 *
 * The portrait is a photograph; the handset and the speech bubble are
 * interface, so they are vectors (I4).
 */
export function CourierRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View
        style={{
          flex: 1,
          height,
          borderRadius: height / 2,
          backgroundColor: ct.page,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingHorizontal: 10,
        }}
      >
        {/* STEP 1.22 image
        <Image source={courier.image} style={{ width: 40, height: 40, borderRadius: 20 }} />
        */}
        <View>
          {/* STEP 1.23 name
          <T variant="personName">{courier.name}</T>
          */}
          {/* STEP 1.24 role
          <T variant="personRole">{courier.role}</T>
          */}
        </View>
      </View>

      {/* STEP 1.25 glyph
      <Pressable accessibilityRole="button" accessibilityLabel={`Call ${courier.name}`}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="phone" size={19} color={ct.onDark} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}

      {/* STEP 1.26 glyph
      <Pressable accessibilityRole="button" accessibilityLabel={`Message ${courier.name}`}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="chat" size={19} color={ct.onDark} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
