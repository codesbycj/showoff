import { useState } from 'react';

import { Spark } from '@/charts/Spark';
import { Card, CardHead, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { TILES, TXNS, tileTrace, type Status } from '@/data/deck';
import { HistoryTable } from '@/features/DashCards';
import { cx } from '@/lib/cx';
import { euro, fig } from '@/lib/money';

type FilterId = 'all' | Status;
type SortKey = 'name' | 'stamp' | 'amount';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Declined', label: 'Declined' },
];

/**
 * Activity in full.
 *
 * The three figures above the ledger are summed from the rows that are
 * showing, and the counterparty split beside it is built from the same rows —
 * so a filter moves all of it at once and none of it can drift.
 */
export function ActivityPane({
  query,
  masked,
  starred,
}: {
  query: string;
  masked: boolean;
  starred: boolean;
}) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) => (filter === 'all' ? true : t.status === filter))
    .filter((t) => (starred ? t.amount > 0 : true))
    .filter((t) => (q ? (t.name + ' ' + t.ref).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
      if (sort === 'amount') return (a.amount - b.amount) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const moneyIn = rows.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const moneyOut = rows.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);

  const people = [...new Set(rows.map((t) => t.name))]
    .map((name) => ({
      id: name,
      value: rows.filter((t) => t.name === name).reduce((s, t) => s + Math.abs(t.amount), 0),
      count: rows.filter((t) => t.name === name).length,
    }))
    .sort((a, b) => b.value - a.value);
  const peopleMax = Math.max(...people.map((p) => p.value), 1);

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="activity" className="grid h-full grid-cols-[1fr_330px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Money in"
            value={fig(euro(moneyIn), masked)}
            note={`${rows.length} rows showing`}
            tone="positive"
          />
          <Figure
            label="Money out"
            value={fig(euro(moneyOut), masked)}
            note="across those rows"
            tone="ink"
          />
          <Figure
            label="Net"
            value={fig(euro(moneyIn - moneyOut), masked)}
            note={moneyIn - moneyOut >= 0 ? 'ahead' : 'behind'}
            tone={moneyIn - moneyOut >= 0 ? 'positive' : 'danger'}
          />
        </div>

        <Card pane="ledger" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <>
                Ledger{' '}
                <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
              </>
            }
            action={
              <Segmented
                name="status"
                size="sm"
                value={filter}
                options={FILTERS}
                onChange={setFilter}
              />
            }
          />
          <HistoryTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="ledger"
            masked={masked}
          />
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="traces" className="shrink-0 p-4">
          <CardHead title="This period" icon={<Icon name="activity" size={16} />} />
          <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
            {TILES.map((t) => (
              <li key={t.id} data-mark={'trace-' + t.id} className="flex items-center gap-3">
                <span className="min-w-0 flex-1">
                  <span className="text-body block truncate text-[12px]">{t.label}</span>
                  <span className="tnum text-ink block text-[13px] font-bold">
                    {fig(euro(t.value), masked)}
                  </span>
                </span>
                <span className="flex h-[34px] w-[88px] shrink-0">
                  <Spark
                    values={tileTrace(t.id)}
                    stroke="var(--color-spark-warm)"
                    label={`${t.label} over the period`}
                  />
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card pane="people" className="min-h-0 flex-1 p-4">
          <CardHead
            title="By counterparty"
            action={<span className="text-muted text-[11.5px]">{people.length}</span>}
          />
          {people.length === 0 ? (
            <p className="text-muted m-0 mt-4 text-[12.5px]">Nothing matches that filter.</p>
          ) : (
            <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
              {people.map((p) => (
                <li key={p.id} data-mark={'party-' + p.id.split(' ')[0].toLowerCase()}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-body min-w-0 truncate text-[12px]">
                      {p.id} <span className="text-muted">· {p.count}</span>
                    </span>
                    <span className="tnum text-ink shrink-0 text-[12px] font-bold">
                      {fig(euro(p.value), masked)}
                    </span>
                  </div>
                  <Meter
                    value={(p.value / peopleMax) * 100}
                    tone="accent"
                    height={7}
                    className="mt-1.5"
                  />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

function Figure({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: 'positive' | 'ink' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.split(' ')[1]} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[22px] leading-none font-bold tracking-[-0.03em]',
          tone === 'positive' && 'text-positive',
          tone === 'ink' && 'text-ink',
          tone === 'danger' && 'text-danger',
        )}
      >
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}
