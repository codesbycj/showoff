import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { DIGIT } from '@/motion/motion';

/**
 * A number that changes by sliding, not by fading.
 *
 * The reference swaps this kind of label by keeping two copies and moving one
 * out while the other comes in -- `x: -w -> 0` on `power3.out` for the
 * arriving copy, `x: 0 -> w` on `power2.out` for the leaving one, both over
 * `Kt = 0.7`. (read)
 *
 * Here the axis is vertical, because the thing it is counting moves vertically
 * and a horizontal slide would contradict it. The direction follows the
 * travel: scrolling down sends the old number up.
 *
 * `overflow: hidden` on a box sized to one line is what makes it a swap rather
 * than two numbers passing each other on the page.
 */
export function Digits({ value, className }: { value: string; className?: string }) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  // Both copies are rendered; which is which is settled after the tween.
  const [pair, setPair] = useState<{ out: string | null; in: string }>({ out: null, in: value });

  useEffect(() => {
    if (prev.current === value) return;
    const from = prev.current;
    const down = Number(value) > Number(from);
    prev.current = value;
    setPair({ out: from, in: value });

    const box = boxRef.current;
    if (!box) return;

    const [outgoing, incoming] = gsap.utils.toArray<HTMLElement>(box.children);
    const running: gsap.core.Tween[] = [];

    if (outgoing) {
      running.push(
        gsap.to(outgoing, {
          yPercent: down ? -100 : 100,
          duration: DIGIT.sec,
          ease: DIGIT.outEase,
        }),
      );
    }
    if (incoming) {
      running.push(
        gsap.fromTo(
          incoming,
          { yPercent: down ? 100 : -100 },
          { yPercent: 0, duration: DIGIT.sec, ease: DIGIT.inEase },
        ),
      );
    }

    /*
     * Killed, not reverted — the same trap as the plate swap in `Scene` and
     * the text swap in `BlurSwap`, and the one place it was missed.
     *
     * `gsap.context(...).revert()` restores the properties it recorded, so an
     * interrupted swap put the *outgoing* digit back at `yPercent: 0` — on top
     * of the incoming one, both at full opacity. Scrolling several projects
     * quickly left "06" and "07" printed over each other permanently, which a
     * DOM probe shows as two children with `transform: none`.
     *
     * The tween is also dropped once it finishes, so the outgoing copy stops
     * being rendered at all rather than sitting off-screen forever.
     */
    const done = window.setTimeout(() => setPair({ out: null, in: value }), DIGIT.sec * 1000 + 40);

    return () => {
      window.clearTimeout(done);
      running.forEach((t) => t.kill());
    };
  }, [value]);

  return (
    <span
      ref={boxRef}
      className={`relative inline-block overflow-hidden tabular-nums ${className ?? ''}`}
      // One line tall, so the copy on its way out is clipped rather than
      // pushing the layout around as it goes.
      style={{ lineHeight: 1, height: '1em', verticalAlign: 'baseline' }}
    >
      {pair.out !== null && (
        <span key={`out-${pair.out}`} className="absolute inset-0 block">
          {pair.out}
        </span>
      )}
      <span key={`in-${pair.in}`} className="block">
        {pair.in}
      </span>
    </span>
  );
}
