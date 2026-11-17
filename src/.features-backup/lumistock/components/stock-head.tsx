import { Pressable, View } from 'react-native';

import { company, screen } from '../data/stock';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type BarProps = { height: number; margin: number; control: number; onBack: () => void };

/** Back, and the currency the screen is quoted in. */
export function StockBar({ height, margin, control, onBack }: BarProps) {
  return (
    <View
      style={{
        height,
        marginHorizontal: margin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Pressable hitSlop={8} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <Glyph name="back" size={20} color={ct.ink} />
          </View>
        )}
      </Pressable>

      <Pressable
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Currency, ${screen.currency}`}
      >
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              height: 30,
              paddingHorizontal: 8,
              borderRadius: 15,
              backgroundColor: ct.tile,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="flag" size={17} />
            <T variant="currency">{screen.currency}</T>
            <Glyph name="chevronDown" size={13} color={ct.sub} strokeWidth={2.1} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

type IdProps = { margin: number; height: number; mark: number };

/**
 * The company.
 *
 * The mark is drawn for a **fictional** company — the board poses McDonald's
 * arches here, and shipping a real company's logo in a rebuild is
 * impersonation.
 *
 * The board's own line reads "12 shares available ▲90.99%", which puts a rate
 * beside a count and means nothing. Here the count is a count (R9).
 */
export function StockId({ margin, height, mark }: IdProps) {
  return (
    <View
      style={{ marginHorizontal: margin, height, flexDirection: 'row', alignItems: 'center', gap: 12 }}
    >
      <View
        style={{
          width: mark,
          height: mark,
          borderRadius: mark / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.tile,
        }}
      >
        <Glyph name="brand" size={mark * 0.62} />
      </View>

      <View style={{ flex: 1 }}>
        <T variant="company" numberOfLines={1}>
          {company.name}
        </T>
        <T variant="shares">{`${company.ticker} · ${company.shares} ${company.sharesLabel}`}</T>
      </View>
    </View>
  );
}
