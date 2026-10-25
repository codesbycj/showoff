import { useState } from 'react';

import { Gauge } from '@/charts/Gauge';
import { Card, CardHead } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { DeltaBadge } from '@/components/Badge';
import { Icon } from '@/components/Icon';
import { PERFORMANCE } from '@/data/deck';
import { num, usd } from '@/lib/format';

/**
 * The goal gauge and the two figures under it.
 *
 * The toast is dismissible and stays dismissed — in the reference it is drawn
 * with a close button that cannot do anything, which is the kind of control a
 * still picture can afford and a filmed app cannot (rule 5).
 */
export function SalesPerformance() {
  const [toast, setToast] = useState(true);

  return (
    <Card pane="performance" className="min-h-0 p-5">
      <CardHead
        title="Sales Performance"
        icon="target"
        action={<IconButton icon="dots" label="More actions" square size={34} />}
      />

      <div className="grid min-h-0 flex-1 place-items-center">
        <Gauge value={PERFORMANCE.goal} size={238} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat
          label="Sales Number"
          value={num(PERFORMANCE.salesNumber)}
          delta={PERFORMANCE.salesDelta}
        />
        <Stat
          label="Total Revenue"
          value={usd(PERFORMANCE.revenue)}
          delta={PERFORMANCE.revenueDelta}
        />
      </div>

      {toast ? (
        <div
          data-toast
          role="status"
          className="bg-fill text-fill-fg mt-3 flex items-center gap-2.5 rounded-full py-2.5 pr-2.5 pl-4"
        >
          <span aria-hidden="true" className="text-[15px]">
            <Icon name="trend-up" size={16} className="text-accent" />
          </span>
          <p className="m-0 flex-1 text-[12.5px] font-semibold">{PERFORMANCE.toast}</p>
          <button
            type="button"
            data-toast-close
            onClick={() => setToast(false)}
            aria-label="Dismiss notification"
            className="text-fill-fg/70 hover:text-fill-fg grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/15"
          >
            <Icon name="close" size={13} />
          </button>
        </div>
      ) : null}
    </Card>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: number }) {
  return (
    <div className="border-line rounded-2xl border p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted text-[12px] font-semibold">{label}</span>
        <DeltaBadge value={delta} />
      </div>
      <p className="text-ink m-0 mt-2 text-[22px] leading-none font-extrabold tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}
