import { Avatar } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  dashboard: 'home',
  activity: 'activity',
  wallets: 'wallet',
  settings: 'settings',
};

/**
 * Rule 1, in one component.
 *
 * Four pills in the middle of the header, so three live leaves exactly one
 * inert. Settings is dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all.
 */
export function TopNav({
  active,
  onSelect,
  mail,
  onMail,
  alerts,
  onAlerts,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  mail: number;
  onMail: () => void;
  alerts: number;
  onAlerts: () => void;
}) {
  return (
    <header className="flex h-[56px] shrink-0 items-center gap-4">
      <Wordmark />

      <nav aria-label="Sections" className="mx-auto">
        <ul className="m-0 flex list-none items-center gap-1 p-0">
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
                  'flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors duration-150',
                  !tab.live && 'text-muted cursor-not-allowed',
                  tab.live && active === tab.id && 'bg-cocoa text-cocoa-fg font-semibold',
                  tab.live && active !== tab.id && 'text-body hover:bg-sunken-deep hover:text-ink',
                )}
              >
                <Icon name={GLYPH[tab.id]} size={16} />
                {tab.label}
                {tab.expandable ? (
                  <Icon name="chevron-down" size={13} strokeWidth={2.2} className="opacity-70" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <Round
          name="mail"
          label={mail ? `${mail} messages, mark all read` : 'No messages'}
          icon="mail"
          dot={mail > 0}
          onClick={onMail}
        />
        <Round
          name="alerts"
          label={alerts ? `${alerts} notifications, mark all read` : 'No notifications'}
          icon="bell"
          dot={alerts > 0}
          onClick={onAlerts}
        />
        <Avatar src={FACES[0]} name={ACCOUNT.holder} size={40} className="ml-1" />
      </div>
    </header>
  );
}

function Round({
  name,
  label,
  icon,
  dot,
  onClick,
}: {
  name: string;
  label: string;
  icon: IconName;
  dot: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-action={name}
      onClick={onClick}
      aria-label={label}
      title={label}
      className="bg-surface text-body hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors"
    >
      <Icon name={icon} size={17} />
      {dot ? (
        <span className="bg-accent absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2 ring-white" />
      ) : null}
    </button>
  );
}

/**
 * The left rail.
 *
 * In the reference this is search, share, calendar, star and shield — tools,
 * not destinations, so it is **not** nav (see `nav.ts`). Every one of them
 * does something here, because six dead controls down the left edge is worse
 * than no rail at all: the star filters the ledger to the watchlist, the
 * shield masks every figure on the page, share copies a link, and the top
 * control collapses the rail itself.
 */
export function Rail({
  collapsed,
  onCollapse,
  starred,
  onStar,
  masked,
  onMask,
  shared,
  onShare,
  onSearch,
}: {
  collapsed: boolean;
  onCollapse: () => void;
  starred: boolean;
  onStar: () => void;
  masked: boolean;
  onMask: () => void;
  shared: boolean;
  onShare: () => void;
  onSearch: () => void;
}) {
  return (
    <div className="flex w-[52px] shrink-0 flex-col items-center gap-3">
      <IconButton
        icon={collapsed ? 'chevron-right' : 'menu'}
        label={collapsed ? 'Expand the toolbar' : 'Collapse the toolbar'}
        tone="surface"
        size={44}
        active={collapsed}
        onClick={onCollapse}
      />

      {collapsed ? null : (
        <div className="bg-surface flex flex-col items-center gap-1 rounded-full p-1.5">
          <IconButton icon="search" label="Search the ledger" size={40} onClick={onSearch} />
          <IconButton
            icon="share"
            label={shared ? 'Link copied' : 'Copy a link to this view'}
            size={40}
            active={shared}
            onClick={onShare}
          />
          <IconButton icon="calendar" label="This period" size={40} />
          <IconButton
            icon="star"
            label={starred ? 'Showing the watchlist' : 'Show the watchlist only'}
            size={40}
            active={starred}
            onClick={onStar}
          />
          <IconButton
            icon={masked ? 'eye-off' : 'shield'}
            label={masked ? 'Show the figures' : 'Hide every figure'}
            size={40}
            active={masked}
            onClick={onMask}
          />
        </div>
      )}

      <div className="mt-auto">
        <IconButton icon="logout" label="Sign out" tone="surface" size={44} />
      </div>
    </div>
  );
}
