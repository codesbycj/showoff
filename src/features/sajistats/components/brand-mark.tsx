import { Image, View } from 'react-native';

import { ROW_MARK } from '../layout';
import { radius, sj } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * The disc at the start of a history row.
 *
 * A person gets their photograph; a merchant gets a disc with a short
 * wordmark on it. The merchants' real marks are trademarks and not
 * redistributable, so these stand in for them: the disc takes the brand's
 * colour and the name is set in the screen's own face.
 *
 * The ink is chosen from the disc's own colour rather than passed in, so a new
 * brand cannot be added with unreadable text on it.
 */
export function BrandMark({
  label,
  color,
  face,
}: {
  label: string;
  color: string;
  /** A person, rather than a merchant: show their photograph instead. */
  face?: number;
}) {
  const light = color === sj.marks[2];

  if (face !== undefined) {
    return (
      <Image
        source={FACES[face % FACES.length]}
        style={{ width: ROW_MARK, height: ROW_MARK, borderRadius: radius.full }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    );
  }

  return (
    <View
      style={{
        width: ROW_MARK,
        height: ROW_MARK,
        borderRadius: radius.full,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <T
        variant="mark"
        color={light ? sj.ink : '#ffffff'}
        style={{ fontSize: label.length > 2 ? 9 : 11 }}
      >
        {label}
      </T>
    </View>
  );
}
