import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ASSISTANT } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * The assistant card.
 *
 * "Read more" really expands, the suggestion chips really fill the box, and
 * sending really appends the question to a short thread — because a control
 * that does nothing is what ruins a take (rule 5), and a dashboard with a dead
 * text input in it is the most obvious dead control there is.
 *
 * It does not pretend to answer. The thread shows the question as asked and a
 * line saying the answer is being prepared, which is honest about a build with
 * no model behind it and still gives the take something to perform.
 */
export function AssistantCard() {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState('');
  const [asked, setAsked] = useState<string[]>([]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setAsked((cur) => [...cur, q].slice(-3));
    setDraft('');
  };

  return (
    <Card pane="assistant" className="min-h-0 p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-ink m-0 flex items-center gap-2 text-[16px] font-semibold tracking-[-0.01em]">
          <Icon name="sparkle" size={17} className="text-accent" />
          {ASSISTANT.heading}
        </h2>
        <IconButton
          icon="expand"
          label={expanded ? 'Collapse summary' : 'Expand summary'}
          tone="raised"
          size={32}
          onClick={() => setExpanded((v) => !v)}
          active={expanded}
        />
      </div>

      <div data-scroller="assistant" className="scroll-region mt-3 -mr-1 min-h-0 flex-1 pr-2">
        <p className="text-muted m-0 text-[11.5px] font-semibold tracking-[0.04em] uppercase">
          AI Summary
        </p>
        <p className="text-body m-0 mt-1.5 text-[12.5px] leading-[1.55]">
          {ASSISTANT.summary}{' '}
          {expanded ? (
            <span className="text-body">{ASSISTANT.more}</span>
          ) : (
            <button
              type="button"
              data-readmore
              onClick={() => setExpanded(true)}
              className="text-accent -my-1 py-1 font-semibold hover:underline"
            >
              Read more
            </button>
          )}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {ASSISTANT.tiles.map((tile) => (
            <div key={tile.label} className="bg-raised rounded-2xl p-3">
              <p className="text-muted m-0 text-[11.5px]">{tile.label}</p>
              <p className="m-0 mt-1.5 flex items-center gap-2">
                <span className="text-ink text-[20px] leading-none font-semibold">
                  {tile.value}
                </span>
                <Badge tone={tile.tone}>{tile.tag}</Badge>
              </p>
            </div>
          ))}
        </div>

        {asked.length ? (
          <ul data-thread className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
            {asked.map((q, i) => (
              <li key={i} className="bg-raised rounded-2xl px-3 py-2">
                <p className="text-ink m-0 text-[12.5px] font-medium">{q}</p>
                <p className="text-muted m-0 mt-1 flex items-center gap-1.5 text-[11.5px]">
                  <Icon name="clock" size={12} />
                  Working on an answer
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ASSISTANT.prompts.map((p) => (
              <button
                key={p}
                type="button"
                data-prompt={p}
                onClick={() => setDraft(p)}
                className="bg-raised text-body hover:text-ink rounded-full px-3 py-1.5 text-[11.5px] transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        className="bg-raised mt-3 flex items-center gap-2 rounded-full py-1.5 pr-1.5 pl-4"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask me anything..."
          aria-label="Ask the assistant"
          data-ask
          className="placeholder:text-muted h-9 min-w-0 flex-1 border-0 bg-transparent text-[12.5px] outline-none"
        />
        <button
          type="submit"
          data-send
          aria-label="Send question"
          disabled={!draft.trim()}
          className={cx(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors',
            draft.trim() ? 'bg-accent text-[#0b1626]' : 'bg-sunken text-muted',
          )}
        >
          <Icon name="send" size={15} />
        </button>
      </form>
    </Card>
  );
}
