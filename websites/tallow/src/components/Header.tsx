/**
 * The floating chrome, matching the reference's framing: a pill carrying the
 * wordmark at one end, sign-in and a call to action at the other.
 */
export function Header() {
  return (
    <header className="px-gutter pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between py-5">
      <div className="pointer-events-auto flex items-center gap-4 rounded-2xl bg-white/70 py-3 pr-4 pl-5 backdrop-blur-md">
        <span className="font-sans text-xl font-semibold tracking-[-0.03em] italic">Tallow</span>
        <span className="flex flex-col gap-[3px]" aria-hidden="true">
          <span className="bg-ink-soft size-[3px] rounded-full" />
          <span className="bg-ink-soft size-[3px] rounded-full" />
          <span className="bg-ink-soft size-[3px] rounded-full" />
        </span>
      </div>

      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-white/70 p-2 backdrop-blur-md">
        <a href="#top" className="text-ink-soft hover:text-ink px-4 py-2 text-sm transition-colors">
          Sign in
        </a>
        <a
          href="#top"
          className="bg-ink text-paper rounded-xl px-4 py-2 text-sm transition-opacity hover:opacity-85"
        >
          Start free
        </a>
      </div>
    </header>
  );
}
