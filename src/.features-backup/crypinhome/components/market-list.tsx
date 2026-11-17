import { Pressable, View } from 'react-native';

import { marketRows, pct, usd, type MarketRow } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const DISC: Record<string, string> = {
  btc: ct.btc,
  eth: ct.eth,
  usdt: ct.usdt,
  xrp: ct.xrp,
  sol: ct.sol,
  ada: ct.ada,
  link: ct.link,
};

/** One market: the coin, its price and its move. */
function Row({
  row,
  height,
  coin,
  last,
}: {
  row: MarketRow;
  height: number;
  coin: number;
  last: boolean;
}) {
  const down = row.changePct < 0;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${row.name}, ${usd(row.price)}`}>
      {({ pressed }) => (
        <View
          style={{
            height,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderBottomWidth: last ? 0 : 1,
            borderBottomColor: ct.hairline,
            opacity: pressed ? 0.6 : 1,
          }}
        >
          <View
            style={{
              width: coin,
              height: coin,
              borderRadius: coin / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: DISC[row.id],
            }}
          >
            <Glyph name={row.id} size={17} color={ct.white} />
          </View>

          <View style={{ flex: 1 }}>
            <T variant="rowName">{row.name}</T>
            <T variant="rowTicker">{row.ticker}</T>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            {/* Sub-$10 assets carry four decimals, as the reference shows for
                XRP; everything else carries two. */}
            <T variant="rowPrice">{usd(row.price, row.price < 10 ? 4 : 2)}</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Glyph
                name={down ? 'trendDown' : 'trendUp'}
                size={12}
                color={down ? ct.down : ct.up}
                strokeWidth={2.1}
              />
              <T variant={down ? 'rowDown' : 'rowUp'}>{pct(row.changePct)}</T>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

type Props = { margin: number; rowH: number; coin: number; height: number; count: number };

/**
 * The market rows.
 *
 * **Whole rows, filling the space above the dock.** `layout.ts` divides that
 * space into a whole number of rows and `count` is how many fit, so nothing is
 * clipped and nothing lands under the floating pill.
 *
 * The reference lets its last row run behind the dock. Copying that failed the
 * audit twice — R2 `CLIPPED` (a clipped list cuts a row through its own text)
 * and R3 `COVERED` (the dock then paints over that text, which R3 calls a FAIL
 * outright) — and the rules outrank the reference where they disagree.
 *
 * The screen is still filled by *adding rows*, which is I3's lever, rather than
 * by scaling the blocks above up — which is what the first pass did, and why it
 * came out loose.
 *
 * The arrow and the colour both follow the sign of the datum rather than being
 * set per row, so the picture cannot disagree with the number (R9).
 */
export function MarketList({ margin, rowH, coin, height, count }: Props) {
  const shown = marketRows.slice(0, count);
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {shown.map((r, i) => (
        <Row key={r.id} row={r} height={rowH} coin={coin} last={i === shown.length - 1} />
      ))}
    </View>
  );
}
