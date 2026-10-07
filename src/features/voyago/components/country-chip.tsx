import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, alpha, vy } from '../theme';

/**
 * One destination chip in the country selector.
 *
 * The export draws three states and they are genuinely three shapes, not one
 * shape recoloured:
 *
 *  - **selected** — white pill, ink label;
 *  - **unselected** — ink pill, white label;
 *  - **image only** — a 4dp-padded translucent disc with no label at all, 4dp
 *    shorter than the other two and with a slightly wider thumbnail (`w-8 h-7`,
 *    which the circular mask crops back to a circle).
 *
 * Passing `label: null` selects the third, so the row stays a plain `map` over
 * the data rather than a conditional in the screen.
 */
export function CountryChip({
  label,
  image,
  selected = false,
  onPress,
}: {
  label: string | null;
  image: number;
  selected?: boolean;
  onPress?: () => void;
}) {
  const bare = label === null;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label ?? undefined}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: R.full,
          backgroundColor: bare ? alpha(vy.white, 0.4) : selected ? vy.white : vy.ink,
          borderWidth: bare ? 1 : 0,
          borderColor: alpha(vy.white, 0.2),
          paddingLeft: bare ? 4 : 6,
          paddingRight: bare ? 4 : 16,
          paddingVertical: bare ? 4 : 6,
          shadowColor: vy.ink,
          shadowOpacity: bare ? 0 : 0.08,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 1 },
          elevation: bare ? 0 : 1,
        }}
      >
        <Image
          source={image}
          style={{ width: bare ? 32 : 28, height: 28, borderRadius: R.full }}
          contentFit="cover"
        />

        {!bare && (
          <Text
            style={{
              marginLeft: 8,
              fontFamily: FONT.bold,
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 0.3,
              color: selected ? vy.ink : vy.white,
            }}
          >
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
