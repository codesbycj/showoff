import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { SECTION_TOP } from '../layout';
import { ne, type } from '../theme';
import { T } from './text';

/**
 * A section's name, and the way into the rest of it.
 *
 * "See More" is a real `Pressable` with an accessible name that says what
 * more of — the reference's is a grey word with nothing behind it, and two
 * of them on one screen reading the same thing.
 */
export function SectionHead({
  label,
  of,
  first,
  onMore,
}: {
  label: string;
  of: string;
  first?: boolean;
  onMore?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: first ? SECTION_TOP : SECTION_TOP - 2,
      }}
    >
      <T variant="title" color={ne.ink} style={{ flex: 1, height: type.title.line }}>
        {label}
      </T>

      <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel={`See more ${of}`}>
        <T variant="more" color={ne.muted} style={{ height: type.more.line }}>
          {copy.more}
        </T>
      </Pressable>
    </View>
  );
}
