import { useState } from 'react';

import { Avatar, Badge, Card, CardHead, Meter, type Tone } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { CUSTOMERS, INSIGHTS, ORDERS, type Customer } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type SegmentId = 'all' | Customer['segment'];

const SEGMENTS: { id: SegmentId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'VIP', label: 'VIP' },
  { id: 'Returning', label: 'Returning' },
  { id: 'New', label: 'New' },
];

const TONE: Record<Customer['segment'], Tone> = {
  VIP: 'accent',
  Returning: 'info',
  New: 'positive',
};

const COLS = 'grid-cols-[minmax(0,1fr)_104px_80px_104px_112px]';

/**
 * Customers: the page the whole right-hand column of the dashboard summarises.
 *
 * Selecting a customer fills the card beside the table with their own orders,
 * pulled from the same ledger the Orders tab shows.
 */
export function CustomersPane({ query }: { query: string }) {
  const [segment, setSegment] = useState<SegmentId>('all');
  const [selected, setSelected] = useState(CUSTOMERS[0].id);

  const q = query.trim().toLowerCase();
  const rows = CUSTOMERS.filter((c) => (segment === 'all' ? true : c.segment === segment)).filter(
    (c) => (q ? (c.name + ' ' + c.segment).toLowerCase().includes(q) : true),
  );

  const customer = CUSTOMERS.find((c) => c.id === selected) ?? CUSTOMERS[0];
  const theirOrders = ORDERS.filter((o) => o.customer === customer.name).slice(0, 4);
  const spend = rows.reduce((t, c) => t + c.spend, 0);

  return (
    <div
      data-pane="customers"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(290px,330px)] gap-3"
    >
      <Card pane="customers-table" className="col-span-2 min-h-0 p-4 pr-2">
        <CardHead
          title={
            <>
              Customers{' '}
              <span className="text-muted ml-1 text-[13px] font-semibold">{rows.length}</span>
            </>
          }
          className="pr-2"
          action={
            <Segmented name="Segment" value={segment} options={SEGMENTS} onChange={setSegment} />
          }
        />

        <div
          className={cx(
            'border-line text-muted mt-3.5 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11px] font-bold tracking-[0.04em] whitespace-nowrap uppercase',
            COLS,
          )}
        >
          <span>Customer</span>
          <span>Segment</span>
          <span>Orders</span>
          <span>Spend</span>
          <span>Last order</span>
        </div>

        <div data-scroller="customers" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
          {rows.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <p className="text-muted m-0 text-[13px]">
                No customer matches <span className="text-ink font-bold">{query || segment}</span>.
              </p>
            </div>
          ) : (
            <ul className="m-0 list-none p-0">
              {rows.map((c) => (
                <li key={c.id}>
                  <Row
                    customer={c}
                    selected={selected === c.id}
                    onSelect={() => setSelected(c.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-2.5 pr-3 text-[12px]">
          <span>
            {rows.length} of {CUSTOMERS.length} customers
          </span>
          <span className="text-ink font-bold">{usd(spend)}</span>
        </div>
      </Card>

      <Card pane="customer-detail" className="min-h-0 overflow-hidden p-4">
        <div className="flex items-center gap-3">
          <Avatar src={customer.face} name={customer.name} size={46} />
          <div className="min-w-0 flex-1">
            <p className="text-ink m-0 truncate text-[15px] font-bold">{customer.name}</p>
            <p className="text-muted m-0 mt-0.5 text-[11.5px]">Joined {customer.joined}</p>
          </div>
          <Badge tone={TONE[customer.segment]}>{customer.segment}</Badge>
        </div>

        <dl className="m-0 mt-4 grid grid-cols-2 gap-x-3 gap-y-3.5">
          {(
            [
              ['Orders', num(customer.orders)],
              ['Lifetime spend', usd(customer.spend)],
              ['Average order', usd(customer.spend / customer.orders, true)],
              ['Last order', customer.lastOrder],
            ] as [string, string][]
          ).map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted text-[10.5px] font-bold tracking-[0.05em] uppercase">
                {label}
              </dt>
              <dd className="text-ink m-0 mt-1 text-[13.5px] font-bold">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-line mt-4 rounded-xl border p-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-ink text-[12px] font-bold">Share of retention target</span>
            <span className="text-muted text-[11.5px]">
              {Math.min(100, Math.round((customer.orders / 25) * 100))}%
            </span>
          </div>
          <Meter
            value={Math.min(100, (customer.orders / 25) * 100)}
            tone={customer.segment === 'VIP' ? 'accent' : 'positive'}
            className="mt-2"
          />
          <p className="text-muted m-0 mt-2 text-[11px]">
            The shop's retention sits at {INSIGHTS.retention}% overall.
          </p>
        </div>

        <div className="border-line mt-4 min-h-0 flex-1 border-t pt-3">
          <p className="text-muted m-0 text-[10.5px] font-bold tracking-[0.05em] uppercase">
            Recent orders
          </p>
          {theirOrders.length === 0 ? (
            <p className="text-muted m-0 mt-2 text-[12px]">No orders in this window.</p>
          ) : (
            <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
              {theirOrders.map((o) => (
                <li key={o.id} className="flex items-center gap-2">
                  <Icon name="bag" size={13} className="text-muted shrink-0" />
                  <span className="text-body min-w-0 flex-1 truncate text-[12px]">{o.id}</span>
                  <span className="text-muted shrink-0 text-[11px]">{o.placed}</span>
                  <span className="text-ink shrink-0 text-[12px] font-bold">
                    {usd(o.total, true)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}

function Row({
  customer,
  selected,
  onSelect,
}: {
  customer: Customer;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-row={customer.id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'border-line grid w-full items-center gap-3 border-b py-2.5 pr-3 text-left transition-colors',
        COLS,
        selected ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <Avatar src={customer.face} name={customer.name} size={28} />
        <span className="text-ink min-w-0 truncate text-[12.5px] font-bold">{customer.name}</span>
      </span>
      <span>
        <Badge tone={TONE[customer.segment]}>{customer.segment}</Badge>
      </span>
      <span className="text-body text-[12.5px] tabular-nums">{customer.orders}</span>
      <span className="text-ink text-[12.5px] font-bold tabular-nums">{usd(customer.spend)}</span>
      <span className="text-muted text-[11.5px]">{customer.lastOrder}</span>
    </button>
  );
}
