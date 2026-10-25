import { useState } from 'react';

import { ProfitBars } from '@/charts/ProfitBars';
import { Card, CardHead } from '@/components/Card';
import { IconButton, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { PERIODS, type Period } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const OPTIONS = PERIODS.map((p) => ({ id: p.id, label: p.label }));

/**
 * The card the reference leads on.
 *
 * The period control is real: Month, Quarter and Year are three different
 * series in the deck — seven bars, four and five — and switching redraws the
 * chart, re-labels the axis and recalculates the headline. Year is deliberately
 * negative, because a dashboard that can only render good news is a picture of
 * a dashboard.
 */
export function ProfitOverview() {
  const [periodId, setPeriodId] = useState<Period['id']>('month');
  const period = PERIODS.find((p) => p.id === periodId) ?? PERIODS[0];

  // Adjusted during render rather than in an effect: a new period has a
  // different number of bars, so an index from the old one may not exist. An
  // effect would hand the browser a frame drawn with the wrong bar selected
  // first.
  const [lastPeriod, setLastPeriod] = useState(period.id);
  const [selected, setSelected] = useState(period.initial);
  const [hovered, setHovered] = useState<number | null>(null);
  if (lastPeriod !== period.id) {
    setLastPeriod(period.id);
    setSelected(period.initial);
    setHovered(null);
  }

  const up = period.change >= 0;

  return (
    <Card pane="profit" className="col-span-2 min-h-0 p-5">
      <CardHead
        title="Total Profit Overview"
        icon="wallet"
        action={
          <>
            <SelectPill name="period" value={periodId} options={OPTIONS} onChange={setPeriodId} />
            <IconButton icon="sliders" label="Chart settings" square size={34} />
            <IconButton icon="dots" label="More actions" square size={34} />
          </>
        }
      />

      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <p className="text-ink m-0 text-[38px] leading-none font-extrabold tracking-[-0.035em]">
            {usd(period.total)}
          </p>
          <p className="m-0 mt-2 flex items-center gap-1.5 text-[12.5px]">
            <span className={cx('font-bold', up ? 'text-accent-deep' : 'text-warn-deep')}>
              {(up ? '+' : '-') + usd(Math.abs(period.change))}
            </span>
            <Icon
              name={up ? 'trend-up' : 'trend-down'}
              size={13}
              className={up ? 'text-accent-deep' : 'text-warn-deep'}
            />
            <span className="text-muted">Compare to last {period.label.toLowerCase()}</span>
          </p>
        </div>

        <ul className="text-muted m-0 flex list-none items-center gap-4 p-0 text-[12px] font-semibold">
          <Key colour="var(--color-accent)" label="Highest Day" />
          <Key colour="var(--color-warn)" label="Lowest Day" />
          <Key colour="#8d93a0" label="Average" />
        </ul>
      </div>

      <div className="mt-3 min-h-0 flex-1">
        <ProfitBars
          bars={period.bars}
          selected={selected}
          hovered={hovered}
          onSelect={setSelected}
          onHover={setHovered}
        />
      </div>
    </Card>
  );
}

function Key({ colour, label }: { colour: string; label: string }) {
  return (
    <li className="flex items-center gap-1.5 whitespace-nowrap">
      <span aria-hidden="true" style={{ background: colour }} className="h-2 w-2 rounded-full" />
      {label}
    </li>
  );
}
