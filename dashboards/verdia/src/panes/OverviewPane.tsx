import { useState } from 'react';

import { CURRENCIES, type CurrencyId } from '@/data/deck';
import { BalanceCard } from '@/features/BalanceCard';
import { EarningCard } from '@/features/EarningCard';
import { RewardsCard } from '@/features/RewardsCard';
import { SpendingCard } from '@/features/SpendingCard';
import { TransactionsCard } from '@/features/TransactionsCard';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Two rows of `fr`, not fixed heights: the lower row takes whatever is left,
 * so the three cards reach the bottom of the shell at 900px and at 1080px
 * alike. A fixed height here is how a dashboard ends up with a band of empty
 * canvas under its last card at one viewport and a scrollbar at another.
 */
export function OverviewPane({ query }: { query: string }) {
  const [currencyId, setCurrencyId] = useState<CurrencyId>('usd');
  const [pending, setPending] = useState<'open' | 'approved' | 'declined'>('open');
  const [selected, setSelected] = useState<string | null>(null);

  const currency = CURRENCIES.find((c) => c.id === currencyId) ?? CURRENCIES[0];

  return (
    <div
      data-pane="overview"
      className="grid h-full grid-cols-[1.52fr_1fr] grid-rows-[0.68fr_1fr] gap-3.5"
    >
      <BalanceCard currency={currency} onCurrency={setCurrencyId} />
      <RewardsCard currency={currency} />

      <div className="col-span-2 grid min-h-0 grid-cols-3 gap-3.5">
        <SpendingCard currency={currency} />
        <EarningCard currency={currency} />
        <TransactionsCard
          currency={currency}
          query={query}
          pending={pending}
          onAnswer={setPending}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
}
