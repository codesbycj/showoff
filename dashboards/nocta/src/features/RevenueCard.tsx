import { useState } from 'react';

import { RevenueBars } from '@/charts/RevenueBars';
import { DeltaPill } from '@/components/Badge';
import { Card } from '@/components/Card';
import { IconButton, Segmented } from '@/components/Controls';
import { SPANS, type Span } from '@/data/deck';
import { num, usd } from '@/lib/format';

const OPTIONS = SPANS.map((s) => ({ id: s.id, label: s.label }));

/**
 * The card the reference leads on.
 *
 * The span control is real: Weekly, Monthly, Yearly and Range are four
 * different series in the deck — seven bars, four, twelve and four — and
 * switching redraws the chart, re-labels the axis and recalculates the
 * headline. Monthly is deliberately negative, because a dashboard that can
 * only render good news is a picture of a dashboard.
 */
export function RevenueCard() {
  const [spanId, setSpanId] = useState<Span['id']>('yearly');
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];

  // Adjusted during render rather than in an effect: a new span has a different
  // number of bars, so an index from the old one may not exist, and an effect
  // would hand the browser a frame drawn with the wrong bar selected first.
  const [lastSpan, setLastSpan] = useState(span.id);
  const [selected, setSelected] = useState(span.initial);
  const [hovered, setHovered] = useState<number | null>(null);
  if (lastSpan !== span.id) {
    setLastSpan(span.id);
    setSelected(span.initial);
    setHovered(null);
  }

  return (
    <Card pane="revenue" className="col-span-2 min-h-0 p-5">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-ink m-0 text-[17px] font-semibold tracking-[-0.01em]">Revenue</h2>
        <div className="flex items-center gap-2">
          <Segmented name="Revenue span" value={spanId} options={OPTIONS} onChange={setSpanId} />
          <IconButton icon="filter" label="Chart filters" tone="raised" size={34} />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <p className="text-ink m-0 text-[32px] leading-none font-semibold tracking-[-0.03em]">
          {usd(span.total)}
        </p>
        <DeltaPill value={span.delta} />
        <span className="text-muted text-[12.5px]">vs {num(span.previous)} last period</span>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        <RevenueBars
          bars={span.bars}
          selected={selected}
          hovered={hovered}
          onSelect={setSelected}
          onHover={setHovered}
        />
      </div>
    </Card>
  );
}
