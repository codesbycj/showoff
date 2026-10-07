import { Pressable, Text, View } from 'react-native';

import { TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * A section heading with an action at the far right — "Send again" / "+ Add",
 * "History transaction" / "see more".
 *
 * The action takes an optional leading glyph rather than two components,
 * because the only difference between the two on this screen is whether there
 * is a `+` in front of the word.
 */
export function SectionHead({
  title,
  action,
  actionIcon,
  actionTone = ps.secondary,
  onAction,
}: {
  title: string;
  action?: string;
  actionIcon?: 'add';
  actionTone?: string;
  onAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={[TYPE.headlineSm, { color: ps.onSurface }]}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            {actionIcon ? <Symbol name={actionIcon} size={18} color={actionTone} /> : null}
            <Text style={[TYPE.labelMd, { color: actionTone }]}>{action}</Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
