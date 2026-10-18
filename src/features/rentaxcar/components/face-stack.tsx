import { View } from 'react-native';

import { radius, rx } from '../theme';

/**
 * The overlapping circles that stand for "people have reviewed this".
 *
 * The reference uses photographs of faces. Photographs of real people are not
 * redistributable, and at 20dp overlapping by half there is nothing of a face
 * left to see anyway — so these are plain discs, which is what the mark
 * actually communicates.
 */
export function FaceStack({ size = 20, ring }: { size?: number; ring: string }) {
  return (
    <View style={{ flexDirection: 'row' }}>
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
