import { Card, CardHead, Meter } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { DAILY } from '@/data/deck';
import { usd } from '@/lib/format';

/** The daily spend against its ceiling. */
export function DailyLimit() {
  const pct = Math.round((DAILY.spent / DAILY.limit) * 1000) / 10;

  return (
    <Card pane="limit" className="shrink-0 p-4">
      <CardHead title="Daily Limit" action={<IconButton icon="dots-v" label="Limit options" />} />

      <p className="m-0 mt-3 flex items-baseline justify-between gap-3">
        <span className="tnum text-ink text-[12.5px] font-semibold">
          {usd(DAILY.spent, true)}{' '}
          <span className="text-muted font-medium">spent of {usd(DAILY.limit, true)}</span>
        </span>
        <span className="tnum text-ink shrink-0 text-[12.5px] font-bold">{pct}%</span>
      </p>

      <Meter value={pct} tone="accent" height={9} className="mt-2.5" />
    </Card>
  );
}
