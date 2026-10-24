import { useCallback, useLayoutEffect, useRef, useState } from 'react';

/**
 * Fit one line of text to the width of its box, the way Framer does.
 *
 * The reference's wordmark is `font-size: 195.593px`. That is not a chosen
 * number — it has three decimal places because Framer solved it: eleven
 * characters across 1376px. A rebuild that hard-codes 195.593 matches at
 * exactly one viewport and is wrong at every other, and a `cqi` size is only
 * right for a string of one particular length.
 *
 * So: render at a nominal size, measure, and scale. One layout pass, repeated
 * on resize through a ResizeObserver.
 */
export function useFitText<T extends HTMLElement>(text: string, nominal = 100) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<T>(null);
  const [size, setSize] = useState(nominal);

  const fit = useCallback(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;
    /*
     * Measure the inline span, not the block.
     *
     * `scrollWidth` on a block `<p>` whose text is `nowrap` reports the
     * container width, not the text width — so the first version always
     * measured 1376 and solved to the nominal size. An inline child's
     * bounding rect is the text.
     */
    const span = el.firstElementChild as HTMLElement | null;
    if (!span) return;
    const prev = el.style.fontSize;
    el.style.fontSize = `${nominal}px`;
    const natural = span.getBoundingClientRect().width;
    el.style.fontSize = prev;
    if (natural > 0) setSize((nominal * box.clientWidth) / natural);
  }, [nominal]);

  useLayoutEffect(() => {
    fit();
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    // Re-fit once the webfont lands; before it does, the measurement is of a
    // fallback face and the result is 10-15% out.
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [fit, text]);

  return { boxRef, textRef, size };
}
