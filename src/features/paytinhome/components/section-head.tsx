import { Pressable, View } from 'react-native';

import { ph } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * A section heading with a "See all" on the right.
 *
 * The link is optional so the same component can head a section that has
 * nowhere to go, and `onPress` is a prop — screens decide navigation,
 * components never do.
 */
export function SectionHead({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <T variant="section" color={ph.text}>
        {title}
      </T>

      {action ? (
        <Pressable onPress={onPress} hitSlop={10} accessibilityRole="button">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <T variant="link" color={ph.muted}>
              {action}
            </T>
            <Icon name="next" size={14} color={ph.muted} strokeWidth={2} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
