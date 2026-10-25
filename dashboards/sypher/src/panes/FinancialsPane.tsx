import { BalanceCard, CostsCard } from '@/features/BalanceAndCosts';
import { Card, Delta, Label } from '@/components/Bits';
import { RevenueCosts } from '@/features/RevenueCosts';
import { SERIES, type RangeId } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * Financials: the chart from the dashboard at full width, the three totals it
 * is a picture of, and the two cost cards under it.
 *
 * The totals are summed from the same series the chart draws, so they move with
 * the range control and can never disagree with the line above them.
 */
export function FinancialsPane({ range }: { range: RangeId }) {
  const points = SERIES[range];
  const sum = (key: 'revenue' | 'costs' | 'profit') => points.reduce((t, p) => t + p[key], 0);

  const half = Math.floor(points.length / 2);
  const delta = (key: 'revenue' | 'costs' | 'profit') => {
    const first = points.slice(0, half).reduce((t, p) => t + p[key], 0);
    const second = points.slice(half).reduce((t, p) => t + p[key], 0);
    return first === 0 ? 0 : ((second - first) / first) * 100;
  };

  return (
    <div data-pane="financials" className="flex h-full flex-col gap-3">
      <div className="grid shrink-0 grid-cols-3 gap-3">
        <Total label="Revenue" value={sum('revenue')} delta={delta('revenue')} />
        <Total label="Costs" value={sum('costs')} delta={delta('costs')} />
        <Total label="Net profit" value={sum('profit')} delta={delta('profit')} />
      </div>

      <RevenueCosts range={range} />

      <div className="grid min-h-0 shrink-0 grid-cols-2 gap-3" style={{ height: 238 }}>
        <BalanceCard />
        <CostsCard />
      </div>
    </div>
  );
}

function Total({ label, value, delta }: { label: string; value: number; delta: number }) {
  return (
    <Card pane={'total-' + label.toLowerCase().replace(' ', '-')} className="p-4">
      <Label>{label}</Label>
      <p className="m-0 mt-1.5 flex items-baseline gap-2">
        <span className="text-ink text-[24px] leading-none font-semibold tracking-[-0.02em]">
          {usd(value)}
        </span>
        <Delta value={delta} />
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11.5px]">
        second half of the range against the first
      </p>
    </Card>
  );
}
