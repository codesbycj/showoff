import { Pressable, View } from 'react-native';

import { FOOT_HEIGHT } from '../layout';
import { radius, sk } from '../theme';
import { Glyph } from './glyph';

/**
 * Commit, or skip.
 *
 * Two discs in one track: the acid one takes the answer, the grey one moves on
 * without it. They are separate `Pressable`s rather than one control with a
 * chevron between them, because they do different things and a single target
 * would send half the taps to the wrong one.
 */
export function FootControl({
  onConfirm,
  onSkip,
}: {
  onConfirm?: () => void;
  onSkip?: () => void;
}) {
  const disc = FOOT_HEIGHT - 16;

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          height: FOOT_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          borderRadius: radius.pill,
          backgroundColor: sk.slab,
        }}
      >
        <Pressable
          onPress={onConfirm}
          accessibilityRole="button"
          accessibilityLabel="Confirm this answer"
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
        </Pressable>

        <View style={{ paddingHorizontal: 12 }}>
          <Glyph name="next" size={17} tint={sk.muted} />
        </View>

        <Pressable
          onPress={onSkip}
          accessibilityRole="button"
          accessibilityLabel="Skip this question"
        >
          <View
            style={{
              width: disc,
              height: disc,
              borderRadius: radius.control,
              backgroundColor: sk.disc,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="check" size={21} tint={sk.muted} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
