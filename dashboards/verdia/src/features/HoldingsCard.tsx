import { useState } from 'react';

import { Badge, Card, CardHead, Empty } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { HOLDINGS, NET_WORTH, holdingValue, type Currency, type Holding } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

type SortKey = 'name' | 'value' | 'change';

const COLS = 'grid-cols-[minmax(0,1fr)_96px_110px_120px_92px]';

/**
 * The holdings table: sortable both ways, searchable, with an empty state.
 *
 * The sort direction is in the header, not only in the order of the rows — a
 * sort whose only evidence is the rows themselves is indistinguishable from a
 * sort that did nothing, in a screenshot and in a numeric diff alike.
 */
export function HoldingsCard({ currency, query }: { currency: Currency; query: string }) {
  const [sort, setSort] = useState<SortKey>('value');
  const [desc, setDesc] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const rows = HOLDINGS.filter((h) =>
    q ? (h.name + ' ' + h.kind).toLowerCase().includes(q) : true,
  )
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * dir;
      if (sort === 'change') return (a.change - b.change) * dir;
      return (holdingValue(a) - holdingValue(b)) * dir;
    });

  const total = rows.reduce((t, h) => t + holdingValue(h), 0);

  const head = (key: SortKey, label: string, align = 'text-right') => (
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
        align === 'text-right' ? 'justify-end' : 'justify-start',
        sort === key ? 'text-ink' : 'text-muted',
      )}
    >
      {label}
      <Icon
        name="chevron-down"
        size={12}
        strokeWidth={2.4}
        className={cx(
          'transition-[transform,opacity]',
          sort === key ? 'opacity-100' : 'opacity-0',
          sort === key && !desc && 'rotate-180',
        )}
      />
    </button>
  );

  return (
    <Card pane="holdings" className="min-h-0 p-5 pr-2">
      <CardHead
        className="pr-3"
        title={
          <>
            Holdings{' '}
            <span className="text-muted ml-1 text-[13px] font-semibold">{rows.length}</span>
          </>
        }
        icon={<Icon name="wallet" size={16} />}
        action={
          <span className="tnum text-ink text-[14px] font-semibold">
            {money(total, currency, false)}
          </span>
        }
      />

      <div
        className={cx(
          'text-muted mt-3.5 grid shrink-0 items-center gap-3 pr-3 pb-2 text-[11px] font-semibold tracking-[0.04em] whitespace-nowrap uppercase',
          COLS,
        )}
      >
        {head('name', 'Holding', 'text-left')}
        <span className="text-right">Units</span>
        <span className="text-right">Price</span>
        {head('value', 'Value')}
        {head('change', '24h')}
      </div>

      <div data-scroller="holdings" className="scroll-region min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="holding" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((h) => (
              <li key={h.id}>
                <Row
                  holding={h}
                  currency={currency}
                  open={open === h.id}
                  onToggle={() => setOpen((cur) => (cur === h.id ? null : h.id))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function Row({
  holding,
  currency,
  open,
  onToggle,
}: {
  holding: Holding;
  currency: Currency;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-row={holding.id}
      className={cx('rounded-2xl transition-colors', open ? 'bg-sunken' : 'hover:bg-sunken/70')}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cx('grid w-full items-center gap-3 px-2 py-2.5 text-left', COLS)}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon
            name="chevron-right"
            size={13}
            strokeWidth={2.2}
            className={cx('text-muted shrink-0 transition-transform', open && 'rotate-90')}
          />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[12.5px] font-semibold">
              {holding.name}
            </span>
            <span className="text-muted block truncate text-[11px]">{holding.kind}</span>
          </span>
        </span>
        <span className="tnum text-body text-right text-[12.5px]">
          {holding.units.toLocaleString('en-US')}
        </span>
        <span className="tnum text-body text-right text-[12.5px]">
          {money(holding.price, currency)}
        </span>
        <span className="tnum text-ink text-right text-[12.5px] font-semibold">
          {money(holdingValue(holding), currency, false)}
        </span>
        <span className="flex justify-end">
          <Badge tone={holding.change >= 0 ? 'positive' : 'danger'}>
            {(holding.change >= 0 ? '+' : '') + holding.change}%
          </Badge>
        </span>
      </button>

      {open ? (
        <dl className="text-body m-0 grid grid-cols-3 gap-3 px-9 pb-3 text-[11.5px]">
          <div>
            <dt className="text-muted m-0">Weight</dt>
            <dd className="tnum text-ink m-0 font-semibold">
              {Math.round((holdingValue(holding) / NET_WORTH) * 1000) / 10}%
            </dd>
          </div>
          <div>
            <dt className="text-muted m-0">Day move</dt>
            <dd className="tnum text-ink m-0 font-semibold">
              {money((holdingValue(holding) * holding.change) / 100, currency)}
            </dd>
          </div>
          <div>
            <dt className="text-muted m-0">Class</dt>
            <dd className="text-ink m-0 font-semibold">{holding.kind}</dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}
