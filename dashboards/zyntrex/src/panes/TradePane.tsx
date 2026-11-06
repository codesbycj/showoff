import { useState } from 'react';

import { Candles } from '@/charts/Candles';
import { Badge, Card, Delta, Empty } from '@/components/Bits';
import { Button, IconButton, Segmented } from '@/components/Controls';
import { AssetDisc } from '@/components/Icon';
import {
  ACCOUNT,
  CASH,
  HOLDINGS,
  INTERVALS,
  ORDERS,
  QUOTE,
  assetOf,
  book,
  candles,
  groupings,
  orderNotional,
  pairOf,
  tickDp,
  trades,
  type Order,
  type Side,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

const TYPES = [
  { id: 'limit', label: 'Limit' },
  { id: 'market', label: 'Market' },
  { id: 'stop', label: 'Stop-limit' },
];

const RAIL = [25, 50, 75, 100];

/**
 * Trade — the surface the category exists for. Assembly only (rule 4).
 *
 * The reference has no trading screen at all; this is built to the standard:
 * pair header, candles, a grouped order book with cumulative-depth shading,
 * the market-trades feed, an order ticket with the percentage rail and a
 * quoted fee, and the open orders underneath.
 */
export function TradePane({
  symbol,
  onSymbol,
}: {
  symbol: string;
  onSymbol: (next: string) => void;
}) {
  const [interval, setInterval] = useState('1h');
  const [grouping, setGrouping] = useState(() => groupings(symbol)[0]);
  const [bookView, setBookView] = useState<'both' | 'bids' | 'asks'>('both');
  const [side, setSide] = useState<Side>('buy');
  const [kind, setKind] = useState('limit');
  const [share, setShare] = useState(25);
  const [price, setPrice] = useState<number | null>(null);
  const [cancelled, setCancelled] = useState<string[]>([]);

  const asset = assetOf(symbol);
  const dp = tickDp(symbol);
  const ticks = groupings(symbol);
  const activeGrouping = ticks.includes(grouping) ? grouping : ticks[0];

  /* No useMemo: these are three seeded loops, and hand-memoising them is what
     the React Compiler refuses to optimise around. It does this itself. */
  const depth = book(symbol, activeGrouping);
  const bars = candles(symbol, interval);
  const feed = trades(symbol);

  const held = HOLDINGS.find((h) => h.symbol === symbol);
  const freeUnits = held ? held.units - held.locked : 0;
  const limit = price ?? depth.mid;

  /* What the rail is a percentage *of* differs by side: a buy spends the quote
     currency, a sell spends the asset. Both are the free part only. */
  const budget = side === 'buy' ? CASH.free : freeUnits * limit;
  const spend = (budget * share) / 100;
  const units = limit > 0 ? spend / limit : 0;
  const feeRate = kind === 'market' ? ACCOUNT.takerFee : ACCOUNT.makerFee;

  const openOrders = ORDERS.filter((o) => o.symbol === symbol && !cancelled.includes(o.id));
  const maxCum = Math.max(
    depth.bids[depth.bids.length - 1]?.cumulative ?? 1,
    depth.asks[depth.asks.length - 1]?.cumulative ?? 1,
  );

  return (
    <div data-pane="trade" className="flex h-full min-h-0 flex-col gap-4">
      <Card pane="pair" className="shrink-0 flex-row items-center gap-5 px-4 py-3">
        <span className="flex shrink-0 items-center gap-2.5">
          <AssetDisc symbol={symbol} tint={asset.tint} size={34} />
          <span>
            <span className="tnum text-ink block text-[16px] leading-none font-bold">
              {pairOf(symbol)}
            </span>
            <span className="text-muted mt-1 block text-[11px]">{asset.name}</span>
          </span>
        </span>

        <span className="shrink-0">
          <span className="tnum text-ink block text-[22px] leading-none font-bold tracking-[-0.02em]">
            {asset.price.toFixed(dp)}
          </span>
          <span className="mt-1.5 block">
            <Delta value={asset.h24} suffix="%" />
          </span>
        </span>

        <ul className="m-0 flex min-w-0 list-none items-center gap-5 p-0">
          <Stat k="24h high" v={(asset.price * (1 + Math.abs(asset.h24) / 180)).toFixed(dp)} />
          <Stat k="24h low" v={(asset.price * (1 - Math.abs(asset.h24) / 160)).toFixed(dp)} />
          <Stat k="24h volume" v={`$${short(asset.volume24h)}`} />
          <Stat k="Tick size" v={activeGrouping.toFixed(dp)} />
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span className="text-muted text-[11px]">Pair</span>
          <Segmented
            name="pair"
            size="sm"
            value={symbol}
            options={['BTC', 'ETH', 'SOL', 'XRP'].map((s) => ({ id: s, label: s }))}
            onChange={(id) => {
              onSymbol(id);
              setGrouping(groupings(id)[0]);
              setPrice(null);
            }}
          />
        </div>
      </Card>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_280px_300px] gap-4">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="chart" className="min-h-0 flex-1 p-4">
            <div className="flex shrink-0 items-center justify-between gap-3">
              <span className="text-ink text-[14px] font-bold">Price</span>
              <Segmented
                name="interval"
                size="sm"
                value={interval}
                options={INTERVALS}
                onChange={(id) => setInterval(id)}
              />
            </div>
            <div className="mt-2 flex min-h-0 flex-1">
              <Candles
                data={bars}
                dp={dp}
                label={`${pairOf(symbol)} candlesticks at ${interval}, with volume underneath`}
              />
            </div>
          </Card>

          <Card pane="orders" className="min-h-0 shrink-0 p-4">
            <div className="flex shrink-0 items-center justify-between gap-3 pb-2">
              <span className="text-ink text-[14px] font-bold">
                Open orders <span className="text-muted font-normal">· {pairOf(symbol)}</span>
              </span>
              <Badge>{openOrders.length}</Badge>
            </div>
            <div
              data-scroller="orders"
              className="scroll-region min-h-0"
              style={{ maxHeight: 148 }}
            >
              {openOrders.length ? (
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {openOrders.map((o) => (
                    <OrderRow
                      key={o.id}
                      order={o}
                      dp={dp}
                      onCancel={() => setCancelled((cur) => [...cur, o.id])}
                    />
                  ))}
                </ul>
              ) : (
                <p className="text-muted m-0 py-4 text-[12px]">
                  {cancelled.length
                    ? `Cancelled. Nothing is open in ${pairOf(symbol)} now.`
                    : `No open orders in ${pairOf(symbol)}. The ticket on the right places one.`}
                </p>
              )}
            </div>
          </Card>
        </div>

        <Card pane="book" className="min-h-0 p-4">
          <div className="flex shrink-0 items-center justify-between gap-2 pb-2">
            <span className="text-ink text-[14px] font-bold">Order book</span>
            <div
              role="group"
              aria-label="Book view"
              data-group="bookview"
              className="flex items-center gap-0.5"
            >
              {(['both', 'bids', 'asks'] as const).map((view) => (
                <IconButton
                  key={view}
                  icon={view === 'both' ? 'book' : view === 'bids' ? 'chevron-up' : 'chevron-down'}
                  label={
                    view === 'both' ? 'Both sides' : view === 'bids' ? 'Bids only' : 'Asks only'
                  }
                  name={`book-${view}`}
                  size={30}
                  tone="quiet"
                  active={bookView === view}
                  onClick={() => setBookView(view)}
                />
              ))}
            </div>
          </div>

          <div className="text-muted tnum flex shrink-0 items-center justify-between pb-1.5 text-[10.5px]">
            <span>Price ({QUOTE})</span>
            <span>Size ({symbol})</span>
          </div>

          <div data-scroller="book" className="scroll-region min-h-0 flex-1">
            {bookView !== 'bids' ? (
              <ul className="m-0 flex list-none flex-col-reverse p-0">
                {depth.asks.map((l, i) => (
                  <BookRow
                    key={'a' + i}
                    mark={`ask-${i}`}
                    price={l.price}
                    units={l.units}
                    share={(l.cumulative / maxCum) * 100}
                    dp={dp}
                    side="sell"
                    onPick={() => setPrice(l.price)}
                  />
                ))}
              </ul>
            ) : null}

            <div className="border-line bg-sunken my-1 flex items-center justify-between rounded-[8px] border px-2 py-1.5">
              <span className="tnum text-ink text-[13px] font-bold">{depth.mid.toFixed(dp)}</span>
              <span className="tnum text-muted text-[10.5px]">
                spread {depth.spread.toFixed(dp)} · {depth.spreadPct.toFixed(3)}%
              </span>
            </div>

            {bookView !== 'asks' ? (
              <ul className="m-0 flex list-none flex-col p-0">
                {depth.bids.map((l, i) => (
                  <BookRow
                    key={'b' + i}
                    mark={`bid-${i}`}
                    price={l.price}
                    units={l.units}
                    share={(l.cumulative / maxCum) * 100}
                    dp={dp}
                    side="buy"
                    onPick={() => setPrice(l.price)}
                  />
                ))}
              </ul>
            ) : null}
          </div>

          <div className="border-line mt-2 flex shrink-0 items-center gap-2 border-t pt-2">
            <span className="text-muted shrink-0 text-[10.5px]">Group</span>
            <Segmented
              name="grouping"
              size="sm"
              value={String(activeGrouping)}
              options={ticks.map((t) => ({ id: String(t), label: t.toFixed(dp) }))}
              onChange={(id) => setGrouping(Number(id))}
              className="min-w-0 flex-1"
            />
          </div>
        </Card>

        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="ticket" className="shrink-0 p-4">
            <Segmented
              name="side"
              value={side}
              options={[
                { id: 'buy', label: `Buy ${symbol}` },
                { id: 'sell', label: `Sell ${symbol}` },
              ]}
              onChange={(id) => setSide(id as Side)}
              className="w-full"
            />

            <div className="mt-3">
              <Segmented
                name="type"
                size="sm"
                value={kind}
                options={TYPES}
                onChange={(id) => setKind(id)}
                className="w-full"
              />
            </div>

            <Field
              label={kind === 'market' ? 'Price' : `Limit price (${QUOTE})`}
              value={kind === 'market' ? 'Best available' : limit.toFixed(dp)}
              note={
                kind === 'market'
                  ? 'A market order takes the book; there is no price to set.'
                  : price === null
                    ? 'Mid price. Click a level in the book to use it.'
                    : 'From the book.'
              }
            />

            <div className="mt-3">
              <span className="text-muted block text-[11px]">Amount ({symbol})</span>
              <span className="tnum text-ink mt-1 block text-[15px] font-bold">
                {units ? units.toFixed(dp > 2 ? 4 : 3) : '0.000'}
              </span>
              {/*
                The percentage rail — the most-used control on any order
                ticket, and a percentage of the *free* balance rather than the
                total, because an open order's funds cannot be spent twice.
              */}
              <div
                role="group"
                aria-label="Share of available balance"
                data-group="rail"
                className="mt-2 grid grid-cols-4 gap-1.5"
              >
                {RAIL.map((p) => (
                  <button
                    key={p}
                    type="button"
                    data-rail={p}
                    aria-pressed={share === p}
                    onClick={() => setShare(share === p ? 0 : p)}
                    className={cx(
                      'tnum h-9 rounded-[9px] border text-[11.5px] font-semibold transition-colors',
                      share === p
                        ? 'border-accent bg-accent-faint text-accent-deep'
                        : 'border-line text-muted hover:bg-sunken hover:text-ink',
                    )}
                  >
                    {p}%
                  </button>
                ))}
              </div>
              <span className="text-muted mt-1.5 block text-[10.5px]">
                {side === 'buy'
                  ? `${usd(CASH.free, true)} available in ${QUOTE}`
                  : `${freeUnits} ${symbol} available · ${held?.locked ?? 0} on open orders`}
              </span>
            </div>

            {/* Quoted before submit, with the tier it came from. */}
            <dl className="border-line m-0 mt-3 grid grid-cols-2 gap-y-1.5 rounded-[11px] border p-3 text-[11.5px]">
              <dt className="text-muted m-0">Order value</dt>
              <dd className="tnum text-ink m-0 text-right font-semibold">{usd(spend, true)}</dd>
              <dt className="text-muted m-0">
                Fee · {kind === 'market' ? 'taker' : 'maker'} {(feeRate * 100).toFixed(2)}%
              </dt>
              <dd className="tnum text-ink m-0 text-right font-semibold">
                {usd(spend * feeRate, true)}
              </dd>
              <dt className="text-ink m-0 font-semibold">Total</dt>
              <dd className="tnum text-ink m-0 text-right font-bold">
                {usd(side === 'buy' ? spend * (1 + feeRate) : spend * (1 - feeRate), true)}
              </dd>
            </dl>

            {/* The CTA is the side's own colour, not the brand's: on a desk,
                green is buy and red is sell, and a coral button for both is
                the one place a brand colour costs a reader time. */}
            <Button
              name="submit"
              variant={side === 'buy' ? 'bid' : 'ask'}
              className="mt-3 w-full justify-center"
            >
              {side === 'buy' ? 'Buy' : 'Sell'} {symbol}
            </Button>
          </Card>

          <Card pane="trades" className="min-h-0 flex-1 p-4">
            <div className="flex shrink-0 items-center justify-between gap-2 pb-2">
              <span className="text-ink text-[14px] font-bold">Market trades</span>
              <span className="text-muted text-[10.5px]">everyone's fills</span>
            </div>
            <div className="text-muted tnum flex shrink-0 justify-between pb-1 text-[10.5px]">
              <span>Price</span>
              <span>Size</span>
              <span>Time</span>
            </div>
            <div data-scroller="trades" className="scroll-region min-h-0 flex-1">
              {feed.length ? (
                <ul className="m-0 flex list-none flex-col p-0">
                  {feed.map((t) => (
                    <li
                      key={t.id}
                      className="tnum flex items-center justify-between py-[3px] text-[11.5px]"
                    >
                      <span
                        className={cx(
                          'w-[86px] shrink-0 font-semibold',
                          t.side === 'buy' ? 'text-bid' : 'text-ask',
                        )}
                      >
                        {t.price.toFixed(dp)}
                      </span>
                      <span className="text-body min-w-0 flex-1 text-right">{t.units}</span>
                      <span className="text-muted w-[62px] shrink-0 text-right">{t.at}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty what="trade" query={symbol} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/** A read-only field in the ticket: a label, the value, and why it is that. */
function Field({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="mt-3">
      <span className="text-muted block text-[11px]">{label}</span>
      <span className="border-line bg-sunken tnum text-ink mt-1 flex h-10 items-center rounded-[9px] border px-3 text-[13.5px] font-semibold">
        {value}
      </span>
      <span className="text-muted mt-1 block text-[10.5px]">{note}</span>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <li className="min-w-0">
      <span className="text-muted block text-[10.5px]">{k}</span>
      <span className="tnum text-ink mt-0.5 block truncate text-[12.5px] font-semibold">{v}</span>
    </li>
  );
}

/**
 * One level. The depth shading is the row's own background, grown from the
 * side it belongs to — bids fill from the right, asks from the left, which is
 * how a book reads on every desk.
 */
function BookRow({
  mark,
  price,
  units,
  share,
  dp,
  side,
  onPick,
}: {
  mark: string;
  price: number;
  units: number;
  share: number;
  dp: number;
  side: Side;
  onPick: () => void;
}) {
  const wash = side === 'buy' ? 'var(--color-bid-wash)' : 'var(--color-ask-wash)';
  return (
    <li>
      <button
        type="button"
        data-level={mark}
        onClick={onPick}
        title={`Use ${price.toFixed(dp)} in the ticket`}
        style={{
          backgroundImage: `linear-gradient(to ${side === 'buy' ? 'left' : 'right'}, ${wash} ${share}%, transparent ${share}%)`,
        }}
        className="tnum flex w-full items-center justify-between rounded-[5px] px-1.5 py-[4px] text-[11.5px] transition-colors"
      >
        <span className={cx('font-semibold', side === 'buy' ? 'text-bid' : 'text-ask')}>
          {price.toFixed(dp)}
        </span>
        <span className="text-body">{units}</span>
      </button>
    </li>
  );
}

function OrderRow({ order: o, dp, onCancel }: { order: Order; dp: number; onCancel: () => void }) {
  return (
    <li className="border-line flex items-center gap-2.5 rounded-[10px] border px-3 py-2">
      <span
        className={cx(
          'shrink-0 rounded-full px-2 py-[2px] text-[10.5px] font-bold capitalize',
          o.side === 'buy' ? 'bg-bid-wash text-bid' : 'bg-ask-wash text-ask',
        )}
      >
        {o.side}
      </span>
      <span className="min-w-0 flex-1">
        <span className="tnum text-ink block truncate text-[12px] font-semibold">
          {o.units} {o.symbol} at {o.price.toFixed(dp)}
        </span>
        <span className="text-muted tnum block truncate text-[10.5px]">
          {o.kind} · placed {o.placed} · {((o.filled / o.units) * 100).toFixed(0)}% filled
        </span>
      </span>
      <span className="tnum text-ink shrink-0 text-[12px] font-bold">
        {usd(orderNotional(o), true)}
      </span>
      <IconButton
        icon="close"
        label={`Cancel ${o.symbol} order`}
        name={`cancel-${o.id}`}
        size={28}
        onClick={onCancel}
      />
    </li>
  );
}
