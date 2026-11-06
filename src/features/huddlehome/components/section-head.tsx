import { Pressable, View } from 'react-native';

import { ct, type } from '../theme';
import { copy } from '../data/home';
import { T } from './text';

/** A section title with the way to see the rest of it. */
export function SectionHead({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
        {title}
      </T>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${copy.seeAll}: ${title}`}
        onPress={onSeeAll}
        style={{ paddingVertical: 13, paddingLeft: 12 }}
      >
        <T variant="seeAll" color={ct.muted} style={{ height: type.seeAll.line }}>
          {copy.seeAll}
        </T>
      </Pressable>
    </View>
  );
}
