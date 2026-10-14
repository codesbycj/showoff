import * as THREE from 'three';

import { STRIP } from '@/motion/motion';
import { SURFACE } from './surface.glsl';

/**
 * Uniforms every card shares. One object per uniform, handed to every material,
 * so the strip writes the ribbon once per frame rather than once per card.
 */
export type SheetUniforms = {
  u_sheetW: THREE.IUniform<number>;
  u_sheetD: THREE.IUniform<number>;
  u_sheetT: THREE.IUniform<number>;
  u_sheetC: THREE.IUniform<number>;
  u_sheetV: THREE.IUniform<number>;
  u_sheetP: THREE.IUniform<number>;
  u_leanA: THREE.IUniform<number>;
  u_leanW: THREE.IUniform<number>;
  u_dent: THREE.IUniform<number>;
};

export const makeSheetUniforms = (): SheetUniforms => ({
  u_sheetW: { value: 1 },
  u_sheetD: { value: 0 },
  u_sheetT: { value: 1 },
  u_sheetC: { value: 1 },
  u_sheetV: { value: 0 },
  u_sheetP: { value: 1 },
  u_leanA: { value: 0 },
  u_leanW: { value: 1 },
  u_dent: { value: 0 },
});

const VERT = /* glsl */ `
  uniform vec2 u_res;   // the plane's world size

  varying vec2 vUv;
  varying vec3 vFlat;   // world position BEFORE anything displaced it

  ${SURFACE}

  void main() {
    vUv = uv;

    // The plane where the layout put it, undeformed. Affine in the plane's own
    // coordinates in all three components, which is the property being bought:
    // the interpolator reproduces it exactly and the fragment stage adds the
    // displacement back analytically instead of receiving a chorded version.
    vFlat = (modelMatrix * vec4(position, 1.0)).xyz;

    vec3 p = position;

    // The dent, in the plane's LOCAL space, before the model matrix. The plane
    // is only ever scaled in x and y, so a z written here passes through at
    // world scale — and the depth is taken off the card's own height so it
    // looks the same at any size rather than being a fixed number of units
    // against a card that halved.
    if (u_hover > 0.0001) {
      p.z -= u_hover * u_dent * u_res.y * dome_(uv);
    }

    vec4 w = modelMatrix * vec4(p, 1.0);

    w = sheet_(w);
    w = lean_(w);

    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D u_tex;
  uniform vec2 u_res;
  uniform float u_corner; // corner radius, world units
  uniform float u_shade;  // how much of the depth haze and sheen to apply

  varying vec2 vUv;
  varying vec3 vFlat;

  ${SURFACE}

  // Rounded corners as a signed distance, so the edge can be antialiased
  // against however many pixels the card happens to cover — which changes
  // constantly here, because the sweep is pushing it toward and away from
  // the camera.
  float roundedBox(vec2 p, vec2 half_, float r) {
    vec2 d = abs(p) - half_ + r;
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * u_res;
    float r = min(u_corner, min(u_res.x, u_res.y) * 0.5);
    float d = roundedBox(p, u_res * 0.5, r);

    // fwidth over the SDF, so the softness is one pixel wherever the card is.
    float aa = max(fwidth(d), 0.0001);
    float mask = 1.0 - smoothstep(-aa, aa, d);
    if (mask < 0.002) discard;

    vec3 col = texture2D(u_tex, vUv).rgb;

    if (u_shade > 0.001) {
      // Atmospheric perspective: whatever shape the surface takes, the parts
      // furthest from the camera sink toward the background. Not a black
      // multiply — it reads as distance rather than as a vignette.
      col = mix(col, vec3(HAZE), u_shade * HAZE_AMT * depth_(vFlat.x, vUv, u_res.y));

      // And the light on the surface. The point is put back where the vertex
      // stage actually left it, from the same closed form, so the view vector
      // is exact and the sheen cannot inherit a chord.
      vec3 at = vFlat + vec3(0.0, 0.0, offset_(vFlat.x, vUv, u_res.y));
      col = lit_(col, normal_(vFlat.x, vUv, u_res), normalize(cameraPosition - at), u_shade);
    }

    gl_FragColor = vec4(col, mask);
  }
`;

/** One plane, shared by every card. 24x24 is the reference's tessellation. */
export const CARD_GEOMETRY = new THREE.PlaneGeometry(1, 1, STRIP.segments, STRIP.segments);

export type Card = {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  /** Per-card, tweened by the hover. */
  hover: THREE.IUniform<number>;
  index: number;
};

export function makeCard(
  index: number,
  texture: THREE.Texture,
  shared: SheetUniforms,
  size: { w: number; h: number; corner: number },
): Card {
  const hover = { value: 0 };

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      ...shared,
      u_hover: hover,
      u_tex: { value: texture },
      u_res: { value: new THREE.Vector2(size.w, size.h) },
      u_corner: { value: size.corner },
      u_shade: { value: 1 },
    },
    transparent: true,
    // The strip is one surface drawn back to front by its own order. Depth
    // testing it would let a card that the sweep pushed nearer punch through
    // the neighbour it is supposed to sit behind.
    depthTest: false,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(CARD_GEOMETRY, material);
  mesh.scale.set(size.w, size.h, 1);
  // Nothing here is where its bounding box says it is — the surface moves every
  // vertex in the shader — so leave the culling to the strip's own wrap.
  mesh.frustumCulled = false;

  return { mesh, material, hover, index };
}
