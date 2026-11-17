import { Pressable, View } from 'react-native';

import { spot } from '../data/spot';
import { ct } from '../theme';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  radius: number;
  gap: number;
  onMenu?: () => void;
  onBook?: () => void;
};

/**
 * The two actions the screen ends on.
 *
 * This is the last block in the column and it clears the home indicator and
 * nothing more — `layout.ts` sizes the hero as the remainder, so the stack
 * fills the window exactly and there is no band under this row (I3, R1b).
 *
 * The buttons are weighted 2:3 as the reference draws them: the secondary is
 * an outline so the primary is unmistakably the dominant action of the pair.
 */
export function CtaBar({ margin, height, radius, gap, onMenu, onBook }: Props) {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: margin, gap }}>
      <Pressable style={{ flex: 2 }} onPress={onMenu} accessibilityRole="button">
        {({ pressed }) => (
          <View
            style={{
              height,
              borderRadius: radius,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.surface,
              borderWidth: 1.4,
              borderColor: ct.chipBorder,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <T variant="cta">{spot.cta.secondary}</T>
          </View>
        )}
      </Pressable>

      <Pressable style={{ flex: 3 }} onPress={onBook} accessibilityRole="button">
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
            <T variant="ctaOn">{spot.cta.primary}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
