/**
 * The nav, and which of it is real (rule 1).
 *
 * This design has the longest sidebar in the batch — ten destinations — so
 * three live leaves seven inert. They stay, because a sidebar with three items
 * in it is a different design from the one in the picture, and two of them
 * carry a count badge that has to keep reading as unseen work.
 */
export type TabId =
  | 'dashboard'
  | 'payments'
  | 'transactions'
  | 'invoices'
  | 'cards'
  | 'plans'
  | 'investments'
  | 'inbox'
  | 'promos'
  | 'insights';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  /** The reference puts a chevron on Payments and a count on Inbox. */
  expandable?: boolean;
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'payments', label: 'Payments', live: false, expandable: true },
  { id: 'transactions', label: 'Transactions', live: true },
  { id: 'invoices', label: 'Invoices', live: false },
  { id: 'cards', label: 'Cards', live: false },
  { id: 'plans', label: 'Saving Plans', live: true },
  { id: 'investments', label: 'Investments', live: false },
  { id: 'inbox', label: 'Inbox', live: false, count: 99 },
  { id: 'promos', label: 'Promos', live: false },
  { id: 'insights', label: 'Insights', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
