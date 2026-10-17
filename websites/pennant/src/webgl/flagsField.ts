import { FIELD, FRAME_MS, RIPPLE, SMOOTHING, frameLerp } from '@/motion/motion';
import { FRAGMENT_SRC, VERTEX_SRC } from '@/webgl/shaders';

/**
 * The hero's canvas: a video uploaded as a texture every frame, sampled through
 * the displacement field in `shaders.ts`.
 *
 * Plain WebGL1 and about 200 lines, rather than three.js — there is one quad,
 * one texture and no scene graph, and a renderer would be 600KB to draw it.
 *
 * Three things in here are the difference between this and a toy:
 *
 *   * **the loop stops.** `requestAnimationFrame` is only re-armed while the
 *     pointer is moving, the hover is fading, velocity is still bleeding off,
 *     or a ripple is alive. When all of that settles the canvas redraws only
 *     when the *video* has a new frame, through `requestVideoFrameCallback`.
 *     An idle hero costs one draw per video frame, not one per display frame.
 *   * **`texSubImage2D` after the first upload.** Re-allocating the texture
 *     every frame is the single most expensive thing a video-to-GL loop can do;
 *     once the dimensions are known, the upload writes into the existing one.
 *   * **the frame delta is clamped to 8..50ms** before it feeds any lerp, so a
 *     background tab that returns after two seconds does not teleport the
 *     field.
 */
export type FlagsField = { destroy: () => void };

type Ripple = { x: number; y: number; startedAt: number };

const clamp = (lo: number, hi: number, v: number) => Math.max(lo, Math.min(hi, v));

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createFlagsField({
  host,
  canvas,
  video,
  quality = 1,
  onReady,
}: {
  host: HTMLElement;
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  quality?: number;
  onReady?: () => void;
}): FlagsField | null {
  const context = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance',
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  });
  if (!context) return null;
  // Re-bound as a narrowed const: the render loop below is a function
  // declaration, and TypeScript will not carry a narrowing from an outer `if`
  // into one of those.
  const gl = context;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
  const program = vs && fs ? gl.createProgram() : null;
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uMouse = u('u_mouse');
  const uVelocity = u('u_velocity');
  const uHover = u('u_hover');
  const uTime = u('u_time');
  const uHasRipple = u('u_hasActiveRipple');
  const uInteractive = u('u_interactionActive');
  const uRippleOrigin = Array.from({ length: RIPPLE.slots }, (_, i) => u(`u_rippleOrigin[${i}]`));
  const uRippleAge = Array.from({ length: RIPPLE.slots }, (_, i) => u(`u_rippleAge[${i}]`));

  const position = gl.getAttribLocation(program, 'a_position');
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!buffer || !texture) return null;

  gl.useProgram(program);
  gl.uniform1i(u('u_texture'), 0);
  gl.uniform1f(u('u_idleRadius'), FIELD.idleRadius);
  gl.uniform1f(u('u_hoverRadius'), FIELD.hoverRadius);
  gl.uniform1f(u('u_velocityGain'), FIELD.velocityGain);
  gl.uniform1f(u('u_ambientStrength'), FIELD.ambientStrength);
  gl.uniform1f(u('u_ambientSpeed'), FIELD.ambientSpeed);
  gl.uniform2f(u('u_ambientFrequency'), FIELD.ambientFrequency[0], FIELD.ambientFrequency[1]);
  gl.uniform1f(u('u_dragStrength'), FIELD.dragStrength);
  gl.uniform1f(u('u_dragVelocityStrength'), FIELD.dragVelocityStrength);
  gl.uniform1f(u('u_interactionDirection'), FIELD.interactionDirection);
  gl.uniform1f(u('u_pressureStrength'), FIELD.pressureStrength);
  gl.uniform1f(u('u_swirlStrength'), FIELD.swirlStrength);
  gl.uniform1f(u('u_radialStrength'), FIELD.radialStrength);
  gl.uniform1f(u('u_radialFrequency'), FIELD.radialFrequency);
  gl.uniform1f(u('u_radialSpeed'), FIELD.radialSpeed);
  gl.uniform1f(u('u_uvClampInset'), FIELD.uvClampInset);
  gl.uniform1f(u('u_edgeProtection'), FIELD.edgeProtection);
  gl.uniform1f(u('u_rippleStrength'), FIELD.rippleStrength);
  uRippleOrigin.forEach((loc) => gl.uniform2f(loc, 0.5, 0.5));
  uRippleAge.forEach((loc) => gl.uniform1f(loc, RIPPLE.slotSeconds));

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0]),
  );

  const pointer = { x: 0.5, y: 0.5 };
  const target = { x: 0.5, y: 0.5 };
  const velocity = { x: 0, y: 0 };
  const ripples: Ripple[] = Array.from({ length: RIPPLE.slots }, () => ({
    x: 0.5,
    y: 0.5,
    startedAt: -1,
  }));

  let hover = 0;
  let raf: number | null = null;
  let videoCb: number | null = null;
  let rect = host.getBoundingClientRect();
  let hasFreshVideoFrame = true;
  let hasDrawnOnce = false;
  let allocated = false;
  let texW = 0;
  let texH = 0;
  let lastVideoTime = -1;
  let pointerInside = false;
  let visible = 'hidden' !== document.visibilityState;
  let onScreen = true;
  let last = performance.now();

  const hasVideoFrameCb = typeof video.requestVideoFrameCallback === 'function';
  const nearlyStill = () => Math.hypot(velocity.x, velocity.y) < 5e-4;
  const rippleAlive = (now: number) =>
    ripples.some((r) => r.startedAt >= 0 && now - r.startedAt < RIPPLE.slotSeconds);

  const resize = () => {
    const box = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, quality);
    const w = Math.max(1, Math.round(box.width * dpr));
    const h = Math.max(1, Math.round(box.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };

  const toUv = (e: PointerEvent) => ({
    x: clamp(0, 1, (e.clientX - rect.left) / Math.max(rect.width, 1)),
    // GL's y runs the other way, and the texture is uploaded flipped.
    y: clamp(0, 1, 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)),
  });

  const wake = () => {
    if (raf === null && visible && onScreen) raf = requestAnimationFrame(frame);
  };
  const sleep = () => {
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  };

  function frame(now: number) {
    raf = null;
    if (!visible || !onScreen) return;

    const dt = clamp(SMOOTHING.dtClampMs[0], SMOOTHING.dtClampMs[1], now - last);
    const pointerRate = frameLerp(SMOOTHING.pointer, dt);
    const velocityRate = frameLerp(SMOOTHING.velocity, dt);
    const hoverRate = frameLerp(pointerInside ? SMOOTHING.hoverIn : SMOOTHING.hoverOut, dt);
    const decay = Math.pow(SMOOTHING.velocityDecay, dt / FRAME_MS);
    const prevX = pointer.x;
    const prevY = pointer.y;
    last = now;

    pointer.x += (target.x - pointer.x) * pointerRate;
    pointer.y += (target.y - pointer.y) * pointerRate;

    // Per-frame movement, re-based to a 60Hz frame so velocity means the same
    // thing at any refresh rate.
    const perFrame = FRAME_MS / dt;
    const instantX = (pointer.x - prevX) * perFrame;
    const instantY = (pointer.y - prevY) * perFrame;
    velocity.x = velocity.x * decay * (1 - velocityRate) + instantX * velocityRate;
    velocity.y = velocity.y * decay * (1 - velocityRate) + instantY * velocityRate;
    hover += ((pointerInside ? 1 : 0) - hover) * hoverRate;

    const freshFrame = hasVideoFrameCb ? hasFreshVideoFrame : video.currentTime !== lastVideoTime;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && (!hasDrawnOnce || freshFrame)) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (allocated && vw === texW && vh === texH) {
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);
      } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        allocated = true;
        texW = vw;
        texH = vh;
      }
      hasFreshVideoFrame = false;
      lastVideoTime = video.currentTime;
      if (!hasDrawnOnce) {
        hasDrawnOnce = true;
        onReady?.();
      }
    }

    const seconds = now * 0.001;
    gl.uniform2f(uMouse, pointer.x, pointer.y);
    gl.uniform2f(uVelocity, velocity.x, velocity.y);
    gl.uniform1f(uHover, hover);
    gl.uniform1f(uTime, seconds);

    const ripplesActive = rippleAlive(seconds);
    const interacting = pointerInside || hover > 5e-4 || !nearlyStill();
    gl.uniform1f(uHasRipple, ripplesActive ? 1 : 0);
    gl.uniform1f(uInteractive, interacting ? 1 : 0);
    ripples.forEach((r, i) => {
      const age =
        r.startedAt >= 0 ? clamp(0, RIPPLE.slotSeconds, seconds - r.startedAt) : RIPPLE.slotSeconds;
      gl.uniform2f(uRippleOrigin[i], r.x, r.y);
      gl.uniform1f(uRippleAge[i], age);
    });

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const settling =
      pointerInside ||
      hover > 0.015 ||
      Math.abs(target.x - pointer.x) > 5e-4 ||
      Math.abs(target.y - pointer.y) > 5e-4 ||
      !nearlyStill() ||
      ripplesActive;
    if (!hasVideoFrameCb || settling) wake();
  }

  const scheduleVideoFrame = () => {
    if (!hasVideoFrameCb || videoCb !== null) return;
    videoCb =
      video.requestVideoFrameCallback?.(() => {
        videoCb = null;
        hasFreshVideoFrame = true;
        wake();
        if (visible && onScreen) scheduleVideoFrame();
      }) ?? null;
  };
  const cancelVideoFrame = () => {
    if (videoCb !== null && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(videoCb);
    videoCb = null;
  };

  const onPointerMove = (e: PointerEvent) => {
    const uv = toUv(e);
    target.x = uv.x;
    target.y = uv.y;
    pointerInside = true;
    wake();
  };
  const onPointerDown = (e: PointerEvent) => {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const uv = toUv(e);
    const now = performance.now() * 0.001;
    // A free slot if there is one, otherwise the oldest ring in flight.
    const slot =
      ripples.find((r) => r.startedAt < 0 || now - r.startedAt >= RIPPLE.slotSeconds) ??
      ripples.reduce((oldest, r) => (r.startedAt < oldest.startedAt ? r : oldest));
    slot.x = uv.x;
    slot.y = uv.y;
    slot.startedAt = now;
    wake();
  };
  const onPointerLeave = () => {
    pointerInside = false;
    wake();
  };
  const onScroll = () => {
    rect = host.getBoundingClientRect();
  };
  const onVisibility = () => {
    visible = document.visibilityState !== 'hidden';
    if (visible && onScreen) {
      void video.play().catch(() => {});
      scheduleVideoFrame();
      last = performance.now();
      wake();
    } else {
      video.pause();
      sleep();
      cancelVideoFrame();
    }
  };

  const resizeObserver = new ResizeObserver(() => {
    onScroll();
    resize();
    wake();
  });
  const intersectionObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          ([entry]) => {
            onScreen = entry?.isIntersecting ?? true;
            onVisibility();
          },
          { root: null, rootMargin: '200px 0px', threshold: 0.01 },
        )
      : null;

  onScroll();
  resize();
  resizeObserver.observe(host);
  intersectionObserver?.observe(host);
  host.addEventListener('pointermove', onPointerMove);
  host.addEventListener('pointerdown', onPointerDown);
  host.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  void video.play().catch(() => {});
  scheduleVideoFrame();
  wake();

  return {
    destroy() {
      sleep();
      cancelVideoFrame();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
      host.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
