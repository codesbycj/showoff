import { Pressable, View } from 'react-native';

import { welcome } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onPress: () => void };

/**
 * The primary action.
 *
 * The dark fill lives on an absolutely-filled child, so an emptied button
 * paints nothing during a reveal rather than opening the take on a black pill
 * (§5.5) — and the label and the arrow are separate beats, as the board draws
 * them.
 *
 * The arrow sits in a lifted `View` because an `<svg>` paints BELOW a
 * positioned sibling on web: the absolutely-filled ground hides it outright
 * while the text beside it survives, so the icon just looks missing (§7).
 * This note lives here rather than beside the JSX, because a `{...}` comment
 * inside a staged block closes the comment that stages it (§5.7).
 */
export function StartButton({ margin, height, onPress }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="button" accessibilityLabel={welcome.cta} onPress={onPress}>
        <View
          style={{
            height,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: height / 2,
              backgroundColor: ct.dark,
            }}
          />

          <T variant="cta">{welcome.cta}</T>

          <View style={{ zIndex: 1 }}>
            <Glyph name="arrow" size={18} color={ct.onDark} strokeWidth={1.9} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
