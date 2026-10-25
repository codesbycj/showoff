import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { BACK, PILL_HEIGHT } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * The way back, and the way to add another card.
 *
 * Both are 36dp or taller and the pill's padding makes it wider than its
 * label, so each clears a thumb without the row having to be padded out.
 */
export function PanelTop({ onBack }: { onBack?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
        <View
          style={{
            width: BACK,
            height: BACK,
            borderRadius: radius.pill,
            backgroundColor: kt.panelCard,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M18.6 12H5.6M11.4 5.8 5.2 12l6.2 6.2"
              stroke={kt.ink}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>

      <View style={{ flex: 1 }} />

      <Pressable accessibilityRole="button" accessibilityLabel={'Add a ' + copy.newCard}>
        <View
          style={{
            height: PILL_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            borderRadius: radius.pill,
            backgroundColor: kt.panelCard,
          }}
        >
          <Svg width={13} height={13} viewBox="0 0 24 24">
            <Path
              d="M12 5.6v12.8M5.6 12h12.8"
              stroke={kt.ink}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </Svg>
          <T variant="pill" color={kt.ink} style={{ marginLeft: 6, height: type.pill.line }}>
            {copy.newCard}
          </T>
        </View>
      </Pressable>
    </View>
  );
}
