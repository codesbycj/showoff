import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { BRAND_TOP } from '../layout';
import { fc, type } from '../theme';
import { T } from './text';

/**
 * The brand's mark, drawn: two thick strokes crossing, with their ends
 * rounded and bowed.
 *
 * A wordmark and an abstract solid are both squarely inside drawing range
 * (AGENTS.md, "Draw the interface"), and drawing it means the mark scales
 * from 20dp in this row to 86dp beside the headline off one path.
 */
export function BrandMark({ size, tint }: { size: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        d="M11 7c7 4 10 10 10 17S18 37 11 41"
        stroke={tint}
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M37 7c-7 4-10 10-10 17s3 13 10 17"
        stroke={tint}
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * The brand, and the way past the whole thing.
 *
 * "Skip" is a 40dp target with padding around the word rather than the word
 * itself — a text link is only as tall as its line, which here would be 17dp.
 */
export function BrandRow({ onSkip }: { onSkip?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: BRAND_TOP }}>
      <BrandMark size={22} tint={fc.violet} />
      <T
        variant="brand"
        color={fc.muted}
        style={{ flex: 1, marginLeft: 8, height: type.brand.line }}
      >
        {copy.brand}
      </T>
      <Pressable onPress={onSkip} accessibilityRole="button" accessibilityLabel={copy.skip}>
        <View style={{ height: 40, paddingHorizontal: 8, justifyContent: 'center' }}>
          <T
            variant="skip"
            color={fc.blue}
            style={{ height: type.skip.line, textDecorationLine: 'underline' }}
          >
            {copy.skip}
          </T>
        </View>
      </Pressable>
    </View>
  );
}
