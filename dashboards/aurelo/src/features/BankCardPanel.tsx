import { useDefIds } from '@/charts/ids';
import { Segmented } from '@/components/Controls';
import { ACCOUNT, CARDS, type BankCard } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * The card.
 *
 * Every line on it is full white, not white/85: at 85% the scheme line, the
 * dates and the available figure all measured 4.03:1 on this blue. The
 * hierarchy is carried by size and weight instead, which is where it should
 * have been.
 *
 * The reference's is a pale periwinkle with white type on it — about 2.4:1,
 * which is not readable — and it carries a real scheme's two interlocking
 * discs. Both are fixed: the ground is the deeper periwinkle so white type
 * clears 4.5:1, and the scheme mark is invented along with everything else on
 * the account. The pale tone survives as the sheen and the corner disc.
 *
 * A payment card is interface, so it is drawn (rule 8): the chip is four
 * contacts on a plate, not a traced EMV module.
 */
export function BankCardPanel({
  cardId,
  onCard,
}: {
  cardId: string;
  onCard: (id: string) => void;
}) {
  const card = CARDS.find((c) => c.id === cardId) ?? CARDS[0];

  return (
    <div data-card="bankcard" className="flex min-h-0 min-w-0 flex-col gap-3">
      <Segmented
        name="card"
        value={cardId}
        options={CARDS.map((c) => ({ id: c.id, label: c.label }))}
        onChange={onCard}
        className="self-start"
      />
      <Face card={card} />
    </div>
  );
}

/** Exported, because the Wallet tab shows the same face at a larger size. */
export function Face({ card }: { card: BankCard }) {
  const ids = useDefIds('sheen');

  return (
    <div
      data-cardface={card.id}
      className="bg-accent relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-5"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 420 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={ids.sheen} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="420" height="240" fill={`url(#${ids.sheen})`} />
        <circle cx="372" cy="214" r="110" fill="var(--color-accent-soft)" opacity="0.28" />
      </svg>

      <p className="relative m-0 text-[12px] tracking-[0.14em] text-white uppercase">
        {card.scheme}
      </p>

      <div className="relative">
        {/* The chip: four contacts on a rounded plate. */}
        <svg width="42" height="32" viewBox="0 0 42 32" aria-hidden="true">
          <rect width="42" height="32" rx="7" fill="#f0d79b" />
          <path d="M15 0v32M27 0v32M0 12h42M0 20h42" stroke="#b99b58" strokeWidth="1.5" />
        </svg>

        <p className="tnum relative m-0 mt-4 flex items-center gap-4 text-[19px] font-semibold tracking-[0.16em] text-white">
          <span aria-hidden="true">••••</span>
          <span aria-hidden="true">••••</span>
          <span aria-hidden="true">••••</span>
          <span>{card.last4}</span>
        </p>

        <p className="tnum m-0 mt-2.5 flex gap-5 text-[12.5px] text-white">
          <span>{card.from}</span>
          <span>{card.to}</span>
        </p>

        <div className="mt-3 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="m-0 truncate text-[15px] font-semibold text-white">{ACCOUNT.holder}</p>
            <p className="tnum m-0 mt-0.5 text-[12.5px] text-white">
              {usd(card.balance, true)} available
            </p>
          </div>

          {/*
            The scheme mark. Invented: one disc and one ring, offset — which is
            the idea of an interlocking pair without being anyone's actual mark.
          */}
          <svg width="58" height="26" viewBox="0 0 58 26" aria-hidden="true" className="shrink-0">
            <circle cx="13" cy="13" r="11" fill="#ffffff" opacity="0.9" />
            <circle
              cx="45"
              cy="13"
              r="11"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.4"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
