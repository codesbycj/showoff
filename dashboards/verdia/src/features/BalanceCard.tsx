import { useState } from 'react';

import { Badge, Card } from '@/components/Bits';
import { Button, IconButton } from '@/components/Controls';
import { Flag } from '@/components/Flag';
import { Icon } from '@/components/Icon';
import { ACCOUNT, CURRENCIES, type Currency, type CurrencyId } from '@/data/deck';
import { cx } from '@/lib/cx';
import { money } from '@/lib/money';

/**
 * The account card: the currency group, the account number, the balance, and
 * the two actions.
 *
 * The currency pills are decoration in the reference. Here they convert — the
 * balance, the transactions and the spending ring all restate — which is the
 * single most visible interaction on the pane and the one the take opens with.
 */
export function BalanceCard({
  currency,
  onCurrency,
}: {
  currency: Currency;
  onCurrency: (id: CurrencyId) => void;
}) {
  const [hidden, setHidden] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState<'transfer' | 'request' | null>(null);

  const shown = money(ACCOUNT.balance, currency);

  return (
    <Card pane="balance" className="relative overflow-hidden p-5">
      <div className="flex items-start justify-between gap-4">
        <div
          role="group"
          aria-label="Currency"
          data-group="currency"
          className="bg-sunken flex items-center gap-1 rounded-full p-1"
        >
          {CURRENCIES.map((c) => (
            <button
              key={c.id}
              type="button"
              data-segment={c.id}
              aria-pressed={currency.id === c.id}
              onClick={() => onCurrency(c.id)}
              className={cx(
                'flex h-9 items-center gap-2 rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-150',
                currency.id === c.id
                  ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(17_33_15/0.12)]'
                  : 'text-muted hover:text-ink',
              )}
            >
              {currency.id === c.id ? <Flag id={c.id} /> : null}
              {c.label}
            </button>
          ))}
        </div>

        <div className="text-right">
          <p className="text-muted m-0 text-[12px]">Account Number</p>
          <p className="m-0 mt-0.5 flex items-center justify-end gap-1.5">
            <span className="tnum text-ink text-[17px] font-semibold tracking-[-0.01em]">
              {ACCOUNT.number}
            </span>
            <button
              type="button"
              data-action="copy-account"
              aria-label={copied ? 'Account number copied' : 'Copy account number'}
              onClick={() => setCopied(true)}
              className={cx(
                'grid h-7 w-7 place-items-center rounded-full transition-colors',
                copied ? 'bg-accent text-fill' : 'text-muted hover:bg-sunken hover:text-ink',
              )}
            >
              <Icon name={copied ? 'check' : 'copy'} size={15} />
            </button>
          </p>
        </div>
      </div>

      <div className="mt-7">
        <p className="text-muted m-0 text-[13px]">Active Balance</p>
        <p className="m-0 mt-1.5 flex items-center gap-3">
          <span
            data-figure="balance"
            className="tnum text-ink text-[46px] leading-none font-semibold tracking-[-0.035em]"
          >
            {hidden ? '•'.repeat(Math.min(9, shown.length)) : shown}
          </span>
          <IconButton
            icon={hidden ? 'eye-off' : 'eye'}
            label={hidden ? 'Show balance' : 'Hide balance'}
            size={34}
            active={hidden}
            onClick={() => setHidden((v) => !v)}
          />
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2.5 pt-6">
        <Button
          icon="arrow-up-right"
          name="transfer"
          onClick={() => setSent((v) => (v === 'transfer' ? null : 'transfer'))}
        >
          Transfer Balance
        </Button>
        <Button
          icon="arrow-down-left"
          variant="outline"
          name="request"
          onClick={() => setSent((v) => (v === 'request' ? null : 'request'))}
        >
          Request Balance
        </Button>
        <IconButton icon="dots" label="More account actions" />
        {sent ? (
          <Badge tone="accent">{sent === 'transfer' ? 'Transfer drafted' : 'Request sent'}</Badge>
        ) : null}
      </div>

      {/*
        The lime disc in the reference's bottom-right corner. It is the card's
        own "open account" affordance, so it is a real control rather than an
        ornament — and it sits inside the padding rather than half off the
        card, which is where the board has it.
      */}
      <button
        type="button"
        data-action="open-account"
        aria-label="Open full account view"
        className="bg-accent text-fill hover:bg-accent-soft absolute right-5 bottom-5 grid h-[62px] w-[62px] place-items-center rounded-full transition-colors"
      >
        <Icon name="arrow-up-right" size={26} strokeWidth={1.8} />
      </button>
    </Card>
  );
}
