import { useState } from 'react';

import { SalesBars } from '@/charts/SalesBars';
import { Avatar, Badge, Card, CardHead, Delta, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  CUSTOMERS,
  INSIGHTS,
  PROMOTIONS,
  QUICK,
  SALES,
  SPANS,
  STATS,
  type SpanId,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

/** The four tinted shortcuts across the top. */
export function QuickActions({ onPick }: { onPick: (id: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <ul className="m-0 grid shrink-0 list-none grid-cols-4 gap-3 p-0">
      {QUICK.map((action) => (
        <li key={action.id}>
          <button
            type="button"
            data-quick={action.id}
            aria-pressed={picked === action.id}
            onClick={() => {
              setPicked((cur) => (cur === action.id ? null : action.id));
              onPick(action.id);
            }}
            style={{ background: action.tint }}
            className={cx(
              'flex w-full items-start gap-2.5 rounded-xl p-3 text-left transition-shadow',
              picked === action.id
                ? 'shadow-[0_0_0_2px_var(--color-ink)]'
                : 'hover:shadow-[0_0_0_1px_var(--color-sunken-deep)]',
            )}
          >
            <span className="text-ink/70 mt-[1px] shrink-0">
              <Icon name={action.icon} size={15} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-ink block truncate text-[12.5px] font-bold">
                {action.title}
              </span>
              <span className="text-ink/70 mt-0.5 block text-[11px] leading-[1.35]">
                {action.sub}
              </span>
            </span>
            <span className="text-ink/50 shrink-0" aria-hidden="true">
              <Icon name="arrow-up-right" size={13} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * The six figures.
 *
 * Cart abandonment is the one where down is good, so its delta is told that —
 * the reference colours a falling abandonment red, which says the opposite of
 * what it means.
 */
export function StatGrid() {
  return (
    <ul className="m-0 grid h-full min-h-0 list-none grid-cols-3 grid-rows-2 gap-3 p-0">
      {STATS.map((stat) => (
        <li key={stat.id} className="min-h-0">
          <div
            data-stat={stat.id}
            className="border-line bg-surface flex h-full flex-col justify-center rounded-[var(--radius-card)] border p-4"
          >
            <p className="text-muted m-0 text-[12.5px] font-semibold">{stat.label}</p>
            <p className="text-ink m-0 mt-1.5 text-[26px] leading-none font-extrabold tracking-[-0.03em]">
              {stat.value}
            </p>
            <p className="m-0 mt-2 flex items-center gap-1.5">
              <Delta value={stat.delta} goodWhen={stat.id === 'abandon' ? 'down' : 'up'} />
              <span className="text-muted text-[11.5px]">{stat.note}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Sales over the chosen span. */
export function SalesAnalytics() {
  const [span, setSpan] = useState<SpanId>('monthly');
  const [active, setActive] = useState<number | null>(null);

  return (
    <Card pane="sales" className="min-h-0 p-4">
      <CardHead
        title="Sales Analytics"
        action={<Segmented name="Span" value={span} options={SPANS} onChange={setSpan} />}
      />
      <div className="mt-3 min-h-0 flex-1">
        <SalesBars bars={SALES[span]} active={active} onActive={setActive} />
      </div>
    </Card>
  );
}

/** The customer column: three counts, the top three, and retention. */
export function CustomerInsights({ onOpen }: { onOpen: () => void }) {
  const top = CUSTOMERS.slice(0, 3);

  const rows: [string, string, number][] = [
    ['New Customers', 'This week', INSIGHTS.newThisWeek],
    ['VIP Customers', 'Active', INSIGHTS.vipActive],
    ['Total Customers', 'All time', INSIGHTS.totalAllTime],
  ];

  return (
    <Card pane="insights" className="min-h-0 p-4">
      <CardHead
        title="Customer Insights"
        action={
          <button
            type="button"
            data-open-customers
            onClick={onOpen}
            className="text-body hover:text-ink -my-1.5 flex items-center gap-1 py-1.5 text-[12px] font-semibold transition-colors"
          >
            See all
            <Icon name="chevron-right" size={13} />
          </button>
        }
      />

      <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
        {rows.map(([label, note, value]) => (
          <li key={label} className="flex items-center gap-2.5">
            <span className="bg-sunken text-body grid h-8 w-8 shrink-0 place-items-center rounded-full">
              <Icon name="users" size={15} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-ink block text-[12.5px] font-semibold">{label}</span>
              <span className="text-muted block text-[11px]">{note}</span>
            </span>
            <span className="text-ink shrink-0 text-[13px] font-bold">{num(value)}</span>
          </li>
        ))}
      </ul>

      <p className="text-muted m-0 mt-4 text-[11.5px] font-bold tracking-[0.04em] uppercase">
        Top customers
      </p>
      <ul
        data-scroller="top-customers"
        className="scroll-region m-0 mt-2 -mr-1 flex min-h-0 flex-1 list-none flex-col gap-1.5 p-0 pr-1"
      >
        {top.map((c) => (
          <li key={c.id} className="flex items-center gap-2.5">
            <Avatar src={c.face} name={c.name} size={30} />
            <span className="min-w-0 flex-1">
              <span className="text-ink block truncate text-[12.5px] font-semibold">{c.name}</span>
              <span className="text-muted block text-[11px]">{c.orders} orders</span>
            </span>
            <span className="text-ink shrink-0 text-[12.5px] font-bold">{usd(c.spend)}</span>
          </li>
        ))}
      </ul>

      <div className="border-line mt-3 border-t pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-ink text-[12.5px] font-bold">Customer Retention</span>
          <Badge tone="positive">{INSIGHTS.retention}%</Badge>
        </div>
        <Meter value={INSIGHTS.retention} tone="positive" className="mt-2" />
        <p className="text-muted m-0 mt-1.5 text-[11px]">
          +{INSIGHTS.retentionDelta}% from last month
        </p>
      </div>
    </Card>
  );
}

/** The promotions that are running. */
export function ActivePromotions() {
  const [paused, setPaused] = useState<string[]>([]);

  return (
    <Card pane="promotions" className="min-h-0 p-4">
      <CardHead title="Active Promotions" />

      <ul
        data-scroller="promotions"
        className="scroll-region m-0 mt-3 -mr-1 flex min-h-0 flex-1 list-none flex-col gap-2 p-0 pr-1"
      >
        {PROMOTIONS.map((promo) => {
          const off = paused.includes(promo.id);
          return (
            <li key={promo.id} className="flex items-center gap-2.5">
              <span className="min-w-0 flex-1">
                <span className="text-ink block truncate text-[12.5px] font-bold">
                  {promo.title}
                </span>
                <span className="text-muted block truncate text-[11px]">
                  {promo.kind} · {promo.detail}
                </span>
              </span>
              <button
                type="button"
                data-promo={promo.id}
                aria-pressed={off}
                onClick={() =>
                  setPaused((cur) =>
                    cur.includes(promo.id) ? cur.filter((x) => x !== promo.id) : [...cur, promo.id],
                  )
                }
                className="shrink-0"
              >
                <Badge tone={off ? 'quiet' : promo.state === 'Scheduled' ? 'info' : 'positive'} dot>
                  {off ? 'Paused' : promo.state}
                </Badge>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
