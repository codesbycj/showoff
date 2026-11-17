import { Pressable, View } from 'react-native';

import { send } from '../data/send';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onPress?: () => void };

/**
 * Slide to send.
 *
 * The track is the deeper orange, not the board's: white on #E8541B is
 * 3.7:1 and R4 wants 4.5 for a label this size. The lighter orange stays on
 * fills that carry no type.
 *
 * The handle is drawn inside the track rather than animated: the web render
 * cannot verify a gesture, and a pan over a `Pressable` fires both events on
 * web anyway (§7). What the screen has to show is the control, and it does.
 */
export function SlideSend({ margin, height, onPress }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="button" accessibilityLabel={send.cta} onPress={onPress}>
        <View
          style={{
            height,
            borderRadius: height / 2,
            backgroundColor: ct.accentDeep,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 7,
          }}
        >
          {/* STEP 1.31 glyph
          <View
            style={{
              width: height - 14,
              height: height - 14,
              borderRadius: (height - 14) / 2,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="arrow" size={21} color={ct.accentDeep} strokeWidth={2} />
          </View>
          */}

          {/* STEP 1.32 cta
          <View style={{ flex: 1, alignItems: 'center' }}>
            <T variant="cta">{send.cta}</T>
          </View>
          */}

          {/* STEP 1.33 view
          <View style={{ width: height - 14 }} />
          */}
        </View>
      </Pressable>
    </View>
  );
}
