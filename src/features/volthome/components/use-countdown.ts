import { useEffect, useState } from 'react';

/**
 * A real countdown for the flash sale.
 *
 * **R9: the picture agrees with the numbers.** The board types "02:59:23" into
 * a frozen frame; a clock that does not count is a label pretending to be one.
 *
 * It is clamped at zero rather than running negative, and the interval is
 * cleared on unmount — a timer left running against an unmounted screen is the
 * kind of native failure the web render cannot show (I8).
 */
export function useCountdown(seconds: number) {
  const [left, setLeft] = useState(Math.max(0, Math.floor(seconds)));

  useEffect(() => {
    const id = setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;

  return [h, m, s].map((part) => String(part).padStart(2, '0')).join(':');
}
