import { Pressable, View } from 'react-native';

import { action } from '../data/stock';
import { BUY_HEIGHT } from '../layout';
import { radius, sk, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The one thing this screen is for.
 *
 * The whole bar is the target, not the acid disc inside it — a 50dp disc at
 * one end of a 66dp bar invites half the taps to land on the bar and do
 * nothing.
 */
export function BuyBar({ onPress }: { onPress?: () => void }) {
  const disc = BUY_HEIGHT - 16;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={action}>
      <View
        style={{
          height: BUY_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: sk.dark,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            width: disc,
            height: disc,
            borderRadius: radius.control,
            backgroundColor: sk.acid,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="check" size={21} tint={sk.onAcid} />
        </View>
        <T
          variant="action"
          color={sk.onDark}
          style={{ flex: 1, textAlign: 'center', height: type.action.line }}
        >
          {action}
        </T>
        <View style={{ paddingRight: 16 }}>
          <Glyph name="next" size={17} tint={sk.muted} />
        </View>
      </View>
    </Pressable>
  );
}
