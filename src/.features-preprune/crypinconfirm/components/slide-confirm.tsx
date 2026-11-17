import { Pressable, View } from 'react-native';

import { screen } from '../data/confirm';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; knob: number; onPress: () => void };

/**
 * Slide to confirm.
 *
 * The knob is a child of the track rather than a floating sibling, so it can
 * never straddle the track's edge (R3) however the track is sized. The label is
 * centred on the **track**, with the knob's width reserved on the left, so a
 * wider knob moves the label rather than being painted over it.
 *
 * The track's fill and its shadow sit in one style object: a `Platform.select`
 * for a shadow is exactly what the web render cannot check (§4.4).
 */
export function SlideConfirm({ margin, height, radius, knob, onPress }: Props) {
  const inset = (height - knob) / 2;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={screen.slide}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.track,
            borderWidth: 1,
            borderColor: ct.trackEdge,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: inset,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#000000',
            shadowOpacity: 0.3,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 6 },
            elevation: 5,
          }}
        >
          <View
            style={{
              width: knob,
              height: knob,
              borderRadius: knob / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.knob,
            }}
          >
            <Glyph name="chevronRight" size={18} color={ct.knobFg} strokeWidth={2.4} />
          </View>

          <View style={{ flex: 1, alignItems: 'center', paddingRight: knob / 2 }}>
            <T variant="slide">{screen.slide}</T>
          </View>
        </View>
      )}
    </Pressable>
  );
}
