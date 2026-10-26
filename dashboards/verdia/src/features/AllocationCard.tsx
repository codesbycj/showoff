import { useState } from 'react';

import { Donut } from '@/charts/Donut';
import { Card, CardHead } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { ALLOCATION } from '@/data/deck';
import { cx } from '@/lib/cx';

/** How the portfolio is split. The ring and the legend hover together. */
export function AllocationCard() {
  const [active, setActive] = useState<string | null>(null);
  const current = ALLOCATION.find((a) => a.id === active);

  return (
    <Card pane="allocation" className="min-h-0 p-5">
      <CardHead title="Allocation" icon={<Icon name="pie" size={16} />} />

      <div className="mt-2 flex min-h-0 flex-1 items-center justify-center">
        <Donut
          slices={ALLOCATION.map((a) => ({
            id: a.id,
            label: a.label,
            value: a.value,
            token: a.token,
          }))}
          size={156}
          thickness={20}
          sweep={360}
          from={-90}
          active={active}
          onActive={setActive}
          center={
            <div>
              <p className="tnum text-ink m-0 text-[22px] leading-none font-semibold">
                {current ? current.share + '%' : '100%'}
              </p>
              <p className="text-muted m-0 mt-1 text-[11.5px]">
                {current ? current.label : 'Invested'}
              </p>
            </div>
          }
        />
      </div>

      <ul className="m-0 mt-3 grid list-none grid-cols-1 gap-1 p-0">
        {ALLOCATION.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              data-legend={a.id}
              aria-pressed={active === a.id}
              /* Click only — see the note on the spending legend. */
              onClick={() => setActive((cur) => (cur === a.id ? null : a.id))}
              className={cx(
                'flex h-7 w-full items-center gap-2 rounded-lg px-1.5 text-left transition-opacity',
                active !== null && active !== a.id ? 'opacity-45' : 'opacity-100',
                active === a.id ? 'bg-sunken' : 'hover:bg-sunken',
              )}
            >
              <span
                aria-hidden="true"
                style={{ background: `var(${a.token})` }}
                className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
              />
              <span className="text-body min-w-0 flex-1 truncate text-[12.5px]">{a.label}</span>
              <span className="tnum text-ink shrink-0 text-[12.5px] font-semibold">{a.share}%</span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
