import { Card, CardHead, Empty } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { TXNS, type Currency, type Txn } from '@/data/deck';
import { cx } from '@/lib/cx';
import { signed } from '@/lib/money';

/**
 * The transactions list.
 *
 * The pending row at the top is the reference's own: a payment waiting on a
 * yes or a no, with the two round controls beside it. Both work here, and the
 * row leaves the list when it is answered — the state is held by the pane, so
 * the card reports upward rather than deciding for itself (rule 4).
 */
export function TransactionsCard({
  currency,
  query,
  pending,
  onAnswer,
  selected,
  onSelect,
}: {
  currency: Currency;
  query: string;
  pending: 'open' | 'approved' | 'declined';
  onAnswer: (next: 'approved' | 'declined') => void;
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const q = query.trim().toLowerCase();
  const match = (t: Txn) => (t.title + ' ' + t.note).toLowerCase().includes(q);

  const pendingTxn = TXNS.find((t) => t.pending)!;
  const rows = TXNS.filter((t) => !t.pending).filter((t) => (q ? match(t) : true));
  const showPending = pending === 'open' && (!q || match(pendingTxn));

  return (
    <Card pane="transactions" className="min-h-0 p-5 pr-2">
      <CardHead
        className="pr-3"
        title="Transactions"
        icon={<Icon name="receipt" size={16} />}
        action={<IconButton icon="dots" label="Transaction options" />}
      />

      {showPending ? (
        <div
          data-row="pending"
          className="border-accent bg-accent-faint mt-3.5 mr-3 flex items-center gap-3 rounded-2xl border p-2.5"
        >
          <Mark name={pendingTxn.mark} size={34} />
          <div className="min-w-0 flex-1">
            <p className="text-ink m-0 flex items-baseline justify-between gap-2 text-[13px] font-semibold">
              <span className="truncate">{pendingTxn.title}</span>
              <span className="tnum shrink-0">{signed(pendingTxn.amount, currency)}</span>
            </p>
            <p className="text-goal-deep m-0 mt-0.5 text-[11.5px] font-medium">{pendingTxn.note}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <IconButton
              icon="check"
              label="Approve payment"
              tone="lime"
              size={30}
              onClick={() => onAnswer('approved')}
            />
            <IconButton
              icon="close"
              label="Decline payment"
              tone="surface"
              size={30}
              onClick={() => onAnswer('declined')}
            />
          </div>
        </div>
      ) : pending !== 'open' ? (
        <p
          data-row="answered"
          className="bg-sunken text-body mt-3.5 mr-3 rounded-2xl px-3.5 py-2.5 text-[12.5px]"
        >
          {pendingTxn.title} was <span className="text-ink font-semibold">{pending}</span>.
        </p>
      ) : null}

      <div data-scroller="txns" className="scroll-region mt-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="transaction" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  data-row={t.id}
                  aria-expanded={selected === t.id}
                  onClick={() => onSelect(selected === t.id ? null : t.id)}
                  className={cx(
                    'flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors',
                    selected === t.id ? 'bg-sunken' : 'hover:bg-sunken',
                  )}
                >
                  <Mark name={t.mark} size={34} />
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[13px] font-semibold">
                      {t.title}
                    </span>
                    <span className="text-muted block truncate text-[11.5px]">
                      {selected === t.id ? t.note : t.when}
                    </span>
                  </span>
                  <span
                    className={cx(
                      'tnum shrink-0 text-[13px] font-semibold',
                      t.amount >= 0 ? 'text-positive' : 'text-danger',
                    )}
                  >
                    {signed(t.amount, currency)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
