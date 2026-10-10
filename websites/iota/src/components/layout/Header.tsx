import { Wordmark } from './Wordmark';

/** The fixed header. Its menu is disabled on purpose — this build is the home page only. */
export function Header({ hidden }: { hidden: boolean }) {
  return (
    <header
      className="text-paper pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 transition-opacity duration-500 md:px-10"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <Wordmark className="pointer-events-auto mix-blend-difference" />

      <button
        type="button"
        disabled
        title="Navigation is out of scope in this build"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-current/30 px-3.5 py-1.5 text-xs mix-blend-difference disabled:opacity-60"
      >
        Menu
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-px w-3.5 bg-current" />
          <span className="block h-px w-3.5 bg-current" />
        </span>
      </button>
    </header>
  );
}
