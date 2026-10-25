import { useState } from 'react';

import { INVOICES } from '@/data/deck';
import { InvoicesTable } from '@/features/InvoicesTable';
import { LedgerHealth } from '@/features/LedgerHealth';

/**
 * Invoices. Assembly only: the ledger, and the health of it beside the
 * selected row. The pane owns the selection (rule 4).
 */
export function InvoicesPane({ query }: { query: string }) {
  const [selected, setSelected] = useState(INVOICES[0].id);
  const invoice = INVOICES.find((i) => i.id === selected) ?? INVOICES[0];

  return (
    <div
      data-pane="invoices"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(300px,340px)] gap-4"
    >
      <InvoicesTable query={query} selected={selected} onSelect={setSelected} />
      <LedgerHealth key={invoice.id} invoice={invoice} />
    </div>
  );
}
