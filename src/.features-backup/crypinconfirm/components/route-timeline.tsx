import { View } from 'react-native';

import { route } from '../data/confirm';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; rowH: number; dot: number; rail: number };

/**
 * What happens after you confirm, step by step.
 *
 * **Mine, not the board's.** The reference leaves roughly a third of this
 * screen empty between its detail rows and its slide bar. I3's lever for empty
 * space is to add the section the board cut, never a spacer and never padding —
 * and what a confirm screen genuinely carries there is the route the funds take.
 *
 * **This block is the screen's remainder** (see `layout.ts`): its height comes
 * from the layout and the steps divide it, so the foot cannot open a band.
 *
 * The rail is drawn per row rather than as one line behind them, because a
 * single absolutely-positioned line would be a second thing to keep in step
 * with a row count the reveal changes one entry at a time.
 */
export function RouteTimeline({ margin, height, rowH, dot, rail }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {route.map((step, i) => {
        const first = i === 0;
        const last = i === route.length - 1;
        return (
          <View key={step.id} style={{ height: rowH, flexDirection: 'row' }}>
            <View style={{ width: dot + 12, alignItems: 'center' }}>
              <View
                style={{
                  width: rail,
                  height: rowH / 2 - dot / 2,
                  backgroundColor: first ? 'transparent' : ct.rail,
                }}
              />
              <View
                style={{
                  width: dot,
                  height: dot,
                  borderRadius: dot / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: first ? ct.accent : ct.rail,
                }}
              >
                {first ? <Glyph name="check" size={dot - 3} color={ct.page} strokeWidth={3.4} /> : null}
              </View>
              <View
                style={{
                  width: rail,
                  flex: 1,
                  backgroundColor: last ? 'transparent' : ct.rail,
                }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 4 }}>
              <T variant="stepLabel">{step.label}</T>
              <T variant="stepWhen">{step.when}</T>
            </View>
          </View>
        );
      })}
    </View>
  );
}
