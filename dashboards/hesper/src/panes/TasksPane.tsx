import { useMemo, useState } from 'react';

import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, IconButton, SearchBox, Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  MATTERS,
  PRIORITY_LABEL,
  STATUSES,
  STATUS_LABEL,
  clientOf,
  countByStatus,
  daysLeft,
  matterValue,
  personOf,
  workload,
  type MatterStatus,
  type MatterType,
  type Priority,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, plural, usd } from '@/lib/format';

const PRIORITY_TONE: Record<Priority, 'danger' | 'warn' | 'positive'> = {
  high: 'danger',
  medium: 'warn',
  low: 'positive',
};

const TYPES: MatterType[] = ['General', 'Litigation', 'Advisory', 'Compliance', 'Property'];

type Filter = 'all' | MatterStatus;
type SortKey = 'due' | 'value' | 'hours';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'due', label: 'Due' },
  { id: 'value', label: 'Value' },
  { id: 'hours', label: 'Hours' },
];

/**
 * Task — the firm's matters. Assembly only (rule 4).
 *
 * The same eighteen rows the Overview totals are built from, here as the list
 * itself: filter by status, by type, by fee earner, search them, sort them,
 * and open one. A matter opened from the Overview table or from the header's
 * quick find arrives here already expanded, which is what `focus` carries.
 */
export function TasksPane({
  focus,
  onFocus,
}: {
  focus: string | null;
  onFocus: (id: string | null) => void;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [type, setType] = useState<MatterType | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('due');
  const [descending, setDescending] = useState(false);

  const crew = useMemo(() => workload(), []);
  const maxHours = Math.max(...crew.map((c) => c.hours), 1);
  const q = query.trim().toLowerCase();

  const rows = MATTERS.filter((m) => (filter === 'all' ? true : m.status === filter))
    .filter((m) => (type ? m.type === type : true))
    .filter((m) => (owner ? m.ownerId === owner : true))
    .filter((m) =>
      q
        ? (m.title + ' ' + clientOf(m.clientId).name + ' ' + m.type).toLowerCase().includes(q)
        : true,
    )
    .slice()
    .sort((a, b) => {
      /* Every key compares ascending, and `descending` is the only thing that
         flips it — written per key, "low to high" meant soonest-last on one
         of the three and the arrow was lying about one sort in three. */
      const by =
        sort === 'due'
          ? a.due.localeCompare(b.due)
          : sort === 'value'
            ? matterValue(a) - matterValue(b)
            : a.hours - b.hours;
      return descending ? -by : by;
    });

  const counts: { id: Filter; label: string; n: number }[] = [
    { id: 'all', label: 'All matters', n: MATTERS.length },
    ...STATUSES.map((s) => ({ id: s as Filter, label: STATUS_LABEL[s], n: countByStatus(s) })),
  ];

  return (
    <div data-pane="tasks" className="flex h-full flex-col">
      <PageHead
        title="Matters in progress"
        action={
          <Segmented name="sort" value={sort} options={SORTS} onChange={(id) => setSort(id)} />
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1.65fr_1fr] gap-4">
        <Card pane="matters" className="min-h-0 p-5">
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            <ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-2 p-0">
              {counts.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    data-filter={c.id}
                    aria-pressed={filter === c.id}
                    onClick={() => setFilter(c.id)}
                    className={cx(
                      'flex h-9 items-center gap-2 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors',
                      filter === c.id
                        ? 'bg-accent-deep text-accent-fg border-transparent'
                        : 'border-line text-body hover:bg-sunken hover:text-ink',
                    )}
                  >
                    {c.label}
                    <span
                      className={cx(
                        'tnum rounded-full px-1.5 text-[11px]',
                        filter === c.id ? 'bg-white/20' : 'bg-sunken text-muted',
                      )}
                    >
                      {c.n}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <IconButton
              icon={descending ? 'arrow-down' : 'arrow-up'}
              label={descending ? 'Sorted high to low' : 'Sorted low to high'}
              name="sort-dir"
              tone="outline"
              size={36}
              onClick={() => setDescending((v) => !v)}
            />
          </div>

          <div className="mt-3 flex shrink-0 items-center gap-2.5">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search matters, clients and types"
              name="matters"
              className="min-w-0 flex-1"
            />
            <Badge>
              {rows.length} of {MATTERS.length}
            </Badge>
          </div>

          <div data-scroller="matters" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((m) => {
                  const open = focus === m.id;
                  const person = personOf(m.ownerId);
                  const left = daysLeft(m.due);
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        data-row={m.id}
                        aria-expanded={open}
                        onClick={() => onFocus(open ? null : m.id)}
                        className={cx(
                          'w-full rounded-xl border px-3.5 py-3 text-left transition-colors',
                          open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="min-w-0 flex-1">
                            <span className="text-ink block truncate text-[14px] font-semibold">
                              {m.title}
                            </span>
                            <span className="text-muted mt-0.5 block truncate text-[12px]">
                              {clientOf(m.clientId).name} · {m.type}
                            </span>
                          </span>

                          <Badge tone={PRIORITY_TONE[m.priority]}>
                            {PRIORITY_LABEL[m.priority]}
                          </Badge>
                          <Badge tone={m.status === 'closed' ? 'quiet' : 'accent'}>
                            {STATUS_LABEL[m.status]}
                          </Badge>

                          <Avatar src={person.face} name={person.name} size={28} />
                          <Icon
                            name="chevron-down"
                            size={14}
                            strokeWidth={2.2}
                            className={cx(
                              'text-muted shrink-0 transition-transform duration-200',
                              open && 'rotate-180',
                            )}
                          />
                        </span>

                        {open ? (
                          <span className="border-line mt-3 block border-t pt-3">
                            <span className="grid grid-cols-4 gap-3">
                              {[
                                { k: 'Fee earner', v: person.name },
                                { k: 'Billable', v: `${num(m.hours)} h · USD ${m.rate}/h` },
                                { k: 'Value', v: usd(matterValue(m)) },
                                {
                                  k: 'Due',
                                  v:
                                    left < 0
                                      ? `${plural(-left, 'day')} over`
                                      : `in ${plural(left, 'day')}`,
                                },
                              ].map((d) => (
                                <span key={d.k} className="block">
                                  <span className="text-muted block text-[11px]">{d.k}</span>
                                  <span className="text-ink mt-1 block truncate text-[12.5px] font-semibold">
                                    {d.v}
                                  </span>
                                </span>
                              ))}
                            </span>
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Empty what="matter" query={query || (type ?? personOf(owner ?? 'p1').name)} />
            )}
          </div>
        </Card>

        <div className="flex min-h-0 flex-col gap-4">
          <Card pane="workload" className="min-h-0 flex-1 p-5">
            <CardHead
              title="Workload"
              note="Billable hours per fee earner"
              action={
                owner ? (
                  <Button
                    size="sm"
                    variant="quiet"
                    name="clear-owner"
                    onClick={() => setOwner(null)}
                  >
                    Clear
                    <Icon name="close" size={13} strokeWidth={2.2} />
                  </Button>
                ) : undefined
              }
            />
            <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col p-0">
              {crew.map((c) => (
                <li key={c.person.id} className="flex min-h-0 flex-1 items-center">
                  <button
                    type="button"
                    data-owner={c.person.id}
                    aria-pressed={owner === c.person.id}
                    onClick={() => setOwner(owner === c.person.id ? null : c.person.id)}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-xl px-2 py-2 transition-colors',
                      owner === c.person.id ? 'bg-sunken' : 'hover:bg-sunken',
                    )}
                  >
                    <Avatar src={c.person.face} name={c.person.name} size={34} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-ink truncate text-[13px] font-semibold">
                          {c.person.name}
                        </span>
                        <span className="tnum text-muted shrink-0 text-[12px]">
                          {num(c.hours)} h · {c.open} open
                        </span>
                      </span>
                      <Meter
                        value={(c.hours / maxHours) * 100}
                        height={7}
                        tone={owner === c.person.id ? 'accent' : 'bright'}
                        className="mt-2"
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card pane="types" className="min-h-0 flex-1 p-5">
            <CardHead title="By type" note="Matters and their value" />
            <ul className="m-0 mt-2 flex min-h-0 flex-1 list-none flex-col p-0">
              {TYPES.map((t) => {
                const mine = MATTERS.filter((m) => m.type === t);
                const value = mine.reduce((sum, m) => sum + matterValue(m), 0);
                return (
                  <li key={t} className="flex min-h-0 flex-1 items-center">
                    <button
                      type="button"
                      data-type={t.toLowerCase()}
                      aria-pressed={type === t}
                      onClick={() => setType(type === t ? null : t)}
                      className={cx(
                        'flex w-full items-center gap-3 rounded-xl px-2.5 py-2 transition-colors',
                        type === t ? 'bg-accent-faint' : 'hover:bg-sunken',
                      )}
                    >
                      <span
                        className={cx(
                          'grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors',
                          type === t ? 'bg-accent-deep text-accent-fg' : 'bg-sunken text-body',
                        )}
                      >
                        <Icon name="file" size={15} />
                      </span>
                      <span className="text-ink min-w-0 flex-1 truncate text-left text-[13px] font-semibold">
                        {t}
                      </span>
                      <span className="tnum text-muted shrink-0 text-[12px]">
                        {mine.length} · {usd(value)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
