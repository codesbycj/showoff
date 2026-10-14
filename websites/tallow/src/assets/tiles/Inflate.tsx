/**
 * A glossy pale-blue block with an inflated ring sitting on it. The gloss is
 * stacked radial gradients rather than a bitmap: a broad top-left sheen, a
 * darker pool in the lower right, and on the ring itself a bright specular
 * band up one side and a contact shadow where it meets the ground.
 */
export function Inflate() {
  return (
    <svg viewBox="0 0 256 256" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="inflate-bg" x1="0.1" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#E3EFF7" />
          <stop offset="0.55" stopColor="#BED7E7" />
          <stop offset="1" stopColor="#93B6CE" />
        </linearGradient>

        <radialGradient id="inflate-sheen" cx="0.3" cy="0.2" r="0.6">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="inflate-pool" cx="0.8" cy="0.88" r="0.55">
          <stop offset="0" stopColor="#416A86" stopOpacity="0.5" />
          <stop offset="1" stopColor="#416A86" stopOpacity="0" />
        </radialGradient>

        {/* The ring's body: lit from the upper left, shaded at the lower right. */}
        <linearGradient id="inflate-ring" x1="0.15" y1="0.1" x2="0.8" y2="0.95">
          <stop offset="0" stopColor="#FFB169" />
          <stop offset="0.4" stopColor="#F2701A" />
          <stop offset="1" stopColor="#B33E06" />
        </linearGradient>
      </defs>

      <rect width="256" height="256" fill="url(#inflate-bg)" />
      <rect width="256" height="256" fill="url(#inflate-pool)" />
      <rect width="256" height="256" fill="url(#inflate-sheen)" />

      {/* Contact shadow, dropped and squashed so the ring sits on the surface. */}
      <ellipse cx="132" cy="186" rx="76" ry="22" fill="#2E5068" opacity="0.3" />

      {/* The ring itself: one thick stroked circle, so the hole stays a true
          circle at any size instead of being two paths that can drift apart. */}
      <circle cx="128" cy="124" r="62" fill="none" stroke="url(#inflate-ring)" strokeWidth="40" />

      {/* Rolled edges: a dark rim on the outside, a lighter one in the hole. */}
      <circle
        cx="128"
        cy="124"
        r="80"
        fill="none"
        stroke="#8F3104"
        strokeOpacity="0.35"
        strokeWidth="4"
      />
      <circle
        cx="128"
        cy="124"
        r="44"
        fill="none"
        stroke="#7C2B03"
        strokeOpacity="0.3"
        strokeWidth="5"
      />

      {/* Specular band, a clipped arc up the lit side. */}
      <path
        d="M78 96 A 62 62 0 0 1 150 66"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.72"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M168 158 A 62 62 0 0 1 120 186"
        fill="none"
        stroke="#FFD9B4"
        strokeOpacity="0.3"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
