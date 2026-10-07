import { router } from 'expo-router';
import { useEffect } from 'react';
import type { Href } from 'expo-router';

/**
 * Sends the splash on to the next route after `afterMs`, then renders nothing.
 *
 * This is a component rather than a `useEffect` in the screen for one reason:
 * the timelapse stages JSX. The auto-advance has to be the *last* thing a
 * reveal of the splash turns on — if it is live from the first step, the device
 * navigates away halfway through filming the screen it is meant to be building.
 * As an element it is staged and revealed like everything else; as a hook in
 * the screen body it could only be commented out by hand.
 *
 * It `replace`s rather than pushes, so the back gesture from home leaves the app
 * instead of returning to a splash that would immediately advance again.
 */
export function AutoAdvance({ to, afterMs }: { to: Href; afterMs: number }) {
  useEffect(() => {
    const timer = setTimeout(() => router.replace(to), afterMs);
    return () => clearTimeout(timer);
  }, [to, afterMs]);

  return null;
}
