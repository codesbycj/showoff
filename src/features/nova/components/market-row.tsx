import { Pressable, Text, View } from 'react-native';
import { DeltaPill } from './bits';
import { CoinMark } from './coin-mark';
import type { Coin } from '../data/market';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * One asset on the dashboard's Market Highlights list.
 *
 * The export gives each row a mini sparkline — and then marks it
 * `hidden sm:flex`, so it is absent at every width this app is ever rendered
 * at, and absent from the reference PNG. It is left out rather than restored:
 * the row is laid out as two groups pushed apart, and dropping a third group
 * into the middle is a different row, not the same one with more in it.
 */

export function MarketRow({ coin, onPress }: { coin: Coin; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: nv.surface,
            borderRadius: R.lg,
            padding: 14,
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <CoinMark coin={coin.key} size={40} />

          <View>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 14,
                lineHeight: 19,
                letterSpacing: -0.14,
                color: nv.ink,
              }}
            >
              {coin.name}
            </Text>
            <Text
              style={{ fontFamily: FONT.semibold, fontSize: 11, lineHeight: 15, color: nv.muted }}
            >
              {coin.key}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontFamily: FONT.extrabold,
              fontSize: 14,
              lineHeight: 19,
              letterSpacing: -0.28,
              color: nv.ink,
            }}
          >
            {coin.price}
          </Text>
          <View style={{ marginTop: 3 }}>
            <DeltaPill value={coin.delta} up={coin.up} size="sm" />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
