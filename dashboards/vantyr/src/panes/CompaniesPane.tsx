import { useState } from 'react';

import { Badge, Card, CardHead, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { SearchBox, Segmented } from '@/components/Controls';
import { CompanyDisc, Icon } from '@/components/Icon';
import { COMPANIES, POSITIONS, STATUS_TOKEN, positionMultiple, type Company } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, short, usd } from '@/lib/format';

const SORTS = [
  { id: 'value', label: 'By valuation' },
  { id: 'name', label: 'By name' },
  { id: 'team', label: 'By headcount' },
];

/**
 * Companies. Assembly only (rule 4).
 *
 * The businesses behind the positions — and every figure here derives from
 * the position that holds them: a company's implied valuation is its mark
 * divided by the ownership, not a second invented number.
 */
export function CompaniesPane() {
  const [sector, setSector] = useState<string>('all');
  const [sort, setSort] = useState('value');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const sectors = ['all', ...Array.from(new Set(COMPANIES.map((c) => c.sector)))];

  const q = query.trim().toLowerCase();
  const rows = COMPANIES.filter((c) => (sector === 'all' ? true : c.sector === sector))
    .filter((c) => (q ? (c.name + ' ' + c.sector + ' ' + c.stage).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) =>
      sort === 'value'
        ? b.valuation - a.valuation
        : sort === 'team'
          ? b.team - a.team
          : a.name.localeCompare(b.name),
    );

  return (
    <div data-pane="companies" className="flex h-full flex-col">
      <PageHead
        title="Companies"
        subtitle="The businesses behind the positions"
        action={
          <>
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search companies"
              name="companies"
              className="w-[240px]"
            />
            <Segmented
              name="sort"
              size="sm"
              value={sort}
              options={SORTS}
              onChange={(id) => setSort(id)}
            />
          </>
        }
      />

      <ul className="m-0 mb-4 flex shrink-0 list-none flex-wrap gap-2 p-0">
        {sectors.map((s) => (
          <li key={s}>
            <button
              type="button"
              data-sector={s.toLowerCase()}
              aria-pressed={sector === s}
              onClick={() => setSector(s)}
              className={cx(
                'flex h-9 items-center gap-2 rounded-full border px-4 text-[12.5px] font-semibold transition-colors',
                sector === s
                  ? 'bg-ink text-surface border-transparent'
                  : 'border-line text-body hover:bg-sunken hover:text-ink',
              )}
            >
              {s === 'all' ? 'Every sector' : s}
              <span
                className={cx(
                  'tnum rounded-full px-1.5 text-[10.5px]',
                  sector === s ? 'bg-white/20' : 'bg-sunken text-muted',
                )}
              >
                {s === 'all' ? COMPANIES.length : COMPANIES.filter((c) => c.sector === s).length}
              </span>
            </button>
          </li>
        ))}
        <li className="ml-auto flex items-center">
          <Badge>
            {rows.length} of {COMPANIES.length}
          </Badge>
        </li>
      </ul>

      <Card pane="companies" className="min-h-0 flex-1 p-5">
        <CardHead
          title={sector === 'all' ? 'All companies' : sector}
          note="Implied valuation is the position's mark over its ownership"
        />
        <div data-scroller="companies" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {rows.length ? (
            <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0">
              {rows.map((c) => (
                <li key={c.id}>
                  <CompanyCard
                    company={c}
                    open={open === c.id}
                    onToggle={() => setOpen(open === c.id ? null : c.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Empty what="company" query={query || sector} />
          )}
        </div>
      </Card>
    </div>
  );
}

function CompanyCard({
  company: c,
  open,
  onToggle,
}: {
  company: Company;
  open: boolean;
  onToggle: () => void;
}) {
  const position = POSITIONS.find((p) => p.name === c.name);
  return (
    <button
      type="button"
      data-row={c.id}
      aria-expanded={open}
      onClick={onToggle}
      className={cx(
        'w-full rounded-[14px] border p-4 text-left transition-colors',
        open ? 'border-accent bg-accent-faint' : 'border-line hover:bg-sunken',
      )}
    >
      <span className="flex items-center gap-3">
        <CompanyDisc name={c.name} size={38} />
        <span className="min-w-0 flex-1">
          <span className="text-ink block truncate text-[13.5px] font-bold">{c.name}</span>
          <span className="text-muted block truncate text-[11.5px]">
            {c.sector} · {c.stage}
          </span>
        </span>
        {position ? (
          <span
            aria-hidden="true"
            style={{ background: `var(${STATUS_TOKEN[position.status]})` }}
            className="h-2 w-2 shrink-0 rounded-full"
          />
        ) : null}
      </span>

      <span className="mt-3 flex items-baseline justify-between gap-2">
        <span className="tnum text-ink text-[17px] leading-none font-extrabold">
          ${short(c.valuation)}
        </span>
        <span className="text-muted text-[11px]">implied</span>
      </span>

      {open && position ? (
        <span className="border-line mt-3 block border-t pt-3">
          <span className="grid grid-cols-2 gap-x-3 gap-y-2">
            {[
              { k: 'Your position', v: usd(position.invested) },
              { k: 'Marked at', v: usd(position.netValue) },
              { k: 'Multiple', v: positionMultiple(position).toFixed(2) + '×' },
              { k: 'Ownership', v: position.ownership + '%' },
              { k: 'Headcount', v: num(c.team) },
              { k: 'Founded', v: String(c.founded) },
            ].map((d) => (
              <span key={d.k} className="block">
                <span className="text-muted block text-[10.5px]">{d.k}</span>
                <span className="tnum text-ink mt-0.5 block text-[12px] font-bold">{d.v}</span>
              </span>
            ))}
          </span>
          <span className="text-muted mt-2.5 flex items-center gap-1.5 text-[11px]">
            <Icon name="lock" size={12} />
            Marked {position.investedOn} · led by {position.lead}
          </span>
        </span>
      ) : null}
    </button>
  );
}
