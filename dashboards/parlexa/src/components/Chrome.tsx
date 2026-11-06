import type { ReactNode } from 'react';

import { Icon, Wordmark } from '@/components/Icon';
import { LEARNER, dueToday, goalProgress, todayMinutes, weekMinutes } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The header — the reference's own pill bar, and where rule 1 lives.
 *
 * Three destinations are live. Speaking, Review and Community stay and are
 * genuinely inert: dimmed to their own token, `aria-disabled`, skipped by the
 * keyboard, not-allowed under the pointer, and a click does nothing.
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
  return (
    <header className="flex h-[74px] shrink-0 items-center gap-4 px-6">
      <Wordmark />

      <nav aria-label="Sections" className="mx-auto">
        <ul className="border-line bg-surface m-0 flex list-none items-center gap-1 rounded-full border p-1.5 shadow-[var(--shadow-card)]">
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
                  'grid h-9 place-items-center rounded-full px-4 text-[13px] whitespace-nowrap transition-colors duration-150',
                  !tab.live && 'text-muted-inert cursor-not-allowed',
                  tab.live && active === tab.id && 'bg-panel text-panel-fg font-semibold',
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
        <Search value={query} onChange={onQuery} />

        <span
          data-feed="due"
          title={`${dueToday} words due for review today`}
          className="border-line bg-surface text-body flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[12.5px]"
        >
          <Icon name="bell" size={15} className="text-accent-deep" />
          <span className="tnum text-ink font-semibold">{dueToday}</span>
          due
        </span>

        <img
          src={LEARNER.face}
          alt=""
          width={44}
          height={44}
          title={`${LEARNER.name} · ${LEARNER.level}`}
          className="bg-sunken h-11 w-11 shrink-0 rounded-full object-cover"
        />
      </div>
    </header>
  );
}

function Search({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div className="border-line bg-surface flex h-11 w-[230px] min-w-[140px] shrink items-center gap-2 rounded-full border px-4">
      <Icon name="search" size={15} className="text-muted shrink-0" />
      <input
        data-search="global"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search courses and lessons"
        aria-label="Search courses and lessons"
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

/**
 * The left rail.
 *
 * The reference's rail is six unlabelled glyphs and a sun/moon pair, none of
 * which can be told apart or reached by keyboard. Here it carries the two
 * things a learner opens the app to check — the streak and today's minutes
 * against the goal — and the theme toggle, which is real.
 */
export function Rail({
  theme,
  onTheme,
}: {
  theme: 'light' | 'dark';
  onTheme: (next: 'light' | 'dark') => void;
}) {
  const pct = Math.min(100, goalProgress());
  return (
    <aside
      aria-label="Today"
      className="border-line bg-surface flex w-[78px] shrink-0 flex-col items-center gap-6 rounded-[var(--radius-card)] border py-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-7">
        <span
          data-stat="streak"
          title={`${LEARNER.streak}-day streak · best ${LEARNER.bestStreak}`}
          className="flex flex-col items-center gap-1"
        >
          <span className="bg-accent-faint text-accent-deep grid h-11 w-11 place-items-center rounded-[14px]">
            <Icon name="flame" size={20} />
          </span>
          <span className="tnum text-ink text-[13px] font-bold">{LEARNER.streak}</span>
          <span className="text-muted text-[10px]">days</span>
        </span>

        <span
          data-stat="goal"
          title={`${todayMinutes()} of ${LEARNER.dailyGoal} minutes today`}
          className="flex flex-col items-center gap-1"
        >
          <span className="relative grid h-11 w-11 place-items-center">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" className="absolute">
              <circle
                cx="22"
                cy="22"
                r="19"
                fill="none"
                stroke="var(--color-sunken-deep)"
                strokeWidth="4"
              />
              <circle
                cx="22"
                cy="22"
                r="19"
                fill="none"
                stroke="var(--color-accent-deep)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 2 * Math.PI * 19} ${2 * Math.PI * 19}`}
                transform="rotate(-90 22 22)"
                className="transition-[stroke-dasharray] duration-500"
              />
            </svg>
            <span className="tnum text-ink relative text-[11px] font-bold">{pct.toFixed(0)}%</span>
          </span>
          <span className="tnum text-ink text-[13px] font-bold">{todayMinutes()}</span>
          <span className="text-muted text-[10px]">min</span>
        </span>

        <span
          data-stat="week"
          title={`${weekMinutes()} minutes this week`}
          className="flex flex-col items-center gap-1"
        >
          <span className="bg-accent-faint text-accent-deep grid h-11 w-11 place-items-center rounded-[14px]">
            <Icon name="trend-up" size={20} />
          </span>
          <span className="tnum text-ink text-[13px] font-bold">{weekMinutes()}</span>
          <span className="text-muted text-[10px]">week</span>
        </span>
      </div>

      <div
        role="group"
        aria-label="Colour theme"
        data-group="theme"
        className="border-line flex shrink-0 flex-col items-center gap-1 rounded-full border p-1"
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
              'grid h-10 w-10 place-items-center rounded-full transition-colors duration-150',
              theme === mode
                ? 'bg-accent-faint text-accent-deep'
                : 'text-muted hover:bg-sunken hover:text-ink',
            )}
          >
            <Icon name={mode === 'light' ? 'sun' : 'moon'} size={17} />
          </button>
        ))}
      </div>
    </aside>
  );
}

/** A tab's heading row: the reference's display title. */
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
        <h1 className="text-ink m-0 truncate text-[32px] leading-none font-bold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-2 truncate text-[12.5px]">{note}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
