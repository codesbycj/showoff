import { useEffect, useState } from 'react';

/**
 * Whether the visitor has asked for less movement.
 *
 * Read on mount and kept current: the setting can change while the page is
 * open, and a pinned section that only checked once would keep running for
 * someone who had just switched it on.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
