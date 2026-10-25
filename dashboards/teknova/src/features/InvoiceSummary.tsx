import { Card } from '@/components/Card';
import { INVOICES, type InvoiceState } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

export type FilterId = 'all' | InvoiceState;

const STATES: { id: InvoiceState; label: string; bar: string; chip: string }[] = [
  { id: 'Paid', label: 'Paid', bar: 'bg-accent', chip: 'bg-accent-soft text-accent-deep' },
  { id: 'Awaiting', label: 'Awaiting', bar: 'bg-info', chip: 'bg-info-soft text-info-deep' },
  { id: 'Overdue', label: 'Overdue', bar: 'bg-warn', chip: 'bg-warn-soft text-warn-deep' },
  { id: 'Draft', label: 'Draft', bar: 'bg-sunken-deep', chip: 'bg-sunken text-muted' },
];

/**
 * The ledger in four figures, and the control that filters the table below.
 *
 * The tiles are the filter rather than a separate row of chips: the number and
 * the thing you click to see it are the same object, which is one fewer control
 * on a screen that already has plenty.
 */
export function InvoiceSummary({
  active,
  onSelect,
}: {
  active: FilterId;
  onSelect: (id: FilterId) => void;
}) {
  const total = INVOICES.reduce((t, i) => t + i.total, 0);

  const rows = STATES.map((s) => {
    const items = INVOICES.filter((i) => i.state === s.id);
    return { ...s, count: items.length, sum: items.reduce((t, i) => t + i.total, 0) };
  });

  return (
    <Card pane="summary" className="col-span-3 shrink-0 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-ink m-0 text-[16px] font-bold tracking-[-0.01em]">Invoice Ledger</h2>
          <p className="text-muted m-0 mt-1 text-[12.5px]">
            {INVOICES.length} invoices raised this fortnight · {usd(total)} billed
          </p>
        </div>
        <button
          type="button"
          data-segment="all"
          aria-pressed={active === 'all'}
          onClick={() => onSelect('all')}
          className={cx(
            'h-9 rounded-full px-4 text-[12.5px] font-bold transition-colors',
            active === 'all' ? 'bg-fill text-fill-fg' : 'border-line hover:bg-sunken border',
          )}
        >
          Show all
        </button>
      </div>

      {/* One bar, to scale, above the four tiles: the shares are the same
          numbers the tiles carry, so the comparison does not have to be done
          in the reader's head. */}
      <div className="bg-sunken mt-4 flex h-2.5 overflow-hidden rounded-full">
        {rows.map((r) => (
          <span
            key={r.id}
            style={{ width: (r.sum / total) * 100 + '%' }}
            className={cx('block h-full transition-[width] duration-500', r.bar)}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {rows.map((r) => (
          <button
            key={r.id}
            type="button"
            data-segment={r.id}
            aria-pressed={active === r.id}
            onClick={() => onSelect(active === r.id ? 'all' : r.id)}
            className={cx(
              'rounded-2xl border p-3.5 text-left transition-colors',
              active === r.id ? 'border-ink bg-sunken' : 'border-line hover:bg-sunken/60',
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-muted text-[12px] font-bold">{r.label}</span>
              <span className={cx('rounded-full px-2 py-[2px] text-[11px] font-bold', r.chip)}>
                {r.count}
              </span>
            </span>
            <span className="text-ink mt-2 block text-[20px] leading-none font-extrabold tracking-[-0.03em]">
              {usd(r.sum)}
            </span>
            <span className="text-muted mt-1.5 block text-[11.5px]">
              {Math.round((r.sum / total) * 100)}% of billed
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}
