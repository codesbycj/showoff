import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { budget, budgetBars, copy, money, spent, spentBars, spentShare } from '../data/start';
import { CARD_PAD, TILE_GAP, TILE_HEIGHT, TILES_TOP } from '../layout';
import { ms, radius, type } from '../theme';
import { BarChart } from './bar-chart';
import { T } from './text';

/** The little mark each tile carries, drawn. */
function Mark({ kind }: { kind: 'budget' | 'spent' }) {
  return (
    <View
      style={{
        width: 26,
        height: 26,
        borderRadius: radius.pill,
        backgroundColor: ms.well,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={14} height={14} viewBox="0 0 24 24">
        {kind === 'budget' ? (
          <>
            <Path
              d="M3.4 6.6h17.2a1 1 0 0 1 1 1v8.8a1 1 0 0 1-1 1H3.4a1 1 0 0 1-1-1V7.6a1 1 0 0 1 1-1Z"
              stroke={ms.ink}
              strokeWidth={1.7}
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M12 9.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z"
              stroke={ms.ink}
              strokeWidth={1.7}
              fill="none"
            />
          </>
        ) : (
          <Path
            d="M3.4 16.6 8 9.4l4 4.4 3.2-6 4.4 8.8"
            stroke={ms.ink}
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}

/**
 * What the project costs, and what it has cost so far.
 *
 * Both figures come from `budget` and `spent`: the share is computed, not
 * typed, so the chip under the chart and the percentage above it cannot
 * drift apart.
 */
export function MoneyTiles() {
  const tile = {
    flex: 1,
    height: TILE_HEIGHT,
    borderRadius: radius.tile,
    backgroundColor: ms.card,
    padding: CARD_PAD,
    shadowColor: '#2A1B12',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View style={{ flexDirection: 'row', gap: TILE_GAP, marginTop: TILES_TOP }}>
      <View style={tile}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Mark kind="budget" />
          <View style={{ marginLeft: 8 }}>
            <T variant="tileLabel" color={ms.muted} style={{ height: type.tileLabel.line }}>
              {copy.budgetLabel}
            </T>
            <T variant="tileValue" color={ms.ink} style={{ height: type.tileValue.line }}>
              {money(budget)}
            </T>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <BarChart values={budgetBars} w={132} h={48} tint={ms.peachSoft} />
        </View>
      </View>

      <View style={tile}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Mark kind="spent" />
          <View style={{ marginLeft: 8 }}>
            <T variant="tileLabel" color={ms.muted} style={{ height: type.tileLabel.line }}>
              {copy.spentLabel}
            </T>
            <T variant="tileValue" color={ms.ink} style={{ height: type.tileValue.line }}>
              {spentShare + '% Total'}
            </T>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <BarChart values={spentBars} w={132} h={48} />
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: radius.chip,
              backgroundColor: ms.card,
              shadowColor: '#2A1B12',
              shadowOpacity: 0.1,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 3,
            }}
          >
            <T variant="chip" color={ms.ink} style={{ height: type.chip.line }}>
              {money(spent)}
            </T>
          </View>
        </View>
      </View>
    </View>
  );
}
