import { Pressable, View } from 'react-native';

import { session } from '../data/run';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onLock?: () => void };

/** What is being recorded, and the control that locks the screen. */
export function RunHeader({ margin, height, onLock }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
        {/* STEP 1.02 view
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ct.lime }} />
        */}
        {/* STEP 1.03 state
        <T variant="label" style={{ color: ct.lime }}>
          {session.state}
        </T>
        */}
      </View>

      {/* STEP 1.04 "Lock the screen"
      <Pressable accessibilityRole="button" accessibilityLabel="Lock the screen" onPress={onLock}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.cardSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="lock" size={19} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
