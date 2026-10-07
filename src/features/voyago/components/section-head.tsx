import { Pressable, Text, View } from 'react-native';

import { FONT, alpha, vy } from '../theme';

/**
 * A section title with its right-hand action — "Nearby Destination / View All"
 * and "Recommended Hotels / Dubai".
 *
 * The export sets the two at different sizes (16dp and 14dp) and gives the
 * second a label that is a place name rather than a link, so `size` is a prop
 * and `onAction` is optional. Without a handler the action still draws — it is
 * a caption in that case, which is what "Dubai" is.
 */
export function SectionHead({
  title,
  action,
  size = 16,
  onAction,
}: {
  title: string;
  action: string;
  size?: number;
  onAction?: () => void;
}) {
  const label = (
    <Text
      style={{
        fontFamily: FONT.medium,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: -0.3,
        color: alpha(vy.ink, 0.6),
      }}
    >
      {action}
    </Text>
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: size,
          lineHeight: size + 6,
          letterSpacing: size * -0.025,
          color: vy.ink,
        }}
      >
        {title}
      </Text>

      {onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          {label}
        </Pressable>
      ) : (
        label
      )}
    </View>
  );
}
