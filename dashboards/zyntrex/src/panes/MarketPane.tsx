import { useState } from 'react';

import { Spark } from '@/charts/Spark';
import { Badge, Card, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { AssetDisc, Icon } from '@/components/Icon';
import { ASOF, ASSETS, QUOTE, pairOf, spark, type Asset } from '@/data/deck';
import { cx } from '@/lib/cx';
import { pct, short, usd } from '@/lib/format';

type SortKey = 'cap' | 'price' | 'h24' | 'd7' | 'volume';

const COLUMNS: { id: SortKey; label: string }[] = [
  { id: 'price', label: 'Price' },
  { id: 'h24', label: '24h' },
  { id: 'd7', label: '7d' },
  { id: 'volume', label: 'Volume (24h)' },
  { id: 'cap', label: 'Market cap' },
];

/**
 * Market — the ranked table. Assembly only (rule 4).
 *
 * The exchange-specific additions the standard calls for: quote-currency
 * tabs, this desk's own 24h volume rather than the global figure, a watchlist
 * that persists across the other two tabs, and a trade action on every row.
 */
export function MarketPane({
  query,
  watchlist,
  onWatch,
  onOpenTrade,
}: {
  query: string;
  watchlist: string[];
  onWatch: (symbol: string) => void;
  onOpenTrade: (symbol: string) => void;
}) {
  const [sort, setSort] = useState<SortKey>('cap');
  const [descending, setDescending] = useState(true);
  const [lens, setLens] = useState<'all' | 'watchlist' | 'gainers'>('all');

  const q = query.trim().toLowerCase();
  const rows = ASSETS.filter((a) =>
    lens === 'watchlist' ? watchlist.includes(a.symbol) : lens === 'gainers' ? a.h24 > 0 : true,
  )
    .filter((a) => (q ? (a.symbol + ' ' + a.name).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const key = (x: Asset) =>
        sort === 'cap'
          ? x.marketCap
          : sort === 'price'
            ? x.price
            : sort === 'volume'
              ? x.volume24h
              : sort === 'h24'
                ? x.h24
                : x.d7;
      return descending ? key(b) - key(a) : key(a) - key(b);
    });

  const totalCap = ASSETS.reduce((t, a) => t + a.marketCap, 0);
  const totalVol = ASSETS.reduce((t, a) => t + a.volume24h, 0);
  const advancing = ASSETS.filter((a) => a.h24 > 0).length;

  return (
    <div data-pane="market" className="flex h-full flex-col">
      <PageHead
        title="Market"
        note={`${ASSETS.length} ${QUOTE} pairs on this desk · as of ${ASOF.time} ${ASOF.zone}`}
        action={
          <Segmented
            name="lens"
            value={lens}
            options={[
              { id: 'all', label: 'All pairs' },
              { id: 'watchlist', label: `Watchlist (${watchlist.length})` },
              { id: 'gainers', label: 'Advancing' },
            ]}
            onChange={(id) => setLens(id as 'all' | 'watchlist' | 'gainers')}
          />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        <GlobalStat
          k="Market cap, listed pairs"
          v={`$${short(totalCap)}`}
          note="sum of the table"
        />
        <GlobalStat
          k="24h volume, this desk"
          v={`$${short(totalVol)}`}
          note="not the global figure"
        />
        <GlobalStat
          k="Advancing"
          v={`${advancing} of ${ASSETS.length}`}
          note="pairs up over 24 hours"
          tone={advancing * 2 >= ASSETS.length ? 'positive' : 'danger'}
        />
        <GlobalStat k="Quote currency" v={QUOTE} note="every price on this tab" />
      </ul>

      <Card pane="table" className="min-h-0 flex-1 p-4">
        <div className="flex shrink-0 items-center justify-between gap-3 pb-2">
          <span className="text-ink text-[14px] font-bold">
            {lens === 'watchlist'
              ? 'Watchlist'
              : lens === 'gainers'
                ? 'Advancing pairs'
                : 'All pairs'}
          </span>
          <Badge>
            {rows.length} of {ASSETS.length}
          </Badge>
        </div>

        <div data-scroller="market" className="scroll-region min-h-0 flex-1">
          {rows.length ? (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-muted text-[11px]">
                  <th
                    scope="col"
                    className="border-line bg-surface sticky top-0 z-10 w-[34px] border-b py-2"
                  >
                    <span className="sr-only">Watch</span>
                  </th>
                  <th
                    scope="col"
                    className="border-line bg-surface sticky top-0 z-10 border-b px-2 py-2 font-semibold"
                  >
                    Pair
                  </th>
                  {COLUMNS.map((c) => (
                    <th
                      key={c.id}
                      scope="col"
                      aria-sort={
                        sort === c.id ? (descending ? 'descending' : 'ascending') : undefined
                      }
                      className="border-line bg-surface sticky top-0 z-10 border-b px-2 py-2 text-right font-semibold"
                    >
                      <button
                        type="button"
                        data-sort={c.id}
                        onClick={() => {
                          if (sort === c.id) setDescending(!descending);
                          else {
                            setSort(c.id);
                            setDescending(true);
                          }
                        }}
                        className={cx(
                          'ml-auto flex h-7 items-center gap-1 rounded px-1 transition-colors',
                          sort === c.id ? 'text-ink font-bold' : 'hover:text-ink',
                        )}
                      >
                        {c.label}
                        <Icon
                          name={
                            sort === c.id ? (descending ? 'chevron-down' : 'chevron-up') : 'sort'
                          }
                          size={12}
                          strokeWidth={2}
                        />
                      </button>
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="border-line bg-surface sticky top-0 z-10 border-b px-2 py-2 text-right font-semibold"
                  >
                    7d trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((a) => (
                  <Row
                    key={a.symbol}
                    asset={a}
                    watched={watchlist.includes(a.symbol)}
                    onWatch={() => onWatch(a.symbol)}
                    onOpen={() => onOpenTrade(a.symbol)}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <Empty what="pair" query={query || lens} />
          )}
        </div>
      </Card>
    </div>
  );
}

function GlobalStat({
  k,
  v,
  note,
  tone,
}: {
  k: string;
  v: string;
  note: string;
  tone?: 'positive' | 'danger';
}) {
  return (
    <li className="border-line bg-surface rounded-[var(--radius-card)] border p-4 shadow-[var(--shadow-card)]">
      <span className="text-muted block text-[11.5px]">{k}</span>
      <span
        className={cx(
          'tnum mt-1.5 block text-[21px] leading-none font-bold tracking-[-0.02em]',
          tone === 'positive' ? 'text-positive' : tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {v}
      </span>
      <span className="text-muted mt-1.5 block text-[11px]">{note}</span>
    </li>
  );
}

function Row({
  asset: a,
  watched,
  onWatch,
  onOpen,
}: {
  asset: Asset;
  watched: boolean;
  onWatch: () => void;
  onOpen: () => void;
}) {
  return (
    <tr
      data-row={a.symbol.toLowerCase()}
      className="border-line hover:bg-sunken border-b transition-colors"
    >
      <td className="py-2.5">
        <button
          type="button"
          data-watch={a.symbol.toLowerCase()}
          aria-pressed={watched}
          onClick={onWatch}
          title={watched ? `Remove ${a.symbol} from the watchlist` : `Watch ${a.symbol}`}
          className={cx(
            'grid h-8 w-8 place-items-center rounded-full transition-colors',
            watched ? 'text-accent-deep' : 'text-muted/60 hover:text-ink',
          )}
        >
          <Icon name={watched ? 'star-filled' : 'star'} size={15} />
        </button>
      </td>
      <td className="px-2 py-2.5">
        <button
          type="button"
          data-open={a.symbol.toLowerCase()}
          onClick={onOpen}
          title={`Trade ${pairOf(a.symbol)}`}
          className="flex items-center gap-2.5 text-left"
        >
          <AssetDisc symbol={a.symbol} tint={a.tint} size={28} />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[12.5px] font-bold">{a.name}</span>
            <span className="tnum text-muted block truncate text-[10.5px]">{pairOf(a.symbol)}</span>
          </span>
        </button>
      </td>
      <td className="tnum text-ink px-2 py-2.5 text-right text-[12.5px] font-semibold">
        {a.price < 10 ? a.price.toFixed(4) : usd(a.price, true)}
      </td>
      <Change value={a.h24} />
      <Change value={a.d7} />
      <td className="tnum text-body px-2 py-2.5 text-right text-[12.5px]">${short(a.volume24h)}</td>
      <td className="tnum text-body px-2 py-2.5 text-right text-[12.5px]">${short(a.marketCap)}</td>
      <td className="px-2 py-2.5">
        <span className="flex justify-end">
          <Spark values={spark(a.symbol)} label={`${a.symbol} over the last seven days`} />
        </span>
      </td>
    </tr>
  );
}

function Change({ value }: { value: number }) {
  return (
    <td
      className={cx(
        'tnum px-2 py-2.5 text-right text-[12.5px] font-semibold',
        value >= 0 ? 'text-positive' : 'text-danger',
      )}
    >
      {pct(value, 2)}
    </td>
  );
}
