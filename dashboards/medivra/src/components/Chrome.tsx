import type { ReactNode } from 'react';

import { Icon, Wordmark } from '@/components/Icon';
import { NURSES, WARD, taskCount } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The header bar — the reference's own nav, and where rule 1 lives.
 *
 * Three destinations are live. Doctors, Medications and Reports stay and are
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export function TopBar({
  active,
  onSelect,
  query,
  onQuery,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  query: string;
  onQuery: (next: string) => void;
}) {
  const charge = NURSES[0];
  const overdue = taskCount('overdue');
  return (
    <header className="flex h-[66px] shrink-0 items-center gap-4 px-6">
      <Wordmark />

      <span className="bg-ink flex shrink-0 items-center gap-2 rounded-full py-1 pr-4 pl-1">
        <img
          src={charge.face}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
        <span className="text-[12.5px] font-semibold text-white">{charge.name}</span>
      </span>

      <nav aria-label="Sections" className="mx-auto">
        <ul className="border-line bg-surface m-0 flex list-none items-center gap-1 rounded-full border p-1 shadow-[var(--shadow-card)]">
          {TABS.map((tab) => (
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
                  'grid h-9 place-items-center rounded-full px-3.5 text-[13px] whitespace-nowrap transition-colors duration-150',
                  !tab.live && 'text-muted-inert cursor-not-allowed',
                  tab.live && active === tab.id && 'bg-accent-deep font-semibold text-white',
                  tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex min-w-0 items-center gap-2.5">
        {/*
          One search for the whole ward. The reference puts a search glyph
          inside the doctor card and nowhere else, which finds one list out of
          five; a ward is searched by patient name and the answer is wherever
          that patient happens to be, so this filters whichever tab is showing.
        */}
        <WardSearch value={query} onChange={onQuery} />

        <span
          data-feed="overdue"
          title={`${overdue} task${overdue === 1 ? '' : 's'} overdue`}
          className={cx(
            'flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[12.5px] font-semibold',
            overdue
              ? 'border-danger bg-danger-soft text-danger'
              : 'border-line bg-surface text-muted',
          )}
        >
          <Icon name="bell" size={15} />
          <span className="tnum">{overdue}</span>
          overdue
        </span>

        <span
          data-feed="clock"
          title={`Ward clock · ${WARD.now}`}
          className="border-line bg-surface tnum text-ink flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold"
        >
          <Icon name="clock" size={15} className="text-accent-deep" />
          {WARD.now}
        </span>
      </div>
    </header>
  );
}

/** A tab's heading row: the reference's display title, with the ward beside it. */
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
        <h1 className="text-ink m-0 truncate text-[30px] leading-none font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-2 truncate text-[12.5px]">{note}</p>
      </div>
      <div className="flex shrink-0 items-end gap-5">
        {action}
        <div className="text-right">
          <span className="text-ink flex items-center justify-end gap-1.5 text-[12.5px] font-semibold">
            <Icon name="bed" size={14} className="text-accent-deep" />
            {WARD.hospital} · {WARD.ward}
          </span>
          <span className="text-muted mt-1 block text-[11.5px]">{WARD.date}</span>
        </div>
      </div>
    </div>
  );
}

/** The ward's one search box, in the bar rather than inside one card. */
function WardSearch({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div className="border-line bg-surface flex h-11 w-[240px] min-w-[150px] shrink items-center gap-2 rounded-full border px-4">
      <Icon name="search" size={15} className="text-muted shrink-0" />
      <input
        data-search="ward"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search patients, beds, staff"
        aria-label="Search patients, beds and staff"
        className="text-ink placeholder:text-muted h-9 min-w-0 flex-1 border-0 bg-transparent text-[12.5px] outline-none"
      />
      {value ? (
        <button
          type="button"
          data-search-clear
          onClick={() => onChange('')}
          aria-label="Clear search"
          title="Clear search"
          className="text-muted hover:text-ink grid h-6 w-6 shrink-0 place-items-center rounded-full"
        >
          <Icon name="close" size={13} />
        </button>
      ) : null}
    </div>
  );
}
