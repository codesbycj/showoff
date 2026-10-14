import { Text, View } from 'react-native';

import { RATING } from '../data/product';
import { bt, type as t } from '../theme';
import { DrawnIcon } from './drawn-icon';
import { Pod } from './pod';
import { Symbol } from './symbol';

/**
 * Score, stars, review count.
 *
 * Four filled stars and one half. Only the half comes from the symbol font —
 * the filled star is a `FILL 1` glyph the static cut does not carry, so it is
 * drawn from its own path. They are the same 15dp box either way, so the row
 * measures identically whichever supplies which.
 */
export function RatingPod() {
  return (
    <Pod>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontFamily: t.headlineSmFlat.family,
            fontSize: t.headlineSmFlat.size,
            lineHeight: t.headlineSmFlat.line,
            color: bt.ink,
          }}
        >
          {RATING.score}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          {Array.from({ length: RATING.filled }, (_, i) => (
            <DrawnIcon key={i} name="star" size={15} color={bt.gold} />
          ))}
          <Symbol name="starHalf" size={15} color={bt.gold} />
        </View>
      </View>

      <Text
        style={{
          fontFamily: t.bodySm.family,
          fontSize: t.bodySm.size,
          lineHeight: t.bodySm.line,
          color: bt.muted,
        }}
      >
        {RATING.reviews}
      </Text>
    </Pod>
  );
}
