import { Text } from 'react-native';

import { bt, type as t } from '../theme';

/**
 * The small uppercase heading over a block — "CHEF'S NOTE", "SIGNATURE
 * INGREDIENTS".
 *
 * The export sets these as two different elements, an `h3` for one and a bare
 * `span` for the other, with identical classes on both. One component, since
 * the difference is Stitch's and not the design's.
 */
export function SectionHeading({ children }: { children: string }) {
  return (
    <Text
      style={{
        fontFamily: t.labelLg.family,
        fontSize: t.labelLg.size,
        lineHeight: t.labelLg.line,
        letterSpacing: t.labelLg.tracking,
        color: bt.inkVariant,
      }}
    >
      {children.toUpperCase()}
    </Text>
  );
}
