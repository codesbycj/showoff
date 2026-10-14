import gsap from 'gsap';
import * as THREE from 'three';

import { PROJECTS } from '@/data/projects';
import { CAMERA, HOVER, REDUCED, SHEET, STRIP, VELOCITY } from '@/motion/motion';
import { drawCover } from '@/textures/cover';
import { makeCard, makeSheetUniforms, type Card, type SheetUniforms } from './card';
import { layoutFloor, makeFloor } from './floor';

/** Where each card's title should sit on screen, so the DOM can follow it. */
export type TitleMark = { index: number; x: number; y: number; visible: boolean };

type Options = {
  canvas: HTMLCanvasElement;
  reduced: boolean;
  /** Decoded covers, in PROJECTS order. The strip cannot lay out without them. */
  covers: HTMLImageElement[];
  /**
   * Silhouette mode: flat white cards with all shading off.
   *
   * It exists for `tools/dent.js`. The claim being tested is that the hover
   * moves the middle of a card and not its outline, and with a photograph on it
   * that cannot be measured off a screenshot — the dent changes the shading, so
   * dark pixels near the edge cross any brightness threshold you pick and the
   * test reports an outline moving when only the light did.
   *
   * Strip the texture and the shading and the question becomes exact: a white
   * card on black, where the only thing that can change a pixel is geometry.
   * The dent must then produce **no** visible change at all.
   */
  silhouette?: boolean;
  onTitles: (marks: TitleMark[]) => void;
  onHover: (index: number | null) => void;
};

export class Strip {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private shared: SheetUniforms = makeSheetUniforms();
  private cards: Card[] = [];
  private floor = makeFloor();
  private raf = 0;
  private disposed = false;

  /** Frustum half-extent at z = 0, which every world size is measured against. */
  private halfW = 1;
  private halfH = 1;

  private cardW = 1;
  private cardH = 1;
  private pitch = 1;
  private span = 1;

  /** Where the strip is, where it is heading, and how fast it is going. */
  private offset = 0;
  private target = 0;
  private speed = 0;

  /** World units per CSS pixel, so input and velocity are both in real px. */
  private pxToWorld = 1;

  private pointer = new THREE.Vector2(-10, -10);
  private hovered: number | null = null;
  private dragging = false;
  private dragX = 0;
  private small = false;

  constructor(private o: Options) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: o.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 1);

    this.camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, CAMERA.near, CAMERA.far);
    this.camera.position.z = CAMERA.z;

    this.scene.add(this.floor);
    this.build();
    this.resize();

    window.addEventListener('resize', this.resize);
    o.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    o.canvas.addEventListener('pointerdown', this.onDown);
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
    o.canvas.addEventListener('pointerleave', this.onLeave);

    this.loop();
  }

  /** A 1x1 white texture, for silhouette mode. */
  private static flatTexture() {
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    const x = c.getContext('2d')!;
    x.fillStyle = '#fff';
    x.fillRect(0, 0, 1, 1);
    return c;
  }

  private build() {
    PROJECTS.forEach((project, i) => {
      const source = this.o.silhouette ? Strip.flatTexture() : drawCover(project, this.o.covers[i]);
      const texture = new THREE.CanvasTexture(source);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const card = makeCard(i, texture, this.shared, { w: 1, h: 1, corner: 0.02 });
      if (this.o.silhouette) card.material.uniforms.u_shade.value = 0;
      this.scene.add(card.mesh);
      this.cards.push(card);
    });
  }

  private resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.small = w < SHEET.breakpoint;

    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    // The frustum at z = 0, which is where the strip's planes sit before the
    // surface displaces them. Everything else is a share of this, so the whole
    // composition rescales as one piece instead of drifting apart.
    this.halfH = Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;
    this.halfW = this.halfH * this.camera.aspect;

    // Input arrives in CSS pixels and the strip lives in world units, so the
    // two need one honest conversion rather than a fudge factor per call site.
    // It also makes the velocity below a real px/s figure, which is the unit
    // the reference's `tanh(v / 550)` is calibrated in.
    this.pxToWorld = (this.halfW * 2) / w;

    this.cardW = this.halfW * 2 * (this.small ? STRIP.cardWSmall : STRIP.cardW);
    this.cardH = this.cardW / STRIP.cardAspect;
    this.pitch = this.cardW * (1 + STRIP.gap);
    this.span = this.pitch * PROJECTS.length;

    const corner = this.cardH * 0.045;
    for (const card of this.cards) {
      card.mesh.scale.set(this.cardW, this.cardH, 1);
      const u = card.material.uniforms;
      (u.u_res.value as THREE.Vector2).set(this.cardW, this.cardH);
      u.u_corner.value = corner;
    }

    layoutFloor(this.floor, this.halfW, this.halfH);
  };

  // ── input ───────────────────────────────────────────────────────────────

  /**
   * A gesture moves the strip by exactly as far as the gesture went.
   *
   * It is worth saying why there is no impulse-and-friction model here, because
   * the obvious one is wrong in a way that is invisible until you measure it:
   * accumulating input into a velocity that is added to the target every frame
   * and then damped by `v *= 0.92` does not move the strip by the input — it
   * moves it by the sum of a geometric series, 1/(1-0.92) = 12.5 times as far.
   * The strip felt fine and the ribbon tore itself apart, because the velocity
   * the surface was being handed was an order of magnitude past anything a hand
   * can produce. Target plus an eased follow has no such gain.
   */
  private push(px: number) {
    this.target += px * this.pxToWorld;
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    // Trackpads send horizontal deltas, wheels send vertical ones. Take
    // whichever is larger so both gestures drive the same axis.
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    this.push(d * STRIP.wheel);
  };

  private onDown = (e: PointerEvent) => {
    this.dragging = true;
    this.dragX = e.clientX;
  };

  private onMove = (e: PointerEvent) => {
    const r = this.o.canvas.getBoundingClientRect();
    this.pointer.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1,
    );

    if (!this.dragging) return;
    const dx = e.clientX - this.dragX;
    this.dragX = e.clientX;
    this.push(-dx * STRIP.drag);
  };

  private onUp = () => {
    this.dragging = false;
  };

  private onLeave = () => {
    this.pointer.set(-10, -10);
  };

  // ── the hover hit test ──────────────────────────────────────────────────

  /**
   * Which card is under the pointer.
   *
   * Deliberately NOT a raycast against the meshes: every vertex is moved by the
   * shader, so the CPU-side geometry the raycaster would test is nowhere near
   * where the card is actually drawn. The planes are axis-aligned rectangles on
   * z = 0 before the surface touches them, though, so the honest test is to put
   * the pointer's ray through that plane and ask which rectangle it lands in.
   *
   * It costs a hit of accuracy where the sweep has pushed a card far from its
   * flat position — but it is wrong in a way that is stable and symmetric,
   * where a stale raycast is wrong in a way that jitters as the strip moves.
   */
  private pick(): number | null {
    if (this.pointer.x < -1.5) return null;

    const x = this.pointer.x * this.halfW;
    const y = this.pointer.y * this.halfH;
    if (Math.abs(y) > this.cardH / 2) return null;

    for (const card of this.cards) {
      const cx = card.mesh.position.x;
      if (Math.abs(x - cx) <= this.cardW / 2) return card.index;
    }
    return null;
  }

  private setHover(next: number | null) {
    if (next === this.hovered) return;

    const tween = (card: Card, to: number, enter: boolean) => {
      gsap.to(card.hover, {
        value: to,
        duration: enter ? HOVER.dur : HOVER.outDur,
        ease: enter ? HOVER.ease : HOVER.outEase,
        overwrite: 'auto',
      });
    };

    if (this.hovered !== null) tween(this.cards[this.hovered], 0, false);
    if (next !== null) tween(this.cards[next], 1, true);

    this.hovered = next;
    this.o.onHover(next);
  }

  // ── the frame ───────────────────────────────────────────────────────────

  private loop = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);

    // The coast: the offset eases toward the target, which is what gives a
    // flick its run-on without inventing distance the gesture never asked for.
    const before = this.offset;
    this.offset += (this.target - this.offset) * STRIP.followEase;

    // Velocity, in CSS pixels **per frame** — not per second, which is the one
    // unit in this whole file that had to be worked out rather than read. The
    // reference normalises by 550, and 550 px/s is a slow drag: at that scale
    // every ordinary scroll saturates `tanh` and the ribbon tears itself into
    // cones. 550 px/*frame* is an enormous throw, which is what makes it a
    // sensible ceiling, and it puts a firm flick around 0.1–0.2 where the
    // deformation is strong and still coherent.
    //
    // Then shaped the reference's way: tanh so a hard flick saturates instead
    // of running away, multiplied by its own magnitude to keep the sign and
    // square the response, so a drift barely registers and only a deliberate
    // throw really answers.
    const raw = (this.offset - before) / this.pxToWorld;
    const norm = VELOCITY.norm;
    this.speed += (raw - this.speed) * VELOCITY.ease;
    const t = Math.tanh(this.speed / norm);
    const vel = t * Math.abs(t);

    this.layout();
    this.writeSheet(Math.min(1, Math.abs(vel)));

    if (!this.dragging) this.setHover(this.pick());

    this.renderer.render(this.scene, this.camera);
    this.reportTitles();
  };

  /**
   * Place the cards, wrapping each one around the strip's length.
   *
   * The wrap is per card rather than per strip, so there is no seam to cross and
   * no moment where the whole row jumps: a card that has passed the left margin
   * reappears a full span to the right while nothing is looking at it.
   */
  private layout() {
    const margin = this.halfW + this.cardW;
    for (const card of this.cards) {
      let x = card.index * this.pitch - this.offset;
      x = ((((x + margin) % this.span) + this.span) % this.span) - margin;
      card.mesh.position.x = x;
      // Nearer cards draw later, so the strip overlaps consistently as the
      // sweep pushes neighbours past one another.
      card.mesh.renderOrder = 10 + Math.round(100 - Math.abs(x));
    }
  }

  /** One write per frame for the whole ribbon, shared by every card. */
  private writeSheet(vel: number) {
    const u = this.shared;
    // The ribbon is off for reduced motion and below the breakpoint alike —
    // see SHEET.breakpoint for why a narrow screen gets a flat strip rather
    // than a gentler curve.
    const flat = this.o.reduced || this.small;

    u.u_sheetW.value = this.halfW;
    u.u_leanW.value = this.halfW;
    u.u_sheetT.value = SHEET.span;
    u.u_sheetC.value = SHEET.curve;
    u.u_sheetV.value = flat ? 0 : vel;
    u.u_sheetP.value = flat ? REDUCED.sheetP : 1;
    u.u_dent.value = this.o.reduced ? REDUCED.dent : HOVER.dent;

    // Depth grows with speed: the faster the strip is thrown, the harder the
    // ribbon dives.
    u.u_sheetD.value = this.halfW * SHEET.depth * (1 + SHEET.velDepth * vel);
    u.u_leanA.value = this.halfW * SHEET.door;
  }

  /**
   * Where each title should be drawn, in CSS pixels.
   *
   * The titles are DOM, not GL — real selectable text in the real font, which a
   * texture atlas of glyphs would not be. They are projected through the same
   * camera as the cards, from the card's bottom-left corner *after* the surface
   * has moved it, so a title stays pinned to a card that is bending.
   */
  private reportTitles() {
    const v = new THREE.Vector3();
    const marks: TitleMark[] = this.cards.map((card) => {
      v.set(card.mesh.position.x - this.cardW / 2, -this.cardH / 2, 0);
      v.z += this.sweepZ(v.x);
      v.project(this.camera);
      return {
        index: card.index,
        x: ((v.x + 1) / 2) * window.innerWidth,
        y: ((-v.y + 1) / 2) * window.innerHeight,
        visible: Math.abs(v.x) < 1.15,
      };
    });
    this.o.onTitles(marks);
  }

  /** The sweep's depth at a world x — the CPU's copy of the shader's `sweepZ_`. */
  private sweepZ(wx: number) {
    if (this.o.reduced || this.small) return 0;
    const u = this.shared;
    const q = (wx / Math.max(u.u_sheetW.value, 1e-4)) * u.u_sheetT.value + SHEET.shift;
    const shape = (1 - u.u_sheetC.value) * (1 - q * q) + u.u_sheetC.value * Math.sin(Math.PI * q);
    return -u.u_sheetD.value * shape * Math.exp(-SHEET.tail * q * q);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    this.o.canvas.removeEventListener('wheel', this.onWheel);
    this.o.canvas.removeEventListener('pointerdown', this.onDown);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    this.o.canvas.removeEventListener('pointerleave', this.onLeave);

    for (const card of this.cards) {
      gsap.killTweensOf(card.hover);
      card.material.uniforms.u_tex.value.dispose();
      card.material.dispose();
    }
    (this.floor.material as THREE.Material).dispose();
    this.floor.geometry.dispose();
    this.renderer.dispose();
  }
}
