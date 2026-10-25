import { Avatar } from '@/components/Avatar';
import { Logo } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { Nav } from '@/components/Nav';
import { SearchBox } from '@/components/SearchBox';
import { brand } from '@/data/deck';
import type { TabId } from '@/nav';

/**
 * The bar across the top of every pane: mark, nav, search, two controls and the
 * account portrait.
 *
 * It decides nothing. The tab it shows and the search it holds are the shell's
 * state, handed down -- so what a tab does is one line in App.tsx rather than a
 * change in here (rule 4).
 */
export function TopBar({
  tab,
  onTab,
  query,
  onQuery,
  notifications,
  onNotifications,
}: {
  tab: TabId;
  onTab: (id: TabId) => void;
  query: string;
  onQuery: (next: string) => void;
  notifications: boolean;
  onNotifications: () => void;
}) {
  return (
    <header className="flex h-[76px] shrink-0 items-center gap-8 px-8">
      <div className="flex shrink-0 items-center gap-2.5">
        <Logo size={30} />
        <span className="text-ink text-[15px] font-extrabold tracking-[0.04em]">{brand.name}</span>
      </div>

      <div className="flex flex-1 justify-center">
        <Nav active={tab} onSelect={onTab} />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <SearchBox value={query} onChange={onQuery} />
        <IconButton icon="target" label="Focus mode" />
        <div className="relative">
          <IconButton
            icon="bell"
            label={notifications ? 'Notifications, 3 unread' : 'Notifications'}
            onClick={onNotifications}
            active={!notifications}
          />
          {notifications ? (
            <span
              aria-hidden="true"
              data-bell-dot
              className="bg-accent ring-surface pointer-events-none absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full ring-2"
            />
          ) : null}
        </div>
        <Avatar src={brand.user.face} name={brand.user.name} size={40} />
      </div>
    </header>
  );
}
