import { Pressable, View } from 'react-native';

import { dd } from '../theme';
import { T } from './text';

/**
 * A section heading, with an optional link on the right.
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
      <T variant="section" color={dd.ink}>
        {title}
      </T>
      {action ? (
        <Pressable onPress={onPress} hitSlop={10} accessibilityRole="button">
          <T variant="link" color={dd.blue}>
            {action}
          </T>
        </Pressable>
      ) : null}
    </View>
  );
}
