import { useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Card, CardHead, Empty, Meter } from '@/components/Bits';
import { SearchBox, Segmented } from '@/components/Controls';
import { Icon, Info } from '@/components/Icon';
import {
  MONTHS,
  STATEMENT,
  STATEMENT_GROUPS,
  groupTotal,
  groupTrail,
  type StatementLine,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { idr, shortIdr } from '@/lib/money';

type GroupId = 'all' | (typeof STATEMENT_GROUPS)[number];

const FILTERS: { id: GroupId; label: string }[] = [
  { id: 'all', label: 'All' },
  ...STATEMENT_GROUPS.map((g) => ({ id: g as GroupId, label: g })),
];

const MONTH_TICKS = ['Jan', 'Apr', 'Jul', 'Oct', 'Dec'];

/**
 * Financial Statements.
 *
 * The reference names it in the sidebar and puts nothing behind it, so this
 * one is the ledger the Home tab's three figures are summed from: revenue
 * less cost of sales less operating less other *is* the net profit on the
 * other tab, which is why nothing here can disagree with it.
 */
export function StatementsPane({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (next: string) => void;
}) {
  const [filter, setFilter] = useState<GroupId>('all');
  const [groupId, setGroupId] = useState<string>(STATEMENT_GROUPS[0]);
  const [monthId, setMonthId] = useState(MONTHS[0].id);

  const scale = MONTHS.find((m) => m.id === monthId)?.scale ?? 1;
  const q = query.trim().toLowerCase();
  const rows = STATEMENT.filter((l) => (filter === 'all' ? true : l.group === filter)).filter(
    (l) => (q ? (l.label + ' ' + l.group).toLowerCase().includes(q) : true),
  );

  const net = STATEMENT.reduce((s, l) => s + l.amount, 0) * scale;
  const income = STATEMENT.filter((l) => l.amount > 0).reduce((s, l) => s + l.amount, 0) * scale;
  const outgo = STATEMENT.filter((l) => l.amount < 0).reduce((s, l) => s - l.amount, 0) * scale;
  const max = Math.max(...rows.map((l) => Math.abs(l.amount)), 1);

  return (
    <div data-pane="statements" className="grid h-full grid-cols-[1fr_344px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex shrink-0 justify-end">
          <SearchBox value={query} onChange={onQuery} placeholder="Search" className="w-[240px]" />
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Money in"
            value={idr(income)}
            note={`${STATEMENT.filter((l) => l.amount > 0).length} lines`}
          />
          <Figure
            label="Money out"
            value={idr(outgo)}
            note={`${STATEMENT.filter((l) => l.amount < 0).length} lines`}
          />
          <Figure
            label="Net"
            value={idr(net)}
            note={net >= 0 ? 'in profit' : 'at a loss'}
            tone={net >= 0 ? 'positive' : 'danger'}
          />
        </div>

        <Card pane="lines" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <span className="flex items-center gap-1.5">
                Statement <Info />
                <span className="text-muted ml-1 text-[12px] font-semibold">{rows.length}</span>
              </span>
            }
            action={
              <Segmented
                name="group"
                size="sm"
                value={filter}
                options={FILTERS}
                onChange={setFilter}
              />
            }
          />

          <div data-scroller="lines" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="line" query={query || filter} />
            ) : (
              <ul className="m-0 list-none p-0">
                {rows.map((l) => (
                  <li key={l.id}>
                    <Row line={l} scale={scale} max={max} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="groups" className="shrink-0 p-4">
          <CardHead
            title={
              <span className="flex items-center gap-1.5">
                By group <Info />
              </span>
            }
            action={
              <Segmented
                name="month"
                size="sm"
                value={monthId}
                options={MONTHS.map((m) => ({ id: m.id, label: m.label }))}
                onChange={setMonthId}
              />
            }
          />
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
            {STATEMENT_GROUPS.map((g) => {
              const on = g === groupId;
              const total = groupTotal(g) * scale;
              return (
                <li key={g}>
                  <button
                    type="button"
                    data-group-line={g}
                    aria-pressed={on}
                    onClick={() => setGroupId(g)}
                    className={cx(
                      'w-full rounded-[10px] border p-2.5 text-left transition-colors',
                      on ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-ink truncate text-[12px] font-semibold">{g}</span>
                      <span
                        className={cx(
                          'tnum shrink-0 text-[12px] font-bold',
                          total >= 0 ? 'text-positive' : 'text-ink',
                        )}
                      >
                        {idr(total)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card pane="group-trail" className="min-h-0 flex-1 p-4">
          <CardHead title={`${groupId} over the year`} icon={<Icon name="metrics" size={15} />} />
          <AreaChart
            values={groupTrail(groupId).map((v) => Math.round(v * scale))}
            ticks={MONTH_TICKS}
            format={(n) => shortIdr(n)}
            label={`${groupId} across twelve months`}
          />
        </Card>
      </div>
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
          'tnum m-0 mt-1.5 text-[19px] leading-none font-bold tracking-[-0.03em]',
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

function Row({ line, scale, max }: { line: StatementLine; scale: number; max: number }) {
  const amount = line.amount * scale;
  return (
    <div
      data-row={line.id}
      className="border-line hover:bg-sunken mr-2.5 grid grid-cols-[minmax(0,1fr)_120px_150px] items-center gap-3 border-b px-2 py-2.5 transition-colors"
    >
      <span className="min-w-0">
        <span className="text-ink block truncate text-[12.5px] font-semibold">{line.label}</span>
        <span className="text-muted block truncate text-[10.5px]">{line.group}</span>
      </span>
      <span
        className={cx(
          'tnum text-right text-[12px] font-bold',
          amount >= 0 ? 'text-positive' : 'text-ink',
        )}
      >
        {idr(amount)}
      </span>
      <Meter
        value={(Math.abs(line.amount) / max) * 100}
        tone={line.amount >= 0 ? 'accent' : 'goal'}
        height={7}
      />
    </div>
  );
}
