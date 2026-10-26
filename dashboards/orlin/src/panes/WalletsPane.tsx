import { useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Badge, Card, CardHead, Meter } from '@/components/Bits';
import { Button } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { TXNS, WALLETS, walletFlow, walletTrail, type Wallet } from '@/data/deck';
import { HistoryTable } from '@/features/DashCards';
import { cx } from '@/lib/cx';
import { euro, fig, shortEuro } from '@/lib/money';

const DAY_TICKS = ['30d', '20d', '10d', 'Today'];

const TONE: Record<Wallet['tone'], string> = {
  accent: 'bg-accent-faint text-accent-deep',
  cocoa: 'bg-cocoa text-cocoa-fg',
  bone: 'bg-bone text-ink',
};

/**
 * Wallets.
 *
 * The reference's nav has a Wallets pill with a chevron and nothing behind it,
 * so this one is built out of the ledger it already has: every figure here is
 * summed from the same transactions the other two tabs list, which is why a
 * declined row shows up in all three places at once.
 */
export function WalletsPane({
  query,
  masked,
  starred,
}: {
  query: string;
  masked: boolean;
  starred: boolean;
}) {
  const [walletId, setWalletId] = useState(WALLETS[0].id);
  const [moved, setMoved] = useState(false);
  const [sort, setSort] = useState<'name' | 'stamp' | 'amount'>('stamp');
  const [desc, setDesc] = useState(true);

  const wallet = WALLETS.find((w) => w.id === walletId) ?? WALLETS[0];
  const flow = walletFlow(wallet.id);
  const trail = walletTrail(wallet.id);
  const pct = Math.round((wallet.balance / wallet.limit) * 100);

  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) => t.wallet === wallet.id)
    .filter((t) => (starred ? t.amount > 0 : true))
    .filter((t) => (q ? (t.name + ' ' + t.ref).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
      if (sort === 'amount') return (a.amount - b.amount) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const onSort = (key: 'name' | 'stamp' | 'amount') => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="wallets" className="grid h-full grid-cols-[300px_1fr] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <ul className="m-0 flex shrink-0 list-none flex-col gap-3 p-0">
          {WALLETS.map((w) => {
            const on = w.id === walletId;
            const wpct = Math.round((w.balance / w.limit) * 100);
            return (
              <li key={w.id}>
                <button
                  type="button"
                  data-wallet={w.id}
                  aria-pressed={on}
                  onClick={() => {
                    setWalletId(w.id);
                    setMoved(false);
                  }}
                  className={cx(
                    'w-full rounded-[var(--radius-card)] p-4 text-left transition-colors',
                    TONE[w.tone],
                    on && 'ring-cocoa ring-2',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[13px] font-bold">{w.label}</span>
                    <Icon name="wallet" size={16} />
                  </span>
                  <span className="tnum mt-2 block text-[21px] leading-none font-bold tracking-[-0.02em]">
                    {fig(euro(w.balance), masked)}
                  </span>
                  <span className="mt-1 block truncate text-[11px] opacity-75">{w.note}</span>
                  <span
                    className={cx(
                      'mt-2.5 block h-1.5 overflow-hidden rounded-full',
                      w.tone === 'cocoa' ? 'bg-white/20' : 'bg-black/10',
                    )}
                  >
                    <span
                      style={{ width: wpct + '%' }}
                      className={cx(
                        'block h-full rounded-full',
                        w.tone === 'cocoa' ? 'bg-accent' : 'bg-accent-deep',
                      )}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <Card pane="move" className="min-h-0 flex-1 justify-center p-4">
          <CardHead title="Move money" icon={<Icon name="arrow-up-right" size={16} />} />
          <p className="text-muted m-0 mt-2 text-[11.5px] leading-[16px]">
            {moved
              ? `Moved 500,00 into ${wallet.label}.`
              : `Top ${wallet.label} up from the account's spare balance.`}
          </p>
          <Button
            icon={moved ? 'check' : 'arrow-up'}
            variant={moved ? 'accent' : 'cocoa'}
            name="move"
            onClick={() => setMoved((v) => !v)}
            className="mt-3 w-full justify-center"
          >
            {moved ? 'Done' : 'Move 500,00'}
          </Button>
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <Card pane="wallet-detail" className="min-h-0 flex-[1.2] p-4">
          <CardHead
            title={wallet.label}
            icon={<Icon name="wallet" size={16} />}
            action={<Badge tone="accent">{pct}% of its ceiling</Badge>}
          />

          <div className="mt-3 grid shrink-0 grid-cols-3 gap-3">
            <Stat label="Balance" value={fig(euro(wallet.balance), masked)} />
            <Stat label="In" value={fig(euro(flow.in), masked)} />
            <Stat label="Out" value={fig(euro(flow.out), masked)} />
          </div>

          <Meter value={pct} tone="accent" height={8} className="mt-3 mb-2" />

          <AreaChart
            values={trail}
            ticks={DAY_TICKS}
            format={(n) => shortEuro(n)}
            label={`${wallet.label} balance over thirty days`}
          />
        </Card>

        <Card pane="wallet-rows" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <>
                On this wallet{' '}
                <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
              </>
            }
          />
          <HistoryTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="wallet-rows"
            masked={masked}
          />
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sunken rounded-[11px] p-3">
      <p className="text-muted m-0 text-[11px]">{label}</p>
      <p className="tnum text-ink m-0 mt-1 text-[17px] leading-none font-bold tracking-[-0.02em]">
        {value}
      </p>
    </div>
  );
}
