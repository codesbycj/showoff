import { Avatar } from '@/components/Bits';
import { SearchBox } from '@/components/Controls';
import { Wordmark } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import type { TabId } from '@/nav';
import face from '@/assets/img/face-1.jpg';

const PLACEHOLDER: Record<TabId, string> = {
  home: 'Search anything',
  history: 'Search transactions',
  wallet: 'Search payments',
  people: '',
  goals: '',
};

/**
 * The header: the mark and name on the left, the two round controls and the
 * account portrait on the right.
 *
 * The reference draws "Search me..." as grey text beside a magnifying glass
 * with nothing behind it. Here it is the real filter for whichever pane is
 * showing, because a search box that cannot be typed into is precisely the
 * interaction that ruins a take.
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
  alerts: number;
  onAlerts: () => void;
}) {
  return (
    <header className="flex h-[60px] shrink-0 items-center gap-4">
      <Wordmark />

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onAlerts}
          data-action="alerts"
          aria-label={alerts ? `${alerts} notifications, mark all read` : 'No notifications'}
          title={alerts ? `${alerts} unread` : 'No notifications'}
          className="bg-surface text-body hover:text-ink relative grid h-12 w-12 place-items-center rounded-full transition-colors"
        >
          <svg
            width={19}
            height={19}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M13.7 20a2 2 0 0 1-3.4 0" />
          </svg>
          {alerts ? (
            <span className="bg-accent absolute top-2.5 right-3 h-2.5 w-2.5 rounded-full ring-2 ring-white" />
          ) : null}
        </button>

        <SearchBox
          value={query}
          onChange={onQuery}
          placeholder={PLACEHOLDER[tab]}
          className="w-[260px]"
        />

        <Avatar src={face} name={ACCOUNT.holder} size={48} className="ring-2 ring-white" />
      </div>
    </header>
  );
}
