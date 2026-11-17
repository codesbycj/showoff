import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

type Props = {
  icon: GlyphName;
  size: number;
  onPress?: () => void;
  accessibilityLabel: string;
};

/**
 * A circular glass control floating on the photograph.
 *
 * **The visual box is an inner `View`, not the `Pressable`.** A function style
 * (`style={({pressed}) => …}`) is silently dropped in the static web render and
 * the control loses its height and fill (RULES Part 7). The pressed state rides
 * on opacity, which survives.
 *
 * Sized 44dp rather than the reference's ~36: R7 wants every control at 44 in
 * both directions, and a floating control on a photograph is exactly the one
 * people miss. Noted as a deviation in the handover.
 */
export function Orb({ icon, size, onPress, accessibilityLabel }: Props) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.glass,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)',
            opacity: pressed ? 0.6 : 1,
          }}
        >
          <Glyph name={icon} size={Math.round(size * 0.46)} color={ct.onPhoto} />
        </View>
      )}
    </Pressable>
  );
}
