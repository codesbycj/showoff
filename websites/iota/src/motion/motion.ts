/**
 * Every timing on the page, in one file. See the README for where they came from.
 */

/** Turns an overlap like -0.3 into the "-=0.3" string GSAP expects. */
export const rel = (seconds: number): string => `${seconds < 0 ? '-=' : '+='}${Math.abs(seconds)}`;

/** The three easing curves the whole site uses. */
export const EASE = {
  ui: 'cubic-bezier(0, 0, 0.13, 0.99)',
  reveal: 'cubic-bezier(0.14, 0.83, 0.4, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** GSAP's named eases, so no component has to spell one itself. */
export const GSAP_EASE = {
  enter: 'power4.out',
  move: 'power3.inOut',
  clip: 'expo.inOut',
} as const;

/** The loading sequence, beat by beat. Runs a little over eight seconds. */
export const PRELOADER = {
  startDelay: 0.15,

  letters: {
    from: { y: 10, blur: 10, opacity: 0 },
    duration: 0.6,
    stagger: 0.2,
    overlap: -0.2,
    ease: GSAP_EASE.enter,
  },

  expand: {
    duration: 1.3,
    ease: GSAP_EASE.move,
    columnsOverlap: -0.3,
    tailsOverlap: -1.5,
  },

  split: {
    duration: 1,
    ease: GSAP_EASE.move,
    verticalBelow: 900,
    verticalOffset: 0.5,
  },

  image: {
    appear: { duration: 1, ease: GSAP_EASE.move },
    under: { duration: 0.7, ease: GSAP_EASE.clip, overlap: -0.4 },
    selected: { duration: 0.9, ease: GSAP_EASE.clip, overlap: -0.5 },
    expand: { duration: 1.5, ease: GSAP_EASE.move, overlap: -0.3, overscan: 80 },
    wordsOut: { scale: 0.8, opacity: 0, duration: 1, ease: GSAP_EASE.move },
    overlap: -1,
  },

  handoff: {
    fade: 0.1,
    brightness: 1,
  },

  hero: {
    overlap: -0.5,
    detail: { y: 20, duration: 1, stagger: 0.2, ease: GSAP_EASE.enter },
    title: { y: 20, blur: 10, duration: 1, ease: GSAP_EASE.enter, overlap: -0.8 },
    rail: { x: '20rem', duration: 1.2, ease: GSAP_EASE.enter, overlap: -1.2 },
  },
} as const;

/** The four ways something can arrive when you scroll to it. */
export const REVEAL = {
  stagger: 0.1,
  threshold: 0.25,

  image: {
    duration: 1.2,
    ease: EASE.reveal,
    clipFrom: 'inset(40% 0 0 0)',
    clipTo: 'inset(0% 0 0 0)',
    opacityFrom: 0.2,
    scaleFrom: 1.5,
  },

  imageSoft: {
    duration: 1.2,
    ease: EASE.reveal,
    opacityFrom: 0,
    scaleFrom: 1.07,
  },

  fadeUp: {
    duration: 0.6,
    ease: 'ease-out',
    y: 30,
  },

  textWipe: {
    duration: 0.9,
    ease: EASE.reveal,
    y: '110%',
  },
} as const;

/** Smooth scrolling, and the budget the pinned rail spends. */
export const SCROLL = {
  lenis: {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  },

  rail: {
    scrubDistancePerPanel: 860,
    scrub: 1,
    ease: 'none',
  },

  parallax: {
    desktopBreakpoint: 1024,
    object: 400,
    image: 150,
  },
} as const;

/** The values the stylesheet needs too, published to :root at boot. */
export const cssVariables: Record<string, string> = {
  '--ease-ui': EASE.ui,
  '--ease-reveal': EASE.reveal,
  '--ease-standard': EASE.standard,
  '--dur-reveal': `${REVEAL.image.duration}s`,
  '--dur-fade-up': `${REVEAL.fadeUp.duration}s`,
  '--dur-ui': '0.3s',
  '--reveal-clip-from': REVEAL.image.clipFrom,
  '--reveal-scale-from': String(REVEAL.image.scaleFrom),
  '--reveal-opacity-from': String(REVEAL.image.opacityFrom),
  '--fade-up-y': `${REVEAL.fadeUp.y}px`,
};
