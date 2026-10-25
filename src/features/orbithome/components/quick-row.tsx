import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { QUICK_HEIGHT } from '../layout';
import { ob, radius, type } from '../theme';
import { T } from './text';

/**
 * The two things you do most, on one white bar.
 *
 * The arrows are drawn rather than taken from an emoji font: a glyph that
 * differs between Windows, Android and iOS cannot be shipped as UI.
 *
 * The press target is the whole half, not the label — 64dp tall and half the
 * bar wide, which clears the 44dp minimum by a long way.
 */
export function QuickRow({ onTransfer }: { onTransfer?: () => void }) {
  const half = {
    flex: 1,
    height: QUICK_HEIGHT,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        height: QUICK_HEIGHT,
        borderRadius: radius.pill,
        backgroundColor: ob.sheet,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={onTransfer}
        style={{ flex: 1 }}
        accessibilityRole="button"
        accessibilityLabel={copy.transfer}
      >
        <View style={half}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M7.6 16.4 16.4 7.6M9.2 7.6h7.2v7.2"
              stroke={ob.onSheet}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
          <T variant="quick" color={ob.onSheet} style={{ marginLeft: 9, height: type.quick.line }}>
            {copy.transfer}
          </T>
        </View>
      </Pressable>

      <View style={{ width: 1, height: 26, backgroundColor: 'rgba(10,10,11,0.14)' }} />

      <Pressable style={{ flex: 1 }} accessibilityRole="button" accessibilityLabel={copy.request}>
        <View style={half}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M16.4 7.6 7.6 16.4M14.8 16.4H7.6V9.2"
              stroke={ob.onSheet}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
          <T variant="quick" color={ob.onSheet} style={{ marginLeft: 9, height: type.quick.line }}>
            {copy.request}
          </T>
        </View>
      </Pressable>
    </View>
  );
}
