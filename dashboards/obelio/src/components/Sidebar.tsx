import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  dashboard: 'grid',
  analytics: 'chart',
  transactions: 'exchange',
  invoices: 'invoice',
  recurring: 'repeat',
  subscriptions: 'layers',
  feedback: 'message',
  settings: 'settings',
  help: 'help',
};

const GROUPS: { id: 'main' | 'features' | 'general'; label: string }[] = [
  { id: 'main', label: 'Main Menu' },
  { id: 'features', label: 'Features' },
  { id: 'general', label: 'General' },
];

/**
 * Rule 1, in one component.
 *
 * Six of the nine are inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all. The 20 on
 * Analytics and the 16 on Recurring both stay, because they are part of the
 * picture — the one on an inert entry simply does not open anything.
 */
export function Sidebar({
  active,
  onSelect,
  pro,
  onPro,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  pro: boolean;
  onPro: () => void;
}) {
  return (
    <aside className="bg-surface border-line flex w-[236px] shrink-0 flex-col border-r px-4 py-5">
      <div className="flex items-center justify-between gap-2 px-1">
        <Wordmark />
        <button
          type="button"
          data-action="collapse"
          aria-label="Collapse the sidebar"
          title="Collapse the sidebar"
          className="text-muted hover:bg-sunken hover:text-ink grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors"
        >
          <Icon name="chevron-left" size={16} />
        </button>
      </div>

      <nav aria-label="Sections" className="mt-6 min-h-0 flex-1">
        {GROUPS.map((group) => (
          <section key={group.id} className="mt-5 first:mt-0">
            <h2 className="text-muted m-0 px-2 pb-2 text-[10.5px] font-bold tracking-[0.1em] uppercase">
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
                      'relative flex h-10 w-full items-center gap-2.5 rounded-[9px] px-3 text-[13px] font-semibold transition-colors duration-150',
                      !tab.live && 'text-muted cursor-not-allowed',
                      tab.live && active === tab.id && 'bg-accent-faint text-accent-deep',
                      tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                    )}
                  >
                    {tab.live && active === tab.id ? (
                      <span className="bg-accent-deep absolute top-2 bottom-2 left-0 w-[3px] rounded-full" />
                    ) : null}
                    <Icon name={GLYPH[tab.id]} size={17} />
                    <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
                    {tab.count ? (
                      <span className="bg-sunken text-muted rounded-full px-1.5 py-[1px] text-[10.5px] font-bold">
                        {tab.count}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <button
          type="button"
          data-action="logout"
          className="text-body hover:bg-sunken hover:text-ink mt-0.5 flex h-10 w-full items-center gap-2.5 rounded-[9px] px-3 text-[13px] font-semibold transition-colors"
        >
          <Icon name="logout" size={17} />
          Log out
        </button>
      </nav>

      {/*
        The reference's upgrade panel. Its button goes nowhere in the picture;
        here it switches the account to Pro and can be switched back.
      */}
      <section
        data-card="upgrade"
        className="bg-accent-deep relative mt-4 shrink-0 overflow-hidden rounded-[12px] p-3.5"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 200 120"
          className="pointer-events-none absolute -top-8 -right-6 h-[120px] w-[200px]"
        >
          <circle cx="150" cy="40" r="46" fill="#ffffff" opacity="0.1" />
          <circle cx="186" cy="88" r="30" fill="#ffffff" opacity="0.08" />
        </svg>

        <p className="relative m-0 flex items-center gap-1.5 text-[13px] font-bold text-white">
          {pro ? 'Pro is on' : 'Upgrade Pro!'}
          <Icon name="trophy" size={15} className="text-accent-soft" />
        </p>
        <p className="relative m-0 mt-1 text-[11px] leading-[15px] text-white/80">
          {pro
            ? 'Unlimited wallets, instant transfers and priority support.'
            : 'Higher productivity with better organization'}
        </p>
        <button
          type="button"
          data-action="pro"
          onClick={onPro}
          className={cx(
            'relative mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-[9px] text-[13px] font-bold transition-colors',
            pro
              ? 'bg-white/15 text-white hover:bg-white/25'
              : 'text-accent-deep bg-white hover:bg-white/85',
          )}
        >
          <Icon name="crown" size={15} />
          {pro ? 'Pro active' : 'Upgrade'}
        </button>
      </section>
    </aside>
  );
}
