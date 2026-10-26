import { useState } from 'react';

import { WeekBars } from '@/charts/WeekBars';
import { Badge, Card, CardHead, Meter } from '@/components/Bits';
import { Button, Segmented, Toggle } from '@/components/Controls';
import { Icon, type IconName } from '@/components/Icon';
import { CARDS, CURRENCIES, WEEKDAYS, cardSpent, cardWeek } from '@/data/deck';
import { CardBreakdownCard } from '@/features/CardBreakdownCard';
import { CardFace } from '@/features/CardFace';
import { CardSpendCard } from '@/features/CardSpendCard';
import { money } from '@/lib/money';

const CONTROLS: { id: string; label: string; note: string; icon: IconName }[] = [
  { id: 'contactless', label: 'Contactless', note: 'Tap to pay up to $120', icon: 'card' },
  { id: 'online', label: 'Online payments', note: 'Web and in-app purchases', icon: 'globe' },
  { id: 'atm', label: 'ATM withdrawals', note: 'Cash machines worldwide', icon: 'atm' },
  { id: 'abroad', label: 'Use abroad', note: 'Outside your home country', icon: 'lock' },
];

/**
 * The cards. Pick one, freeze it, change what it is allowed to do.
 *
 * The first build of this pane left three bands of empty card — the limit
 * block centred in a tall column, the controls list adrift at the bottom of
 * its own, and a spend list with nothing under it. The fix was not padding:
 * the week's bars went under the limit, the category breakdown went under the
 * controls, and the ledger grew to the length a real card's would be.
 */
export function CardsPane({ query }: { query: string }) {
  const [cardId, setCardId] = useState(CARDS[0].id);
  const [frozen, setFrozen] = useState<Record<string, boolean>>(
    Object.fromEntries(CARDS.map((c) => [c.id, c.frozen])),
  );
  const [controls, setControls] = useState<Record<string, boolean>>({
    contactless: true,
    online: true,
    atm: false,
    abroad: true,
  });

  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];
  const currency = CURRENCIES[0];
  const spent = cardSpent(card.id);
  const used = Math.round((spent / card.limit) * 100);
  const isFrozen = !!frozen[card.id];

  return (
    <div data-pane="cards" className="grid h-full grid-cols-[336px_1fr_1fr] gap-3.5">
      <div className="flex min-h-0 flex-col gap-3.5">
        <Card pane="card-picker" className="shrink-0 p-4">
          <Segmented
            name="card"
            value={cardId}
            options={CARDS.map((c) => ({ id: c.id, label: c.label }))}
            onChange={setCardId}
          />
          <div className="mt-3.5">
            <CardFace card={card} frozen={isFrozen} />
          </div>
          <div className="mt-3.5 flex items-center gap-2.5">
            <Button
              icon="snowflake"
              variant={isFrozen ? 'lime' : 'outline'}
              name="freeze"
              onClick={() => setFrozen((f) => ({ ...f, [card.id]: !f[card.id] }))}
            >
              {isFrozen ? 'Unfreeze' : 'Freeze card'}
            </Button>
            {isFrozen ? <Badge tone="danger">Payments blocked</Badge> : null}
          </div>
        </Card>

        <Card pane="limit" className="min-h-0 flex-1 p-5">
          <CardHead title="Monthly limit" icon={<Icon name="target" size={16} />} />
          <p className="m-0 mt-3 flex items-baseline justify-between gap-3">
            <span className="tnum text-ink text-[26px] leading-none font-semibold tracking-[-0.03em]">
              {money(spent, currency)}
            </span>
            <span className="tnum text-muted text-[13px]">
              of {money(card.limit, currency, false)}
            </span>
          </p>
          <Meter value={used} tone={used > 80 ? 'goal' : 'fill'} height={10} className="mt-3" />
          <p className="text-muted m-0 mt-2 mb-4 text-[12px]">
            {used}% used · {money(card.limit - spent, currency)} left this month
          </p>

          <WeekBars
            values={cardWeek(card.id)}
            labels={WEEKDAYS}
            format={(n) => money(n, currency)}
            label={`Spend on the ${card.label} card over the last seven days`}
          />
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-3.5">
        <Card pane="controls" className="shrink-0 p-5">
          <CardHead title="Card controls" icon={<Icon name="lock" size={16} />} />
          <ul className="m-0 mt-2 flex list-none flex-col gap-0.5 p-0">
            {CONTROLS.map((c) => (
              <li key={c.id}>
                <div className="hover:bg-sunken flex items-center gap-3 rounded-2xl p-2.5 transition-colors">
                  <span className="bg-sunken text-fill grid h-9 w-9 shrink-0 place-items-center rounded-full">
                    <Icon name={c.icon} size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-[13px] font-semibold">
                      {c.label}
                    </span>
                    <span className="text-muted block truncate text-[11.5px]">{c.note}</span>
                  </span>
                  <Toggle
                    name={c.id}
                    label={c.label}
                    on={!!controls[c.id] && !isFrozen}
                    onChange={(next) => setControls((cur) => ({ ...cur, [c.id]: next }))}
                  />
                </div>
              </li>
            ))}
          </ul>
          {isFrozen ? (
            <p className="bg-danger-soft text-danger m-0 mt-2 rounded-2xl px-3.5 py-2.5 text-[12px] font-medium">
              This card is frozen, so every control above is off until you unfreeze it.
            </p>
          ) : null}
        </Card>

        <CardBreakdownCard cardId={card.id} currency={currency} />
      </div>

      <CardSpendCard cardId={card.id} currency={currency} query={query} />
    </div>
  );
}
