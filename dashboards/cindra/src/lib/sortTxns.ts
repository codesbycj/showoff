import type { Txn } from '@/data/deck';
import type { SortKey } from '@/features/TransactionTable';

const STATUS_ORDER = { Completed: 2, Pending: 1, Failed: 0 } as const;

/** One sort, used by the Dashboard card and the Transactions tab alike. */
export function sortTxns(rows: Txn[], sort: SortKey, desc: boolean): Txn[] {
  const dir = desc ? -1 : 1;
  return rows.slice().sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
    if (sort === 'amount') return (a.amount - b.amount) * dir;
    if (sort === 'status') return (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) * dir;
    return (a.stamp - b.stamp) * dir;
  });
}
