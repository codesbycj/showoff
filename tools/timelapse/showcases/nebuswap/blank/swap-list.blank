import { ScrollView, View } from 'react-native';

import { recent, rows } from '../data/swap';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  radius: number;
  gap: number;
  dayH: number;
  bottomPad: number;
};

/**
 * What has been swapped already.
 *
 * The list is the remainder and runs under the floating dock, as the board
 * crops it (I3). The day divider is a row of its own rather than a label on
 * the first card, so it stages as its own beat.
 */
export function SwapList({ margin, height, radius, gap, dayH, bottomPad }: Props) {
  const disc = {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: ct.cardSoft,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: bottomPad }}
    >
      {/* STEP 1.19 day
      <View style={{ height: dayH, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: ct.line }} />
        <T variant="day">{recent.day}</T>
        <View style={{ flex: 1, height: 1, backgroundColor: ct.line }} />
      </View>
      */}

      {/* STEP 1.20 from symbol
      {rows.map((row) => (
        <View
          key={row.id}
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.card,
            paddingHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <View style={disc}>
            <Glyph name={row.fromMark} size={18} color={ct.ink} strokeWidth={1.7} />
          </View>
          <View style={{ flex: 1 }}>
            <T variant="symbol">{row.fromSymbol}</T>
            <T variant="price">{row.fromAmount}</T>
          </View>

          <Glyph name="exchange" size={19} color={ct.muted} strokeWidth={1.7} />

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <T variant="symbol">{row.toSymbol}</T>
            <T variant="price">{row.toAmount}</T>
          </View>
          <View style={disc}>
            <Glyph name={row.toMark} size={18} color={ct.ink} strokeWidth={1.7} />
          </View>
        </View>
      ))}
      */}
    </ScrollView>
  );
}
