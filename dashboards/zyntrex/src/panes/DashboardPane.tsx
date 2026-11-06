import { useState } from 'react';

import { ValueChart } from '@/charts/ValueChart';
import { Badge, Card, CardHead, Delta, Empty } from '@/components/Bits';
import { PageHead } from '@/components/Chrome';
import { Button, Segmented } from '@/components/Controls';
import { AssetDisc, Icon } from '@/components/Icon';
import {
  ACCOUNT,
  ASOF,
  CASH,
  FILLS,
  FILL_TONE,
  GAINERS,
  GAINER_WINDOW,
  HOLDINGS,
  LEADER_WINDOWS,
  ORDERS,
  QUOTE,
  RANGES,
  WATCHED,
  assetOf,
  change24h,
  feeOf,
  freeValue,
  leaders,
  lockedValue,
  notionalOf,
  pairOf,
  series,
  shareOf,
  totalValue,
  valueOf,
  type Fill,
} from '@/data/deck';
import { cx } from '@/lib/cx';
import { pct, short, usd } from '@/lib/format';

/**
 * Dashboard — the dropped screen, built to the category standard.
 *
 * Assembly only (rule 4). Four things the reference leaves out are here
 * because an exchange home without them is lying: free against locked, the
 * window every "top" list is ranked over, the fee tier and open-order count,
 * and — the big one — a *recent transactions* table that is the account's own
 * fills rather than a second market table.
 */
type ActionId = 'deposit' | 'withdraw' | 'swap' | 'transfer';

interface Row {
  k: string;
  v: string;
  tone?: 'accent';
}

/** The resting state of the balance card: what the account is made of. */
const BALANCE_ROWS = (): Row[] => [
  { k: 'Available', v: usd(freeValue(), true) },
  { k: `On ${ORDERS.length} open orders`, v: usd(lockedValue(), true), tone: 'accent' },
  { k: `Cash, ${QUOTE}`, v: usd(CASH.free + CASH.locked, true) },
];

/**
 * What each action needs before it can happen. Deposit wants a network and an
 * address; withdraw is the irreversible one and says so; swap and transfer
 * both need two ends and a rate.
 */
const ACTIONS: Record<ActionId, Row[]> = {
  deposit: [
    { k: 'Network', v: ACCOUNT.chain, tone: 'accent' },
    { k: 'Address', v: '0x7f3b…4c2a' },
    { k: 'Minimum', v: `10 ${QUOTE}` },
  ],
  withdraw: [
    { k: 'Available', v: usd(freeValue(), true) },
    { k: 'Daily limit left', v: usd(250_000, false) },
    { k: 'Network fee', v: `0.8 ${QUOTE}` },
  ],
  swap: [
    { k: 'From', v: QUOTE },
    { k: 'To', v: 'BTC' },
    { k: 'Rate', v: assetOf('BTC').price.toFixed(2) },
  ],
  transfer: [
    { k: 'From', v: 'Spot' },
    { k: 'To', v: 'Margin' },
    { k: 'Transferable', v: usd(freeValue(), true) },
  ],
};

const ACTION_NOTE: Record<ActionId, string> = {
  deposit: 'Send only on this network. Anything else is lost.',
  withdraw: 'Whitelisted addresses only, and 2FA on every withdrawal.',
  swap: 'Quoted at the mid. The book may move before it settles.',
  transfer: 'Margin positions are liquidated independently of spot.',
};

export function DashboardPane({
  query,
  onOpenTrade,
}: {
  query: string;
  onOpenTrade: (symbol: string) => void;
}) {
  const [range, setRange] = useState('7d');
  const [leaderWindow, setLeaderWindow] = useState('week');
  const [side, setSide] = useState<'all' | 'buy' | 'sell'>('all');
  const [action, setAction] = useState<ActionId | null>(null);

  const q = query.trim().toLowerCase();
  const current = RANGES.find((r) => r.id === range) ?? RANGES[2];
  const points = series(current);

  const fills = FILLS.filter((f) => (side === 'all' ? true : f.side === side)).filter((f) =>
    q ? (f.symbol + ' ' + assetOf(f.symbol).name).toLowerCase().includes(q) : true,
  );

  const holdings = HOLDINGS.slice().sort((a, b) => valueOf(b) - valueOf(a));
  const total = totalValue();
  const delta = change24h();

  return (
    <div data-pane="dashboard" className="flex h-full flex-col">
      <PageHead
        title={`Good afternoon, ${ACCOUNT.name.split(' ')[0]}`}
        note={`${ACCOUNT.verified} · ${ACCOUNT.tier} · maker ${(ACCOUNT.makerFee * 100).toFixed(2)}% / taker ${(ACCOUNT.takerFee * 100).toFixed(2)}% · as of ${ASOF.time} ${ASOF.zone}`}
        action={
          <Badge tone="accent" dot>
            {ORDERS.length} open orders
          </Badge>
        }
      />

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_330px] gap-4">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <ul className="m-0 grid shrink-0 list-none grid-cols-4 gap-4 p-0">
            {WATCHED.map((symbol) => (
              <li key={symbol}>
                <PairCard symbol={symbol} onOpen={() => onOpenTrade(symbol)} />
              </li>
            ))}
          </ul>

          <div
            className="grid min-h-0 shrink-0 grid-cols-[300px_1fr] gap-4"
            style={{ height: 266 }}
          >
            <Card pane="leaders" className="min-h-0 p-4">
              <CardHead
                title="Market leaders"
                note="By traded volume"
                action={
                  <Segmented
                    name="leaderwindow"
                    size="sm"
                    value={leaderWindow}
                    options={LEADER_WINDOWS}
                    onChange={(id) => setLeaderWindow(id)}
                  />
                }
              />
              <Leaders windowId={leaderWindow} />
            </Card>

            <Card pane="value" className="min-h-0 p-4">
              <div className="flex shrink-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-muted block text-[12px]">Portfolio value</span>
                  <span className="tnum text-ink mt-1 block text-[27px] leading-none font-bold tracking-[-0.02em]">
                    {usd(total, true)}
                  </span>
                  <span className="mt-2 flex items-center gap-2">
                    <Delta value={Number(delta.toFixed(2))} />
                    <span className="text-muted text-[11.5px]">vs 24 hours ago</span>
                  </span>
                </div>
                <Segmented
                  name="range"
                  size="sm"
                  value={range}
                  options={RANGES}
                  onChange={(id) => setRange(id)}
                />
              </div>
              <div className="mt-2 flex min-h-0 flex-1">
                <ValueChart
                  points={points}
                  label={`Account value over the last ${current.label}, in US dollars, one point every ${current.step}`}
                />
              </div>
            </Card>
          </div>

          <Card pane="fills" className="min-h-0 flex-1 p-4">
            <CardHead
              title="Recent transactions"
              note="This account's own fills — side, size, fee and status"
              icon={<Icon name="list" size={16} />}
              action={
                <>
                  <Segmented
                    name="side"
                    size="sm"
                    value={side}
                    options={[
                      { id: 'all', label: 'All' },
                      { id: 'buy', label: 'Buys' },
                      { id: 'sell', label: 'Sells' },
                    ]}
                    onChange={(id) => setSide(id as 'all' | 'buy' | 'sell')}
                  />
                  <Badge>
                    {fills.length} of {FILLS.length}
                  </Badge>
                </>
              }
            />
            <div data-scroller="fills" className="scroll-region mt-2 min-h-0 flex-1">
              {fills.length ? (
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="text-muted text-[11px]">
                      <Th>Pair</Th>
                      <Th>Side</Th>
                      <Th align="right">Price</Th>
                      <Th align="right">Amount</Th>
                      <Th align="right">Total</Th>
                      <Th align="right">Fee</Th>
                      <Th align="right">Status</Th>
                      <Th align="right">Time</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {fills.map((f) => (
                      <FillRow key={f.id} fill={f} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <Empty what="fill" query={query || side} />
              )}
            </div>
          </Card>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <Card pane="balance" className="shrink-0 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted text-[12px]">My balance</span>
              <Badge>{ACCOUNT.chain}</Badge>
            </div>
            <span className="tnum text-ink mt-1.5 block text-[27px] leading-none font-bold tracking-[-0.02em]">
              {usd(total, true)}
            </span>

            {/*
              Free against locked. The reference shows one number, and the
              moment an order is open that number is not what you can spend.
            */}
            <dl className="border-line m-0 mt-2.5 rounded-[11px] border px-3 py-2">
              {(action ? ACTIONS[action] : BALANCE_ROWS()).map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-2 py-[3px]">
                  <dt className="text-muted m-0 truncate text-[11.5px]">{row.k}</dt>
                  <dd
                    className={cx(
                      'tnum m-0 shrink-0 text-[13.5px] font-bold',
                      row.tone === 'accent' ? 'text-accent-deep' : 'text-ink',
                    )}
                  >
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
            <span className="text-muted mt-1.5 block text-[10.5px]">
              {action
                ? ACTION_NOTE[action]
                : `${((lockedValue() / total) * 100).toFixed(1)}% of the account cannot be spent while those orders stand.`}
            </span>

            {/*
              Four controls that do something. The reference draws them and
              none of them moves a pixel, which is the one thing rule 5 is
              about: each opens what that action needs before it can happen.
            */}
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {(['deposit', 'withdraw', 'swap', 'transfer'] as const).map((id) => (
                <Button
                  key={id}
                  name={id}
                  icon={id}
                  size="sm"
                  variant={action === id ? 'solid' : 'outline'}
                  onClick={() => setAction(action === id ? null : id)}
                  className="w-full justify-center capitalize"
                >
                  {id}
                </Button>
              ))}
            </div>
          </Card>

          <Card pane="holdings" className="min-h-0 flex-1 p-4">
            <CardHead title="Top assets · holdings, largest first" />
            <div data-scroller="holdings" className="scroll-region mt-2 min-h-0 flex-1">
              <ul className="m-0 flex list-none flex-col p-0">
                {holdings.map((h) => {
                  const asset = assetOf(h.symbol);
                  return (
                    <li key={h.symbol}>
                      <button
                        type="button"
                        data-holding={h.symbol.toLowerCase()}
                        onClick={() => onOpenTrade(h.symbol)}
                        title={`Trade ${pairOf(h.symbol)}`}
                        className="hover:bg-sunken flex w-full items-center gap-2.5 rounded-[10px] px-1.5 py-[2px] text-left transition-colors"
                      >
                        <AssetDisc symbol={h.symbol} tint={asset.tint} size={26} />
                        <span className="min-w-0 flex-1">
                          <span className="text-ink block truncate text-[12px] font-bold">
                            {asset.name}
                          </span>
                          <span className="tnum text-muted block truncate text-[10.5px]">
                            {h.units} {h.symbol} · {shareOf(h).toFixed(1)}%
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="tnum text-ink block text-[12px] font-bold">
                            {usd(valueOf(h), true)}
                          </span>
                          <span
                            className={cx(
                              'tnum block text-[10.5px] font-semibold',
                              asset.h24 >= 0 ? 'text-positive' : 'text-danger',
                            )}
                          >
                            {pct(asset.h24, 2)}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>

          <Card pane="gainers" className="shrink-0 p-4">
            <CardHead title={`Top gainers · ${GAINER_WINDOW}`} />
            <ul className="m-0 mt-1 flex list-none flex-col p-0">
              {GAINERS.slice(0, 4).map((g) => (
                <li
                  key={g.symbol}
                  className="flex items-center gap-2.5 px-1.5 py-[3px] text-[12px]"
                >
                  <AssetDisc symbol={g.symbol} tint={g.tint} size={22} />
                  <span className="text-ink min-w-0 flex-1 truncate font-bold">{g.symbol}</span>
                  <span className="tnum text-muted w-[62px] shrink-0 text-right">
                    ${short(g.cap)}
                  </span>
                  <span className="tnum text-ink w-[58px] shrink-0 text-right font-semibold">
                    ${g.price.toFixed(2)}
                  </span>
                  <span className="tnum text-positive w-[56px] shrink-0 text-right font-semibold">
                    {pct(g.change, 2)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * One watched pair. The reference's own card, with the two things it is
 * missing: the quote currency, and the baseline the percentage is against
 * computed rather than captioned.
 */
function PairCard({ symbol, onOpen }: { symbol: string; onOpen: () => void }) {
  const asset = assetOf(symbol);
  const week = ((asset.price - asset.weekAgo) / asset.weekAgo) * 100;
  return (
    <button
      type="button"
      data-pair={symbol.toLowerCase()}
      onClick={onOpen}
      title={`Trade ${pairOf(symbol)}`}
      className="border-line bg-surface hover:border-accent-soft w-full rounded-[var(--radius-card)] border p-4 text-left shadow-[var(--shadow-card)] transition-colors"
    >
      <span className="flex items-center gap-2">
        <AssetDisc symbol={symbol} tint={asset.tint} size={24} />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[12.5px] font-bold">{asset.name}</span>
          <span className="tnum text-muted block truncate text-[10.5px]">{pairOf(symbol)}</span>
        </span>
      </span>
      <span className="tnum text-ink mt-2.5 block truncate text-[19px] leading-none font-bold">
        {asset.price < 10 ? asset.price.toFixed(4) : usd(asset.price, true)}
      </span>
      <span className="mt-2 flex items-center justify-between gap-2">
        <span className="text-muted text-[10.5px]">vs 7 days ago</span>
        <Delta value={Number(week.toFixed(2))} />
      </span>
    </button>
  );
}

/** The three assets carrying this desk's volume, as shares of the three. */
function Leaders({ windowId }: { windowId: string }) {
  const rows = leaders(windowId);
  const win = LEADER_WINDOWS.find((w) => w.id === windowId) ?? LEADER_WINDOWS[0];
  return (
    <div className="mt-2 flex min-h-0 flex-1 flex-col">
      <ul className="m-0 flex min-h-0 flex-1 list-none flex-col justify-between p-0">
        {rows.map((r) => (
          <li key={r.symbol}>
            <span className="flex items-center gap-2">
              <AssetDisc symbol={r.symbol} tint={r.tint} size={22} />
              <span className="text-ink min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                {r.name}
              </span>
              <span className="tnum text-ink shrink-0 text-[13px] font-bold">
                ${short(r.volume)}
              </span>
            </span>
            <span className="mt-1.5 flex items-center gap-2">
              <span className="bg-sunken block h-2 min-w-0 flex-1 rounded-full">
                <span
                  style={{ width: `${r.share}%`, background: r.tint }}
                  className="block h-full rounded-full transition-[width] duration-500"
                />
              </span>
              <span className="tnum text-muted w-[40px] shrink-0 text-right text-[10.5px]">
                {r.share.toFixed(1)}%
              </span>
              <span
                className={cx(
                  'tnum w-[46px] shrink-0 text-right text-[10.5px] font-semibold',
                  r.change >= 0 ? 'text-positive' : 'text-danger',
                )}
              >
                {pct(r.change, 1)}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <span className="text-muted tnum border-line mt-2 flex shrink-0 justify-between gap-2 border-t pt-2 text-[10.5px]">
        <span>{win.from}</span>
        <span>{win.to}</span>
      </span>
    </div>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      scope="col"
      className={cx(
        'border-line bg-surface sticky top-0 z-10 border-b px-2 py-2 font-semibold first:pl-1.5 last:pr-1.5',
        align === 'right' && 'text-right',
      )}
    >
      {children}
    </th>
  );
}

function FillRow({ fill: f }: { fill: Fill }) {
  const asset = assetOf(f.symbol);
  return (
    <tr data-fill={f.id} className="border-line hover:bg-sunken border-b transition-colors">
      <td className="px-2 py-2.5 pl-1.5">
        <span className="flex items-center gap-2">
          <AssetDisc symbol={f.symbol} tint={asset.tint} size={24} />
          <span className="min-w-0">
            <span className="tnum text-ink block truncate text-[12.5px] font-bold">
              {pairOf(f.symbol)}
            </span>
            <span className="text-muted block truncate text-[10.5px] capitalize">{f.kind}</span>
          </span>
        </span>
      </td>
      <td className="px-2 py-2.5">
        <span
          className={cx(
            'rounded-full px-2 py-[3px] text-[11px] font-bold capitalize',
            f.side === 'buy' ? 'bg-bid-wash text-bid' : 'bg-ask-wash text-ask',
          )}
        >
          {f.side}
        </span>
      </td>
      <td className="tnum text-ink px-2 py-2.5 text-right text-[12.5px] font-semibold">
        {f.price < 10 ? f.price.toFixed(4) : usd(f.price, true)}
      </td>
      <td className="tnum text-body px-2 py-2.5 text-right text-[12.5px]">
        {f.units} {f.symbol}
      </td>
      <td className="tnum text-ink px-2 py-2.5 text-right text-[12.5px] font-semibold">
        {usd(notionalOf(f), true)}
      </td>
      <td className="tnum text-muted px-2 py-2.5 text-right text-[12px]">
        {f.state === 'cancelled' ? '—' : usd(feeOf(f), true)}
      </td>
      <td className="px-2 py-2.5 text-right">
        <Badge tone={FILL_TONE[f.state]}>{f.state}</Badge>
      </td>
      <td className="tnum text-muted px-2 py-2.5 pr-1.5 text-right text-[12px]">{f.at}</td>
    </tr>
  );
}
