import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Button, Segmented } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { PAYMENTS, RANGES, REPORTS, balanceSeries, byCounterparty, type Report } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

type KindId = 'all' | Report['kind'];

const KINDS: { id: KindId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Statement', label: 'Statements' },
  { id: 'Tax', label: 'Tax' },
  { id: 'Summary', label: 'Summaries' },
  { id: 'Audit', label: 'Audits' },
];

/**
 * Reports: what can be downloaded, and the two pictures that explain the
 * period they cover.
 *
 * The reference has no screen behind its Reports pill, so this one is built
 * out of the same ledger the Dashboard shows — the counterparty split here is
 * the payment history grouped, which is why a filter on one moves the other.
 */
export function ReportsPane({ query }: { query: string }) {
  const [kind, setKind] = useState<KindId>('all');
  const [rangeId, setRangeId] = useState(RANGES[1].id);
  const [taken, setTaken] = useState<string | null>(null);

  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[1];
  const values = useMemo(() => balanceSeries(rangeId), [rangeId]);

  const q = query.trim().toLowerCase();
  const rows = REPORTS.filter((r) => (kind === 'all' ? true : r.kind === kind)).filter((r) =>
    q ? (r.label + ' ' + r.period).toLowerCase().includes(q) : true,
  );

  const parties = byCounterparty(PAYMENTS);
  const partyMax = Math.max(...parties.map((p) => p.value), 1);

  return (
    <div data-pane="reports" className="grid h-full grid-cols-[1fr_340px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="period" className="min-h-0 flex-1 p-4">
          <CardHead
            title="Period under report"
            icon={<Icon name="chart" size={16} />}
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
          <p className="m-0 mt-3 flex flex-wrap items-baseline gap-3">
            <span className="tnum text-ink text-[28px] leading-none font-bold tracking-[-0.03em]">
              {usd(values[values.length - 1], true)}
            </span>
            <span className="text-muted text-[12px]">closing balance over {range.label}</span>
          </p>
          <AreaChart
            values={values}
            ticks={range.ticks}
            format={(n) => '$' + short(n)}
            label={`Closing balance over ${range.label}`}
          />
        </Card>

        <Card pane="reports" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <>
                Reports{' '}
                <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
              </>
            }
            action={
              <Segmented name="kind" size="sm" value={kind} options={KINDS} onChange={setKind} />
            }
          />

          <div data-scroller="reports" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="report" query={query || kind} />
            ) : (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((r) => (
                  <li key={r.id}>
                    <div className="border-line hover:bg-sunken/70 flex items-center gap-3 rounded-[12px] border p-3 transition-colors">
                      <span className="bg-accent-faint text-accent grid h-9 w-9 shrink-0 place-items-center rounded-full">
                        <Icon name="list" size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-ink block truncate text-[13px] font-bold">
                          {r.label}
                        </span>
                        <span className="text-muted block truncate text-[11px]">
                          {r.period} · {r.size}
                        </span>
                      </span>
                      <Badge tone={r.ready ? 'positive' : 'warn'}>
                        {r.ready ? 'Ready' : 'Building'}
                      </Badge>
                      <Button
                        icon={taken === r.id ? 'check' : 'download'}
                        variant={taken === r.id ? 'accent' : 'outline'}
                        name={'get-' + r.id}
                        onClick={() => setTaken(taken === r.id ? null : r.id)}
                        className="shrink-0"
                      >
                        {taken === r.id ? 'Queued' : 'Get'}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <Card pane="parties" className="min-h-0 p-4">
        <CardHead
          title="By counterparty"
          action={<span className="text-muted text-[11.5px]">{parties.length} parties</span>}
        />
        <p className="text-muted m-0 mt-1 mb-2 text-[11.5px]">
          The same payments the Dashboard lists, grouped.
        </p>

        <ul className="m-0 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
          {parties.map((p) => (
            <li key={p.id} data-mark={'party-' + p.mark}>
              <div className="flex items-center gap-2.5">
                <Mark name={p.mark} size={28} />
                <span className="text-body min-w-0 flex-1 truncate text-[12px]">{p.id}</span>
                <span className="tnum text-ink shrink-0 text-[12px] font-bold">{usd(p.value)}</span>
              </div>
              <Meter
                value={(p.value / partyMax) * 100}
                tone="accent"
                height={7}
                className={cx('mt-1.5')}
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
