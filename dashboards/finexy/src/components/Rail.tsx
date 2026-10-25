import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';
import { RAIL, type RailItem, type TabId } from '@/nav';

export type Theme = 'light' | 'dark';

/**
 * The left rail: the theme pair at the top, then the icons.
 *
 * Three of the icons carry the three live tabs and stay in step with the nav
 * above; the rest are inert in the same way the nav's inactive entries are —
 * dimmed, `aria-disabled`, skipped by the keyboard, not-allowed, and a click
 * does nothing. Every one is labelled, which the reference's unlabelled rail
 * is not.
 */
export function Rail({
  tab,
  onTab,
  theme,
  onTheme,
}: {
  tab: TabId;
  onTab: (id: TabId) => void;
  theme: Theme;
  onTheme: (next: Theme) => void;
}) {
  const main = RAIL.filter((r) => !r.foot);
  const foot = RAIL.filter((r) => r.foot);

  return (
    <aside className="flex w-[60px] shrink-0 flex-col items-center gap-3 py-4">
      <div
        role="group"
        aria-label="Colour theme"
        className="border-line bg-surface flex flex-col items-center gap-1 rounded-full border p-1"
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
            <Icon name={id === 'light' ? 'sun' : 'moon'} size={15} />
          </button>
        ))}
      </div>

      <nav aria-label="Quick sections" className="flex min-h-0 flex-1 flex-col items-center">
        <ul className="m-0 flex list-none flex-col items-center gap-1.5 p-0">
          {main.map((item) => (
            <Item key={item.id} item={item} tab={tab} onTab={onTab} />
          ))}
        </ul>

        <ul className="m-0 mt-auto flex list-none flex-col items-center gap-1.5 p-0">
          {foot.map((item) => (
            <Item key={item.id} item={item} tab={tab} onTab={onTab} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function Item({ item, tab, onTab }: { item: RailItem; tab: TabId; onTab: (id: TabId) => void }) {
  const live = !!item.tab;
  const active = live && item.tab === tab;

  return (
    <li>
      <button
        type="button"
        data-rail={item.id}
        data-live={live}
        aria-label={item.label}
        title={item.label}
        aria-current={active ? 'page' : undefined}
        aria-disabled={live ? undefined : true}
        tabIndex={live ? undefined : -1}
        onClick={live ? () => onTab(item.tab as TabId) : undefined}
        className={cx(
          'grid h-10 w-10 place-items-center rounded-xl transition-colors duration-150',
          active && 'bg-fill text-fill-fg',
          !active && live && 'text-muted hover:bg-surface hover:text-ink',
          !live && 'text-muted cursor-not-allowed opacity-45',
        )}
      >
        <Icon name={item.icon} size={18} />
      </button>
    </li>
  );
}
