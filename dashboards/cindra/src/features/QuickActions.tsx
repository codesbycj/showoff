import { Card } from '@/components/Bits';
import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';

const ACTIONS: { id: string; label: string; icon: IconName }[] = [
  { id: 'topup', label: 'Top Up', icon: 'top-up' },
  { id: 'transfer', label: 'Transfer', icon: 'transfer' },
  { id: 'request', label: 'Request', icon: 'request' },
  { id: 'history', label: 'History', icon: 'history' },
];

/**
 * The four round actions.
 *
 * In the reference they are four icons with nothing behind them. Here each one
 * arms and the card says what it would do — the pane holds which is armed, so
 * the card reports upward rather than deciding (rule 4).
 */
export function QuickActions({
  armed,
  onArm,
}: {
  armed: string | null;
  onArm: (id: string | null) => void;
}) {
  const current = ACTIONS.find((a) => a.id === armed);

  return (
    <Card pane="quick" className="shrink-0 p-4">
      <ul className="m-0 flex list-none justify-between gap-2 p-0">
        {ACTIONS.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              data-quick={a.id}
              aria-pressed={armed === a.id}
              onClick={() => onArm(armed === a.id ? null : a.id)}
              className="group flex w-[52px] flex-col items-center gap-1.5"
            >
              <span
                className={cx(
                  'grid h-11 w-11 place-items-center rounded-[12px] transition-colors duration-150',
                  armed === a.id
                    ? 'bg-forest text-forest-fg'
                    : 'bg-sunken text-forest group-hover:bg-accent-soft',
                )}
              >
                <Icon name={a.icon} size={19} />
              </span>
              <span className="text-body text-[11px] font-semibold">{a.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <p data-quick-note className="text-muted m-0 mt-3 text-[11.5px]">
          <span className="text-ink font-bold">{current.label}</span> is ready — pick an account to
          continue.
        </p>
      ) : null}
    </Card>
  );
}
