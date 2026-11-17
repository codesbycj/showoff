import { Image, Pressable, View } from 'react-native';

import { activeShot, gallery, hero } from '../data/gym';
import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = {
  width: number;
  height: number;
  topInset: number;
  control: number;
  onBack: () => void;
};

/**
 * The venue photograph, with the back control over it.
 *
 * **This is the page's own ground for its region** (§5.5), so it may paint
 * before the chrome is staged over it.
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7).
 *
 * **The pager's dot count is `gallery.length`**, not a typed number, so it
 * cannot disagree with the rail of shots behind it (R9). The dots sit wholly
 * inside the photograph, so nothing straddles its edge (R3).
 */
export function GymHero({ width, height, topInset, control, onBack }: Props) {
  return (
    <View style={{ width, height }}>
      {/* STEP 1.02 image
      <Image source={hero} style={{ width, height }} resizeMode="cover" />
      */}

      {/* STEP 1.03 "Back"
      <Pressable
        hitSlop={8}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={{ position: 'absolute', left: 16, top: topInset + 6 }}
      >
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              borderRadius: control / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
              shadowColor: '#0B1A0F',
              shadowOpacity: 0.18,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            }}
          >
            <Glyph name="back" size={19} color={ct.ink} />
          </View>
        )}
      </Pressable>
      */}

      {/* STEP 1.04 view
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 14,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {gallery.map((shot, i) => (
          <View
            key={shot.id}
            style={{
              width: i === activeShot ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === activeShot ? ct.white : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </View>
      */}
    </View>
  );
}
