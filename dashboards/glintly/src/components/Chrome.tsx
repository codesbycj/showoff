import { Avatar } from '@/components/Bits';
import { SearchBox } from '@/components/Controls';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { SITE } from '@/data/deck';
import face from '@/assets/img/face-1.jpg';
import { cx } from '@/lib/cx';
import { FINDABLE, TABS, type LiveTabId, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  dashboard: 'grid',
  customization: 'sliders',
  realtime: 'pulse',
  audience: 'users',
  behavior: 'behaviour',
  conversion: 'funnel',
  settings: 'settings',
  help: 'help',
};

/**
 * Rule 1, in one component.
 *
 * Five of the eight are inert: muted, `aria-disabled`, skipped by the
 * keyboard, not-allowed under the pointer, and a click does nothing at all.
 * The 10 on Audience and the chevrons on Customization and Behaviour all
 * stay, because they are part of the picture — they just do not open or
 * expand anything.
 */
export function Sidebar({
  active,
  onSelect,
  theme,
  onTheme,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  theme: 'light' | 'dark';
  onTheme: (next: 'light' | 'dark') => void;
}) {
  return (
    <aside className="border-line bg-surface flex w-[232px] shrink-0 flex-col border-r px-3.5 py-5">
      <div className="px-1">
        <Wordmark />
      </div>

      <nav aria-label="Sections" className="mt-7 min-h-0 flex-1">
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {TABS.filter((t) => t.group === 'main').map((tab) => (
            <li key={tab.id}>
              <Entry tab={tab} active={active} onSelect={onSelect} />
            </li>
          ))}
        </ul>

        <h2 className="text-muted m-0 mt-6 px-2.5 pb-1.5 text-[10px] font-bold tracking-[0.12em] uppercase">
          Others
        </h2>
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {TABS.filter((t) => t.group === 'others').map((tab) => (
            <li key={tab.id}>
              <Entry tab={tab} active={active} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      </nav>

      {/*
        The reference's appearance switch. It is a control, so the viewer's
        choice wins over their system setting — the theme is driven by
        `data-theme` on the root rather than by a media query (rule 7).
      */}
      <div className="mt-4 shrink-0">
        <h2 className="text-muted m-0 px-2.5 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase">
          Appearance
        </h2>
        <div
          role="group"
          aria-label="Appearance"
          data-group="theme"
          className="bg-sunken flex items-center gap-1 rounded-full p-1"
        >
          {(['light', 'dark'] as const).map((t) => (
            <button
              key={t}
              type="button"
              data-theme-choice={t}
              aria-pressed={theme === t}
              onClick={() => onTheme(t)}
              className={cx(
                'flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full text-[12.5px] font-semibold transition-colors',
                theme === t
                  ? 'bg-surface text-ink shadow-[var(--shadow-card)]'
                  : 'text-muted hover:text-ink',
              )}
            >
              <Icon name={t === 'light' ? 'sun' : 'moon'} size={15} />
              {t === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Entry({
  tab,
  active,
  onSelect,
}: {
  tab: (typeof TABS)[number];
  active: TabId;
  onSelect: (id: TabId) => void;
}) {
  return (
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
        'flex h-10 w-full items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] font-semibold transition-colors duration-150',
        !tab.live && 'text-muted cursor-not-allowed',
        tab.live && active === tab.id && 'bg-accent-faint text-accent',
        tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
      )}
    >
      <Icon name={GLYPH[tab.id]} size={17} />
      <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
      {tab.count ? (
        <span className="bg-warn-soft text-warn rounded-full px-1.5 py-[1px] text-[10px] font-bold">
          {tab.count}
        </span>
      ) : null}
      {tab.expandable ? (
        <Icon name="chevron-down" size={13} strokeWidth={2.2} className="opacity-60" />
      ) : null}
    </button>
  );
}

/** The header: the pane title, the quick find, the bell and the account. */
export function TopBar({
  tab,
  query,
  onQuery,
  onPick,
  alerts,
  onAlerts,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  onPick: (tab: LiveTabId) => void;
  alerts: number;
  onAlerts: () => void;
}) {
  const title = TABS.find((t) => t.id === tab)?.label ?? '';
  const q = query.trim().toLowerCase();
  const hits = q ? FINDABLE.filter((f) => (f.label + ' ' + f.hint).toLowerCase().includes(q)) : [];

  return (
    <header className="flex h-[62px] shrink-0 items-center gap-4 px-5">
      <h1 className="text-ink m-0 shrink-0 text-[19px] leading-none font-bold tracking-[-0.02em]">
        {title}
      </h1>

      <div className="relative ml-auto w-[280px]">
        <SearchBox value={query} onChange={onQuery} placeholder="Search here ..." />

        {q ? (
          <div
            data-menu="find"
            className="border-line bg-surface absolute top-[calc(100%+6px)] right-0 z-30 w-[320px] overflow-hidden rounded-xl border p-1 shadow-[0_18px_40px_-16px_rgb(18_20_28/0.35)]"
          >
            {hits.length ? (
              <ul role="listbox" aria-label="Quick find" className="m-0 list-none p-0">
                {hits.map((f) => (
                  <li key={f.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      data-find={f.id}
                      onClick={() => onPick(f.tab)}
                      className="hover:bg-sunken flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                    >
                      <span className="bg-accent-faint text-accent grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                        <Icon name="search" size={14} />
                      </span>
                      <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                        {f.label}
                      </span>
                      <span className="text-muted shrink-0 text-[11px]">{f.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted m-0 px-3 py-4 text-center text-[12.5px]">
                Nothing matches <span className="text-ink font-semibold">{query}</span>.
              </p>
            )}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        data-action="alerts"
        onClick={onAlerts}
        aria-label={alerts ? `${alerts} notifications, mark all read` : 'No notifications'}
        title={alerts ? `${alerts} unread` : 'No notifications'}
        className="border-line bg-surface text-body hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors"
      >
        <Icon name="bell" size={17} />
        {alerts ? (
          <span className="bg-accent ring-surface absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2" />
        ) : null}
      </button>

      <Avatar src={face} name={SITE.holder} size={38} />
    </header>
  );
}
