import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  dashboard: 'grid',
  payments: 'send',
  transactions: 'exchange',
  invoices: 'invoice',
  cards: 'card',
  plans: 'piggy',
  investments: 'diamond',
  inbox: 'mail',
  promos: 'tag',
  insights: 'bulb',
};

/**
 * Rule 1, in one component — as the reference's ten-item sidebar.
 *
 * Seven of the ten are inert: dimmed to the design's own muted token,
 * `aria-disabled`, skipped by the keyboard, not-allowed under the pointer, and
 * a click does nothing at all. The chevron on Payments and the 99 on Inbox
 * stay, because they are part of the picture — they just do not open anything.
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
    <aside className="bg-accent-faint flex w-[228px] shrink-0 flex-col px-4 py-5">
      <div className="px-2">
        <Wordmark />
      </div>

      <nav aria-label="Sections" className="mt-6 min-h-0 flex-1">
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
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
                  'flex h-10 w-full items-center gap-2.5 rounded-[10px] px-3 text-[13px] font-semibold transition-colors duration-150',
                  !tab.live && 'text-muted cursor-not-allowed',
                  tab.live && active === tab.id && 'bg-accent text-forest-deep',
                  tab.live && active !== tab.id && 'text-body hover:bg-accent-soft hover:text-ink',
                )}
              >
                <Icon name={GLYPH[tab.id]} size={17} />
                <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
                {tab.count ? (
                  <span className="bg-danger rounded-full px-1.5 py-[1px] text-[10.5px] font-bold text-white">
                    {tab.count}
                  </span>
                ) : null}
                {tab.expandable ? (
                  <Icon name="chevron-down" size={13} strokeWidth={2.2} className="opacity-70" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/*
        The reference's promo panel. Its button goes nowhere in the picture;
        here it switches the account to Pro and can be switched back, because a
        primary button that does nothing is the most conspicuous dead control
        on a page.
      */}
      <section
        data-card="pro"
        className="bg-forest relative mt-4 shrink-0 overflow-hidden rounded-[var(--radius-card)] p-4"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 200 120"
          className="pointer-events-none absolute -top-6 -right-8 h-[120px] w-[200px]"
        >
          <circle cx="150" cy="40" r="46" fill="var(--color-accent)" opacity="0.14" />
          <circle cx="186" cy="84" r="30" fill="var(--color-accent)" opacity="0.1" />
        </svg>

        <span className="bg-accent text-forest-deep relative grid h-9 w-9 place-items-center rounded-[10px]">
          <Icon name="lock" size={17} />
        </span>
        <p className="text-forest-fg relative m-0 mt-3 text-[12px] leading-[17px]">
          {pro
            ? 'Pro is on. Detailed analytics and graphs are unlocked.'
            : 'Gain full access to your finances with detailed analytics and graphs'}
        </p>
        <button
          type="button"
          data-action="pro"
          onClick={onPro}
          className={cx(
            'relative mt-3 h-9 w-full rounded-[10px] text-[13px] font-bold transition-colors',
            pro
              ? 'text-forest-fg bg-white/15 hover:bg-white/25'
              : 'bg-accent text-forest-deep hover:bg-accent-soft',
          )}
        >
          {pro ? 'Pro active' : 'Get Pro'}
        </button>
      </section>
    </aside>
  );
}
