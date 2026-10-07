import { Pressable, Text, View } from 'react-native';

import { SP, TYPE, R, vt } from '../theme';

import { Symbol } from './symbol';

/**
 * "Top Events ● / VIEW ALL ›".
 *
 * The lime dot beside the title is `animate-ping` in the export — a pulsing
 * halo. It is drawn static, as every other live indicator in this showcase is:
 * each check here is a screenshot, and an animated element lands at a different
 * opacity in every capture.
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
        <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{title}</Text>
        <View
          style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: vt.primaryFixed }}
        />
      </View>

      <Pressable onPress={onAction} hitSlop={8}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.primaryFixed }}>
            {action.toUpperCase()}
          </Text>
          <Symbol name="chevronRight" size={16} color={vt.primaryFixed} />
        </View>
      </Pressable>
    </View>
  );
}
