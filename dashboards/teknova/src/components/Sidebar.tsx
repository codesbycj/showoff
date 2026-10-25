import { Avatar } from '@/components/Avatar';
import { Icon, Logo } from '@/components/Icon';
import { store } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, labelOf, type Tab, type TabId } from '@/nav';

/**
 * The left rail: the store, the breadcrumb, the welcome, the menu, and the
 * account card pinned to the bottom.
 *
 * Rule 1 lives in `Item` below. An inactive entry is *visibly* inactive and
 * genuinely inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all — no pane
 * change, no empty screen, no console error. `drive.js` proves it with a beat
 * that clicks one and asserts the frame did not move.
 */
export function Sidebar({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  const menu = TABS.filter((t) => t.group === 'menu');
  const others = TABS.filter((t) => t.group === 'others');

  return (
    <aside className="border-line bg-surface flex w-[262px] shrink-0 flex-col border-r px-4 pt-4 pb-4">
      <div className="border-line flex items-center gap-2.5 rounded-2xl border p-2.5">
        <Logo size={36} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-ink m-0 truncate text-[13px] font-bold">{store.name}</p>
            <span className="bg-accent-soft text-accent-deep inline-flex items-center gap-1 rounded-full px-1.5 py-[1px] text-[10.5px] font-bold">
              <Icon name="check" size={9} strokeWidth={2.6} />
              {store.plan}
            </span>
          </div>
          <p className="text-muted m-0 mt-0.5 flex items-center gap-1 text-[11.5px]">
            <Icon name="help" size={11} />
            {store.visibility}
          </p>
        </div>
        <span className="text-muted" aria-hidden="true">
          <Icon name="stack" size={15} />
        </span>
      </div>

      <nav aria-label="Sections" className="mt-5 flex min-h-0 flex-1 flex-col">
        <p className="text-muted m-0 flex items-center gap-1.5 px-1 text-[12px]">
          <span className="truncate">{store.name}</span>
          <Icon name="chevron-right" size={11} />
          <span className="text-body truncate font-semibold">{labelOf(active)}</span>
        </p>

        <h1 className="text-ink m-0 mt-2.5 px-1 text-[21px] leading-[1.25] font-extrabold tracking-[-0.025em]">
          Welcome Back,
          <br />
          {store.user.name.split(' ')[0]} {store.user.name.split(' ')[1]}
          <span aria-hidden="true" className="ml-1.5 inline-block">
            <Wave />
          </span>
        </h1>

        <Group label="Menu" />
        <ul className="m-0 mt-1 flex list-none flex-col gap-0.5 p-0">
          {menu.map((tab) => (
            <Item key={tab.id} tab={tab} active={active === tab.id} onSelect={onSelect} />
          ))}
        </ul>

        <Group label="Others" className="mt-6" />
        <ul className="m-0 mt-1 flex list-none flex-col gap-0.5 p-0">
          {others.map((tab) => (
            <Item key={tab.id} tab={tab} active={active === tab.id} onSelect={onSelect} />
          ))}
        </ul>
      </nav>

      <div className="border-line mt-4 flex items-center gap-2.5 border-t pt-4">
        <Avatar src={store.user.face} name={store.user.name} size={36} />
        <div className="min-w-0 flex-1">
          <p className="text-ink m-0 truncate text-[13px] font-bold">{store.user.name}</p>
          <p className="text-muted m-0 truncate text-[11.5px]">{store.user.email}</p>
        </div>
        <span className="text-muted" aria-hidden="true">
          <Icon name="dots" size={16} />
        </span>
      </div>
    </aside>
  );
}

function Group({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cx('border-line mt-5 flex items-center justify-between border-t pt-4', className)}
    >
      <span className="text-muted px-1 text-[11px] font-bold tracking-[0.1em] uppercase">
        {label}
      </span>
      <Icon name="chevron-up" size={14} className="text-muted" />
    </div>
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
          'flex h-11 w-full items-center gap-2.5 rounded-[14px] px-3 text-[13.5px] transition-colors duration-150',
          active && 'bg-fill text-fill-fg font-bold',
          !active && tab.live && 'text-body hover:bg-sunken hover:text-ink font-semibold',
          !tab.live && 'text-muted cursor-not-allowed font-semibold opacity-55',
        )}
      >
        <Icon name={tab.icon} size={17} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
        {tab.count ? (
          <span
            className={cx(
              'grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full px-1 text-[11px] font-bold',
              active ? 'bg-fill-fg/20 text-fill-fg' : 'bg-warn-deep text-fill-fg',
            )}
          >
            {tab.count}
          </span>
        ) : null}
      </button>
    </li>
  );
}

/** The waving hand after the name — drawn, because Windows, Android and iOS all
 *  render that emoji differently and one of them is a different skin tone. */
function Wave() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M8.2 12.6 6.9 10a1.4 1.4 0 0 1 2.4-1.4l1 1.7-2-4.5a1.4 1.4 0 0 1 2.5-1.2l2 4.3-.9-2.6a1.4 1.4 0 1 1 2.6-.9l1.3 3.6.2-1.3a1.3 1.3 0 0 1 2.6.4c-.5 4.1-.9 6.6-2.5 8.2-2.2 2.2-5.6 2-7.5-.2-.9-1-1.6-2-2.4-3.5Z"
        fill="#f6b73c"
        stroke="#d1902a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
