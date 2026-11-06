import { useState } from 'react';

import { Badge, Card, CardHead, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, SearchBox, SelectPill } from '@/components/Controls';
import { AssetDisc, Icon } from '@/components/Icon';
import {
  ACCOUNTS,
  COST_METHOD,
  TXS,
  TX_LABEL,
  feesPaid,
  holdingOf,
  realised,
  txValue,
  type Tx,
  type TxKind,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type Filter = 'all' | TxKind;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'swap', label: 'Swap' },
  { id: 'send', label: 'Send' },
  { id: 'receive', label: 'Receive' },
  { id: 'reward', label: 'Reward' },
];

const SORTS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'largest', label: 'Largest first' },
  { id: 'asset', label: 'By asset' },
];

const KIND_TONE: Record<TxKind, 'positive' | 'danger' | 'accent' | 'quiet'> = {
  buy: 'positive',
  sell: 'danger',
  swap: 'accent',
  send: 'quiet',
  receive: 'quiet',
  reward: 'accent',
};

/**
 * Activity. Assembly only (rule 4).
 *
 * The ledger, and the tab a tax return is built from — which is why the
 * realised figure prints its cost-basis method beside it. A realised P&L
 * without the method is a number nobody can check.
 */
export function ActivityPane() {
  const [filter, setFilter] = useState<Filter>('all');
  const [account, setAccount] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [open, setOpen] = useState<string | null>(null);
  const [exported, setExported] = useState(false);

  const q = query.trim().toLowerCase();
  const rows = TXS.filter((t) => (filter === 'all' ? true : t.kind === filter))
    .filter((t) => (account === 'all' ? true : t.account === account))
    .filter((t) => {
      if (!q) return true;
      const h = holdingOf(t.assetId);
      return (h.name + ' ' + h.symbol + ' ' + TX_LABEL[t.kind] + ' ' + t.hash)
        .toLowerCase()
        .includes(q);
    })
    .slice()
    .sort((a, b) =>
      sort === 'newest'
        ? b.at.localeCompare(a.at)
        : sort === 'largest'
          ? txValue(b) - txValue(a)
          : holdingOf(a.assetId).name.localeCompare(holdingOf(b.assetId).name),
    );

  const accountOptions = [
    { id: 'all', label: 'All accounts' },
    ...ACCOUNTS.map((a) => ({ id: a, label: a })),
  ];

  return (
    <div data-pane="activity" className="flex h-full flex-col">
      <PageHead
        title="Activity"
        subtitle="Every buy, sell, transfer and reward on your accounts"
        action={
          <>
            <SelectPill
              name="account"
              value={account}
              options={accountOptions}
              onChange={setAccount}
            />
            <Button
              icon={exported ? 'check' : 'download'}
              name="export"
              onClick={() => setExported((v) => !v)}
            >
              {exported ? 'Exported' : 'Export CSV'}
            </Button>
          </>
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        {[
          { k: 'Transactions', v: num(TXS.length), note: 'in this ledger' },
          { k: 'Realised P&L', v: usd(realised()), note: `on sells, ${COST_METHOD} basis` },
          { k: 'Fees paid', v: usd(feesPaid(), true), note: 'across all accounts' },
          {
            k: 'Pending',
            v: String(TXS.filter((t) => t.status === 'pending').length),
            note: 'awaiting confirmation',
          },
        ].map((s) => (
          <li key={s.k}>
            <div
              data-stat={s.k.toLowerCase().replace(/[^a-z]/g, '')}
              className="border-line bg-surface rounded-[var(--radius-card)] border px-5 py-4 shadow-[var(--shadow-card)]"
            >
              <span className="text-muted block text-[12px]">{s.k}</span>
              <span className="tnum text-ink mt-2 block text-[24px] leading-none font-extrabold tracking-[-0.03em]">
                {s.v}
              </span>
              <span className="text-muted mt-2 block text-[11.5px]">{s.note}</span>
            </div>
          </li>
        ))}
      </ul>

      <Card pane="ledger" className="min-h-0 flex-1 p-5">
        <CardHead
          title="Ledger"
          action={
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search asset, type or hash"
                name="activity"
                className="w-[260px]"
              />
              <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
            </>
          }
        />

        <ul className="m-0 mt-3 flex shrink-0 list-none flex-wrap gap-2 p-0">
          {FILTERS.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                data-filter={f.id}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cx(
                  'flex h-8 items-center gap-2 rounded-full border px-3.5 text-[12px] font-bold transition-colors',
                  filter === f.id
                    ? 'bg-accent text-accent-fg border-transparent'
                    : 'border-line text-body hover:bg-sunken hover:text-ink',
                )}
              >
                {f.label}
                <span
                  className={cx(
                    'tnum rounded-full px-1.5 text-[10.5px]',
                    filter === f.id ? 'bg-white/20' : 'bg-sunken text-muted',
                  )}
                >
                  {f.id === 'all' ? TXS.length : TXS.filter((t) => t.kind === f.id).length}
                </span>
              </button>
            </li>
          ))}
          <li className="ml-auto flex items-center">
            <Badge>
              {rows.length} of {TXS.length}
            </Badge>
          </li>
        </ul>

        <div data-scroller="ledger" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {rows.map((t) => (
                <li key={t.id}>
                  <TxRow
                    tx={t}
                    open={open === t.id}
                    onToggle={() => setOpen(open === t.id ? null : t.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty
              what="transaction"
              query={query || FILTERS.find((f) => f.id === filter)!.label}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

function TxRow({ tx, open, onToggle }: { tx: Tx; open: boolean; onToggle: () => void }) {
  const asset = holdingOf(tx.assetId);
  const outgoing = tx.kind === 'sell' || tx.kind === 'send';

  return (
    <button
      type="button"
      data-row={tx.id}
      aria-expanded={open}
      onClick={onToggle}
      className={cx(
        'w-full rounded-[14px] border px-3.5 py-3 text-left transition-colors',
        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span className="flex items-center gap-3">
        <AssetDisc symbol={asset.symbol} tile={asset.tile} size={34} />
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13.5px] font-bold">
            {TX_LABEL[tx.kind]} {asset.symbol}
          </span>
          <span className="text-muted mt-0.5 block truncate text-[11.5px]">
            {tx.at} · {tx.account}
          </span>
        </span>

        <Badge tone={KIND_TONE[tx.kind]}>{TX_LABEL[tx.kind]}</Badge>
        {tx.status !== 'confirmed' ? (
          <Badge tone={tx.status === 'pending' ? 'quiet' : 'danger'}>{tx.status}</Badge>
        ) : null}

        <span className="shrink-0 text-right">
          <span className="tnum text-ink block text-[13.5px] font-extrabold">
            {outgoing ? '−' : '+'}
            {num(Math.round(tx.quantity * 10_000) / 10_000)} {asset.symbol}
          </span>
          <span className="tnum text-muted block text-[11.5px]">{usd(txValue(tx), true)}</span>
        </span>

        <Icon
          name="chevron-down"
          size={14}
          strokeWidth={2.2}
          className={cx(
            'text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </span>

      {open ? (
        <span className="border-line mt-3 block border-t pt-3">
          <span className="grid grid-cols-4 gap-3">
            {[
              { k: 'Price at the time', v: usd(tx.priceAt, true) },
              { k: 'Fee', v: tx.fee ? usd(tx.fee, true) : 'None' },
              { k: 'Status', v: tx.status },
              { k: 'Hash', v: tx.hash },
            ].map((d) => (
              <span key={d.k} className="block">
                <span className="text-muted block text-[11px]">{d.k}</span>
                <span className="tnum text-ink mt-1 block truncate text-[12.5px] font-bold">
                  {d.v}
                </span>
              </span>
            ))}
          </span>
          {tx.kind === 'sell' ? (
            <span className="text-muted mt-2.5 block text-[11.5px]">
              Realised against a {usd(asset.avgBuy, true)} average cost, {COST_METHOD} basis:{' '}
              <span
                className={cx(
                  'font-bold',
                  tx.priceAt >= asset.avgBuy ? 'text-positive' : 'text-danger',
                )}
              >
                {tx.priceAt >= asset.avgBuy ? '+' : '−'}
                {usd(Math.abs((tx.priceAt - asset.avgBuy) * tx.quantity), true)}
              </span>
            </span>
          ) : null}
        </span>
      ) : null}
    </button>
  );
}
