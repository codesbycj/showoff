import { useState } from 'react';

import { DotMatrix } from '@/charts/DotMatrix';
import { MiniBars } from '@/charts/MiniBars';
import { AreaChart } from '@/charts/AreaChart';
import { Avatar, Badge, Card, CardHead, Empty } from '@/components/Bits';
import { Button, IconButton, SearchBox, SelectPill } from '@/components/Controls';
import { Icon, SchemeMark } from '@/components/Icon';
import {
  ACTIVITIES,
  BUSINESS_PLANS,
  CARDS,
  CHIPS,
  CLOCK,
  GROWTH,
  INCOME,
  PAID,
  SPANS,
  STOCKS,
  YEARS,
  clockDays,
  clockRemainder,
  dotShare,
  growthBars,
  stockSeries,
  type ChipId,
} from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three rows of `fr`, so the lower row takes whatever is left and every card
 * reaches the bottom of the shell at 900px and at 1080px alike.
 */
export function OverviewPane({ query }: { query: string }) {
  const [cardId, setCardId] = useState(CARDS[0].id);
  const [incomeSpan, setIncomeSpan] = useState(SPANS[0].id);
  const [paidSpan, setPaidSpan] = useState(SPANS[0].id);
  const [locked, setLocked] = useState(true);
  const [yearId, setYearId] = useState(YEARS[0].id);
  const [chips, setChips] = useState<ChipId[]>(['team', 'insights', 'today']);
  const [activityQuery, setActivityQuery] = useState('');
  const [plan, setPlan] = useState(BUSINESS_PLANS[0].id);
  const [verified, setVerified] = useState(false);
  const [sent, setSent] = useState<'receive' | 'send' | null>(null);

  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];
  const incomeScale = SPANS.find((s) => s.id === incomeSpan)?.scale ?? 1;
  const paidScale = SPANS.find((s) => s.id === paidSpan)?.scale ?? 1;
  const income = INCOME * incomeScale;
  const paid = PAID * paidScale;

  const q = (query + ' ' + activityQuery).trim().toLowerCase();
  const rows = ACTIVITIES.filter((a) => a.tags.some((t) => chips.includes(t))).filter((a) =>
    q ? (a.title + ' ' + a.who).toLowerCase().includes(q) : true,
  );

  const toggleChip = (id: ChipId) =>
    setChips((cur) => (cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]));

  return (
    <div data-pane="overview" className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[28px] leading-none font-semibold tracking-[-0.03em]">
            Financial Overview
          </h2>
          <p className="text-muted m-0 mt-2 text-[12.5px]">
            <span className="text-ink font-semibold">Home</span> &rsaquo; Overview
          </p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[270px_1fr_1fr_150px] gap-4">
        <Card pane="card" className="min-h-0 p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="text-ink">
              <SchemeMark />
            </span>
            <SelectPill
              name="card"
              value={cardId}
              options={CARDS.map((c) => ({ id: c.id, label: c.label }))}
              onChange={setCardId}
            />
          </div>

          <p className="text-muted m-0 mt-4 text-[11px]">Linked to {card.linked}</p>
          <p className="tnum text-ink m-0 mt-1 text-[17px] font-semibold tracking-[0.1em]">
            **** {card.last4}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Button
              icon="arrow-down"
              variant={sent === 'receive' ? 'accent' : 'solid'}
              name="receive"
              onClick={() => setSent(sent === 'receive' ? null : 'receive')}
              className="flex-1 justify-center"
            >
              {sent === 'receive' ? 'Ready' : 'Receive'}
            </Button>
            <Button
              icon="arrow-up"
              variant="outline"
              name="send"
              onClick={() => setSent(sent === 'send' ? null : 'send')}
              className="flex-1 justify-center"
            >
              {sent === 'send' ? 'Sent' : 'Send'}
            </Button>
          </div>

          <div className="border-line mt-auto border-t pt-3">
            <p className="text-muted m-0 text-[11px]">Monthly regular fee</p>
            <p className="tnum text-ink m-0 mt-0.5 text-[15px] font-semibold">
              {usd(card.fee, true)}
            </p>
            <button
              type="button"
              data-action="limits"
              className="text-accent-deep hover:bg-accent-faint mt-2 flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-[11.5px] font-semibold transition-colors"
            >
              <span className="bg-accent h-2 w-2 rounded-full" />
              Edit cards limitation
            </button>
          </div>
        </Card>

        <DotCard
          name="income"
          label="Total income"
          value={income}
          spanId={incomeSpan}
          onSpan={setIncomeSpan}
          share={dotShare(INCOME)}
          tone="dim"
        />
        <DotCard
          name="paid"
          label="Total paid"
          value={paid}
          spanId={paidSpan}
          onSpan={setPaidSpan}
          share={dotShare(PAID)}
          tone="on"
        />

        <div className="flex min-h-0 flex-col gap-4">
          <Card pane="lock" className="shrink-0 items-center p-3 text-center">
            <button
              type="button"
              data-action="lock"
              aria-pressed={locked}
              onClick={() => setLocked((v) => !v)}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={cx(
                  'grid h-10 w-10 place-items-center rounded-full transition-colors',
                  locked ? 'bg-ink-fill text-ink-fg' : 'bg-sunken text-muted',
                )}
              >
                <Icon name="lock" size={17} />
              </span>
              <span className="text-ink text-[11.5px] font-semibold">
                {locked ? 'System Lock' : 'Unlocked'}
              </span>
            </button>
          </Card>

          <Card pane="growth" className="min-h-0 flex-1 p-3">
            <p className="tnum text-ink m-0 text-[21px] leading-none font-semibold tracking-[-0.02em]">
              {GROWTH.pct}%
            </p>
            <p className="text-muted m-0 mt-1 text-[11px]">Growth rate</p>
            <div className="mt-2 min-h-0 flex-1">
              <MiniBars values={growthBars()} label="Growth over the last fourteen periods" />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid min-h-0 flex-[1.25] grid-cols-[270px_1fr] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <Card pane="clock" className="shrink-0 p-4">
            <p className="tnum text-ink m-0 flex items-center gap-2 text-[21px] leading-none font-semibold">
              <Icon name="clock" size={18} className="text-accent" />
              {clockDays()} Days
            </p>
            <p className="tnum text-muted m-0 mt-1.5 text-[11.5px]">
              {CLOCK.hours} hours, {CLOCK.minutes} minutes
            </p>
            <p className="tnum text-muted m-0 mt-0.5 text-[11px]">
              {clockDays()} days and {clockRemainder()} hours, exactly.
            </p>
          </Card>

          <Card pane="stocks" className="min-h-0 flex-1 p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="tnum text-ink m-0 text-[19px] leading-none font-semibold tracking-[-0.02em]">
                  {usd(STOCKS.value, true)}
                </p>
                <p className="text-ink m-0 mt-1.5 text-[12.5px] font-semibold">Main Stocks</p>
                <p className="text-muted m-0 text-[11px]">{STOCKS.note}</p>
              </div>
              <Badge tone="positive">+{STOCKS.delta}%</Badge>
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              {YEARS.map((y) => (
                <button
                  key={y.id}
                  type="button"
                  data-year={y.id}
                  aria-pressed={yearId === y.id}
                  onClick={() => setYearId(y.id)}
                  className={cx(
                    'rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors',
                    yearId === y.id
                      ? 'bg-accent-deep text-white'
                      : 'bg-sunken text-muted hover:text-ink',
                  )}
                >
                  {y.label}
                </button>
              ))}
            </div>

            <div className="mt-2 flex min-h-0 flex-1 flex-col">
              <AreaChart
                values={stockSeries(yearId)}
                ticks={['Q1', 'Q2', 'Q3', 'Q4']}
                format={(n) => '$' + short(n)}
                label={`Main stocks over ${YEARS.find((y) => y.id === yearId)?.label}`}
              />
            </div>
          </Card>
        </div>

        <Card pane="activity" className="min-h-0 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title="Activity manager"
            action={
              <>
                <IconButton icon="sliders" label="Activity display" tone="outline" size={34} />
                <IconButton icon="filter" label="Activity filters" tone="outline" size={34} />
                <IconButton icon="dots-v" label="Activity options" size={34} />
              </>
            }
          />

          <div className="mt-3 mr-2.5 flex flex-wrap items-center gap-2">
            <SearchBox
              value={activityQuery}
              onChange={setActivityQuery}
              placeholder="Search in activities ..."
              className="w-[240px]"
            />
            {CHIPS.map((c) => {
              const on = chips.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  data-chip={c.id}
                  aria-pressed={on}
                  onClick={() => toggleChip(c.id)}
                  className={cx(
                    'flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-colors',
                    on ? 'bg-accent-faint text-accent-deep' : 'bg-sunken text-muted hover:text-ink',
                  )}
                >
                  {c.label}
                  <Icon name={on ? 'close' : 'plus'} size={11} strokeWidth={2.6} />
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1fr_190px_200px] gap-3">
            <div className="flex min-h-0 flex-col">
              <div data-scroller="activity" className="scroll-region min-h-0 flex-1 pr-2">
                {rows.length === 0 ? (
                  <Empty what="activity" query={activityQuery || query || 'that filter'} />
                ) : (
                  <ul className="m-0 list-none p-0">
                    {rows.map((a) => (
                      <li key={a.id}>
                        <div
                          data-row={a.id}
                          className="border-line hover:bg-sunken flex items-center gap-2.5 border-b px-1 py-2.5 transition-colors"
                        >
                          <Avatar src={FACES[a.face]} name={a.who} size={30} />
                          <span className="min-w-0 flex-1">
                            <span className="text-ink block truncate text-[12.5px] font-semibold">
                              {a.title}
                            </span>
                            <span className="text-muted block truncate text-[10.5px]">
                              {a.who} · {a.when}
                            </span>
                          </span>
                          {a.amount !== 0 ? (
                            <span
                              className={cx(
                                'tnum shrink-0 text-[12px] font-semibold',
                                a.amount > 0 ? 'text-positive' : 'text-ink',
                              )}
                            >
                              {usd(Math.abs(a.amount), true)}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="bg-sunken flex min-h-0 flex-col rounded-[13px] p-3">
              <p className="text-ink m-0 flex items-center justify-between text-[12.5px] font-semibold">
                Business plans
                <Icon name="dots-v" size={14} className="text-muted" />
              </p>
              <ul className="m-0 mt-2.5 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-1 p-0">
                {BUSINESS_PLANS.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      data-plan={p.id}
                      aria-pressed={plan === p.id}
                      onClick={() => setPlan(p.id)}
                      className={cx(
                        'flex w-full items-center gap-2 rounded-full px-2 py-1.5 text-left text-[12px] transition-colors',
                        plan === p.id
                          ? 'bg-surface text-ink font-semibold'
                          : 'text-body hover:bg-surface/70',
                      )}
                    >
                      <span
                        className={cx(
                          'h-2 w-2 shrink-0 rounded-full',
                          plan === p.id ? 'bg-accent' : 'bg-sunken-deep',
                        )}
                      />
                      <span className="min-w-0 flex-1 truncate">{p.label}</span>
                      {plan === p.id ? (
                        <Icon name="chevron-down" size={12} className="text-muted" />
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sunken flex min-h-0 flex-col rounded-[13px] p-3">
              <span className="text-accent-deep grid h-9 w-9 place-items-center rounded-full bg-white">
                <Icon name="shield" size={17} />
              </span>
              <p className="text-ink m-0 mt-2.5 text-[12.5px] font-semibold">Wallet Verification</p>
              <p className="text-muted m-0 mt-1 text-[11px] leading-[15px]">
                {verified
                  ? 'Two-step verification is on for this wallet.'
                  : 'Enable 2-step verification to secure your wallet.'}
              </p>
              <Button
                icon={verified ? 'check' : 'shield'}
                variant={verified ? 'solid' : 'accent'}
                name="verify"
                onClick={() => setVerified((v) => !v)}
                className="mt-auto w-full justify-center"
              >
                {verified ? 'Enabled' : 'Enable'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DotCard({
  name,
  label,
  value,
  spanId,
  onSpan,
  share,
  tone,
}: {
  name: string;
  label: string;
  value: number;
  spanId: string;
  onSpan: (id: string) => void;
  share: number;
  tone: 'on' | 'dim';
}) {
  return (
    <Card pane={name} className="min-h-0 p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="bg-sunken text-ink grid h-9 w-9 place-items-center rounded-full">
          <Icon name={name === 'income' ? 'arrow-down' : 'arrow-up'} size={16} />
        </span>
        <SelectPill
          name={name + '-span'}
          value={spanId}
          options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
          onChange={onSpan}
        />
      </div>

      <div className="mt-4 min-h-0 flex-1">
        <DotMatrix
          share={share}
          total={value}
          cols={16}
          rows={6}
          format={(n) => usd(n)}
          label={`${label}: ${usd(value, true)}`}
          tone={tone}
        />
      </div>

      <p className="text-muted m-0 mt-3 text-[11.5px]">{label}</p>
      <p
        data-figure={name}
        className="tnum text-ink m-0 mt-1 text-[23px] leading-none font-semibold tracking-[-0.025em]"
      >
        {usd(value, true)}
      </p>
    </Card>
  );
}
