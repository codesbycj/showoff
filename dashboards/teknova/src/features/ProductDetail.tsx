import { useState } from 'react';

import { Sparkline } from '@/charts/Sparkline';
import { Badge, DeltaBadge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { ProductGlyph } from '@/components/ProductGlyph';
import { Avatar } from '@/components/Avatar';
import { StatusBadge } from '@/components/Badge';
import { TRANSACTIONS, salesSeries, type Product } from '@/data/deck';
import { stockState } from '@/lib/stock';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

/**
 * The selected product.
 *
 * Selecting a row in the table redraws every figure in here — which is the
 * point of a two-pane layout and the thing a still picture of a dashboard
 * cannot show. The restock flag resets on selection via `key` in the pane, so
 * it can never carry across to a different product.
 */
export function ProductDetail({ product }: { product: Product }) {
  const [restocking, setRestocking] = useState(false);
  const state = stockState(product);
  const orders = TRANSACTIONS.filter((t) => t.productId === product.id).slice(0, 4);

  const facts: [string, string][] = [
    ['Price', usd(product.price)],
    ['Units sold', num(product.sold)],
    ['Revenue', usd(product.sold * product.price)],
    ['Rating', product.rating.toFixed(1) + ' / 5'],
  ];

  return (
    <Card pane="product-detail" className="min-h-0 overflow-hidden p-5">
      <div className="flex items-start gap-3">
        <ProductGlyph glyph={product.glyph} size={52} tone="ink" />
        <div className="min-w-0 flex-1">
          <h2 className="text-ink m-0 truncate text-[16px] leading-tight font-bold tracking-[-0.01em]">
            {product.name}
          </h2>
          <p className="text-muted m-0 mt-1 truncate text-[12px]">{product.variant}</p>
        </div>
        <DeltaBadge value={product.delta} size="md" />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Badge tone="quiet">{product.category}</Badge>
        <Badge tone={state === 'out' ? 'warn' : state === 'low' ? 'info' : 'accent'}>
          {state === 'out' ? 'Out of stock' : state === 'low' ? 'Low stock' : 'In stock'}
        </Badge>
      </div>

      <div className="border-line mt-4 rounded-2xl border p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-muted text-[11.5px] font-bold tracking-[0.04em] uppercase">
            Stock on hand
          </span>
          <span className="text-ink text-[14px] font-extrabold">{num(product.stock)}</span>
        </div>
        <span className="bg-sunken-deep mt-2.5 block h-2 overflow-hidden rounded-full">
          <span
            style={{ width: Math.min(100, (product.stock / 500) * 100) + '%' }}
            className={cx(
              'block h-full rounded-full transition-[width] duration-500',
              state === 'out' ? 'bg-warn' : state === 'low' ? 'bg-info' : 'bg-accent',
            )}
          />
        </span>
        <p className="text-muted m-0 mt-2 text-[11.5px]">
          {state === 'out'
            ? 'Nothing left. Reorder before it drops out of search.'
            : state === 'low'
              ? 'Under 100 units — about a fortnight at this rate.'
              : 'Healthy against the fortnight’s run rate.'}
        </p>
      </div>

      <dl className="m-0 mt-4 grid grid-cols-2 gap-x-4 gap-y-3.5">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-muted text-[11px] font-bold tracking-[0.04em] uppercase">
              {label}
            </dt>
            <dd className="text-ink m-0 mt-1 text-[14px] font-extrabold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4">
        <Sparkline
          values={salesSeries(product.id)}
          label="Units, last fortnight"
          unit=""
          height={116}
        />
      </div>

      {/* The orders for this product, out of the same ledger the Dashboard
          shows. Derived rather than authored, so the two panes can never
          disagree about what was bought. */}
      <div className="border-line mt-4 min-h-0 flex-1 border-t pt-3">
        <p className="text-muted m-0 text-[11px] font-bold tracking-[0.04em] uppercase">
          Recent orders
        </p>
        {orders.length === 0 ? (
          <p className="text-muted m-0 mt-2 text-[12px]">No orders for this product today.</p>
        ) : (
          <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
            {orders.map((order) => (
              <li key={order.id} className="flex items-center gap-2">
                <Avatar src={order.face} name={order.customer} size={22} />
                <span className="text-body min-w-0 flex-1 truncate text-[12px] font-semibold">
                  {order.customer}
                </span>
                <span className="text-muted text-[11.5px]">{order.time}</span>
                <StatusBadge status={order.status} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        data-restock
        onClick={() => setRestocking((v) => !v)}
        aria-pressed={restocking}
        className={cx(
          'mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full text-[13.5px] font-bold transition-colors',
          restocking ? 'bg-accent-soft text-accent-deep' : 'bg-fill hover:bg-fill/88 text-fill-fg',
        )}
      >
        <Icon name={restocking ? 'check' : 'plus'} size={16} />
        {restocking ? 'Restock ordered' : 'Order restock'}
      </button>
    </Card>
  );
}
