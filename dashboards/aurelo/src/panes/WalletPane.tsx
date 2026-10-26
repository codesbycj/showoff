import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { WeekBars } from '@/charts/WeekBars';
import { Avatar, Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Button, Segmented, Toggle } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { CARDS, CONTACT_SEED, RECURRING, WEEKDAYS, balanceTrail, cardWeek } from '@/data/deck';
import { FACES } from '@/data/faces';
import { Face } from '@/features/BankCardPanel';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

const AMOUNTS = [25, 50, 120, 400];

/**
 * Wallet: the cards, what is on them, what leaves them on a schedule, and
 * sending money to one of the people on the Home tab's strip.
 *
 * The reference has no screen behind its card, so this one is built out of
 * what the card implies — a balance that moves, a limit it sits inside, and
 * the standing payments that explain where it goes.
 */
export function WalletPane({
  query,
  cardId,
  onCard,
}: {
  query: string;
  cardId: string;
  onCard: (id: string) => void;
}) {
  const [recurring, setRecurring] = useState<Record<string, boolean>>(
    Object.fromEntries(RECURRING.map((r) => [r.id, r.on])),
  );
  const [payee, setPayee] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(AMOUNTS[1]);
  const [sent, setSent] = useState(false);

  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];
  const trail = useMemo(() => balanceTrail(card.id), [card.id]);
  const used = Math.round((card.balance / card.limit) * 100);

  const q = query.trim().toLowerCase();
  const bills = RECURRING.filter((r) => (q ? r.label.toLowerCase().includes(q) : true));
  const monthly = RECURRING.filter((r) => recurring[r.id]).reduce(
    (s, r) => s + (r.cadence === 'Weekly' ? r.amount * 4 : r.amount),
    0,
  );

  return (
    <div data-pane="wallet" className="grid h-full grid-cols-[340px_1.25fr_1fr] gap-3.5">
      <div className="flex min-h-0 flex-col gap-3.5">
        <Segmented
          name="card"
          value={cardId}
          options={CARDS.map((c) => ({ id: c.id, label: c.label }))}
          onChange={onCard}
          className="shrink-0 self-start"
        />

        {/*
          A flex column, not a plain div: `Face` fills its box with `flex-1`,
          and inside a non-flex parent that does nothing at all — the card then
          sits at its content height and leaves 370px of empty page under it.
          The aspect ratio is the other half of it: given the whole column the
          card stretched to 350x570, and a payment card is 1.6:1.
        */}
        <div className="flex aspect-[1.6/1] shrink-0 flex-col">
          <Face card={card} />
        </div>

        <Card pane="limit" className="min-h-0 flex-1 p-5">
          <CardHead title="Against its limit" />
          <p className="m-0 mt-3 flex items-baseline justify-between gap-3">
            <span className="tnum text-ink text-[25px] leading-none font-bold tracking-[-0.03em]">
              {usd(card.balance, true)}
            </span>
            <span className="tnum text-muted text-[13px]">of {usd(card.limit)}</span>
          </p>
          <Meter value={used} tone="accent" height={10} className="mt-3" />
          <p className="text-muted m-0 mt-2 mb-4 text-[12px]">
            {used}% of the limit · {usd(card.limit - card.balance)} of headroom
          </p>

          <WeekBars
            values={cardWeek(card.id)}
            labels={WEEKDAYS}
            format={(n) => usd(n, true)}
            label={`Spend on the ${card.label} card over the last seven days`}
          />
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-3.5">
        <Card pane="trail" className="min-h-0 flex-[1.3] p-5">
          <CardHead
            title="Balance, last 30 days"
            action={
              <Badge tone="accent">
                {trail[trail.length - 1] >= trail[0] ? 'Up' : 'Down'} on the month
              </Badge>
            }
          />
          <AreaChart
            values={trail}
            ticks={['30d', '20d', '10d', 'Today']}
            format={(n) => usd(n)}
            label={`Balance on the ${card.label} card over thirty days, ending at ${usd(card.balance, true)}`}
          />
        </Card>

        <Card pane="send" className="shrink-0 p-5">
          <CardHead title="Send money" />
          <div data-scroller="payees" className="scroll-row mt-3 flex gap-2.5 pb-1">
            {CONTACT_SEED.map((c, i) => (
              <button
                key={c.id}
                type="button"
                data-payee={c.id}
                aria-pressed={payee === c.id}
                title={c.name}
                onClick={() => {
                  setPayee(payee === c.id ? null : c.id);
                  setSent(false);
                }}
                className="shrink-0 rounded-full transition-transform duration-150 hover:-translate-y-0.5"
              >
                <Avatar
                  src={FACES[i % FACES.length]}
                  name={c.name}
                  size={44}
                  className={cx('ring-2', payee === c.id ? 'ring-accent' : 'ring-sunken')}
                />
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Segmented
              name="amount"
              size="sm"
              value={String(amount)}
              options={AMOUNTS.map((a) => ({ id: String(a), label: usd(a) }))}
              onChange={(id) => {
                setAmount(Number(id));
                setSent(false);
              }}
            />
            <Button
              icon="send"
              variant={payee ? 'solid' : 'outline'}
              name="send"
              onClick={() => payee && setSent((v) => !v)}
            >
              {sent ? 'Sent' : 'Send'}
            </Button>
          </div>

          <p data-send-note className="text-muted m-0 mt-3 text-[12.5px]">
            {!payee
              ? 'Pick someone above to send to.'
              : sent
                ? `${usd(amount)} on its way to ${CONTACT_SEED.find((c) => c.id === payee)?.name}.`
                : `Sending ${usd(amount)} to ${CONTACT_SEED.find((c) => c.id === payee)?.name} from ${card.label}.`}
          </p>
        </Card>
      </div>

      <Card pane="recurring" className="min-h-0 p-5 pr-2">
        <CardHead
          className="pr-3"
          title="Standing payments"
          action={<span className="tnum text-ink text-[13px] font-bold">{usd(monthly)}/mo</span>}
        />
        <p className="text-muted m-0 mt-1 mb-2 pr-3 text-[12.5px]">
          Switch one off and the monthly figure above follows it.
        </p>

        <div data-scroller="recurring" className="scroll-region min-h-0 flex-1 pr-2">
          {bills.length === 0 ? (
            <Empty what="standing payment" query={query} />
          ) : (
            <ul className="m-0 list-none p-0">
              {bills.map((r) => (
                <li key={r.id}>
                  <div className="hover:bg-sunken/70 flex items-center gap-3 rounded-2xl p-2.5 transition-colors">
                    <Mark name={r.mark} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[13px] font-bold">
                        {r.label}
                      </span>
                      <span className="text-muted block truncate text-[11.5px]">
                        {r.cadence} · next {r.next}
                      </span>
                    </span>
                    <span
                      className={cx(
                        'tnum shrink-0 text-[13px] font-bold transition-colors',
                        recurring[r.id] ? 'text-ink' : 'text-muted line-through',
                      )}
                    >
                      {usd(r.amount, true)}
                    </span>
                    <Toggle
                      name={r.id}
                      label={r.label}
                      on={!!recurring[r.id]}
                      onChange={(next) => setRecurring((cur) => ({ ...cur, [r.id]: next }))}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="bg-sunken text-body m-0 mt-2 mr-3 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-[12px]">
          <Icon name="repeat" size={15} className="text-accent shrink-0" />
          {RECURRING.filter((r) => recurring[r.id]).length} of {RECURRING.length} are active.
        </p>
      </Card>
    </div>
  );
}
