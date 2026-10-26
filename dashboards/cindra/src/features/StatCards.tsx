import { Card, Delta } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { STATS } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * The three figures across the top.
 *
 * `Delta` takes `goodWhen` rather than assuming up is green: the reference
 * paints a falling expense red, which says the opposite of what it means.
 */
export function StatCards() {
  return (
    <div className="grid shrink-0 grid-cols-3 gap-4">
      {STATS.map((s) => (
        <Card key={s.id} pane={'stat-' + s.id} className="p-4">
          <div className="flex items-start justify-between">
            <span className="bg-sunken text-forest grid h-9 w-9 place-items-center rounded-[10px]">
              <Icon name={s.icon} size={18} />
            </span>
            <IconButton icon="dots-v" label={s.label + ' options'} size={28} />
          </div>

          <p className="m-0 mt-3">
            <Delta value={s.delta} goodWhen={s.goodWhen} />
          </p>
          <p
            data-figure={s.id}
            className="tnum text-ink m-0 mt-1.5 text-[24px] leading-none font-extrabold tracking-[-0.03em]"
          >
            {usd(s.value)}
          </p>
          <p className="text-muted m-0 mt-1.5 text-[11.5px]">{s.label}</p>
        </Card>
      ))}
    </div>
  );
}
