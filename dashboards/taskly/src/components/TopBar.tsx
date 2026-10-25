import { Avatar } from '@/components/Bits';
import { IconButton, SearchBox } from '@/components/Controls';
import { Icon, Logo } from '@/components/Icon';
import { workspace } from '@/data/deck';
import { cx } from '@/lib/cx';

export type Theme = 'light' | 'dark';

/**
 * The bar across the top. It decides nothing: the search it holds and the theme
 * it shows are the shell's state, handed down (rule 4).
 */
export function TopBar({
  query,
  onQuery,
  theme,
  onTheme,
  alerts,
  onAlerts,
}: {
  query: string;
  onQuery: (next: string) => void;
  theme: Theme;
  onTheme: (next: Theme) => void;
  alerts: boolean;
  onAlerts: () => void;
}) {
  return (
    <header className="border-line flex h-[70px] shrink-0 items-center gap-5 border-b px-6">
      <div className="flex shrink-0 items-center gap-2">
        <Logo size={30} />
        <span className="text-ink text-[16px] font-extrabold tracking-[-0.01em]">
          {workspace.brand}
        </span>
      </div>

      <div className="flex flex-1 justify-center">
        <SearchBox value={query} onChange={onQuery} className="w-[380px]" />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <IconButton icon="sliders" label="Search filters" square />

        <div
          role="group"
          aria-label="Colour theme"
          className="border-line flex items-center gap-1 rounded-full border p-1"
        >
          {(['light', 'dark'] as const).map((id) => (
            <button
              key={id}
              type="button"
              data-theme-btn={id}
              aria-pressed={theme === id}
              aria-label={id === 'light' ? 'Light theme' : 'Dark theme'}
              onClick={() => onTheme(id)}
              className={cx(
                'grid h-8 w-8 place-items-center rounded-full transition-colors',
                theme === id ? 'bg-fill text-fill-fg' : 'text-muted hover:text-ink',
              )}
            >
              <Icon name={id === 'light' ? 'sun' : 'moon'} size={16} />
            </button>
          ))}
        </div>

        <div className="relative">
          <IconButton
            icon="bell"
            label={alerts ? 'Notifications, 4 unread' : 'Notifications'}
            onClick={onAlerts}
          />
          {alerts ? (
            <span
              aria-hidden="true"
              data-bell-dot
              className="bg-pink ring-surface pointer-events-none absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full ring-2"
            />
          ) : null}
        </div>

        <div className="border-line flex items-center gap-2 rounded-full border py-1 pr-3.5 pl-1">
          <Avatar src={workspace.user.face} name={workspace.user.full} size={32} />
          <span className="text-ink text-[13px] font-bold">{workspace.user.name}</span>
        </div>
      </div>
    </header>
  );
}
