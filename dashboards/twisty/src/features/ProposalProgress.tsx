import { useState } from 'react';

import { ProposalStrip } from '@/charts/ProposalStrip';
import { Card, CardHead } from '@/components/Card';
import { SelectPill } from '@/components/SelectPill';
import { PROPOSAL_PERIODS } from '@/data/deck';
import { cx } from '@/lib/cx';
import { dateLong, num } from '@/lib/format';

const OPTIONS = PROPOSAL_PERIODS.map((p) => ({ id: p.id, label: dateLong(p.date) }));

/**
 * Proposals sent, interviews, hires -- and the strip of the last 26 days under
 * each.
 *
 * Two things here are not in the reference and are deliberate. The date pill
 * picks between three real periods instead of naming one (rule 5: a control
 * that does nothing is the thing that ruins a take). And selecting a figure
 * writes the line underneath, which is arithmetic off the same three numbers --
 * the conversion rate is the question those three figures exist to answer, and
 * the board leaves the reader to do the division.
 */
export function ProposalProgress() {
  const [periodId, setPeriodId] = useState(PROPOSAL_PERIODS[0].id);
  const [active, setActive] = useState('sent');
  const period = PROPOSAL_PERIODS.find((p) => p.id === periodId) ?? PROPOSAL_PERIODS[0];

  const value = (id: string) => period.stats.find((s) => s.id === id)?.value ?? 0;
  const sent = value('sent');
  const interviews = value('interviews');
  const hires = value('hires');

  const share = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);
  const INSIGHT: Record<string, string> = {
    sent:
      num(interviews) +
      ' of ' +
      num(sent) +
      ' proposals reached an interview — ' +
      share(interviews, sent) +
      '%',
    interviews:
      num(hires) +
      ' of ' +
      num(interviews) +
      ' interviews became a hire — ' +
      share(hires, interviews) +
      '%',
    hires: 'One hire for every ' + Math.round(sent / Math.max(1, hires)) + ' proposals sent',
  };

  return (
    <Card pane="proposals" className="min-h-0 p-6">
      <CardHead
        title="Proposal Progress"
        action={
          <SelectPill
            name="period"
            icon="calendar"
            value={periodId}
            options={OPTIONS}
            onChange={setPeriodId}
          />
        }
      />

      <div className="mt-4 flex min-h-0 flex-1 items-stretch">
        {period.stats.map((stat, i) => {
          const on = stat.id === active;
          return (
            <button
              key={stat.id}
              type="button"
              data-stat={stat.id}
              onClick={() => setActive(stat.id)}
              onMouseEnter={() => setActive(stat.id)}
              aria-pressed={on}
              className={cx(
                'flex min-w-0 flex-1 cursor-pointer flex-col items-start justify-between gap-3 px-4 pt-1 pb-0 text-left transition-colors',
                i > 0 && 'border-line border-l',
                i === 0 && 'pl-1',
              )}
            >
              <span className="block">
                <span className="text-muted block text-[12.5px] font-medium">{stat.label}</span>
                <span
                  className={cx(
                    'mt-1 block text-[30px] leading-[1.1] font-semibold tracking-[-0.03em] transition-colors',
                    on ? 'text-ink' : 'text-ink/60',
                  )}
                >
                  {num(stat.value)}
                </span>
              </span>
              <span className="block w-full">
                <ProposalStrip stat={stat} active={on} />
              </span>
            </button>
          );
        })}
      </div>

      <p data-insight className="border-line text-muted m-0 mt-3 border-t pt-3 text-[12.5px]">
        {INSIGHT[active]}
      </p>
    </Card>
  );
}
