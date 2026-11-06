import type { ReactNode } from 'react';

import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { WORKSPACE } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  home: 'home',
  recordings: 'video',
  team: 'people',
  calendar: 'calendar',
  files: 'folder',
  settings: 'settings',
};

/**
 * The rail — the reference's own nav, and where rule 1 lives.
 *
 * Three destinations are live and **named**: the reference's eight glyphs
 * carry no labels, no current state and no tooltips, so there is no telling
 * one from another. Calendar, Files and Settings keep their glyphs and are
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections"
      className="bg-panel text-panel-fg flex w-[84px] shrink-0 flex-col items-center gap-1 rounded-[26px] py-5"
    >
      <div className="mb-4">
        <Wordmark compact />
      </div>

      <ul className="m-0 flex list-none flex-col items-center gap-1 p-0">
        {TABS.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              data-tab={tab.id}
              data-live={tab.live}
              aria-current={active === tab.id ? 'page' : undefined}
              aria-disabled={tab.live ? undefined : true}
              aria-label={tab.live ? tab.label : `${tab.label} (not available)`}
              title={tab.live ? tab.label : `${tab.label} — not available`}
              tabIndex={tab.live ? undefined : -1}
              onClick={tab.live ? () => onSelect(tab.id) : undefined}
              className={cx(
                'grid h-12 w-12 place-items-center rounded-full transition-colors duration-150',
                !tab.live && 'text-panel-muted/60 cursor-not-allowed',
                tab.live && active === tab.id && 'bg-accent-deep text-accent-fg',
                tab.live &&
                  active !== tab.id &&
                  'text-panel-muted hover:text-panel-fg hover:bg-white/10',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={20} />
            </button>
          </li>
        ))}
      </ul>

      <span
        aria-hidden="true"
        title="Sign out — not available"
        className="text-panel-muted/60 mt-auto grid h-12 w-12 cursor-not-allowed place-items-center rounded-full"
      >
        <Icon name="logout" size={20} />
      </span>
    </nav>
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
        <h1 className="text-ink m-0 truncate text-[26px] leading-none font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-2 truncate text-[12.5px]">{note}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}

/** The one search, in the page head of every tab. */
export function Search({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div className="border-line bg-surface flex h-11 w-[250px] min-w-[150px] shrink items-center gap-2 rounded-full border px-4">
      <Icon name="search" size={15} className="text-muted shrink-0" />
      <input
        data-search="global"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Search ${WORKSPACE.name}`}
        aria-label="Search recordings, projects and people"
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
