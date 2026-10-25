import { useState } from 'react';

import { Badge, Card, Delta } from '@/components/Bits';
import { SelectPill } from '@/components/Controls';
import { Flag, Icon } from '@/components/Icon';
import { BALANCE, WALLETS, type Figure, type Wallet } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const CURRENCIES = WALLETS.map((w) => ({ id: w.code, label: w.code }));

/**
 * The balance, the two actions, and the wallets under them.
 *
 * The currency control is real: picking one shows that wallet's balance in its
 * own symbol rather than converting everything to dollars, which is what a
 * multi-currency account actually does. "Total" is the sum the reference shows.
 */
export function BalanceCard({ onTransfer }: { onTransfer: () => void }) {
  const [code, setCode] = useState<'USD' | 'EUR' | 'GBP' | 'ALL'>('ALL');
  const [selected, setSelected] = useState<string | null>(null);

  const wallet = WALLETS.find((w) => w.code === code);
  const shown = wallet ? wallet.balance : BALANCE.total;
  const symbol = wallet ? wallet.symbol : '$';

  return (
    <Card pane="balance" className="min-h-0 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-muted m-0 text-[13px] font-semibold">Total Balance</p>
        <SelectPill
          name="currency"
          value={code}
          options={[{ id: 'ALL', label: 'All' }, ...CURRENCIES]}
          onChange={(v) => setCode(v as typeof code)}
        />
      </div>

      <p
        data-balance
        className="text-ink m-0 mt-1.5 text-[28px] leading-none font-extrabold tracking-[-0.03em]"
      >
        {symbol}
        {shown.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      <p className="m-0 mt-2 flex items-center gap-2 text-[12px]">
        <Delta value={BALANCE.delta} />
        <span className="text-muted">than last month</span>
      </p>

      <div className="mt-3.5 flex gap-2">
        <button
          type="button"
          data-transfer
          onClick={onTransfer}
          className="bg-fill text-fill-fg hover:bg-fill/88 flex h-10 flex-1 items-center justify-center gap-2 rounded-full text-[13px] font-bold transition-colors"
        >
          <Icon name="transfer" size={16} />
          Transfer
        </button>
        <button
          type="button"
          className="border-line text-ink hover:bg-sunken flex h-11 flex-1 items-center justify-center gap-2 rounded-full border text-[13.5px] font-bold transition-colors"
        >
          <Icon name="request" size={16} />
          Request
        </button>
      </div>

      <div className="border-line mt-4 flex items-center justify-between gap-2 border-t pt-3.5">
        <p className="text-ink m-0 text-[13px] font-bold">Wallets</p>
        <p className="text-muted m-0 text-[12px]">Total {BALANCE.wallets} wallets</p>
      </div>

      <ul
        data-scroller="wallets"
        className="scroll-region m-0 mt-2 -mr-2 flex min-h-0 flex-1 list-none flex-col gap-1.5 p-0 pr-2"
      >
        {WALLETS.map((w) => (
          <li key={w.id}>
            <WalletRow
              wallet={w}
              selected={selected === w.id}
              onSelect={() => setSelected((cur) => (cur === w.id ? null : w.id))}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function WalletRow({
  wallet,
  selected,
  onSelect,
}: {
  wallet: Wallet;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-wallet={wallet.id}
      onClick={onSelect}
      aria-pressed={selected}
      // The border colour is conditional rather than overridden. Two utilities
      // that set the same property have equal specificity, so which one wins
      // is decided by their order in the *stylesheet*, not in the class
      // attribute -- adding `border-ink` after `border-line` silently did
      // nothing, and the selected row stayed four values away from its own
      // hover.
      className={cx(
        'flex w-full items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors',
        selected ? 'border-ink bg-sunken' : 'border-line hover:bg-sunken/60',
      )}
    >
      <Flag country={wallet.country} size={24} />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-ink text-[12.5px] font-bold">{wallet.code}</span>
          <Badge tone={wallet.active ? 'positive' : 'quiet'} dot>
            {wallet.active ? 'Active' : 'Inactive'}
          </Badge>
        </span>
        <span className="text-muted mt-0.5 block text-[11px]">Limit is {wallet.limitLabel}</span>
      </span>
      <span className="text-ink shrink-0 text-[13.5px] font-bold">
        {wallet.symbol}
        {wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </span>
    </button>
  );
}

/** The four figures, two of which the reference fills in the brand orange. */
export function FigureTiles({ figures }: { figures: Figure[] }) {
  return (
    <div className="grid min-h-0 grid-cols-2 gap-3">
      {figures.map((f) => (
        <div
          key={f.id}
          data-figure={f.id}
          className={cx(
            'flex min-h-0 flex-col justify-between rounded-[var(--radius-card)] border p-4',
            f.lead ? 'bg-accent-strong border-accent-strong text-white' : 'border-line bg-surface',
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className={cx('text-[12.5px] font-semibold', f.lead ? 'text-white' : 'text-muted')}
            >
              {f.label}
            </span>
            <span
              className={cx(
                'grid h-7 w-7 place-items-center rounded-full',
                f.lead ? 'bg-white/20 text-white' : 'bg-sunken text-body',
              )}
            >
              <Icon name={f.icon} size={14} />
            </span>
          </div>
          <p
            className={cx(
              'm-0 mt-3 text-[26px] leading-none font-extrabold tracking-[-0.03em]',
              f.lead ? 'text-white' : 'text-ink',
            )}
          >
            {usd(f.value)}
          </p>
          <p className="m-0 mt-2.5 flex items-center gap-2">
            <Delta value={f.delta} on={f.lead ? 'fill' : 'light'} />
            <span className={cx('text-[11.5px]', f.lead ? 'text-white' : 'text-muted')}>
              This month
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
