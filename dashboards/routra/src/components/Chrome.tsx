import { Avatar } from '@/components/Bits';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { DRIVERS } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  fleet: 'grid',
  map: 'map',
  routes: 'route',
  vehicles: 'van',
  depot: 'depot',
  messages: 'chat',
  inbox: 'inbox',
  alerts: 'bell',
};

/**
 * The icon rail — the reference's own nav, and where rule 1 lives.
 *
 * Three are live. Live map, Depot, Messages, Paperwork and Alerts stay and
 * are genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing. A rail of three
 * glyphs would be a different console.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections"
      className="bg-ink flex w-[72px] shrink-0 flex-col items-center gap-1 py-5"
    >
      <ul className="m-0 flex list-none flex-col items-center gap-1 p-0">
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
                'grid h-11 w-11 place-items-center rounded-[12px] transition-colors duration-150',
                !tab.live && 'cursor-not-allowed text-white/35',
                tab.live && active === tab.id && 'bg-accent text-accent-fg',
                tab.live && active !== tab.id && 'text-white/70 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={19} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Avatar src={DRIVERS[0].face} name="Dispatcher" size={36} />
      </div>
    </nav>
  );
}

/** The header over the working area: the operator, the shift and the search. */
export function TopBar({
  title,
  note,
  action,
}: {
  title: string;
  note: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="border-line flex h-[70px] shrink-0 items-center gap-4 border-b px-6">
      <Wordmark />
      <div className="border-line ml-2 min-w-0 border-l pl-4">
        <h1 className="text-ink m-0 truncate text-[17px] leading-tight font-bold tracking-[-0.02em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-0.5 truncate text-[12px]">{note}</p>
      </div>
      {action ? <div className="ml-auto flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </header>
  );
}
