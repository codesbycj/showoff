import { Pressable, View } from 'react-native';

import { header, series } from '../data/chart';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The balance, and the two chart views.
 *
 * **R9: the balance is the last point of the series**, not a typed number, so
 * the headline and the line under it cannot disagree. It is guarded for an
 * empty series, because the reveal fills that series one point at a time (I7).
 */
export function ChartHeader({ margin, height }: Props) {
  const last = series.length > 0 ? series[series.length - 1] : null;

  const round = (on: boolean) => ({
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: on ? ct.white : ct.tray,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#15161A',
    shadowOpacity: on ? 0.12 : 0,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: on ? 3 : 0,
  });

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View>
        {/* STEP 1.02 label
        <T variant="label">{header.label}</T>
        */}
        {/* STEP 1.03 t
        <T variant="balance">
          $
          {(last?.value ?? 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </T>
        */}
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        {/* STEP 1.04 "Bar view"
        <Pressable accessibilityRole="button" accessibilityLabel="Bar view">
          <View style={round(false)}>
            <Glyph name="bars" size={19} color={ct.muted} strokeWidth={2} />
          </View>
        </Pressable>
        */}

        {/* STEP 1.05 "Line view"
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: true }}
          accessibilityLabel="Line view"
        >
          <View style={round(true)}>
            <Glyph name="line" size={19} color={ct.accent} strokeWidth={2} />
          </View>
        </Pressable>
        */}
      </View>
    </View>
  );
}
