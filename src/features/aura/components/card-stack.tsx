import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * The second card, peeking out from behind the first.
 *
 * It is absolutely positioned and inset on both sides, so it reads as a card
 * sitting *under* the front one rather than beside it — and the front card is
 * ordinary flow on top, which means the stack is as tall as the front card and
 * the peek never affects the layout below.
 *
 * Only a 12dp strip of the amber card is ever visible. Its own label sits
 * below that line and is covered by the front card — the design keeps the
 * content there so the stack still reads as two real cards when the front one
 * is swiped away, rather than as a decorative bar.
 */
export function CardStack({
  peek,
  children,
}: {
  peek: { name: string; digits: string };
  children: React.ReactNode;
}) {
  return (
    <View>
      <LinearGradient
        colors={au.amberRamp}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          left: SP.md,
          right: SP.md,
          top: -12,
          height: 90,
          borderRadius: R.lg,
          paddingHorizontal: SP.md,
          paddingTop: 18,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[TYPE.labelSm, { color: au.onSecondaryContainer }]}>{peek.name}</Text>
          <Text style={[TYPE.labelSm, { color: au.onSecondaryContainer, letterSpacing: 2 }]}>
            {peek.digits}
          </Text>
        </View>
      </LinearGradient>

      {children}
    </View>
  );
}
