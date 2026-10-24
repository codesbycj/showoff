import { useEffect, useRef, useState } from 'react';

import { hero } from '@/content/site';
import { TYPEWRITER } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The hero: a headline whose last word types itself, over a procession of
 * masked photographs, clips and flat shapes that never stops.
 *
 * The carousel is two identical groups side by side with the pair translated a
 * full group's width over 25 seconds, so the join is invisible -- and each
 * item rocks 12 degrees and back on a clock of its own. Both are CSS
 * keyframes in `after.css`, and both are switched off under reduced motion.
 */
export function Hero({ active }: { active: boolean }) {
  return (
    <section className="q-hero" id="top">
      <div className="q-hero__container q__container">
        <h1 className="q-hero__heading">
          {hero.lead}
          <span className="q-hero__words">
            <Typewriter active={active} />
          </span>
        </h1>

        <div className="q-hero__carousel" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="q-hero__carousel-group" key={copy}>
              <span className="q-hero__carousel-item -shape-1" />
              <figure className="q-hero__carousel-item -media-1">
                <img src={hero.photo} alt="" decoding="async" />
              </figure>
              <span className="q-hero__carousel-item -shape-2" />
              <figure className="q-hero__carousel-item -media-2">
                <Clip clip={hero.clips[0]} active={active} />
              </figure>
              <span className="q-hero__carousel-item -shape-3" />
              <figure className="q-hero__carousel-item -media-3">
                <img src={hero.room} alt="" decoding="async" />
              </figure>
              <span className="q-hero__carousel-item -shape-4" />
              <figure className="q-hero__carousel-item -media-4">
                <Clip clip={hero.clips[1]} active={active} />
              </figure>
            </div>
          ))}
        </div>

        <p className="q-hero__description">{hero.description}</p>
      </div>
    </section>
  );
}

/**
 * One of the two clips in the procession.
 *
 * Paused whenever the after is not the page on screen: both designs are
 * mounted at once and rule 7 is explicit that the hidden one may not keep a
 * video running. Muted, inline and loud about neither.
 */
function Clip({
  clip,
  active,
}: {
  clip: { readonly src: string; readonly poster: string };
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active && !reduced) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, reduced]);

  /*
   * `preload="auto"`, not the reference's default. Both clips are the
   * reference's own files and their `moov` atom sits after `mdat` -- they were
   * never remuxed for the web -- so a browser cannot read their dimensions
   * until the whole file has arrived. At `metadata` that leaves two holes in
   * the procession for as long as the download takes; at `auto` they are
   * 0.6MB each and they are simply there.
   */
  return (
    <video ref={ref} src={clip.src} poster={clip.poster} muted loop playsInline preload="auto" />
  );
}

/**
 * The typed word.
 *
 * The reference's loop, with its own numbers: a character every 75ms, 1,500ms
 * on the finished word, deleted at half speed, 500ms between words, and a
 * 500ms wait before the first one. Under reduced motion it renders the first
 * word as plain text and never starts a timer -- which is the reference's own
 * branch, and the right one: a caret flickering inside an h1 is exactly what
 * that setting is asking you to stop.
 *
 * It is also stopped while the after is hidden, so the before is not sharing
 * the page with a timer nobody can see.
 */
function Typewriter({ active }: { active: boolean }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState('');
  // Not state: with the timer off the first word is simply what is rendered,
  // so there is nothing to set and nothing to synchronise.
  const running = active && !reduced;

  useEffect(() => {
    if (!running) return;

    let word = 0;
    let letters = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const target = hero.words[word];
      let next: number = TYPEWRITER.speedMs;

      if (deleting) {
        letters -= 1;
        next = TYPEWRITER.speedMs / TYPEWRITER.deleteDivisor;
      } else {
        letters += 1;
      }
      setText(target.substring(0, letters));

      if (!deleting && letters === target.length) {
        deleting = true;
        next = TYPEWRITER.holdMs;
      } else if (deleting && letters === 0) {
        deleting = false;
        word = (word + 1) % hero.words.length;
        next = TYPEWRITER.betweenWordsMs;
      }

      timer = window.setTimeout(tick, next);
    };

    timer = window.setTimeout(tick, TYPEWRITER.delayMs);
    return () => window.clearTimeout(timer);
  }, [running]);

  return <>{running ? text : hero.words[0]}</>;
}
