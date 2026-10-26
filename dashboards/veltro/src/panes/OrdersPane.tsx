import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon, Info } from '@/components/Icon';
import {
  CHANNELS,
  ORDERS,
  orderProduct,
  orderValue,
  type Order,
  type OrderState,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type FilterId = 'all' | OrderState;
type SortKey = 'ref' | 'stamp' | 'value' | 'qty';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Fulfilled', label: 'Fulfilled' },
  { id: 'Packing', label: 'Packing' },
  { id: 'Returned', label: 'Returned' },
];

const TONE: Record<OrderState, 'positive' | 'warn' | 'danger'> = {
  Fulfilled: 'positive',
  Packing: 'warn',
  Returned: 'danger',
};

const COLS = 'grid-cols-[104px_minmax(0,1fr)_72px_104px_112px_110px]';

/**
 * Orders.
 *
 * The reference's sidebar names it and puts nothing behind it, so this one is
 * built out of the catalogue the Products tab lists: every order is a product
 * and a quantity, so its value is the two multiplied and nothing here can
 * disagree with the price on the other tab.
 */
export function OrdersPane({ query }: { query: string }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [channel, setChannel] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const base = ORDERS.filter((o) => (filter === 'all' ? true : o.state === filter)).filter((o) =>
    q ? (o.ref + ' ' + orderProduct(o).name).toLowerCase().includes(q) : true,
  );
  const rows = base
    .filter((o) => (channel ? o.channel === channel : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'ref') return a.ref.localeCompare(b.ref) * -dir;
      if (sort === 'value') return (orderValue(a) - orderValue(b)) * dir;
      if (sort === 'qty') return (a.qty - b.qty) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const value = rows.reduce((s, o) => s + orderValue(o), 0);
  const units = rows.reduce((s, o) => s + o.qty, 0);
  const returned = rows.filter((o) => o.state === 'Returned').length;

  const byChannel = CHANNELS.map((c) => ({
    id: c,
    value: base.filter((o) => o.channel === c).reduce((s, o) => s + orderValue(o), 0),
    count: base.filter((o) => o.channel === c).length,
  })).filter((c) => c.count > 0);
  const channelMax = Math.max(...byChannel.map((c) => c.value), 1);

  const head = (key: SortKey, text: string, align: 'left' | 'right' = 'right') => (
    <button
      type="button"
      data-sort={key}
      aria-pressed={sort === key}
      onClick={() => {
        if (sort === key) setDesc((v) => !v);
        else {
          setSort(key);
          setDesc(true);
        }
      }}
      className={cx(
        'hover:text-ink flex items-center gap-1 transition-colors',
        align === 'right' ? 'justify-end' : 'justify-start',
        sort === key ? 'text-ink' : 'text-muted',
      )}
    >
      {text}
      <Icon
        name="chevron-down"
        size={11}
        strokeWidth={2.6}
        className={cx(
          'transition-[transform,opacity]',
          sort === key ? 'opacity-100' : 'opacity-0',
          sort === key && !desc && 'rotate-180',
        )}
      />
    </button>
  );

  return (
    <div data-pane="orders" className="grid h-full grid-cols-[1fr_320px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Order value"
            value={usd(value)}
            note={`${rows.length} of ${ORDERS.length} orders`}
          />
          <Figure label="Units" value={num(units)} note="across those orders" />
          <Figure
            label="Returned"
            value={String(returned)}
            note="need a credit note"
            tone={returned ? 'danger' : 'ink'}
          />
        </div>

        <Card pane="orders" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <span className="flex items-center gap-1.5">
                Orders <Info />
              </span>
            }
            action={
              <Segmented
                name="state"
                size="sm"
                value={filter}
                options={FILTERS}
                onChange={setFilter}
              />
            }
          />

          <div
            className={cx(
              'text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-2 border-b border-[var(--color-line)] px-2 pb-2 text-[10.5px] font-bold whitespace-nowrap',
              COLS,
            )}
          >
            {head('ref', 'Order', 'left')}
            <span>Product</span>
            {head('qty', 'Qty')}
            {head('stamp', 'Placed')}
            {head('value', 'Value')}
            <span className="text-right">State</span>
          </div>

          <div data-scroller="orders" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="order" query={query || filter} />
            ) : (
              <ul className="m-0 list-none p-0">
                {rows.map((o) => (
                  <li key={o.id}>
                    <Row order={o} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <Card pane="by-channel" className="min-h-0 p-4">
        <CardHead
          title={
            <span className="flex items-center gap-1.5">
              By channel <Info />
            </span>
          }
          action={
            channel ? (
              <button
                type="button"
                data-action="clear-channel"
                onClick={() => setChannel(null)}
                className="text-accent-deep hover:bg-accent-faint flex items-center gap-1 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors"
              >
                <Icon name="close" size={12} strokeWidth={2.4} />
                Clear
              </button>
            ) : (
              <span className="text-muted text-[11.5px]">Click to filter</span>
            )
          }
        />

        {byChannel.length === 0 ? (
          <p className="text-muted m-0 mt-4 text-[12.5px]">Nothing matches that filter.</p>
        ) : (
          <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
            {byChannel.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  data-channel={c.id}
                  aria-pressed={channel === c.id}
                  onClick={() => setChannel(channel === c.id ? null : c.id)}
                  className={cx(
                    'w-full rounded-[10px] px-2 py-1.5 text-left transition-colors',
                    channel === c.id ? 'bg-accent-faint' : 'hover:bg-sunken',
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-body text-[12px]">
                      {c.id} <span className="text-muted">· {c.count}</span>
                    </span>
                    <span className="tnum text-ink text-[12px] font-bold">{usd(c.value)}</span>
                  </span>
                  <Meter
                    value={(c.value / channelMax) * 100}
                    tone="accent"
                    height={7}
                    className="mt-1.5"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Figure({
  label,
  value,
  note,
  tone = 'ink',
}: {
  label: string;
  value: string;
  note: string;
  tone?: 'ink' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.split(' ')[0].toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.03em]',
          tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}

function Row({ order }: { order: Order }) {
  const product = orderProduct(order);
  return (
    <div
      data-row={order.id}
      className={cx(
        'border-line hover:bg-sunken mr-2.5 grid items-center gap-2 border-b px-2 py-2.5 transition-colors',
        COLS,
      )}
    >
      <span className="tnum text-ink text-[11.5px] font-bold">{order.ref}</span>
      <span className="min-w-0">
        <span className="text-ink block truncate text-[12px] font-semibold">{product.name}</span>
        <span className="text-muted block truncate text-[10.5px]">{order.channel}</span>
      </span>
      <span className="tnum text-body text-right text-[11.5px]">{order.qty}</span>
      <span className="tnum text-muted text-right text-[11.5px]">{order.placed}</span>
      <span className="tnum text-ink text-right text-[12px] font-bold">
        {usd(orderValue(order))}
      </span>
      <span className="flex justify-end">
        <Badge tone={TONE[order.state]} dot>
          {order.state}
        </Badge>
      </span>
    </div>
  );
}
