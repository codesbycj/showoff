/** IOTA, with the dot the studio sets between the last two letters. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline text-base tracking-[0.08em] ${className}`}>
      <span className="sr-only">IOTA — Architecture and Interiors</span>
      <span aria-hidden>IOT</span>
      <span aria-hidden className="mx-[0.12em] translate-y-[-0.25em] text-[0.5em]">
        ●
      </span>
      <span aria-hidden>A</span>
    </span>
  );
}
