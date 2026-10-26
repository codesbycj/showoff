import { Button, IconButton, SearchBox } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ACCOUNT } from '@/data/deck';
import type { TabId } from '@/nav';
import { TABS } from '@/nav';

const PLACEHOLDER: Record<string, string> = {
  overview: `Search anything in ${ACCOUNT.store}`,
  transactions: 'Search orders',
  customers: 'Search customers',
};

/**
 * The header: the section name with its chevron, the search, two round
 * controls and the primary action.
 *
 * "Add new product" goes nowhere in the reference. Here it confirms in place
 * and can be undone — a primary button that does nothing is the most
 * conspicuous dead control on a page.
 */
export function TopBar({
  tab,
  query,
  onQuery,
  added,
  onAdd,
  inbox,
  onInbox,
}: {
  tab: TabId;
  query: string;
  onQuery: (next: string) => void;
  added: boolean;
  onAdd: () => void;
  inbox: number;
  onInbox: () => void;
}) {
  const label = TABS.find((t) => t.id === tab)?.label ?? '';

  return (
    <header className="flex h-[52px] shrink-0 items-center gap-3">
      <p className="text-ink m-0 flex shrink-0 items-center gap-1.5 text-[17px] font-bold">
        {ACCOUNT.role}
        <Icon name="chevron-down" size={15} className="text-muted" strokeWidth={2.2} />
      </p>
      <span className="text-muted shrink-0 text-[12.5px]">· {label}</span>

      <SearchBox
        value={query}
        onChange={onQuery}
        placeholder={PLACEHOLDER[tab] ?? 'Search'}
        className="mx-auto w-[330px]"
      />

      <button
        type="button"
        data-action="inbox"
        onClick={onInbox}
        aria-label={inbox ? `${inbox} in the inbox, mark all read` : 'Inbox is clear'}
        title={inbox ? `${inbox} unread` : 'Inbox is clear'}
        className="border-line text-body hover:bg-sunken hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors"
      >
        <Icon name="inbox" size={17} />
        {inbox ? (
          <span className="bg-accent absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2 ring-white" />
        ) : null}
      </button>

      <IconButton icon="sliders" label="Display options" tone="outline" size={40} />

      <Button
        icon={added ? 'check' : 'plus'}
        variant={added ? 'accent' : 'forest'}
        name="add-product"
        onClick={onAdd}
        className="shrink-0"
      >
        {added ? 'Draft saved' : 'Add new product'}
      </Button>
    </header>
  );
}
