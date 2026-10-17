import { useId } from 'react';

/**
 * The figure braced against the wall.
 *
 * Drawn here rather than traced: the reference's is its own illustration and
 * not something to lift. What is kept is the *pose*, because the pose is what
 * the motion is about -- both arms locked out, the body thrown back behind
 * them, the rear leg driving. That reads as someone applying force rather than
 * someone standing next to a black rectangle.
 *
 * Three things about the geometry are load-bearing:
 *
 * - **The hands sit on the right edge of the viewBox.** The leading palm is at
 *   x = VB_W, so anchoring this box's right edge to the wall puts the hands on
 *   the wall at any size, with no per-size nudging. The 4px clearance measured
 *   in the reference stills is applied once, outside, as a translate.
 *
 * - **The feet sit on the bottom edge**, for the same reason, against ground.
 *
 * - **Limbs are drawn as two strokes, not as outlines.** A thick dark stroke
 *   with a thinner light one laid over its centre leaves a constant-width
 *   contour down both sides of a tube, around corners included. Hand-drawing
 *   those contours as a closed path means mitring every joint by hand and
 *   getting a different line weight on the inside of each bend.
 *
 * Pattern ids go through `useId`. SVG ids are document-global, so a fixed one
 * would collide the moment this renders twice -- and the second instance would
 * silently take the first one's fill rather than erroring.
 */

const VB_W = 316;
const VB_H = 400;

/** The ink, and the two tube weights, in one place. */
const INK = '#121212';
const PAPER = '#ffffff';
const LIMB = { arm: 20, armIn: 12, leg: 27, legIn: 19 };

export function Figure({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const halftone = `ht-${uid}`;
  const denim = `dn-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* The shirt's tone. A dot screen rather than a flat grey, so the
            figure keeps its printed-line-art character at display size. */}
        <pattern id={halftone} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={PAPER} />
          <circle cx="4" cy="4" r="2.1" fill={INK} />
        </pattern>
        {/* A finer screen for the shorts, so the two garments separate without
            needing a second outline weight. */}
        <pattern id={denim} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill={PAPER} />
          <circle cx="4.5" cy="4.5" r="1.2" fill={INK} />
        </pattern>
      </defs>

      {/* Everything inherits these, so the whole figure is one weight of line
          and a change to it is one edit. */}
      <g stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* ---------------------------------------------------- rear limbs */}
        {/* Drawn first, so the torso overlaps them and reads as nearer. */}

        {/* Rear leg: the one doing the driving. Nearly straight, foot well back. */}
        <path d="M112 250 L64 308 L30 356" stroke={INK} strokeWidth={LIMB.leg} />
        <path d="M112 250 L64 308 L30 356" stroke={PAPER} strokeWidth={LIMB.legIn} />

        {/* Rear arm, a touch lower and shorter than the front one. */}
        <path d="M188 158 L248 154 L300 166" stroke={INK} strokeWidth={LIMB.arm} />
        <path d="M188 158 L248 154 L300 166" stroke={PAPER} strokeWidth={LIMB.armIn} />

        {/* --------------------------------------------------------- shorts */}
        {/* Sits on the pelvis and wraps the top of both thighs. Drawn before
            the legs so the leg tubes run out from underneath it. */}
        <path
          d="M104 232
             C124 244 142 254 156 258
             L150 300
             C140 302 126 300 116 294
             L108 274
             C100 282 92 286 84 286
             Z"
          fill={`url(#${denim})`}
        />

        {/* ----------------------------------------------------- front leg */}
        {/* Bent at the knee, taking the weight, foot forward. */}
        <path d="M138 292 L162 338 L196 366" stroke={INK} strokeWidth={LIMB.leg} />
        <path d="M138 292 L162 338 L196 366" stroke={PAPER} strokeWidth={LIMB.legIn} />

        {/* --------------------------------------------------------- torso */}
        {/* Shirt. The lean lives in the axis rather than in a rotation, so the
            shoulders and the hem stay square to the body. */}
        <path
          d="M166 124
             C190 130 212 148 222 170
             L158 262
             C132 252 106 236 92 220
             Z"
          fill={`url(#${halftone})`}
        />
        {/* Sleeve, cut back over the shoulder of the front arm. */}
        <path
          d="M200 142 C212 152 219 162 222 172 L196 186 C188 170 188 154 194 144 Z"
          fill={PAPER}
        />
        {/* Collar. */}
        <path d="M178 118 C188 126 194 132 198 140" fill="none" />

        {/* ----------------------------------------------------- front arm */}
        {/* Locked out, palm flat on the wall. */}
        <path d="M202 154 L254 144 L302 154" stroke={INK} strokeWidth={LIMB.arm} />
        <path d="M202 154 L254 144 L302 154" stroke={PAPER} strokeWidth={LIMB.armIn} />
        {/* The palms, squared off against the wall. Drawn as one block so the
            two arms land on the surface together. */}
        <path d="M296 140 L314 140 L314 176 L296 176 Z" fill={PAPER} />

        {/* ----------------------------------------------------------- head */}
        {/* Turned towards the wall, chin tucked. */}
        <path
          d="M190 66
             C218 58 242 74 244 100
             C246 124 228 142 204 144
             C182 146 166 130 164 108
             C162 86 172 72 190 66 Z"
          fill={PAPER}
        />
        {/* Ear. */}
        <path d="M182 102 C175 100 173 110 180 114" fill={PAPER} strokeWidth="4" />
        {/* Brow and eye, screwed up with the effort. */}
        <path d="M216 96 L234 100" fill="none" strokeWidth="5" />
        <path d="M219 112 C225 107 232 109 236 114" fill="none" strokeWidth="4" />
        {/* Mouth, set. */}
        <path d="M224 130 L237 128" fill="none" strokeWidth="4" />

        {/* ------------------------------------------------------------ cap */}
        <path
          d="M172 84
             C168 58 188 42 212 44
             C236 46 250 64 248 88
             C230 76 192 74 172 84 Z"
          fill={`url(#${halftone})`}
        />
        {/* Brim, over the wall-ward side. */}
        <path d="M246 86 C270 84 290 90 296 100 C286 108 260 106 244 98 Z" fill={INK} />
        {/* Button. */}
        <circle cx="210" cy="44" r="3.5" fill={INK} stroke="none" />

        {/* ---------------------------------------------------------- shoes */}
        {/* Rear foot, pushed back and up on the toe. */}
        <path
          d="M8 348 C17 341 31 341 40 348 L54 366 C57 373 52 380 43 380 L12 380 C3 380 0 371 4 362 Z"
          fill={PAPER}
        />
        <path d="M5 370 L54 370" fill="none" strokeWidth="4" />
        {/* Front foot, flat. */}
        <path
          d="M176 354 C187 347 201 349 210 358 L232 374 C239 380 234 390 225 390 L186 390 C175 390 170 379 175 368 Z"
          fill={PAPER}
        />
        <path d="M173 379 L234 379" fill="none" strokeWidth="4" />

        {/* ------------------------------------------------------- the effort */}
        {/* Three ticks off the shoulder. Small, and the only thing in the
            drawing that is not anatomy -- they carry the strain. */}
        <g strokeWidth="4" strokeLinecap="round">
          <path d="M146 86 L133 76" />
          <path d="M138 104 L123 101" />
          <path d="M144 122 L131 125" />
        </g>
      </g>
    </svg>
  );
}

/** The drawn aspect, for anything that has to reserve space for the figure. */
export const FIGURE_ASPECT = VB_W / VB_H;
