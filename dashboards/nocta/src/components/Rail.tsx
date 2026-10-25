import { Icon, Logo } from '@/components/Icon';
import { cx } from '@/lib/cx';
import { TABS, type Tab, type TabId } from '@/nav';

/**
 * The icon rail.
 *
 * Rule 1 lives here. An inactive entry is *visibly* inactive and genuinely
 * inert: dimmed, `aria-disabled`, skipped by the keyboard, not-allowed under
 * the pointer, and a click does nothing at all. `drive.js` proves it with a
 * beat that clicks one and asserts the frame did not move.
 *
 * Every entry carries an `aria-label` and a `title`. The reference's rail is
 * eight unlabelled glyphs, which is fine in a picture and unusable with a
 * keyboard or a screen reader.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  const main = TABS.filter((t) => !t.foot);
  const foot = TABS.filter((t) => t.foot);

  return (
    <nav
      aria-label="Sections"
      className="border-line bg-surface flex w-[72px] shrink-0 flex-col items-center gap-2 rounded-[22px] border py-5"
    >
      <span className="text-ink mb-4" aria-hidden="true">
        <Logo size={26} />
      </span>

      <ul className="m-0 flex list-none flex-col items-center gap-2 p-0">
        {main.map((tab) => (
          <Item key={tab.id} tab={tab} active={active === tab.id} onSelect={onSelect} />
        ))}
      </ul>

      <ul className="m-0 mt-auto flex list-none flex-col items-center gap-2 p-0">
        {foot.map((tab) => (
          <Item key={tab.id} tab={tab} active={active === tab.id} onSelect={onSelect} />
        ))}
      </ul>
    </nav>
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
        aria-label={tab.label}
        aria-current={active ? 'page' : undefined}
        aria-disabled={tab.live ? undefined : true}
        tabIndex={tab.live ? undefined : -1}
        title={tab.label}
        onClick={tab.live ? () => onSelect(tab.id) : undefined}
        className={cx(
          'grid h-11 w-11 place-items-center rounded-[14px] transition-colors duration-150',
          active && 'bg-ink text-[#111113]',
          !active && tab.live && 'text-muted hover:bg-raised hover:text-ink',
          !tab.live && 'text-muted cursor-not-allowed opacity-45',
        )}
      >
        <Icon name={tab.icon} size={19} />
      </button>
    </li>
  );
}
