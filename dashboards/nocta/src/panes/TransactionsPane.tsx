import { useState } from 'react';

import { TRANSACTIONS } from '@/data/deck';
import { TransactionsTable } from '@/features/TransactionsTable';
import { TxnDetail } from '@/features/TxnDetail';

/**
 * Transactions. Assembly only: the ledger, and the detail of whichever row is
 * selected.
 *
 * The pane owns the selection, not the table — so what selecting a row *does*
 * is one line here (rule 4). The detail is keyed on the transaction, so its
 * flag resets by construction rather than by an effect.
 */
export function TransactionsPane({ query }: { query: string }) {
  const [selected, setSelected] = useState(TRANSACTIONS[0].id);
  const txn = TRANSACTIONS.find((t) => t.id === selected) ?? TRANSACTIONS[0];

  return (
    <div
      data-pane="transactions"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(300px,340px)] gap-4"
    >
      <TransactionsTable query={query} selected={selected} onSelect={setSelected} />
      <TxnDetail key={txn.id} txn={txn} />
    </div>
  );
}
