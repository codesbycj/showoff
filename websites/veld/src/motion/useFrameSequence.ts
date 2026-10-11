/**
 * A frame sequence on a canvas, spun by how fast you are scrolling.
 *
 * This is not a scrub. A scrub maps scroll position to frame, so the helmet
 * would freeze the moment you stopped. Here the scroll feeds a *velocity*:
 * the sequence turns at `idleSpeed` frames a second on its own, gains
 * `velocityGain` frames a second for every pixel a second you scroll, reverses
 * when you scroll back, and is smoothed towards that target with an
 * exponential filter. Stop scrolling and it keeps turning; flick the wheel and
 * it spins up and settles.
 *
 * Three things here exist because of how badly a naive version behaves:
 *
 * - **Frames load in widening strides** — every 12th, then every 6th, 3rd,
 *   and finally all of them. A sequential load gives you eleven twelfths of a
 *   turn and then a jump; this gives a complete, coarse rotation almost at
 *   once that quietly gets smoother.
 * - **A frame that has not arrived falls back to the nearest one that has**,
 *   searching outward from the one wanted. Without it the canvas holds the
 *   last drawn frame and the motion stutters while loading.
 * - **It only runs while the band is on screen.** The ticker is added and
 *   removed by a ScrollTrigger, so an off-screen helmet costs nothing.
 */
import { useEffect, type RefObject } from 'react';

import { gsap } from './gsap';
import { TURNTABLE } from './motion';

type Options = {
  /** Bundled URLs, in order. */
  frames: string[];
  /** The element whose box the canvas is fitted to. */
  stage: RefObject<HTMLElement | null>;
  /** The band that decides when it runs. */
  section: RefObject<HTMLElement | null>;
  reduced: boolean;
};

export function useFrameSequence({ frames, stage, section, reduced }: Options) {
  useEffect(() => {
    const host = stage.current;
    const band = section.current;
    if (!host || !band || frames.length === 0) return;

    const count = frames.length;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('data-helmet-canvas', '');
    Object.assign(canvas.style, {
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      display: 'block',
    });
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const images = new Array<HTMLImageElement | undefined>(count);
    const ready = new Array<boolean>(count).fill(false);
    let loadedCount = 0;
    let allLoaded = false;
    let drawn = -1;
    let scale = 1;
    let rescale = true;

    const fit = (img: HTMLImageElement) => {
      rescale = false;
      scale = 1;
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h || !img.naturalWidth || !img.naturalHeight) return;
      // Never rasterise bigger than it is shown, and never above the DPR cap:
      // a 2x canvas of a 520px frame is already more than anyone can see.
      const dpr = Math.min(window.devicePixelRatio || 1, TURNTABLE.dprCap);
      const contain = Math.min(w / img.naturalWidth, h / img.naturalHeight, 1);
      scale = Math.min(contain * dpr, 1);
    };

    const draw = (index: number) => {
      const img = images[index];
      if (!ctx || !img || !ready[index] || (index === drawn && !rescale)) return;
      if (rescale) fit(img);
      const w = Math.max(1, Math.ceil(img.naturalWidth * scale));
      const h = Math.max(1, Math.ceil(img.naturalHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      drawn = index;
    };

    /** The wanted frame, or the nearest loaded one either side of it. */
    const nearestLoaded = (want: number) => {
      if (ready[want]) return want;
      for (let step = 1; step < count; step += 1) {
        const back = (want - step + count) % count;
        if (ready[back]) return back;
        const forward = (want + step) % count;
        if (ready[forward]) return forward;
      }
      return -1;
    };

    // Widening strides, de-duplicated, so the first pass covers the whole turn.
    const queue: number[] = [];
    if (reduced) {
      queue.push(0);
    } else {
      const seen = new Array<boolean>(count).fill(false);
      for (const stride of TURNTABLE.loadStrides) {
        for (let i = 0; i < count; i += stride) {
          if (!seen[i]) {
            seen[i] = true;
            queue.push(i);
          }
        }
      }
    }

    let next = 0;
    let cancelled = false;

    const loadOne = () => {
      if (cancelled || next >= queue.length) return;
      const index = queue[next];
      next += 1;
      const img = new Image();
      img.decoding = 'async';
      const settle = () => {
        if (cancelled) return;
        ready[index] = true;
        loadedCount += 1;
        if (loadedCount === count) allLoaded = true;
        if (drawn === -1) {
          const first = nearestLoaded(index);
          if (first !== -1) draw(first);
        }
        loadOne();
      };
      img.onload = () => (img.decode ? img.decode().then(settle).catch(settle) : settle());
      img.onerror = loadOne;
      img.src = frames[index];
      images[index] = img;
    };

    const startLoading = () => {
      for (let i = 0; i < Math.min(TURNTABLE.concurrency, queue.length); i += 1) loadOne();
    };

    // Position in frames, its velocity, and the direction to coast in.
    let position = 0;
    let speed = 0;
    let direction = 1;
    let lastScroll = window.scrollY;
    let running = false;

    const tick = (_time: number, delta: number) => {
      // Clamped: a tab that was backgrounded hands back a delta of seconds,
      // and the sequence would jump a dozen turns on the frame it resumes.
      const dt = Math.min(delta / 1000, 0.05);
      if (dt <= 0) return;

      const y = window.scrollY;
      const velocity = (y - lastScroll) / dt;
      lastScroll = y;
      if (Math.abs(velocity) > TURNTABLE.directionThreshold) direction = velocity > 0 ? 1 : -1;

      let target = direction * TURNTABLE.idleSpeed + velocity * TURNTABLE.velocityGain;
      target = Math.max(-TURNTABLE.maxSpeed, Math.min(TURNTABLE.maxSpeed, target));

      // Frame-rate independent exponential approach to the target speed.
      speed += (target - speed) * (1 - Math.exp(-dt / TURNTABLE.responsiveness));
      position = (((position + speed * dt) % count) + count) % count;

      const want = Math.round(position) % count;
      const index = allLoaded ? want : nearestLoaded(want);
      if (index !== -1) draw(index);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      lastScroll = window.scrollY;
      gsap.ticker.add(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(tick);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rescale = true;
        if (drawn !== -1) draw(drawn);
      }, TURNTABLE.resizeDebounce);
    };
    window.addEventListener('resize', onResize);

    const ctxGsap = gsap.context(() => {
      // Grows slightly across the band, which is what keeps it from reading
      // as a sticker pinned to the middle of the page.
      gsap.fromTo(
        canvas,
        { scale: TURNTABLE.grow.from, transformOrigin: '50% 50%' },
        {
          scale: TURNTABLE.grow.to,
          ease: 'none',
          scrollTrigger: {
            trigger: band,
            start: TURNTABLE.grow.start,
            end: TURNTABLE.grow.end,
            scrub: true,
            onToggle: (self) => (self.isActive ? start() : stop()),
          },
        },
      );
    }, section);

    startLoading();

    return () => {
      cancelled = true;
      stop();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      ctxGsap.revert();
      canvas.remove();
    };
  }, [frames, stage, section, reduced]);
}
