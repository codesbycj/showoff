import { Avatar } from '@/components/Bits';
import { Button, SearchBox } from '@/components/Controls';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  dashboard: 'grid',
  products: 'box',
  orders: 'bag',
  customers: 'users',
  chat: 'chat',
  email: 'mail',
  analytics: 'chart',
  integration: 'plug',
  performance: 'gauge',
  account: 'account',
  members: 'members',
};

const GROUPS: { id: 'main' | 'other' | 'account'; label: string }[] = [
  { id: 'main', label: 'Main Menu' },
  { id: 'other', label: 'Other' },
  { id: 'account', label: 'Account' },
];

const PLACEHOLDER: Record<string, string> = {
  dashboard: 'Search',
  products: 'Search products',
  orders: 'Search orders',
};

/**
 * Rule 1, in one component.
 *
 * Eight of the eleven are inert: muted, `aria-disabled`, skipped by the
 * keyboard, not-allowed under the pointer, and a click does nothing at all.
 * The 22 on Chat stays, because it is part of the picture.
 */
export function Sidebar({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <aside className="border-line bg-surface flex w-[224px] shrink-0 flex-col border-r px-3.5 py-4">
      <div className="flex items-center justify-between gap-2 px-1">
        <Wordmark />
        <button
          type="button"
          data-action="collapse"
          aria-label="Collapse the sidebar"
          title="Collapse the sidebar"
          className="text-muted hover:bg-sunken hover:text-ink grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors"
        >
          <Icon name="chevron-left" size={15} />
        </button>
      </div>

      <nav aria-label="Sections" className="mt-5 min-h-0 flex-1 overflow-hidden">
        {GROUPS.map((group) => (
          <section key={group.id} className="mt-4 first:mt-0">
            <h2 className="text-muted m-0 px-2 pb-1.5 text-[10px] font-bold tracking-[0.12em] uppercase">
              {group.label}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {TABS.filter((t) => t.group === group.id).map((tab) => (
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
                      'relative flex h-9 w-full items-center gap-2.5 rounded-[8px] px-2.5 text-[12.5px] font-semibold transition-colors duration-150',
                      !tab.live && 'text-muted cursor-not-allowed',
                      tab.live && active === tab.id && 'bg-accent-faint text-accent-deep',
                      tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                    )}
                  >
                    {tab.live && active === tab.id ? (
                      <span className="bg-accent absolute top-1.5 bottom-1.5 -left-3.5 w-[3px] rounded-r-full" />
                    ) : null}
                    <Icon name={GLYPH[tab.id]} size={16} />
                    <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
                    {tab.count ? (
                      <span className="bg-sunken text-muted rounded-full px-1.5 py-[1px] text-[10px] font-bold">
                        {tab.count}
                      </span>
                    ) : null}
                    {tab.info ? <Icon name="info" size={13} className="opacity-60" /> : null}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <div className="mt-3 shrink-0">
        <button
          type="button"
          data-action="settings"
          className="text-body hover:bg-sunken hover:text-ink flex h-9 w-full items-center gap-2.5 rounded-[8px] px-2.5 text-[12.5px] font-semibold transition-colors"
        >
          <Icon name="settings" size={16} />
          Settings
        </button>
        <button
          type="button"
          data-action="feedback"
          className="text-body hover:bg-sunken hover:text-ink flex h-9 w-full items-center gap-2.5 rounded-[8px] px-2.5 text-[12.5px] font-semibold transition-colors"
        >
          <Icon name="feedback" size={16} />
          Feedback
        </button>

        <div className="border-line mt-2 flex items-center gap-2.5 border-t pt-3">
          <Avatar src={FACES[1]} name={ACCOUNT.holder} size={32} />
          <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-semibold">
            {ACCOUNT.holder}
          </span>
          <button
            type="button"
            data-action="logout"
            aria-label="Sign out"
            title="Sign out"
            className="text-muted hover:bg-sunken hover:text-ink grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors"
          >
            <Icon name="logout" size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/** The header: the search, the team stack, the bell and Export. */
export function TopBar({
  tab,
  query,
  onQuery,
  alerts,
  onAlerts,
  exported,
  onExport,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  alerts: number;
  onAlerts: () => void;
  exported: boolean;
  onExport: () => void;
}) {
  return (
    <header className="border-line flex h-[60px] shrink-0 items-center gap-3 border-b px-5">
      <SearchBox
        value={query}
        onChange={onQuery}
        placeholder={PLACEHOLDER[tab] ?? 'Search'}
        className="w-[300px]"
      />

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <div className="flex items-center">
          {[0, 2, 4].map((f, i) => (
            <Avatar
              key={f}
              src={FACES[f]}
              name="Team member"
              size={32}
              className={cx('ring-2 ring-white', i > 0 && '-ml-2.5')}
            />
          ))}
          <button
            type="button"
            data-action="invite"
            aria-label="Invite a team member"
            title="Invite a team member"
            className="border-line text-muted hover:text-ink -ml-2.5 grid h-8 w-8 place-items-center rounded-full border border-dashed bg-white transition-colors"
          >
            <Icon name="plus" size={14} strokeWidth={2.2} />
          </button>
        </div>

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

        <Button
          icon={exported ? 'check' : 'export'}
          variant="accent"
          name="export"
          onClick={onExport}
        >
          {exported ? 'Exported' : 'Export'}
        </Button>
      </div>
    </header>
  );
}
