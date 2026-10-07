import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { FONT, R } from '../theme';
import { type ProjectGlyphKey } from '../data/profile';

/**
 * The mark in a case study's coloured disc.
 *
 * These are not company logos — the reference draws a stack, an alert circle and
 * a letter, none of which identifies anyone — so they live apart from
 * `BrandMark`, which exists to carry a brand's own shape and colours.
 */
const PATHS: Partial<Record<ProjectGlyphKey, string>> = {
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  alert:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z',
};

export function ProjectGlyph({
  glyph,
  fill,
  size = 40,
}: {
  glyph: ProjectGlyphKey;
  fill: string;
  size?: number;
}) {
  const d = PATHS[glyph];
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: R.full,
        backgroundColor: fill,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.06,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
      }}
    >
      {d ? (
        <Svg width={size / 2} height={size / 2} viewBox="0 0 24 24">
          <Path
            d={d}
            // The stack is an outline and the alert circle is solid. One path
            // each, so the fill is chosen by which one it is.
            fill={glyph === 'alert' ? '#FFFFFF' : 'none'}
            stroke={glyph === 'alert' ? 'none' : '#FFFFFF'}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: size * 0.42,
            lineHeight: size * 0.5,
            color: '#FFFFFF',
          }}
        >
          N
        </Text>
      )}
    </View>
  );
}
