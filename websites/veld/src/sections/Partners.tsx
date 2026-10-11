import { useEffect, useRef, type RefObject } from 'react';

import { HELMET_FRAMES } from '@/assets/helmet';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { BgLines } from '@/components/ui/BgLines';
import { PARTNERS } from '@/data/home';
import { gsap } from '@/motion/gsap';
import { HELMET, TURNTABLE } from '@/motion/motion';
import { useFrameSequence } from '@/motion/useFrameSequence';
import { useMediaQuery } from '@/motion/useMediaQuery';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The helmet hanging over the partner wall — a 120-frame turntable on a
 * canvas, spun by scroll speed rather than scroll position.
 *
 * Two independent movements are stacked here and they are deliberately on
 * different elements. The canvas *rotates* (that is `useFrameSequence`, which
 * draws a frame). The stage it sits in *leans* towards the cursor and pops in
 * when the band arrives. Putting both on one element means the pop-in tween
 * and the lean's `quickTo` fight over the same transform; keeping the lean on
 * the parent lets them compose.
 *
 * The lean itself runs on two different lags — position catches up faster than
 * tilt — which is what reads as weight. `quickTo` reuses a single tween and
 * retargets it, so a pointermove costs almost nothing.
 */
function Helmet({ section }: { section: RefObject<HTMLElement | null> }) {
  const lean = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canHover = useMediaQuery(HELMET.activeQuery);
  const reduced = useReducedMotion();

  useFrameSequence({ frames: HELMET_FRAMES, stage, section, reduced });

  // Pop in as the band reaches the middle of the screen, and back out if you
  // scroll up past it again.
  useEffect(() => {
    const el = stage.current;
    const band = section.current;
    if (!el || !band) return;
    if (reduced) {
      gsap.set(el, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // A fromTo with toggleActions rather than a bare ScrollTrigger with
      // onEnter/onLeaveBack: the callback form only fires when the start line
      // is actually crossed, so landing on this band directly — a deep link,
      // a reload partway down, a refresh after the loader — leaves the helmet
      // parked at scale 0 forever. A tween knows its own state on refresh.
      gsap.fromTo(
        el,
        { scale: 0, transformOrigin: '50% 50%' },
        {
          scale: 1,
          duration: TURNTABLE.pop.duration,
          ease: TURNTABLE.pop.ease,
          scrollTrigger: {
            trigger: band,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, stage);

    return () => ctx.revert();
  }, [section, reduced]);

  useEffect(() => {
    const el = lean.current;
    if (!el || !canHover || reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { transformPerspective: HELMET.perspective, transformOrigin: '50% 50%' });

      const xTo = gsap.quickTo(el, 'x', { duration: HELMET.lagMove, ease: HELMET.ease });
      const yTo = gsap.quickTo(el, 'y', { duration: HELMET.lagMove, ease: HELMET.ease });
      const rx = gsap.quickTo(el, 'rotationX', { duration: HELMET.lagTilt, ease: HELMET.ease });
      const ry = gsap.quickTo(el, 'rotationY', { duration: HELMET.lagTilt, ease: HELMET.ease });

      const onMove = (e: PointerEvent) => {
        const u = e.clientX / window.innerWidth - 0.5;
        const v = e.clientY / window.innerHeight - 0.5;
        xTo(u * HELMET.moveMax * 2);
        yTo(v * HELMET.moveMax);
        ry(u * HELMET.tiltMax * 2);
        rx(-v * HELMET.tiltMax);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      return () => window.removeEventListener('pointermove', onMove);
    }, lean);

    return () => ctx.revert();
  }, [canHover, reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
      <div ref={lean} className="relative">
        <div
          ref={stage}
          className="grid h-[19rem] w-[19rem] place-items-center lg:h-[30rem] lg:w-[30rem]"
        />
      </div>
    </div>
  );
}

/** One flank of the wall: a 2x3 block of names, hugging its outer edge. */
function LogoColumn({ names, align }: { names: readonly string[]; align: 'start' | 'end' }) {
  return (
    <div
      className={[
        'col-span-1 grid grid-cols-2 gap-x-6 gap-y-12 lg:col-span-4',
        align === 'end' ? 'lg:col-start-9' : '',
      ].join(' ')}
    >
      {names.map((name, i) => (
        <div
          key={name}
          data-reveal="fade"
          data-reveal-delay={(i % 3) * 0.06}
          className={[
            'font-display text-h4 flex items-center opacity-70',
            align === 'end' ? 'justify-end text-right' : 'justify-start text-left',
          ].join(' ')}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

export function Partners() {
  const section = useRef<HTMLElement>(null);

  return (
    <section
      ref={section}
      id="partners"
      // Deliberately not `data-overlap`. Riding a band up over its
      // predecessor only reads when the two have different backgrounds — the
      // film band over the sponsor guide, say. Both this and the statement
      // above it are white, so a 40vh overlap bought no layering at all and
      // pulled this band's header straight through the statement's last line.
      className="bg-paper text-ink relative overflow-hidden"
    >
      <BgLines dark lag />

      <Helmet section={section} />

      <div className="px-gutter relative z-0 py-28 lg:py-36">
        <div className="mb-16 flex items-end justify-between gap-6">
          <p data-reveal="fade" className="text-body-sm tracking-[0.18em] uppercase opacity-60">
            {PARTNERS.eyebrow}
          </p>
          <h2 data-reveal="words" className="text-h3">
            {PARTNERS.title}
          </h2>
        </div>

        {/*
          The wall parts down the middle: six names up each flank, and the
          helmet turning in the gap between them. An earlier version laid all
          twelve across four columns and hid the middle four on desktop to
          clear a hole for it — which spent a third of the partners on nothing.
          Splitting the list is the same hole, with every name still readable.
        */}
        <div className="grid min-h-[22rem] grid-cols-2 items-center gap-x-6 gap-y-14 lg:min-h-[34rem] lg:grid-cols-12">
          <LogoColumn names={PARTNERS.logos.slice(0, 6)} align="start" />
          <LogoColumn names={PARTNERS.logos.slice(6)} align="end" />
        </div>

        <div className="mt-16 flex justify-center">
          <ArrowButton>{PARTNERS.cta}</ArrowButton>
        </div>
      </div>
    </section>
  );
}
