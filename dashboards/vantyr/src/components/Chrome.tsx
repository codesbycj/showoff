import type { ReactNode } from 'react';

import { Avatar } from '@/components/Bits';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT, FACES } from '@/data/deck';
import { cx } from '@/lib/cx';
import { SIDE_LINKS, TABS, type TabId } from '@/nav';

const SIDE_GLYPH: Record<string, IconName> = {
  dashboard: 'grid',
  documents: 'doc',
  deals: 'deals',
  community: 'community',
  insights: 'insights',
  knowledge: 'book',
};

/**
 * The sidebar, exactly as the picture draws it — and entirely inert.
 *
 * Rule 1 lives in the top pills (three live); everything here is muted,
 * `aria-disabled`, skipped by the keyboard, not-allowed under the pointer,
 * and a click does nothing. The counts stay, because they are part of the
 * picture; they simply do not open anything.
 */
export function Sidebar() {
  return (
    <aside className="border-line flex w-[224px] shrink-0 flex-col border-r px-4 py-5">
      <nav aria-label="Sections">
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {SIDE_LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                data-side={link.id}
                aria-disabled={true}
                aria-label={`${link.label} (not available)`}
                title={`${link.label} — not available`}
                tabIndex={-1}
                className="text-muted flex h-10 w-full cursor-not-allowed items-center gap-2.5 rounded-[10px] px-3 text-[13px] font-semibold opacity-80"
              >
                <Icon name={SIDE_GLYPH[link.id]} size={17} />
                <span className="min-w-0 flex-1 truncate text-left">{link.label}</span>
                {link.count ? (
                  <span className="bg-sunken text-muted rounded-full px-1.5 text-[10.5px] font-bold">
                    {link.count}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        {/* The reference's cream invite card. It is furniture, so it is inert
            like the rest of the rail. */}
        <div className="bg-cream rounded-[14px] p-4">
          <p className="text-ink m-0 text-[13px] leading-[18px] font-bold">
            You have 3 new invites
          </p>
          <p className="text-muted m-0 mt-1 text-[11.5px] leading-[16px]">
            Use them wisely — each one adds a member to your syndicate.
          </p>
          <button
            type="button"
            data-side="invite"
            aria-disabled={true}
            aria-label="Invite a friend (not available)"
            title="Invite a friend — not available"
            tabIndex={-1}
            className="bg-cream-deep text-ink mt-3 flex h-9 w-full cursor-not-allowed items-center justify-center gap-1.5 rounded-full text-[12.5px] font-bold"
          >
            <Icon name="plus" size={14} />
            Invite a friend
          </button>
        </div>

        <button
          type="button"
          data-side="help"
          aria-disabled={true}
          aria-label="Help (not available)"
          title="Help — not available"
          tabIndex={-1}
          className="bg-ink text-surface mt-3 flex h-10 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full text-[12.5px] font-bold"
        >
          <Icon name="help" size={15} />
          Help
        </button>
      </div>
    </aside>
  );
}

/** The header: the wordmark, the three live pills, and the account controls. */
export function TopBar({
  active,
  onSelect,
  mail,
  onMail,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  mail: number;
  onMail: () => void;
}) {
  return (
    <header className="flex h-[72px] shrink-0 items-center gap-6 px-6">
      <Wordmark />

      <nav aria-label="Views" className="flex min-w-0 flex-1 justify-center">
        <ul className="bg-sunken m-0 flex list-none items-center gap-1 rounded-full p-1">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                data-tab={tab.id}
                data-live={tab.live}
                aria-current={active === tab.id ? 'page' : undefined}
                onClick={() => onSelect(tab.id)}
                className={cx(
                  'flex h-9 items-center rounded-full px-5 text-[13px] font-bold transition-colors duration-150',
                  active === tab.id ? 'bg-ink text-surface' : 'text-muted hover:text-ink',
                )}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          data-action="mail"
          onClick={onMail}
          aria-label={mail ? `${mail} unread updates, mark read` : 'No unread updates'}
          title={mail ? `${mail} unread` : 'No unread updates'}
          className="border-line text-body hover:text-ink relative grid h-10 w-10 place-items-center rounded-full border transition-colors"
        >
          <Icon name="mail" size={17} />
          {mail ? (
            <span className="bg-danger ring-surface absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2" />
          ) : null}
        </button>

        {(['settings', 'logout'] as IconName[]).map((icon) => (
          <button
            key={icon}
            type="button"
            data-site={icon}
            aria-disabled={true}
            aria-label={`${icon} (not available)`}
            title={`${icon} — not available`}
            tabIndex={-1}
            className="border-line text-muted/70 grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border"
          >
            <Icon name={icon} size={17} />
          </button>
        ))}

        <Avatar src={FACES[0]} name={ACCOUNT.holder} size={40} className="ml-1" />
      </div>
    </header>
  );
}

/** The page head over each pane, with the valuation date the category needs. */
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
        <h1 className="text-ink m-0 text-[24px] leading-none font-extrabold tracking-[-0.03em]">
          {title}
        </h1>
        <p className="text-muted m-0 mt-2 flex items-center gap-1.5 text-[12.5px]">
          <Icon name="calendar" size={14} />
          {subtitle} · valued as of {ACCOUNT.valuedOn}
        </p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2.5">{action}</div> : null}
    </div>
  );
}
