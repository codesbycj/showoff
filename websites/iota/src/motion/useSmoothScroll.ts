import { useContext } from 'react';

import { SmoothScrollContext, type SmoothScrollApi } from './smooth-scroll-context';

/** The page's scroll controls: lock, unlock, and an eased scrollTo. */
export function useSmoothScroll(): SmoothScrollApi {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error('useSmoothScroll must be used inside <SmoothScroll>');
  return ctx;
}
