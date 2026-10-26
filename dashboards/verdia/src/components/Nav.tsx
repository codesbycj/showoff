import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * Rule 1, in one component.
 *
 * An inactive tab is *visibly* inactive and genuinely inert: dimmed, skipped
 * by the keyboard, not-allowed under the pointer, and a click does nothing at
 * all — no route change, no empty pane, no console error. A dead link that
 * looks live is the one thing that cannot be in the take.
 *
 * This design's nav is four pills in the middle of the header, so one entry is
 * inert rather than the usual two. See the episode README.
 */
export function Nav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav aria-label="Sections">
      <ul className="m-0 flex list-none items-center gap-1 p-0">
        {TABS.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              data-tab={tab.id}
              data-live={tab.live}
              aria-current={active === tab.id ? 'page' : undefined}
              aria-disabled={tab.live ? undefined : true}
              tabIndex={tab.live ? undefined : -1}
              onClick={tab.live ? () => onSelect(tab.id) : undefined}
              className={cx(
                'h-9 rounded-full px-4 text-[13.5px] font-semibold transition-colors duration-150',
                /*
                 * The muted token at full strength, not a faded one. An inert
                 * tab has to stay *readable* — at 55% opacity this was 2.12:1,
                 * which is a tab nobody can read rather than a tab that is off.
                 * It still reads as inactive because every live tab is the
                 * darker body colour.
                 */
                !tab.live && 'text-muted cursor-not-allowed',
                tab.live && active === tab.id && 'bg-accent text-fill',
                tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
