import { useState } from 'react';

import { InvoiceSummary, type FilterId } from '@/features/InvoiceSummary';
import { InvoicesTable } from '@/features/InvoicesTable';
import { MethodMix } from '@/features/MethodMix';

/**
 * Orders & Invoices. Assembly only.
 *
 * The pane owns the state filter, so the summary tiles at the top and the table
 * below are wired together here rather than knowing about each other — the
 * tiles report a selection, the table reads one (rule 4).
 */
export function OrdersPane({ query }: { query: string }) {
  const [state, setState] = useState<FilterId>('all');

  return (
    <div
      data-pane="orders"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(300px,336px)] grid-rows-[auto_minmax(0,1fr)] gap-4"
    >
      <InvoiceSummary active={state} onSelect={setState} />
      <InvoicesTable query={query} state={state} />
      <MethodMix />
    </div>
  );
}
