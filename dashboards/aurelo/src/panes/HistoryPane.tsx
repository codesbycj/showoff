import { useState } from 'react';

import { FlowBars } from '@/charts/FlowBars';
import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { CATEGORIES, MONTHS, TXNS, type Txn } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type SortKey = 'date' | 'amount' | 'name';
type FilterId = 'all' | (typeof CATEGORIES)[number];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  ...CATEGORIES.map((c) => ({ id: c as FilterId, label: c })),
];

const COLS = 'grid-cols-[minmax(0,1fr)_120px_130px_110px]';

/**
 * History: the whole ledger, with the chart that summarises it.
 *
 * The figures above the table are summed from the rows that are showing, so a
 * filter restates them — a summary and a table that can drift apart is a
 * dashboard telling you two different things at once.
 */
export function HistoryPane({ query }: { query: string }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortKey>('date');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) => (filter === 'all' ? true : t.category === filter))
    .filter((t) => (q ? (t.title + ' ' + t.category).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'amount') return (Math.abs(a.amount) - Math.abs(b.amount)) * dir;
      if (sort === 'name') return a.title.localeCompare(b.title) * -dir;
      return (a.stamp - b.stamp) * dir;
    });

  const income = rows.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const expense = rows.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);

  const byCategory = CATEGORIES.map((c) => ({
    id: c,
    value: rows.filter((t) => t.category === c).reduce((s, t) => s + Math.abs(t.amount), 0),
  }))
    .filter((c) => c.value > 0)
    .sort((a, b) => b.value - a.value);
  const catMax = Math.max(...byCategory.map((c) => c.value), 1);

  const head = (key: SortKey, label: string, align: 'left' | 'right') => (
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
    <div data-pane="history" className="grid h-full grid-cols-[1.4fr_1fr] gap-3.5">
      <div className="flex min-h-0 flex-col gap-3.5">
        <div className="grid shrink-0 grid-cols-3 gap-3.5">
          <Figure label="Money in" value={usd(income, true)} tone="positive" />
          <Figure label="Money out" value={usd(expense, true)} tone="ink" />
          <Figure
            label="Net"
            value={usd(income - expense, true)}
            tone={income - expense >= 0 ? 'positive' : 'danger'}
          />
        </div>

        <Card pane="ledger" className="min-h-0 flex-1 p-5 pr-2">
          <CardHead
            className="pr-3"
            title={
              <>
                Ledger{' '}
                <span className="text-muted ml-1 text-[13px] font-semibold">{rows.length}</span>
              </>
            }
          />

          <div className="mt-3 mr-3 overflow-x-auto">
            <Segmented
              name="category"
              size="sm"
              value={filter}
              options={FILTERS}
              onChange={setFilter}
              className="w-max"
            />
          </div>

          <div
            className={cx(
              'text-muted mt-3 grid shrink-0 items-center gap-3 pr-3 pb-2 text-[11px] font-bold tracking-[0.04em] whitespace-nowrap uppercase',
              COLS,
            )}
          >
            {head('name', 'Counterparty', 'left')}
            <span className="text-right">Category</span>
            {head('date', 'Date', 'right')}
            {head('amount', 'Amount', 'right')}
          </div>

          <div data-scroller="ledger" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="transaction" query={query || filter} />
            ) : (
              <ul className="m-0 list-none p-0">
                {rows.map((t) => (
                  <li key={t.id}>
                    <Row txn={t} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-3.5">
        <Card pane="flowbars" className="min-h-0 flex-[1.1] p-5">
          <CardHead title="In and out, by month" />
          <p className="text-muted m-0 mt-1 mb-3 text-[12.5px]">
            Seven months of the account, money in against money out.
          </p>
          <FlowBars
            months={MONTHS}
            format={(n) => usd(n)}
            label={
              'Money in against money out: ' +
              MONTHS.map((m) => `${m.label} in ${usd(m.earned)}, out ${usd(m.spent)}`).join('; ')
            }
          />
        </Card>

        <Card pane="categories" className="min-h-0 flex-1 p-5">
          <CardHead
            title="By category"
            action={<span className="text-muted text-[12.5px]">{rows.length} rows</span>}
          />
          {byCategory.length === 0 ? (
            <p className="text-muted m-0 mt-4 text-[13px]">Nothing matches that filter.</p>
          ) : (
            <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
              {byCategory.map((c) => (
                <li key={c.id} data-mark={'cat-' + c.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-body text-[12.5px]">{c.id}</span>
                    <span className="tnum text-ink text-[12.5px] font-bold">{usd(c.value)}</span>
                  </div>
                  <Meter
                    value={(c.value / catMax) * 100}
                    tone="accent"
                    height={8}
                    className="mt-1.5"
                  />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

function Figure({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'positive' | 'ink' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.split(' ')[1]} className="p-4">
      <p className="text-muted m-0 text-[12.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[23px] leading-none font-bold tracking-[-0.03em]',
          tone === 'positive' && 'text-positive',
          tone === 'ink' && 'text-ink',
          tone === 'danger' && 'text-danger',
        )}
      >
        {value}
      </p>
    </Card>
  );
}

function Row({ txn }: { txn: Txn }) {
  return (
    <div
      data-row={txn.id}
      className={cx(
        'hover:bg-sunken/70 grid items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors',
        COLS,
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {txn.face !== undefined ? (
          <Avatar src={FACES[txn.face]} name={txn.title} size={30} />
        ) : (
          <Mark name={txn.mark} size={30} />
        )}
        <span className="text-ink min-w-0 truncate text-[12.5px] font-semibold">{txn.title}</span>
      </span>
      <span className="flex justify-end">
        <Badge tone="quiet">{txn.category}</Badge>
      </span>
      <span className="tnum text-muted text-right text-[12px]">{txn.date}</span>
      <span
        className={cx(
          'tnum text-right text-[12.5px] font-bold',
          txn.amount >= 0 ? 'text-positive' : 'text-ink',
        )}
      >
        {(txn.amount >= 0 ? '+' : '-') + usd(Math.abs(txn.amount), true)}
      </span>
    </div>
  );
}
