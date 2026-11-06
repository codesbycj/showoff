import type { ReactNode } from 'react';

import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { LEARNER } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  learn: 'cap',
  courses: 'book',
  tasks: 'clipboard',
  calendar: 'calendar',
  messages: 'chat',
  settings: 'settings',
};

/**
 * The rail — the reference's own nav, and where rule 1 lives.
 *
 * Three destinations are live and **named**: the reference's seven glyphs
 * carry no labels, no tooltips and no current state, so there is no telling
 * one from another. Calendar, Messages and Settings keep their glyphs and are
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections"
      className="border-line bg-surface flex w-[76px] shrink-0 flex-col items-center gap-1 rounded-[var(--radius-card)] border py-5 shadow-[var(--shadow-card)]"
    >
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
                'grid h-11 w-11 place-items-center rounded-[14px] transition-colors duration-150',
                !tab.live && 'text-muted-inert cursor-not-allowed',
                tab.live && active === tab.id && 'bg-invert text-invert-accent',
                tab.live && active !== tab.id && 'text-muted hover:bg-sunken hover:text-ink',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={19} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col items-center gap-2">
        <span
          data-stat="streak"
          title={`${LEARNER.streak}-day streak`}
          className="bg-accent-faint text-accent-deep flex flex-col items-center rounded-[14px] px-2 py-2"
        >
          <Icon name="flame" size={16} />
          <span className="tnum text-ink mt-1 text-[12px] font-bold">{LEARNER.streak}</span>
        </span>
        <img
          src={LEARNER.face}
          alt=""
          width={40}
          height={40}
          title={`${LEARNER.name} · ${LEARNER.plan}`}
          className="bg-sunken h-10 w-10 shrink-0 rounded-full object-cover"
        />
      </div>
    </nav>
  );
}

/**
 * The top bar: the mark, the search, the track pills and the theme toggle.
 *
 * The reference's pills are a filter that filters nothing — one is dark, the
 * others are not, and the screen behind them never changes. These drive the
 * tab that is showing.
 */
export function TopBar({
  query,
  onQuery,
  track,
  onTrack,
  tracks,
  theme,
  onTheme,
}: {
  query: string;
  onQuery: (next: string) => void;
  track: string;
  onTrack: (next: string) => void;
  tracks: string[];
  theme: 'light' | 'dark';
  onTheme: (next: 'light' | 'dark') => void;
}) {
  return (
    <header className="flex h-[66px] shrink-0 items-center gap-4">
      <Wordmark />

      <div className="border-line bg-surface flex h-11 w-[240px] min-w-[140px] shrink items-center gap-2 rounded-full border px-4">
        <Icon name="search" size={15} className="text-muted shrink-0" />
        <input
          data-search="global"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search anything"
          aria-label="Search courses, lessons and tasks"
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

      <ul
        role="group"
        aria-label="Track"
        data-group="track"
        className="m-0 flex min-w-0 list-none items-center gap-1.5 overflow-hidden p-0"
      >
        {['all', ...tracks].map((t) => (
          <li key={t}>
            <button
              type="button"
              data-track={t.toLowerCase().replace(/[^a-z]+/g, '-')}
              aria-pressed={track === t}
              onClick={() => onTrack(track === t ? 'all' : t)}
              className={cx(
                'border-line h-11 rounded-full border px-4 text-[12.5px] whitespace-nowrap transition-colors',
                track === t
                  ? 'bg-invert text-invert-fg border-transparent font-semibold'
                  : 'bg-surface text-body hover:bg-sunken',
              )}
            >
              {t === 'all' ? 'Everything' : t}
            </button>
          </li>
        ))}
      </ul>

      <div
        role="group"
        aria-label="Colour theme"
        data-group="theme"
        className="border-line bg-surface ml-auto flex shrink-0 items-center gap-0.5 rounded-full border p-1"
      >
        {(['light', 'dark'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            data-theme-btn={mode}
            aria-pressed={theme === mode}
            title={mode === 'light' ? 'Light' : 'Dark'}
            aria-label={mode === 'light' ? 'Light theme' : 'Dark theme'}
            onClick={() => onTheme(mode)}
            className={cx(
              'grid h-9 w-9 place-items-center rounded-full transition-colors duration-150',
              theme === mode
                ? 'bg-invert text-invert-accent'
                : 'text-muted hover:bg-sunken hover:text-ink',
            )}
          >
            <Icon name={mode === 'light' ? 'sun' : 'moon'} size={16} />
          </button>
        ))}
      </div>
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
        <h1 className="text-ink m-0 truncate text-[26px] leading-none font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-2 truncate text-[12.5px]">{note}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
