import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { ProjectTile } from '@/components/ProjectTile';
import { SelectPill } from '@/components/SelectPill';
import { PROJECTS, type Project } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type SortId = 'recent' | 'rate' | 'progress' | 'hours';
type FilterId = 'all' | 'paid' | 'unpaid';

const SORTS: { id: SortId; label: string }[] = [
  { id: 'recent', label: 'Most recent' },
  { id: 'rate', label: 'Highest rate' },
  { id: 'progress', label: 'Furthest along' },
  { id: 'hours', label: 'Most hours' },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'paid', label: 'Paid' },
  { id: 'unpaid', label: 'Not paid' },
];

/** Rows are columns of one grid, so the header and every row line up exactly. */
const COLS = 'grid-cols-[minmax(0,1fr)_96px_80px_150px_96px]';

/**
 * Every project, filtered, sorted and selectable.
 *
 * Three real controls and the shell's search all narrow the same list, and the
 * footer totals what is left -- so a filter that removes four rows is visible
 * twice, which is what makes it obvious on film that the control did something.
 */
export function ProjectsTable({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [sort, setSort] = useState<SortId>('recent');
  const [filter, setFilter] = useState<FilterId>('all');

  const q = query.trim().toLowerCase();
  const rows = PROJECTS.filter((p) => (filter === 'all' ? true : p.pay === filter))
    .filter((p) =>
      q
        ? (p.name + ' ' + p.client + ' ' + p.location + ' ' + p.tags.join(' '))
            .toLowerCase()
            .includes(q)
        : true,
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'rate') return b.rate - a.rate;
      if (sort === 'progress') return b.progress - a.progress;
      if (sort === 'hours') return b.hours - a.hours;
      return PROJECTS.indexOf(a) - PROJECTS.indexOf(b);
    });

  const hours = rows.reduce((t, p) => t + p.hours, 0);
  const billed = rows.reduce((t, p) => t + p.hours * p.rate, 0);

  return (
    <Card pane="projects-table" className="col-span-2 min-h-0 p-6 pr-4">
      <CardHead
        title={
          <>
            All Projects{' '}
            <span className="text-muted ml-1 text-[15px] font-medium">{rows.length}</span>
          </>
        }
        action={
          <div className="flex items-center gap-2 pr-2">
            <div
              role="group"
              aria-label="Payment filter"
              className="bg-sunken flex items-center gap-1 rounded-full p-1"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  data-filter={f.id}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cx(
                    'h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors',
                    filter === f.id
                      ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(18_22_29/0.08)]'
                      : 'text-muted hover:text-ink',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
          </div>
        }
      />

      <div className={cx('border-line mt-5 grid shrink-0 gap-3 border-b pr-2 pb-2.5 pl-1', COLS)}>
        {['Project', 'Rate', 'Hours', 'Progress', 'Status'].map((label) => (
          <span
            key={label}
            className="text-muted text-[11.5px] font-semibold tracking-[0.04em] uppercase"
          >
            {label}
          </span>
        ))}
      </div>

      <div data-scroller="table" className="scroll-region -mr-2 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              Nothing matches{' '}
              <span className="text-ink font-semibold">
                {query || FILTERS.find((f) => f.id === filter)?.label}
              </span>
              .
              <br />
              Clear the search or switch the filter back to All.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((project) => (
              <li key={project.id}>
                <Row
                  project={project}
                  selected={selected === project.id}
                  onSelect={() => onSelect(project.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-2 pl-1 text-[12.5px]">
        <span>
          {rows.length} of {PROJECTS.length} projects
        </span>
        <span>
          {num(hours)} hours · {usd(billed)} billed
        </span>
      </div>
    </Card>
  );
}

function Row({
  project,
  selected,
  onSelect,
}: {
  project: Project;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-row={project.id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'grid w-full items-center gap-3 rounded-2xl py-2.5 pr-2 pl-1 text-left transition-colors',
        COLS,
        selected ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <ProjectTile project={project} size={38} />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[13.5px] font-semibold">
            {project.name}
          </span>
          <span className="text-muted mt-0.5 block truncate text-[12px]">{project.client}</span>
        </span>
      </span>

      <span className="text-body text-[13px] font-medium">{usd(project.rate)}/h</span>
      <span className="text-body text-[13px]">{project.hours}</span>

      <span className="flex items-center gap-2.5">
        <span className="bg-sunken-deep h-1.5 flex-1 overflow-hidden rounded-full">
          <span
            style={{ width: project.progress + '%' }}
            className={cx(
              'block h-full rounded-full transition-[width] duration-500',
              project.progress === 100 ? 'bg-positive' : 'bg-ink',
            )}
          />
        </span>
        <span className="text-muted w-9 shrink-0 text-right text-[12px] tabular-nums">
          {project.progress}%
        </span>
      </span>

      <span className="flex items-center justify-between gap-1">
        <Badge tone={project.pay === 'paid' ? 'ink' : 'quiet'}>
          {project.pay === 'paid' ? 'Paid' : 'Not Paid'}
        </Badge>
        <Icon
          name="chevron-right"
          size={15}
          className={cx('text-muted transition-opacity', selected ? 'opacity-100' : 'opacity-0')}
        />
      </span>
    </button>
  );
}
