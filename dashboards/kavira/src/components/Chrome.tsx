import { Avatar } from '@/components/Bits';
import { Button, IconButton, SearchBox } from '@/components/Controls';
import { Icon, Wave, Wordmark, type IconName } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

const GLYPH: Record<TabId, IconName> = {
  overview: 'layers',
  legality: 'scroll',
  projection: 'projection',
  account: 'account',
  savings: 'piggy',
  emergency: 'shield',
};

const GROUPS: { id: 'home' | 'pocket'; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'pocket', label: 'Pocket' },
];

const PLACEHOLDER: Record<string, string> = {
  overview: 'Start searching here ...',
  projection: 'Search the projection',
  savings: 'Search the pots',
};

/** The app's own header. The reference's browser chrome is furniture and is dropped. */
export function TopBar({
  tab,
  query,
  onQuery,
  shared,
  onShare,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  shared: boolean;
  onShare: () => void;
}) {
  return (
    <header className="border-line bg-surface flex h-[68px] shrink-0 items-center gap-4 border-b px-5">
      <Wordmark />

      <SearchBox
        value={query}
        onChange={onQuery}
        placeholder={PLACEHOLDER[tab] ?? 'Search'}
        className="ml-6 w-[330px]"
      />

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <p className="border-line text-body m-0 flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-medium">
          <span className="bg-accent-faint text-accent-deep grid h-7 w-7 place-items-center rounded-full text-[12px] font-bold">
            19
          </span>
          {ACCOUNT.date}
          <Icon name="calendar" size={15} className="text-muted" />
        </p>

        <IconButton
          icon="share"
          label={shared ? 'Link copied' : 'Share this view'}
          tone="outline"
          size={40}
          active={shared}
          onClick={onShare}
        />

        <div className="flex items-center gap-2.5">
          <Avatar src={FACES[0]} name={ACCOUNT.holder} size={40} />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[12.5px] font-semibold">
              {ACCOUNT.holder}
            </span>
            <span className="text-muted block truncate text-[11px]">{ACCOUNT.role}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

/**
 * Rule 1, in one component.
 *
 * Three of the six are inert: muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing at all.
 */
export function Sidebar({
  active,
  onSelect,
  trial,
  onTrial,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  trial: boolean;
  onTrial: () => void;
}) {
  return (
    <aside className="border-line bg-surface flex w-[238px] shrink-0 flex-col border-r px-4 py-5">
      <p className="text-ink m-0 flex items-center gap-1.5 px-2 text-[15px] font-semibold">
        Hey, Need help?
        <span className="text-accent">
          <Wave size={18} />
        </span>
      </p>
      <p className="text-muted m-0 mt-0.5 px-2 text-[13px]">Just ask me anything!</p>

      <nav aria-label="Sections" className="mt-6 min-h-0 flex-1">
        {GROUPS.map((group) => (
          <section key={group.id} className="mt-5 first:mt-0">
            <h2 className="text-muted m-0 flex items-center justify-between px-2 pb-2 text-[10.5px] font-bold tracking-[0.12em] uppercase">
              {group.label}
              {group.id === 'pocket' ? (
                <span className="bg-accent grid h-4 w-4 place-items-center rounded-full text-white">
                  <Icon name="plus" size={10} strokeWidth={3} />
                </span>
              ) : null}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
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
                      'flex h-11 w-full items-center gap-2.5 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-150',
                      !tab.live && 'text-muted cursor-not-allowed',
                      tab.live && active === tab.id && 'bg-ink-fill text-ink-fg font-semibold',
                      tab.live && active !== tab.id && 'text-body hover:bg-sunken hover:text-ink',
                    )}
                  >
                    <Icon name={GLYPH[tab.id]} size={17} />
                    <span className="min-w-0 flex-1 truncate text-left">{tab.label}</span>
                    {tab.live && active === tab.id ? (
                      <span className="bg-accent h-2 w-2 shrink-0 rounded-full" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      {/*
        The reference's promo card, with a photograph of a person in it. A face
        is a picture, not an icon (rule 8), so this is a free-licensed portrait
        rather than a drawn figure — and the button works, because a primary
        action that goes nowhere is the most conspicuous dead control there is.
      */}
      <section
        data-card="trial"
        className="bg-sunken relative mt-4 shrink-0 overflow-hidden rounded-[var(--radius-card)] p-4"
      >
        <p className="text-ink relative m-0 max-w-[120px] text-[14px] leading-[19px] font-semibold">
          Unlock all features
        </p>
        <span className="bg-accent-deep absolute top-9 left-4 rounded-full px-2 py-[2px] text-[10px] font-bold text-white">
          40+ matrixs
        </span>

        <img
          src={FACES[3]}
          alt=""
          width={92}
          height={92}
          className="absolute -right-3 bottom-8 h-[92px] w-[92px] rounded-full object-cover"
        />

        <Button
          icon={trial ? 'check' : 'arrow-up-right'}
          variant={trial ? 'accent' : 'solid'}
          name="trial"
          onClick={onTrial}
          className="relative mt-14 w-full justify-center"
        >
          {trial ? 'Trial started' : '15 day free-trial'}
        </Button>
      </section>
    </aside>
  );
}
