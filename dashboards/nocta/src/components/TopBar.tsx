import { IconButton, SearchBox } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { account } from '@/data/deck';
import { labelOf, type TabId } from '@/nav';

/**
 * The bar above every pane. It decides nothing: the title it shows and the
 * search it holds are the shell's state, handed down (rule 4).
 */
export function TopBar({
  tab,
  query,
  onQuery,
  alerts,
  onAlerts,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  alerts: boolean;
  onAlerts: () => void;
}) {
  return (
    <header className="flex h-[72px] shrink-0 items-center gap-4 pr-1 pl-2">
      <h1 className="text-ink m-0 text-[26px] leading-none font-semibold tracking-[-0.025em]">
        {labelOf(tab)}
      </h1>

      <div className="flex-1" />

      <SearchBox value={query} onChange={onQuery} className="w-[220px]" />

      <div className="border-line bg-raised flex h-11 items-center gap-2.5 rounded-full border py-1 pr-3 pl-1.5">
        <img
          src={account.user.face}
          alt={account.user.name}
          width={34}
          height={34}
          className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[12.5px] leading-tight font-semibold">
            {account.user.name}
          </span>
          <span className="text-muted block truncate text-[11px] leading-tight">
            {account.user.email}
          </span>
        </span>
        <Icon name="chevron-down" size={15} className="text-muted shrink-0" />
      </div>

      <div className="relative">
        <IconButton
          icon="bell"
          label={alerts ? 'Notifications, 2 unread' : 'Notifications'}
          onClick={onAlerts}
          tone="raised"
          size={40}
        />
        {alerts ? (
          <span
            aria-hidden="true"
            data-bell-dot
            className="bg-danger ring-surface pointer-events-none absolute top-1 right-1 h-2.5 w-2.5 rounded-full ring-2"
          />
        ) : null}
      </div>
    </header>
  );
}
