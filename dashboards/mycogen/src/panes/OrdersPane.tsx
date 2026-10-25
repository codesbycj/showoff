import { useState } from 'react';

import { Avatar, Badge, Card, CardHead, Delta, type Tone } from '@/components/Bits';
import { SelectPill } from '@/components/Controls';
import { ORDERS, type Order, type OrderState } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type FilterId = 'all' | OrderState;
type SortId = 'recent' | 'total' | 'items';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All orders' },
  { id: 'Fulfilled', label: 'Fulfilled' },
  { id: 'Processing', label: 'Processing' },
  { id: 'Packed', label: 'Packed' },
  { id: 'Refunded', label: 'Refunded' },
];

const SORTS: { id: SortId; label: string }[] = [
  { id: 'recent', label: 'Most recent' },
  { id: 'total', label: 'Largest first' },
  { id: 'items', label: 'Most items' },
];

const TONE: Record<OrderState, Tone> = {
  Fulfilled: 'positive',
  Processing: 'info',
  Packed: 'accent',
  Refunded: 'danger',
};

const COLS = 'grid-cols-[104px_minmax(0,1fr)_104px_72px_96px_112px]';

/**
 * Orders: the table every headline figure on the dashboard is an aggregate of.
 *
 * The three figures above it are summed from the rows that are showing, so a
 * filter restates them — the summary and the table cannot drift apart.
 */
export function OrdersPane({ query }: { query: string }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortId>('recent');

  const q = query.trim().toLowerCase();
  const rows = ORDERS.filter((o) => (filter === 'all' ? true : o.state === filter))
    .filter((o) =>
      q ? (o.id + ' ' + o.customer + ' ' + o.channel).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'total') return b.total - a.total;
      if (sort === 'items') return b.items - a.items;
      return ORDERS.indexOf(a) - ORDERS.indexOf(b);
    });

  const revenue = rows.reduce((t, o) => t + o.total, 0);
  const items = rows.reduce((t, o) => t + o.items, 0);
  const aov = rows.length ? revenue / rows.length : 0;

  return (
    <div data-pane="orders" className="flex h-full flex-col gap-3">
      <div className="grid shrink-0 grid-cols-3 gap-3">
        <Figure label="Revenue shown" value={usd(revenue, true)} delta={12.5} />
        <Figure label="Orders shown" value={num(rows.length)} delta={8.2} />
        <Figure label="Average order value" value={usd(aov, true)} delta={3.1} />
      </div>

      <Card pane="orders-table" className="min-h-0 flex-1 p-4 pr-2">
        <CardHead
          title={
            <>
              Orders{' '}
              <span className="text-muted ml-1 text-[13px] font-semibold">{rows.length}</span>
            </>
          }
          className="pr-2"
          action={
            <>
              <SelectPill name="filter" value={filter} options={FILTERS} onChange={setFilter} />
              <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
            </>
          }
        />

        <div
          className={cx(
            'border-line text-muted mt-3.5 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11px] font-bold tracking-[0.04em] whitespace-nowrap uppercase',
            COLS,
          )}
        >
          <span>Order</span>
          <span>Customer</span>
          <span>Placed</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
        </div>

        <div data-scroller="orders" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
          {rows.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <p className="text-muted m-0 text-[13px]">
                No order matches <span className="text-ink font-bold">{query || filter}</span>.
              </p>
            </div>
          ) : (
            <ul className="m-0 list-none p-0">
              {rows.map((order) => (
                <li key={order.id}>
                  <Row order={order} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-2.5 pr-3 text-[12px]">
          <span>
            {rows.length} of {ORDERS.length} orders
          </span>
          <span>{num(items)} items</span>
        </div>
      </Card>
    </div>
  );
}

function Figure({ label, value, delta }: { label: string; value: string; delta: number }) {
  return (
    <Card pane={'fig-' + label.split(' ')[0].toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[12.5px] font-semibold">{label}</p>
      <p className="text-ink m-0 mt-1.5 text-[24px] leading-none font-extrabold tracking-[-0.03em]">
        {value}
      </p>
      <p className="m-0 mt-2">
        <Delta value={delta} />
      </p>
    </Card>
  );
}

function Row({ order }: { order: Order }) {
  return (
    <div
      data-order={order.id}
      className={cx(
        'border-line hover:bg-sunken/60 grid items-center gap-3 border-b py-2.5 pr-3 transition-colors',
        COLS,
      )}
    >
      <span className="text-body text-[12.5px] font-semibold">{order.id}</span>
      <span className="flex min-w-0 items-center gap-2.5">
        <Avatar src={order.face} name={order.customer} size={26} />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[12.5px] font-bold">{order.customer}</span>
          <span className="text-muted block truncate text-[11px]">{order.channel}</span>
        </span>
      </span>
      <span className="text-muted text-[12px]">{order.placed}</span>
      <span className="text-body text-[12.5px] tabular-nums">{order.items}</span>
      <span className="text-ink text-[12.5px] font-bold tabular-nums">
        {usd(order.total, true)}
      </span>
      <span>
        <Badge tone={TONE[order.state]} dot>
          {order.state}
        </Badge>
      </span>
    </div>
  );
}
