import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, SearchBox, Segmented } from '@/components/Controls';
import { CompanyDisc, Icon } from '@/components/Icon';
import { SYNDICATES, filled, type Syndicate } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';

type Lens = 'open' | 'joined' | 'all';

const LENSES: { id: Lens; label: string }[] = [
  { id: 'open', label: 'Open to join' },
  { id: 'joined', label: 'Joined' },
  { id: 'all', label: 'All' },
];

const SORTS = [
  { id: 'closing', label: 'Closing soonest' },
  { id: 'size', label: 'Largest raise' },
  { id: 'filled', label: 'Most filled' },
];

/**
 * Syndicates. Assembly only (rule 4).
 *
 * The allocation list: what is being raised, how much is spoken for, the
 * minimum cheque and when it closes. **The filled percentage is computed from
 * the two figures beside it** — a progress bar that is not the ratio of the
 * numbers printed next to it is the defect this category produces most.
 */
export function SyndicatesPane() {
  const [lens, setLens] = useState<Lens>('open');
  const [sort, setSort] = useState('closing');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [committing, setCommitting] = useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const rows = SYNDICATES.filter((s) =>
    lens === 'joined' ? s.joined : lens === 'open' ? !s.joined && filled(s) < 100 : true,
  )
    .filter((s) => (q ? (s.name + ' ' + s.sector + ' ' + s.lead).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'closing'
        ? a.closes.localeCompare(b.closes)
        : sort === 'size'
          ? b.target - a.target
          : filled(b) - filled(a),
    );

  const committed = SYNDICATES.filter((s) => s.joined).reduce((t, s) => t + s.minimum, 0);

  return (
    <div data-pane="syndicates" className="flex h-full flex-col">
      <PageHead
        title="Syndicates"
        subtitle="Allocations open to you, and the ones you have joined"
        action={
          <Segmented name="lens" value={lens} options={LENSES} onChange={(id) => setLens(id)} />
        }
      />

      <ul className="m-0 mb-4 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
        {[
          {
            k: 'Open allocations',
            v: String(SYNDICATES.filter((s) => filled(s) < 100).length),
            n: 'accepting commitments',
          },
          {
            k: 'Joined',
            v: String(SYNDICATES.filter((s) => s.joined).length),
            n: `${usd(committed)} minimum committed`,
          },
          {
            k: 'Raising now',
            v: '$' + short(SYNDICATES.reduce((t, s) => t + s.target, 0)),
            n: 'across every open syndicate',
          },
          {
            k: 'Closing this month',
            v: String(SYNDICATES.filter((s) => s.closes <= '2027-07-31').length),
            n: 'decide before they fill',
          },
        ].map((s) => (
          <li key={s.k}>
            <div
              data-stat={s.k.toLowerCase().replace(/[^a-z]/g, '')}
              className="border-line bg-surface rounded-[var(--radius-card)] border px-5 py-4 shadow-[var(--shadow-card)]"
            >
              <span className="text-muted block text-[12.5px]">{s.k}</span>
              <span className="tnum text-ink mt-2 block text-[26px] leading-none font-extrabold tracking-[-0.03em]">
                {s.v}
              </span>
              <span className="text-muted mt-2 block text-[11.5px]">{s.n}</span>
            </div>
          </li>
        ))}
      </ul>

      <Card pane="syndicates" className="min-h-0 flex-1 p-5">
        <CardHead
          title={LENSES.find((l) => l.id === lens)?.label ?? 'All'}
          action={
            <>
              <SearchBox
                value={query}
                onChange={setQuery}
                placeholder="Search syndicates"
                name="syndicates"
                className="w-[240px]"
              />
              <Segmented
                name="sort"
                size="sm"
                value={sort}
                options={SORTS}
                onChange={(id) => setSort(id)}
              />
              <Badge>
                {rows.length} of {SYNDICATES.length}
              </Badge>
            </>
          }
        />

        <div data-scroller="syndicates" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {rows.map((s) => (
                <li key={s.id}>
                  <Row
                    syndicate={s}
                    open={open === s.id}
                    committed={committing.includes(s.id)}
                    onToggle={() => setOpen(open === s.id ? null : s.id)}
                    onCommit={() =>
                      setCommitting((cur) =>
                        cur.includes(s.id) ? cur.filter((x) => x !== s.id) : [...cur, s.id],
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="syndicate" query={query || LENSES.find((l) => l.id === lens)!.label} />
          )}
        </div>
      </Card>
    </div>
  );
}

function Row({
  syndicate: s,
  open,
  committed,
  onToggle,
  onCommit,
}: {
  syndicate: Syndicate;
  open: boolean;
  committed: boolean;
  onToggle: () => void;
  onCommit: () => void;
}) {
  const pct = filled(s);
  return (
    <div
      className={cx(
        'rounded-[14px] border p-4 transition-colors',
        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <button
        type="button"
        data-row={s.id}
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center gap-3 text-left"
      >
        <CompanyDisc name={s.company} size={36} />
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13.5px] font-bold">{s.name}</span>
          <span className="text-muted mt-0.5 block truncate text-[11.5px]">
            {s.sector} · led by {s.lead} · closes {s.closes}
          </span>
        </span>

        {s.joined ? <Badge tone="positive">Joined</Badge> : null}
        {pct >= 100 ? <Badge tone="quiet">Filled</Badge> : null}

        <span className="w-[190px] shrink-0">
          <span className="flex items-baseline justify-between gap-2">
            <span className="tnum text-ink text-[12.5px] font-bold">${short(s.committed)}</span>
            <span className="tnum text-muted text-[11px]">of ${short(s.target)}</span>
          </span>
          <Meter value={pct} height={6} className="mt-1.5" />
          <span className="tnum text-muted mt-1 block text-[10.5px]">{pct.toFixed(0)}% filled</span>
        </span>

        <Icon
          name="chevron-down"
          size={14}
          strokeWidth={2.2}
          className={cx(
            'text-muted shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <div className="border-line mt-3 border-t pt-3">
          <div className="grid grid-cols-4 gap-3">
            {[
              { k: 'Minimum cheque', v: usd(s.minimum) },
              { k: 'Target raise', v: usd(s.target) },
              { k: 'Committed', v: usd(s.committed) },
              { k: 'Remaining', v: usd(Math.max(0, s.target - s.committed)) },
            ].map((d) => (
              <span key={d.k} className="block">
                <span className="text-muted block text-[11px]">{d.k}</span>
                <span className="tnum text-ink mt-1 block text-[12.5px] font-bold">{d.v}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <Button
              size="sm"
              name={`commit-${s.id}`}
              variant={committed ? 'outline' : 'solid'}
              icon={committed ? 'check' : 'plus'}
              onClick={onCommit}
            >
              {committed ? 'Interest registered' : 'Register interest'}
            </Button>
            <span className="text-muted text-[11.5px]">
              Registering is not a commitment; the lead confirms allocations when the round closes.
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
