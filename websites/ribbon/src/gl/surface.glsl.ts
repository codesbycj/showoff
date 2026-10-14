import { LIGHT, SHEET } from '@/motion/motion';

const f = (n: number) => (Number.isInteger(n) ? n.toFixed(1) : String(n));

/**
 * The shared surface.
 *
 * Everything in here is written twice over, once for the vertex stage and once
 * for the fragment stage, and that is the whole design rather than an accident:
 *
 *  - the vertex stage moves 25x25 points and the GPU interpolates straight lines
 *    between them, so anything sent down as a varying arrives as the **chords**
 *    across the curve rather than the curve. On a shallow sweep under a tight
 *    specular that shows up as a ripple that crawls as the strip moves.
 *  - so the only thing handed down is `vFlat`, the plane's world position
 *    *before* any of this touched it. Every component of that is affine in the
 *    plane's own coordinates, which is exactly the case the interpolator
 *    reproduces perfectly.
 *  - the fragment stage then re-evaluates the displacement and the normal from
 *    the same closed form, per pixel. The normal never touches the mesh at all,
 *    so the 24 facets the plane is actually made of never appear.
 *
 * Which is possible because the surface is a height field with a closed form:
 * if you can write z as a function of x, you can write dz/dx too, and then the
 * normal is exact for free.
 */
export const SURFACE = /* glsl */ `
  const float PI_ = 3.141592653589793;

  // ── the sweep ──
  const float SHIFT = ${f(SHEET.shift)};
  const float TAIL  = ${f(SHEET.tail)};
  const float BANK  = ${f(SHEET.bank)};
  const float DIAG  = ${f(SHEET.diag)};
  const float WAVE  = ${f(SHEET.wave)};
  const float WAVE_F = ${f(SHEET.waveFreq)};
  const float WAVE_P = ${f(SHEET.wavePhase)};
  const float REAR_Y = ${f(SHEET.rearY)};
  const float REAR_Z = ${f(SHEET.rearZ)};
  const float VTWIST = ${f(SHEET.vTwist)};

  // ── the light ──
  const vec3  LIGHT_DIR = normalize(vec3(${LIGHT.dir.map(f).join(', ')}));
  const float LIGHT_GLOSS = ${f(LIGHT.gloss)};
  const float LIGHT_SPEC  = ${f(LIGHT.spec)};
  const float LIGHT_DIFF  = ${f(LIGHT.diff)};
  const float HAZE = ${f(LIGHT.haze)};
  const float HAZE_AMT = ${f(LIGHT.hazeAmount)};

  uniform float u_sheetW; // frustum half-width at z=0, world units
  uniform float u_sheetD; // depth of the sweep, world units
  uniform float u_sheetT; // how much of the profile fits across the frame
  uniform float u_sheetC; // 0 = symmetric bowl, 1 = the S
  uniform float u_sheetV; // smoothed scroll speed, 0..1
  uniform float u_sheetP; // the whole ribbon's master ease, 0..1
  uniform float u_leanA;  // depth at the frustum edge, world units
  uniform float u_leanW;  // frustum half-width, again — the hinge's own width
  uniform float u_hover;  // 0 at rest, 1 with the pointer on this card
  uniform float u_dent;   // dent depth, as a share of the card's height

  // Where across the frame a world x falls: -1 at the left edge, 0 in the
  // middle, +1 at the right — and smoothly past those, with no clamp anywhere.
  // Every term below carries the gaussian tail, so they all decay to flat off
  // frame on their own rather than being cut off at some edge.
  float q_(float wx) {
    return wx / max(u_sheetW, 0.0001) * u_sheetT + SHIFT;
  }

  // Two profiles, blended rather than branched so there is one derivative below
  // instead of two that can fall out of step.
  //
  // At 1 it is sin(PI q): zero at the centre and at both edges, with the near
  // peak and the far trough at the quarter points. At 0 it is a plain bowl.
  float shape_(float q) {
    return mix(1.0 - q * q, sin(PI_ * q), u_sheetC) * exp(-TAIL * q * q);
  }

  // Its exact slope, term for term — product rule over each profile, then the
  // same blend. Exact rather than approximated because the normal is built from
  // it, and an approximate normal under a gloss exponent shows instantly.
  float slope_(float q) {
    float g = exp(-TAIL * q * q);
    float bowl = -2.0 * q * (1.0 + TAIL * (1.0 - q * q));
    float ess = PI_ * cos(PI_ * q) - 2.0 * TAIL * q * sin(PI_ * q);
    return mix(bowl, ess, u_sheetC) * g;
  }

  float sweepZ_(float wx) {
    return -u_sheetD * shape_(q_(wx));
  }

  // The bank: the sweep's own derivative scaled into radians, so where the
  // ribbon dives hardest it leans hardest and the two can never disagree.
  //
  // Scaled by u_sheetC so the bank belongs to the S and vanishes with it — a
  // symmetric bowl has nothing to lean into, and banking it would tilt its two
  // halves opposite ways about a curve that is the same on both sides.
  float roll_(float wx) {
    if (u_sheetW < 0.001) return 0.0;
    return BANK * slope_(q_(wx)) / PI_ * u_sheetC * u_sheetP;
  }

  // The wind: a world point rolled about the ribbon's CENTRELINE, not about its
  // own centre. Every card has to turn about the same line or they wind
  // individually and the strip stops being one surface. That line is y = z = 0,
  // so the rotation is just (y, z) about the origin with x untouched — and x
  // being untouched is what lets the bend below read world x afterwards.
  vec4 wind_(vec4 w) {
    float a = roll_(w.x);

    // Speed wrings the two ends against each other: past the middle each side
    // twists the other way, hardest toward the frame's edges. Added to the same
    // angle rather than run as a second rotation, so the two compose exactly.
    if (u_sheetV > 0.001 && u_sheetW > 0.001 && u_sheetP > 0.001) {
      float qe = w.x / u_sheetW;
      a += VTWIST * u_sheetV * smoothstep(0.3, 0.9, abs(qe)) * sign(qe) * u_sheetP;
    }

    if (abs(a) < 0.0001) return w;

    float s = sin(a);
    float c = cos(a);
    return vec4(w.x, w.y * c - w.z * s, w.y * s + w.z * c, w.w);
  }

  // Everything the ribbon does to a world point, in the one order that
  // composes. Wind first, then bend: bending first would wind the bend instead
  // of the ribbon.
  vec4 sheet_(vec4 w) {
    w = wind_(w);
    w.z += sweepZ_(w.x) * u_sheetP;

    if (u_sheetW > 0.001) {
      float qw = w.x / u_sheetW;

      w.y += DIAG * w.x * u_sheetP;
      w.y += WAVE * u_sheetW * sin(PI_ * (qw * WAVE_F + WAVE_P)) * u_sheetP;

      // Speed makes the left of the ribbon lift and come nearer — the strip
      // rearing into the frame. The mask fades in left of centre, so the right
      // half stays seated and the movement has a fulcrum to turn about.
      if (u_sheetV > 0.001) {
        float m = 1.0 - smoothstep(-1.0, 0.3, qw);
        w.y += REAR_Y * u_sheetW * u_sheetV * m * u_sheetP;
        w.z += REAR_Z * u_sheetW * u_sheetV * m * u_sheetP;
      }
    }

    return w;
  }

  // The hinge the whole strip hangs off, applied last and in world space, so it
  // is one door under every card rather than a lean each plane takes alone.
  //
  // A smooth ramp, not a clamp: clamp(s,-1,1) has a corner at the ends, which is
  // a step in dz/dx, and under a tight gloss a step in the normal is a visible
  // vertical seam. s(1.5 - 0.5s^2) has the same value at the ends with zero
  // slope there, so the flat beyond the frustum edge is joined rather than hit.
  float leanRamp_(float s) {
    s = clamp(s, -1.0, 1.0);
    return s * (1.5 - 0.5 * s * s);
  }

  float leanSlope_(float s) {
    s = min(abs(s), 1.0);
    return 1.5 * (1.0 - s * s);
  }

  vec4 lean_(vec4 w) {
    if (u_leanW > 0.001 && u_sheetP > 0.001) {
      w.z += u_leanA * leanRamp_(w.x / u_leanW) * u_sheetP;
    }
    return w;
  }

  // ── the hover ──
  //
  // A product of two parabolas: 1 at the centre, exactly 0 along every edge.
  // That zero on the boundary is the whole point — the rim cannot move, so the
  // silhouette is untouched however deep the middle goes. Taken off uv rather
  // than off position so the fragment stage can reproduce it exactly.
  float dome_(vec2 uv) {
    vec2 q = uv * 2.0 - 1.0;
    return (1.0 - q.x * q.x) * (1.0 - q.y * q.y);
  }

  // Everything the vertex stage did to z, so the fragment stage can put a point
  // back where it actually ended up. z is the one component that is NOT affine
  // in the plane's coordinates, which is why it cannot come down as a varying.
  float offset_(float wx, vec2 uv, float resY) {
    float z = 0.0;
    if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) z += sweepZ_(wx) * u_sheetP;
    if (u_leanW > 0.001) z += u_leanA * leanRamp_(wx / u_leanW) * u_sheetP;
    if (u_hover > 0.0001) z -= u_hover * u_dent * resY * dome_(uv);
    return z;
  }

  // How deep into the sweep this point sits, 0 at the near crest and 1 in the
  // far trough. The dent counts toward it, normalised by the sweep's own range
  // so a card bowed as far back as the trough shades exactly as much as the
  // trough — no second constant to drift out of step.
  float depth_(float wx, vec2 uv, float resY) {
    if (u_sheetD < 0.001) return 0.0;

    float d = (u_sheetW > 0.001 && u_sheetP > 0.001)
      ? clamp((u_sheetD - sweepZ_(wx)) / (2.0 * u_sheetD), 0.0, 1.0) * u_sheetP
      : 0.0;

    if (u_hover > 0.0001) {
      d += (u_hover * u_dent * resY * dome_(uv)) / (2.0 * u_sheetD);
    }

    return clamp(d, 0.0, 1.0);
  }

  // The normal, analytically. dz/dx is three terms that simply add — the sweep,
  // the hinge, and the dome. Only the dome has a dz/dy, because the ribbon does
  // not bend along its own height.
  vec3 normal_(float wx, vec2 uv, vec2 res) {
    float dzdx = 0.0;
    float dzdy = 0.0;

    if (u_sheetW > 0.001 && u_sheetP > 0.001 && u_sheetD > 0.001) {
      dzdx += -u_sheetD * slope_(q_(wx)) * u_sheetT / u_sheetW * u_sheetP;
    }

    if (u_leanW > 0.001) {
      dzdx += (u_leanA / u_leanW) * leanSlope_(wx / u_leanW) * u_sheetP;
    }

    if (u_hover > 0.0001) {
      vec2 q = uv * 2.0 - 1.0;
      float a = u_hover * u_dent;
      dzdx += 4.0 * a * res.y * q.x * (1.0 - q.y * q.y) / max(res.x, 0.0001);
      dzdy += 4.0 * a * q.y * (1.0 - q.x * q.x);
    }

    vec3 n = normalize(vec3(-dzdx, -dzdy, 1.0));

    // Rolled with the surface. The height field describes the ribbon before it
    // was wound, so the normal has to take the same turn the vertices took —
    // otherwise the lit surface faces somewhere the drawn one does not, and a
    // gloss exponent finds that immediately.
    float a = roll_(wx);
    if (abs(a) > 0.0001) {
      float s = sin(a);
      float c = cos(a);
      n = vec3(n.x, n.y * c - n.z * s, n.y * s + n.z * c);
    }

    return n;
  }

  // The sheen. Wrapped rather than clamped diffuse: a hard terminator on a
  // surface this shallow puts a visible line across the card where dot()
  // crosses zero.
  vec3 lit_(vec3 col, vec3 n, vec3 v, float amt) {
    if (amt < 0.001) return col;
    float d = dot(n, LIGHT_DIR) * 0.5 + 0.5;
    col *= 1.0 - LIGHT_DIFF * amt * (1.0 - d);
    vec3 h = normalize(LIGHT_DIR + v);
    return col + pow(max(dot(n, h), 0.0), LIGHT_GLOSS) * LIGHT_SPEC * amt;
  }
`;
