import { useState } from 'react';

import { Avatar, Card, CardHead } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon, ThumbsUp, Wave } from '@/components/Icon';
import { MESSAGES, workspace, type Message } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * The team chat.
 *
 * Sending really appends — a dashboard with a dead message box in it is the
 * most obvious dead control there is (rule 5). The two glyphs the reference
 * sends as emoji are drawn, because 👋 and 👍 render differently on Windows,
 * Android and iOS, and one of them in a different skin tone.
 */
export function TeamChat() {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [draft, setDraft] = useState('');

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((cur) => [
      ...cur,
      {
        id: 'm' + (cur.length + 1),
        from: workspace.user.name,
        face: workspace.user.face,
        text,
        at: '07:0' + Math.min(9, cur.length + 1),
        mine: true,
      },
    ]);
    setDraft('');
  };

  return (
    <Card pane="chat" className="min-h-0 p-4">
      <CardHead
        title={
          <span className="flex items-center gap-1.5">
            Design Team Chat
            <Icon name="chevron-down" size={14} className="text-muted" />
          </span>
        }
        icon="comment"
        action={
          <>
            <IconButton icon="bell" label="Chat notifications" size={30} />
            <IconButton icon="dots" label="Chat actions" size={30} />
          </>
        }
      />

      <ul
        data-scroller="chat"
        className="scroll-region m-0 mt-3 -mr-2 flex min-h-0 flex-1 list-none flex-col gap-2.5 p-0 pr-2"
      >
        {messages.map((message) => (
          <li
            key={message.id}
            data-message={message.id}
            className={cx('flex items-end gap-2', message.mine && 'flex-row-reverse')}
          >
            {!message.mine ? <Avatar src={message.face} name={message.from} size={26} /> : null}
            <div className={cx('max-w-[78%] min-w-0', message.mine && 'text-right')}>
              {!message.mine ? (
                <p className="text-pink-deep m-0 mb-1 text-[11px] font-bold">{message.from}</p>
              ) : null}
              <p
                className={cx(
                  'm-0 inline-flex items-center gap-1.5 rounded-2xl px-3 py-2 text-[12.5px] leading-[1.45]',
                  message.mine
                    ? 'bg-accent-soft text-accent-deep rounded-br-sm font-semibold'
                    : 'bg-sunken text-body rounded-bl-sm',
                )}
              >
                {message.text}
                {message.glyph === 'wave' ? <Wave size={15} /> : null}
                {message.glyph === 'thumb' ? <ThumbsUp size={15} /> : null}
              </p>
              <p className="text-muted m-0 mt-1 text-[10.5px]">{message.at}</p>
            </div>
          </li>
        ))}
      </ul>

      <form
        className="border-line mt-3 flex shrink-0 items-center gap-2 rounded-full border py-1.5 pr-1.5 pl-4"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message Here..."
          aria-label="Message the design team"
          data-chat-input
          className="placeholder:text-muted h-9 min-w-0 flex-1 border-0 bg-transparent text-[12.5px] outline-none"
        />
        <span className="text-muted shrink-0" aria-hidden="true">
          <Icon name="smile" size={17} />
        </span>
        <button
          type="submit"
          data-chat-send
          aria-label="Send message"
          disabled={!draft.trim()}
          className={cx(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors',
            draft.trim() ? 'bg-fill text-fill-fg' : 'bg-sunken text-muted',
          )}
        >
          <Icon name="send" size={15} />
        </button>
      </form>
    </Card>
  );
}
