import { Pressable, View } from 'react-native';

import { ct, type } from '../theme';
import { copy } from '../data/start';
import { T } from './text';

/**
 * "Already have an account? Login".
 *
 * The whole line is the row, but only "Login" is the control — and it is
 * given a real 44dp box by padding the Pressable rather than by `hitSlop`.
 * hitSlop is native-only and invisible to the web render, so a target fixed
 * that way still reads as 35x18 to the audit and is genuinely untappable on
 * web. Padding is the fix that is true on both.
 */
export function LoginLine({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <T variant="foot" color={ct.inkSoft} style={{ height: type.foot.line }}>
        {copy.haveAccount}
      </T>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={copy.login}
        onPress={onPress}
        style={{ paddingVertical: 13, paddingHorizontal: 8 }}
      >
        <T variant="footStrong" color={ct.ink} style={{ height: type.footStrong.line }}>
          {copy.login}
        </T>
      </Pressable>
    </View>
  );
}
