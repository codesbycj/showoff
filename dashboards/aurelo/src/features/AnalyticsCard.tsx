import { Gauge } from '@/charts/Gauge';
import { Card, CardHead } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { TASKS } from '@/data/deck';

/** The three states of this month's money jobs, as a half-ring. */
export function AnalyticsCard() {
  return (
    <Card pane="analytics" className="min-h-0 p-5">
      <CardHead title="Analytics" action={<IconButton icon="dots-v" label="Analytics options" />} />

      <ul className="m-0 mt-3 flex list-none flex-col gap-1.5 p-0">
        {TASKS.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              style={{ background: `var(${t.token})` }}
              className="h-2.5 w-2.5 shrink-0 rounded-full"
            />
            <span className="text-body text-[12.5px]">{t.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <Gauge
          segments={TASKS}
          label={'This month: ' + TASKS.map((t) => `${t.label} ${t.share}%`).join(', ')}
        />
      </div>
    </Card>
  );
}
