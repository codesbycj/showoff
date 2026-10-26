import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Avatar, Badge } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon, Wordmark } from '@/components/Icon';
import { CLIENTS, MATTERS, TEAM, clientOf, personOf } from '@/data/deck';
import { cx } from '@/lib/cx';
import { TABS, type TabId } from '@/nav';

/**
 * The header. Rule 1 lives in the middle of it.
 *
 * Team and Company stay in the bar and are inert: muted, `aria-disabled`,
 * skipped by the keyboard, not-allowed under the pointer, and a click does
 * nothing at all. The active entry keeps the reference's teal underline.
 */
export function TopBar({
  active,
  onSelect,
  onOpenMatter,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  onOpenMatter: (id: string) => void;
}) {
  const [panel, setPanel] = useState<'find' | 'mail' | null>(null);
  const [read, setRead] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panel) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanel(null);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel]);

  return (
    <header className="border-line flex h-[72px] shrink-0 items-center gap-6 border-b px-7">
      <Wordmark />

      <nav aria-label="Sections" className="min-w-0 flex-1">
        <ul className="m-0 flex list-none items-center justify-center gap-7 p-0">
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
                  'relative flex h-[46px] items-center px-1 text-[14px] font-semibold transition-colors duration-150',
                  !tab.live && 'text-muted cursor-not-allowed opacity-70',
                  tab.live && active === tab.id && 'text-accent-deep',
                  tab.live && active !== tab.id && 'text-body hover:text-ink',
                )}
              >
                {tab.label}
                {active === tab.id ? (
                  <span className="bg-accent-deep absolute right-0 -bottom-[1px] left-0 h-[3px] rounded-full" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div ref={root} className="relative flex shrink-0 items-center gap-2">
        <IconButton
          icon="search"
          label="Find a matter or client"
          name="find"
          active={panel === 'find'}
          onClick={() => setPanel(panel === 'find' ? null : 'find')}
        />

        <button
          type="button"
          data-action="alerts"
          onClick={() => setRead((v) => !v)}
          aria-label={read ? 'No unread alerts' : '4 unread alerts, mark read'}
          title={read ? 'No unread alerts' : '4 unread alerts'}
          className="border-line text-body hover:bg-sunken hover:text-ink relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors"
        >
          <Icon name="bell" size={18} />
          {read ? null : (
            <span className="bg-danger ring-surface absolute top-2 right-2.5 h-2 w-2 rounded-full ring-2" />
          )}
        </button>

        <IconButton
          icon="mail"
          label="Messages"
          name="mail"
          active={panel === 'mail'}
          onClick={() => setPanel(panel === 'mail' ? null : 'mail')}
        />

        <Avatar src={TEAM[0].face} name={TEAM[0].name} size={40} className="ml-1" />

        {panel === 'find' ? (
          <FindPanel onOpenMatter={onOpenMatter} onDone={() => setPanel(null)} />
        ) : null}
        {panel === 'mail' ? <MailPanel /> : null}
      </div>
    </header>
  );
}

/** Quick find over the matters and the clients, from the header's search. */
function FindPanel({
  onOpenMatter,
  onDone,
}: {
  onOpenMatter: (id: string) => void;
  onDone: () => void;
}) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const matters = q
    ? MATTERS.filter((m) =>
        (m.title + ' ' + clientOf(m.clientId).name + ' ' + m.type).toLowerCase().includes(q),
      ).slice(0, 6)
    : [];
  const clients = q
    ? CLIENTS.filter((c) => (c.name + ' ' + c.sector).toLowerCase().includes(q)).slice(0, 3)
    : [];

  return (
    <Panel label="Find">
      <div className="border-line flex h-10 items-center border-b px-3">
        <Icon name="search" size={16} className="text-muted mr-2.5 shrink-0" />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Matter, client or type"
          aria-label="Find a matter or client"
          data-search="find"
          className="placeholder:text-muted h-full min-w-0 flex-1 border-0 bg-transparent text-[13px] outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
      </div>

      <div className="max-h-[320px] overflow-y-auto p-1">
        {!q ? (
          <p className="text-muted m-0 px-3 py-4 text-center text-[12.5px]">
            Type to search {MATTERS.length} matters and {CLIENTS.length} clients.
          </p>
        ) : matters.length + clients.length === 0 ? (
          <p className="text-muted m-0 px-3 py-4 text-center text-[12.5px]">
            Nothing matches <span className="text-ink font-semibold">{query}</span>.
          </p>
        ) : (
          <ul role="listbox" aria-label="Results" className="m-0 list-none p-0">
            {matters.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  data-find={m.id}
                  onClick={() => {
                    onOpenMatter(m.id);
                    onDone();
                  }}
                  className="hover:bg-sunken flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                >
                  <span className="bg-accent-faint text-accent-deep grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                    <Icon name="file" size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[12.5px] font-semibold">
                      {m.title}
                    </span>
                    <span className="text-muted block truncate text-[11px]">
                      {clientOf(m.clientId).name}
                    </span>
                  </span>
                  <Badge tone="quiet">{m.type}</Badge>
                </button>
              </li>
            ))}
            {clients.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  data-find={c.id}
                  onClick={onDone}
                  className="hover:bg-sunken flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                >
                  <span className="bg-sunken text-body grid h-7 w-7 shrink-0 place-items-center rounded-lg">
                    <Icon name="briefcase" size={14} />
                  </span>
                  <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                    {c.name}
                  </span>
                  <span className="text-muted shrink-0 text-[11px]">{c.sector}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}

/** The envelope's three messages. */
function MailPanel() {
  const notes = [
    { id: 'n1', from: 'p2', text: 'Gare Street licence — the council came back with two queries.' },
    { id: 'n2', from: 'p4', text: 'Subcontractor dispute: witness statement attached for review.' },
    { id: 'n3', from: 'p5', text: 'Environmental reporting closed out; invoice raised.' },
  ];
  return (
    <Panel label="Messages">
      <ul className="m-0 list-none p-1">
        {notes.map((n) => {
          const person = personOf(n.from);
          return (
            <li key={n.id} className="flex items-start gap-3 rounded-lg px-3 py-2.5">
              <Avatar src={person.face} name={person.name} size={30} />
              <span className="min-w-0 flex-1">
                <span className="text-ink block text-[12.5px] font-semibold">{person.name}</span>
                <span className="text-body mt-0.5 block text-[12px] leading-[17px]">{n.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function Panel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      data-panel={label.toLowerCase()}
      aria-label={label}
      className="border-line bg-surface absolute top-[calc(100%+10px)] right-0 z-40 w-[360px] overflow-hidden rounded-2xl border shadow-[0_24px_50px_-20px_rgb(16_39_44/0.35)]"
    >
      {children}
    </div>
  );
}

/** The page head the reference draws over the cards: a title and one action. */
export function PageHead({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 pb-4">
      <h1 className="text-ink m-0 text-[28px] leading-none font-bold tracking-[-0.03em]">
        {title}
      </h1>
      {action}
    </div>
  );
}
