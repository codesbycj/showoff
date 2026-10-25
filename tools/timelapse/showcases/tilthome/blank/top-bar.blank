import { Image, Pressable, View } from 'react-native';

import { copy, me } from '../data/home';
import { HEADER_SIZE } from '../layout';
import { radius, tl, type } from '../theme';
import { BrandMark, Glyph } from './glyph';
import { T } from './text';

/**
 * The brand, and whoever is signed in.
 *
 * The "+" overlaps the avatar the way the reference has it, but it is its own
 * `Pressable` rather than decoration on the photograph — it adds an account,
 * which is a different thing from opening yours, and two actions sharing one
 * target is how you end up in the wrong place.
 */
export function TopBar() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
{/* STEP 1.03 the brand
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <BrandMark size={24} tint={tl.ink} />
        <T variant="brand" color={tl.ink} style={{ marginLeft: 7, height: type.brand.line }}>
          {copy.brand}
        </T>
      </View>
*/}

{/* STEP 1.04 and the account
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Your account">
          <Image
            source={me}
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: radius.control,
              borderWidth: 2,
              borderColor: tl.violet,
            }}
          />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Add an account" hitSlop={8}>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: radius.control,
              backgroundColor: tl.violet,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -12,
              borderWidth: 2.5,
              borderColor: tl.canvas,
            }}
          >
            <Glyph name="plus" size={14} tint={tl.onNavy} />
          </View>
        </Pressable>
      </View>
*/}
    </View>
  );
}
