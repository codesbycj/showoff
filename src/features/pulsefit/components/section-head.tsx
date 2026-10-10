import { Pressable, Text, View } from 'react-native';

import { TYPE, pf } from '../theme';

/**
 * A section title and its text action — "Today's Meals" / "See all".
 *
 * Inset 4dp from the page margin rather than flush with it, so the heading
 * lines up with the text inside the cards below rather than with their edges.
 */
export function SectionHead({
  title,
  action,
  onAction,
}: {
  title: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        height: 24,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={[TYPE.section, { color: pf.ink }]}>{title}</Text>

      <Pressable onPress={onAction} accessibilityRole="button" accessibilityLabel={action}>
        <Text style={[TYPE.link, { color: pf.primary }]}>{action}</Text>
      </Pressable>
    </View>
  );
}
