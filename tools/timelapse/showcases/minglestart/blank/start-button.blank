import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { ARROW_DISC, BUTTON_HEIGHT, BUTTON_TOP } from '../layout';
import { mg, radius, type } from '../theme';
import { T } from './text';

/**
 * The one thing this screen is for.
 *
 * The pressed state lives on the inner View's opacity rather than in a
 * function style: `Pressable`'s function style is dropped in a static render,
 * which silently loses the box's height and fill.
 */
export function StartButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={copy.button}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      <View
        style={{
          height: BUTTON_HEIGHT,
          marginTop: BUTTON_TOP,
          borderRadius: radius.button,
          backgroundColor: mg.card,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 22,
          paddingRight: 10,
        }}
      >
{/* STEP 1.19 what it says
        <T variant="button" color={mg.ink} style={{ flex: 1, height: type.button.line }}>
          {copy.button}
        </T>
*/}

{/* STEP 1.23 and where it goes
        <View
          style={{
            width: ARROW_DISC,
            height: ARROW_DISC,
            borderRadius: radius.pill,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path d="M7 17 17 7" stroke={mg.ink} strokeWidth={2.2} strokeLinecap="round" />
            <Path
              d="M8.6 7H17v8.4"
              stroke={mg.ink}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
*/}
      </View>
    </Pressable>
  );
}
