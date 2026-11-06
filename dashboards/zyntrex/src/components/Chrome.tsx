import type { ReactNode } from 'react';

import { Icon, Wordmark } from '@/components/Icon';
import { ACCOUNT, FEED } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The header bar — the reference's own nav, and where rule 1 lives.
 *
 * Three destinations are live. Analytics, Portfolio and OTC stay and are
 * genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export function TopBar({
  active,
  onSelect,
  theme,
  onTheme,
  query,
  onQuery,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  theme: 'light' | 'dark';
  onTheme: (next: 'light' | 'dark') => void;
  query: string;
  onQuery: (next: string) => void;
}) {
  return (
    <header className="border-line bg-surface flex h-[62px] shrink-0 items-center gap-6 border-b px-5">
      <Wordmark />

      <nav aria-label="Sections">
        <ul className="m-0 flex list-none items-center gap-1 p-0">
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
                  'grid h-11 place-items-center rounded-[10px] px-3.5 text-[13.5px] transition-colors duration-150',
                  !tab.live && 'text-muted-inert cursor-not-allowed',
                  tab.live && active === tab.id && 'text-ink font-bold',
                  tab.live && active !== tab.id && 'text-muted hover:bg-sunken hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-2.5">
        <GlobalSearch value={query} onChange={onQuery} />

        {/*
          Real, not decorative: this is the one category where people sit in
          front of the screen for hours, and the reference puts both glyphs in
          its header.
        */}
        <div
          role="group"
          aria-label="Colour theme"
          data-group="theme"
          className="border-line flex items-center gap-0.5 rounded-full border p-0.5"
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
                  ? 'bg-accent-faint text-accent-deep'
                  : 'text-muted hover:bg-sunken hover:text-ink',
              )}
            >
              <Icon name={mode === 'light' ? 'sun' : 'moon'} size={17} />
            </button>
          ))}
        </div>

        <FeedChip />

        <div className="border-line flex h-11 items-center gap-2.5 rounded-full border py-1 pr-3.5 pl-1">
          <img
            src={ACCOUNT.face}
            alt=""
            width={34}
            height={34}
            className="bg-sunken h-[34px] w-[34px] shrink-0 rounded-full object-cover"
          />
          <span className="leading-tight">
            <span className="text-ink block text-[12.5px] font-bold">{ACCOUNT.name}</span>
            <span className="text-muted block text-[11px]">{ACCOUNT.tier}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

/**
 * The feed's state, which an exchange home always shows and this reference
 * does not: live prices with no freshness marker is the oldest lie in the
 * category.
 */
function FeedChip() {
  return (
    <span
      data-feed={FEED.state}
      title={`Market data ${FEED.state} · ${FEED.latencyMs} ms · as of ${FEED.since} UTC`}
      className="border-line text-muted flex h-11 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[11.5px]"
    >
      <span aria-hidden="true" className="bg-positive h-2 w-2 shrink-0 rounded-full" />
      <span className="text-ink font-semibold capitalize">{FEED.state}</span>
      <span className="tnum">{FEED.latencyMs} ms</span>
    </span>
  );
}

/** The header's search. It really filters — the market table on every tab. */
function GlobalSearch({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div className="border-line bg-sunken flex h-11 w-[250px] shrink-0 items-center gap-2 rounded-full border px-3.5">
      <Icon name="search" size={15} className="text-muted shrink-0" />
      <input
        data-search="global"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search assets"
        aria-label="Search assets"
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
      ) : (
        <kbd className="text-muted border-line tnum hidden shrink-0 rounded border px-1.5 text-[10px] sm:block">
          /
        </kbd>
      )}
    </div>
  );
}

/** A tab's heading row. */
export function PageHead({
  title,
  note,
  action,
}: {
  title: string;
  note?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 pb-4">
      <div className="min-w-0">
        <h1 className="text-ink m-0 truncate text-[21px] leading-none font-bold tracking-[-0.025em]">
          {title}
        </h1>
        {note ? <p className="text-muted m-0 mt-1.5 truncate text-[12px]">{note}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
