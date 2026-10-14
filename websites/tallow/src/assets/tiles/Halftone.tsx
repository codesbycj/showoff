/**
 * A solid shape dissolving into a dot screen.
 *
 * Two layers under opposite masks of the same diagonal gradient: the solid disc
 * is strongest at the lower left and fades out, the dot field is masked by the
 * inverse so it takes over exactly where the solid lets go. The dots are a
 * tiled `<pattern>` of one circle rather than a few thousand elements.
 */
export function Halftone() {
  return (
    <svg viewBox="0 0 256 256" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="halftone-dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.7" fill="#2D1FE0" />
        </pattern>

        {/* White at the lower left, black at the upper right. */}
        <linearGradient id="halftone-ramp" x1="0.1" y1="1" x2="0.85" y2="0.05">
          <stop offset="0.1" stopColor="#FFFFFF" />
          <stop offset="0.72" stopColor="#000000" />
        </linearGradient>
        {/* ...and the same ramp the other way up. */}
        <linearGradient id="halftone-ramp-inv" x1="0.1" y1="1" x2="0.85" y2="0.05">
          <stop offset="0.22" stopColor="#000000" />
          <stop offset="0.95" stopColor="#FFFFFF" />
        </linearGradient>

        <mask id="halftone-solid">
          <rect width="256" height="256" fill="url(#halftone-ramp)" />
        </mask>
        <mask id="halftone-screen">
          <rect width="256" height="256" fill="url(#halftone-ramp-inv)" />
        </mask>

        <clipPath id="halftone-disc">
          <circle cx="118" cy="138" r="88" />
        </clipPath>
      </defs>

      <rect width="256" height="256" fill="#EFF0FB" />

      {/* The dot screen, spilling past the disc so it reads as the shape coming
          apart rather than as a texture sitting inside a circle. */}
      <rect width="256" height="256" fill="url(#halftone-dots)" mask="url(#halftone-screen)" />

      {/* The solid disc, fading out as the dots take over. */}
      <g clipPath="url(#halftone-disc)">
        <rect width="256" height="256" fill="#241AC4" mask="url(#halftone-solid)" />
      </g>

      {/* A denser rank of dots just inside the disc's lit edge. */}
      <g clipPath="url(#halftone-disc)">
        <rect
          width="256"
          height="256"
          fill="url(#halftone-dots)"
          mask="url(#halftone-solid)"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
