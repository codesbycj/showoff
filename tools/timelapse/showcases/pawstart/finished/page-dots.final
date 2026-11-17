import { View } from 'react-native';

import { dots } from '../data/start';
import { ct } from '../theme';

type Props = { height: number };

/**
 * Which onboarding page this is.
 *
 * Rendered from the `dots` array, one entry per page, so the reveal paints a
 * dot at a time rather than the whole pager in one beat (I9) - and so the
 * control cannot claim a position the flow does not have (R9).
 *
 * **The live page is the first entry.** The mount step reveals it, and a 9dp
 * inactive dot changes 0.0116% of the frame - under the step probe's floor,
 * which reads as a step that painted nothing. The 24dp active dot clears it.
 * This screen is page one, so that is also what the pager should say.
 */
export function PageDots({ height }: Props) {
  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
      }}
    >
      {dots.map((dot) => (
        <View
          key={dot.id}
          accessibilityLabel={dot.label}
          style={{
            width: dot.on ? 24 : 9,
            height: 9,
            borderRadius: 5,
            backgroundColor: dot.on ? ct.ink : ct.line,
          }}
        />
      ))}
    </View>
  );
}
