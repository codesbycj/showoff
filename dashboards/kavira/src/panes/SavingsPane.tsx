import { useState } from 'react';

import { DotMatrix } from '@/charts/DotMatrix';
import { Badge, Card, CardHead, Meter } from '@/components/Bits';
import { Button, Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { POTS, potTotal } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const TOP_UPS = [250, 1000, 5000];

/**
 * Savings.
 *
 * The reference's POCKET group names Savings and Emergency Funds and puts
 * nothing behind either, so this one is built out of what the group implies —
 * and it reuses the dot matrix from the Overview, because a pot filling up is
 * exactly the fact that chart form is good at.
 */
export function SavingsPane({ query }: { query: string }) {
  const [potId, setPotId] = useState(POTS[0].id);
  const [topUp, setTopUp] = useState(TOP_UPS[1]);
  const [added, setAdded] = useState(0);

  const q = query.trim().toLowerCase();
  const list = POTS.filter((p) => (q ? p.label.toLowerCase().includes(q) : true));
  const pot = POTS.find((p) => p.id === potId) ?? POTS[0];
  const saved = pot.saved + added;
  const pct = Math.round((saved / pot.target) * 1000) / 10;

  return (
    <div data-pane="savings" className="grid h-full grid-cols-[320px_1fr] gap-4">
      <Card pane="pot-list" className="min-h-0 p-4 pr-1.5">
        <CardHead
          className="pr-2.5"
          title="Pockets"
          action={
            <span className="tnum text-ink text-[12.5px] font-semibold">
              {usd(potTotal() + added)}
            </span>
          }
        />

        <div data-scroller="pots" className="scroll-region mt-3 min-h-0 flex-1 pr-2">
          {list.length === 0 ? (
            <p className="text-muted m-0 px-1 py-6 text-center text-[12.5px]">
              No pocket matches <span className="text-ink font-semibold">{query}</span>.
            </p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {list.map((p) => {
                const on = p.id === potId;
                const amount = p.id === pot.id ? saved : p.saved;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      data-pot={p.id}
                      aria-pressed={on}
                      onClick={() => {
                        setPotId(p.id);
                        setAdded(0);
                      }}
                      className={cx(
                        'w-full rounded-[13px] border p-3 text-left transition-colors',
                        on ? 'border-accent-deep bg-accent-faint' : 'border-line hover:bg-sunken',
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cx(
                            'grid h-9 w-9 shrink-0 place-items-center rounded-full',
                            on ? 'bg-ink-fill text-ink-fg' : 'bg-sunken text-ink',
                          )}
                        >
                          <Icon name="piggy" size={16} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[12.5px] font-semibold">
                            {p.label}
                          </span>
                          <span className="text-muted block truncate text-[10.5px]">{p.note}</span>
                        </span>
                        <span className="tnum text-ink shrink-0 text-[12px] font-semibold">
                          {Math.round((amount / p.target) * 100)}%
                        </span>
                      </span>
                      <Meter
                        value={(amount / p.target) * 100}
                        tone="accent"
                        height={7}
                        className="mt-2.5"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Card>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="pot-detail" className="min-h-0 flex-1 p-4">
          <CardHead
            title={pot.label}
            icon={<Icon name="piggy" size={16} />}
            action={
              <Badge tone={pct >= 100 ? 'positive' : 'accent'}>
                {pct >= 100 ? 'Target reached' : `${pct}% of target`}
              </Badge>
            }
          />

          <p className="m-0 mt-3 flex flex-wrap items-baseline gap-3">
            <span
              data-figure="pot-saved"
              className="tnum text-ink text-[30px] leading-none font-semibold tracking-[-0.03em]"
            >
              {usd(saved)}
            </span>
            <span className="tnum text-muted text-[12.5px]">
              of {usd(pot.target)} · {usd(Math.max(0, pot.target - saved))} to go
            </span>
          </p>

          <div className="mt-5 min-h-0 flex-1">
            <DotMatrix
              share={Math.min(1, saved / pot.target)}
              total={saved}
              cols={24}
              rows={8}
              format={(n) => usd(n)}
              label={`${pot.label}: ${usd(saved)} of ${usd(pot.target)}`}
            />
          </div>
        </Card>

        <Card pane="topup" className="shrink-0 p-4">
          <CardHead title="Add to this pocket" />
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <Segmented
              name="topup"
              size="sm"
              value={String(topUp)}
              options={TOP_UPS.map((a) => ({ id: String(a), label: usd(a) }))}
              onChange={(id) => setTopUp(Number(id))}
            />
            <Button
              icon="plus"
              variant="accent"
              name="topup"
              onClick={() => setAdded((v) => v + topUp)}
            >
              Add {usd(topUp)}
            </Button>
            {added > 0 ? (
              <Button variant="outline" name="undo" onClick={() => setAdded(0)}>
                Undo
              </Button>
            ) : null}
          </div>
          <p data-topup-note className="text-muted m-0 mt-3 text-[12px]">
            {added > 0
              ? `${usd(added)} added to ${pot.label} this session.`
              : `Adding to ${pot.label}, from the trading account.`}
          </p>
        </Card>
      </div>
    </div>
  );
}
