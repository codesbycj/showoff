import type { ReactNode } from 'react';

import { Avatar } from '@/components/Bits';
import { Icon, Wordmark } from '@/components/Icon';
import { TEAM } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The header, and rule 1 with it.
 *
 * The reference puts the nav in a pill at the centre of the bar with the
 * active entry as a dark capsule. Workflows and Reports stay in that pill and
 * are genuinely inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export function TopBar({
  active,
  onSelect,
  messages,
  onMessages,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  messages: number;
  onMessages: () => void;
}) {
  return (
    <header className="flex h-[76px] shrink-0 items-center gap-6 px-7">
      <Wordmark />

      <nav aria-label="Sections" className="flex min-w-0 flex-1 justify-center">
        <ul className="bg-surface border-line m-0 flex list-none items-center gap-1 rounded-full border p-1 shadow-[var(--shadow-card)]">
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
                  'flex h-10 items-center rounded-full px-5 text-[13.5px] font-semibold transition-colors duration-150',
                  !tab.live && 'text-muted cursor-not-allowed opacity-70',
                  tab.live && active === tab.id && 'bg-ink-fill text-ink-fg',
                  tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          data-action="messages"
          onClick={onMessages}
          aria-label={messages ? `${messages} unread messages, mark read` : 'No unread messages'}
          title={messages ? `${messages} unread` : 'No unread messages'}
          className="border-line bg-surface text-body hover:text-ink relative grid h-11 w-11 place-items-center rounded-full border transition-colors"
        >
          <Icon name="chat" size={18} />
          {messages ? (
            <span className="bg-accent-deep ring-surface absolute top-2.5 right-2.5 h-2 w-2 rounded-full ring-2" />
          ) : null}
        </button>

        <button
          type="button"
          data-site="notifications"
          aria-disabled={true}
          aria-label="Notifications (not available)"
          title="Notifications — not available"
          tabIndex={-1}
          className="border-line text-muted/70 grid h-11 w-11 cursor-not-allowed place-items-center rounded-full border"
        >
          <Icon name="bell" size={18} />
        </button>

        <Avatar src={TEAM[0].face} name={TEAM[0].name} size={42} />
      </div>
    </header>
  );
}

/** The page head over each pane. */
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
        <h1 className="text-ink m-0 text-[24px] leading-none font-bold tracking-[-0.03em]">
          {title}
        </h1>
        {subtitle ? <p className="text-muted m-0 mt-2 text-[13px]">{subtitle}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
