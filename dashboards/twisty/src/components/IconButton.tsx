import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';

/**
 * A round control. 40px, which is also the smallest thing on these panes --
 * the reference's own circular buttons measure about 30px on its board, and a
 * 30px target is under every guideline there is. Scaling the board up to a real
 * 1440 viewport fixes it for free; see "Declared departures".
 */
export function IconButton({
  icon,
  label,
  onClick,
  tone = 'surface',
  size = 40,
  active = false,
  className,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  tone?: 'surface' | 'sunken' | 'ink';
  size?: number;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active || undefined}
      title={label}
      style={{ width: size, height: size }}
      className={cx(
        'grid shrink-0 place-items-center rounded-full transition-colors duration-150',
        tone === 'surface' && 'bg-surface text-body hover:bg-sunken hover:text-ink',
        tone === 'sunken' && 'bg-sunken text-body hover:bg-sunken-deep hover:text-ink',
        tone === 'ink' && 'bg-ink hover:bg-ink/85 text-white',
        active && tone !== 'ink' && 'bg-ink hover:bg-ink text-white hover:text-white',
        className,
      )}
    >
      <Icon name={icon} size={Math.round(size * 0.45)} />
    </button>
  );
}
