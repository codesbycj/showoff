import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al } from '../theme';

import { Symbol } from './symbol';

/**
 * "Top Rated Legal Experts · 12 Online · See All".
 *
 * The count is a pill rather than running text, and the action is emerald with
 * a chevron — both are the design system's own conventions for a section head,
 * so they are props rather than being assembled in the screen.
 */
export function SectionHead({
  title,
  count,
  action,
  onAction,
}: {
  title: string;
  count: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SP.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
        <Text style={{ ...TYPE.titleMd, color: al.onSurface }}>{title}</Text>
        <View
          style={{
            paddingHorizontal: SP.sm,
            paddingVertical: 2,
            borderRadius: R.full,
            backgroundColor: al.surfaceContainerHigh,
          }}
        >
          <Text style={{ ...TYPE.labelSm, color: al.onSurfaceVariant }}>{count}</Text>
        </View>
      </View>

      <Pressable onPress={onAction} hitSlop={8}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={{ ...TYPE.labelMd, color: al.secondary }}>{action}</Text>
          <Symbol name="chevronRight" size={16} color={al.secondary} />
        </View>
      </Pressable>
    </View>
  );
}
