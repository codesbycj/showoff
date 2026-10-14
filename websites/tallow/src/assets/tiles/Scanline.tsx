/**
 * Rainbow CRT bands with a word knocked out of them. The bands are one
 * gradient; the horizontal rules over the top are what make it read as a
 * scanned signal rather than a smooth blend.
 */
const BANDS = [
  '#1B2EE8',
  '#1B8CE8',
  '#19D7C4',
  '#43D93F',
  '#D7E22B',
  '#F2912A',
  '#EE2E58',
  '#C32FD8',
  '#4A32E0',
];

export function Scanline() {
  return (
    <svg viewBox="0 0 256 256" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="scanline-bands" x1="0" y1="0" x2="0" y2="1">
          {BANDS.map((c, i) => (
            <stop key={c} offset={i / (BANDS.length - 1)} stopColor={c} />
          ))}
        </linearGradient>

        <radialGradient id="scanline-falloff" cx="0.5" cy="0.5" r="0.58">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.6" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.92" />
        </radialGradient>

        {/* The word is a hole in the bands, so the black behind shows through. */}
        <mask id="scanline-knockout">
          <rect width="256" height="256" fill="#FFFFFF" />
          <text
            x="128"
            y="130"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#000000"
            fontFamily="'Geist Variable', ui-sans-serif, system-ui, sans-serif"
            fontSize="42"
            fontWeight="800"
            letterSpacing="-1"
            transform="scale(1 1.5) translate(0 -43)"
          >
            DISPLACE
          </text>
        </mask>
      </defs>

      <rect width="256" height="256" fill="#050505" />
      <g mask="url(#scanline-knockout)">
        <rect width="256" height="256" fill="url(#scanline-bands)" />
        {/* The scan rules: a 4px rhythm of darkened lines across the bands. */}
        {Array.from({ length: 64 }, (_, i) => (
          <rect key={i} y={i * 4} width="256" height="1.4" fill="#000000" opacity="0.35" />
        ))}
      </g>
      <rect width="256" height="256" fill="url(#scanline-falloff)" />
    </svg>
  );
}
