import { Avatar } from '@/components/Bits';
import { SearchBox } from '@/components/Controls';
import { Icon, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import type { TabId } from '@/nav';

const PLACEHOLDER: Record<string, string> = {
  dashboard: 'Search',
  transactions: 'Search transactions',
  recurring: 'Search recurring',
};

/**
 * The header: the search on the left, three round controls and the account on
 * the right.
 *
 * The reference draws "Search ⌘K" as grey text in a pill. Here it is the real
 * filter for whichever pane is showing.
 */
export function TopBar({
  tab,
  query,
  onQuery,
  mail,
  onMail,
  alerts,
  onAlerts,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  mail: number;
  onMail: () => void;
  alerts: number;
  onAlerts: () => void;
}) {
  return (
    <header className="border-line flex h-[62px] shrink-0 items-center gap-3 border-b px-6">
      <SearchBox
        value={query}
        onChange={onQuery}
        placeholder={PLACEHOLDER[tab] ?? 'Search'}
        className="w-[300px]"
      />

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <Round name="help" label="Help" icon="help" />
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
        <div className="ml-1 flex items-center gap-1.5">
          <Avatar src={FACES[0]} name={ACCOUNT.holder} size={36} />
          <Icon name="chevron-down" size={15} className="text-muted" strokeWidth={2.2} />
        </div>
      </div>
    </header>
  );
}

function Round({
  name,
  label,
  icon,
  dot = false,
  onClick,
}: {
  name: string;
  label: string;
  icon: IconName;
  dot?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      data-action={name}
      onClick={onClick}
      aria-label={label}
      title={label}
      className="border-line text-body hover:bg-sunken hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors"
    >
      <Icon name={icon} size={17} />
      {dot ? (
        <span className="bg-accent absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2 ring-white" />
      ) : null}
    </button>
  );
}
