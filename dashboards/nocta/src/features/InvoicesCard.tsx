import { ScoreMeter } from '@/charts/ScoreMeter';
import { StateBadge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { INVOICES, PAYMENT_SCORE, type Invoice } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * The next few invoices, and the payment score above them.
 *
 * "View all invoices" reports upward rather than navigating itself: the pane
 * decides where it goes (rule 4), which is why adding that destination was one
 * line in `OverviewPane` and no change in here.
 */
export function InvoicesCard({ onViewAll }: { onViewAll: () => void }) {
  const soon = INVOICES.slice(0, 3);

  return (
    <Card pane="invoices-card" className="min-h-0 p-5">
      <CardHead
        title="Invoices"
        action={<IconButton icon="plus" label="New invoice" tone="raised" size={32} />}
      />

      <div className="mt-3">
        <ScoreMeter score={PAYMENT_SCORE} />
      </div>

      <ul
        data-scroller="invoices-card"
        className="scroll-region m-0 mt-2 -mr-1 flex min-h-0 flex-1 list-none flex-col p-0 pr-2"
      >
        {soon.map((invoice) => (
          <li key={invoice.id}>
            <Row invoice={invoice} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        data-viewall
        onClick={onViewAll}
        className="text-body hover:text-ink mt-1 flex items-center gap-1.5 self-start py-1.5 text-[12.5px] font-medium transition-colors"
      >
        View all invoices
        <Icon name="arrow-up-right" size={14} />
      </button>
    </Card>
  );
}

function Row({ invoice }: { invoice: Invoice }) {
  return (
    <div
      data-invoice={invoice.id}
      className="border-line flex items-center gap-2 border-b py-2.5 last:border-b-0"
    >
      <span className="w-[54px] shrink-0">
        <span className="text-ink block text-[12.5px] font-medium">{invoice.date}</span>
        <span className="text-muted block text-[11px]">{invoice.due}</span>
      </span>
      <StateBadge state={invoice.state} />
      <span className="text-body min-w-0 flex-1 truncate text-[12.5px]">{invoice.name}</span>
      <span className="text-ink shrink-0 text-[12px] font-semibold tabular-nums">
        {usd(invoice.amount, true)}
      </span>
    </div>
  );
}
