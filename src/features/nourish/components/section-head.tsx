import { Pressable, View } from 'react-native';

import { nr } from '../theme';
import { T } from './text';

/**
 * A section heading, with an optional link on the right.
 *
 * The link is a prop rather than a fixed "See All" so the same component can
 * head a section that has nowhere to go — "Today" has no link in the
 * reference and "Food Log" does.
 *
 * `onPress` is a prop, not a `router.push`: screens decide navigation,
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
      <T variant="section" color={nr.ink}>
        {title}
      </T>

      {action ? (
        <Pressable onPress={onPress} hitSlop={12} accessibilityRole="button">
          <T variant="link" color={nr.muted}>
            {action}
          </T>
        </Pressable>
      ) : null}
    </View>
  );
}
