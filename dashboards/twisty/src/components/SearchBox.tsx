import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

/**
 * The top bar's search. It really filters -- on Home the project list, on
 * Projects the table, on Wallet the payouts -- because an interaction that does
 * nothing is the one thing that ruins a take (rule 5), and a search box is the
 * first thing a cursor reaches for.
 */
export function SearchBox({
  value,
  onChange,
  placeholder = 'Enter your search request...',
  width = 300,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  width?: number;
}) {
  return (
    <div
      style={{ width }}
      className="bg-surface relative flex h-11 items-center rounded-full pr-11 pl-5 transition-shadow focus-within:shadow-[0_0_0_2px_var(--color-spark-soft)]"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search projects, clients and payouts"
        data-search
        className={cx(
          // h-full, not just a line box: the pill is 44px tall and the input
          // was a 20px target inside it, which the probe catches and a pointer
          // finds the hard way.
          'text-ink h-full w-full border-0 bg-transparent text-[13px] outline-none',
          'placeholder:text-muted',
          // Safari and Chrome both draw their own clear control on type=search,
          // and it is 14px wide with no hover state. Ours is below.
          '[&::-webkit-search-cancel-button]:appearance-none',
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          data-search-clear
          className="text-muted hover:bg-sunken hover:text-ink absolute right-2 grid h-8 w-8 place-items-center rounded-full transition-colors"
        >
          <Icon name="close" size={15} />
        </button>
      ) : (
        <span className="text-muted absolute right-2 grid h-8 w-8 place-items-center">
          <Icon name="search" size={17} />
        </span>
      )}
    </div>
  );
}
