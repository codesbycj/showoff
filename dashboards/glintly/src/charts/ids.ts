import { useId } from 'react';

/**
 * Unique ids for SVG defs.
 *
 * A gradient, mask, clipPath or filter id is *document*-global, not scoped to
 * the svg that declares it. Two chart instances that both define id="fade"
 * collapse into one and every chart after the first paints in the first one’s
 * colour -- with no error anywhere. probe.js reports duplicates; this prevents
 * them.
 */
export function useDefIds<K extends string>(...names: K[]): Record<K, string> {
  const base = useId().replace(/:/g, '');
  return Object.fromEntries(names.map((n) => [n, n + '-' + base])) as Record<K, string>;
}

/** url(#id), for a fill or a mask attribute. */
export const ref = (id: string) => 'url(#' + id + ')';
