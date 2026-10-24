import { useEffect, useState } from 'react';

/**
 * A media query as state, kept current.
 *
 * The after needs it in two places where the reference's two layouts are not
 * one layout with different CSS: the rooms block is a sidebar of four tabs on
 * a desktop and an accordion of four on a phone, and the apply stamps only
 * drift with the scroll where there is a pointer to scroll with.
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
