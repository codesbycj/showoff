import { Avatar } from '@/components/Bits';
import { Button, IconButton } from '@/components/Controls';
import { Icon, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  home: 'home',
  inbox: 'inbox',
  statements: 'statement',
  accounts: 'accounts',
  metrics: 'metrics',
  budgeting: 'budget',
  tax: 'tax',
  settings: 'settings',
  help: 'help',
};

const GROUPS: { id: 'general' | 'master' | 'support'; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'master', label: 'Master' },
  { id: 'support', label: 'Support' },
];

/**
 * Rule 1, in one component.
 *
 * Six of the nine are inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all. The 12 on
 * Inbox stays, because it is part of the picture.
 */
export function Sidebar({ active, onSelect }: { active: TabId; onSelect: (id: TabId) => void }) {
  return (
    <aside className="border-line bg-surface flex w-[246px] shrink-0 flex-col border-r px-3.5 py-4">
      <Wordmark />

      <button
        type="button"
        data-action="workspace"
        className="border-line hover:bg-sunken mt-4 flex shrink-0 items-center gap-2.5 rounded-[10px] border p-2.5 text-left transition-colors"
      >
        <span className="bg-sunken text-accent-deep grid h-8 w-8 shrink-0 place-items-center rounded-[8px]">
          <Icon name="building" size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[12.5px] font-bold">
            {ACCOUNT.workspace}
          </span>
          <span className="text-muted block truncate text-[10.5px]">{ACCOUNT.plan}</span>
        </span>
        <Icon name="chevron-down" size={14} className="text-muted shrink-0" />
      </button>

      <nav aria-label="Sections" className="mt-5 min-h-0 flex-1 overflow-hidden">
        {GROUPS.map((group) => (
          <section key={group.id} className="mt-4 first:mt-0">
            <h2 className="text-muted m-0 flex items-center justify-between px-2 pb-1.5 text-[10px] font-bold tracking-[0.12em] uppercase">
              {group.label}
              <Icon name="dots" size={13} className="opacity-60" />
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
                      'flex h-9 w-full items-center gap-2.5 rounded-[8px] px-2.5 text-[12.5px] font-semibold transition-colors duration-150',
                      !tab.live && 'text-muted cursor-not-allowed',
                      tab.live && active === tab.id && 'bg-accent-faint text-accent-deep',
                      tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                    )}
                  >
                    <Icon name={GLYPH[tab.id]} size={16} />
                    <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
                    {tab.count ? (
                      <span className="bg-sunken text-muted rounded-full px-1.5 py-[1px] text-[10px] font-bold">
                        {tab.count}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <div className="border-line mt-3 shrink-0 border-t pt-3">
        <button
          type="button"
          data-action="account"
          className="hover:bg-sunken flex w-full items-center gap-2.5 rounded-[10px] p-2 text-left transition-colors"
        >
          <Avatar src={FACES[0]} name={ACCOUNT.holder} size={32} />
          <span className="min-w-0 flex-1">
            <span className="text-ink block truncate text-[12px] font-bold">{ACCOUNT.holder}</span>
            <span className="text-muted block truncate text-[10.5px]">{ACCOUNT.email}</span>
          </span>
          <Icon name="chevron-down" size={14} className="text-muted shrink-0" />
        </button>
        <button
          type="button"
          data-action="logout"
          className="text-body hover:bg-sunken hover:text-ink mt-0.5 flex h-9 w-full items-center gap-2.5 rounded-[8px] px-2.5 text-[12.5px] font-semibold transition-colors"
        >
          <Icon name="logout" size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

/** The breadcrumb bar, with the edit note, the avatar and Share. */
export function TopBar({
  tab,
  shared,
  onShare,
}: {
  tab: TabId;
  shared: boolean;
  onShare: () => void;
}) {
  const label = TABS.find((t) => t.id === tab)?.label ?? '';
  return (
    <header className="border-line flex h-[52px] shrink-0 items-center gap-3 border-b px-5">
      <IconButton icon="collapse" label="Collapse the sidebar" size={32} />
      <p className="text-muted m-0 flex items-center gap-1.5 text-[12.5px]">
        {ACCOUNT.workspace}
        <span aria-hidden="true">/</span>
        <span className="text-ink font-semibold">{label}</span>
      </p>

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <span className="text-muted text-[11.5px]">{ACCOUNT.edited}</span>
        <Avatar src={FACES[1]} name={ACCOUNT.holder} size={28} />
        <Button
          icon={shared ? 'check' : 'share'}
          variant={shared ? 'accent' : 'outline'}
          name="share"
          onClick={onShare}
        >
          {shared ? 'Link copied' : 'Share'}
        </Button>
      </div>
    </header>
  );
}

/** The green upgrade banner. Dismissible, as the reference's × implies. */
export function Banner({
  taken,
  onTake,
  onDismiss,
}: {
  taken: boolean;
  onTake: () => void;
  onDismiss: () => void;
}) {
  return (
    <div
      data-card="banner"
      className="bg-accent-faint flex h-11 shrink-0 items-center gap-3 rounded-[10px] px-4"
    >
      <p className="text-accent-deep m-0 min-w-0 flex-1 truncate text-[12.5px] font-semibold">
        {taken
          ? 'Thanks — your workspace is on the complete plan.'
          : 'Upgrade now and enjoy a more complete experience!'}
      </p>
      <Button variant="accent" name="upgrade" onClick={onTake} className="h-8 shrink-0 px-3">
        {taken ? 'Upgraded' : 'Upgrade'}
      </Button>
      <button
        type="button"
        data-action="dismiss"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="text-accent-deep hover:bg-accent-soft grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors"
      >
        <Icon name="close" size={14} />
      </button>
    </div>
  );
}
