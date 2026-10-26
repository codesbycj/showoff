import { Badge, Empty } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import type { Status, Txn } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

export type SortKey = 'name' | 'stamp' | 'amount' | 'status';

const TONE: Record<Status, 'positive' | 'warn' | 'danger'> = {
  Completed: 'positive',
  Pending: 'warn',
  Failed: 'danger',
};

/*
 * Two column sets, not one.
 *
 * The dashboard card is 540px wide and the full set left its name column at
 * about 70px — the header's "Transaction Name" ran straight over "Date &
 * Time". The compact set drops the note, which is the column that card has no
 * room to show anyway.
 */
const COLS_FULL = 'grid-cols-[minmax(0,1.25fr)_132px_104px_minmax(0,1.5fr)_104px]';
const COLS_COMPACT = 'grid-cols-[minmax(0,1fr)_104px_96px_96px]';

/**
 * The transactions table, shared by the Dashboard card and the Transactions
 * tab.
 *
 * The sort direction is in the header, not only in the order of the rows — a
 * sort whose only evidence is the rows themselves is indistinguishable from a
 * sort that did nothing, in a screenshot and in a numeric diff alike.
 */
export function TransactionTable({
  rows,
  query,
  sort,
  desc,
  onSort,
  scroller,
  compact = false,
}: {
  rows: Txn[];
  query: string;
  sort: SortKey;
  desc: boolean;
  onSort: (key: SortKey) => void;
  scroller: string;
  compact?: boolean;
}) {
  const COLS = compact ? COLS_COMPACT : COLS_FULL;

  const head = (key: SortKey, label: string, align: 'left' | 'right' = 'left') => (
    <button
      type="button"
      data-sort={key}
      aria-pressed={sort === key}
      onClick={() => onSort(key)}
      className={cx(
        'hover:text-ink flex items-center gap-1 transition-colors',
        align === 'right' ? 'justify-end' : 'justify-start',
        sort === key ? 'text-ink' : 'text-muted',
      )}
    >
      {label}
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
    <>
      <div
        className={cx(
          'bg-sunken text-muted mt-3 grid shrink-0 items-center gap-3 rounded-[10px] px-3 py-2 text-[11px] font-bold whitespace-nowrap',
          COLS,
        )}
      >
        {head('name', compact ? 'Transaction' : 'Transaction Name')}
        {head('stamp', compact ? 'Date' : 'Date & Time')}
        {head('amount', 'Amount', 'right')}
        {compact ? null : <span>Note</span>}
        {head('status', 'Status', 'right')}
      </div>

      <div data-scroller={scroller} className="scroll-region min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="transaction" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((t) => (
              <li key={t.id}>
                <div
                  data-row={t.id}
                  className={cx(
                    'border-line hover:bg-sunken/70 grid items-center gap-3 border-b px-3 transition-colors',
                    COLS,
                    compact ? 'py-2' : 'py-2.5',
                  )}
                >
                  <span className="min-w-0">
                    <span className="text-ink block truncate text-[12px] font-bold">{t.name}</span>
                    <span className="text-muted block truncate text-[10.5px]">{t.category}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="tnum text-body block truncate text-[11.5px]">{t.date}</span>
                    {compact ? null : (
                      <span className="tnum text-muted block truncate text-[10.5px]">{t.time}</span>
                    )}
                  </span>
                  <span className="tnum text-ink text-right text-[12px] font-bold">
                    {usd(t.amount, true)}
                  </span>
                  {compact ? null : (
                    <span className="text-muted min-w-0 truncate text-[11.5px]">{t.note}</span>
                  )}
                  <span className="flex justify-end">
                    <Badge tone={TONE[t.status]}>{t.status}</Badge>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
