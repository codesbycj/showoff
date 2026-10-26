import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { ROW_HEIGHT } from '../layout';
import { ms, radius, type } from '../theme';
import { T } from './text';

const STATE_TINT: Record<string, string> = {
  'In progress': ms.orange,
  Delayed: ms.red,
  Completed: ms.green,
};

/**
 * One task on today's list.
 *
 * The mark is a hard hat, drawn: a brim with a crown on it. A small flat
 * object is squarely in drawing range, and it reads at 17dp where the
 * reference's thin line-chart glyph does not.
 *
 * The state chip takes its colour from the state rather than from the row's
 * position, so a delayed task is red wherever it sits. The whole row is the
 * press target and the chevron is decoration, not a second control.
 */
export function TaskRow({
  title,
  where,
  state,
  onPress,
}: {
  title: string;
  where: string;
  state: string;
  onPress?: () => void;
}) {
  const tint = STATE_TINT[state] ?? ms.muted;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View
        style={{
          minHeight: ROW_HEIGHT,
          borderRadius: radius.tile,
          backgroundColor: ms.card,
          flexDirection: 'row',
          // MISTAKE 1.27 the rows came in square on one corner
          borderTopLeftRadius: 0,
          alignItems: 'center',
          paddingHorizontal: 14,
          shadowColor: '#2A1B12',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 5 },
          elevation: 2,
        }}
      >
{/* STEP 1.20 a hard hat
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: radius.pill,
            backgroundColor: ms.well,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg width={17} height={17} viewBox="0 0 24 24">
            <Path
              d="M3.4 17.4h17.2M5.4 17.4a6.6 6.6 0 0 1 13.2 0"
              stroke={ms.ink}
              strokeWidth={1.8}
              strokeLinecap="round"
              fill="none"
            />
            <Path
              d="M9.6 11.4V7.8a2.4 2.4 0 0 1 4.8 0v3.6"
              stroke={ms.ink}
              strokeWidth={1.8}
              strokeLinecap="round"
              fill="none"
            />
          </Svg>
        </View>
*/}

{/* STEP 1.21 what and where
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="rowTitle" color={ms.ink} style={{ height: type.rowTitle.line }}>
            {title}
          </T>
          <T variant="sub" color={ms.muted} style={{ height: type.sub.line }}>
            {where}
          </T>
        </View>
*/}

{/* STEP 1.22 how it is going
        <View
          style={{
            paddingHorizontal: 9,
            paddingVertical: 4,
            borderRadius: radius.chip,
            backgroundColor: tint + '1A',
          }}
        >
          <T variant="chip" color={tint} style={{ height: type.chip.line }}>
            {state}
          </T>
        </View>
*/}

{/* STEP 1.23 and a way in
        <Svg width={16} height={16} viewBox="0 0 24 24" style={{ marginLeft: 6 }}>
          <Path
            d="m9.6 5.6 6.4 6.4-6.4 6.4"
            stroke={ms.faint}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
*/}
      </View>
    </Pressable>
  );
}
