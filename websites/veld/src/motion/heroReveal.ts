/**
 * The hero's arrival: the four blocks of copy that ride in under the loader.
 *
 * Split into two phases on purpose.
 *
 * `prepareHeroReveal()` runs the moment the page mounts and hides everything
 * immediately, then splits the text once the display face has actually loaded.
 * Splitting first and hiding second shows a frame of unsplit copy; splitting
 * before `document.fonts.ready` breaks lines against the fallback's metrics and
 * they re-wrap when Anton arrives.
 *
 * `revealHeroGroups()` is called from the loader's timeline and only tweens.
 * If the split has not landed yet — a slow font over a LAN dev server — it
 * falls back to a plain fade rather than waiting, because a hero that never
 * appears is worse than one that appears without the flourish.
 */
import { gsap, SplitText } from './gsap';
import { LOADER } from './motion';
import { fontsReady, rollOdometer, setOdometer } from './odometer';

type Group = {
  odometers: { el: HTMLElement; target: string; opacity: number }[];
  textEls: HTMLElement[];
  opacities: number[];
  splits: SplitText[];
  parts: Element[];
};

let groups: Group[] = [];
let prepared = false;

const opacityOf = (el: Element) => {
  const v = parseFloat(getComputedStyle(el).opacity);
  return Number.isNaN(v) ? 1 : v;
};

/** Hides the hero copy and splits it. Safe to call more than once. */
export function prepareHeroReveal() {
  if (prepared) return;
  prepared = true;

  groups = gsap.utils.toArray<HTMLElement>('[data-loader-reveal]').map((group) => {
    const odometers = gsap.utils
      .toArray<HTMLElement>('[data-odometer-element]', group)
      .map((el) => {
        const target = (el.textContent ?? '').trim();
        const opacity = opacityOf(el);
        // Park it on zeroes so the box is the right size before it rolls.
        el.textContent = target.replace(/\d/g, '0');
        gsap.set(el, { autoAlpha: 0 });
        return { el, target, opacity };
      });

    const textEls = gsap.utils
      .toArray<HTMLElement>('h1, h2, h3, h4, h5, h6, p', group)
      .filter(
        (el) => !el.hasAttribute('data-odometer-element') && !el.hasAttribute('data-no-split'),
      );

    const opacities = textEls.map(opacityOf);
    gsap.set(textEls, { autoAlpha: 0 });

    return { odometers, textEls, opacities, splits: [], parts: [] };
  });

  void fontsReady().then(() => {
    groups.forEach((group) => {
      group.textEls.forEach((el, i) => {
        // Visible again, but every part of it is parked below its own mask.
        gsap.set(el, { autoAlpha: group.opacities[i] });
        const isHeading = /^H[1-6]$/.test(el.tagName);
        const requested = el.getAttribute('data-split');
        const type =
          requested === 'words' || requested === 'lines'
            ? requested
            : isHeading
              ? LOADER.hero.text.headingSplit
              : 'lines';

        const split = SplitText.create(el, {
          type,
          mask: type,
          linesClass: 'reveal-line',
          wordsClass: 'reveal-line',
        });
        const parts = type === 'words' ? split.words : split.lines;
        gsap.set(parts, { yPercent: 110 });
        group.splits.push(split);
        group.parts.push(...parts);
      });
    });
  });
}

/** Plays the arrival. `instant` lands everything with no movement. */
export function revealHeroGroups({ instant = false, odometer = true } = {}) {
  groups.forEach((group, groupIndex) => {
    const at = groupIndex * LOADER.hero.groupStagger;

    group.odometers.forEach(({ el, target, opacity }, i) => {
      const run = () => {
        if (!odometer || instant || !/\d/.test(target)) setOdometer(el, target);
        else
          rollOdometer(el, target, {
            duration: LOADER.hero.stats.duration,
            ease: LOADER.hero.stats.ease,
            fromBlank: true,
          });
        gsap.set(el, { autoAlpha: opacity });
      };
      if (instant) run();
      else gsap.delayedCall(at + i * LOADER.hero.stats.stagger, run);
    });

    if (!group.textEls.length) return;

    if (instant) {
      // `parts` is empty whenever the split has not run yet, which is the
      // normal case on the reduced-motion path — it lands before the fonts
      // have resolved. gsap warns on an empty target, so skip it.
      if (group.parts.length) gsap.set(group.parts, { yPercent: 0 });
      group.textEls.forEach((el, i) => gsap.set(el, { autoAlpha: group.opacities[i] }));
      return;
    }

    gsap.delayedCall(at, () => {
      if (!group.parts.length) {
        // Split never landed — fade it in rather than leave a hole.
        gsap.to(group.textEls, {
          autoAlpha: (i: number) => group.opacities[i],
          duration: 0.6,
          ease: 'power1.out',
        });
        return;
      }
      gsap.to(group.parts, {
        yPercent: 0,
        duration: LOADER.hero.text.duration,
        stagger: LOADER.hero.text.lineStagger,
        ease: LOADER.hero.text.ease,
        onComplete() {
          // Hand the text back to the browser: a split heading cannot reflow,
          // so leaving it split means it never re-wraps on resize.
          group.splits.forEach((s) => s.revert());
          group.parts = [];
          gsap.set(group.textEls, { clearProps: 'visibility,opacity' });
        },
      });
    });
  });
}
