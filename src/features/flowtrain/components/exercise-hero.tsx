import { Image, Pressable, View } from 'react-native';

import { session } from '../data/train';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  width: number;
  height: number;
  insetTop: number;
  margin: number;
  onClose?: () => void;
};

/**
 * The exercise, and the two controls over it.
 *
 * **The board draws this as an illustration of a woman lifting.** An
 * illustration of a person is still a picture *of* a person, so the subject is
 * kept and the medium changes (I4).
 *
 * **R9: the pill counts the session's own exercises.** Both controls are 44dp
 * of real box (R7), and the pill sits on white rather than straight on the
 * photograph — a label on a frame is the contrast failure R4 exists for and
 * the audit cannot measure it over photography.
 */
export function ExerciseHero({ width, height, insetTop, margin, onClose }: Props) {
  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.white,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ height, backgroundColor: ct.tray }}>
      {/* STEP 1.02 image
      <Image source={session.image} style={{ width, height }} resizeMode="cover" />
      */}

      <View
        style={{
          position: 'absolute',
          top: insetTop + 4,
          left: margin,
          right: margin,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.03 "Leave the session"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Leave the session"
          onPress={onClose}
        >
          <View style={round}>
            <Glyph name="close" size={18} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>
        */}

        {/* STEP 1.04 view
        <View
          style={{
            height: 32,
            paddingHorizontal: 14,
            borderRadius: 16,
            backgroundColor: ct.white,
            justifyContent: 'center',
          }}
        >
          <T variant="pill">
            Exercise {session.exerciseAt} of {session.exerciseCount}
          </T>
        </View>
        */}

        {/* STEP 1.05 "Session options"
        <Pressable accessibilityRole="button" accessibilityLabel="Session options">
          <View style={round}>
            <Glyph name="more" size={18} color={ct.ink} />
          </View>
        </Pressable>
        */}
      </View>
    </View>
  );
}
