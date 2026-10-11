/**
 * Every timing on the page, in one file.
 *
 * The numbers in here were read off a reference build rather than guessed: its
 * motion code shipped as plain (minified but unobfuscated) ES modules, so each
 * duration and ease below is a value that was sitting in a config object, then
 * checked against a 13ms-per-frame screen recording. Where a comment says
 * "tracked", it names the frame times that confirmed it. None of this can be
 * recovered from the built site later, which is the whole reason it is written
 * down here instead of being spread across twelve components.
 */

/** Turns an overlap like -0.3 into the "-=0.3" string GSAP expects. */
export const rel = (seconds: number): string => `${seconds < 0 ? '-=' : '+='}${Math.abs(seconds)}`;

/** GSAP's named eases, so no component has to spell one itself. */
export const GSAP_EASE = {
  /** Lands almost instantly, then creeps. The counter and every stat use it. */
  snap: 'expo.out',
  /** Dead slow at both ends, violent in the middle. The whole takeover is this. */
  sweep: 'expo.inOut',
  settle: 'power3.out',
  soft: 'power2.out',
  softIn: 'power2.in',
  linesIn: 'power3.inOut',
} as const;

/** The CSS-side curves. Three of these carry every hover and transition. */
export const EASE = {
  ui: 'cubic-bezier(0.16, 1, 0.3, 1)',
  reveal: 'cubic-bezier(0.14, 0.83, 0.4, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * The loading sequence, beat by beat. About 5.3 seconds end to end.
 *
 * The shape of it: a white screen with a black counter in the middle and five
 * black lights along the bottom. The lights go yellow one at a time while the
 * counter rolls to the car number, and then the white screen *is* the car
 * number — a copy of the numeral scaled 100x — so it collapses back to its own
 * size and the hero is simply behind it. A second copy in yellow runs 25ms
 * late, which is the only reason the collapse reads as a trail rather than a
 * wipe; both land on identical transforms, so once it settles only the white
 * one is visible.
 *
 * Tracked: loader t=0 at 1.55s into the recording. Light 5 finished at 3.29s
 * (= t+1.70, matching lights.toColor below). The white broke open between
 * 4.58s and 4.67s and settled by 5.07s — i.e. in the last 15% of a 1.2s
 * expo.inOut that started at t+2.05. Hero text was in by 5.24s.
 */
export const LOADER = {
  /** The counter. Rolls 0 -> the car number; `end` is also what the hero shows. */
  count: { end: 96, duration: 2, ease: GSAP_EASE.snap, fromBlank: true },

  /** Five start lights. Yellow one at a time, then all out together. */
  lights: {
    total: 5,
    /** Each light's own fade to yellow. */
    toColor: { duration: 0.35, ease: GSAP_EASE.soft },
    /**
     * The last light finishes this far before the counter does, and the
     * stagger between lights is derived from it — adding a sixth light makes
     * them tighter rather than making the sequence longer.
     */
    endOffset: 0.3,
    out: { duration: 0.2, stagger: 0.08, ease: 'power1.out' },
  },

  /** Beat between the counter landing and the screen opening. */
  hold: 0.05,

  /** The numeral-shaped screen collapsing to its own size. */
  takeover: {
    duration: 1.2,
    ease: GSAP_EASE.sweep,
    /** The yellow copy's head start, and the entire reason for the trail. */
    yellowDelay: 0.025,
    /** How far the numeral is blown up and pushed aside to fill the screen. */
    from: { scale: 100, x: '95rem' },
    /** The counter shrinking to nothing underneath it. */
    count: { duration: 1, ease: GSAP_EASE.sweep },
  },

  /** What the hero does while the takeover is still running. */
  hero: {
    image: { from: 1.2, duration: 1.6, ease: GSAP_EASE.sweep },
    /** Colour coming back into the hero stills. */
    saturate: { duration: 1.6, ease: GSAP_EASE.sweep, delay: 0 },
    /** The vertical hairlines growing out of the floor, in a scattered order. */
    bgLines: {
      delay: 0.2,
      duration: 1.6,
      stagger: { each: 0.06, from: 'random' as const },
      ease: GSAP_EASE.linesIn,
    },
    /** Hero copy starts this far *before* the takeover finishes, so they overlap. */
    lead: 0.4,
    /** Between the four blocks of hero copy. */
    groupStagger: 0.15,
    stats: { duration: 1.2, stagger: 0.08, ease: GSAP_EASE.snap },
    text: {
      headingSplit: 'words' as const,
      duration: 0.8,
      lineStagger: 0.08,
      ease: GSAP_EASE.snap,
      /** Give a live countdown this long to produce a real value first. */
      dynamicWait: 2,
    },
  },

  /** Scroll stays locked until the takeover is done, with a dead-man's timeout. */
  scroll: { lock: true, pinTimeout: 8 },
} as const;

/**
 * The counter and every statistic are the same component: a column of digits
 * per place, rolled up to land on the target. `cycles` is how many extra times
 * it passes 0-9 before stopping, which is what makes it read as mechanical
 * rather than as a number being set.
 */
export const ODOMETER = {
  duration: 1,
  ease: GSAP_EASE.settle,
  elementStagger: 0.1,
  digitStagger: 0.04,
  /** Digits land right to left, so the last place settles first. */
  order: 'right-to-left' as const,
  cycles: 2,
  reveal: { duration: 0.5, ease: GSAP_EASE.soft },
  triggerStart: 'top 80%',
} as const;

/**
 * The four ways something can arrive when you scroll to it. Headings split to
 * words, body copy to lines, and both ride up out of a mask.
 */
export const REVEAL = {
  distance: 110,
  duration: 0.6,
  ease: GSAP_EASE.snap,
  lines: { stagger: 0.04 },
  words: { stagger: 0.06 },
  fade: { y: 40, duration: 0.8, ease: GSAP_EASE.snap },
  slide: { x: '100vw', duration: 1, ease: GSAP_EASE.snap },
  group: { stagger: 0.12 },
  start: 'top 85%',
  /** Replays when you scroll back up to it, and knows which way you came. */
  once: false,
  directionAware: true,
  mobileMaxWidth: 479,
} as const;

/** Smooth scrolling. Lenis runs off GSAP's clock, never its own rAF. */
export const SCROLL = {
  lenis: { lerp: 0.1, wheelMultiplier: 0.7, gestureOrientation: 'vertical' as const },

  /** Hairlines that lag behind the scroll by a per-line amount. */
  lineScroll: { lag: { min: 1.75, max: 5 }, start: 'top bottom', end: 'bottom bottom' },

  /** Sections that ride up over the one before them. */
  overlap: { defaultAmountVh: 30, zIndexBase: 2, desktopQuery: '(min-width: 992px)' },

  /** Hero layers drift at different rates, nearest moving least. */
  parallax: { scrub: true, ease: 'none' },
} as const;

/**
 * The helmet turntable over the partner wall.
 *
 * Scroll feeds a speed, not a position. It turns at `idleSpeed` frames a
 * second on its own, gains `velocityGain` frames a second per pixel-a-second
 * of scroll, clamps at `maxSpeed`, and approaches that target with a
 * `responsiveness`-second exponential filter. Scrolling up past
 * `directionThreshold` flips the direction it coasts in.
 *
 * Tracked: the reference carries 180 frames at these exact values; this build
 * renders 120, which is 3 degrees a frame and indistinguishable in motion at
 * the size it is shown. The speeds are in frames per second, so they are *not*
 * rescaled for the shorter sequence — doing so would make it turn at the same
 * frames-per-second but a different degrees-per-second, which is the thing you
 * actually see.
 */
export const TURNTABLE = {
  /** Frames a second with no scrolling at all. */
  idleSpeed: 24,
  /** Extra frames a second per pixel a second of scroll. */
  velocityGain: 0.2,
  maxSpeed: 270,
  /** Time constant of the approach to the target speed, in seconds. */
  responsiveness: 0.35,
  /** Scroll speed below which the coasting direction is left alone, px/s. */
  directionThreshold: 60,

  /** Widening passes, so a coarse full turn is available almost immediately. */
  loadStrides: [12, 6, 3, 1],
  concurrency: 6,
  dprCap: 2,
  resizeDebounce: 200,

  /** The stage popping in as the band arrives. */
  pop: { duration: 0.8, ease: 'back.out(1.4)', outDuration: 0.4, outEase: 'power2.in' },
  /** And growing slightly across it. */
  grow: { from: 1, to: 1.1, start: 'top bottom', end: 'bottom top' },
} as const;

/** The helmet that hangs over the partner wall, tilting towards the cursor. */
export const HELMET = {
  activeQuery: '(hover: hover) and (pointer: fine)',
  moveMax: 52,
  tiltMax: 11,
  perspective: 900,
  lagMove: 1.4,
  lagTilt: 1.9,
  ease: GSAP_EASE.settle,
  floatAmount: 12,
  floatDuration: 1.6,
} as const;

/** The scroll-driven story: one chapter at a time, image and copy swapping. */
export const STORY = {
  triggerPoint: 0.5,
  images: { activeOpacity: 1, inactiveOpacity: 0.2, duration: 0.4, ease: GSAP_EASE.soft },
  saturation: { active: 'saturate(1)', inactive: 'saturate(0)', duration: 0.4 },
  count: { duration: 0.55, ease: GSAP_EASE.settle },
  text: {
    out: { distance: 110, duration: 0.35, stagger: 0.04, ease: GSAP_EASE.softIn },
    in: { distance: 110, duration: 0.6, stagger: 0.04, ease: GSAP_EASE.snap },
    heading: { split: 'words' as const, stagger: 0.06, lead: 0.05 },
    gap: 0,
  },
} as const;

/** The film that grows out of its own frame as you reach it. */
export const VIDEO_BAND = {
  from: { width: '70vw', height: '70vh', borderRadius: '0.5rem' },
  to: { width: '100vw', height: '100vh', borderRadius: '0rem' },
  start: 'top 80%',
  end: 'top top',
  scrub: true,
} as const;

/** The gallery, whose cards sit on the rim of a wheel far below the fold. */
export const GALLERY = {
  /** Degrees between neighbouring cards, derived from card width at runtime. */
  snapDuration: 0.9,
  ease: GSAP_EASE.sweep,
  dragEase: EASE.ui,
  tiltPerCard: 2.5,
} as const;

/** The race countdown in the hero and on the calendar. */
export const COUNTDOWN = {
  separator: ':',
  maxDays: 99,
  tick: { duration: 0.45, ease: GSAP_EASE.soft },
  noRaceText: 'TBA',
} as const;

/** The values the stylesheet needs too, published to :root at boot. */
export const cssVariables: Record<string, string> = {
  '--ease-ui': EASE.ui,
  '--ease-reveal': EASE.reveal,
  '--ease-standard': EASE.standard,
  '--dur-ui': '0.3s',
  '--dur-reveal': `${REVEAL.duration}s`,
  '--reveal-distance': `${REVEAL.distance}%`,
  '--fade-y': `${REVEAL.fade.y}px`,
  '--loader-from-scale': String(LOADER.takeover.from.scale),
  '--loader-from-x': LOADER.takeover.from.x,
};
