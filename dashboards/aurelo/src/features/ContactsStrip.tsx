import { useRef, useState } from 'react';

import { Avatar, Card } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { CONTACTS_BEHIND, CONTACT_SEED } from '@/data/deck';
import { FACES } from '@/data/faces';
import { cx } from '@/lib/cx';

/**
 * The row of portraits beside the greeting.
 *
 * The reference draws a chevron at the end of the row with nothing behind it.
 * Here it scrolls the row, and selecting someone names them underneath — the
 * strip is the only place on this pane where the people in the ledger have a
 * face, so leaving it inert would waste it.
 *
 * The "Send money" chip at the end is not decoration either. Six portraits and
 * an overflow disc fitted the track exactly, so the chevron had nothing to
 * scroll and its second press changed zero pixels — the chip is what makes the
 * row longer than its container, and it is also the one place on this pane
 * that opens the Wallet.
 */
export function ContactsStrip({
  selected,
  onSelect,
  onSend,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
  /** The pane decides where "Send money" goes (rule 4). */
  onSend: () => void;
}) {
  const row = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const current = CONTACT_SEED.find((c) => c.id === selected);

  const page = () => {
    const el = row.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = atEnd ? 0 : Math.min(max, el.scrollLeft + el.clientWidth * 0.7);
    el.scrollTo({ left: next });
    setAtEnd(next >= max - 2);
  };

  return (
    <Card pane="contacts" className="justify-center px-5 py-4">
      <div className="flex items-center gap-3">
        <div ref={row} data-scroller="contacts" className="scroll-row flex min-w-0 flex-1 gap-3">
          {CONTACT_SEED.map((c, i) => (
            <button
              key={c.id}
              type="button"
              data-contact={c.id}
              aria-pressed={selected === c.id}
              title={c.name}
              onClick={() => onSelect(selected === c.id ? null : c.id)}
              className="shrink-0 rounded-full transition-transform duration-150 hover:-translate-y-0.5"
            >
              <Avatar
                src={FACES[i % FACES.length]}
                name={c.name}
                size={52}
                className={cx(
                  'ring-2 transition-[box-shadow]',
                  selected === c.id ? 'ring-accent' : 'ring-white',
                )}
              />
            </button>
          ))}

          <span className="bg-sunken text-body grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full text-[13px] font-bold">
            +{CONTACTS_BEHIND}
          </span>

          <button
            type="button"
            data-action="send-money"
            onClick={onSend}
            className="bg-accent-faint text-accent-deep hover:bg-accent flex h-[52px] shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-bold transition-colors hover:text-white"
          >
            <Icon name="send" size={16} />
            Send money
          </button>
        </div>

        <IconButton
          icon={atEnd ? 'chevron-left' : 'chevron-right'}
          label={atEnd ? 'Back to the start' : 'More people'}
          tone="sunken"
          size={44}
          onClick={page}
        />
      </div>

      {current ? (
        <p data-contact-note className="text-muted m-0 mt-3 truncate text-[12.5px]">
          <span className="text-ink font-semibold">{current.name}</span> · {current.note}
        </p>
      ) : null}
    </Card>
  );
}
