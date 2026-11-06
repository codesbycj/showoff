import type { ReactNode } from 'react';

import { Avatar } from '@/components/Bits';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { DRIVERS, OPERATOR } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  shipments: 'grid',
  build: 'truck',
  tracking: 'pie',
  reports: 'clipboard',
  clients: 'user',
  settings: 'settings',
};

/**
 * The icon rail — the reference's own nav, and where rule 1 lives.
 *
 * Three are live. Reports, Clients and Settings stay and are genuinely inert:
 * muted, `aria-disabled`, skipped by the keyboard, not-allowed under the
 * pointer, and a click does nothing.
 */
export function Rail({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <nav
      aria-label="Sections"
      className="border-line bg-surface flex w-[76px] shrink-0 flex-col items-center gap-1 border-r py-5"
    >
      <div className="mb-4">
        <Wordmark compact />
      </div>

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
                !tab.live && 'text-muted/50 cursor-not-allowed',
                tab.live && active === tab.id && 'bg-accent-faint text-accent-deep',
                tab.live && active !== tab.id && 'text-muted hover:bg-sunken hover:text-ink',
              )}
            >
              <Icon name={GLYPH[tab.id]} size={19} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <Avatar src={DRIVERS[1].face} name="Planner" size={36} />
      </div>
    </nav>
  );
}

/**
 * The page head: the reference's back chevron, the title, and the two
 * buttons that decide what happens to the shipment.
 */
export function PageHead({
  title,
  note,
  back,
  action,
}: {
  title: string;
  note?: string;
  back?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 pb-4">
      <div className="flex min-w-0 items-center gap-2.5">
        {back ? (
          <span
            aria-hidden="true"
            className="border-line text-muted grid h-9 w-9 shrink-0 place-items-center rounded-full border"
          >
            <Icon name="chevron-left" size={16} />
          </span>
        ) : null}
        <div className="min-w-0">
          <h1 className="text-ink m-0 truncate text-[22px] leading-none font-bold tracking-[-0.025em]">
            {title}
          </h1>
          <p className="text-muted m-0 mt-1.5 truncate text-[12px]">
            {note ?? `${OPERATOR.desk} · ${OPERATOR.today}`}
          </p>
        </div>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
