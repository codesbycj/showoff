import { useState } from 'react';

import { Badge, Card, CardHead, Check, type Tone } from '@/components/Bits';
import { SearchBox, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ACTIVITIES, type Activity, type ActivityState } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

type FilterId = 'all' | ActivityState;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Pending', label: 'Pending' },
  { id: 'In Progress', label: 'In progress' },
  { id: 'Failed', label: 'Failed' },
];

const TONE: Record<ActivityState, Tone> = {
  Completed: 'positive',
  Pending: 'danger',
  'In Progress': 'accent',
  Failed: 'danger',
};

const COLS = 'grid-cols-[24px_112px_minmax(0,1fr)_104px_124px_148px_28px]';

/**
 * The activity ledger: filter, search, selectable rows.
 *
 * The footer totals what is *shown*, so a filter changes two numbers on screen
 * — which is what makes it obvious on film that the control did something.
 */
export function Activities({
  query,
  onQuery,
  compact = false,
}: {
  query: string;
  onQuery: (q: string) => void;
  /** On the Overview this card shares the row; on Activity it is the page. */
  compact?: boolean;
}) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [picked, setPicked] = useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const rows = ACTIVITIES.filter((a) => (filter === 'all' ? true : a.state === filter)).filter(
    (a) => (q ? (a.name + ' ' + a.id + ' ' + a.state).toLowerCase().includes(q) : true),
  );
  const total = rows.reduce((t, a) => t + a.price, 0);

  const toggle = (id: string) =>
    setPicked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <Card pane="activities" className="h-full min-h-0 p-5 pr-3">
      <CardHead
        title="Recent Activities"
        className="pr-2"
        action={
          <>
            <SearchBox
              value={query}
              onChange={onQuery}
              placeholder="Search"
              hint="⌘F"
              className="w-[180px]"
            />
            <SelectPill name="filter" value={filter} options={FILTERS} onChange={setFilter} />
          </>
        }
      />

      <div
        className={cx(
          'border-line text-muted mt-4 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11.5px] font-semibold whitespace-nowrap',
          COLS,
        )}
      >
        <Check
          checked={rows.length > 0 && rows.every((r) => picked.includes(r.id))}
          onChange={() =>
            setPicked((cur) =>
              rows.every((r) => cur.includes(r.id))
                ? cur.filter((id) => !rows.some((r) => r.id === id))
                : [...new Set([...cur, ...rows.map((r) => r.id)])],
            )
          }
          label="Select every activity shown"
          name="all"
        />
        <span>Order ID</span>
        <span>Activity</span>
        <span>Price</span>
        <span>Status</span>
        <span>Date</span>
        <span />
      </div>

      <div data-scroller="activities" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              Nothing matches <span className="text-ink font-bold">{query || filter}</span>.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.slice(0, compact ? 8 : rows.length).map((activity) => (
              <li key={activity.id + activity.date}>
                <Row
                  activity={activity}
                  picked={picked.includes(activity.id)}
                  onToggle={() => toggle(activity.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
        <span>
          {rows.length} of {ACTIVITIES.length} activities
          {picked.length ? (
            <span className="text-ink font-bold"> · {picked.length} selected</span>
          ) : null}
        </span>
        <span className="text-ink font-bold">{usd(total)}</span>
      </div>
    </Card>
  );
}

function Row({
  activity,
  picked,
  onToggle,
}: {
  activity: Activity;
  picked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-activity={activity.id}
      className={cx(
        'border-line grid items-center gap-3 border-b py-2.5 pr-3 transition-colors',
        COLS,
        picked ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <Check
        checked={picked}
        onChange={onToggle}
        label={'Select ' + activity.id}
        name={activity.id}
      />
      <span className="text-muted text-[12px]">{activity.id}</span>
      <span className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          style={{ background: activity.tint }}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white"
        >
          <Icon name={activity.kind} size={14} />
        </span>
        <span className="text-ink min-w-0 truncate text-[13px] font-semibold">{activity.name}</span>
      </span>
      <span className="text-ink text-[13px] font-bold">{usd(activity.price)}</span>
      <span>
        <Badge tone={TONE[activity.state]} dot>
          {activity.state}
        </Badge>
      </span>
      <span className="text-muted text-[12px]">
        {activity.date} {activity.time}
      </span>
      <span className="justify-self-end">
        <span className="text-muted" aria-hidden="true">
          <Icon name="dots" size={15} />
        </span>
      </span>
    </div>
  );
}
