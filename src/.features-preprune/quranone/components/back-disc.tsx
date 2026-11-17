import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ct } from '../theme';
import { BackProps } from './_onboard-parts-shared';

/** The back control on screens two and three of the flow. */
export function BackDisc({ size, onPress }: BackProps) {
  return (
    <Pressable hitSlop={6} onPress={onPress} accessibilityRole="button" accessibilityLabel="Back">
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.control,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="m14.4 6-6 6 6 6"
              stroke={ct.ink}
              strokeWidth={2.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      )}
    </Pressable>
  );
}
