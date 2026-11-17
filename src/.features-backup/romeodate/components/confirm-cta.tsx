import { Pressable, View } from 'react-native';

import { fields } from '../data/book';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; onPress?: () => void };

/**
 * The action the form ends on.
 *
 * **Invented.** The reference crops mid-form and shows no way to finish the
 * booking. I3 licenses filling the foot with the row the board cuts off, and a
 * booking screen you cannot submit is not a working app (I2). Named in the
 * handover as my call, not the reference's.
 *
 * It clears the home indicator and nothing more — `layout.ts` gives the notes
 * box the remainder, so the column fills the window exactly (I3, R1b).
 */
export function ConfirmCta({ margin, height, radius, onPress }: Props) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={{ marginHorizontal: margin }}>
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.accent,
            opacity: pressed ? 0.85 : 1,
            shadowColor: ct.accent,
            shadowOpacity: 0.3,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 4,
          }}
        >
          <T variant="ctaOn">{fields.confirm}</T>
        </View>
      )}
    </Pressable>
  );
}
