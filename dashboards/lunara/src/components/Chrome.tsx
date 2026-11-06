import type { ReactNode } from 'react';

import { Avatar } from '@/components/Bits';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import face from '@/assets/img/face-1.jpg';
import { ACCOUNT } from '@/data/deck';
import { cx } from '@/lib/cx';
import { SITE_LINKS, TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  overview: 'grid',
  markets: 'chart',
  activity: 'activity',
  earn: 'coins',
  alerts: 'bell',
  settings: 'settings',
};

/**
 * The left rail — the app's own nav, and where rule 1 lives.
 *
 * Three live; Earn, Price alerts and Settings stay and are genuinely inert:
 * muted, `aria-disabled`, skipped by the keyboard, not-allowed under the
 * pointer, and a click does nothing.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav aria-label="Sections" className="flex w-[76px] shrink-0 flex-col items-center gap-2 py-5">
      <ul className="m-0 flex list-none flex-col items-center gap-2 p-0">
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
                'grid h-11 w-11 place-items-center rounded-[14px] transition-colors duration-150',
                !tab.live && 'text-muted/60 cursor-not-allowed',
                tab.live && active === tab.id && 'bg-accent text-accent-fg',
                tab.live && active !== tab.id && 'text-body hover:bg-surface hover:text-ink',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={19} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The header: the wordmark, the picture's five site links — all inert — and
 * the account controls.
 */
export function TopBar({ alerts, onAlerts }: { alerts: number; onAlerts: () => void }) {
  return (
    <header className="border-line flex h-[72px] shrink-0 items-center gap-8 border-b px-7">
      <Wordmark />

      <nav aria-label="Site" className="min-w-0 flex-1">
        <ul className="m-0 flex list-none items-center gap-7 p-0">
          {SITE_LINKS.map((label) => (
            <li key={label}>
              <button
                type="button"
                data-site={label.toLowerCase()}
                aria-disabled={true}
                aria-label={`${label} (not available)`}
                title={`${label} — not available`}
                tabIndex={-1}
                className="text-muted flex h-8 cursor-not-allowed items-center text-[13.5px] font-semibold"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-2.5">
        <HeaderButton icon="wallet" label="Wallets" />
        <HeaderButton icon="swap" label="Swap" />
        <button
          type="button"
          data-action="alerts"
          onClick={onAlerts}
          aria-label={alerts ? `${alerts} price alerts, mark read` : 'No price alerts'}
          title={alerts ? `${alerts} price alerts` : 'No price alerts'}
          className="border-line bg-surface text-body hover:text-ink relative grid h-10 w-10 place-items-center rounded-full border transition-colors"
        >
          <Icon name="bell" size={17} />
          {alerts ? (
            <span className="bg-danger ring-surface absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2" />
          ) : null}
        </button>
        <Avatar src={face} name={ACCOUNT.holder} size={38} />
      </div>
    </header>
  );
}

/** One of the header's round controls. Inert by design — the two that are
    live on this build are the bell and the account. */
function HeaderButton({ icon, label }: { icon: IconName; label: string }) {
  return (
    <button
      type="button"
      data-site={label.toLowerCase()}
      aria-disabled={true}
      aria-label={`${label} (not available)`}
      title={`${label} — not available`}
      tabIndex={-1}
      className="border-line text-muted/70 grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border"
    >
      <Icon name={icon} size={17} />
    </button>
  );
}

/** The page head the reference draws over the cards. */
export function PageHead({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-start justify-between gap-4 pb-4">
      <div className="min-w-0">
        <h1 className="text-ink m-0 text-[25px] leading-none font-extrabold tracking-[-0.035em]">
          {title}
        </h1>
        {subtitle ? <p className="text-muted m-0 mt-2 text-[13px]">{subtitle}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
