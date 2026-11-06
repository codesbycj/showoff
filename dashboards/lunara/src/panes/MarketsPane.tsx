import { useMemo, useState } from 'react';

import { Spark } from '@/charts/Spark';
import { Badge, Card, CardHead, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { SearchBox, Segmented } from '@/components/Controls';
import { AssetDisc, Icon } from '@/components/Icon';
import { COINS, HOLDINGS, marketTotals, spark, type Coin } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, short, usd } from '@/lib/format';

type Lens = 'all' | 'watchlist' | 'holdings';
type SortKey = 'rank' | 'price' | 'change24h' | 'change7d' | 'volume' | 'marketCap';

const LENSES: { id: Lens; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'holdings', label: 'My holdings' },
];

const COLUMNS: [SortKey, string][] = [
  ['rank', '#'],
  ['price', 'Price'],
  ['change24h', '24h'],
  ['change7d', '7d'],
  ['volume', 'Volume 24h'],
  ['marketCap', 'Market cap'],
];

const price = (n: number) => (n >= 1 ? usd(n, true) : '$' + n.toFixed(n < 0.01 ? 6 : 4));

/**
 * Markets. Assembly only (rule 4).
 *
 * The same twenty rows the portfolio's six holdings are priced from, so an
 * asset's price here and its value on Overview cannot disagree.
 */
export function MarketsPane() {
  const [lens, setLens] = useState<Lens>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('rank');
  const [descending, setDescending] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [watch, setWatch] = useState<string[]>(['btc', 'eth', 'sol', 'link']);

  const totals = useMemo(() => marketTotals(), []);
  const q = query.trim().toLowerCase();

  const rows = COINS.filter((c) =>
    lens === 'watchlist' ? watch.includes(c.id) : lens === 'holdings' ? c.held : true,
  )
    .filter((c) => (q ? (c.name + ' ' + c.symbol).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      /* Every key compares ascending and `descending` is the only thing that
         flips it. Written the other way for rank — `b.rank - a.rank` — the
         table opened at rank 20 with Bitcoin at the bottom, and a beat that
         clicked the Ethereum row changed nothing because the row was 1,418px
         down a 455px scroller. */
      const by = sort === 'rank' ? a.rank - b.rank : a[sort] - b[sort];
      return descending ? -by : by;
    });

  const onSort = (key: SortKey) => {
    if (key === sort) setDescending((v) => !v);
    else {
      setSort(key);
      setDescending(key !== 'rank');
    }
  };

  const toggleWatch = (id: string) =>
    setWatch((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div data-pane="markets" className="flex h-full flex-col">
      <PageHead
        title="Markets"
        subtitle="Prices across the assets you follow, and the whole market"
        action={
          <Segmented name="lens" value={lens} options={LENSES} onChange={(id) => setLens(id)} />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        {[
          { k: 'Market cap', v: '$' + short(totals.cap), note: 'across the twenty listed' },
          { k: 'Volume, 24h', v: '$' + short(totals.volume), note: 'all listed markets' },
          { k: 'BTC dominance', v: totals.dominance.toFixed(1) + '%', note: 'share of listed cap' },
          { k: 'On your watchlist', v: String(watch.length), note: 'assets followed' },
        ].map((s) => (
          <li key={s.k}>
            <div
              data-stat={s.k.toLowerCase().replace(/[^a-z]/g, '')}
              className="border-line bg-surface rounded-[var(--radius-card)] border px-5 py-4 shadow-[var(--shadow-card)]"
            >
              <span className="text-muted block text-[12px]">{s.k}</span>
              <span className="tnum text-ink mt-2 block text-[24px] leading-none font-extrabold tracking-[-0.03em]">
                {s.v}
              </span>
              <span className="text-muted mt-2 block text-[11.5px]">{s.note}</span>
            </div>
          </li>
        ))}
      </ul>

      <Card pane="market-table" className="min-h-0 flex-1 p-5">
        <CardHead
          title="All assets"
          action={
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search assets"
                name="markets"
                className="w-[240px]"
              />
              <Badge>
                {rows.length} of {COINS.length}
              </Badge>
            </>
          }
        />

        <div className="border-line mt-3 grid shrink-0 grid-cols-[2fr_1fr_0.8fr_0.8fr_1.1fr_1.1fr_0.9fr] gap-3 border-b pb-2">
          {COLUMNS.map(([key, label], i) => (
            <button
              key={label}
              type="button"
              data-sort={key.toLowerCase()}
              onClick={() => onSort(key)}
              aria-label={`Sort by ${label}`}
              className={cx(
                'flex h-7 items-center gap-1 text-[10.5px] font-bold tracking-[0.08em] uppercase transition-colors',
                i > 0 && 'justify-end',
                i === 0 && 'justify-start',
                sort === key ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              {label}
              <Icon
                name={sort === key ? (descending ? 'arrow-down' : 'arrow-up') : 'sort'}
                size={12}
                strokeWidth={2}
                className={sort === key ? 'text-accent' : 'opacity-60'}
              />
            </button>
          ))}
          <span className="text-muted text-right text-[10.5px] font-bold tracking-[0.08em] uppercase">
            Last 7 days
          </span>
        </div>

        <div data-scroller="market" className="scroll-region min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 list-none p-0">
              {rows.map((c) => (
                <li key={c.id}>
                  <Row
                    coin={c}
                    open={open === c.id}
                    watched={watch.includes(c.id)}
                    onToggle={() => setOpen(open === c.id ? null : c.id)}
                    onWatch={() => toggleWatch(c.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="asset" query={query || LENSES.find((l) => l.id === lens)!.label} />
          )}
        </div>
      </Card>
    </div>
  );
}

function Row({
  coin,
  open,
  watched,
  onToggle,
  onWatch,
}: {
  coin: Coin;
  open: boolean;
  watched: boolean;
  onToggle: () => void;
  onWatch: () => void;
}) {
  const held = HOLDINGS.find((h) => h.id === coin.id);
  const series = spark(coin.id);

  return (
    <div
      className={cx(
        'border-line border-b py-2.5 transition-colors last:border-b-0',
        open && 'bg-accent-faint',
      )}
    >
      <div className="grid grid-cols-[2fr_1fr_0.8fr_0.8fr_1.1fr_1.1fr_0.9fr] items-center gap-3">
        <button
          type="button"
          data-row={coin.id}
          aria-expanded={open}
          onClick={onToggle}
          className="flex min-w-0 items-center gap-2.5 text-left"
        >
          <span className="text-muted tnum w-[18px] shrink-0 text-[11.5px]">{coin.rank}</span>
          <AssetDisc symbol={coin.symbol} tile={held?.tile ?? '--color-sunken'} size={30} />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[13px] font-bold">{coin.name}</span>
            <span className="text-muted block text-[11px]">{coin.symbol}</span>
          </span>
          {held ? <Badge tone="accent">held</Badge> : null}
        </button>

        <span className="tnum text-ink text-right text-[13px] font-bold">{price(coin.price)}</span>
        <Change value={coin.change24h} />
        <Change value={coin.change7d} />
        <span className="tnum text-body text-right text-[12.5px]">${short(coin.volume)}</span>
        <span className="tnum text-body text-right text-[12.5px]">${short(coin.marketCap)}</span>

        <span className="flex items-center justify-end gap-2">
          <Spark values={series} up={coin.change7d >= 0} width={74} height={26} />
          <button
            type="button"
            data-watch={coin.id}
            aria-pressed={watched}
            aria-label={watched ? `Remove ${coin.name} from watchlist` : `Watch ${coin.name}`}
            onClick={onWatch}
            className={cx(
              'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors',
              watched ? 'text-accent bg-accent-faint' : 'text-muted hover:bg-sunken hover:text-ink',
            )}
          >
            <Icon name="star" size={15} />
          </button>
        </span>
      </div>

      {open ? (
        <div className="border-line mt-2.5 grid grid-cols-4 gap-3 border-t pt-2.5">
          {[
            { k: '1h', v: (coin.change1h >= 0 ? '+' : '') + coin.change1h + '%' },
            { k: 'Circulating supply', v: num(Math.round(coin.supply)) + ' ' + coin.symbol },
            { k: 'Volume / cap', v: ((coin.volume / coin.marketCap) * 100).toFixed(1) + '%' },
            {
              k: 'Your position',
              v: held
                ? num(Math.round(held.quantity * 10_000) / 10_000) + ' ' + held.symbol
                : 'None',
            },
          ].map((d) => (
            <span key={d.k} className="block">
              <span className="text-muted block text-[11px]">{d.k}</span>
              <span className="tnum text-ink mt-1 block truncate text-[12.5px] font-bold">
                {d.v}
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Change({ value: v }: { value: number }) {
  return (
    <span
      className={cx(
        'tnum text-right text-[12.5px] font-bold',
        v > 0 ? 'text-positive' : v < 0 ? 'text-danger' : 'text-muted',
      )}
    >
      {v > 0 ? '+' : ''}
      {v.toFixed(2)}%
    </span>
  );
}
