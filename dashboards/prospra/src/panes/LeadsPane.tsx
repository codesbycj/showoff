import { useState } from 'react';

import { Avatar, Badge, Card, CardHead, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { SearchBox, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import {
  LEADS,
  LIFECYCLES,
  countLifecycle,
  mqlToSql,
  repOf,
  type Lead,
  type Lifecycle,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

type Filter = 'all' | Lifecycle;

const SORTS = [
  { id: 'score', label: 'Highest score' },
  { id: 'recent', label: 'Most recent' },
  { id: 'company', label: 'By company' },
];

const OWNERS = [{ id: 'all', label: 'All owners' }];

const STATUS_TONE: Record<Lead['status'], 'accent' | 'positive' | 'warn' | 'quiet'> = {
  New: 'accent',
  Working: 'positive',
  Nurturing: 'warn',
  'Open deal': 'positive',
  Unqualified: 'quiet',
};

/**
 * Leads. Assembly only (rule 4).
 *
 * **Lifecycle stage, lead status and score are three different properties**,
 * and keeping them apart is the clearest sign the object model is understood:
 * the lifecycle is the relationship, the status is what the rep is doing
 * about it, and the score is why it was passed over.
 */
export function LeadsPane({ onOpenDeal }: { onOpenDeal: () => void }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [owner, setOwner] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('score');
  const [open, setOpen] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const rows = LEADS.filter((l) => (filter === 'all' ? true : l.lifecycle === filter))
    .filter((l) => (owner === 'all' ? true : l.ownerId === owner))
    .filter((l) =>
      q ? (l.name + ' ' + l.company + ' ' + l.source).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) =>
      sort === 'score'
        ? b.score - a.score
        : sort === 'recent'
          ? b.lastActivity.localeCompare(a.lastActivity)
          : a.company.localeCompare(b.company),
    );

  const ownerOptions = [
    ...OWNERS,
    ...Array.from(new Set(LEADS.map((l) => l.ownerId))).map((id) => ({
      id,
      label: repOf(id).name,
    })),
  ];

  return (
    <div data-pane="leads" className="flex h-full flex-col">
      <PageHead
        title="Leads"
        subtitle="Everyone in the funnel, how qualified, and who owns them"
        action={
          <>
            <SelectPill name="owner" value={owner} options={ownerOptions} onChange={setOwner} />
            <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
          </>
        }
      />

      <Card pane="funnel" className="mb-4 shrink-0 p-5">
        <CardHead
          title="Lifecycle"
          note={`MQL to SQL conversion ${mqlToSql().toFixed(0)}%`}
          action={<Badge tone="accent">{num(LEADS.length)} people</Badge>}
        />
        <ul className="m-0 mt-3 grid list-none grid-cols-6 gap-2.5 p-0">
          {LIFECYCLES.map((stage, i) => {
            const count = countLifecycle(stage);
            const widest = Math.max(...LIFECYCLES.map(countLifecycle), 1);
            return (
              <li key={stage}>
                <button
                  type="button"
                  data-lifecycle={stage.toLowerCase()}
                  aria-pressed={filter === stage}
                  onClick={() => setFilter(filter === stage ? 'all' : stage)}
                  className={cx(
                    'w-full rounded-[12px] border px-3 py-2.5 text-left transition-colors',
                    filter === stage
                      ? 'border-accent-deep bg-accent-faint'
                      : 'border-line hover:bg-sunken',
                  )}
                >
                  <span className="text-muted block text-[11px] font-semibold">{stage}</span>
                  <span className="tnum text-ink mt-1 block text-[20px] leading-none font-bold">
                    {count}
                  </span>
                  <span className="bg-sunken-deep mt-2 block h-1.5 rounded-full">
                    <span
                      style={{
                        width: (count / widest) * 100 + '%',
                        background: `var(--color-stage-${Math.min(4, i)})`,
                      }}
                      className="block h-full rounded-full"
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card pane="leads" className="min-h-0 flex-1 p-5">
        <CardHead
          title={filter === 'all' ? 'All leads' : filter}
          action={
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search name, company or source"
                name="leads"
                className="w-[280px]"
              />
              <Badge>
                {rows.length} of {LEADS.length}
              </Badge>
            </>
          }
        />

        <div className="border-line mt-3 grid shrink-0 grid-cols-[2fr_1fr_1fr_0.7fr_1fr_1fr] gap-3 border-b pb-2 text-[10.5px] font-bold tracking-[0.08em] text-[var(--color-muted)] uppercase">
          <span>Person</span>
          <span>Lifecycle</span>
          <span>Status</span>
          <span className="text-right">Score</span>
          <span>Source</span>
          <span>Owner</span>
        </div>

        <div data-scroller="leads" className="scroll-region min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 list-none p-0">
              {rows.map((l) => (
                <li key={l.id}>
                  <Row
                    lead={l}
                    open={open === l.id}
                    onToggle={() => setOpen(open === l.id ? null : l.id)}
                    onOpenDeal={onOpenDeal}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="lead" query={query || filter} />
          )}
        </div>
      </Card>
    </div>
  );
}

function Row({
  lead,
  open,
  onToggle,
  onOpenDeal,
}: {
  lead: Lead;
  open: boolean;
  onToggle: () => void;
  onOpenDeal: () => void;
}) {
  const owner = repOf(lead.ownerId);
  return (
    <div className={cx('border-line border-b last:border-b-0', open && 'bg-accent-faint')}>
      <button
        type="button"
        data-row={lead.id}
        aria-expanded={open}
        onClick={onToggle}
        className="grid w-full grid-cols-[2fr_1fr_1fr_0.7fr_1fr_1fr] items-center gap-3 py-3 text-left"
      >
        <span className="min-w-0">
          <span className="text-ink block truncate text-[13px] font-semibold">{lead.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{lead.company}</span>
        </span>
        <span className="text-body text-[12.5px]">{lead.lifecycle}</span>
        <span>
          <Badge tone={STATUS_TONE[lead.status]}>{lead.status}</Badge>
        </span>
        <span
          className={cx(
            'tnum text-right text-[13px] font-bold',
            lead.score >= 70 ? 'text-positive' : lead.score >= 40 ? 'text-warn' : 'text-muted',
          )}
        >
          {lead.score}
        </span>
        <span className="text-body truncate text-[12.5px]">{lead.source}</span>
        <span className="flex min-w-0 items-center gap-2">
          <Avatar src={owner.face} name={owner.name} size={26} />
          <span className="text-body truncate text-[12px]">{owner.name.split(' ')[0]}</span>
        </span>
      </button>

      {open ? (
        <div className="border-line/60 grid grid-cols-4 gap-3 border-t py-3">
          {[
            { k: 'Last activity', v: lead.lastActivity },
            { k: 'Lifecycle', v: lead.lifecycle },
            { k: 'Lead status', v: lead.status },
            { k: 'Score', v: `${lead.score} of 100` },
          ].map((d) => (
            <span key={d.k} className="block">
              <span className="text-muted block text-[11px]">{d.k}</span>
              <span className="text-ink mt-1 block truncate text-[12.5px] font-semibold">
                {d.v}
              </span>
            </span>
          ))}
          <span className="col-span-4 flex items-center gap-2">
            <button
              type="button"
              data-action="open-deal"
              onClick={onOpenDeal}
              className="bg-accent-deep text-accent-fg hover:bg-accent flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold transition-colors"
            >
              Open on the pipeline
              <Icon name="arrow-right" size={13} strokeWidth={2.2} />
            </button>
            <span className="text-muted text-[11.5px]">
              Owned by {owner.name} · {owner.role}
            </span>
          </span>
        </div>
      ) : null}
    </div>
  );
}
