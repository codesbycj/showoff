import { Avatar } from '@/components/Bits';
import { SearchBox } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { store } from '@/data/deck';
import { labelOf, type TabId } from '@/nav';
import { cx } from '@/lib/cx';

/**
 * The heading row. It decides nothing: the title it shows and the search it
 * holds are the shell's state, handed down (rule 4).
 */
export function TopBar({
  tab,
  query,
  onQuery,
  alerts,
  onAlerts,
  onNewOrder,
  placed,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  alerts: number;
  onAlerts: () => void;
  onNewOrder: () => void;
  placed: boolean;
}) {
  return (
    <header className="flex shrink-0 items-start justify-between gap-6 pt-1 pb-4">
      <div className="min-w-0">
        <h1 className="text-ink m-0 text-[26px] leading-tight font-extrabold tracking-[-0.03em]">
          {labelOf(tab)}
        </h1>
        <p className="text-muted m-0 mt-1 text-[13px]">{store.welcome}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <SearchBox value={query} onChange={onQuery} className="w-[300px]" />

        <div className="relative">
          <button
            type="button"
            data-bell
            onClick={onAlerts}
            aria-label={alerts ? 'Notifications, ' + alerts + ' unread' : 'Notifications'}
            className="border-line bg-surface text-body hover:text-ink grid h-11 w-11 place-items-center rounded-full border transition-colors"
          >
            <Icon name="bell" size={18} />
          </button>
          {alerts ? (
            <span
              data-bell-count
              className="bg-danger ring-surface pointer-events-none absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold text-white ring-2"
            >
              {alerts}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5">
          <Avatar src={store.user.face} name={store.user.name} size={38} />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[13px] leading-tight font-bold">
              {store.user.name}
            </span>
            <span className="text-muted block truncate text-[11.5px] leading-tight">
              {store.user.role}
            </span>
          </span>
        </div>

        <button
          type="button"
          data-new-order
          onClick={onNewOrder}
          aria-pressed={placed}
          className={cx(
            'flex h-11 items-center gap-2 rounded-full px-5 text-[13px] font-bold transition-colors',
            placed ? 'bg-positive-soft text-positive' : 'bg-fill text-fill-fg hover:bg-fill/88',
          )}
        >
          <Icon name={placed ? 'check' : 'plus'} size={16} />
          {placed ? 'Order started' : 'New Order'}
        </button>
      </div>
    </header>
  );
}
