import { Pressable, View } from 'react-native';

import { sections } from '../data/home';
import { qz } from '../theme';
import { T } from './text';

/**
 * A section's name, and the way out of it.
 *
 * The screen decides where "See All" goes, so this takes `onMore` rather than
 * navigating — adding a destination is then one line in the screen, not a
 * change here (AGENTS.md, "Layout").
 */
export function SectionHead({ title, onMore }: { title: string; onMore?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <T variant="section" color={qz.ink}>
        {title}
      </T>
      <Pressable onPress={onMore} accessibilityRole="button" accessibilityLabel={sections.more}>
        <T variant="more" color={qz.muted}>
          {sections.more}
        </T>
      </Pressable>
    </View>
  );
}
