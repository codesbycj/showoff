import { ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { TYPE, au } from '../theme';

/**
 * A section's title and the way to see all of it.
 *
 * `count` sits next to the title rather than under it, so the row stays one line
 * tall and every section on a screen starts at the same height.
 */
export function SectionHead({
  title,
  count,
  action,
  chevron,
  onPress,
}: {
  title: string;
  count?: string;
  action?: string;
  chevron?: boolean;
  onPress?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[TYPE.headlineMd, { color: au.onSurface }]}>{title}</Text>
      {count ? (
        <Text style={[TYPE.bodySm, { marginLeft: 8, color: au.onSurfaceVariant }]}>{count}</Text>
      ) : null}

      <View style={{ flex: 1 }} />

      {action ? (
        <Pressable onPress={onPress} hitSlop={8}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={[TYPE.labelLg, { color: au.primaryBright }]}>{action}</Text>
            {chevron ? <ChevronRight size={16} color={au.primaryBright} strokeWidth={2.6} /> : null}
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
