import * as THREE from 'three';

import { FLOOR } from '@/motion/motion';

/**
 * The grid the strip floats over.
 *
 * It exists to give the deformation somewhere to happen. On a flat black page a
 * card bending in depth is nearly unreadable — there is nothing for it to bend
 * *against*. A grid in perspective supplies a horizon and a sense of scale, and
 * the moment a card tips, it tips relative to something.
 *
 * Drawn analytically rather than as lines: a line mesh gives aliased, flickering
 * one-pixel strands as the camera moves, where a shader can measure how many
 * pixels a cell covers and widen its line to match.
 */
const VERT = /* glsl */ `
  varying vec2 vCell;

  void main() {
    vCell = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2 u_cells;  // how many cells across and back
  uniform float u_line;  // line weight, as a share of a cell
  uniform float u_alpha;
  uniform vec3 u_tint;

  varying vec2 vCell;

  void main() {
    vec2 g = vCell * u_cells;

    // Distance to the nearest gridline in cell units, divided by how fast the
    // cell coordinate is changing per pixel. That ratio is the line's width in
    // pixels, so a cell crushed to nothing by perspective fades out instead of
    // turning into a flickering strand.
    vec2 d = abs(fract(g - 0.5) - 0.5) / max(fwidth(g), 0.0001);
    float line = 1.0 - min(min(d.x, d.y), 1.0);

    // Fade with distance back, and again at the left and right edges, so the
    // grid dissolves into the background rather than ending on a cut.
    float back = 1.0 - smoothstep(0.04, 0.92, vCell.y);
    float sides = 1.0 - smoothstep(0.72, 1.0, abs(vCell.x - 0.5) * 2.0);

    float a = line * u_alpha * back * sides;
    if (a < 0.002) discard;

    gl_FragColor = vec4(u_tint, a);
  }
`;

export function makeFloor(): THREE.Mesh {
  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      u_cells: { value: new THREE.Vector2(FLOOR.wide * 8, FLOOR.run * 6) },
      u_line: { value: FLOOR.line },
      u_alpha: { value: FLOOR.alpha },
      u_tint: { value: new THREE.Color('#3b3b3b') },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.frustumCulled = false;
  return mesh;
}

/**
 * Lay the floor out for the current frustum: wide enough to reach past both
 * edges, running from under the strip to well behind it, and dropped below the
 * cards by a share of the frustum height so the strip reads as hanging above it.
 */
export function layoutFloor(mesh: THREE.Mesh, halfW: number, halfH: number) {
  const width = halfW * 2 * FLOOR.wide;
  const run = halfH * 2 * FLOOR.run;

  mesh.scale.set(width, run, 1);
  mesh.position.set(0, -halfH * (1 + FLOOR.drop), -run * 0.5 + halfH);
}
