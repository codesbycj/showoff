import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph } from './glyph';

type Props = { size: number; right: number; top: number };

/**
 * The control that swaps the two sides.
 *
 * It sits **on the seam** between the panels, which is the reference's own
 * design and the one place on this board where a control deliberately crosses
 * an edge. R3 allows that for a shape and calls it a WARN needing a reason —
 * the reason is that the seam is exactly what the control acts on. It never
 * crosses *text*: the panels' figures sit well clear of it, and covering text
 * would be a FAIL.
 *
 * The ring is drawn in the page's own black so the button reads as a hole
 * punched through both panels rather than a disc floating over them.
 */
export function FlipButton({ size, right, top }: Props) {
  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel="Swap the two assets"
      style={{ position: 'absolute', top, right, zIndex: 2 }}
    >
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.disc,
            borderWidth: 3,
            borderColor: ct.page,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name="flip" size={17} color={ct.ink} strokeWidth={2} />
        </View>
      )}
    </Pressable>
  );
}
