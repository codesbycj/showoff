import { Pressable, View } from 'react-native';

import { welcome } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; gap: number; onStart: () => void };

/**
 * The two ways in.
 *
 * Each button's fill lives on an **absolutely-filled child** rather than on
 * the box that holds the label (§5.5, I9): left on the box, an emptied button
 * still paints its own pill, so the take opens on two blank capsules instead
 * of on the photograph alone. It also makes the ground and the label separate
 * beats, which is what one-element-per-step means.
 */
export function StartActions({ margin, height, gap, onStart }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="button" accessibilityLabel={welcome.primary} onPress={onStart}>
        <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
          {/* STEP 1.11 view
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: height / 2,
              backgroundColor: ct.greenDeep,
            }}
          />
          */}
          {/* STEP 1.12 primary
          <T variant="ctaOn">{welcome.primary}</T>
          */}
        </View>
      </Pressable>

      <View style={{ height: gap }} />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={welcome.secondary}
        onPress={onStart}
      >
        <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
          {/* STEP 1.13 view
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: height / 2,
              borderWidth: 1.5,
              borderColor: ct.line,
            }}
          />
          */}
          {/* STEP 1.14 secondary
          <T variant="ctaOff">{welcome.secondary}</T>
          */}
        </View>
      </Pressable>
    </View>
  );
}
