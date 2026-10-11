/**
 * The wordmark: the driver's initials, drawn as geometry rather than set in a
 * typeface. A logo that waits for a webfont is a logo that is missing from
 * the first paint — which, on a page whose first paint is the whole point, is
 * the one place it cannot be missing from.
 *
 * The slant is a real skew on the group, not a chosen italic: there is no
 * italic cut of Anton, and a browser-synthesised oblique leans the strokes
 * without leaning the counters.
 */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 40" className={className} aria-label="Sem Veldkamp" role="img">
      <g transform="skewX(-10) translate(5 0)">
        {/* S */}
        <path
          d="M30 2H10.6C5.4 2 1.9 4.9 1.2 9.4l-.6 3.8c-.7 4.6 2 7.5 7.2 7.5h11.3c1.8 0 2.7 1 2.5 2.6l-.3 2.2c-.3 1.6-1.5 2.6-3.3 2.6H0.3L-0.7 38h20.1C24.6 38 28.1 35.1 28.8 30.6l.7-4.5c.7-4.6-2-7.5-7.2-7.5H11c-1.8 0-2.7-1-2.4-2.6l.2-1.5c.2-1.6 1.5-2.6 3.3-2.6h17.1L30 2Z"
          fill="currentColor"
        />
        {/* V */}
        <path d="M68 2h-9.4L46.4 26.3 41.9 2h-8.8l7.4 36h9.6L68 2Z" fill="var(--color-signal)" />
      </g>
    </svg>
  );
}
