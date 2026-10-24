import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { stats } from '../data/product';
import { STAT_GAP, STAT_H } from '../layout';
import { radius, sp } from '../theme';
import { T } from './text';

/**
 * The two boxes under the price: what people think of it, and what is in it.
 *
 * The stars are drawn rather than taken from an icon set, because a half-lit
 * row of five at 10dp is a shape problem, not an icon problem — and every
 * set's star is a different number of points.
 */
export function StatRow() {
  return (
    <View style={{ flexDirection: 'row', gap: STAT_GAP }}>
      {stats.map((s) => (
        <View
          key={s.key}
          style={{
            flex: 1,
            height: STAT_H,
            borderRadius: radius.tile,
            backgroundColor: sp.sheetWell,
            paddingHorizontal: 14,
            justifyContent: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <T variant="stat" color={sp.onDark}>
              {s.value}
            </T>
            {'stars' in s ? <Stars lit={s.stars} /> : null}
          </View>
          <T variant="statMeta" color={sp.was}>
            {s.meta}
          </T>
        </View>
      ))}
    </View>
  );
}

/** Five stars, `lit` of them filled. */
function Stars({ lit }: { lit: number }) {
  return (
    <Svg width={58} height={11} viewBox="0 0 110 20">
      {[0, 1, 2, 3, 4].map((i) => (
        <Path
          key={i}
          d={`M${10 + i * 22} 1 L${12.7 + i * 22} 6.8 L${19 + i * 22} 7.6 L${14.4 + i * 22} 12 L${15.6 + i * 22} 18.4 L${10 + i * 22} 15.3 L${4.4 + i * 22} 18.4 L${5.6 + i * 22} 12 L${1 + i * 22} 7.6 L${7.3 + i * 22} 6.8 Z`}
          fill={i < lit ? sp.panel : sp.rule}
        />
      ))}
    </Svg>
  );
}
