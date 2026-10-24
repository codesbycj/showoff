import { useLayoutEffect, useRef, useState } from 'react';

import { AfterPage } from '@/after/AfterPage';
import { BeforePage } from '@/before/BeforePage';
import { Toggle } from '@/compare/Toggle';
import { SWAP_MS } from '@/motion/motion';

/**
 * One business, two designs, and a button.
 *
 * Both pages are mounted and stacked, so the swap is a real crossfade rather
 * than an unmount. Four things that took getting right:
 *
 *   * **the document's height.** Stacked absolutely, neither page contributes
 *     height, so the stack is given the active page's height from a
 *     ResizeObserver. Without it the page cannot be scrolled at all.
 *   * **where you end up.** The two designs are not the same height — that is
 *     half the point — so carrying `scrollY` across the swap would land you in
 *     a different part of the page, or past the end of the shorter one. The
 *     swap preserves the *proportion* instead: a third of the way down the
 *     before is a third of the way down the after.
 *   * **the hidden page.** `aria-hidden` and `inert`, so nothing underneath can
 *     be tabbed to or read out while it is invisible.
 *   * **how far the page scrolls.** An absolutely positioned element still
 *     extends its ancestor's scrollable area even when it is transparent and
 *     inert, so with the 2012 page showing, the document still scrolled the
 *     full height of the modern one -- 2676px of website and then 5378px of
 *     cream. `overflow-clip` on the stack is what fixes it: the stack is
 *     exactly as tall as the page being shown, and nothing outside it counts.
 */
export function App() {
  const [view, setView] = useState<'before' | 'after'>('before');
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const active = view === 'before' ? beforeRef.current : afterRef.current;
    if (!active) return;
    const ro = new ResizeObserver(() => setHeight(active.scrollHeight));
    ro.observe(active);
    setHeight(active.scrollHeight);
    return () => ro.disconnect();
  }, [view]);

  const swap = (next: 'before' | 'after') => {
    if (next === view) return;
    const from = view === 'before' ? beforeRef.current : afterRef.current;
    const to = next === 'before' ? beforeRef.current : afterRef.current;
    const ratio = from && from.scrollHeight > 0 ? window.scrollY / from.scrollHeight : 0;
    setView(next);
    if (to) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: ratio * to.scrollHeight, behavior: 'auto' });
      });
    }
  };

  return (
    <>
      <div className="relative w-full overflow-clip" style={{ height: height || undefined }}>
        <Pane ref={beforeRef} view="before" show={view === 'before'}>
          {/* Both pages run a timer; the hidden one runs none (rule 7). */}
          <BeforePage active={view === 'before'} />
        </Pane>
        <Pane ref={afterRef} view="after" show={view === 'after'}>
          {/* `active` is the one addition this episode makes to the shared
              stack: the after runs a smooth-scroll rAF loop, a typewriter and
              two videos, and rule 7 says the hidden page runs none of them. */}
          <AfterPage active={view === 'after'} />
        </Pane>
      </div>
      <Toggle view={view} onChange={swap} />
    </>
  );
}

function Pane({
  ref,
  view,
  show,
  children,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  /** Which design this pane holds. Also the handle the measuring harness uses. */
  view: 'before' | 'after';
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={ref}
      data-pane={view}
      aria-hidden={!show}
      inert={!show}
      className="absolute inset-x-0 top-0 transition-opacity"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transitionDuration: `${SWAP_MS}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: show ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
