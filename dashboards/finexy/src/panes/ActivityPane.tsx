import { Card, Delta } from '@/components/Bits';
import { ACTIVITIES, type ActivityState } from '@/data/deck';
import { Activities } from '@/features/Activities';
import { usd } from '@/lib/format';

const STATES: ActivityState[] = ['Completed', 'Pending', 'In Progress', 'Failed'];

/**
 * Activity: the whole ledger, with the four states summed above it.
 *
 * Every figure in the strip is computed from the same rows the table shows, so
 * the two cannot drift apart.
 */
export function ActivityPane({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const total = ACTIVITIES.reduce((t, a) => t + a.price, 0);

  return (
    <div data-pane="activity" className="flex h-full flex-col gap-4">
      <div className="grid shrink-0 grid-cols-4 gap-4">
        {STATES.map((state) => {
          const rows = ACTIVITIES.filter((a) => a.state === state);
          const sum = rows.reduce((t, a) => t + a.price, 0);
          const share = Math.round((sum / total) * 100);
          return (
            <Card key={state} pane={'sum-' + state.toLowerCase().replace(' ', '-')} className="p-4">
              <p className="text-muted m-0 text-[12.5px] font-semibold">{state}</p>
              <p className="text-ink m-0 mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.02em]">
                {usd(sum)}
              </p>
              <p className="m-0 mt-2.5 flex items-center gap-2">
                <Delta value={share} />
                <span className="text-muted text-[11.5px]">
                  {rows.length} of {ACTIVITIES.length}
                </span>
              </p>
            </Card>
          );
        })}
      </div>

      <div className="min-h-0 flex-1">
        <Activities query={query} onQuery={onQuery} />
      </div>
    </div>
  );
}
