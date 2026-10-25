import { Pressable, View } from 'react-native';

import { copy } from '../data/home';
import { tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * "Today Tasks" and the way to the rest of them.
 *
 * The link is a `Pressable` with padding rather than a bare run of text: a
 * text link is only as tall as its own line box — 16dp here — and the padding
 * buys it a thumb-sized target without moving the baseline it shares with the
 * heading.
 */
export function SectionHead({ onSeeAll }: { onSeeAll?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
{/* STEP 1.12 what the list is
      <T variant="section" color={tp.ink} style={{ height: type.section.line }}>
        {copy.section}
      </T>
*/}
{/* STEP 1.13 and the way to all of it
      <Pressable
        onPress={onSeeAll}
        accessibilityRole="link"
        accessibilityLabel={copy.sectionLink}
        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingLeft: 12 }}
      >
        <T variant="sectionLink" color={tp.body} style={{ height: type.sectionLink.line }}>
          {copy.sectionLink}
        </T>
        <Glyph name="chevron" size={15} tint={tp.body} />
      </Pressable>
*/}
    </View>
  );
}
