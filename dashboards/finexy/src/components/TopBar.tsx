import { Badge } from '@/components/Bits';
import { Icon, Logo } from '@/components/Icon';
import { account } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The bar across the top: the mark, the nav pill group, and the account.
 *
 * Rule 1 lives in the nav list. An inactive entry is *visibly* inactive and
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all.
 */
export function TopBar({
  tab,
  onTab,
  alerts,
  onAlerts,
}: {
  tab: TabId;
  onTab: (id: TabId) => void;
  alerts: boolean;
  onAlerts: () => void;
}) {
  return (
    <header className="flex h-[72px] shrink-0 items-center gap-5 px-5">
      <div className="flex shrink-0 items-center gap-2.5">
        <Logo size={34} />
        <span className="text-ink text-[18px] font-extrabold tracking-[-0.02em]">
          {account.brand}
        </span>
      </div>

      <nav aria-label="Sections" className="flex flex-1 justify-center">
        <ul className="border-line bg-surface m-0 flex list-none items-center gap-1 rounded-full border p-1">
          {TABS.map((t) => {
            const current = tab === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  data-tab={t.id}
                  data-live={t.live}
                  aria-current={current ? 'page' : undefined}
                  aria-disabled={t.live ? undefined : true}
                  tabIndex={t.live ? undefined : -1}
                  onClick={t.live ? () => onTab(t.id) : undefined}
                  className={cx(
                    'h-9 rounded-full px-4 text-[13px] transition-colors duration-150',
                    current && 'bg-fill text-fill-fg font-bold',
                    !current && t.live && 'text-body hover:bg-sunken hover:text-ink font-semibold',
                    !t.live && 'text-muted cursor-not-allowed font-semibold opacity-50',
                  )}
                >
                  {t.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-3">
        <div className="border-line bg-surface flex items-center gap-1 rounded-full border p-1">
          <button
            type="button"
            aria-label="Search"
            className="text-muted hover:bg-sunken hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
          >
            <Icon name="search" size={17} />
          </button>
          <div className="relative">
            <button
              type="button"
              data-bell
              onClick={onAlerts}
              aria-label={alerts ? 'Notifications, 2 unread' : 'Notifications'}
              className="text-muted hover:bg-sunken hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
            >
              <Icon name="bell" size={17} />
            </button>
            {alerts ? (
              <span
                aria-hidden="true"
                data-bell-dot
                className="bg-accent ring-surface pointer-events-none absolute top-1 right-1 h-2 w-2 rounded-full ring-2"
              />
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Help and information"
            className="text-muted hover:bg-sunken hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
          >
            <Icon name="info" size={17} />
          </button>
        </div>

        <div className="border-line bg-surface flex items-center gap-2.5 rounded-full border py-1 pr-3 pl-1">
          <img
            src={account.user.face}
            alt={account.user.name}
            width={34}
            height={34}
            className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[12.5px] leading-tight font-bold">
              {account.user.name}
            </span>
            <span className="text-muted block max-w-[150px] truncate text-[11px] leading-tight">
              {account.user.email}
            </span>
          </span>
          <Icon name="chevron-down" size={15} className="text-muted shrink-0" />
        </div>
      </div>
    </header>
  );
}

/** The greeting block under the bar. */
export function Greeting({ live }: { live: number }) {
  return (
    <div className="flex items-end justify-between gap-4 px-5 pb-1">
      <div>
        <h1 className="text-ink m-0 text-[28px] leading-tight font-extrabold tracking-[-0.03em]">
          {account.greeting}, {account.user.first}
        </h1>
        <p className="text-muted m-0 mt-1 text-[13px]">{account.strapline}</p>
      </div>
      <Badge tone="positive" dot>
        {live} live {live === 1 ? 'transfer' : 'transfers'}
      </Badge>
    </div>
  );
}
