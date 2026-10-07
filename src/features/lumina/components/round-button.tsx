import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { LEVEL, ll } from '../theme';

/**
 * The circular icon button the design calls a "Circular Icon Trigger".
 *
 * It turns up on every screen at three sizes — 40dp in the headers, 44dp in the
 * home screen's media row, 32dp inside the chat dock — and in two fills, white
 * or lime.
 *
 * The visual box is an inner `View`, not the `Pressable` itself: a `Pressable`
 * whose style is a function is dropped entirely by the static web render, which
 * would silently cost this its size and fill in every harness shot.
 */
export function RoundButton({
  icon,
  glyph,
  size = 40,
  iconSize = 16,
  tone = 'white',
  color,
  strokeWidth = 2,
  lift = 'sm',
  onPress,
  label,
}: {
  icon?: IconName;
  /** A hand-drawn mark, for the few glyphs Lucide does not carry. */
  glyph?: ReactNode;
  size?: number;
  iconSize?: number;
  tone?: 'white' | 'lime';
  color?: string;
  strokeWidth?: number;
  /**
   * Which drop the reference gives this button. The header buttons carry
   * Tailwind's `shadow-sm`; the media row below the hero carries the much more
   * diffused `shadow-soft`, and a lime button carries its own glow.
   */
  lift?: 'sm' | 'soft' | 'none';
  onPress?: () => void;
  label?: string;
}) {
  const lime = tone === 'lime';

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: lime ? ll.lime : ll.surface,
          },
          !lime && { borderWidth: 1, borderColor: 'rgba(6,46,30,0.05)' },
          lime ? LEVEL.lime : lift === 'soft' ? LEVEL.card : lift === 'sm' ? LEVEL.sm : null,
        ]}
      >
        {glyph ?? (
          <Icon
            name={icon!}
            size={iconSize}
            color={color ?? (lime ? ll.ink : ll.muted)}
            strokeWidth={strokeWidth}
          />
        )}
      </View>
    </Pressable>
  );
}
