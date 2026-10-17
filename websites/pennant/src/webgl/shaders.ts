/**
 * The displacement field, as GLSL.
 *
 * A full-screen triangle strip samples the video texture at a *displaced* uv.
 * Everything the hero does is in where that sample is taken from:
 *
 *   ambient   a slow sine drift on both axes, always on. 0.0013 of the frame,
 *             which is about two pixels, and is what stops a paused-looking
 *             video from looking paused.
 *   drag      the pointer's velocity, dragged into the fabric, falling off with
 *             distance and scaled by how long the pointer has been over it.
 *   pressure  a push directly away from the cursor, softened at the very centre
 *             so the point under the cursor is not a pinch.
 *   swirl     a perpendicular nudge — at `liquidness: 0.01` it is almost off.
 *   radial    a standing wave running out from the cursor, likewise almost off.
 *   ripple    a ring that leaves the click point and fades over 2.6s, up to
 *             four at a time.
 *
 * Two cheap decisions in here that matter more than they look:
 *
 *   * the `u_interactionActive` early-out. With the pointer away and no ripple
 *     alive, the whole interactive half is skipped and the fragment costs one
 *     texture read. It is why this can run at 1x on a laptop.
 *   * `edgeMask`. Every interactive term is multiplied by it, so displacement
 *     dies before it reaches the frame's edge and the clamped sample never
 *     smears the last row of pixels along the border.
 *
 * Transcribed from the reference's own shader for this study — see README.md.
 */

export const VERTEX_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SRC = `
precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_hover;
uniform float u_time;

uniform float u_idleRadius;
uniform float u_hoverRadius;
uniform float u_velocityGain;
uniform float u_ambientStrength;
uniform float u_ambientSpeed;
uniform vec2 u_ambientFrequency;
uniform float u_dragStrength;
uniform float u_dragVelocityStrength;
uniform float u_interactionDirection;
uniform float u_pressureStrength;
uniform float u_swirlStrength;
uniform float u_radialStrength;
uniform float u_radialFrequency;
uniform float u_radialSpeed;
uniform float u_uvClampInset;
uniform float u_edgeProtection;

uniform vec2 u_rippleOrigin[4];
uniform float u_rippleAge[4];
uniform float u_rippleStrength;
uniform float u_hasActiveRipple;
uniform float u_interactionActive;

varying vec2 v_uv;

const float RIPPLE_DURATION = 2.6;
const float RIPPLE_SPEED = 0.3;
const float RIPPLE_WIDTH = 0.2;

vec2 rippleDisplacement(vec2 uv, vec2 origin, float age) {
  if (age >= RIPPLE_DURATION) {
    return vec2(0.0);
  }

  vec2 delta = uv - origin;
  float dist = length(delta);
  float front = age * RIPPLE_SPEED;
  float envelope = 1.0 - smoothstep(0.0, RIPPLE_WIDTH, abs(dist - front));
  float fade = 1.0 - smoothstep(0.0, RIPPLE_DURATION, age);
  float wave = sin((dist - front) * 34.0);
  // Without this the origin itself would be yanked inside out on every click.
  float originProtection = smoothstep(0.035, RIPPLE_WIDTH * 0.72, dist);
  vec2 direction = delta / max(dist, RIPPLE_WIDTH * 0.45);

  return direction * originProtection * envelope * fade * wave;
}

void main() {
  vec2 uv = v_uv;

  vec2 ambient = vec2(
    sin((uv.y + u_time * u_ambientSpeed) * u_ambientFrequency.x),
    cos((uv.x - u_time * u_ambientSpeed * 0.72) * u_ambientFrequency.y)
  ) * u_ambientStrength;

  if (u_interactionActive < 0.5 && u_hasActiveRipple < 0.5) {
    vec2 idleUv = clamp(uv + ambient, vec2(u_uvClampInset), vec2(1.0 - u_uvClampInset));
    gl_FragColor = texture2D(u_texture, idleUv);
    return;
  }

  vec2 delta = uv - u_mouse;
  float dist = length(delta);
  float radius = mix(u_idleRadius, u_hoverRadius, u_hover);
  float falloff = smoothstep(radius, 0.0, dist);
  float centerSoftness = smoothstep(0.0, radius * 0.18, dist);
  float edgeMask =
    smoothstep(0.0, u_edgeProtection, uv.x) *
    smoothstep(0.0, u_edgeProtection, uv.y) *
    smoothstep(0.0, u_edgeProtection, 1.0 - uv.x) *
    smoothstep(0.0, u_edgeProtection, 1.0 - uv.y);
  float speed = min(length(u_velocity) * u_velocityGain, 1.0);

  vec2 drag =
    u_velocity * u_interactionDirection * falloff *
    (u_dragStrength + speed * u_dragVelocityStrength) * u_hover;

  vec2 swirl =
    vec2(-delta.y, delta.x) * falloff * speed * u_swirlStrength * u_hover;

  vec2 pressure =
    delta * falloff * centerSoftness * (0.65 + speed * 0.8) * u_pressureStrength * u_hover;

  vec2 radial =
    delta * sin(dist * u_radialFrequency - u_time * u_radialSpeed) *
    falloff * centerSoftness * u_radialStrength * 2.0 * u_hover;

  vec2 ripple = vec2(0.0);
  if (u_hasActiveRipple > 0.5) {
    ripple = (
      rippleDisplacement(uv, u_rippleOrigin[0], u_rippleAge[0]) +
      rippleDisplacement(uv, u_rippleOrigin[1], u_rippleAge[1]) +
      rippleDisplacement(uv, u_rippleOrigin[2], u_rippleAge[2]) +
      rippleDisplacement(uv, u_rippleOrigin[3], u_rippleAge[3])
    ) * u_rippleStrength;
  }

  vec2 displacement = ambient + (drag + pressure + swirl + radial + ripple) * edgeMask;
  vec2 sampleUv = clamp(uv + displacement, vec2(u_uvClampInset), vec2(1.0 - u_uvClampInset));

  gl_FragColor = texture2D(u_texture, sampleUv);
}
`;
