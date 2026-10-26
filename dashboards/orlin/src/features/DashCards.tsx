import { useMemo, useState } from 'react';

import { Spark } from '@/charts/Spark';
import { SummaryBars } from '@/charts/SummaryBars';
import { Avatar, Badge, Card, Empty } from '@/components/Bits';
import { IconButton, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  SPANS,
  TILES,
  summary,
  summaryTotals,
  tileTrace,
  type Status,
  type Txn,
} from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { euro, fig, signedEuro } from '@/lib/money';

const TONE: Record<Status, 'positive' | 'warn' | 'danger'> = {
  Completed: 'positive',
  Pending: 'warn',
  Declined: 'danger',
};

/** The Summary panel: the two totals and the twelve bars. */
export function SummaryPanel({ masked }: { masked: boolean }) {
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const bars = useMemo(() => summary(spanId), [spanId]);
  const totals = summaryTotals(bars);

  return (
    <section
      data-card="summary"
      className="bg-shelf flex min-h-0 min-w-0 flex-col rounded-[var(--radius-card)] p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[15px] font-bold">Summary</h2>
          <p className="text-muted m-0 mt-0.5 text-[11.5px]">Track your performance.</p>
        </div>
        <SelectPill
          name="span"
          value={spanId}
          options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
          onChange={setSpanId}
        />
      </div>

      <Card pane="summary-inner" className="mt-3 min-h-0 flex-1 p-4">
        <div className="flex shrink-0 items-start justify-between gap-4">
          <Total label="Total income" value={fig(euro(totals.income), masked)} direction="down" />
          <Total label="Total paid" value={fig(euro(totals.paid), masked)} direction="up" />
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <SummaryBars
            bars={bars}
            ticks={span.ticks}
            label={`${span.label} summary: ${bars.length} bars, this period against the one before`}
          />
        </div>
      </Card>
    </section>
  );
}

function Total({
  label,
  value,
  direction,
}: {
  label: string;
  value: string;
  direction: 'up' | 'down';
}) {
  return (
    <div className="min-w-0">
      <p className="text-muted m-0 flex items-center gap-1.5 text-[11.5px]">
        <Icon name={direction === 'down' ? 'arrow-down' : 'arrow-up'} size={13} />
        {label}
      </p>
      <p className="tnum text-ink m-0 mt-1.5 text-[24px] leading-none font-bold tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}

/** The Activity panel: three tiles, one of them inverted. */
export function ActivityPanel({
  masked,
  active,
  onActive,
}: {
  masked: boolean;
  active: string | null;
  onActive: (id: string | null) => void;
}) {
  return (
    <section
      data-card="activity"
      className="bg-shelf flex min-h-0 min-w-0 flex-col rounded-[var(--radius-card)] p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[15px] font-bold">Activity</h2>
          <p className="text-muted m-0 mt-0.5 text-[11.5px]">Track your activity.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <IconButton icon="sliders" label="Activity options" tone="surface" size={36} />
          <IconButton icon="arrow-up-right" label="Open activity" tone="surface" size={36} />
        </div>
      </div>

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-3 gap-3">
        {TILES.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              data-tile={t.id}
              aria-pressed={on}
              onClick={() => onActive(on ? null : t.id)}
              className={cx(
                'flex min-h-0 flex-col rounded-[13px] p-3.5 text-left transition-colors duration-150',
                t.dark ? 'bg-cocoa' : 'bg-surface',
                on && !t.dark && 'ring-accent-deep ring-2',
                on && t.dark && 'ring-accent ring-2',
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cx(
                    'grid h-7 w-7 shrink-0 place-items-center rounded-full',
                    t.dark ? 'text-cocoa-fg bg-white/12' : 'bg-accent-faint text-accent-deep',
                  )}
                >
                  <Icon name="activity" size={14} />
                </span>
                <span
                  className={cx(
                    'truncate text-[12.5px] font-bold',
                    t.dark ? 'text-cocoa-fg' : 'text-ink',
                  )}
                >
                  {t.label}
                </span>
              </span>

              <span
                className={cx(
                  'tnum mt-2.5 flex items-center gap-1 text-[11.5px] font-semibold',
                  t.delta >= 0 ? 'text-positive' : t.dark ? 'text-spark-on-dark' : 'text-danger',
                )}
              >
                <Icon name={t.delta >= 0 ? 'trend-up' : 'trend-down'} size={12} strokeWidth={2.2} />
                {(t.delta >= 0 ? '+' : '') + t.delta}%
              </span>

              <span
                className={cx(
                  'tnum mt-1.5 block text-[19px] leading-none font-bold tracking-[-0.02em]',
                  t.dark ? 'text-cocoa-fg' : 'text-ink',
                )}
              >
                {fig(euro(t.value), masked)}
              </span>

              <span className="mt-auto flex min-h-[46px] pt-3">
                <Spark
                  values={tileTrace(t.id)}
                  stroke={t.dark ? 'var(--color-spark-on-dark)' : 'var(--color-spark-warm)'}
                  label={`${t.label} over the period`}
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** Weekly average / Annual average. */
export function AverageCard({
  label,
  value,
  delta,
  masked,
}: {
  label: string;
  value: number;
  delta: number;
  masked: boolean;
}) {
  return (
    <Card pane={'avg-' + label.split(' ')[0].toLowerCase()} className="p-4">
      <p className="text-muted m-0 flex items-center gap-1.5 text-[11.5px]">
        <Icon name={label.startsWith('Weekly') ? 'calendar' : 'star'} size={13} />
        {label}
      </p>
      <p
        className={cx(
          'tnum m-0 mt-2 flex items-center gap-1 text-[11.5px] font-semibold',
          delta >= 0 ? 'text-positive' : 'text-danger',
        )}
      >
        <Icon name={delta >= 0 ? 'trend-up' : 'trend-down'} size={12} strokeWidth={2.2} />
        {(delta >= 0 ? '+' : '') + delta}%
      </p>
      <p className="tnum text-ink m-0 mt-1.5 text-[22px] leading-none font-bold tracking-[-0.03em]">
        {fig(euro(value), masked)}
      </p>
    </Card>
  );
}

const COLS = 'grid-cols-[minmax(0,1.3fr)_112px_124px_124px_104px]';

/** The transactions table, shared by the Dashboard and Activity tabs. */
export function HistoryTable({
  rows,
  query,
  sort,
  desc,
  onSort,
  scroller,
  masked,
}: {
  rows: Txn[];
  query: string;
  sort: 'name' | 'stamp' | 'amount';
  desc: boolean;
  onSort: (key: 'name' | 'stamp' | 'amount') => void;
  scroller: string;
  masked: boolean;
}) {
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
    <>
      <div
        className={cx(
          'text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-3 border-b border-[var(--color-line)] px-2 pb-2 text-[11px] font-semibold whitespace-nowrap',
          COLS,
        )}
      >
        {head('name', 'Name')}
        <span>ID</span>
        <span>Status</span>
        {head('stamp', 'Date')}
        {head('amount', 'Amount', 'right')}
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
                    'border-line hover:bg-sunken mr-2.5 grid items-center gap-3 border-b px-2 py-2.5 transition-colors',
                    COLS,
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Avatar src={FACES[t.face]} name={t.name} size={30} />
                    <span className="text-ink min-w-0 truncate text-[12.5px] font-semibold">
                      {t.name}
                    </span>
                  </span>
                  <span className="tnum text-muted truncate text-[11.5px]">{t.ref}</span>
                  <span>
                    <Badge tone={TONE[t.status]} dot>
                      {t.status}
                    </Badge>
                  </span>
                  <span className="tnum text-body text-[11.5px]">{t.date}</span>
                  <span
                    className={cx(
                      'tnum text-right text-[12.5px] font-bold',
                      t.amount >= 0 ? 'text-positive' : 'text-ink',
                    )}
                  >
                    {masked ? '••••' : signedEuro(t.amount)}
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

/** The dismissible prompt in the reference's bottom-left corner. */
export function PromptCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <Card pane="prompt" className="shrink-0 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-ink m-0 text-[14px] leading-[19px] font-semibold">
          How is your business management going?
        </p>
        <button
          type="button"
          data-action="dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-muted hover:bg-sunken hover:text-ink grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors"
        >
          <Icon name="close" size={15} />
        </button>
      </div>
    </Card>
  );
}
