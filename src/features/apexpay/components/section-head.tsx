import { Pressable, Text, View } from 'react-native';

import { ax, radius, type as t } from '../theme';
import { Symbol } from './symbol';

/**
 * A section title with a pill action beside it.
 *
 * The title is inset 4dp from the page margin (`px-1` on the row) where the
 * cards below it are not — so the heading sits a touch inside the card edge
 * rather than flush with it.
 */
export function SectionHead({ title, action }: { title: string; action: string }) {
  return (
    <View
      style={{
        height: 32,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={[t.headlineSm, { color: ax.ink }]}>{title}</Text>
      <Pressable
        accessibilityRole="button"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: radius.full,
          backgroundColor: ax.surfaceHigh,
        }}
      >
        <Symbol name="add" size={16} color={ax.inkMuted} />
        <Text style={[t.body13, { color: ax.inkMuted }]}>{action}</Text>
      </Pressable>
    </View>
  );
}
