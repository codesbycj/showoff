import { Image, View } from 'react-native';

import { ROW_AVATAR, ROW_CHIP, ROW_HEIGHT, ROW_PAD } from '../layout';
import { radius, shadow, ss } from '../theme';
import { FACES } from './faces';
import { Icon } from './icon';
import { T } from './text';

/**
 * One assignment, above or below the picker.
 *
 * The grip on the left is the reference's own: these rows reorder, and a row
 * that can be dragged should say so. The status pill takes its colour from the
 * data so a new status cannot arrive without one.
 */
export function AssignmentRow({
  title,
  status,
  color,
  face,
}: {
  title: string;
  status: string;
  color: string;
  face: number;
}) {
  return (
    <View
      style={{
        height: ROW_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: ss.surface,
        paddingHorizontal: ROW_PAD,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadow.card,
      }}
    >
      {/* STEP 1.09 something to drag
      <Icon name="grip" size={16} color={ss.faint} />
      */}

      <T variant="row" color={ss.ink} style={{ marginLeft: 6 }} numberOfLines={1}>
        {title}
      </T>

      {/* STEP 1.10 where it has got to
      <View
        style={{
          marginLeft: 10,
          paddingHorizontal: 11,
          paddingVertical: 5,
          borderRadius: radius.pill,
          backgroundColor: color,
        }}
      >
        <T variant="pill" color={ss.onPill}>
          {status}
        </T>
      </View>
      */}

      <View style={{ flex: 1 }} />

      {/* STEP 1.11 when, and who
      <View
        style={{
          width: ROW_CHIP,
          height: ROW_CHIP,
          borderRadius: radius.full,
          backgroundColor: ss.chip,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        }}
      >
        <Icon name="calendar" size={15} color={ss.ink} />
      </View>
      */}

      <Image
        source={FACES[face % FACES.length]}
        style={{ width: ROW_AVATAR, height: ROW_AVATAR, borderRadius: radius.full }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}
