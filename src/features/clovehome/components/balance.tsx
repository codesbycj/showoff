import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ct, type } from '../theme';
import { copy } from '../data/home';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The figure the screen is about, and the control that hides it.
 *
 * The eye actually works. The reference draws it as decoration, but a
 * balance-hiding control that does nothing is the kind of detail that reads
 * as a mock-up the moment anyone touches it — and a real one costs one piece
 * of state.
 */
export function Balance() {
  const [hidden, setHidden] = useState(false);

  return (
    <View>
      <T variant="label" color={ct.muted} style={{ height: type.label.line }}>
        {copy.balanceLabel}
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
        <T variant="balance" color={ct.ink} style={{ height: type.balance.line }}>
          {hidden ? '••••••••' : copy.balance}
        </T>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? 'Show balance' : 'Hide balance'}
          onPress={() => setHidden((v) => !v)}
          style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}
        >
          <Glyph name="eye" size={21} tint={ct.ink} strokeWidth={1.6} />
        </Pressable>
      </View>
    </View>
  );
}
