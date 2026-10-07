import { Text, View } from 'react-native';

import { TYPE, au } from '../theme';

/**
 * A screen's title block.
 *
 * The trailing slot takes a node rather than a label and an icon name: across
 * the three screens that use this it holds a pill button, a date chip and a pair
 * of icon buttons, and nothing useful is shared between those but the position.
 *
 * The slot is aligned to the title's line rather than centred on the whole
 * block, so it does not drift downwards when the subtitle wraps.
 */
export function ScreenHead({
  title,
  subtitle,
  trailing,
}: {
  title: string;
  subtitle: string;
  trailing?: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={[TYPE.headlineLg, { color: au.onSurface }]}>{title}</Text>
        <Text style={[TYPE.bodyMd, { marginTop: 2, color: au.onSurfaceVariant }]}>{subtitle}</Text>
      </View>
      {trailing}
    </View>
  );
}
