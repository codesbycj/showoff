import { useDefIds } from '@/charts/ids';
import { Icon } from '@/components/Icon';
import { ACCOUNT, type PaymentCard } from '@/data/deck';
import { cx } from '@/lib/cx';

const TONES: Record<PaymentCard['tone'], { bg: string; fg: string; sub: string }> = {
  /* /85 rather than /75: at 75% the scheme line was 4.3:1 on the lime. */
  lime: { bg: 'bg-accent', fg: 'text-fill', sub: 'text-fill/85' },
  deep: { bg: 'bg-fill', fg: 'text-fill-fg', sub: 'text-fill-fg/70' },
  pale: { bg: 'bg-sunken-deep', fg: 'text-ink', sub: 'text-muted' },
};

/**
 * The card itself, drawn.
 *
 * A payment card is interface, not a photograph — it is vector art in every
 * real banking app, and that is the test rule 8 sets. The chip is four drawn
 * contacts rather than a traced EMV module, and the scheme mark is invented
 * along with everything else on the account.
 */
export function CardFace({ card, frozen }: { card: PaymentCard; frozen: boolean }) {
  const t = TONES[card.tone];
  const ids = useDefIds('sheen');

  return (
    <div
      data-cardface={card.id}
      className={cx(
        'relative flex aspect-[1.62/1] w-full max-w-[340px] flex-col justify-between overflow-hidden rounded-[18px] p-5 transition-opacity duration-300',
        t.bg,
        frozen && 'opacity-60',
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 340 210"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={ids.sheen} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="340" height="210" fill={`url(#${ids.sheen})`} />
        <circle cx="300" cy="190" r="92" fill="#ffffff" opacity="0.1" />
      </svg>

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className={cx('m-0 text-[11px] tracking-[0.1em] uppercase', t.sub)}>{card.scheme}</p>
          <p className={cx('m-0 mt-0.5 text-[16px] font-semibold', t.fg)}>{card.label}</p>
        </div>
        {frozen ? (
          <span
            className={cx(
              'inline-flex items-center gap-1.5 rounded-full bg-black/15 px-2.5 py-1 text-[11.5px] font-semibold',
              t.fg,
            )}
          >
            <Icon name="snowflake" size={13} />
            Frozen
          </span>
        ) : (
          /* Contactless: three arcs, which is the idea rather than a trace. */
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={t.fg}
          >
            <path
              d="M8 7.5a7 7 0 0 1 0 9M11.5 5.5a10.5 10.5 0 0 1 0 13M15 3.5a14 14 0 0 1 0 17"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      <div className="relative">
        {/* The chip. Four contacts on a rounded plate. */}
        <svg width="40" height="30" viewBox="0 0 40 30" aria-hidden="true" className="mb-3">
          <rect width="40" height="30" rx="6" fill="currentColor" className={t.fg} opacity="0.3" />
          <path
            d="M14 0v30M26 0v30M0 11h40M0 19h40"
            stroke="currentColor"
            className={t.fg}
            strokeWidth="1.4"
            opacity="0.5"
          />
        </svg>

        <p
          className={cx(
            'tnum m-0 flex items-center gap-3 text-[17px] font-semibold tracking-[0.12em]',
            t.fg,
          )}
        >
          <span aria-hidden="true">••••</span>
          <span aria-hidden="true">••••</span>
          <span aria-hidden="true">••••</span>
          <span>{card.last4}</span>
        </p>

        <div className="mt-3 flex items-end justify-between gap-3">
          <p className={cx('m-0 truncate text-[12.5px] font-medium', t.fg)}>{ACCOUNT.holder}</p>
          <p className={cx('tnum m-0 text-[12px]', t.sub)}>EXP {card.expiry}</p>
        </div>
      </div>
    </div>
  );
}
