import { useState } from 'react';

import { Avatar } from '@/components/Avatar';
import { StatusBadge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { IconButton, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ProductGlyph } from '@/components/ProductGlyph';
import { TRANSACTIONS, productById, type Txn } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type CategoryId = 'all' | 'Audio' | 'Wearables' | 'Power' | 'Displays' | 'Storage';

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Category' },
  { id: 'Audio', label: 'Audio' },
  { id: 'Wearables', label: 'Wearables' },
  { id: 'Power', label: 'Power' },
  { id: 'Displays', label: 'Displays' },
  { id: 'Storage', label: 'Storage' },
];

/** One grid, so the header row and every body row line up exactly. */
const COLS = 'grid-cols-[28px_76px_minmax(0,1.5fr)_118px_minmax(0,1fr)_68px_98px]';

/**
 * The transactions table.
 *
 * Three things narrow it — the category, the shell's search and the row
 * selection — and the footer counts what is left, so a filter that removes four
 * rows is visible twice. That is what makes it obvious on film that the control
 * did something.
 */
export function RecentTransactions({ query }: { query: string }) {
  const [category, setCategory] = useState<CategoryId>('all');
  const [picked, setPicked] = useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const rows = TRANSACTIONS.filter((t) => {
    const product = productById(t.productId);
    if (category !== 'all' && product.category !== category) return false;
    if (!q) return true;
    return (t.id + ' ' + product.name + ' ' + t.customer + ' ' + t.status)
      .toLowerCase()
      .includes(q);
  });

  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <Card pane="transactions" className="col-span-2 min-h-0 p-5 pr-3">
      <CardHead
        title="Recent Transaction"
        icon="clock"
        className="pr-2"
        action={
          <>
            <IconButton icon="search" label="Search in transactions" square size={34} />
            <SelectPill
              name="category"
              value={category}
              options={CATEGORIES}
              onChange={setCategory}
            />
            <IconButton icon="sliders" label="Table settings" square size={34} />
            <IconButton icon="dots" label="More actions" square size={34} />
            <button
              type="button"
              data-export
              className="bg-fill hover:bg-fill/88 text-fill-fg ml-1 flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-bold transition-colors"
            >
              <Icon name="download" size={15} />
              Export
            </button>
          </>
        }
      />

      <div
        className={cx(
          'border-line text-muted mt-4 grid shrink-0 items-center gap-2.5 border-b pr-3 pb-2.5 text-[11px] font-bold tracking-[0.04em] whitespace-nowrap uppercase',
          COLS,
        )}
      >
        <span />
        <span>Order ID</span>
        <span>Product Name</span>
        <span>Date &amp; Time</span>
        <span>Customer</span>
        <span>Price</span>
        <span>Status</span>
      </div>

      <div data-scroller="transactions" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              Nothing matches{' '}
              <span className="text-ink font-bold">
                {query || CATEGORIES.find((c) => c.id === category)?.label}
              </span>
              .
              <br />
              Clear the search or set the category back to All.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((txn) => (
              <li key={txn.id}>
                <Row txn={txn} picked={picked.includes(txn.id)} onToggle={() => toggle(txn.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
        <span>
          {rows.length} of {TRANSACTIONS.length} transactions
        </span>
        <span>
          {picked.length ? (
            <span className="text-ink font-bold">{picked.length} selected</span>
          ) : (
            'Select a row to act on it'
          )}
        </span>
      </div>
    </Card>
  );
}

function Row({ txn, picked, onToggle }: { txn: Txn; picked: boolean; onToggle: () => void }) {
  const product = productById(txn.productId);
  return (
    <div
      data-txn={txn.id}
      className={cx(
        'border-line grid items-center gap-2.5 border-b py-2.5 pr-3 transition-colors',
        COLS,
        picked ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <button
        type="button"
        data-pick={txn.id}
        onClick={onToggle}
        role="checkbox"
        aria-checked={picked}
        aria-label={'Select ' + txn.id}
        className={cx(
          'grid h-6 w-6 place-items-center justify-self-center rounded-[7px] border transition-colors',
          picked
            ? 'border-accent bg-accent text-fill-fg'
            : 'border-line hover:border-muted text-transparent',
        )}
      >
        <Icon name="check" size={13} strokeWidth={2.6} />
      </button>

      <span className="text-body text-[12.5px] font-semibold">{txn.id}</span>

      <span className="flex min-w-0 items-center gap-2.5">
        <ProductGlyph glyph={product.glyph} size={34} />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[13px] font-bold">{product.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{product.variant}</span>
        </span>
      </span>

      <span className="text-body text-[12.5px]">
        {txn.when}, {txn.time}
      </span>

      <span className="flex min-w-0 items-center gap-2">
        <Avatar src={txn.face} name={txn.customer} size={26} />
        <span className="text-body truncate text-[12.5px] font-semibold">{txn.customer}</span>
      </span>

      <span className="text-ink text-[13px] font-bold">{usd(txn.price)}</span>

      <span>
        <StatusBadge status={txn.status} />
      </span>
    </div>
  );
}
