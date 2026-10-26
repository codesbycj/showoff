import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

/**
 * The dark "More features?" card.
 *
 * Its button is the reference's only call to action and it goes nowhere in the
 * picture. Here it confirms in place and can be undone, because a primary
 * button that does nothing is the most conspicuous dead control on a page.
 */
export function PremiumCard({ taken, onTake }: { taken: boolean; onTake: () => void }) {
  return (
    <section
      data-card="premium"
      className="bg-rail flex shrink-0 items-center gap-4 rounded-[var(--radius-card)] px-5 py-4"
    >
      <span className="text-accent-soft shrink-0">
        <Icon name="diamond" size={26} strokeWidth={1.5} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-rail-fg m-0 text-[15px] font-bold">
          {taken ? 'Premium is on' : 'More features?'}
        </p>
        <p className="text-rail-fg/70 m-0 mt-0.5 text-[12px] leading-[16px]">
          {taken
            ? 'Unlimited pots, instant transfers and priority support.'
            : 'Update your account to premium to get more features'}
        </p>
      </div>

      <button
        type="button"
        data-action="premium"
        onClick={onTake}
        className={cx(
          'h-11 shrink-0 rounded-full px-5 text-[13.5px] font-bold transition-colors',
          taken
            ? 'bg-accent hover:bg-accent-deep text-white'
            : 'text-ink bg-white hover:bg-white/85',
        )}
      >
        {taken ? 'Premium active' : 'Go to premium'}
      </button>
    </section>
  );
}
