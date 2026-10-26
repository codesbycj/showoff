import { useState } from 'react';

import { useDefIds } from '@/charts/ids';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { REWARDS, type Currency } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';
import { num } from '@/lib/format';

/**
 * The lime rewards panel.
 *
 * Its own surface, not a `Card`: this block is the one piece of the design
 * that inverts, so it carries the lime ground and the deep green type rather
 * than the shared white card. The watermark star behind it is drawn as a
 * four-point superellipse rather than lifted as a bitmap, so it stays sharp at
 * any size and costs nothing.
 */
export function RewardsCard({ currency }: { currency: Currency }) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const ids = useDefIds('glow');
  const toggle = (k: string) => setHidden((h) => ({ ...h, [k]: !h[k] }));

  return (
    <section
      data-card="rewards"
      className="bg-accent relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] p-5"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -top-8 -right-6 h-[190px] w-[190px]"
      >
        <defs>
          <radialGradient id={ids.glow}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <path
          d="M100 8c6 50 36 80 86 86-50 6-80 36-86 86-6-50-36-80-86-86 50-6 80-36 86-86Z"
          fill={`url(#${ids.glow})`}
        />
      </svg>

      <div className="relative flex items-start justify-between gap-3">
        <span className="bg-fill text-fill-fg inline-flex h-9 items-center gap-2 rounded-full pr-2 pl-3.5 text-[13px] font-semibold tracking-[0.02em] uppercase">
          {REWARDS.tier}
          <span className="bg-accent text-fill grid h-6 w-6 place-items-center rounded-full">
            <Icon name="sparkle" size={13} strokeWidth={1.9} />
          </span>
        </span>
        <IconButton icon="dots" label="Rewards options" tone="on-lime" />
      </div>

      <div className="relative mt-7">
        <p className="text-fill/80 m-0 text-[13px]">Your Rewards</p>
        <p className="m-0 mt-1.5 flex flex-wrap items-center gap-2.5">
          <span
            data-figure="rewards"
            className="tnum text-fill text-[34px] leading-none font-semibold tracking-[-0.03em]"
          >
            {money(REWARDS.total, currency)}
          </span>
          <span className="bg-accent-faint text-accent-deep rounded-full px-2.5 py-1 text-[12px] font-semibold">
            +{REWARDS.delta}% this month
          </span>
        </p>
      </div>

      <div className="relative mt-auto grid grid-cols-2 gap-2.5 pt-6">
        <Tile
          name="points"
          label="Pennora Points"
          icon="star"
          value={num(REWARDS.points)}
          hidden={!!hidden.points}
          onToggle={() => toggle('points')}
        />
        <Tile
          name="vouchers"
          label="Vouchers"
          icon="ticket"
          value={num(REWARDS.vouchers)}
          hidden={!!hidden.vouchers}
          onToggle={() => toggle('vouchers')}
        />
      </div>
    </section>
  );
}

function Tile({
  name,
  label,
  icon,
  value,
  hidden,
  onToggle,
}: {
  name: string;
  label: string;
  icon: 'star' | 'ticket';
  value: string;
  hidden: boolean;
  onToggle: () => void;
}) {
  return (
    <div data-tile={name} className="bg-accent-soft rounded-2xl px-3.5 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-fill/80 m-0 truncate text-[12px]">{label}</p>
        <button
          type="button"
          onClick={onToggle}
          aria-label={hidden ? `Show ${label}` : `Hide ${label}`}
          aria-pressed={hidden}
          className={cx(
            'text-fill/75 hover:text-fill grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors',
            hidden && 'bg-accent text-fill',
          )}
        >
          <Icon name={hidden ? 'eye-off' : 'eye'} size={14} />
        </button>
      </div>
      <p className="m-0 mt-1 flex items-center gap-1.5">
        <Icon name={icon} size={15} className="text-fill shrink-0" />
        <span className="tnum text-fill text-[19px] leading-none font-semibold">
          {hidden ? '••••' : value}
        </span>
      </p>
    </div>
  );
}
