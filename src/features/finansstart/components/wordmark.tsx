import { View } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

import { MARK_GLYPH } from '../layout';
import { fn } from '../theme';
import { T } from './text';

/**
 * The brand, top left: a stack of coins and the name.
 *
 * The coins are three ellipses, deepest first, which is the whole mark — the
 * reference's is a flat stacked-disc glyph and this is that, not an
 * approximation of a logotype. Drawing it keeps it sharp at any size and
 * costs nothing.
 */
export function Wordmark({ name }: { name: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Svg width={MARK_GLYPH} height={MARK_GLYPH} viewBox="0 0 24 24">
        <Ellipse cx={12} cy={17} rx={9} ry={4.2} fill={fn.yellowDeep} />
        <Ellipse cx={12} cy={12.5} rx={9} ry={4.2} fill={fn.yellow} />
        <Ellipse cx={12} cy={8} rx={9} ry={4.2} fill="#ffe27a" />
      </Svg>
      <T variant="wordmark" color={fn.ink}>
        {name}
      </T>
    </View>
  );
}
