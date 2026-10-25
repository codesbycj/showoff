import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * Rule 1, in one component.
 *
 * An inactive tab is *visibly* inactive and genuinely inert: dimmed, skipped
 * by the keyboard, not-allowed under the pointer, and a click does nothing at
 * all -- no route change, no empty pane, no console error. A dead link that
 * looks live is the one thing that cannot be in the take.
 */
export function Nav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav aria-label="Sections">
      <ul>
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
              className={cx(!tab.live && 'cursor-not-allowed opacity-40')}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
