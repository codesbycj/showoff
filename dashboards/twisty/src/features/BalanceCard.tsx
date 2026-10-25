import { useState } from 'react';

import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { WALLET } from '@/data/deck';
import { cx } from '@/lib/cx';
import { pct, usd } from '@/lib/format';

/**
 * The balance, and what can be done with it.
 *
 * "Withdraw" opens a real panel rather than firing a toast: a control that
 * flashes something and returns to rest is a beat `drive.js` can only prove by
 * catching it mid-flight, and a take can only show by being lucky.
 */
export function BalanceCard() {
  const [withdrawing, setWithdrawing] = useState(false);
  const delta = Math.round(((WALLET.thisMonth - WALLET.lastMonth) / WALLET.lastMonth) * 100);

  return (
    <Card pane="balance" className="col-span-2 min-h-0 flex-row items-stretch gap-8 p-7">
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-muted m-0 text-[12.5px] font-medium tracking-[0.03em] uppercase">
          Available balance
        </p>
        <p className="text-ink m-0 mt-2 text-[46px] leading-none font-bold tracking-[-0.04em]">
          {usd(WALLET.available, true)}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[13px]">
          <span className="text-positive inline-flex items-center gap-1 rounded-full bg-[#e4f3ec] px-2.5 py-1 font-semibold">
            <Icon name="arrow-up-right" size={14} />
            {pct(delta)}
          </span>
          <span className="text-muted">against last month</span>
        </div>

        {/* The two parts of the balance, to scale. available + pending is the
            total, so the bar is the arithmetic rather than a decoration. */}
        <div className="mt-7">
          <div className="bg-sunken flex h-2.5 w-full overflow-hidden rounded-full">
            <span
              style={{ width: (WALLET.available / WALLET.balance) * 100 + '%' }}
              className="bg-ink block h-full"
            />
            <span
              style={{ width: (WALLET.pending / WALLET.balance) * 100 + '%' }}
              className="bg-accent block h-full"
            />
          </div>
          <div className="mt-3 flex items-center gap-6 text-[12.5px]">
            <span className="text-body inline-flex items-center gap-2">
              <span aria-hidden="true" className="bg-ink h-2.5 w-2.5 rounded-full" />
              Cleared <span className="text-ink font-semibold">{usd(WALLET.available)}</span>
            </span>
            <span className="text-body inline-flex items-center gap-2">
              <span aria-hidden="true" className="bg-accent h-2.5 w-2.5 rounded-full" />
              Pending <span className="text-ink font-semibold">{usd(WALLET.pending)}</span>
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2.5 pt-6">
          <button
            type="button"
            data-withdraw
            onClick={() => setWithdrawing((v) => !v)}
            aria-expanded={withdrawing}
            className="bg-ink hover:bg-ink/88 flex h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold text-white transition-colors"
          >
            <Icon name="download" size={17} />
            {withdrawing ? 'Close' : 'Withdraw'}
          </button>
          <button
            type="button"
            className="bg-sunken text-ink hover:bg-sunken-deep flex h-12 items-center gap-2 rounded-full px-5 text-[14px] font-semibold transition-colors"
          >
            <Icon name="plus" size={17} />
            Add method
          </button>
        </div>
      </div>

      <div className="bg-line w-px shrink-0" />

      <div className="flex w-[330px] shrink-0 flex-col justify-between">
        {withdrawing ? <WithdrawPanel /> : <WalletCardArt />}
      </div>
    </Card>
  );
}

/** The card itself: a rounded rect, a chip, and the four digits. Drawn. */
function WalletCardArt() {
  return (
    <>
      <div className="from-ink relative h-[168px] w-full overflow-hidden rounded-[20px] bg-gradient-to-br to-[#2c3442] p-5 text-white">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-white/8"
        />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[12.5px] font-medium text-white/70">{WALLET.card.label}</span>
            <span
              aria-hidden="true"
              className="grid h-7 w-9 place-items-center rounded-[5px] bg-gradient-to-br from-[#e6c178] to-[#c79a46]"
            >
              <span className="block h-3 w-5 rounded-[2px] border border-black/25" />
            </span>
          </div>
          <div>
            <p className="m-0 text-[17px] font-semibold tracking-[0.1em]">
              •••• •••• •••• {WALLET.card.last4}
            </p>
            <p className="m-0 mt-2 text-[11.5px] tracking-[0.06em] text-white/60 uppercase">
              Expires {WALLET.card.expires}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Stat label="Pending" value={usd(WALLET.pending, true)} />
        <Stat label="This month" value={usd(WALLET.thisMonth)} />
      </div>
    </>
  );
}

function WithdrawPanel() {
  const amounts = [500, 1000, 5000];
  return (
    <div
      data-withdraw-panel
      className="bg-sunken flex h-full flex-col justify-between rounded-[20px] p-5"
    >
      <div>
        <p className="text-ink m-0 text-[13px] font-semibold">
          Withdraw to •••• {WALLET.card.last4}
        </p>
        <p className="text-muted m-0 mt-1 text-[12.5px]">
          Arrives in 1–2 working days. {usd(WALLET.available, true)} available.
        </p>
        <div className="mt-4 flex gap-2">
          {amounts.map((a) => (
            <span
              key={a}
              className={cx(
                'bg-surface text-ink flex h-10 flex-1 items-center justify-center rounded-full text-[13px] font-semibold',
              )}
            >
              {usd(a)}
            </span>
          ))}
        </div>
      </div>
      <p className="text-muted m-0 text-[12px]">No fee on the first withdrawal each month.</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sunken rounded-2xl px-4 py-3">
      <p className="text-muted m-0 text-[11.5px] font-medium tracking-[0.03em] uppercase">
        {label}
      </p>
      <p className="text-ink m-0 mt-1 text-[16px] font-semibold">{value}</p>
    </div>
  );
}
