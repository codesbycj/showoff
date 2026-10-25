import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { BuyBar } from '@/features/stakstock/components/buy-bar';
import { Glyph } from '@/features/stakstock/components/glyph';
import { PriceChart } from '@/features/stakstock/components/price-chart';
import { RangeRow } from '@/features/stakstock/components/range-row';
import { StatTile } from '@/features/stakstock/components/stat-tile';
import { T } from '@/features/stakstock/components/text';
import { TopBar } from '@/features/stakstock/components/top-bar';
import { price, stats } from '@/features/stakstock/data/stock';
import {
  BUY_TOP,
  CHART_TOP,
  HEADER_TOP,
  MARGIN,
  PRICE_TOP,
  RANGE_TOP,
  TILE_GAP,
  TILES_TOP,
} from '@/features/stakstock/layout';
import { sk, type } from '@/features/stakstock/theme';
import { useInsets } from '@/features/stakstock/use-insets';

/**
 * Stak — the stock.
 *
 * Assembly only: which stock this is, what it costs, the day drawn out, how
 * much of the history to show, two figures about the company, and the one
 * thing the screen is for.
 *
 * The chart takes `flex: 1`: everything else is a fixed number of dp, so the
 * plot absorbs the slack and the buy bar stays on the bottom edge.
 */
export default function StakstockScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: sk.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <TopBar />

      <View style={{ marginTop: PRICE_TOP }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="price" color={sk.ink} style={{ height: type.price.line }}>
            {price.now}
          </T>
          <View style={{ marginLeft: 10 }}>
            <Glyph name="trend" size={34} tint={sk.ink} />
          </View>
        </View>
        <T variant="delta" color={sk.body} style={{ height: type.delta.line }}>
          {price.change}
        </T>
      </View>

      <View style={{ flex: 1, marginTop: CHART_TOP }}>
        <PriceChart />
      </View>

      <View style={{ marginTop: RANGE_TOP }}>
        <RangeRow />
      </View>

      <View style={{ flexDirection: 'row', gap: TILE_GAP, marginTop: TILES_TOP }}>
        {stats.map((s) => (
          <StatTile key={s.id} value={s.value} label={s.label} tone={s.tone} />
        ))}
      </View>

      <View style={{ marginTop: BUY_TOP }}>
        <BuyBar />
      </View>
    </View>
  );
}
