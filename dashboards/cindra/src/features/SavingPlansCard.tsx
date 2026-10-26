import { Card, CardHead, Meter } from '@/components/Bits';
import { Icon, type IconName } from '@/components/Icon';
import { PLANS, planTotal, type Plan } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const GLYPH: Record<Plan['icon'], IconName> = {
  shield: 'shield',
  palm: 'palm',
  house: 'house',
  car: 'car',
};

/**
 * Saving Plans.
 *
 * "Total Savings" is the plans, summed. The reference writes $84,500 over
 * three plans holding $15,250 between them, and its stat card above says
 * $56,000 for the same three — three different answers to one question.
 */
export function SavingPlansCard({
  selected,
  onSelect,
  onAdd,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
  onAdd: () => void;
}) {
  return (
    <Card pane="plans" className="min-h-0 flex-1 p-4 pr-1.5">
      <CardHead
        className="pr-2.5"
        title="Saving Plans"
        action={
          <button
            type="button"
            data-action="add-plan"
            onClick={onAdd}
            className="text-accent-deep hover:bg-accent-soft flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-bold transition-colors"
          >
            <Icon name="plus" size={13} strokeWidth={2.2} />
            Add Plan
          </button>
        }
      />

      <p className="m-0 mt-3 pr-2.5">
        <span className="text-muted block text-[11px]">Total Savings</span>
        <span
          data-figure="plans-total"
          className="tnum text-ink mt-0.5 block text-[19px] leading-none font-extrabold tracking-[-0.02em]"
        >
          {usd(planTotal())}
        </span>
      </p>

      <ul
        data-scroller="plans"
        className="scroll-region m-0 mt-3 flex min-h-0 flex-1 list-none flex-col gap-2 p-0 pr-2"
      >
        {PLANS.map((p) => {
          const pct = Math.round((p.saved / p.target) * 1000) / 10;
          const open = selected === p.id;
          return (
            <li key={p.id}>
              <button
                type="button"
                data-plan={p.id}
                aria-expanded={open}
                onClick={() => onSelect(open ? null : p.id)}
                className={cx(
                  'border-line w-full rounded-[11px] border p-2.5 text-left transition-colors',
                  open ? 'bg-sunken' : 'hover:bg-sunken/70',
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="bg-sunken-deep text-forest grid h-7 w-7 shrink-0 place-items-center rounded-full">
                    <Icon name={GLYPH[p.icon]} size={14} />
                  </span>
                  <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-bold">
                    {p.label}
                  </span>
                  <Icon name="dots-v" size={14} className="text-muted shrink-0" strokeWidth={1.8} />
                </span>

                <Meter value={pct} tone="accent" height={7} className="mt-2.5" />

                <span className="mt-2 flex items-baseline justify-between gap-2">
                  <span className="tnum text-ink text-[11.5px] font-bold">
                    {usd(p.saved)} <span className="text-muted font-medium">{pct}%</span>
                  </span>
                  <span className="tnum text-muted text-[11px]">Target: {usd(p.target)}</span>
                </span>

                {open ? (
                  <span className="text-body tnum mt-2 block text-[11px]">
                    {usd(p.target - p.saved)} to go.
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
