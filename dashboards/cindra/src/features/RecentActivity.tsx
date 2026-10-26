import { Avatar, Card, CardHead, Empty } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { ACTIVITY } from '@/data/deck';
import { FACES } from '@/data/faces';

const DAYS = ['Today', 'Yesterday'] as const;

/** Who did what, grouped by day. */
export function RecentActivity({ query }: { query: string }) {
  const q = query.trim().toLowerCase();
  const rows = ACTIVITY.filter((a) =>
    q ? (a.who + ' ' + a.what).toLowerCase().includes(q) : true,
  );

  return (
    <Card pane="activity" className="min-h-0 flex-1 p-4 pr-1.5">
      <CardHead
        className="pr-2.5"
        title="Recent Activity"
        action={<IconButton icon="dots-v" label="Activity options" />}
      />

      <div data-scroller="activity" className="scroll-region mt-2 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <Empty what="activity" query={query} />
        ) : (
          DAYS.map((day) => {
            const forDay = rows.filter((a) => a.day === day);
            if (forDay.length === 0) return null;
            return (
              <section key={day} className="mt-2 first:mt-0">
                <h3 className="text-ink m-0 py-1 text-[12px] font-bold">{day}</h3>
                <ul className="m-0 list-none p-0">
                  {forDay.map((a) => (
                    <li key={a.id}>
                      <div
                        data-row={a.id}
                        className="hover:bg-sunken/70 flex items-start gap-2.5 rounded-[10px] p-2 transition-colors"
                      >
                        <Avatar src={FACES[a.face]} name={a.who} size={28} className="mt-0.5" />
                        <span className="min-w-0 flex-1">
                          <span className="text-body block text-[11.5px] leading-[16px]">
                            <span className="text-ink font-bold">{a.who}</span> {a.what}
                          </span>
                          <span className="tnum text-muted mt-0.5 block text-[10.5px]">
                            {a.time}
                          </span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}
      </div>
    </Card>
  );
}
