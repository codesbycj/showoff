import { Avatar, Card, CardHead, Empty } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Mark } from '@/components/Icon';
import { TXNS, type Txn } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * Last Transactions.
 *
 * The reference shows three rows and a lot of card under them. Here the list
 * is the ledger — the same one the History tab sorts and the Wallet tab bills
 * against — so it fills its region and scrolls.
 */
export function LastTransactions({
  query,
  open,
  onOpen,
}: {
  query: string;
  open: string | null;
  onOpen: (id: string | null) => void;
}) {
  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) =>
    q ? (t.title + ' ' + t.category).toLowerCase().includes(q) : true,
  );

  return (
    <Card pane="transactions" className="min-h-0 p-5 pr-2">
      <CardHead
        className="pr-3"
        title="Last Transactions"
        action={<IconButton icon="dots-v" label="Transaction options" />}
      />

      <div data-scroller="txns" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="transaction" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((t) => (
              <li key={t.id}>
                <Row
                  txn={t}
                  open={open === t.id}
                  onToggle={() => onOpen(open === t.id ? null : t.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function Row({ txn, open, onToggle }: { txn: Txn; open: boolean; onToggle: () => void }) {
  return (
    <div className={cx('rounded-2xl transition-colors', open ? 'bg-sunken' : 'hover:bg-sunken/70')}>
      <button
        type="button"
        data-row={txn.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-2.5 text-left"
      >
        {txn.face !== undefined ? (
          <Avatar src={FACES[txn.face]} name={txn.title} size={38} />
        ) : (
          <Mark name={txn.mark} size={38} />
        )}
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[14px] font-bold">{txn.title}</span>
          <span className="text-muted block truncate text-[12px]">{txn.date}</span>
        </span>
        <span
          className={cx(
            'tnum shrink-0 text-[14px] font-bold',
            txn.amount >= 0 ? 'text-positive' : 'text-ink',
          )}
        >
          {(txn.amount >= 0 ? '+' : '') + usd(Math.abs(txn.amount), true)}
        </span>
        <span aria-hidden="true" className="text-muted shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M12 6h.01M12 12h.01M12 18h.01" />
          </svg>
        </span>
      </button>

      {open ? (
        <dl className="text-body m-0 grid grid-cols-3 gap-3 px-3 pb-3 text-[11.5px]">
          <div>
            <dt className="text-muted m-0">Category</dt>
            <dd className="text-ink m-0 font-semibold">{txn.category}</dd>
          </div>
          <div>
            <dt className="text-muted m-0">Type</dt>
            <dd className="text-ink m-0 font-semibold">{txn.kind}</dd>
          </div>
          <div>
            <dt className="text-muted m-0">Direction</dt>
            <dd className="text-ink m-0 font-semibold">
              {txn.amount >= 0 ? 'Money in' : 'Money out'}
            </dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}
