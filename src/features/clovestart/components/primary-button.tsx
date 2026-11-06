import { Pressable, View } from 'react-native';

import { BUTTON_H } from '../layout';
import { ct, radius, type } from '../theme';
import { T } from './text';

/**
 * The one control that matters on this screen.
 *
 * The visual box is an inner `View`, not a function style on the `Pressable`:
 * `style={({ pressed }) => …}` is dropped in a static render, which silently
 * loses the height and the fill. The pressed state is carried as a child
 * instead, so the button still has a box when nothing is pressing it.
 */
export function PrimaryButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            height: BUTTON_H,
            borderRadius: radius.button,
            backgroundColor: ct.ink,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.88 : 1,
            shadowColor: '#0B2A0C',
            shadowOpacity: 0.22,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          <T variant="button" color={ct.onInk} style={{ height: type.button.line }}>
            {label}
          </T>
        </View>
      )}
    </Pressable>
  );
}
