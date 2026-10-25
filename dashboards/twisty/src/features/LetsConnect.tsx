import { useState } from 'react';

import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { CardHead, SeeAll } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { CONNECTIONS, type Person } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * Suggested connections.
 *
 * It sits on the page's own ground rather than on a card, which is what the
 * reference does: the heading is outside, and each person is their own bordered
 * row. The "+" is a real toggle -- it becomes a tick and the row says Requested,
 * and it can be undone.
 */
export function LetsConnect() {
  const [requested, setRequested] = useState<string[]>([]);

  const toggle = (id: string) =>
    setRequested((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div data-card="connect" className="flex min-h-0 min-w-0 flex-col">
      <CardHead title="Let's Connect" action={<SeeAll>See all</SeeAll>} className="px-1 pb-3" />

      <div data-scroller="connect" className="scroll-region -mr-2 min-h-0 flex-1 pr-2">
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {CONNECTIONS.map((person) => (
            <li key={person.id}>
              <PersonRow
                person={person}
                requested={requested.includes(person.id)}
                onToggle={() => toggle(person.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PersonRow({
  person,
  requested,
  onToggle,
}: {
  person: Person;
  requested: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-person={person.id}
      className="border-line bg-surface/70 hover:bg-surface flex items-center gap-3 rounded-[20px] border py-2.5 pr-2.5 pl-3 transition-colors"
    >
      <Avatar src={person.face} name={person.name} size={40} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-ink m-0 truncate text-[13.5px] font-semibold">{person.name}</p>
          <Badge tone={person.seniority === 'Senior' ? 'accent' : 'spark'}>
            {person.seniority}
          </Badge>
        </div>
        <p className="text-muted m-0 mt-0.5 truncate text-[12.5px]">
          {requested ? 'Request sent' : person.role}
        </p>
      </div>
      <button
        type="button"
        data-connect={person.id}
        onClick={onToggle}
        aria-pressed={requested}
        aria-label={(requested ? 'Cancel request to ' : 'Connect with ') + person.name}
        className={cx(
          'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-150',
          requested
            ? 'bg-ink hover:bg-ink/85 text-white'
            : 'bg-surface text-ink hover:bg-sunken shadow-[0_0_0_1px_var(--color-line)]',
        )}
      >
        <Icon name={requested ? 'check' : 'plus'} size={16} />
      </button>
    </div>
  );
}
