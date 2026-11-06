import type { ReactNode } from 'react';

import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ME, WORKSPACE, openTasks } from '@/data/deck';
import { cx } from '@/lib/cx';
import { GROUPS, TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  board: 'board',
  tasks: 'list',
  team: 'people',
  schedule: 'calendar',
  reports: 'chart',
  clients: 'briefcase',
  settings: 'settings',
};

/**
 * The sidebar — the reference's own nav, and where rule 1 lives.
 *
 * Three destinations are live. Schedule, Reports, Clients and Settings stay
 * and are genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing. The reference's
 * other four were cut rather than left as decoration.
 */
export function Sidebar({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections"
      className="border-line bg-surface flex w-[224px] shrink-0 flex-col rounded-[var(--radius-card)] border p-4 shadow-[var(--shadow-card)]"
    >
      <div className="mb-5 px-1">
        <Wordmark />
      </div>

      {GROUPS.map((group) => (
        <div key={group.id} className="mb-4">
          <span className="text-muted mb-1.5 block px-2 text-[10.5px] font-bold tracking-[0.1em] uppercase">
            {group.label}
          </span>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {TABS.filter((t) => t.group === group.id).map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  data-tab={tab.id}
                  data-live={tab.live}
                  aria-current={active === tab.id ? 'page' : undefined}
                  aria-disabled={tab.live ? undefined : true}
                  title={tab.live ? tab.label : `${tab.label} — not available`}
                  tabIndex={tab.live ? undefined : -1}
                  onClick={tab.live ? () => onSelect(tab.id) : undefined}
                  className={cx(
                    'flex h-11 w-full items-center gap-2.5 rounded-[12px] px-3 text-[13px] transition-colors duration-150',
                    !tab.live && 'text-muted-inert cursor-not-allowed',
                    tab.live && active === tab.id && 'bg-accent-faint text-accent-deep font-bold',
                    tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                  )}
                >
                  <Icon name={GLYPH[tab.id]} size={17} />
                  {tab.label}
                  {tab.id === 'tasks' ? (
                    <span className="tnum bg-sunken text-muted ml-auto rounded-full px-2 py-[1px] text-[11px] font-semibold">
                      {openTasks()}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="border-line mt-auto flex items-center gap-2.5 rounded-[14px] border p-2.5">
        <img
          src={ME.face}
          alt=""
          width={36}
          height={36}
          className="bg-sunken h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[12.5px] font-bold">{ME.name}</span>
          {/* The reference's reads "simmons@gamil.com". */}
          <span className="text-muted block truncate text-[10.5px]">{ME.email}</span>
        </span>
      </div>
    </nav>
  );
}

/**
 * The header: the greeting, the one search, and the date — **one** date, not
 * the reference's "May" over "Saturday, Jul 9th, 2023", which names two
 * different months and a weekday that 9 July 2023 was not.
 */
export function TopBar({
  query,
  onQuery,
  action,
}: {
  query: string;
  onQuery: (next: string) => void;
  action?: ReactNode;
}) {
  return (
    <header className="flex h-[60px] shrink-0 items-center gap-4">
      <div className="min-w-0">
        <span className="text-muted block text-[11.5px]">Welcome back,</span>
        <span className="text-ink block truncate text-[14px] leading-tight font-bold">
          {ME.name.split(' ')[0]}
        </span>
      </div>

      <div className="border-line bg-surface flex h-11 w-[300px] min-w-[150px] shrink items-center gap-2 rounded-full border px-4">
        <Icon name="search" size={15} className="text-muted shrink-0" />
        <input
          data-search="global"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Find something"
          aria-label="Find a task, a client or a person"
          className="text-ink placeholder:text-muted h-9 min-w-0 flex-1 border-0 bg-transparent text-[12.5px] outline-none"
        />
        {query ? (
          <button
            type="button"
            data-search-clear
            onClick={() => onQuery('')}
            aria-label="Clear search"
            title="Clear search"
            className="text-muted hover:text-ink grid h-6 w-6 shrink-0 place-items-center rounded-full"
          >
            <Icon name="close" size={13} />
          </button>
        ) : null}
      </div>

      <span className="text-muted hidden shrink-0 text-[12px] lg:block">
        {WORKSPACE.todayLabel}
      </span>

      {action ? <div className="ml-auto flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </header>
  );
}

/** A tab's heading row. */
export function PageHead({
  title,
  note,
  action,
}: {
  title: string;
  note: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-end justify-between gap-6 pb-4">
      <div className="min-w-0">
        <h1 className="text-ink m-0 truncate text-[24px] leading-none font-bold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-1.5 truncate text-[12.5px]">{note}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
