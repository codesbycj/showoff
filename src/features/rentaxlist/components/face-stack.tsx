import { View } from 'react-native';

import { radius, rx } from '../theme';

/**
 * The little overlapping circles that stand for "people have reviewed this".
 *
 * The reference uses photographs of faces. Photographs of real people are not
 * redistributable, and at 18dp overlapping by half there is nothing of a face
 * left to see anyway — so these are plain discs in the card's own palette,
 * which is what the mark actually communicates.
 *
 * The ring colour is a prop, not the brand yellow: the discs sit on two
 * differently coloured cards and a hardcoded ring reads as a mistake on the
 * one it was not chosen for.
 *
 * Each disc after the first is pulled back over the one before it with a
 * negative margin rather than being absolutely positioned, so the stack's
 * width is still its own and the rating beside it cannot overlap.
 */
export function FaceStack({ size = 18, ring }: { size?: number; ring: string }) {
  return (
    <View style={{ flexDirection: 'row', marginRight: 8 }}>
      {rx.faces.map((color, i) => (
        <View
          key={color}
          style={{
            width: size,
            height: size,
            borderRadius: radius.full,
            backgroundColor: color,
            borderWidth: 1.5,
            borderColor: ring,
            marginLeft: i === 0 ? 0 : -size * 0.38,
          }}
        />
      ))}
    </View>
  );
}
