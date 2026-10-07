import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The profile's centred page title and its settings button.
 *
 * The export centres the title with a 40dp spacer opposite the 40dp button
 * rather than by absolute positioning, so the title is centred on the screen
 * and not on the space left over. That is rebuilt literally — the spacer is the
 * mechanism, and swapping it for `position: absolute` would drift the moment
 * the button changed size.
 */
export function ScreenTitle({ title, onSettings }: { title: string; onSettings?: () => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: SP.xs,
      }}
    >
      <View style={{ width: 40 }} />

      <Text style={{ ...TYPE.headlineMd, color: fa.onSurface }}>{title}</Text>

      <Pressable onPress={onSettings} accessibilityRole="button" accessibilityLabel="Settings">
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainerLow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="settings" size={20} />
        </View>
      </Pressable>
    </View>
  );
}
