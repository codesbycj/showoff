import { Pressable, View } from 'react-native';

import { copy } from '../data/start';
import { BUTTON_HEIGHT } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * The one thing the screen is for.
 *
 * 56dp tall and the full width of the column — a primary action should be
 * the easiest thing on the page to hit, and this one is also the only navy
 * object below the fold, so it carries the weight without a second colour.
 */
export function CompleteButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={copy.primary}>
      <View
        style={{
          height: BUTTON_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: br.navy,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="primary" color={br.onNavy} style={{ height: type.primary.line }}>
          {copy.primary}
        </T>
      </View>
    </Pressable>
  );
}
