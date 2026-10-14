/**
 * Black block, white italic wordmark, with the corners pooled in shadow so the
 * tile reads as rounded even before the squircle clip is applied.
 */
export function Kinetic() {
  return (
    <svg viewBox="0 0 256 256" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="kinetic-vignette" cx="0.5" cy="0.46" r="0.62">
          <stop offset="0" stopColor="#242424" />
          <stop offset="0.62" stopColor="#101010" />
          <stop offset="1" stopColor="#000000" />
        </radialGradient>
      </defs>

      <rect width="256" height="256" fill="url(#kinetic-vignette)" />

      <text
        x="128"
        y="128"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontFamily="'Geist Variable', ui-sans-serif, system-ui, sans-serif"
        fontSize="68"
        fontWeight="600"
        letterSpacing="-3"
        transform="skewX(-12) translate(27 0)"
      >
        kinetic
      </text>
    </svg>
  );
}
