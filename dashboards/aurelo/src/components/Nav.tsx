import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  home: 'home',
  history: 'clock',
  people: 'users',
  wallet: 'wallet',
  goals: 'target',
};

/**
 * Rule 1, in one component — as a dark icon rail.
 *
 * An inert entry is dimmed, `aria-disabled`, skipped by the keyboard and
 * not-allowed under the pointer, and a click does nothing at all. A rail with
 * no labels makes that harder rather than easier, so each entry carries a
 * title and an accessible name, and the two inert ones say they are off.
 */
export function Nav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections"
      className="bg-rail flex w-[62px] shrink-0 flex-col items-center rounded-full py-4"
    >
      <ul className="m-0 flex list-none flex-col items-center gap-2 p-0">
        {TABS.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              data-tab={tab.id}
              data-live={tab.live}
              aria-current={active === tab.id ? 'page' : undefined}
              aria-disabled={tab.live ? undefined : true}
              aria-label={tab.live ? tab.label : `${tab.label} (not available)`}
              title={tab.live ? tab.label : `${tab.label} — not available`}
              tabIndex={tab.live ? undefined : -1}
              onClick={tab.live ? () => onSelect(tab.id) : undefined}
              className={cx(
                'grid h-11 w-11 place-items-center rounded-full transition-colors duration-150',
                /* /45, not /35: at 35% an inert glyph measured 2.95:1 against the
                   rail, which is a glyph nobody can see rather than one that is
                   off. The live ones sit at 9.3:1, so the difference still
                   reads at a glance. */
                !tab.live && 'text-rail-fg/45 cursor-not-allowed',
                tab.live && active === tab.id && 'bg-surface text-ink',
                tab.live &&
                  active !== tab.id &&
                  'text-rail-fg/80 hover:bg-white/12 hover:text-white',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={20} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col items-center gap-2 pt-4">
        <button
          type="button"
          data-action="help"
          aria-label="Help"
          title="Help"
          className="text-rail-fg/80 grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/12 hover:text-white"
        >
          <Icon name="help" size={20} />
        </button>
        <button
          type="button"
          data-action="signout"
          aria-label="Sign out"
          title="Sign out"
          className="text-rail-fg/80 grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/12 hover:text-white"
        >
          <Icon name="logout" size={20} />
        </button>
      </div>
    </nav>
  );
}
