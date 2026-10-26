import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Mark } from '@/components/Icon';
import {
  CUSTOMERS,
  TXNS,
  customerOrders,
  customerSpend,
  customerTrail,
  productOf,
  txnTotal,
  type Customer,
} from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type TierId = 'all' | Customer['tier'];

const TIERS: { id: TierId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'VIP', label: 'VIP' },
  { id: 'Returning', label: 'Returning' },
  { id: 'New', label: 'New' },
];

const WEEK_TICKS = ['12w', '8w', '4w', 'Now'];

const TIER_ORDER: Customer['tier'][] = ['VIP', 'Returning', 'New'];

/**
 * Who is buying.
 *
 * The reference has no screen behind its customer menu entry, so this one is
 * built out of the ledger it already has: every figure here is summed from the
 * same orders the Transactions tab lists, which is why a refund shows up in
 * both places at once.
 */
export function CustomersPane({ query }: { query: string }) {
  const [tier, setTier] = useState<TierId>('all');
  const [selected, setSelected] = useState(CUSTOMERS[0].id);

  const q = query.trim().toLowerCase();
  const rows = CUSTOMERS.filter((c) => (tier === 'all' ? true : c.tier === tier)).filter((c) =>
    q ? (c.name + ' ' + c.handle).toLowerCase().includes(q) : true,
  );

  const current = CUSTOMERS.find((c) => c.id === selected) ?? CUSTOMERS[0];
  const trail = useMemo(() => customerTrail(current.id), [current.id]);
  const orders = TXNS.filter((t) => t.customerId === current.id);

  const tierMax = Math.max(
    ...TIER_ORDER.map((t) =>
      CUSTOMERS.filter((c) => c.tier === t).reduce((sum, c) => sum + customerSpend(c.id), 0),
    ),
    1,
  );

  return (
    <div data-pane="customers" className="grid h-full grid-cols-[320px_1fr] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="customer-list" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <>
                Customers{' '}
                <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
              </>
            }
          />

          <div className="mt-3 mr-2.5">
            <Segmented name="tier" size="sm" value={tier} options={TIERS} onChange={setTier} />
          </div>

          <div data-scroller="customers" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="customer" query={query || tier} />
            ) : (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((c) => {
                  const on = c.id === selected;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        data-customer={c.id}
                        aria-pressed={on}
                        onClick={() => setSelected(c.id)}
                        className={cx(
                          'flex w-full items-center gap-2.5 rounded-[11px] border p-2.5 text-left transition-colors',
                          on ? 'border-forest bg-sunken' : 'border-line hover:bg-sunken/70',
                        )}
                      >
                        <Avatar src={FACES[c.face]} name={c.name} size={36} />
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[12.5px] font-bold">
                            {c.name}
                          </span>
                          <span className="text-muted block truncate text-[10.5px]">
                            {c.handle}
                          </span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1">
                          <Badge
                            tone={
                              c.tier === 'VIP' ? 'forest' : c.tier === 'New' ? 'accent' : 'quiet'
                            }
                          >
                            {c.tier}
                          </Badge>
                          <span className="tnum text-ink text-[11.5px] font-bold">
                            {usd(customerSpend(c.id))}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>

        {/*
        Six customers in a 790px column left a 240px band of empty card under
        the list. The tier split is a real fact about the same six, so it goes
        in the gap rather than padding filling it.
      */}
        <Card pane="by-tier" className="shrink-0 p-4">
          <CardHead
            title="By tier"
            action={<span className="text-muted text-[11.5px]">by spend</span>}
          />
          <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
            {TIER_ORDER.map((t) => {
              const value = CUSTOMERS.filter((c) => c.tier === t).reduce(
                (sum, c) => sum + customerSpend(c.id),
                0,
              );
              const count = CUSTOMERS.filter((c) => c.tier === t).length;
              return (
                <li key={t} data-mark={'tier-' + t}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-body text-[12px]">
                      {t} <span className="text-muted">· {count}</span>
                    </span>
                    <span className="tnum text-ink text-[12px] font-bold">{usd(value)}</span>
                  </div>
                  <Meter
                    value={(value / tierMax) * 100}
                    tone="accent"
                    height={7}
                    className="mt-1.5"
                  />
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="customer-detail" className="min-h-0 flex-[1.25] p-4">
          <CardHead
            title={current.name}
            icon={<Avatar src={FACES[current.face]} name={current.name} size={30} />}
            action={<Badge tone="quiet">Customer since {current.since}</Badge>}
          />

          <div className="mt-3 grid shrink-0 grid-cols-3 gap-4">
            <Stat label="Lifetime spend" value={usd(customerSpend(current.id))} />
            <Stat label="Orders" value={String(customerOrders(current.id))} />
            <Stat
              label="Average order"
              value={usd(
                customerOrders(current.id)
                  ? Math.round(customerSpend(current.id) / customerOrders(current.id))
                  : 0,
              )}
            />
          </div>

          <div className="mt-3 flex min-h-0 flex-1 flex-col">
            <AreaChart
              values={trail}
              ticks={WEEK_TICKS}
              format={(n) => usd(n)}
              label={`${current.name}'s spend over twelve weeks`}
            />
          </div>
        </Card>

        <Card pane="customer-orders" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title="Their orders"
            action={<span className="text-muted text-[11.5px]">{orders.length} in the ledger</span>}
          />

          <div data-scroller="customer-orders" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
            {orders.length === 0 ? (
              <p className="text-muted m-0 px-1 py-6 text-center text-[12.5px]">
                Nothing in the ledger for {current.name} yet.
              </p>
            ) : (
              <ul className="m-0 list-none p-0">
                {orders.map((t) => (
                  <li key={t.id}>
                    <div
                      data-row={t.id}
                      className="hover:bg-sunken/70 flex items-center gap-2.5 rounded-[11px] p-2 transition-colors"
                    >
                      <Mark name={productOf(t).mark} size={32} />
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block truncate text-[12.5px] font-bold">
                          {productOf(t).name}
                        </span>
                        <span className="text-muted block truncate text-[10.5px]">
                          {t.date} · {t.qty} unit{t.qty === 1 ? '' : 's'}
                        </span>
                      </span>
                      <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">
                        {usd(txnTotal(t))}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sunken rounded-[11px] p-3">
      <p className="text-muted m-0 text-[11px]">{label}</p>
      <p className="tnum text-ink m-0 mt-1 text-[18px] leading-none font-extrabold tracking-[-0.02em]">
        {value}
      </p>
    </div>
  );
}
