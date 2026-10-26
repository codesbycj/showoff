import { useState } from 'react';

import { Card, CardHead, Meter } from '@/components/Bits';
import { Button, IconButton } from '@/components/Controls';
import { ACCOUNT, TXNS, WALLETS, averages, walletFlow } from '@/data/deck';
import { euro, fig } from '@/lib/money';
import {
  ActivityPanel,
  AverageCard,
  HistoryTable,
  PromptCard,
  SummaryPanel,
} from '@/features/DashCards';

type SortKey = 'name' | 'stamp' | 'amount';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Two rows of `fr`, so the lower row takes whatever is left and the cards
 * reach the bottom of the shell at 900px and at 1080px alike.
 */
export function DashboardPane({
  query,
  masked,
  starred,
}: {
  query: string;
  masked: boolean;
  starred: boolean;
}) {
  const [tile, setTile] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [prompt, setPrompt] = useState(true);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const avg = averages();
  const walletMax = Math.max(
    ...WALLETS.map((w) => {
      const f = walletFlow(w.id);
      return starred ? f.in : f.in + f.out;
    }),
    1,
  );
  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) => (starred ? t.amount > 0 : true))
    .filter((t) => (q ? (t.name + ' ' + t.ref).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
      if (sort === 'amount') return (a.amount - b.amount) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="dashboard" className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[26px] leading-none font-bold tracking-[-0.03em]">
            Welcome back, {ACCOUNT.first}!
          </h2>
          <p className="text-muted m-0 mt-1.5 text-[12.5px]">
            Control your investment, income, and expenses.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <Button icon="filter" variant="outline" name="filters">
            Filters
          </Button>
          <Button icon="export" variant="outline" name="exports">
            Exports
          </Button>
          <Button
            icon={added ? 'check' : 'plus'}
            variant="accent"
            name="add-card"
            onClick={() => setAdded((v) => !v)}
          >
            {added ? 'Card added' : 'Add card'}
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.34fr] gap-4">
        <SummaryPanel masked={masked} />
        <ActivityPanel masked={masked} active={tile} onActive={setTile} />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.34fr] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <div className="grid shrink-0 grid-cols-2 gap-4">
            <AverageCard
              label="Weekly average"
              value={avg.weekly}
              delta={avg.weeklyDelta}
              masked={masked}
            />
            <AverageCard
              label="Annual average"
              value={avg.annual}
              delta={avg.annualDelta}
              masked={masked}
            />
          </div>
          {prompt ? <PromptCard onDismiss={() => setPrompt(false)} /> : null}
          {/*
            Not a filler: the first pass had a card here whose only content was
            a sentence explaining the toolbar, which is padding dressed as
            content. These are the three wallets, summed from the same ledger
            the table beside it lists.
          */}
          <Card pane="by-wallet" className="min-h-0 flex-1 p-4">
            <CardHead
              title="By wallet"
              action={
                <span className="text-muted text-[11.5px]">
                  {starred ? 'money in' : 'all rows'}
                </span>
              }
            />
            <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
              {WALLETS.map((w) => {
                const flow = walletFlow(w.id);
                const value = starred ? flow.in : flow.in + flow.out;
                return (
                  <li key={w.id} data-mark={'wallet-' + w.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-body text-[12px]">
                        {w.label} <span className="text-muted">· {flow.count}</span>
                      </span>
                      <span className="tnum text-ink text-[12px] font-bold">
                        {fig(euro(value), masked)}
                      </span>
                    </div>
                    <Meter
                      value={(value / walletMax) * 100}
                      tone="accent"
                      height={7}
                      className="mt-1.5"
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <Card pane="history" className="min-h-0 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title="Transactions history"
            action={<IconButton icon="sliders" label="History options" tone="outline" size={34} />}
          />
          <p className="text-muted m-0 mt-0.5 text-[11.5px]">Track your history.</p>
          <HistoryTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="history"
            masked={masked}
          />
        </Card>
      </div>
    </div>
  );
}
