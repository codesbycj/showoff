import { Pressable, View } from 'react-native';
import { body, brand, cta, headline, step, steps } from '../data/onboard';
import { ct } from '../theme';
import { PagerProps } from './_onboard-parts-shared';

/**
 * The pager.
 *
 * **The dot count is `steps`**, not a typed number, so it cannot disagree with
 * the flow it belongs to (R9) — the board's own pagers do not always match.
 */
export function Pager({ height }: PagerProps) {
  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
      }}
    >
      {Array.from({ length: steps }, (_, i) => (
        <View
          key={i}
          style={{
            width: i === step ? 18 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: i === step ? ct.pagerOn : ct.pager,
          }}
        />
      ))}
    </View>
  );
}
