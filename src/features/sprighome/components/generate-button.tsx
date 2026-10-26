import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { BUTTON_HEIGHT, BUTTON_TOP } from '../layout';
import { radius, sg, type } from '../theme';
import { T } from './text';

/**
 * Build the day's meals.
 *
 * The sparkle is drawn. The reference uses an emoji, and an emoji is rendered
 * by the platform's own font — different on Windows, Android and iOS, and
 * missing outright for some codepoints (AGENTS.md, "never ship an emoji as
 * UI").
 *
 * The pressed state is a real one. `Pressable`'s function style is dropped in
 * a static render, so the fill lives on the inner View and the opacity is the
 * only thing the callback changes.
 */
export function GenerateButton({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={copy.generate}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <View
        style={{
          height: BUTTON_HEIGHT,
          marginTop: BUTTON_TOP,
          borderRadius: radius.chip,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
{/* STEP 1.27 in lime
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius.chip,
            backgroundColor: sg.lime,
          }}
        />
*/}

        {/*
          The glyph and the label sit in a flow child of their own rather than
          beside the skin. On web an absolutely-positioned sibling paints over
          an <svg>, so an icon next to one simply vanishes while the Text
          beside it survives — which reads as a missing icon, not as a
          stacking bug.
        */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Svg width={16} height={16} viewBox="0 0 24 24">
            <Path
              d="M9.4 3.2 10.8 7l3.8 1.4-3.8 1.4-1.4 3.8L8 9.8 4.2 8.4 8 7Z"
              fill={sg.limeInk}
            />
            <Path
              d="M16.6 12.4 17.5 15l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9Z"
              fill={sg.limeInk}
            />
          </Svg>

          <T variant="button" color={sg.ink} style={{ marginLeft: 8, height: type.button.line }}>
            {copy.generate}
          </T>
        </View>
      </View>
    </Pressable>
  );
}
