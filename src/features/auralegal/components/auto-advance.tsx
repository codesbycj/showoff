import { router, type Href } from 'expo-router';
import { useEffect } from 'react';

/**
 * Sends the splash on to the feed after `afterMs`, then renders nothing.
 *
 * A component rather than a `useEffect` in the screen, because the timelapse
 * stages JSX: the auto-advance has to be the *last* thing a reveal of the
 * splash turns on. Live from the first step it would navigate away halfway
 * through filming the screen it is meant to be building. As an element it is
 * staged like everything else; as a hook in the screen body it could only be
 * commented out by hand.
 *
 * It `replace`s rather than pushes, so going back from the feed leaves the app
 * instead of returning to a splash that would immediately advance again.
 */
export function AutoAdvance({ to, afterMs }: { to: Href; afterMs: number }) {
  useEffect(() => {
    const timer = setTimeout(() => router.replace(to), afterMs);
    return () => clearTimeout(timer);
  }, [to, afterMs]);

  return null;
}
