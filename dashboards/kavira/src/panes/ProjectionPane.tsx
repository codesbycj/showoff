import { useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Badge, Card, CardHead, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { PROJECTION, projectionSeries } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

const HORIZONS = [
  { id: '6m', label: '6 months', factor: 0.5 },
  { id: '12m', label: '12 months', factor: 1 },
  { id: '24m', label: '24 months', factor: 2 },
] as const;

const TICKS = ['Now', '+3', '+6', '+9', '+12'];

/**
 * Financial Projection.
 *
 * The reference's sidebar names it and nothing sits behind it, so this one is
 * built out of the figures the Overview already implies: every line projects
 * from where it is now, the horizon scales the gap, and the net at the top is
 * the five lines resolved rather than a figure of its own.
 */
export function ProjectionPane({ query }: { query: string }) {
  const [rowId, setRowId] = useState(PROJECTION[0].id);
  const [horizon, setHorizon] = useState<(typeof HORIZONS)[number]['id']>('12m');

  const factor = HORIZONS.find((h) => h.id === horizon)?.factor ?? 1;
  const q = query.trim().toLowerCase();
  const rows = PROJECTION.filter((r) => (q ? r.label.toLowerCase().includes(q) : true));
  const row = PROJECTION.find((r) => r.id === rowId) ?? PROJECTION[0];

  const projectedOf = (r: (typeof PROJECTION)[number]) =>
    Math.round(r.now + (r.projected - r.now) * factor);

  const revenue = PROJECTION.find((r) => r.id === 'revenue')!;
  const costs = PROJECTION.filter((r) => r.id !== 'revenue');
  const netNow = revenue.now - costs.reduce((s, r) => s + r.now, 0);
  const netThen = projectedOf(revenue) - costs.reduce((s, r) => s + projectedOf(r), 0);

  /* The stored series runs from today to the twelve-month figure; the horizon
     stretches or shortens the gap it covers. */
  const series = projectionSeries(row.id).map((v) => Math.round(row.now + (v - row.now) * factor));

  const max = Math.max(...rows.map((r) => Math.max(r.now, projectedOf(r))), 1);

  return (
    <div data-pane="projection" className="grid h-full grid-cols-[1fr_340px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure label="Net now" value={usd(netNow)} note="revenue less everything" />
          <Figure
            label={`Net in ${HORIZONS.find((h) => h.id === horizon)?.label}`}
            value={usd(netThen)}
            note={netThen >= netNow ? 'on this trajectory' : 'if nothing changes'}
            tone={netThen >= netNow ? 'positive' : 'danger'}
          />
          <Figure
            label="Change"
            value={
              (netThen >= netNow ? '+' : '') + Math.round(((netThen - netNow) / netNow) * 100) + '%'
            }
            note="against today"
            tone={netThen >= netNow ? 'positive' : 'danger'}
          />
        </div>

        <Card pane="projection-chart" className="min-h-0 flex-1 p-4">
          <CardHead
            title={row.label}
            icon={<Icon name="projection" size={16} />}
            action={
              <Segmented
                name="horizon"
                size="sm"
                value={horizon}
                options={HORIZONS.map((h) => ({ id: h.id, label: h.label }))}
                onChange={setHorizon}
              />
            }
          />
          <p className="m-0 mt-3 flex flex-wrap items-baseline gap-3">
            <span className="tnum text-ink text-[28px] leading-none font-semibold tracking-[-0.03em]">
              {usd(projectedOf(row))}
            </span>
            <Badge tone={projectedOf(row) >= row.now ? 'positive' : 'danger'}>
              from {usd(row.now)}
            </Badge>
          </p>
          <AreaChart
            values={series}
            ticks={TICKS}
            format={(n) => '$' + short(n)}
            label={`${row.label} projected over ${HORIZONS.find((h) => h.id === horizon)?.label}`}
          />
        </Card>
      </div>

      <Card pane="lines" className="min-h-0 p-4 pr-1.5">
        <CardHead
          className="pr-2.5"
          title="Lines"
          action={
            <span className="text-muted text-[11.5px]">
              {rows.length} of {PROJECTION.length}
            </span>
          }
        />

        <div data-scroller="lines" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length === 0 ? (
            <p className="text-muted m-0 px-1 py-6 text-center text-[12.5px]">
              No line matches <span className="text-ink font-semibold">{query}</span>.
            </p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {rows.map((r) => {
                const on = r.id === rowId;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      data-line={r.id}
                      aria-pressed={on}
                      onClick={() => setRowId(r.id)}
                      className={cx(
                        'w-full rounded-[13px] border p-3 text-left transition-colors',
                        on ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-ink truncate text-[12.5px] font-semibold">
                          {r.label}
                        </span>
                        <span className="tnum text-ink shrink-0 text-[12px] font-semibold">
                          {usd(projectedOf(r))}
                        </span>
                      </span>
                      <Meter
                        value={(projectedOf(r) / max) * 100}
                        tone="accent"
                        height={7}
                        className="mt-2"
                      />
                      <span className="tnum text-muted mt-1.5 block text-[11px]">
                        now {usd(r.now)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}

function Figure({
  label,
  value,
  note,
  tone = 'ink',
}: {
  label: string;
  value: string;
  note: string;
  tone?: 'ink' | 'positive' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.split(' ')[1]} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[22px] leading-none font-semibold tracking-[-0.03em]',
          tone === 'positive' && 'text-positive',
          tone === 'danger' && 'text-danger',
          tone === 'ink' && 'text-ink',
        )}
      >
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}
