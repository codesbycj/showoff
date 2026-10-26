import { Avatar } from '@/components/Bits';
import { IconButton, SearchBox } from '@/components/Controls';
import { Nav } from '@/components/Nav';
import { ACCOUNT } from '@/data/deck';
import type { TabId } from '@/nav';
import face from '@/assets/img/face-1.jpg';

const PLACEHOLDER: Record<TabId, string> = {
  overview: 'Search transactions',
  wealth: 'Search holdings',
  cards: 'Search card spend',
  tools: '',
};

/**
 * The header: the greeting, the four nav pills, and the two round controls.
 *
 * The reference draws search as a circle with nothing behind it. Here it opens
 * into a real field, because the search is the filter for whichever pane is
 * showing — a magnifying glass that cannot be typed into is exactly the
 * interaction that ruins a take.
 */
export function TopBar({
  tab,
  onSelect,
  query,
  onQuery,
  searchOpen,
  onSearchOpen,
  alerts,
  onAlerts,
}: {
  tab: TabId;
  onSelect: (id: TabId) => void;
  query: string;
  onQuery: (next: string) => void;
  searchOpen: boolean;
  onSearchOpen: (next: boolean) => void;
  alerts: number;
  onAlerts: () => void;
}) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 px-1">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar src={face} name={ACCOUNT.holder} size={42} />
        <p className="text-ink m-0 truncate text-[25px] leading-none font-semibold tracking-[-0.025em]">
          Hello, {ACCOUNT.greeting}
        </p>
      </div>

      <div className="flex flex-1 justify-center">
        <Nav active={tab} onSelect={onSelect} />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {searchOpen ? (
          <SearchBox
            value={query}
            onChange={onQuery}
            placeholder={PLACEHOLDER[tab]}
            className="w-[250px]"
          />
        ) : null}

        <IconButton
          icon="search"
          label={searchOpen ? 'Close search' : 'Search'}
          tone="surface"
          size={44}
          active={searchOpen}
          onClick={() => {
            if (searchOpen) onQuery('');
            onSearchOpen(!searchOpen);
          }}
        />

        <button
          type="button"
          onClick={onAlerts}
          data-action="alerts"
          aria-label={alerts ? `${alerts} notifications, mark all read` : 'No notifications'}
          className="bg-surface text-body hover:text-ink flex h-11 items-center gap-2 rounded-full pr-4 pl-1.5 transition-colors"
        >
          <span className="bg-accent-faint text-accent-deep grid h-8 w-8 place-items-center rounded-full">
            <svg
              width={17}
              height={17}
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
          </span>
          <span className="tnum text-[13.5px] font-semibold">{alerts}</span>
        </button>
      </div>
    </header>
  );
}
