import { Icon, Wordmark } from '@/components/Icon';
import { cx } from '@/lib/cx';
import { TABS, type Tab, type TabId } from '@/nav';

/**
 * The left menu, and the primary action pinned under it.
 *
 * Rule 1 lives in `Item`. An inactive entry is *visibly* inactive and genuinely
 * inert: dimmed, `aria-disabled`, skipped by the keyboard, not-allowed under
 * the pointer, and a click does nothing at all.
 */
export function Sidebar({
  active,
  onSelect,
  onAdd,
  added,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  onAdd: () => void;
  added: boolean;
}) {
  return (
    <aside className="flex w-[216px] shrink-0 flex-col px-3 py-4">
      <div className="px-2 pb-5">
        <Wordmark size={21} />
      </div>

      <nav aria-label="Sections" className="min-h-0 flex-1">
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {TABS.map((tab) => (
            <Item key={tab.id} tab={tab} active={active === tab.id} onSelect={onSelect} />
          ))}
        </ul>
      </nav>

      <button
        type="button"
        data-add-product
        onClick={onAdd}
        aria-pressed={added}
        className={cx(
          'mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-bold transition-colors',
          added ? 'bg-positive-soft text-positive' : 'bg-fill text-fill-fg hover:bg-fill/88',
        )}
      >
        <Icon name={added ? 'check' : 'plus'} size={16} />
        {added ? 'Draft created' : 'Add Product'}
      </button>
    </aside>
  );
}

function Item({
  tab,
  active,
  onSelect,
}: {
  tab: Tab;
  active: boolean;
  onSelect: (id: TabId) => void;
}) {
  return (
    <li>
      <button
        type="button"
        data-tab={tab.id}
        data-live={tab.live}
        aria-current={active ? 'page' : undefined}
        aria-disabled={tab.live ? undefined : true}
        tabIndex={tab.live ? undefined : -1}
        onClick={tab.live ? () => onSelect(tab.id) : undefined}
        className={cx(
          'flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] transition-colors duration-150',
          active && 'bg-fill text-fill-fg font-bold',
          !active && tab.live && 'text-body hover:bg-surface hover:text-ink font-semibold',
          !tab.live && 'text-muted cursor-not-allowed font-semibold opacity-55',
        )}
      >
        <Icon name={tab.icon} size={16} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
        {tab.count ? (
          <span
            className={cx(
              'shrink-0 text-[11.5px] font-bold',
              active ? 'text-fill-fg/70' : 'text-muted',
            )}
          >
            {tab.count}
          </span>
        ) : null}
      </button>
    </li>
  );
}
