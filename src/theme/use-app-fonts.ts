import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';

import { fontMap, hasCustomFonts } from './fonts';

/**
 * How long to wait for custom fonts before painting anyway.
 *
 * Without this the app can hang forever on the splash: the root layout renders
 * nothing until fonts resolve, and over a LAN dev server a stalled font request
 * never rejects. Painting early is safe — `useFonts` re-renders when the faces
 * arrive, so text swaps from the system font to Inter a moment later.
 */
const FONT_TIMEOUT_MS = 3000;

/** Returns true once custom fonts are ready, failed, or took too long. */
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts(fontMap);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), FONT_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!hasCustomFonts) return true;
  return loaded || !!error || timedOut;
}
