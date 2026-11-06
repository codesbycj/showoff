import { Image } from 'expo-image';
import { View } from 'react-native';

import { STACK } from '../layout';
import { ct, type } from '../theme';
import { copy, faces } from '../data/event';
import { T } from './text';

/**
 * Who is already going, and how many places are left.
 *
 * In the reference this line is underneath the floating button and only half
 * of it is readable. It is the sentence that explains why the button says
 * "waitlist", so it is above the footer here rather than behind it.
 */
export function GoingRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {faces.map((f, i) => (
        <View
          key={i}
          style={{
            width: STACK,
            height: STACK,
            borderRadius: STACK / 2,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: ct.page,
            marginLeft: i === 0 ? 0 : -9,
          }}
        >
          <Image source={f} style={{ width: STACK - 4, height: STACK - 4 }} contentFit="cover" />
        </View>
      ))}
      <T variant="going" color={ct.muted} style={{ height: type.going.line, marginLeft: 10 }}>
        {copy.going}
      </T>
      <View
        style={{
          width: 3,
          height: 3,
          borderRadius: 2,
          backgroundColor: ct.muted,
          marginHorizontal: 8,
        }}
      />
      <T variant="goingStrong" color={ct.ink} style={{ height: type.goingStrong.line }}>
        {copy.left}
      </T>
    </View>
  );
}
