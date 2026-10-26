import { useMemo, useState } from 'react';

import { EarningBars } from '@/charts/EarningBars';
import { Badge, Card, CardHead, Delta, Empty, Meter } from '@/components/Bits';
import { Button, IconButton, SelectPill } from '@/components/Controls';
import { CurrencyDisc, Icon, Mark, type IconName } from '@/components/Icon';
import {
  PLANS,
  SPANS,
  WALLETS,
  accountBalance,
  earnings,
  peakOf,
  type Plan,
  type Status,
  type Txn,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const TONE: Record<Status, 'positive' | 'warn' | 'danger'> = {
  Success: 'positive',
  Pending: 'warn',
  Failed: 'danger',
};

const PLAN_GLYPH: Record<Plan['icon'], IconName> = {
  target: 'target',
  shield: 'shield',
  house: 'house',
  plane: 'plane',
};

/** Account balance, the two actions, and the wallet tiles under them. */
export function BalanceCard({
  walletId,
  onWallet,
  sent,
  onSend,
}: {
  walletId: string;
  onWallet: (id: string) => void;
  sent: 'send' | 'request' | null;
  onSend: (next: 'send' | 'request' | null) => void;
}) {
  const wallet = WALLETS.find((w) => w.id === walletId) ?? WALLETS[0];
  const total = accountBalance();
  const shown = Math.round(total * wallet.rate * 100) / 100;

  return (
    <Card pane="balance" className="min-h-0 flex-1 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="bg-accent-faint text-accent-deep grid h-9 w-9 place-items-center rounded-[10px]">
            <Icon name="dollar" size={17} />
          </span>
          <h2 className="text-ink m-0 text-[15px] font-bold">Account Balance</h2>
        </div>
        <SelectPill
          name="currency"
          value={walletId}
          options={WALLETS.map((w) => ({ id: w.id, label: w.code }))}
          onChange={onWallet}
        />
      </div>

      <p className="m-0 mt-3 flex flex-wrap items-baseline gap-2">
        <span
          data-figure="balance"
          className="tnum text-ink text-[30px] leading-none font-extrabold tracking-[-0.035em]"
        >
          {wallet.symbol}
          {shown.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </p>
      <p className="m-0 mt-2 flex items-center gap-1.5">
        <Delta value={3.2} />
        <span className="text-muted text-[11.5px]">from last month</span>
      </p>

      <div className="mt-3.5 flex items-center gap-2.5">
        <Button
          icon="arrow-up"
          variant="accent"
          name="send"
          onClick={() => onSend(sent === 'send' ? null : 'send')}
        >
          {sent === 'send' ? 'Sent' : 'Send Money'}
        </Button>
        <Button
          icon="arrow-down"
          variant="outline"
          name="request"
          onClick={() => onSend(sent === 'request' ? null : 'request')}
        >
          {sent === 'request' ? 'Requested' : 'Request Money'}
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-ink m-0 text-[13px] font-bold">My Wallet</h3>
        <button
          type="button"
          data-action="add-wallet"
          className="text-accent-deep hover:bg-accent-faint flex items-center gap-1 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors"
        >
          <Icon name="plus" size={12} strokeWidth={2.4} />
          Add New
        </button>
      </div>

      <ul className="m-0 mt-2 grid min-h-0 flex-1 list-none grid-cols-2 content-start gap-2 p-0">
        {WALLETS.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              data-wallet={w.id}
              aria-pressed={walletId === w.id}
              onClick={() => onWallet(w.id)}
              className={cx(
                'w-full rounded-[11px] border p-2 text-left transition-colors',
                walletId === w.id
                  ? 'border-accent-deep bg-accent-tint'
                  : 'border-line hover:bg-sunken',
              )}
            >
              <span className="flex items-center gap-2">
                <CurrencyDisc id={w.id} code={w.code} size={26} />
                <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-bold">
                  {w.code}
                </span>
              </span>
              <span className="tnum text-ink mt-1 block text-[12.5px] font-bold">
                {w.symbol}
                {w.held.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={cx(
                  'block text-[10.5px] font-semibold',
                  w.active ? 'text-positive' : 'text-danger',
                )}
              >
                {w.active ? 'Active' : 'Inactive'}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Total Expenses and Total Savings. */
export function StatCard({
  label,
  amount,
  delta,
  goodWhen,
  icon,
}: {
  label: string;
  amount: number;
  delta: number;
  goodWhen: 'up' | 'down';
  icon: IconName;
}) {
  return (
    <Card pane={'stat-' + label.split(' ')[1].toLowerCase()} className="p-4">
      <div className="flex items-center gap-2.5">
        <span className="bg-accent-faint text-accent-deep grid h-9 w-9 place-items-center rounded-[10px]">
          <Icon name={icon} size={17} />
        </span>
        <h2 className="text-ink m-0 flex-1 text-[14px] font-bold">{label}</h2>
        <IconButton icon="dots" label={label + ' options'} size={28} />
      </div>
      <p className="tnum text-ink m-0 mt-3 text-[24px] leading-none font-extrabold tracking-[-0.03em]">
        {usd(amount, true)}
      </p>
      <p className="m-0 mt-2 flex items-center gap-1.5">
        <Delta value={delta} goodWhen={goodWhen} />
        <span className="text-muted text-[11.5px]">from last month</span>
      </p>
    </Card>
  );
}

/** The Overview bars, with their span control. */
export function OverviewCard() {
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const months = useMemo(() => earnings(spanId), [spanId]);
  const peak = peakOf(months);

  return (
    <Card pane="overview" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Overview"
        icon={<Icon name="chart" size={16} />}
        action={
          <>
            <span className="text-body flex items-center gap-1.5 text-[11.5px] font-semibold">
              <span aria-hidden="true" className="bg-accent h-2 w-2 rounded-full" />
              Earnings
            </span>
            <SelectPill
              name="span"
              value={spanId}
              options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
              onChange={setSpanId}
            />
            <IconButton icon="dots" label="Overview options" size={30} />
          </>
        }
      />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <EarningBars
          months={months}
          peakId={peak.id}
          label={'Earnings by month: ' + months.map((m) => `${m.label} ${usd(m.value)}`).join(', ')}
        />
      </div>
    </Card>
  );
}

/** My Savings Plan. */
export function PlansCard({
  open,
  onOpen,
}: {
  open: string | null;
  onOpen: (id: string | null) => void;
}) {
  return (
    <Card pane="plans" className="min-h-0 flex-1 p-4 pr-1.5">
      <CardHead
        className="pr-2.5"
        title="My Savings Plan"
        icon={<Icon name="target" size={16} />}
        action={<IconButton icon="dots" label="Savings options" size={30} />}
      />

      <div data-scroller="plans" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {PLANS.map((p) => {
            const pct = Math.round((p.saved / p.target) * 100);
            const on = open === p.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  data-plan={p.id}
                  aria-expanded={on}
                  onClick={() => onOpen(on ? null : p.id)}
                  className={cx(
                    'w-full rounded-[11px] border p-3 text-left transition-colors',
                    on ? 'border-accent-deep bg-accent-tint' : 'border-line hover:bg-sunken',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="bg-accent-faint text-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-[9px]">
                      <Icon name={PLAN_GLYPH[p.icon]} size={15} />
                    </span>
                    <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-bold">
                      {p.label}
                    </span>
                    <span className="tnum text-ink shrink-0 text-[12px] font-bold">{pct}%</span>
                  </span>
                  <Meter value={pct} tone="accent" height={7} className="mt-2.5" />
                  <span className="tnum text-muted mt-1.5 block text-[11px]">
                    {usd(p.saved)}/{usd(p.target)}
                  </span>
                  {on ? (
                    <span className="tnum text-body mt-1.5 block text-[11px]">
                      {usd(p.target - p.saved)} to go.
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}

const COLS = 'grid-cols-[minmax(0,1.5fr)_150px_104px_104px]';

/** The Recent Transaction table, shared by the Dashboard and Transactions. */
export function TxnTable({
  rows,
  query,
  sort,
  desc,
  onSort,
  scroller,
}: {
  rows: Txn[];
  query: string;
  sort: 'activity' | 'stamp' | 'price';
  desc: boolean;
  onSort: (key: 'activity' | 'stamp' | 'price') => void;
  scroller: string;
}) {
  const head = (
    key: 'activity' | 'stamp' | 'price',
    text: string,
    align: 'left' | 'right' = 'left',
  ) => (
    <button
      type="button"
      data-sort={key}
      aria-pressed={sort === key}
      onClick={() => onSort(key)}
      className={cx(
        'hover:text-ink flex items-center gap-1 transition-colors',
        align === 'right' ? 'justify-end' : 'justify-start',
        sort === key ? 'text-ink' : 'text-muted',
      )}
    >
      {text}
      <Icon
        name="chevron-down"
        size={11}
        strokeWidth={2.6}
        className={cx(
          'transition-[transform,opacity]',
          sort === key ? 'opacity-100' : 'opacity-0',
          sort === key && !desc && 'rotate-180',
        )}
      />
    </button>
  );

  return (
    <>
      <div
        className={cx(
          'bg-sunken text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-3 rounded-[9px] px-3 py-2 text-[11px] font-bold whitespace-nowrap',
          COLS,
        )}
      >
        {head('activity', 'Activity')}
        {head('stamp', 'Date')}
        {head('price', 'Price', 'right')}
        <span className="text-right">Status</span>
      </div>

      <div data-scroller={scroller} className="scroll-region min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="transaction" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((t) => (
              <li key={t.id}>
                <div
                  data-row={t.id}
                  className={cx(
                    'border-line hover:bg-sunken/70 mr-2.5 grid items-center gap-3 border-b px-3 py-2.5 transition-colors',
                    COLS,
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Mark name={t.mark} size={30} />
                    <span className="min-w-0">
                      <span className="text-ink block truncate text-[12.5px] font-bold">
                        {t.activity}
                      </span>
                      <span className="text-muted block truncate text-[10.5px]">{t.category}</span>
                    </span>
                  </span>
                  <span className="tnum text-body text-[11.5px]">{t.date}</span>
                  <span className="tnum text-ink text-right text-[12.5px] font-bold">
                    {usd(t.price, true)}
                  </span>
                  <span className="flex justify-end">
                    <Badge tone={TONE[t.status]} dot>
                      {t.status}
                    </Badge>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
