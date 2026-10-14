/**
 * One word, tiled past the edges of the block so it is always cut off. Each row
 * is nudged left by a different amount, which is what stops it reading as a
 * table and starts it reading as a texture.
 */
const ROWS = [
  { y: 24, dx: -34 },
  { y: 78, dx: -96 },
  { y: 132, dx: -12 },
  { y: 186, dx: -62 },
  { y: 240, dx: -120 },
];

export function Repeat() {
  return (
    <svg viewBox="0 0 256 256" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="repeat-bg" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#FF4A5C" />
          <stop offset="0.5" stopColor="#F5243A" />
          <stop offset="1" stopColor="#C8122A" />
        </linearGradient>

        <radialGradient id="repeat-sheen" cx="0.35" cy="0.2" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="256" height="256" fill="url(#repeat-bg)" />

      <g
        fill="#FFD9DD"
        fontFamily="'Geist Variable', ui-sans-serif, system-ui, sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-1"
        opacity="0.92"
      >
        {ROWS.map((r) => (
          <text key={r.y} x={r.dx} y={r.y} dominantBaseline="central">
            REPEAT REPEAT REPEAT
          </text>
        ))}
      </g>

      <rect width="256" height="256" fill="url(#repeat-sheen)" />
    </svg>
  );
}
