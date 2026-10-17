import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

import { SWAP } from '@/motion/motion';

/**
 * Replace a block's contents by blurring it out and the new one in.
 *
 * The reference does this for every piece of text tied to the centred project:
 * `opacity -> 0` with `filter: blur(8px)` on `power2.in`, then the new content
 * back on `power2.out`, the two halves together making `mn = 0.5` seconds.
 * All three numbers are read from the bundle.
 *
 * The swap is sequenced rather than crossfaded -- the incoming copy is set up
 * only once the outgoing one has gone -- because these blocks sit directly on
 * the page rather than on a plate, and two sets of words overlapping at half
 * opacity is unreadable in a way two overlapping images are not.
 */
export function BlurSwap({
  token,
  children,
  className,
}: {
  /** Change this to trigger a swap. */
  token: string | number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(token);

  useEffect(() => {
    if (prev.current === token) return;
    prev.current = token;
    const el = ref.current;
    if (!el) return;

    const half = SWAP.sec / 2;
    // fromTo on both halves: `from` would read whatever the previous, possibly
    // interrupted, swap left behind as this one's destination.
    const tl = gsap
      .timeline()
      .fromTo(
        el,
        { opacity: 1, filter: 'blur(0px)' },
        { opacity: 0, filter: `blur(${SWAP.blurPx}px)`, duration: half, ease: SWAP.outEase },
      )
      .fromTo(
        el,
        { opacity: 0, filter: `blur(${SWAP.blurPx}px)` },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: half,
          ease: SWAP.inEase,
          clearProps: 'filter',
        },
      );

    /*
     * Killed, not reverted -- for the same reason as the plate swap in
     * `Stage.tsx`. This effect re-runs on every change of `token`, and
     * `revert()` would roll the finished half of the swap back as the next one
     * started, leaving the block stuck at `opacity: 0`.
     *
     * Killing part-way can leave it dimmed instead, so the second half ends by
     * setting `opacity: 1` explicitly rather than relying on `clearProps`.
     */
    return () => {
      tl.kill();
      gsap.set(el, { opacity: 1, filter: 'none' });
    };
  }, [token]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
