import { useState } from 'react';

import { Waveform } from '@/charts/Waveform';
import { Badge, Card, CardHead, Empty } from '@/components/Bits';
import { PageHead, Search } from '@/components/Chrome';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  RECORDINGS,
  TOPICS,
  asClock,
  asMinutes,
  libraryHours,
  memberOf,
  unwatched,
  waveform,
  type Recording,
} from '@/data/deck';
import { cx } from '@/lib/cx';

type SortKey = 'recent' | 'longest' | 'discussed';

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'recent', label: 'Most recent' },
  { id: 'discussed', label: 'Most discussed' },
  { id: 'longest', label: 'Longest' },
];

/**
 * Recordings — the library. Assembly only (rule 4).
 *
 * The reference's "Last videos" strip is three tiles that scroll off the edge
 * and lead nowhere. This is the destination: every recording, filtered by
 * topic and by whether it has been watched, with one opened beside the list.
 */
export function RecordingsPane({
  query,
  onQuery,
  selected,
  onSelect,
}: {
  query: string;
  onQuery: (next: string) => void;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [topic, setTopic] = useState<'all' | (typeof TOPICS)[number]>('all');
  const [lens, setLens] = useState<'all' | 'unwatched'>('all');
  const [sort, setSort] = useState<SortKey>('recent');

  const q = query.trim().toLowerCase();
  const rows = RECORDINGS.filter((r) => (topic === 'all' ? true : r.topic === topic))
    .filter((r) => (lens === 'unwatched' ? !r.watched : true))
    .filter((r) =>
      q
        ? (r.title + ' ' + r.topic + ' ' + memberOf(r.ownerId).name).toLowerCase().includes(q)
        : true,
    )
    .slice()
    .sort((a, b) =>
      sort === 'longest'
        ? b.seconds - a.seconds
        : sort === 'discussed'
          ? b.comments - a.comments
          : b.date.localeCompare(a.date) || b.seconds - a.seconds,
    );

  const current = rows.find((r) => r.id === selected) ?? rows[0] ?? null;

  return (
    <div data-pane="recordings" className="flex h-full flex-col">
      <PageHead
        title="Recordings"
        note={`${RECORDINGS.length} in the library · ${libraryHours().toFixed(1)} hours · ${unwatched()} not watched`}
        action={
          <>
            <Search value={query} onChange={onQuery} />
            <Segmented
              name="lens"
              value={lens}
              options={[
                { id: 'all', label: 'All' },
                { id: 'unwatched', label: `Unwatched (${unwatched()})` },
              ]}
              onChange={(id) => setLens(id as 'all' | 'unwatched')}
            />
          </>
        }
      />

      <div className="mb-4 flex shrink-0 items-center gap-2.5">
        <Segmented
          name="topic"
          value={topic}
          options={[
            { id: 'all', label: 'Every topic' },
            ...TOPICS.map((t) => ({ id: t, label: t })),
          ]}
          onChange={(id) => setTopic(id as 'all' | (typeof TOPICS)[number])}
        />
        <span className="ml-auto">
          <Segmented
            name="sort"
            value={sort}
            options={SORTS}
            onChange={(id) => setSort(id as SortKey)}
          />
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_370px] gap-4">
        <Card pane="library" className="min-h-0 p-5">
          <CardHead
            title={topic === 'all' ? 'Every recording' : topic}
            note="Open one to read its chapters"
            action={
              <Badge>
                {rows.length} of {RECORDINGS.length}
              </Badge>
            }
          />
          <div data-scroller="library" className="scroll-region mt-3 min-h-0 flex-1 pr-1">
            {rows.length ? (
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {rows.map((r) => (
                  <li key={r.id}>
                    <Row
                      recording={r}
                      active={current?.id === r.id}
                      onSelect={() => onSelect(r.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <Empty what="recording" query={query || topic} />
            )}
          </div>
        </Card>

        <Card pane="detail" className="min-h-0 p-5">
          {current ? <Detail recording={current} /> : <Empty what="recording" query={query} />}
        </Card>
      </div>
    </div>
  );
}

function Row({
  recording: r,
  active,
  onSelect,
}: {
  recording: Recording;
  active: boolean;
  onSelect: () => void;
}) {
  const owner = memberOf(r.ownerId);
  return (
    <button
      type="button"
      data-recording={r.id}
      aria-pressed={active}
      onClick={onSelect}
      className={cx(
        'flex w-full items-center gap-3 rounded-[16px] border px-4 py-3 text-left transition-colors',
        active ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'grid h-11 w-11 shrink-0 place-items-center rounded-full',
          r.watched ? 'bg-sunken text-muted' : 'bg-accent-deep text-accent-fg',
        )}
      >
        <Icon name="play" size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-ink block truncate text-[13.5px] font-bold">{r.title}</span>
        <span className="text-muted tnum block truncate text-[11.5px]">
          {r.topic} · {r.date} · {owner.name}
        </span>
      </span>
      <Waveform
        bars={waveform(r.id).slice(0, 36)}
        played={r.watched ? 1 : 0}
        w={120}
        h={30}
        label={`${r.title}, ${asMinutes(r.seconds)}`}
      />
      <span className="tnum text-ink w-[56px] shrink-0 text-right text-[12px] font-semibold">
        {asClock(r.seconds)}
      </span>
      <span className="tnum text-muted flex w-[86px] shrink-0 items-center justify-end gap-2 text-[11.5px]">
        <span className="flex items-center gap-1">
          <Icon name="eye" size={12} />
          {r.views}
        </span>
        <span className="flex items-center gap-1">
          <Icon name="comment" size={12} />
          {r.comments}
        </span>
      </span>
    </button>
  );
}

function Detail({ recording: r }: { recording: Recording }) {
  const owner = memberOf(r.ownerId);
  const bars = waveform(r.id);
  /*
   * Chapters out of the waveform: the quiet gaps are where a recording turns
   * over, which is the only thing its shape is good for.
   *
   * One per quarter rather than "every bar under a threshold" — a threshold
   * found two on a busy recording and nine on a quiet one, so the card was
   * two-thirds empty on half the library.
   */
  const quarter = Math.floor(bars.length / 4);
  const chapters = [0, 1, 2, 3].map((k) => {
    const from = k * quarter + (k === 0 ? 3 : 0);
    const to = k === 3 ? bars.length - 3 : (k + 1) * quarter;
    let best = from;
    for (let i = from; i < to; i += 1) if (bars[i] < bars[best]) best = i;
    return { i: best, v: bars[best] };
  });

  return (
    <>
      <span className="bg-accent-tint shrink-0 rounded-[18px] p-5">
        <span className="flex items-center gap-2">
          <span className="bg-surface text-ink rounded-full px-2.5 py-[3px] text-[11px] font-bold">
            {r.topic}
          </span>
          <span className="tnum text-body ml-auto text-[11.5px]">{r.date}</span>
        </span>
        <span className="text-ink mt-2.5 block text-[19px] leading-tight font-extrabold tracking-[-0.02em]">
          {r.title}
        </span>
        <span className="mt-3 block">
          <Waveform
            bars={bars}
            played={r.watched ? 1 : 0}
            w={300}
            h={44}
            label={`${r.title}, ${asMinutes(r.seconds)} long`}
          />
        </span>
        <span className="tnum text-body mt-2 flex items-center justify-between text-[11px]">
          <span>0:00</span>
          <span>{asClock(r.seconds)}</span>
        </span>
      </span>

      <dl className="border-line m-0 mt-4 grid shrink-0 grid-cols-3 gap-3 border-b pb-4">
        <div>
          <dt className="text-muted m-0 text-[11px]">Length</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">{asMinutes(r.seconds)}</dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Views</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">{r.views}</dd>
        </div>
        <div>
          <dt className="text-muted m-0 text-[11px]">Comments</dt>
          <dd className="tnum text-ink m-0 mt-1 text-[14px] font-bold">{r.comments}</dd>
        </div>
      </dl>

      <div className="mt-4 shrink-0">
        <span className="text-muted block text-[11px]">Recorded by</span>
        <span className="mt-1.5 flex items-center gap-2.5">
          <img
            src={owner.face}
            alt=""
            width={32}
            height={32}
            className="bg-sunken h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span className="min-w-0">
            <span className="text-ink block truncate text-[12.5px] font-bold">{owner.name}</span>
            <span className="text-muted block truncate text-[11px]">{owner.role}</span>
          </span>
          <span className="ml-auto flex shrink-0 -space-x-2">
            {r.attendees.map((id) => (
              <img
                key={id}
                src={memberOf(id).face}
                alt=""
                title={memberOf(id).name}
                width={26}
                height={26}
                className="h-[26px] w-[26px] rounded-full border-2 border-white object-cover"
              />
            ))}
          </span>
        </span>
      </div>

      <div data-scroller="chapters" className="scroll-region mt-4 min-h-0 flex-1 pr-1">
        <span className="text-muted block text-[11px]">Chapters · where the room went quiet</span>
        <ol className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
          {chapters.map((c, i) => (
            <li
              key={c.i}
              className="border-line flex items-center gap-3 rounded-[12px] border px-3 py-2"
            >
              <span className="tnum bg-sunken text-ink grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold">
                {i + 1}
              </span>
              <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                {CHAPTER_NAMES[i % CHAPTER_NAMES.length]}
              </span>
              <span className="tnum text-muted shrink-0 text-[11.5px]">
                {asClock(Math.round((c.i / bars.length) * r.seconds))}
              </span>
            </li>
          ))}
        </ol>

        <span className="text-muted mt-4 block text-[11px]">Shared with</span>
        <ul className="m-0 mt-2 flex list-none flex-col gap-1.5 p-0">
          {r.attendees.map((id) => {
            const who = memberOf(id);
            return (
              <li
                key={id}
                className="border-line flex items-center gap-2.5 rounded-[12px] border px-3 py-2"
              >
                <img
                  src={who.face}
                  alt=""
                  width={26}
                  height={26}
                  className="bg-sunken h-[26px] w-[26px] shrink-0 rounded-full object-cover"
                />
                <span className="text-ink min-w-0 flex-1 truncate text-[12px] font-semibold">
                  {who.name}
                </span>
                <span className="text-muted shrink-0 text-[11px]">{who.role}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

const CHAPTER_NAMES = [
  'Where we left it',
  'The open question',
  'What changed',
  'What happens next',
];
