import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { EngagementBars } from '@/charts/EngagementBars';
import { useDefIds } from '@/charts/ids';
import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Button, IconButton, Segmented } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import {
  CREDIT,
  MANDATORY,
  PAYMENTS,
  PERIODS,
  RANGES,
  WALLETS,
  WEEKLY_REVENUE,
  balanceSeries,
  engagement,
  peakOf,
  type Status,
  type Wallet,
} from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

const TONE: Record<Status, 'positive' | 'warn' | 'danger'> = {
  Successful: 'positive',
  Pending: 'warn',
  Failed: 'danger',
};

/**
 * The payment-goal card, with the wallet drawn inside it.
 *
 * The face carries an explicit aspect ratio. Given the whole column it
 * stretched to 270x560, and a payment card is about 1.55:1 — a card drawn
 * twice as tall as it is wide stops reading as a card at all.
 */
export function WalletCard({ walletId }: { walletId: string }) {
  const wallet = WALLETS.find((w) => w.id === walletId) ?? WALLETS[0];
  const pct = Math.round((wallet.balance / wallet.goal) * 100);

  return (
    <Card pane="wallet" className="shrink-0 p-4">
      <CardHead
        title={wallet.label}
        action={
          <IconButton icon="arrow-up-right" label="Open the wallet" tone="outline" size={34} />
        }
      />
      <p className="text-muted m-0 mt-0.5 text-[11.5px]">Total amount goal</p>

      <div className="mt-3 flex aspect-[1.55/1] flex-col">
        <Face wallet={wallet} />
      </div>

      <div className="mt-3">
        <Meter value={pct} tone="accent" height={8} />
        <p className="text-muted m-0 mt-1.5 flex items-baseline justify-between gap-2 text-[11.5px]">
          <span className="tnum">
            {pct}% of {usd(wallet.goal)}
          </span>
          <span className="tnum">{usd(wallet.goal - wallet.balance)} to go</span>
        </p>
      </div>
    </Card>
  );
}

/**
 * The three goals, as a list that picks one.
 *
 * It replaces a segmented control inside the wallet card: with the face at a
 * fixed aspect that column had 300px of slack under it, and the goals are the
 * fact that slack was hiding.
 */
export function GoalsCard({
  walletId,
  onWallet,
}: {
  walletId: string;
  onWallet: (id: string) => void;
}) {
  return (
    <Card pane="goals" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Goals"
        action={<span className="text-muted text-[11.5px]">{WALLETS.length}</span>}
      />

      <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-1.5 p-0">
        {WALLETS.map((w) => {
          const pct = Math.round((w.balance / w.goal) * 100);
          const on = w.id === walletId;
          return (
            <li key={w.id}>
              <button
                type="button"
                data-wallet={w.id}
                aria-pressed={on}
                onClick={() => onWallet(w.id)}
                className={cx(
                  'w-full rounded-[12px] border p-2.5 text-left transition-colors',
                  on ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken/70',
                )}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-ink truncate text-[12.5px] font-bold">{w.label}</span>
                  <span className="tnum text-ink shrink-0 text-[12px] font-bold">{pct}%</span>
                </span>
                <Meter value={pct} tone="accent" height={6} className="mt-2" />
                <span className="tnum text-muted mt-1.5 block text-[10.5px]">
                  {usd(w.balance)} of {usd(w.goal)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

function Face({ wallet }: { wallet: Wallet }) {
  const ids = useDefIds('sheen');
  return (
    <div
      data-cardface={wallet.id}
      className="bg-accent-deep relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-[14px] p-3.5"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 300 180"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={ids.sheen} x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="300" height="180" fill={`url(#${ids.sheen})`} />
        <circle cx="268" cy="162" r="78" fill="#ffffff" opacity="0.1" />
      </svg>

      <div className="relative flex items-start justify-between">
        <span className="text-[14px] font-extrabold tracking-[0.12em] text-white italic">
          {wallet.scheme.split(' ')[0].toUpperCase()}
        </span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-white"
        >
          <path
            d="M8 7.5a7 7 0 0 1 0 9M11.5 5.5a10.5 10.5 0 0 1 0 13M15 3.5a14 14 0 0 1 0 17"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="relative m-0 text-[11px] text-white/90">{wallet.scheme}</p>

      <p className="tnum relative m-0 text-[22px] leading-none font-bold tracking-[-0.02em] text-white">
        {usd(wallet.balance, true)}
      </p>

      <div className="relative flex items-end justify-between gap-3">
        <p className="tnum m-0 text-[12px] tracking-[0.14em] text-white">•••• {wallet.last4}</p>
        <p className="tnum m-0 text-[11px] text-white">EXP {wallet.expiry}</p>
      </div>
    </div>
  );
}

/** Weekly revenue, with its change badge. */
export function WeeklyRevenue() {
  return (
    <Card pane="weekly" className="shrink-0 p-4">
      <p className="text-muted m-0 text-[11.5px]">Weekly Revenue</p>
      <p className="m-0 mt-1.5 flex items-center justify-between gap-3">
        <span className="tnum text-ink text-[22px] leading-none font-bold tracking-[-0.025em]">
          +{usd(WEEKLY_REVENUE.amount)} USD
        </span>
        <Badge tone="accent">+{WEEKLY_REVENUE.delta}%</Badge>
      </p>
    </Card>
  );
}

/** Engagement Rate, with its period control and its bubble. */
export function EngagementCard() {
  const [periodId, setPeriodId] = useState(PERIODS[0].id);
  const bars = useMemo(() => engagement(periodId), [periodId]);
  const peak = peakOf(bars);

  return (
    <Card pane="engagement" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Engagement Rate"
        icon={<Icon name="card" size={16} />}
        action={
          <>
            <Segmented
              name="period"
              size="sm"
              value={periodId}
              options={PERIODS.map((p) => ({ id: p.id, label: p.label })).reverse()}
              onChange={setPeriodId}
            />
            <IconButton icon="arrow-up-right" label="Open engagement" tone="outline" size={34} />
          </>
        }
      />

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <EngagementBars
          bars={bars}
          peakId={peak.id}
          label={'Engagement rate: ' + bars.map((b) => `${b.label} ${b.value}`).join(', ')}
        />
      </div>
    </Card>
  );
}

/** Total balance with its curve and the two actions. */
export function BalanceCard({ onSend, sent }: { onSend: () => void; sent: boolean }) {
  const [rangeId, setRangeId] = useState(RANGES[0].id);
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[0];
  const values = useMemo(() => balanceSeries(rangeId), [rangeId]);

  return (
    <Card pane="balance" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Payment Goal"
        action={
          <Segmented
            name="range"
            size="sm"
            value={rangeId}
            options={RANGES.map((r) => ({ id: r.id, label: r.label }))}
            onChange={setRangeId}
          />
        }
      />
      <p className="text-muted m-0 mt-0.5 text-[11.5px]">Total amount goal</p>

      <p className="m-0 mt-3 text-center">
        <span className="text-muted block text-[11.5px]">Total Balance</span>
        <span
          data-figure="balance"
          className="tnum text-ink mt-1 block text-[26px] leading-none font-bold tracking-[-0.03em]"
        >
          {usd(values[values.length - 1], true)}
        </span>
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col">
        <AreaChart
          values={values}
          ticks={range.ticks}
          format={(n) => '$' + short(n)}
          label={`Total balance over ${range.label}, ending at ${usd(values[values.length - 1], true)}`}
        />
      </div>

      <div className="mt-2 flex items-center justify-center gap-2.5">
        <Button icon="arrow-up" variant="accent" name="send" onClick={onSend}>
          {sent ? 'Sent' : 'Send'}
        </Button>
        <Button icon="arrow-down" variant="outline" name="receive">
          Receive
        </Button>
      </div>
    </Card>
  );
}

/** Amount of credit. */
export function CreditCard() {
  return (
    <Card pane="credit" className="shrink-0 p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="bg-accent-faint text-accent grid h-9 w-9 shrink-0 place-items-center rounded-full">
          <Icon name="wallet" size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-ink m-0 text-[13px] font-bold">Amount of credit</p>
          <p className="text-muted m-0 mt-0.5 text-[11px]">Total refund amount with fee</p>
        </div>
        <IconButton icon="arrow-up-right" label="Open credit" tone="outline" size={34} />
      </div>
      <p className="m-0 mt-3 flex items-baseline gap-2.5">
        <span className="tnum text-ink text-[25px] leading-none font-bold tracking-[-0.03em]">
          {usd(CREDIT.amount, true)}
        </span>
        <Badge tone="accent">+{CREDIT.delta}%</Badge>
      </p>
    </Card>
  );
}

/** Mandatory payments: the avatar stack, and who is behind it. */
export function MandatoryCard({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const shown = MANDATORY.slice(0, 4);
  const behind = MANDATORY.length - shown.length;
  const current = MANDATORY.find((m) => m.id === selected);

  return (
    <Card pane="mandatory" className="shrink-0 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-ink m-0 text-[13px] font-bold">Mandatory Payments</p>
          <p className="text-muted m-0 mt-0.5 text-[11px]">Recent payments</p>
        </div>
        <IconButton
          icon="arrow-up-right"
          label="Open mandatory payments"
          tone="outline"
          size={34}
        />
      </div>

      <div className="mt-3 flex items-center">
        {shown.map((m, i) => (
          <button
            key={m.id}
            type="button"
            data-payee={m.id}
            aria-pressed={selected === m.id}
            title={m.name}
            onClick={() => onSelect(selected === m.id ? null : m.id)}
            style={{ marginLeft: i === 0 ? 0 : -10 }}
            className="rounded-full transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Avatar
              src={FACES[m.face]}
              name={m.name}
              size={38}
              className={cx('ring-2', selected === m.id ? 'ring-accent' : 'ring-white')}
            />
          </button>
        ))}
        <span className="bg-accent-deep -ml-2.5 grid h-[38px] w-[38px] place-items-center rounded-full text-[12px] font-bold text-white ring-2 ring-white">
          +{behind}
        </span>
      </div>

      <p data-payee-note className="text-muted m-0 mt-3 truncate text-[11.5px]">
        {current ? (
          <>
            <span className="text-ink font-bold">{current.name}</span> · {usd(current.amount)} ·{' '}
            {current.due}
          </>
        ) : (
          `${MANDATORY.length} payments due this cycle.`
        )}
      </p>
    </Card>
  );
}

/** The payment-history table. */
export function PaymentHistory({
  rows,
  query,
  sort,
  desc,
  onSort,
}: {
  rows: typeof PAYMENTS;
  query: string;
  sort: 'name' | 'stamp' | 'amount';
  desc: boolean;
  onSort: (key: 'name' | 'stamp' | 'amount') => void;
}) {
  const COLS = 'grid-cols-[minmax(0,1.4fr)_120px_104px_118px_minmax(0,1fr)]';

  const head = (
    key: 'name' | 'stamp' | 'amount',
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
    <Card pane="history" className="min-h-0 flex-1 p-4 pr-1.5">
      <CardHead
        className="pr-2.5"
        title="Payment History"
        action={
          <IconButton
            icon="arrow-up-right"
            label="Open the full history"
            tone="outline"
            size={34}
          />
        }
      />
      <p className="text-muted m-0 mt-0.5 text-[11.5px]">Recent payments history</p>

      <div
        className={cx(
          'text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-3 border-b border-[var(--color-line)] px-2 pb-2 text-[11px] font-semibold whitespace-nowrap',
          COLS,
        )}
      >
        {head('name', 'Name')}
        {head('stamp', 'Date')}
        <span>Time</span>
        <span>Status</span>
        {head('amount', 'Amount', 'right')}
      </div>

      <div data-scroller="history" className="scroll-region min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="payment" query={query} />
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((p) => (
              <li key={p.id}>
                <div
                  data-row={p.id}
                  className={cx(
                    'border-line hover:bg-sunken/70 mr-2.5 grid items-center gap-3 border-b px-2 py-2.5 transition-colors',
                    COLS,
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Mark name={p.mark} size={32} />
                    <span className="min-w-0">
                      <span className="text-ink block truncate text-[12.5px] font-bold">
                        {p.name}
                      </span>
                      <span
                        className={cx(
                          'tnum block text-[10.5px] font-semibold',
                          p.delta >= 0 ? 'text-positive' : 'text-danger',
                        )}
                      >
                        {(p.delta >= 0 ? '+' : '') + p.delta}%
                      </span>
                    </span>
                  </span>
                  <span className="tnum text-body text-[11.5px]">{p.date}</span>
                  <span className="tnum text-muted text-[11.5px]">{p.time}</span>
                  <span>
                    <Badge tone={TONE[p.status]} dot>
                      {p.status}
                    </Badge>
                  </span>
                  <span className="tnum text-ink text-right text-[12.5px] font-bold">
                    {usd(p.amount, true)} USD
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
