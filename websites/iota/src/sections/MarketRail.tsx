import type { Ref } from 'react';

import { PlusButton } from '@/components/ui/PlusButton';
import { CATEGORIES, type Category } from '@/data/home';

/** The five markets as one strip, either driven by scroll or swiped by hand. */
export function MarketRail({
  trackRef,
  mode,
}: {
  trackRef?: Ref<HTMLDivElement>;
  mode: 'pinned' | 'free';
}) {
  const pinned = mode === 'pinned';

  return (
    <div
      data-rail
      aria-label="Markets"
      className={
        pinned
          ? 'pointer-events-none absolute inset-0 z-20'
          : 'snap-x snap-mandatory overflow-x-auto overscroll-x-contain'
      }
    >
      <div ref={trackRef} className={pinned ? 'flex h-full w-max' : 'flex w-max gap-px'}>
        {CATEGORIES.map((category) => (
          <MarketPanel key={category.id} category={category} pinned={pinned} />
        ))}
      </div>
    </div>
  );
}

/** One market: a photograph with a coloured caption block under it. */
function MarketPanel({ category, pinned }: { category: Category; pinned: boolean }) {
  return (
    <article
      className={`group flex shrink-0 flex-col ${
        pinned
          ? 'pointer-events-auto h-full w-[42vw] max-w-[640px] min-w-[320px]'
          : 'h-[75svh] w-[78vw] snap-start sm:w-[46vw]'
      }`}
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={category.image}
          alt={category.alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />

        {category.markets && (
          <ul className="text-paper absolute top-6 left-6 w-[min(16rem,60%)] space-y-1.5 text-xs">
            {category.markets.map((market) => (
              <li
                key={market}
                className="flex items-center justify-between gap-2 border-b border-white/25 pb-1.5"
              >
                {market}
                <span aria-hidden className="opacity-60">
                  +
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`flex items-end justify-between gap-6 p-6 ${category.tint}`}>
        <div>
          <PlusButton className="mb-8" />
          <h3 className="text-[clamp(1.25rem,2.2vw,2rem)] leading-tight font-light tracking-[-0.02em]">
            {category.name}
          </h3>
          <p className="mt-1 text-[0.6875rem] opacity-75">{category.index}</p>
        </div>
        <p className="max-w-[12ch] text-right text-[0.6875rem] leading-snug opacity-80">
          {category.caption}
        </p>
      </div>
    </article>
  );
}
