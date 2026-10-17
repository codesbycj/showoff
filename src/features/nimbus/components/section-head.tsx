import { Pressable, View } from 'react-native';

import { nb } from '../theme';
import { T } from './text';

/**
 * A section's heading and its one link.
 *
 * The heading is the quieter of the two here — grey against the link's
 * near-black — which is the opposite of the usual arrangement and is what the
 * reference measures: #777 against #0f0f0f.
 */
export function SectionHead({
  title,
  action,
  onPress,
}: {
  title: string;
  action: string;
  onPress?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <T variant="sectionHead" color={nb.muted}>
        {title}
      </T>
      <Pressable onPress={onPress} accessibilityRole="button">
        <T variant="link" color={nb.ink}>
          {action}
        </T>
      </Pressable>
    </View>
  );
}
