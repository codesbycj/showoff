import { Avatar } from '@/components/Bits';
import { SearchBox } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import type { TabId } from '@/nav';
import { TABS } from '@/nav';
import { cx } from '@/lib/cx';

const PLACEHOLDER: Record<string, string> = {
  dashboard: 'Search placeholder',
  transactions: 'Search transactions',
  plans: 'Search saving plans',
};

/**
 * The header: the pane's own title, the search, two round controls and the
 * account.
 *
 * The reference draws "Search placeholder" as grey text in a pill. Here it is
 * the real filter for whichever pane is showing.
 */
export function TopBar({
  tab,
  query,
  onQuery,
  alerts,
  onAlerts,
  messages,
  onMessages,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  alerts: number;
  onAlerts: () => void;
  messages: number;
  onMessages: () => void;
}) {
  const title = TABS.find((t) => t.id === tab)?.label ?? '';

  return (
    <header className="flex h-[52px] shrink-0 items-center gap-4">
      <h1 className="text-ink m-0 shrink-0 text-[20px] leading-none font-extrabold tracking-[-0.02em]">
        {title}
      </h1>

      <SearchBox
        value={query}
        onChange={onQuery}
        placeholder={PLACEHOLDER[tab] ?? 'Search'}
        className="ml-auto w-[320px]"
      />

      <Round
        name="messages"
        label={messages ? `${messages} messages, mark all read` : 'No messages'}
        icon="chat"
        dot={messages > 0}
        onClick={onMessages}
      />
      <Round
        name="alerts"
        label={alerts ? `${alerts} notifications, mark all read` : 'No notifications'}
        icon="bell"
        dot={alerts > 0}
        onClick={onAlerts}
      />

      <div className="flex shrink-0 items-center gap-2.5">
        <span className="text-ink text-[13px] font-bold">{ACCOUNT.holder}</span>
        <Avatar src={FACES[0]} name={ACCOUNT.holder} size={36} />
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
  icon: 'chat' | 'bell';
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
      className={cx(
        'border-line text-body hover:bg-sunken hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors',
      )}
    >
      <Icon name={icon} size={17} />
      {dot ? (
        <span className="bg-danger absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2 ring-white" />
      ) : null}
    </button>
  );
}
