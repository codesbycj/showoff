import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * Rule 1, in one component.
 *
 * Three tabs are built. The other two stay in the nav -- a five-item nav is
 * part of the design that was dropped and cutting it to three would be a
 * different design -- and they are genuinely inert: dimmed, skipped by the
 * keyboard, not-allowed under the pointer, and a click does nothing at all. No
 * route change, no empty pane, no console error.
 *
 * `drive.js` proves it with a beat that clicks one and asserts the frame did
 * not change.
 */
export function Nav({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav aria-label="Sections">
      <ul className="flex items-center gap-7">
        {TABS.map((tab) => {
          const current = active === tab.id;
          return (
            <li key={tab.id}>
              <button
                type="button"
                data-tab={tab.id}
                data-live={tab.live}
                aria-current={current ? 'page' : undefined}
                aria-disabled={tab.live ? undefined : true}
                tabIndex={tab.live ? undefined : -1}
                onClick={tab.live ? () => onSelect(tab.id) : undefined}
                className={cx(
                  'relative -mx-1 block px-1 py-3 text-[14px] transition-colors duration-150',
                  current && 'text-ink font-semibold',
                  !current && tab.live && 'text-body hover:text-ink font-medium',
                  !tab.live && 'text-muted cursor-not-allowed font-medium opacity-55',
                )}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className={cx(
                    'bg-ink absolute inset-x-0 bottom-1.5 h-[2px] rounded-full transition-opacity duration-150',
                    current ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
