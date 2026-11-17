import { Pressable, View } from 'react-native';

import { chips } from '../data/swap';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number };

/**
 * 25 / 50 / Max.
 *
 * Each chip is 24dp tall — the reference's own size — which is under R7's
 * 44dp, so each carries `hitSlop` that takes the real target past it. The
 * warning is named in the handover rather than fixed by inflating a chip the
 * design draws small.
 */
export function PercentChips({ height }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {chips.map((c) => (
        <Pressable
          key={c.id}
          hitSlop={{ top: 12, bottom: 12, left: 6, right: 6 }}
          accessibilityRole="button"
          accessibilityLabel={`Pay ${c.label}`}
        >
          {({ pressed }) => (
            <View
              style={{
                height,
                paddingHorizontal: 10,
                borderRadius: height / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.chip,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <T variant="chip">{c.label}</T>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
