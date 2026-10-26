import { Avatar } from '@/components/Bits';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  overview: 'grid',
  statistics: 'chart',
  customers: 'users',
  product: 'box',
  messages: 'chat',
  transactions: 'exchange',
  settings: 'settings',
  security: 'shield',
};

const GROUPS: { id: 'menu' | 'general'; label: string }[] = [
  { id: 'menu', label: 'Menu' },
  { id: 'general', label: 'General' },
];

/**
 * Rule 1, in one component — as the reference's dark sidebar.
 *
 * Five of the eight are inert: dimmed against the dark ground,
 * `aria-disabled`, skipped by the keyboard, not-allowed under the pointer, and
 * a click does nothing at all. The 23 on Messages stays, because it is part of
 * the picture; it just does not open anything.
 */
export function Sidebar({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <aside className="bg-forest flex w-[214px] shrink-0 flex-col rounded-[var(--radius-card)] px-3.5 py-5">
      <div className="px-2">
        <Wordmark onDark />
      </div>

      <nav aria-label="Sections" className="mt-7 min-h-0 flex-1">
        {GROUPS.map((group) => (
          <section key={group.id} className="mt-5 first:mt-0">
            <h2 className="text-forest-fg/55 m-0 px-2 pb-2 text-[10.5px] font-bold tracking-[0.12em] uppercase">
              {group.label}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {TABS.filter((t) => t.group === group.id).map((tab) => (
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
                      'flex h-10 w-full items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] font-semibold transition-colors duration-150',
                      /*
                       * /55, measured. At 45% these labels were 4.04:1
                       * against the dark ground — dimmed past readable rather
                       * than dimmed. 55% is 5.38:1, and the live entries sit
                       * at 85%, so the difference still reads at a glance.
                       */
                      !tab.live && 'text-forest-fg/55 cursor-not-allowed',
                      tab.live && active === tab.id && 'bg-accent text-forest',
                      tab.live &&
                        active !== tab.id &&
                        'text-forest-fg/85 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    <Icon name={GLYPH[tab.id]} size={17} />
                    <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
                    {tab.count ? (
                      <span className="bg-accent text-forest rounded-full px-1.5 py-[1px] text-[10.5px] font-bold">
                        {tab.count}
                      </span>
                    ) : null}
                    {tab.expandable ? (
                      <Icon
                        name="chevron-down"
                        size={13}
                        strokeWidth={2.2}
                        className="opacity-70"
                      />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <div className="mt-4 flex shrink-0 items-center gap-2.5 rounded-[12px] bg-white/8 p-2.5">
        <Avatar src={FACES[1]} name={ACCOUNT.holder} size={34} />
        <span className="min-w-0 flex-1">
          <span className="text-forest-fg block truncate text-[12.5px] font-bold">
            {ACCOUNT.holder}
          </span>
          <span className="text-forest-fg/65 block truncate text-[10.5px]">{ACCOUNT.email}</span>
        </span>
        <button
          type="button"
          data-action="signout"
          aria-label="Sign out"
          title="Sign out"
          className="text-forest-fg/70 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/12 hover:text-white"
        >
          <Icon name="logout" size={15} />
        </button>
      </div>
    </aside>
  );
}
