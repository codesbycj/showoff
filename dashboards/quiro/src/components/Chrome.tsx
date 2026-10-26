import { Avatar } from '@/components/Bits';
import { IconButton, SearchBox } from '@/components/Controls';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  dashboard: 'grid',
  reports: 'chart',
  documents: 'bag',
  history: 'list',
  contacts: 'mail',
};

const PLACEHOLDER: Record<string, string> = {
  dashboard: 'Search payments',
  reports: 'Search reports',
  history: 'Search history',
};

/**
 * Rule 1, twice over.
 *
 * This design carries its nav as five labelled pills in the header *and* as an
 * icon rail down the left edge. They are the same five destinations here, so
 * an entry that is inert is inert in both — two nav strips that disagree about
 * what is available is the worst possible reading of the picture.
 */
export function TopNav({
  active,
  onSelect,
  query,
  onQuery,
  alerts,
  onAlerts,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  query: string;
  onQuery: (next: string) => void;
  alerts: number;
  onAlerts: () => void;
}) {
  return (
    <header className="bg-surface flex h-[62px] shrink-0 items-center gap-4 rounded-full px-4 shadow-[var(--shadow-card)]">
      <Wordmark />

      <nav aria-label="Sections" className="mx-auto">
        <ul className="bg-sunken m-0 flex list-none items-center gap-1 rounded-full p-1">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                data-tab={tab.id}
                data-live={tab.live}
                aria-current={active === tab.id ? 'page' : undefined}
                aria-disabled={tab.live ? undefined : true}
                tabIndex={tab.live ? undefined : -1}
                onClick={tab.live ? () => onSelect(tab.id) : undefined}
                className={cx(
                  'h-9 rounded-full px-4 text-[13px] font-semibold transition-colors duration-150',
                  !tab.live && 'text-muted cursor-not-allowed',
                  tab.live &&
                    active === tab.id &&
                    'bg-surface text-ink shadow-[var(--shadow-card)]',
                  tab.live && active !== tab.id && 'text-body hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <SearchBox
        value={query}
        onChange={onQuery}
        placeholder={PLACEHOLDER[active] ?? 'Search'}
        className="w-[230px] shrink-0"
      />

      <button
        type="button"
        data-action="alerts"
        onClick={onAlerts}
        aria-label={alerts ? `${alerts} notifications, mark all read` : 'No notifications'}
        title={alerts ? `${alerts} unread` : 'No notifications'}
        className="border-line text-body hover:bg-sunken hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors"
      >
        <Icon name="bell" size={17} />
        {alerts ? (
          <span className="bg-accent absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2 ring-white" />
        ) : null}
      </button>

      <div className="flex shrink-0 items-center gap-1.5">
        <Avatar src={FACES[0]} name={ACCOUNT.holder} size={38} />
        <Icon name="chevron-down" size={15} className="text-muted" strokeWidth={2.2} />
      </div>
    </header>
  );
}

/**
 * The icon rail: the same five destinations, plus the two utility controls the
 * reference pins to the bottom.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections (icons)"
      className="bg-surface flex w-[56px] shrink-0 flex-col items-center rounded-full py-3 shadow-[var(--shadow-card)]"
    >
      <ul className="m-0 flex list-none flex-col items-center gap-1.5 p-0">
        {TABS.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              data-rail={tab.id}
              data-live={tab.live}
              aria-current={active === tab.id ? 'page' : undefined}
              aria-disabled={tab.live ? undefined : true}
              aria-label={tab.live ? tab.label : `${tab.label} (not available)`}
              title={tab.live ? tab.label : `${tab.label} — not available`}
              tabIndex={-1}
              onClick={tab.live ? () => onSelect(tab.id) : undefined}
              className={cx(
                'grid h-10 w-10 place-items-center rounded-full transition-colors duration-150',
                !tab.live && 'text-muted cursor-not-allowed',
                tab.live && active === tab.id && 'bg-accent-deep text-white',
                tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={18} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col items-center gap-1.5 pt-3">
        <IconButton icon="settings" label="Settings" size={40} />
        <IconButton icon="logout" label="Sign out" size={40} />
      </div>
    </nav>
  );
}
