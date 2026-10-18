import { Image, View } from 'react-native';

import { BADGE } from '../layout';
import { radius, sg } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * A team member: their photograph, with their open-task count under it.
 *
 * The badge is a sibling positioned over the bottom of the circle rather than
 * a child of it — an `Image` cannot have children, and a badge inside a
 * clipped round box is the thing Android cuts off.
 */
export function Avatar({
  face,
  size,
  badge,
  badgeColor,
}: {
  face: number;
  size: number;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <View style={{ width: size, height: size + BADGE / 2 }}>
      <Image
        source={FACES[face % FACES.length]}
        style={{
          width: size,
          height: size,
          borderRadius: radius.full,
          borderWidth: 2,
          borderColor: sg.surface,
        }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      {badge ? (
        <View
          style={{
            position: 'absolute',
            left: size / 2 - BADGE / 2,
            top: size - BADGE / 2,
            width: BADGE,
            height: BADGE,
            borderRadius: radius.full,
            backgroundColor: badgeColor,
            borderWidth: 2,
            borderColor: sg.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="badge" color={sg.ink}>
            {badge}
          </T>
        </View>
      ) : null}
    </View>
  );
}
