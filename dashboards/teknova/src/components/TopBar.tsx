import { AvatarStack } from '@/components/Avatar';
import { IconButton, SearchBox } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { store } from '@/data/deck';
import { cx } from '@/lib/cx';

export type Theme = 'light' | 'dark';

/**
 * The bar above every pane. It decides nothing: the search it holds and the
 * theme it shows are the shell's state, handed down (rule 4).
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
    <header className="flex h-[76px] shrink-0 items-center gap-5 px-6">
      <SearchBox value={query} onChange={onQuery} className="w-[360px]" />
      <IconButton icon="sliders" label="Search filters" square />

      <div className="flex-1" />

      <ThemeToggle theme={theme} onTheme={onTheme} />

      <div className="relative">
        <IconButton
          icon="bell"
          label={alerts ? 'Notifications, 3 unread' : 'Notifications'}
          onClick={onAlerts}
        />
        {alerts ? (
          <span
            aria-hidden="true"
            data-bell-dot
            className="bg-warn ring-surface pointer-events-none absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full ring-2"
          />
        ) : null}
      </div>

      <AvatarStack faces={store.team} extra={store.teamExtra} />

      <button
        type="button"
        data-invite
        className="bg-fill hover:bg-fill/88 text-fill-fg flex h-11 items-center gap-2 rounded-full px-5 text-[13.5px] font-bold transition-colors"
      >
        <Icon name="plus" size={16} />
        Invite
      </button>
    </header>
  );
}

/**
 * The sun/moon pair. A real switch: it sets `data-theme` on the document and
 * every token in the sheet is redefined for dark, so the whole app changes.
 */
function ThemeToggle({ theme, onTheme }: { theme: Theme; onTheme: (next: Theme) => void }) {
  return (
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
  );
}
