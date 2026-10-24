import { useEffect, useState } from 'react';

/**
 * A media query as state, kept current.
 *
 * Used for one decision: below 768 the hero drops the WebGL field entirely and
 * shows the render as a plain video, framed differently. That is the
 * reference's own branch, and it is the right one — a phone has neither the
 * pointer the field responds to nor the GPU budget to spend on it.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof matchMedia === 'function' && matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
