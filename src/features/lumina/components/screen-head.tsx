import { Text, View } from 'react-native';

import type { IconName } from './icon';
import { RoundButton } from './round-button';
import { FONT, ll } from '../theme';

/**
 * The back / title / action bar the library and profile screens share.
 *
 * The title is centred by flanking it with two 40dp buttons, so it lands on the
 * screen's centre line without absolute positioning. When a screen has no
 * action the right side still reserves 40dp, which is why `action` is optional
 * rather than the caller passing a spacer.
 */
export function ScreenHead({
  title,
  action,
  onBack,
  onAction,
}: {
  title: string;
  action?: IconName;
  onBack?: () => void;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <RoundButton icon="back" iconSize={16} color={ll.ink} onPress={onBack} label="Go back" />

      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: 17,
          lineHeight: 24,
          letterSpacing: -0.34,
          color: ll.ink,
        }}
      >
        {title}
      </Text>

      {action ? (
        <RoundButton
          icon={action}
          iconSize={16}
          color={ll.ink}
          onPress={onAction}
          label="Options"
        />
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
}
