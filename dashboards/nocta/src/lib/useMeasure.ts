import { useEffect, useRef, useState } from 'react';

export interface Size {
  w: number;
  h: number;
}

/**
 * The element's own size, into state.
 *
 * Charts here are drawn in real pixels rather than in a stretched viewBox, so
 * they need the box they are in. Reading `ref.current` during render to get it
 * is the trap this hook exists to avoid: it lints, it is wrong under
 * StrictMode's double render, and the first paint uses whatever the size was
 * last time. A ResizeObserver also means the charts survive the 1280 and 1920
 * checks in the done-gate without a media query.
 */
export function useMeasure<T extends HTMLElement>(): [React.RefObject<T | null>, Size] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      setSize((prev) =>
        Math.abs(prev.w - box.width) < 0.5 && Math.abs(prev.h - box.height) < 0.5
          ? prev
          : { w: box.width, h: box.height },
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
}
