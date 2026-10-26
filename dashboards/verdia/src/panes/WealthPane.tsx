import { useState } from 'react';

import { Segmented } from '@/components/Controls';
import { CURRENCIES, type CurrencyId } from '@/data/deck';
import { AllocationCard } from '@/features/AllocationCard';
import { GoalsCard } from '@/features/GoalsCard';
import { HoldingsCard } from '@/features/HoldingsCard';
import { NetWorthCard } from '@/features/NetWorthCard';

/** The portfolio. Assembly only (rule 4). */
export function WealthPane({ query }: { query: string }) {
  const [currencyId, setCurrencyId] = useState<CurrencyId>('usd');
  const currency = CURRENCIES.find((c) => c.id === currencyId) ?? CURRENCIES[0];

  return (
    <div data-pane="wealth" className="flex h-full flex-col gap-3.5">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <p className="text-body m-0 text-[13.5px]">
          Everything you own, priced this morning and converted as you switch.
        </p>
        <Segmented
          name="wealth-currency"
          size="sm"
          value={currencyId}
          options={CURRENCIES.map((c) => ({ id: c.id, label: c.label }))}
          onChange={setCurrencyId}
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.58fr_1fr] grid-rows-[1fr_1.2fr] gap-3.5">
        <NetWorthCard currency={currency} />
        <AllocationCard />
        <HoldingsCard currency={currency} query={query} />
        <GoalsCard currency={currency} />
      </div>
    </div>
  );
}
