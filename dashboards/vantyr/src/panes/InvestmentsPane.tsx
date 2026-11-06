import { useMemo, useState } from 'react';

import { StepChart } from '@/charts/StepChart';
import { Avatar, Badge, Card, CardHead, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, SearchBox, SelectPill } from '@/components/Controls';
import { CompanyDisc, Icon } from '@/components/Icon';
import {
  ACCOUNT,
  NOTES,
  POSITIONS,
  SPANS,
  STATUS_TOKEN,
  TAX_DOCS,
  awaitingDocs,
  gain,
  invested,
  multiple,
  netValue,
  positionMultiple,
  realised,
  stepLabel,
  unrealised,
  valueSteps,
  type Position,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

type SortKey = 'name' | 'date' | 'invested' | 'value' | 'multiple';

const STATUS_FILTERS = [
  { id: 'all', label: 'All statuses' },
  { id: 'Live', label: 'Live' },
  { id: 'Exited', label: 'Exited' },
  { id: 'Writing off', label: 'Writing off' },
];

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three figures across the top, a step chart, the position table, and the two
 * things a private-markets product cannot leave out: the document the
 * platform is waiting on, and the confidentiality notice.
 */
export function InvestmentsPane() {
  const [spanId, setSpanId] = useState(SPANS[2].id);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('value');
  const [descending, setDescending] = useState(true);
  const [exported, setExported] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[2];
  const steps = useMemo(() => valueSteps(spanId), [spanId]);

  const q = query.trim().toLowerCase();
  const rows = POSITIONS.filter((p) => (status === 'all' ? true : p.status === status))
    .filter((p) => (q ? (p.name + ' ' + p.sector + ' ' + p.lead).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const by =
        sort === 'name'
          ? a.name.localeCompare(b.name)
          : sort === 'date'
            ? a.investedOn.localeCompare(b.investedOn)
            : sort === 'invested'
              ? a.invested - b.invested
              : sort === 'multiple'
                ? positionMultiple(a) - positionMultiple(b)
                : a.netValue - b.netValue;
      return descending ? -by : by;
    });

  const onSort = (key: SortKey) => {
    if (key === sort) setDescending((v) => !v);
    else {
      setSort(key);
      setDescending(true);
    }
  };

  return (
    <div data-pane="investments" className="flex h-full flex-col">
      <PageHead
        title="My portfolio"
        subtitle="Every position, what it cost and what it is worth"
        action={
          <>
            <SelectPill
              name="span"
              value={spanId}
              options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
              onChange={setSpanId}
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

      <div className="grid min-h-0 flex-1 grid-cols-[1.75fr_1fr] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <div className="grid shrink-0 grid-cols-3 gap-4">
            <div
              data-kpi="value"
              className="bg-accent text-accent-fg rounded-[var(--radius-card)] px-5 py-4"
            >
              <span className="block text-[12.5px] opacity-80">Portfolio value</span>
              <span className="tnum mt-2 block text-[28px] leading-none font-extrabold tracking-[-0.03em]">
                {usd(netValue())}
              </span>
              <span className="tnum mt-2 block text-[11.5px] opacity-80">
                {usd(unrealised())} unrealised · {usd(realised())} realised
              </span>
            </div>

            {[
              {
                id: 'invested',
                label: 'Total invested',
                value: usd(invested()),
                note: `${POSITIONS.length} positions · ${POSITIONS.filter((p) => p.kind === 'Fund').length} funds`,
              },
              {
                id: 'multiple',
                label: 'Net multiple',
                value: multiple().toFixed(2) + '×',
                note: `${gain() >= 0 ? '+' : ''}${usd(gain())} against cost`,
              },
            ].map((k) => (
              <div
                key={k.id}
                data-kpi={k.id}
                className="border-line bg-surface rounded-[var(--radius-card)] border px-5 py-4 shadow-[var(--shadow-card)]"
              >
                <span className="text-muted block text-[12.5px]">{k.label}</span>
                <span className="tnum text-ink mt-2 block text-[28px] leading-none font-extrabold tracking-[-0.03em]">
                  {k.value}
                </span>
                <span className="text-muted mt-2 block text-[11.5px]">{k.note}</span>
              </div>
            ))}
          </div>

          <Card pane="value-chart" className="min-h-0 shrink-0 basis-[30%] p-5">
            <CardHead
              title="Net value"
              note="Marked at each event, held flat between them"
              action={<Badge tone="accent">{span.label}</Badge>}
            />
            <div className="mt-3 flex min-h-0 flex-1 flex-col">
              <StepChart
                values={steps}
                ticks={span.ticks}
                format={(n) => '$' + short(n)}
                pointLabel={(i) => stepLabel(spanId, i, steps.length)}
                label={`Net portfolio value over ${span.label}, ending at ${usd(netValue())}`}
              />
            </div>
          </Card>

          <Card pane="positions" className="min-h-0 flex-1 p-5">
            <CardHead
              title="Investments"
              action={
                <>
                  <SearchBox
                    value={query}
                    onChange={setQuery}
                    placeholder="Search positions"
                    name="positions"
                    className="w-[200px]"
                  />
                  <SelectPill
                    name="status"
                    value={status}
                    options={STATUS_FILTERS}
                    onChange={setStatus}
                  />
                </>
              }
            />

            <div className="border-line mt-3 grid shrink-0 grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr] gap-3 border-b pb-2">
              {(
                [
                  ['name', 'Company / fund'],
                  ['name', 'Status'],
                  ['date', 'Invest date'],
                  ['invested', 'Invested'],
                  ['value', 'Net value'],
                  ['multiple', 'Multiple'],
                ] as [SortKey, string][]
              ).map(([key, label], i) => (
                <button
                  key={label}
                  type="button"
                  data-sort={label.toLowerCase().replace(/[^a-z]/g, '')}
                  onClick={() => onSort(key)}
                  aria-label={`Sort by ${label}`}
                  className={cx(
                    'flex h-7 items-center gap-1 text-[10.5px] font-bold tracking-[0.08em] uppercase transition-colors',
                    i >= 3 && 'justify-end',
                    sort === key ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {label}
                  <Icon
                    name={sort === key ? (descending ? 'arrow-down' : 'arrow-up') : 'sort'}
                    size={12}
                    strokeWidth={2}
                    className={sort === key ? 'text-accent' : 'opacity-60'}
                  />
                </button>
              ))}
            </div>

            <div data-scroller="positions" className="scroll-region min-h-0 flex-1 pr-2">
              {rows.length ? (
                <ul className="m-0 list-none p-0">
                  {rows.map((p) => (
                    <PositionRow key={p.id} position={p} />
                  ))}
                </ul>
              ) : (
                <Empty what="position" query={query || status} />
              )}
            </div>

            <div className="border-line mt-2 grid shrink-0 grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr] gap-3 border-t pt-2.5">
              <span className="text-ink text-[12px] font-bold">
                {rows.length} of {POSITIONS.length}
              </span>
              <span />
              <span />
              <span className="tnum text-ink text-right text-[12.5px] font-bold">
                {usd(rows.reduce((t, p) => t + p.invested, 0))}
              </span>
              <span className="tnum text-ink text-right text-[12.5px] font-bold">
                {usd(rows.reduce((t, p) => t + p.netValue, 0))}
              </span>
              <span className="tnum text-accent text-right text-[12.5px] font-bold">
                {(
                  rows.reduce((t, p) => t + p.netValue, 0) /
                  Math.max(
                    1,
                    rows.reduce((t, p) => t + p.invested, 0),
                  )
                ).toFixed(2)}
                ×
              </span>
            </div>
          </Card>
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <div
            data-card="tax"
            className="bg-ink text-surface shrink-0 rounded-[var(--radius-card)] p-5"
          >
            <span className="flex items-center gap-2">
              <Icon name="alert" size={17} className="text-warn" />
              <span className="text-[13.5px] font-bold">Submit tax information</span>
            </span>
            <p className="m-0 mt-2 text-[12px] leading-[17px] opacity-80">
              {awaitingDocs()} of {TAX_DOCS.length} documents outstanding. Distributions are held
              until the declaration is filed.
            </p>
            <button
              type="button"
              data-action="submit-tax"
              onClick={() => setSubmitted((v) => !v)}
              className={cx(
                'mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-full text-[12.5px] font-bold transition-colors',
                submitted ? 'bg-positive text-surface' : 'bg-surface text-ink hover:bg-cream',
              )}
            >
              {submitted ? (
                <>
                  <Icon name="check" size={14} strokeWidth={2.4} />
                  Submitted
                </>
              ) : (
                'Submit now'
              )}
            </button>
          </div>

          <div
            data-card="confidential"
            className="bg-danger-soft text-danger shrink-0 rounded-[var(--radius-card)] p-4"
          >
            <span className="flex items-center gap-2 text-[12.5px] font-bold">
              <Icon name="lock" size={15} />
              Highly confidential
            </span>
            <p className="m-0 mt-1.5 text-[11.5px] leading-[16px]">
              Do not disclose. Positions and valuations on this page are shared under the syndicate
              agreement signed by {ACCOUNT.holder}.
            </p>
          </div>

          <Card pane="activity" className="min-h-0 flex-1 p-5">
            <CardHead title="Activity" action={<Badge tone="quiet">{NOTES.length}</Badge>} />
            <div data-scroller="activity" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {NOTES.map((n) => (
                  <li key={n.id} className="flex items-start gap-3">
                    {n.face ? (
                      <Avatar src={n.face} name={n.title} size={30} />
                    ) : (
                      <span className="bg-accent-faint text-accent grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full">
                        <Icon name="trend-up" size={15} />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block text-[12.5px] leading-[17px] font-semibold">
                        {n.title}
                      </span>
                      <span className="text-muted mt-0.5 block truncate text-[11px]">
                        {n.detail}
                      </span>
                    </span>
                    <span className="text-muted shrink-0 text-[10.5px]">{n.at}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PositionRow({ position: p }: { position: Position }) {
  return (
    <li>
      <div
        data-row={p.id}
        className="border-line grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr] items-center gap-3 border-b py-3 last:border-b-0"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <CompanyDisc name={p.name} size={30} />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[13px] font-bold">{p.name}</span>
            <span className="text-muted block truncate text-[11px]">
              {p.kind} · {p.sector}
            </span>
          </span>
        </span>
        <span>
          <span
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
            style={{ color: `var(${STATUS_TOKEN[p.status]})` }}
          >
            <span
              aria-hidden="true"
              style={{ background: `var(${STATUS_TOKEN[p.status]})` }}
              className="h-1.5 w-1.5 rounded-full"
            />
            {p.status}
          </span>
        </span>
        <span className="tnum text-body text-[12.5px]">{p.investedOn}</span>
        <span className="tnum text-body text-right text-[12.5px]">{usd(p.invested)}</span>
        <span className="tnum text-ink text-right text-[12.5px] font-bold">{usd(p.netValue)}</span>
        <span
          className={cx(
            'tnum text-right text-[12.5px] font-bold',
            positionMultiple(p) >= 1 ? 'text-positive' : 'text-danger',
          )}
        >
          {positionMultiple(p).toFixed(2)}×
        </span>
      </div>
    </li>
  );
}
