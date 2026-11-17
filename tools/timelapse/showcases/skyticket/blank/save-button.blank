import { Pressable, View } from 'react-native';

import { cta } from '../data/ticket';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The screen's primary action.
 *
 * The visual box is an inner `View`: a `Pressable` whose style is a function
 * of `pressed` is dropped in a static render and loses its height and fill
 * (§7).
 */
export function SaveButton({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="button" accessibilityLabel={cta.label}>
        <View
          style={{
            height,
            borderRadius: height / 2,
            backgroundColor: ct.dark,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {/* STEP 1.26 glyph
          <Glyph name="download" size={19} color={ct.white} strokeWidth={1.8} />
          */}
          {/* STEP 1.27 label
          <T variant="cta">{cta.label}</T>
          */}
        </View>
      </Pressable>
    </View>
  );
}
