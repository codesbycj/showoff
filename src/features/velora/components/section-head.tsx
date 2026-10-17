import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { T } from './text';
import { vl } from '../theme';

/**
 * A section's title, and the link that opens the rest of it.
 *
 * Used twice, which is the whole reason it is a component: the two headings
 * have to sit on the same baseline and use the same pair of weights, and a
 * second hand-rolled row is how that stops being true.
 *
 * It takes a `style` rather than being wrapped by its caller. The categories
 * heading holds the page margin while the row of chips beneath it does not,
 * so one of the two needs the padding and the other must not have it —
 * passing it in keeps that a property of the heading instead of an extra
 * wrapper view in the screen.
 */
export function SectionHead({
  title,
  action,
  onAction,
  style,
}: {
  title: string;
  action: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
        style,
      ]}
    >
      <T variant="section" color={vl.ink}>
        {title}
      </T>
      <Pressable
        onPress={onAction}
        accessibilityRole="button"
        accessibilityLabel={`${action} — ${title}`}
      >
        {/* Green, not grey. The reference runs its accent through the two
            "See all" links and the active tab as well as the promo card, and
            that is most of what stops the page reading as a wireframe. */}
        <T variant="action" color={vl.limeDeep}>
          {action}
        </T>
      </Pressable>
    </View>
  );
}
