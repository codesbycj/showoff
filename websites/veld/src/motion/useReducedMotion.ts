import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** True when the visitor has asked their system for less movement. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(QUERY);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
