import { AreaSpark, GradientMeter, TickMeter } from '@/charts/Minis';
import { Card, CardHead, Delta, Label } from '@/components/Bits';
import { DELIVERIES, type RangeId } from '@/data/deck';
import { num } from '@/lib/format';

/**
 * Three delivery figures, each with the chart that suits it: a tick meter for a
 * utilisation percentage, a gradient scale for a rate with a target on it, and
 * a trend line for a count.
 *
 * All three move with the range control in the bar above, which the reference
 * cannot show.
 */
export function DeliveriesCard({ range }: { range: RangeId }) {
  const d = DELIVERIES[range];

  return (
    <Card pane="deliveries" className="shrink-0 p-4">
      <CardHead title="Deliveries" />

      <div className="mt-4 grid grid-cols-3 gap-6">
        <div>
          <Label>Fleet utilization</Label>
          <p data-util className="text-ink m-0 mt-1.5 text-[20px] leading-none font-semibold">
            {d.utilisation}%
          </p>
          <div className="mt-2.5">
            <TickMeter value={d.utilisation} ticks={d.ticks} />
          </div>
        </div>

        <div>
          <Label>On-time delivery rate</Label>
          <p className="text-ink m-0 mt-1.5 text-[20px] leading-none font-semibold">{d.onTime}%</p>
          <div className="mt-4">
            <GradientMeter value={d.onTime} />
          </div>
        </div>

        <div>
          <Label>Total deliveries</Label>
          <p className="m-0 mt-1.5 flex items-baseline gap-2">
            <span className="text-ink text-[20px] leading-none font-semibold">{num(d.total)}</span>
            <Delta value={d.totalDelta} />
          </p>
          <div className="mt-1">
            <AreaSpark values={d.trend} height={36} />
          </div>
        </div>
      </div>
    </Card>
  );
}
